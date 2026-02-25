import { createContext, useContext, useState, useEffect } from 'react'
import supabase from '../lib/supabase'
import { getUser, upsertUser } from '../lib/database'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setSession(session)
            if (session?.user) {
                await handleUserLogin(session.user)
            }
            setLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setSession(session)
                if (event === 'SIGNED_IN' && session?.user) {
                    await handleUserLogin(session.user)
                } else if (event === 'SIGNED_OUT') {
                    setUser(null)
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    async function handleUserLogin(authUser) {
        try {
            // Try to load existing profile from DB first
            const existing = await getUser(authUser.id)
            if (existing) {
                // User already exists — use their saved profile (preserves Settings edits)
                setUser(existing)
                return
            }
        } catch (err) {
            console.warn('Could not fetch existing user:', err.message)
        }

        // First-time user — create a new profile
        const isVerified = authUser.email?.endsWith('.edu.ng') || false
        const userData = {
            uid: authUser.id,
            email: authUser.email,
            displayName: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Student',
            phoneNumber: authUser.phone || '',
            department: '',
            isVerified,
            createdAt: new Date().toISOString(),
        }

        try {
            const savedUser = await upsertUser(userData)
            setUser(savedUser)
        } catch (err) {
            // Still set basic user info even if upsert fails (offline scenario)
            setUser(userData)
            console.warn('Could not sync user to database:', err.message)
        }
    }

    async function signInWithEmail(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        return data
    }

    async function signUpWithEmail(email, password, displayName) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: displayName } },
        })
        if (error) throw error
        return data
    }

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin },
        })
        if (error) throw error
        return data
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        setUser(null)
        setSession(null)
    }

    /**
     * Update the in-memory user state.
     * Call this after saving settings to the database so the UI reflects changes immediately.
     */
    function updateUser(updates) {
        setUser(prev => prev ? { ...prev, ...updates } : prev)
    }

    const value = {
        user,
        session,
        loading,
        isAuthenticated: !!session,
        isVerified: user?.isVerified || false,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        updateUser,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
