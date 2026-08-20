import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('[ZikShare] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — check .env. App will not connect to Supabase.')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        // Bypass navigator.locks to prevent browser lock deadlock bug on page refresh/concurrent calls
        lock: async (_name, _acquireTimeout, fn) => {
            try {
                return await fn()
            } catch (err) {
                console.warn('Supabase auth lock execution error:', err?.message)
                throw err
            }
        },
    },
    realtime: {
        params: {
            eventsPerSecond: 2,
        },
    },
})

export default supabase
