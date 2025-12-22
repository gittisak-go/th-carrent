'use server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(carDetails: {
    name: string;
    price: number;
    imageUrls: string[]
}, successUrl: string, cancelUrl: string)
{
    const data: { url: string | null, error: string | null } = {url: null, error: null};
    try
    {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: carDetails.name,
                            images: carDetails.imageUrls,
                        },
                        unit_amount: carDetails.price * 100, // Stripe expects the amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
        });

        // URL to redirect the user
        data.url = session.url;
    } catch (error)
    {
        data.error = `${error}`;
    }

    return data;
}

/**
 * Create a PromptPay payment session
 * This generates a unique payment ID for tracking PromptPay payments
 */
export async function createPromptPaySession(carDetails: {
    name: string;
    price: number;
    carId: number;
}, bookingDetails: {
    pickupDate: string;
    pickupTime: string;
    deliveryLocation: string;
}) {
    const data: { paymentId: string | null, error: string | null } = { paymentId: null, error: null };
    
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            data.error = 'User not authenticated';
            return data;
        }

        // Generate a unique payment ID (using timestamp + random string)
        const paymentId = `PP-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

        // Store pending payment in database
        const { error } = await supabase.schema('elite_rentals')
            .from('promptpay_payments')
            .insert({
                payment_id: paymentId,
                user_id: user.id,
                car_id: carDetails.carId,
                amount: carDetails.price,
                status: 'pending',
                pickup_date: bookingDetails.pickupDate,
                pickup_time: parseInt(bookingDetails.pickupTime),
                pickup_location: bookingDetails.deliveryLocation,
            });

        if (error) {
            console.error('Error creating PromptPay session:', error);
            data.error = 'Failed to create payment session';
            return data;
        }

        data.paymentId = paymentId;
    } catch (error) {
        data.error = `${error}`;
    }

    return data;
}

/**
 * Confirm PromptPay payment (called after user confirms they have paid)
 */
export async function confirmPromptPayPayment(paymentId: string) {
    const data: { success: boolean, error: string | null } = { success: false, error: null };
    
    try {
        const supabase = await createClient();
        
        // Update payment status to confirmed
        const { error } = await supabase.schema('elite_rentals')
            .from('promptpay_payments')
            .update({ 
                status: 'confirmed',
                confirmed_at: new Date().toISOString()
            })
            .eq('payment_id', paymentId);

        if (error) {
            console.error('Error confirming payment:', error);
            data.error = 'Failed to confirm payment';
            return data;
        }

        data.success = true;
    } catch (error) {
        data.error = `${error}`;
    }

    return data;
}

