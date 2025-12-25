import { createHmac, timingSafeEqual } from 'crypto'
import { getAllCars, formatThaiPrice } from '@/lib/data/mockCars'
import { getDraft, setDraft, confirmBooking } from '@/lib/data/bookings'
import { sendBookingConfirmation } from '@/lib/line/messaging'

const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET || process.env.CHANNEL_SECRET || ''
const LINE_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || ''

const verifySignature = (body: string, signature: string | null) => {
  if (!CHANNEL_SECRET || !signature) return false
  const hash = createHmac('sha256', CHANNEL_SECRET).update(body).digest('base64')
  try {
    const a = Buffer.from(hash, 'utf8')
    const b = Buffer.from(signature, 'utf8')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

const reply = async (replyToken: string, messages: Array<{ type: 'text'; text: string }>) => {
  if (!LINE_ACCESS_TOKEN) {
    console.warn('[LINE webhook] No access token configured, skipping reply')
    return
  }

  await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ replyToken, messages })
  })
}

export async function POST(request: Request) {
  const bodyText = await request.text()
  const signature = request.headers.get('x-line-signature')

  if (!verifySignature(bodyText, signature)) {
    return new Response('invalid signature', { status: 401 })
  }

  let json: { events?: { type?: string; message?: { type?: string; text?: string }; replyToken?: string; source?: { userId?: string } }[] }
  try {
    json = JSON.parse(bodyText)
  } catch {
    return new Response('bad request', { status: 400 })
  }

  const events = json.events || []

  for (const ev of events) {
    try {
      if (ev.type === 'message' && ev.message?.type === 'text') {
        const text: string = ev.message.text?.trim() || ''
        const lower = text.toLowerCase()
        const replyToken = ev.replyToken || ''
        const userId = ev.source?.userId || null

        // Check for existing draft
        if (userId) {
          const draft = getDraft(userId)
          if (draft) {
            // handle draft flow by stage
            if (draft.stage === 'awaiting_car_selection') {
              const num = parseInt(text, 10)
              if (!isNaN(num)) {
                const cars = getAllCars()
                const car = cars.find(c => c.id === num)
                if (car) {
                  draft.carId = car.id
                  draft.carModel = `${car.manufacturer} ${car.model}`
                  draft.stage = 'awaiting_pickup_date'
                  setDraft(userId, draft)
                  await reply(replyToken, [{ type: 'text', text: `เลือก: ${draft.carModel}\nกรุณาส่งวันที่รับรถ (YYYY-MM-DD)` }])
                  continue
                } else {
                  await reply(replyToken, [{ type: 'text', text: 'ไม่พบหมายเลขรถที่ส่งมา กรุณาส่งหมายเลขจากรายการรถที่มี (เช่น 1)' }])
                  continue
                }
              }
            }

            if (draft.stage === 'awaiting_pickup_date') {
              const dateMatch = /^\d{4}-\d{2}-\d{2}$/.test(text)
              if (dateMatch) {
                draft.pickupDate = text
                draft.stage = 'awaiting_return_date'
                setDraft(userId, draft)
                await reply(replyToken, [{ type: 'text', text: 'กรุณาส่งวันที่คืนรถ (YYYY-MM-DD)' }])
                continue
              } else {
                await reply(replyToken, [{ type: 'text', text: 'รูปแบบวันที่ไม่ถูกต้อง กรุณาส่งในรูปแบบ YYYY-MM-DD' }])
                continue
              }
            }

            if (draft.stage === 'awaiting_return_date') {
              const dateMatch = /^\d{4}-\d{2}-\d{2}$/.test(text)
              if (dateMatch) {
                draft.returnDate = text
                // compute days (simple)
                const d1 = new Date(draft.pickupDate!)
                const d2 = new Date(draft.returnDate)
                const diffDays = Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)))
                const cars = getAllCars()
                const car = cars.find(c => c.id === draft.carId)
                const pricePerDay = car?.price_per_day || 0
                draft.totalPrice = diffDays * pricePerDay
                draft.stage = 'awaiting_confirm'
                setDraft(userId, draft)
                await reply(replyToken, [{ type: 'text', text: `สรุปการจอง\nรถ: ${draft.carModel}\nรับ: ${draft.pickupDate}\nคืน: ${draft.returnDate}\nรวม: ${formatThaiPrice(draft.totalPrice || 0)}\n\nส่งคำว่า 'ยืนยัน' เพื่อยืนยันการจอง` }])
                continue
              } else {
                await reply(replyToken, [{ type: 'text', text: 'รูปแบบวันที่ไม่ถูกต้อง กรุณาส่งในรูปแบบ YYYY-MM-DD' }])
                continue
              }
            }

            if (draft.stage === 'awaiting_confirm' && (lower.includes('ยืนยัน') || lower.includes('confirm'))) {
              const booking = confirmBooking(userId)
              if (booking) {
                // send push confirmation via helper
                try {
                  await sendBookingConfirmation(userId, {
                    carModel: booking.carModel,
                    pickupDate: booking.pickupDate,
                    returnDate: booking.returnDate,
                    totalPrice: booking.totalPrice,
                    bookingId: booking.bookingId
                  })
                } catch (e) {
                  console.error('Failed to send push confirmation', e)
                }

                await reply(replyToken, [{ type: 'text', text: `✅ ยืนยันการจองเรียบร้อย เลขที่จอง: ${booking.bookingId}` }])
                continue
              }
            }
          }
        }

        // No existing draft flow -> check commands
        if (lower.includes('รายการ') || lower.includes('list') || lower.includes('cars')) {
          const cars = getAllCars()
          const lines = cars.slice(0, 6).map(c => `${c.id}) ${c.manufacturer} ${c.model} — ${formatThaiPrice(c.price_per_day)} / วัน`)
          const textMessage = `รายการรถที่มี:\n${lines.join('\n')}`
          await reply(replyToken, [{ type: 'text', text: textMessage }])
          continue
        }

        if (lower.includes('จอง') || lower.includes('book')) {
          if (!userId) {
            await reply(replyToken, [{ type: 'text', text: 'ไม่สามารถระบุผู้ใช้งานได้ กรุณาเปิดแชทจากแอพ LINE' }])
            continue
          }
          // create draft
          setDraft(userId, {
            stage: 'awaiting_car_selection'
          })

          const cars = getAllCars()
          const lines = cars.slice(0, 6).map(c => `${c.id}) ${c.manufacturer} ${c.model} — ${formatThaiPrice(c.price_per_day)} / วัน`)
          await reply(replyToken, [{ type: 'text', text: `เริ่มกระบวนการจอง\nส่งหมายเลขรถที่ต้องการจากรายการด้านล่าง:\n${lines.join('\n')}` }])
          continue
        }

        // default fallback
        await reply(replyToken, [{ type: 'text', text: 'ขออภัย ผมไม่เข้าใจคำสั่ง พิมพ์ "รายการ" เพื่อดูรถ หรือ "จอง" เพื่อเริ่มจอง' }])
      }
    } catch (error) {
      console.error('Event handling error', error)
    }
  }

  return new Response('ok', { status: 200 })
}
