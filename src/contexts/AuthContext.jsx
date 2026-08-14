import { createContext, useContext, useState, useEffect } from 'react'
import supabase from '../lib/supabase'
import { getUser, upsertUser } from '../lib/database'

export function isUnizikEmail(email) {
    if (!email || typeof email !== 'string') return false
    const normalized = email.trim().toLowerCase()
    return normalized.endsWith('@unizik.edu.ng') ||
           normalized.endsWith('.unizik.edu.ng') ||
           /@([a-z0-9-]+\.)*unizik\.edu\.ng$/i.test(normalized)
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
    const [authError, setAuthError] = useState('')

    async function handleUserLogin(authUser) {
        // Enforce UNIZIK student email domain restriction
        if (!isUnizikEmail(authUser.email)) {
            console.warn('Non-UNIZIK email rejected:', authUser.email)
            await supabase.auth.signOut()
            setUser(null)
            setSession(null)
            throw new Error('Access Restricted: Only official UNIZIK student emails (@unizik.edu.ng) are allowed.')
        }

        // Try to load existing profile from DB first
        try {
            const existing = await getUser(authUser.id)
            if (existing) {
                setUser(existing)
                return
            }
        } catch (err) {
            console.warn('Could not fetch existing user:', err.message)
        }

        // First-time user — create a verified UNIZIK student profile
        const userData = {
            uid: authUser.id,
            email: authUser.email,
            displayName: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'UNIZIK Student',
            phoneNumber: authUser.phone || '',
            department: '',
            isVerified: true, // All validated UNIZIK emails are verified
            createdAt: new Date().toISOString(),
        }

        try {
            const savedUser = await upsertUser(userData)
            setUser(savedUser)
        } catch (err) {
            setUser(userData)
            console.warn('Could not sync user to database:', err.message)
        }
    }

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then((result) => {
            const s = result?.data?.session || null
            setSession(s)
            if (s?.user) {
                handleUserLogin(s.user).catch(err => {
                    console.error('Initial login error:', err.message)
                    setAuthError(err.message)
                })
            }
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, newSession) => {
                if (event === 'SIGNED_OUT') {
                    setUser(null)
                    setSession(null)
                    return
                }

                if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && newSession?.user) {
                    try {
                        await handleUserLogin(newSession.user)
                        setSession(newSession)
                        setAuthError('')
                    } catch (err) {
                        console.error('Auth restriction:', err.message)
                        setAuthError(err.message)
                    }
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    async function signInWithEmail(email, password) {
        if (!isUnizikEmail(email)) {
            throw new Error('Please sign in with your official UNIZIK email (@unizik.edu.ng).')
        }
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password })
        if (error) throw error
        return data
    }

    async function signUpWithEmail(email, password, displayName) {
        if (!isUnizikEmail(email)) {
            throw new Error('Registration is strictly restricted to UNIZIK student emails (e.g. yourname@unizik.edu.ng).')
        }
        const { data, error } = await supabase.auth.signUp({
            email: email.trim().toLowerCase(),
            password,
            options: { data: { full_name: displayName } },
        })
        if (error) throw error
        return data
    }

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin,
                queryParams: {
                    hd: 'unizik.edu.ng' // Google Workspace domain hint
                }
            },
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

    function updateUser(updates) {
        setUser(prev => prev ? { ...prev, ...updates } : prev)
    }

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
        authError,
        isAuthenticated: !!session && !!user,
        isVerified: true,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        updateUser,
        refreshUser,
        isUnizikEmail,
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
