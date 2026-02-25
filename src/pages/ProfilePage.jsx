import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User, Settings, LogIn, LogOut, ShieldCheck, Package, Heart, HelpCircle, ChevronRight, Loader2 } from 'lucide-react'
import { getMyListings } from '../lib/database'

const menuItems = [
    { icon: Package, label: 'My Listings', path: '/profile/listings', badgeKey: 'listings' },
    { icon: Heart, label: 'Saved Items', path: '/profile/saved', badge: null },
    { icon: Settings, label: 'Settings', path: '/profile/settings', badge: null },
    { icon: HelpCircle, label: 'Help & Support', path: '/profile/help', badge: null },
]

export default function ProfilePage() {
    const { user, session, isAuthenticated, isVerified, loading, signOut } = useAuth()
    const navigate = useNavigate()
    const [listingCount, setListingCount] = useState(null)

    useEffect(() => {
        if (isAuthenticated && session?.user?.id) {
            getMyListings(session.user.id)
                .then(data => setListingCount(data?.length || 0))
                .catch(() => setListingCount(null))
        }
    }, [isAuthenticated, session])

    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (err) {
            console.error('Sign out failed:', err)
        }
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <Loader2 size={28} color="var(--color-brand)" style={{ animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        )
    }

    return (
        <div>
            <header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 40,
                    backgroundColor: 'white',
                    borderBottom: '1px solid var(--color-border)',
                    padding: '1rem',
                }}
            >
                <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Profile</h1>
            </header>

            <div style={{ padding: '1rem' }}>
                {isAuthenticated && user ? (
                    /* Logged-in user card */
                    <div
                        style={{
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
                            border: '1px solid #93C5FD',
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                width: '4rem',
                                height: '4rem',
                                borderRadius: '9999px',
                                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 0.75rem',
                                color: 'white',
                                fontSize: '1.375rem',
                                fontWeight: 700,
                            }}
                        >
                            {user.displayName?.charAt(0)?.toUpperCase() || 'S'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', marginBottom: '0.125rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{user.displayName}</h2>
                            {isVerified && <ShieldCheck size={16} color="var(--color-campus-green)" />}
                        </div>
                        <p style={{ margin: '0 0 0.75rem', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                            {user.email}
                        </p>
                        <button
                            onClick={handleSignOut}
                            style={{
                                padding: '0.5rem 1.5rem',
                                borderRadius: '0.625rem',
                                border: '1px solid var(--color-border)',
                                backgroundColor: 'white',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                fontFamily: 'inherit',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                color: 'var(--color-text-secondary)',
                            }}
                        >
                            <LogOut size={14} />
                            Sign Out
                        </button>
                    </div>
                ) : (
                    /* Guest card */
                    <div
                        style={{
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
                            border: '1px solid #93C5FD',
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                width: '4rem',
                                height: '4rem',
                                borderRadius: '9999px',
                                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 0.75rem',
                            }}
                        >
                            <User size={28} color="white" />
                        </div>
                        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            Welcome to ZikShare!
                        </h2>
                        <p style={{ margin: '0.25rem 0 1rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                            Sign in to buy, sell, and connect with fellow students
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            style={{
                                padding: '0.75rem 2rem',
                                borderRadius: '0.75rem',
                                border: 'none',
                                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                                color: 'white',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                fontFamily: 'inherit',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'transform 0.2s ease',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            <LogIn size={16} />
                            Sign In
                        </button>
                    </div>
                )}

                {/* Verification Prompt (guests & unverified) */}
                {(!isAuthenticated || !isVerified) && (
                    <div
                        onClick={() => navigate(isAuthenticated ? '/profile/settings' : '/login')}
                        style={{
                            marginTop: '1rem',
                            padding: '0.875rem 1rem',
                            borderRadius: '0.75rem',
                            backgroundColor: '#F0FDF4',
                            border: '1px solid #BBF7D0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s ease',
                        }}
                    >
                        <ShieldCheck size={20} color="var(--color-campus-green)" />
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-campus-green)' }}>
                                Get Verified
                            </p>
                            <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-secondary)' }}>
                                Use your @unizik.edu.ng email for a trust badge
                            </p>
                        </div>
                        <ChevronRight size={16} color="var(--color-text-muted)" />
                    </div>
                )}

                {/* Menu Items */}
                <div style={{ marginTop: '1.25rem' }}>
                    {menuItems.map(({ icon: ItemIcon, label, path, badgeKey }) => {
                        const badgeValue = badgeKey === 'listings' && listingCount !== null ? String(listingCount) : null
                        return (
                            <button
                                key={label}
                                onClick={() => navigate(path)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.875rem 0.5rem',
                                    borderRadius: '0.625rem',
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    transition: 'background-color 0.15s ease',
                                    borderBottom: '1px solid var(--color-border)',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-background)')}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                                <ItemIcon size={18} color="var(--color-text-secondary)" />
                                <span style={{ flex: 1, textAlign: 'left', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                                    {label}
                                </span>
                                {badgeValue && (
                                    <span
                                        style={{
                                            padding: '0.125rem 0.5rem',
                                            borderRadius: '9999px',
                                            backgroundColor: '#DBEAFE',
                                            color: '#1E40AF',
                                            fontSize: '0.6875rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {badgeValue}
                                    </span>
                                )}
                                <ChevronRight size={16} color="var(--color-text-muted)" />
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
