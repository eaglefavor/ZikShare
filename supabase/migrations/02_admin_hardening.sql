-- ============================================
-- 02_admin_hardening.sql
-- P0 fix: enforce server-side admin authorization via RLS
-- Single admin: rc5632250@gmail.com
-- Implements AGENTS.md §2 & §3 — real enforcement, not client-only checks
-- ============================================

-- ============================================
-- 1. USERS table — lock down ban/verify mutations to admin only
-- ============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view users" ON public.users;
CREATE POLICY "Anyone can view users"
    ON public.users FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
CREATE POLICY "Users can insert own profile"
    ON public.users FOR INSERT
    TO authenticated
    WITH CHECK (uid = auth.uid());

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile"
    ON public.users FOR UPDATE
    TO authenticated
    USING (uid = auth.uid())
    WITH CHECK (uid = auth.uid());

DROP POLICY IF EXISTS "Admin can manage all users" ON public.users;
CREATE POLICY "Admin can manage all users"
    ON public.users FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com')
    WITH CHECK (auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- ============================================
-- 2. LISTINGS table — sellers own their rows, admin can moderate any
-- ============================================
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active listings" ON public.listings;
CREATE POLICY "Anyone can view active listings"
    ON public.listings FOR SELECT
    USING (status = 'Active');

DROP POLICY IF EXISTS "Authenticated can view all listings" ON public.listings;
CREATE POLICY "Authenticated can view all listings"
    ON public.listings FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Sellers can manage own listings" ON public.listings;
CREATE POLICY "Sellers can manage own listings"
    ON public.listings FOR ALL
    TO authenticated
    USING ("sellerId" = auth.uid())
    WITH CHECK ("sellerId" = auth.uid());

DROP POLICY IF EXISTS "Admin can manage all listings" ON public.listings;
CREATE POLICY "Admin can manage all listings"
    ON public.listings FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com')
    WITH CHECK (auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- ============================================
-- 3. DIGITAL_PRODUCTS — tighten existing policy + add admin
-- ============================================
ALTER TABLE public.digital_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin can manage all digital products" ON public.digital_products;
CREATE POLICY "Admin can manage all digital products"
    ON public.digital_products FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com')
    WITH CHECK (auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- ============================================
-- 4. ORDERS — keep buyer/seller visibility, add admin
-- ============================================
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin can view all orders" ON public.orders;
CREATE POLICY "Admin can view all orders"
    ON public.orders FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

DROP POLICY IF EXISTS "Admin can manage all orders" ON public.orders;
CREATE POLICY "Admin can manage all orders"
    ON public.orders FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com')
    WITH CHECK (auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- ============================================
-- 5. CONVERSATIONS & MESSAGES — private to participants, admin read-only
-- ============================================
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='conversations') THEN
        EXECUTE 'ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "Participants can manage conversations" ON public.conversations';
        EXECUTE $pol$CREATE POLICY "Participants can manage conversations" ON public.conversations FOR ALL TO authenticated USING ("buyerId" = auth.uid()::text OR "sellerId" = auth.uid()::text) WITH CHECK ("buyerId" = auth.uid()::text OR "sellerId" = auth.uid()::text)$pol$;
        EXECUTE 'DROP POLICY IF EXISTS "Admin can view all conversations" ON public.conversations';
        EXECUTE $pol$CREATE POLICY "Admin can view all conversations" ON public.conversations FOR SELECT TO authenticated USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com')$pol$;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='messages') THEN
        EXECUTE 'ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "Participants can manage messages" ON public.messages';
        EXECUTE $pol$CREATE POLICY "Participants can manage messages" ON public.messages FOR ALL TO authenticated USING ("senderId" = auth.uid()::text OR "conversationId" IN (SELECT id FROM public.conversations WHERE "buyerId" = auth.uid()::text OR "sellerId" = auth.uid()::text)) WITH CHECK ("senderId" = auth.uid()::text)$pol$;
        EXECUTE 'DROP POLICY IF EXISTS "Admin can view all messages" ON public.messages';
        EXECUTE $pol$CREATE POLICY "Admin can view all messages" ON public.messages FOR SELECT TO authenticated USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com')$pol$;
    END IF;
END $$;

-- ============================================
-- 6. ANNOUNCEMENTS — public read, admin write
-- ============================================
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='announcements') THEN
        EXECUTE 'ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "Anyone can view active announcements" ON public.announcements';
        EXECUTE $pol$CREATE POLICY "Anyone can view active announcements" ON public.announcements FOR SELECT USING (is_active = true)$pol$;
        EXECUTE 'DROP POLICY IF EXISTS "Authenticated can view all announcements" ON public.announcements';
        EXECUTE $pol$CREATE POLICY "Authenticated can view all announcements" ON public.announcements FOR SELECT TO authenticated USING (true)$pol$;
        EXECUTE 'DROP POLICY IF EXISTS "Admin can manage announcements" ON public.announcements';
        EXECUTE $pol$CREATE POLICY "Admin can manage announcements" ON public.announcements FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com') WITH CHECK (auth.jwt() ->> 'email' = 'rc5632250@gmail.com')$pol$;
    END IF;
END $$;

-- ============================================
-- 7. STORAGE — enforce owner folder prefix for digital-originals
-- ============================================
DROP POLICY IF EXISTS "Authenticated users can upload to digital-originals" ON storage.objects;
DROP POLICY IF EXISTS "Owners can upload to own folder in digital-originals" ON storage.objects;
CREATE POLICY "Owners can upload to own folder in digital-originals"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'digital-originals'
        AND (
            (storage.foldername(name))[1] = 'digital' AND (storage.foldername(name))[2] = auth.uid()::text
            OR (storage.foldername(name))[1] = 'diag'
        )
    );

DROP POLICY IF EXISTS "Authenticated users can update in digital-originals" ON storage.objects;
DROP POLICY IF EXISTS "Owners can update own folder in digital-originals" ON storage.objects;
CREATE POLICY "Owners can update own folder in digital-originals"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'digital-originals'
        AND (
            (storage.foldername(name))[1] = 'digital' AND (storage.foldername(name))[2] = auth.uid()::text
            OR (storage.foldername(name))[1] = 'diag'
        )
    );

DROP POLICY IF EXISTS "Owners can delete own folder in digital-originals" ON storage.objects;
CREATE POLICY "Owners can delete own folder in digital-originals"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'digital-originals'
        AND (storage.foldername(name))[2] = auth.uid()::text
    );

DROP POLICY IF EXISTS "Authenticated users can upload to digital-orders" ON storage.objects;
DROP POLICY IF EXISTS "Service role can manage digital-orders" ON storage.objects;
CREATE POLICY "Service role can manage digital-orders"
    ON storage.objects FOR ALL
    TO service_role
    USING (bucket_id = 'digital-orders')
    WITH CHECK (bucket_id = 'digital-orders');
