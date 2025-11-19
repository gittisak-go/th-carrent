'use server';
import Stripe from 'stripe';

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
