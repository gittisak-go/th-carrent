'use server';

/**
 * PromptPay Payment Action
 * แทนที่ Stripe ด้วยระบบ PromptPay QR Code
 */

export async function createBookingWithPromptPay(carDetails: {
    name: string;
    price: number;
    imageUrls: string[]
}, successUrl: string, cancelUrl: string)
{
    const data: { url: string | null, error: string | null, bookingId?: string } = {url: null, error: null};
    try
    {
        // สร้าง booking ID สำหรับการอ้างอิง
        const bookingId = `BK${Date.now()}`;
        
        // เปลี่ยนเส้นทางไปยังหน้าแสดง QR Code PromptPay
        // แทนที่การเปลี่ยนเส้นทางไป Stripe
        const promptPayUrl = successUrl.replace('step3', 'step2') + `&booking_id=${bookingId}`;
        data.url = promptPayUrl;
        data.bookingId = bookingId;
        
    } catch (error)
    {
        data.error = `${error}`;
    }

    return data;
}

// รักษา function เดิมไว้เพื่อ backward compatibility
export async function createCheckoutSession(carDetails: {
    name: string;
    price: number;
    imageUrls: string[]
}, successUrl: string, cancelUrl: string)
{
    // เรียกใช้ PromptPay แทน Stripe
    return createBookingWithPromptPay(carDetails, successUrl, cancelUrl);
}
