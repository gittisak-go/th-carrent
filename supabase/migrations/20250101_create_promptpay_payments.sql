-- Create PromptPay payments table
-- This table stores PromptPay payment information for tracking QR code payments

CREATE TABLE IF NOT EXISTS elite_rentals.promptpay_payments (
    id BIGSERIAL PRIMARY KEY,
    payment_id TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    car_id BIGINT NOT NULL REFERENCES elite_rentals.cars(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    pickup_date TEXT NOT NULL,
    pickup_time INTEGER NOT NULL,
    pickup_location TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    confirmed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_promptpay_payments_payment_id ON elite_rentals.promptpay_payments(payment_id);
CREATE INDEX IF NOT EXISTS idx_promptpay_payments_user_id ON elite_rentals.promptpay_payments(user_id);
CREATE INDEX IF NOT EXISTS idx_promptpay_payments_status ON elite_rentals.promptpay_payments(status);

-- Add comment to table
COMMENT ON TABLE elite_rentals.promptpay_payments IS 'Stores PromptPay QR code payment information for car rentals';

-- Enable Row Level Security (RLS)
ALTER TABLE elite_rentals.promptpay_payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow users to view their own payments
CREATE POLICY "Users can view their own PromptPay payments"
    ON elite_rentals.promptpay_payments
    FOR SELECT
    USING (auth.uid() = user_id);

-- Allow users to insert their own payments
CREATE POLICY "Users can create their own PromptPay payments"
    ON elite_rentals.promptpay_payments
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own payments
CREATE POLICY "Users can update their own PromptPay payments"
    ON elite_rentals.promptpay_payments
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION elite_rentals.update_promptpay_payments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_promptpay_payments_updated_at
    BEFORE UPDATE ON elite_rentals.promptpay_payments
    FOR EACH ROW
    EXECUTE FUNCTION elite_rentals.update_promptpay_payments_updated_at();
