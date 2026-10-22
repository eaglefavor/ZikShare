-- ============================================
-- 07_free_library.sql
-- The library is free, permanently.
--
--   * price 0 on every official library pack (no fee before download)
--   * drm_enabled false (no watermark, no PDF password, no order required)
--   * is_free flag so the UI never re-introduces a paywall on seeded rows
--
-- Seeds from scripts/seed-library.mjs write these values directly; this
-- migration backfills any rows seeded before the pricing change and keeps
-- independently-sold seller PDFs untouched.
-- ============================================

ALTER TABLE public.digital_products
    ADD COLUMN IF NOT EXISTS drm_enabled BOOLEAN DEFAULT TRUE,
    ADD COLUMN IF NOT EXISTS is_free BOOLEAN DEFAULT FALSE;

-- Backfill: everything under the official-library/ prefix is a free ZikShare pack.
UPDATE public.digital_products
SET price = 0,
    drm_enabled = FALSE,
    is_free = TRUE,
    status = 'active'
WHERE original_storage_path LIKE 'official-library/%';

CREATE INDEX IF NOT EXISTS idx_digital_products_is_free
    ON public.digital_products (is_free)
    WHERE is_free = TRUE;

-- Full packs are also served publicly from the app at /library/packs/<slug>.pdf,
-- so a download never depends on a signed URL or a completed payment. The
-- bucket copy stays private as a fallback for the seller dashboard.
COMMENT ON COLUMN public.digital_products.is_free IS
    'True for ZikShare library packs: price is always 0 and downloads never require payment.';
