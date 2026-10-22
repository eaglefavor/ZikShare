-- ============================================
-- 06_fresher_library_pdfs.sql
-- Makes the authored fresher PDF catalog storable and idempotently seedable:
--   * preview_path   public 3-page preview served from /library/previews
--   * page_count     measured from the generated PDF, not estimated
--   * domain         the catalog segment (GST, Faculty Primer, Study Skills, ...)
--   * unique key     (seller_id, original_storage_path) so the seed script can upsert
-- ============================================

ALTER TABLE public.digital_products
    ADD COLUMN IF NOT EXISTS preview_path TEXT,
    ADD COLUMN IF NOT EXISTS page_count INTEGER,
    ADD COLUMN IF NOT EXISTS domain TEXT;

-- One row per official PDF per seller: the seed script upserts on this key.
CREATE UNIQUE INDEX IF NOT EXISTS idx_digital_products_seller_storage_path
    ON public.digital_products (seller_id, original_storage_path)
    WHERE original_storage_path IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_digital_products_domain
    ON public.digital_products (domain);

-- The preview PDFs are unsigned public assets under /library/previews/<slug>.pdf,
-- so no storage bucket policy is required for them. Full PDFs stay private in
-- `digital-originals` and are only read through createSignedDownloadUrl().
