-- ============================================
-- 04_payment_hardening_and_payouts.sql
-- Harden order fulfillment: ONLY service_role (Edge Functions / Webhook) and Admin can mark delivered
-- Create payouts ledger table for accurate seller earnings & withdrawals
-- Add indexes for fast Paystack reference lookups & dispute resolution
-- ============================================

-- 1. Create payouts table if not exists
CREATE TABLE IF NOT EXISTS public.payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES public.users(uid) ON DELETE CASCADE,
    amount INTEGER NOT NULL, -- in Kobo
    amount_naira NUMERIC NOT NULL,
    bank_name TEXT,
    bank_code TEXT NOT NULL,
    account_number TEXT NOT NULL,
    account_name TEXT,
    recipient_code TEXT,
    transfer_code TEXT,
    paystack_reference TEXT,
    status TEXT DEFAULT 'pending', -- 'pending' | 'success' | 'failed'
    failure_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on payouts
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "payouts_select" ON public.payouts;
CREATE POLICY "payouts_select"
    ON public.payouts FOR SELECT TO authenticated
    USING (seller_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

DROP POLICY IF EXISTS "payouts_admin_all" ON public.payouts;
CREATE POLICY "payouts_admin_all"
    ON public.payouts FOR ALL TO authenticated
    USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com')
    WITH CHECK (auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- 2. Harden orders RLS: Prevent authenticated clients from changing status to delivered
-- Drop existing permissive orders_update policy
DROP POLICY IF EXISTS "orders_update" ON public.orders;

-- Only Admin or service_role can update orders (e.g., status='delivered', unique_password, storage paths)
-- Authenticated regular users CANNOT update orders
CREATE POLICY "orders_admin_update"
    ON public.orders FOR UPDATE TO authenticated
    USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com')
    WITH CHECK (auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- 3. Indexes for fast payment reference lookups & dispute resolution
CREATE INDEX IF NOT EXISTS idx_orders_paystack_ref ON public.orders (paystack_reference);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_status ON public.orders (buyer_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_seller_status ON public.orders (seller_id, status);
CREATE INDEX IF NOT EXISTS idx_payouts_seller ON public.payouts (seller_id, status);
