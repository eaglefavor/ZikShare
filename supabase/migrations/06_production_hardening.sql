-- ============================================
-- 06_production_hardening.sql
-- Production hardening: admin config helper, constraints, idempotency, indexes
-- ============================================

-- 1) Admin email setting + helper (config-backed, no hardcoded identities)
-- Configure at project/database level:
-- ALTER DATABASE postgres SET app.settings.admin_email = 'admin@yourdomain.com';

CREATE OR REPLACE FUNCTION public.current_admin_email()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT lower(coalesce(current_setting('app.settings.admin_email', true), ''))
$$;

CREATE OR REPLACE FUNCTION public.is_platform_admin()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT lower(coalesce(auth.jwt() ->> 'email', '')) = public.current_admin_email()
$$;

-- 2) Replay-safe payout requests
ALTER TABLE public.payouts
  ADD COLUMN IF NOT EXISTS idempotency_key text;

CREATE UNIQUE INDEX IF NOT EXISTS ux_payouts_seller_idempotency
  ON public.payouts (seller_id, idempotency_key)
  WHERE idempotency_key IS NOT NULL;

-- 3) Hard constraints for payment/order/payout state consistency
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'orders_status_allowed'
  ) THEN
    ALTER TABLE public.orders
      ADD CONSTRAINT orders_status_allowed
      CHECK (status IN ('pending', 'delivered', 'failed', 'amount_mismatch', 'refunded', 'cancelled'));
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'payouts_status_allowed'
  ) THEN
    ALTER TABLE public.payouts
      ADD CONSTRAINT payouts_status_allowed
      CHECK (status IN ('pending', 'success', 'failed'));
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'offers_status_allowed'
  ) THEN
    ALTER TABLE public.offers
      ADD CONSTRAINT offers_status_allowed
      CHECK (status IN ('pending', 'accepted', 'declined', 'countered', 'paid'));
  END IF;
END$$;

-- 4) Additional high-traffic query indexes
CREATE INDEX IF NOT EXISTS idx_orders_reference_status
  ON public.orders (paystack_reference, status);

CREATE INDEX IF NOT EXISTS idx_orders_seller_created
  ON public.orders (seller_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_buyer_created
  ON public.orders (buyer_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_payouts_reference
  ON public.payouts (paystack_reference);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_created
  ON public.messages ("conversationId", "createdAt" DESC);
