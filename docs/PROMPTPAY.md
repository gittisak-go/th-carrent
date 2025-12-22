# PromptPay QR Code Payment Integration

This document describes the PromptPay QR code payment integration for the th-carrent application.

## Overview

PromptPay is Thailand's national e-payment system that allows users to make payments via QR codes using their mobile banking applications. This integration enables customers to pay for car rentals by scanning a QR code with any Thai banking app.

## Features

- Generate PromptPay QR codes for payments
- Support for phone number and national ID card identifiers
- Fixed amount QR codes for car rental bookings
- Real-time QR code generation on the client side
- Payment tracking and confirmation flow

## Implementation

### Dependencies

The following npm packages are used:

- `promptpay-qr` - Generates PromptPay payment payloads
- `qrcode` - Generates QR codes from payment payloads
- `@types/qrcode` - TypeScript types for qrcode

### Configuration

Add the following environment variables to your `.env.local` file:

```env
# PromptPay Configuration
# Use either phone number (format: 0812345678) or ID card number (format: 1234567890123)
NEXT_PUBLIC_PROMPTPAY_PHONE=0812345678
# NEXT_PUBLIC_PROMPTPAY_ID_CARD=1234567890123
```

### Database Setup

Run the migration to create the `promptpay_payments` table:

```sql
-- See supabase/migrations/20250101_create_promptpay_payments.sql
```

This creates:
- `promptpay_payments` table to track payment sessions
- Row Level Security (RLS) policies for user privacy
- Indexes for performance
- Triggers for automatic timestamp updates

### File Structure

```
lib/util/promptpay.ts                    # PromptPay utility functions
app/components/PromptPayQR.tsx           # QR code display component
app/(dashboard)/customer/booking/
  step1/
    action.ts                            # Updated with PromptPay session creation
    BookingStep1PageContent.tsx          # Updated with PromptPay option
  step2-promptpay/
    page.tsx                             # PromptPay payment page (server)
    PromptPayPaymentContent.tsx          # PromptPay payment page (client)
```

## Usage Flow

### 1. Customer selects PromptPay payment

In the booking details page (`step1`), customers can choose between:
- Card payment (Stripe)
- PromptPay QR code payment

### 2. Payment session creation

When PromptPay is selected:
1. A unique payment ID is generated
2. Payment details are stored in the database with "pending" status
3. Customer is redirected to the PromptPay payment page

### 3. QR code display

The PromptPay payment page (`step2-promptpay`):
1. Displays a QR code with the payment amount
2. Shows booking summary
3. Provides a confirmation button

### 4. Payment confirmation

After scanning and paying via their banking app:
1. Customer clicks "ยืนยันการชำระเงิน" (Confirm Payment)
2. Payment status is updated to "confirmed"
3. Customer is redirected to the success page (`step3`)

## API Reference

### Utility Functions

#### `generatePromptPayQR(options)`

Generates a PromptPay QR code as an SVG string.

```typescript
import { generatePromptPayQR } from '@/lib/util/promptpay';

const qrSvg = await generatePromptPayQR({
  phoneNumber: '0812345678',
  amount: 1500
});
```

#### `generatePromptPayQRDataURL(options)`

Generates a PromptPay QR code as a data URL for use in `<img>` tags.

```typescript
import { generatePromptPayQRDataURL } from '@/lib/util/promptpay';

const qrDataUrl = await generatePromptPayQRDataURL({
  phoneNumber: '0812345678',
  amount: 1500
});
```

### Server Actions

#### `createPromptPaySession(carDetails, bookingDetails)`

Creates a payment session for PromptPay.

```typescript
const { paymentId, error } = await createPromptPaySession(
  {
    name: 'Toyota Camry',
    price: 1500,
    carId: 123
  },
  {
    pickupDate: '2025-01-15-2025-01-20',
    pickupTime: '10',
    deliveryLocation: '{"lat": 13.736717, "lng": 100.523186}'
  }
);
```

#### `confirmPromptPayPayment(paymentId)`

Confirms a PromptPay payment after the user has paid.

```typescript
const { success, error } = await confirmPromptPayPayment('PP-1234567890-abc123');
```

## Components

### `<PromptPayQR>`

Client component that displays a PromptPay QR code.

```tsx
<PromptPayQR
  phoneNumber="0812345678"
  amount={1500}
  className="w-full"
/>
```

Props:
- `phoneNumber` (optional): PromptPay phone number
- `idCard` (optional): PromptPay ID card number
- `amount` (required): Payment amount in THB
- `className` (optional): Additional CSS classes

## Testing

### Manual Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the booking flow
3. Select a car and proceed to checkout
4. Choose "ชำระด้วย PromptPay (QR Code)"
5. Scan the QR code with a Thai banking app (e.g., SCB Easy, K PLUS, Bangkok Bank Mobile)
6. Complete the payment in your banking app
7. Return to the website and click "ยืนยันการชำระเงิน"

### Test Phone Numbers

For testing, you can use test PromptPay numbers. Note that these will generate valid QR codes but won't process real payments in production banking apps.

## Security Considerations

1. **Client-side QR generation**: QR codes are generated on the client to avoid exposing sensitive payment information in server logs

2. **Row Level Security**: Database policies ensure users can only access their own payment records

3. **Payment confirmation**: The current implementation requires manual confirmation. In production, consider integrating with bank APIs for automatic payment verification

4. **Environment variables**: PromptPay identifiers are stored in environment variables and not committed to version control

## Limitations & Future Improvements

1. **Manual confirmation**: Currently requires users to manually confirm payment. Consider:
   - Integrating with bank APIs for automatic verification
   - Implementing webhook notifications from payment gateways
   - Adding QR code expiration times

2. **Payment verification**: The system trusts user confirmation. Consider:
   - Admin verification dashboard
   - Bank statement reconciliation
   - Third-party payment verification services

3. **Refunds**: No refund mechanism is currently implemented

4. **Multiple payment methods**: Cannot currently split payments between multiple methods

## References

- [PromptPay QR Code Specification](https://www.bot.or.th/Thai/PaymentSystems/StandardPS/Documents/ThaiQRCode_Payment_Standard.pdf)
- [promptpay-qr npm package](https://www.npmjs.com/package/promptpay-qr)
- [Medium Article: PromptPay QR Code Implementation](https://medium.com/@thanainankhamthaen/promptpay-qr-code-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%88%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%9C%E0%B9%88%E0%B8%B2%E0%B8%99-mobile-banking-d5ec71aad68a)

## License

This integration is part of the th-carrent project. See LICENSE for details.
