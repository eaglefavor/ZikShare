-- ============================================
-- 03_fix_all_rls_lockdown.sql
-- Complete RLS policy purge & least-privilege rebuild
-- Eliminates legacy permissive policies across all public tables
-- Verified via adversarial anon PATCH test (returns 0 rows)
-- ============================================

DO $$ 
DECLARE r RECORD;
BEGIN
  FOR r IN (
    SELECT schemaname, tablename, policyname 
    FROM pg_policies 
    WHERE schemaname = 'public'
  ) LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', r.policyname, r.schemaname, r.tablename);
  END LOOP;
END $$;

-- 1. USERS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select"
  ON public.users FOR SELECT 
  USING (true);

CREATE POLICY "users_insert_own"
  ON public.users FOR INSERT TO authenticated
  WITH CHECK (uid = auth.uid());

CREATE POLICY "users_update_own"
  ON public.users FOR UPDATE TO authenticated
  USING (uid = auth.uid())
  WITH CHECK (uid = auth.uid());

CREATE POLICY "users_admin_all"
  ON public.users FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- 2. LISTINGS
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "listings_select"
  ON public.listings FOR SELECT 
  USING (status = 'Active' OR "sellerId" = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

CREATE POLICY "listings_insert"
  ON public.listings FOR INSERT TO authenticated
  WITH CHECK ("sellerId" = auth.uid());

CREATE POLICY "listings_update"
  ON public.listings FOR UPDATE TO authenticated
  USING ("sellerId" = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com')
  WITH CHECK ("sellerId" = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

CREATE POLICY "listings_delete"
  ON public.listings FOR DELETE TO authenticated
  USING ("sellerId" = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- 3. DIGITAL_PRODUCTS
ALTER TABLE public.digital_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "digital_select"
  ON public.digital_products FOR SELECT 
  USING (status = 'active' OR seller_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

CREATE POLICY "digital_insert"
  ON public.digital_products FOR INSERT TO authenticated
  WITH CHECK (seller_id = auth.uid());

CREATE POLICY "digital_update"
  ON public.digital_products FOR UPDATE TO authenticated
  USING (seller_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com')
  WITH CHECK (seller_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

CREATE POLICY "digital_delete"
  ON public.digital_products FOR DELETE TO authenticated
  USING (seller_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- 4. ORDERS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "orders_select"
  ON public.orders FOR SELECT TO authenticated
  USING (buyer_id = auth.uid() OR seller_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

CREATE POLICY "orders_insert"
  ON public.orders FOR INSERT TO authenticated
  WITH CHECK (buyer_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

CREATE POLICY "orders_update"
  ON public.orders FOR UPDATE TO authenticated
  USING (buyer_id = auth.uid() OR seller_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com')
  WITH CHECK (buyer_id = auth.uid() OR seller_id = auth.uid() OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

CREATE POLICY "orders_delete"
  ON public.orders FOR DELETE TO authenticated
  USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- 5. CONVERSATIONS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conversations_select"
  ON public.conversations FOR SELECT TO authenticated
  USING ("buyerId" = auth.uid()::text OR "sellerId" = auth.uid()::text OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

CREATE POLICY "conversations_insert"
  ON public.conversations FOR INSERT TO authenticated
  WITH CHECK ("buyerId" = auth.uid()::text OR "sellerId" = auth.uid()::text);

CREATE POLICY "conversations_update"
  ON public.conversations FOR UPDATE TO authenticated
  USING ("buyerId" = auth.uid()::text OR "sellerId" = auth.uid()::text)
  WITH CHECK ("buyerId" = auth.uid()::text OR "sellerId" = auth.uid()::text);

CREATE POLICY "conversations_delete"
  ON public.conversations FOR DELETE TO authenticated
  USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- 6. MESSAGES
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_select"
  ON public.messages FOR SELECT TO authenticated
  USING ("conversationId" IN (SELECT id FROM public.conversations WHERE "buyerId" = auth.uid()::text OR "sellerId" = auth.uid()::text) OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

CREATE POLICY "messages_insert"
  ON public.messages FOR INSERT TO authenticated
  WITH CHECK ("senderId" = auth.uid()::text AND "conversationId" IN (SELECT id FROM public.conversations WHERE "buyerId" = auth.uid()::text OR "sellerId" = auth.uid()::text));

CREATE POLICY "messages_delete"
  ON public.messages FOR DELETE TO authenticated
  USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

-- 7. ANNOUNCEMENTS
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "announcements_select"
  ON public.announcements FOR SELECT 
  USING (is_active = true OR auth.jwt() ->> 'email' = 'rc5632250@gmail.com');

CREATE POLICY "announcements_admin_all"
  ON public.announcements FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' = 'rc5632250@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'rc5632250@gmail.com');
