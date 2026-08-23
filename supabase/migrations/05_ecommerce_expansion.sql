-- ============================================
-- 05_ecommerce_expansion.sql
-- Complete C2C Campus E-Commerce & JiJi-Style Structure
-- Offers & In-Chat Bargaining, Physical Escrow Handshake PINs,
-- Verified Reviews & Ratings, Student "Looking For (ISO)" Board
-- ============================================

-- 1. Extend existing tables with granular JiJi taxonomy & campus metadata
ALTER TABLE public.listings 
    ADD COLUMN IF NOT EXISTS subcategory TEXT,
    ADD COLUMN IF NOT EXISTS course_code TEXT,
    ADD COLUMN IF NOT EXISTS level TEXT,
    ADD COLUMN IF NOT EXISTS faculty TEXT,
    ADD COLUMN IF NOT EXISTS department TEXT,
    ADD COLUMN IF NOT EXISTS lodge_location TEXT,
    ADD COLUMN IF NOT EXISTS is_boosted BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS boosted_until TIMESTAMPTZ;

ALTER TABLE public.digital_products 
    ADD COLUMN IF NOT EXISTS subcategory TEXT,
    ADD COLUMN IF NOT EXISTS course_code TEXT,
    ADD COLUMN IF NOT EXISTS level TEXT,
    ADD COLUMN IF NOT EXISTS faculty TEXT,
    ADD COLUMN IF NOT EXISTS department TEXT,
    ADD COLUMN IF NOT EXISTS is_boosted BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS boosted_until TIMESTAMPTZ;

ALTER TABLE public.users 
    ADD COLUMN IF NOT EXISTS faculty TEXT,
    ADD COLUMN IF NOT EXISTS level TEXT,
    ADD COLUMN IF NOT EXISTS lodge_location TEXT,
    ADD COLUMN IF NOT EXISTS matric_number TEXT;

-- 2. In-Chat Price Bargaining & Offers Table
CREATE TABLE IF NOT EXISTS public.offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    listing_id TEXT,
    buyer_id UUID REFERENCES public.users(uid) ON DELETE CASCADE,
    seller_id UUID REFERENCES public.users(uid) ON DELETE CASCADE,
    original_price NUMERIC NOT NULL,
    offer_amount_naira NUMERIC NOT NULL,
    offer_amount_kobo INTEGER NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending' | 'accepted' | 'declined' | 'countered' | 'paid'
    counter_amount_naira NUMERIC,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "offers_select" ON public.offers;
CREATE POLICY "offers_select"
    ON public.offers FOR SELECT TO authenticated
    USING (buyer_id = auth.uid() OR seller_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

DROP POLICY IF EXISTS "offers_insert" ON public.offers;
CREATE POLICY "offers_insert"
    ON public.offers FOR INSERT TO authenticated
    WITH CHECK (buyer_id = auth.uid());

DROP POLICY IF EXISTS "offers_update" ON public.offers;
CREATE POLICY "offers_update"
    ON public.offers FOR UPDATE TO authenticated
    USING (buyer_id = auth.uid() OR seller_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com')
    WITH CHECK (buyer_id = auth.uid() OR seller_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- 3. Verified Student Ratings & Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES public.users(uid) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES public.users(uid) ON DELETE CASCADE,
    listing_id TEXT,
    order_id UUID,
    item_title TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_verified_buyer BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "reviews_select" ON public.reviews;
CREATE POLICY "reviews_select"
    ON public.reviews FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "reviews_insert" ON public.reviews;
CREATE POLICY "reviews_insert"
    ON public.reviews FOR INSERT TO authenticated
    WITH CHECK (reviewer_id = auth.uid());

DROP POLICY IF EXISTS "reviews_delete" ON public.reviews;
CREATE POLICY "reviews_delete"
    ON public.reviews FOR DELETE TO authenticated
    USING (reviewer_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- 4. "Looking For / ISO (In Search Of)" Student Demand Board
CREATE TABLE IF NOT EXISTS public.requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(uid) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    subcategory TEXT,
    budget_naira NUMERIC,
    preferred_location TEXT,
    status TEXT DEFAULT 'open', -- 'open' | 'fulfilled' | 'closed'
    replies_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "requests_select" ON public.requests;
CREATE POLICY "requests_select"
    ON public.requests FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "requests_insert" ON public.requests;
CREATE POLICY "requests_insert"
    ON public.requests FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "requests_update" ON public.requests;
CREATE POLICY "requests_update"
    ON public.requests FOR UPDATE TO authenticated
    USING (user_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com')
    WITH CHECK (user_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

DROP POLICY IF EXISTS "requests_delete" ON public.requests;
CREATE POLICY "requests_delete"
    ON public.requests FOR DELETE TO authenticated
    USING (user_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- 5. Physical Escrow & Handshake PIN Exchange Table
CREATE TABLE IF NOT EXISTS public.escrow_trades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id TEXT NOT NULL,
    item_title TEXT NOT NULL,
    buyer_id UUID REFERENCES public.users(uid) ON DELETE CASCADE,
    seller_id UUID REFERENCES public.users(uid) ON DELETE CASCADE,
    amount_kobo INTEGER NOT NULL,
    amount_naira NUMERIC NOT NULL,
    meetup_location TEXT NOT NULL,
    handshake_pin TEXT NOT NULL, -- 4-digit secret PIN given to buyer upon payment
    paystack_reference TEXT,
    status TEXT DEFAULT 'escrow_held', -- 'escrow_held' | 'meetup_scheduled' | 'delivered' | 'disputed' | 'cancelled'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

ALTER TABLE public.escrow_trades ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "escrow_select" ON public.escrow_trades;
CREATE POLICY "escrow_select"
    ON public.escrow_trades FOR SELECT TO authenticated
    USING (buyer_id = auth.uid() OR seller_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

DROP POLICY IF EXISTS "escrow_insert" ON public.escrow_trades;
CREATE POLICY "escrow_insert"
    ON public.escrow_trades FOR INSERT TO authenticated
    WITH CHECK (buyer_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

DROP POLICY IF EXISTS "escrow_update" ON public.escrow_trades;
CREATE POLICY "escrow_update"
    ON public.escrow_trades FOR UPDATE TO authenticated
    USING (buyer_id = auth.uid() OR seller_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com')
    WITH CHECK (buyer_id = auth.uid() OR seller_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- 6. High Performance Search & Lookup Indexes
CREATE INDEX IF NOT EXISTS idx_listings_subcategory ON public.listings(subcategory);
CREATE INDEX IF NOT EXISTS idx_listings_course_code ON public.listings(course_code);
CREATE INDEX IF NOT EXISTS idx_listings_boosted ON public.listings(is_boosted, boosted_until);
CREATE INDEX IF NOT EXISTS idx_digital_course_code ON public.digital_products(course_code);
CREATE INDEX IF NOT EXISTS idx_reviews_seller ON public.reviews(seller_id);
CREATE INDEX IF NOT EXISTS idx_offers_conversation ON public.offers(conversation_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.requests(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_escrow_buyer_seller ON public.escrow_trades(buyer_id, seller_id, status);
