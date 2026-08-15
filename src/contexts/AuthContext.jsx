import { createContext, useContext, useState, useEffect, useRef } from 'react'
import supabase from '../lib/supabase'
import { getUser, upsertUser } from '../lib/database'

export function isUnizikEmail(email) {
    if (!email || typeof email !== 'string') return false
    const normalized = email.trim().toLowerCase()
    return normalized.endsWith('@unizik.edu.ng') ||
           normalized.endsWith('.unizik.edu.ng') ||
           /@([a-z0-9-]+\.)*unizik\.edu\.ng$/i.test(normalized)
}

export function deriveNameFromEmail(email) {
    if (!email) return 'UNIZIK STUDENT'
    const username = email.split('@')[0] || ''
    const cleaned = username
        .replace(/^[0-9]+[._-]/g, '')
        .replace(/[._-]+/g, ' ')
        .trim()

    if (!cleaned) return username.toUpperCase()

    return cleaned
        .split(' ')
        .filter(Boolean)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ')
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    // Initialize user and session from local cache immediately
    const [session, setSession] = useState(() => {
        try {
            const cached = localStorage.getItem('zikshare_session')
            return cached ? JSON.parse(cached) : null
        } catch {
            return null
        }
    })

    const [user, setUser] = useState(() => {
        try {
            const cached = localStorage.getItem('zikshare_user')
            return cached ? JSON.parse(cached) : null
        } catch {
            return null
        }
    })

    // If we have cached session/user or known guest, do not block with full page spinner
    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState('')
    const isHandlingLoginRef = useRef(false)

    function saveUserLocally(userData) {
        setUser(userData)
        try {
            if (userData) {
                localStorage.setItem('zikshare_user', JSON.stringify(userData))
            } else {
                localStorage.removeItem('zikshare_user')
            }
        } catch {}
    }

    function saveSessionLocally(sessData) {
        setSession(sessData)
        try {
            if (sessData) {
                localStorage.setItem('zikshare_session', JSON.stringify(sessData))
            } else {
                localStorage.removeItem('zikshare_session')
            }
        } catch {}
    }

    async function handleUserLogin(authUser) {
        if (!authUser) return

        const googleName = authUser.user_metadata?.full_name || authUser.user_metadata?.name || ''
        const fallbackDisplayName = googleName || deriveNameFromEmail(authUser.email) || 'UNIZIK Student'

        // Instant optimistic user state so isAuthenticated is true immediately
        const optimisticUser = {
            uid: authUser.id,
            email: authUser.email,
            displayName: fallbackDisplayName,
            phoneNumber: authUser.phone || '',
            department: '',
            isVerified: true,
            createdAt: new Date().toISOString(),
        }

        saveUserLocally(optimisticUser)

        // Asynchronous non-blocking background DB sync
        ;(async () => {
            try {
                const existing = await getUser(authUser.id)
                if (existing) {
                    if (googleName && (!existing.displayName || existing.displayName === 'Student' || existing.displayName === 'UNIZIK Student' || existing.displayName.length <= 3)) {
                        existing.displayName = googleName
                        upsertUser(existing).catch(() => {})
                    }
                    saveUserLocally(existing)
                    return
                }
                const savedUser = await upsertUser(optimisticUser)
                if (savedUser) saveUserLocally(savedUser)
            } catch (err) {
                console.warn('Background user sync warning:', err.message)
            }
        })()

        return optimisticUser
    }

    useEffect(() => {
        let isMounted = true

        // Safety timeout to ensure loading never stays stuck
        const timer = setTimeout(() => {
            if (isMounted) setLoading(false)
        }, 1500)

        async function initAuth() {
            try {
                const getSessionPromise = supabase.auth.getSession()
                const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve({ data: { session: null } }), 2500))
                const { data } = await Promise.race([getSessionPromise, timeoutPromise])
                const s = data?.session || null

                if (s?.user && isMounted) {
                    saveSessionLocally(s)
                    handleUserLogin(s.user)
                } else if (!s && isMounted) {
                    // Check if we have cached session in localStorage that we can keep as fallback
                    const cachedSess = localStorage.getItem('zikshare_session')
                    if (!cachedSess) {
                        saveSessionLocally(null)
                        saveUserLocally(null)
                    }
                }
            } catch (err) {
                console.error('Session init error:', err)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        initAuth()

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, newSession) => {
                if (!isMounted) return

                if (event === 'SIGNED_OUT' || !newSession) {
                    saveSessionLocally(null)
                    saveUserLocally(null)
                    setLoading(false)
                    return
                }

                if (newSession?.user) {
                    saveSessionLocally(newSession)
                    if (!isHandlingLoginRef.current) {
                        isHandlingLoginRef.current = true
                        try {
                            handleUserLogin(newSession.user)
                            setAuthError('')
                        } catch (err) {
                            console.error('Auth state error:', err.message)
                        } finally {
                            isHandlingLoginRef.current = false
                        }
                    }
                    setLoading(false)
                }
            }
        )

        return () => {
            isMounted = false
            clearTimeout(timer)
            subscription.unsubscribe()
        }
    }, [])

    async function signInWithEmail(email, password) {
        if (!isUnizikEmail(email)) {
            throw new Error('Please sign in with your official UNIZIK email (@unizik.edu.ng).')
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password,
        })
        if (error) throw error
        if (data?.session) {
            saveSessionLocally(data.session)
            handleUserLogin(data.session.user)
        }
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
        if (data?.session) {
            saveSessionLocally(data.session)
            handleUserLogin(data.session.user)
        }
        return data
    }

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin,
            },
        })
        if (error) throw error
        return data
    }

    async function signOut() {
        try {
            await supabase.auth.signOut()
        } catch {}
        saveUserLocally(null)
        saveSessionLocally(null)
    }

    function updateUser(updates) {
        setUser(prev => {
            const next = prev ? { ...prev, ...updates } : prev
            saveUserLocally(next)
            return next
        })
    }

    async function refreshUser() {
        const uid = session?.user?.id || user?.uid || user?.id
        if (!uid) return
        try {
            const fresh = await getUser(uid)
            if (fresh) saveUserLocally(fresh)
        } catch (err) {
            console.warn('Could not refresh user:', err.message)
        }
    }

    const isAuthenticated = !!session?.user || !!user?.uid || !!user?.id

    const value = {
        user,
        session,
        loading,
        authError,
        isAuthenticated,
        isVerified: true,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        updateUser,
        refreshUser,
        isUnizikEmail,
        deriveNameFromEmail,
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
