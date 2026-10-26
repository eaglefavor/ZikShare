-- 08_listing_reports.sql
-- A way for a student to report a listing or a seller.
--
-- Applied to the live project on 2026-10-26 (migration name "listing_reports").
-- The user table in this project keys on `users.uid`, not `users.id`, and the
-- admin allow-list is one email rather than an array.
--
-- Until now moderation existed only inside the admin page: a bad listing stayed
-- up until an admin happened to see it. Anyone signed in (or not) can now file a
-- report; only admins can read the queue.
--
-- Run in the Supabase SQL editor, or `supabase db push`.

CREATE TABLE IF NOT EXISTS public.listing_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
    reporter_id UUID REFERENCES public.users(uid) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    detail TEXT,
    status TEXT NOT NULL DEFAULT 'open', -- 'open' | 'resolved' | 'dismissed'
    resolved_by UUID REFERENCES public.users(uid) ON DELETE SET NULL,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS listing_reports_status_idx
    ON public.listing_reports (status, created_at DESC);

ALTER TABLE public.listing_reports ENABLE ROW LEVEL SECURITY;

-- Anyone may file a report: requiring a sign-in would mean most bad listings
-- never get reported at all.
DROP POLICY IF EXISTS "anyone can file a report" ON public.listing_reports;
CREATE POLICY "anyone can file a report"
    ON public.listing_reports
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Reading the queue is an admin job. Admins are identified by the same rule the
-- app uses (an allow-listed email), so this stays consistent with the UI.
DROP POLICY IF EXISTS "admins read reports" ON public.listing_reports;
CREATE POLICY "admins read reports"
    ON public.listing_reports
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.users u
            WHERE u.uid = auth.uid()
              AND lower(u.email) = 'rc5632250@gmail.com'
        )
    );

-- Only an admin can close a report.
DROP POLICY IF EXISTS "admins resolve reports" ON public.listing_reports;
CREATE POLICY "admins resolve reports"
    ON public.listing_reports
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.users u
            WHERE u.uid = auth.uid()
              AND lower(u.email) = 'rc5632250@gmail.com'
        )
    );

COMMENT ON TABLE public.listing_reports IS
    'Reports filed by students against a listing. Written from the item page; read from the admin Reports tab.';
