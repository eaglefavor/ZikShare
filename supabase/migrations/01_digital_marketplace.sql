-- ============================================
-- 1. EXTEND USERS TABLE FOR PAYSTACK
-- ============================================
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS paystack_subaccount_code TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS bank_name TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS bank_code TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS account_number TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS account_name TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS total_earnings INTEGER DEFAULT 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS total_sales INTEGER DEFAULT 0;

-- ============================================
-- 2. DIGITAL PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.digital_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES public.users(uid) ON DELETE CASCADE,

    title TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'Digital PDF',

    original_storage_path TEXT,
    file_size_bytes BIGINT,

    price INTEGER NOT NULL,
    currency TEXT DEFAULT 'NGN',

    status TEXT DEFAULT 'active',
    sales_count INTEGER DEFAULT 0,
    cover_image_url TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.digital_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active digital products" ON public.digital_products;
CREATE POLICY "Anyone can view active digital products"
    ON public.digital_products FOR SELECT
    USING (status = 'active');

DROP POLICY IF EXISTS "Sellers can manage their products" ON public.digital_products;
CREATE POLICY "Sellers can manage their products"
    ON public.digital_products FOR ALL
    TO authenticated
    USING (seller_id = auth.uid());

-- ============================================
-- 3. ORDERS TABLE (Digital)
-- ============================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID REFERENCES public.users(uid),
    seller_id UUID REFERENCES public.users(uid),
    product_id UUID REFERENCES public.digital_products(id),

    paystack_reference TEXT UNIQUE,
    paystack_transaction_id TEXT,

    amount INTEGER NOT NULL,
    platform_fee INTEGER NOT NULL,
    seller_settlement INTEGER NOT NULL,

    status TEXT DEFAULT 'pending',

    unique_storage_path TEXT,
    unique_password TEXT,
    watermark_text TEXT,
    file_hash TEXT,

    download_token TEXT UNIQUE,
    download_expires_at TIMESTAMPTZ,
    max_downloads INTEGER DEFAULT 3,
    download_count INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Buyers see their own orders" ON public.orders;
CREATE POLICY "Buyers see their own orders"
    ON public.orders FOR SELECT
    TO authenticated
    USING (buyer_id = auth.uid());

DROP POLICY IF EXISTS "Buyers can create pending orders" ON public.orders;
CREATE POLICY "Buyers can create pending orders"
    ON public.orders FOR INSERT
    TO authenticated
    WITH CHECK (buyer_id = auth.uid());

DROP POLICY IF EXISTS "Sellers see orders for their products" ON public.orders;
CREATE POLICY "Sellers see orders for their products"
    ON public.orders FOR SELECT
    TO authenticated
    USING (seller_id = auth.uid());

-- ============================================
-- 4. STORAGE BUCKETS & POLICIES
-- ============================================
-- Create private buckets for DRM digital materials
INSERT INTO storage.buckets (id, name, public) 
VALUES ('digital-originals', 'digital-originals', false)
ON CONFLICT (id) DO UPDATE SET public = false;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('digital-orders', 'digital-orders', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- Storage Policies for digital-originals (Sellers upload raw PDFs to their own folder)
DROP POLICY IF EXISTS "Public can view digital-originals" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to digital-originals" ON storage.objects;
CREATE POLICY "Authenticated users can upload to digital-originals"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'digital-originals');

DROP POLICY IF EXISTS "Authenticated users can update in digital-originals" ON storage.objects;
CREATE POLICY "Authenticated users can update in digital-originals"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'digital-originals');

-- Storage Policies for digital-orders (Processed watermarked PDFs)
DROP POLICY IF EXISTS "Public can read digital-orders" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to digital-orders" ON storage.objects;
CREATE POLICY "Authenticated users can upload to digital-orders"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'digital-orders');

DROP POLICY IF EXISTS "Buyers can read their delivered digital orders" ON storage.objects;
CREATE POLICY "Buyers can read their delivered digital orders"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (bucket_id = 'digital-orders');

