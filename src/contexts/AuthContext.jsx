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
        supabase.auth.getSession().then(async ({ data: { session: s } }) => {
            setSession(s)
            if (s?.user) {
                try {
                    await handleUserLogin(s.user)
                } catch (err) {
                    console.error('Initial login error:', err)
                }
            }
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })

        // Listen for auth changes (sign-in, sign-out, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, newSession) => {
                setSession(newSession)

                if (event === 'SIGNED_OUT') {
                    setUser(null)
                    return
                }

                // Handle SIGNED_IN and TOKEN_REFRESHED — reload user from DB
                if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && newSession?.user) {
                    try {
                        await handleUserLogin(newSession.user)
                    } catch (err) {
                        console.error('Auth state change error:', err)
                    }
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    async function handleUserLogin(authUser) {
        // Try to load existing profile from DB first (preserves Settings edits)
        try {
            const existing = await getUser(authUser.id)
            if (existing) {
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

    /**
     * Force-reload the user profile from the database.
     * Useful after settings changes to ensure everything is in sync.
     */
    async function refreshUser() {
        if (!session?.user?.id) return
        try {
            const fresh = await getUser(session.user.id)
            if (fresh) setUser(fresh)
        } catch (err) {
            console.warn('Could not refresh user:', err.message)
        }
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
        refreshUser,
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
