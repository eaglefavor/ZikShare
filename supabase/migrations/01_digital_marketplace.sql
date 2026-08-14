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

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.digital_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active digital products"
    ON public.digital_products FOR SELECT
    USING (status = 'active');

CREATE POLICY "Sellers can manage their products"
    ON public.digital_products FOR ALL
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

CREATE POLICY "Buyers see their own orders"
    ON public.orders FOR SELECT
    USING (buyer_id = auth.uid());

CREATE POLICY "Sellers see orders for their products"
    ON public.orders FOR SELECT
    USING (seller_id = auth.uid());

-- ============================================
-- 4. STORAGE POLICIES
-- ============================================
-- Create buckets if they don't exist (assuming this will be run in the SQL editor directly by user or via migration tool)
INSERT INTO storage.buckets (id, name, public) VALUES ('digital-originals', 'digital-originals', false) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('digital-orders', 'digital-orders', false) ON CONFLICT DO NOTHING;

CREATE POLICY "Sellers can upload originals"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'digital-originals' AND auth.uid() = owner);

CREATE POLICY "Edge functions can read originals"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'digital-originals');

CREATE POLICY "Buyers can download their files"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'digital-orders'
        AND EXISTS (
            SELECT 1 FROM public.orders
            WHERE unique_storage_path = storage.objects.name
            AND buyer_id = auth.uid()
        )
    );
