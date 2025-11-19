/**
 * LINE Messaging API Integration
 * 
 * สำหรับส่งข้อความแจ้งเตือนการจองผ่าน LINE Official Account
 * ต้องตั้งค่า LINE_CHANNEL_ACCESS_TOKEN ใน environment variables
 */

import axios from 'axios'

const LINE_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN

/**
 * ส่งข้อความ push ไปยังผู้ใช้ LINE
 * @param to - LINE User ID ของผู้รับ
 * @param message - ข้อความที่ต้องการส่ง
 */
export const sendLineMessage = async (to: string, message: string) => {
  if (!LINE_ACCESS_TOKEN) {
    console.warn('[LINE] LINE_CHANNEL_ACCESS_TOKEN not configured, skipping message send')
    return
  }

  try {
    await axios.post(
      'https://api.line.me/v2/bot/message/push',
      {
        to,
        messages: [{ type: 'text', text: message }]
      },
      {
        headers: {
          'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('[LINE] Failed to send message:', error)
    throw error
  }
}

/**
 * ส่งข้อความยืนยันการจอง
 */
export const sendBookingConfirmation = async (
  lineUserId: string,
  bookingDetails: {
    carModel: string
    pickupDate: string
    returnDate: string
    totalPrice: number
    bookingId: string
  }
) => {
  const message = `✅ ยืนยันการจองสำเร็จ

🚗 รถ: ${bookingDetails.carModel}
📅 รับรถ: ${bookingDetails.pickupDate}
📅 คืนรถ: ${bookingDetails.returnDate}
💰 ราคา: ${bookingDetails.totalPrice.toLocaleString('th-TH')} บาท
🔖 เลขที่จอง: ${bookingDetails.bookingId}

ขอบคุณที่ใช้บริการ Rungroj Car Rental 🙏`

  await sendLineMessage(lineUserId, message)
}

/**
 * ส่งข้อความแจ้งเตือนก่อนรับรถ (1 วัน)
 */
export const sendPickupReminder = async (
  lineUserId: string,
  carModel: string,
  pickupDate: string
) => {
  const message = `🔔 แจ้งเตือนการรับรถ

พรุ่งนี้ (${pickupDate}) คุณมีนัดรับรถ
🚗 ${carModel}

📍 สถานที่: รุ่งโรจน์ คาร์เร้นท์ อุดรธานี
⏰ เวลา: ตามที่ระบุในใบจอง

กรุณามาตรงเวลาพร้อมบัตรประชาชนและใบขับขี่ 🙏`

  await sendLineMessage(lineUserId, message)
}
