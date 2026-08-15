import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://jiateaqbyaalwrkbtvjf.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppYXRlYXFieWFhbHdya2J0dmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzM4NzAsImV4cCI6MjA4NzU0OTg3MH0.DSn25Cix6IcelovjbA_HMV07Ni06W7Ms0KcBlAhzjlk'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
    realtime: {
        params: {
            eventsPerSecond: 2,
        },
    },
})

export default supabase
