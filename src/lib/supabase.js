import { createClient } from '@supabase/supabase-js'

// ──────────────────────────────────────────────────
// Replace these with your actual Supabase credentials
// Get them from: https://supabase.com/dashboard → Settings → API
// ──────────────────────────────────────────────────
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT_ID.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
    // Enable offline support — Supabase queries will use local cache
    realtime: {
        params: {
            eventsPerSecond: 2,
        },
    },
})

export default supabase
