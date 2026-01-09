/**
 * In-memory booking storage (demo only)
 * - drafts: map of userId -> draft state
 * - bookings: confirmed bookings array
 */

type DraftStage = 'awaiting_car_selection' | 'awaiting_pickup_date' | 'awaiting_return_date' | 'awaiting_confirm'

export type BookingDraft = {
  stage: DraftStage
  carId?: number
  carModel?: string
  pickupDate?: string
  returnDate?: string
  totalPrice?: number
}

export type Booking = {
  bookingId: string
  userId: string
  carId: number
  carModel: string
  pickupDate: string
  returnDate: string
  totalPrice: number
}

const drafts = new Map<string, BookingDraft>()
const bookings: Booking[] = []

export const getDraft = (userId: string) => {
  return drafts.get(userId) || null
}

export const setDraft = (userId: string, draft: BookingDraft) => {
  drafts.set(userId, draft)
}

export const clearDraft = (userId: string) => {
  drafts.delete(userId)
}

export const confirmBooking = (userId: string) => {
  const draft = drafts.get(userId)
  if (!draft || !draft.carId || !draft.carModel || !draft.pickupDate || !draft.returnDate) return null

  const bookingId = `BR-${Date.now().toString(36).toUpperCase().slice(-8)}`
  const booking: Booking = {
    bookingId,
    userId,
    carId: draft.carId,
    carModel: draft.carModel,
    pickupDate: draft.pickupDate,
    returnDate: draft.returnDate,
    totalPrice: draft.totalPrice || 0,
  }

  bookings.push(booking)
  drafts.delete(userId)

  return booking
}

export const listBookings = () => bookings.slice().reverse()

// helper: reset (for dev)
export const _resetBookings = () => {
  drafts.clear()
  bookings.length = 0
}
