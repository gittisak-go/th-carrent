# th-carrent

![th-carrent](https://elite-rentals.vercel.app/images/social-media-image.jpg)

## Overview

`th-carrent` is a car rental platform designed to provide a seamless experience for both administrators and customers. It features an intuitive UI, robust authentication, and dynamic pages for managing cars, bookings, and more.

## Features

- Dynamic admin dashboard for managing bookings, cars, and more.
- Customer dashboard with car browsing and booking capabilities.
- Secure authentication system powered by Supabase.
- **PromptPay QR Code payment integration** for Thai banking apps.
- Stripe payment integration for international card payments.
- Responsive design optimized for both desktop and mobile devices.
- Modern UI and intuitive workflows.

## Technologies Used

- **Next.js 15**
- **Supabase**
- **Stripe** - International card payments
- **PromptPay** - Thai QR code payments
- **DaisyUI**
- **Cloudflare Turnstile**
- **FilePond**
- **Framer Motion**
- **Leaflet**
- **Next Themes**
- **React Icons**
- **Toastify**
- **Tailwind CSS**
- **TypeScript**

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/th-carrent)

1. Click the "Deploy" button above or manually deploy via [Vercel Dashboard](https://vercel.com/dashboard)
2. Connect your GitHub repository
3. Configure environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
   - `STRIPE_SECRET_KEY` - Your Stripe secret key (for card payments)
   - `NEXT_PUBLIC_PROMPTPAY_PHONE` - Your PromptPay phone number (for QR payments)
   - Add any additional API keys as needed
4. Deploy and enjoy!

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Make sure to create a `.env.local` file with your environment variables before running locally. See `.env.local.example` for reference.

For detailed information about the PromptPay QR code payment integration, see [docs/PROMPTPAY.md](docs/PROMPTPAY.md).

## Contact

For any inquiries or feedback, feel free to reach out at [kinangh98@gmail.com](mailto:kinangh98@gmail.com).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements.

## License

This project is licensed under the MIT License.
