import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User, Settings, LogIn, LogOut, ShieldCheck, Package, Heart, HelpCircle, ChevronRight, Loader2, TrendingUp, Sparkles, FileText } from 'lucide-react'
import { getSellerAnalytics, upsertUser } from '../lib/database'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount || 0)
}

const menuItems = [
    { icon: TrendingUp, label: 'Seller Hub & Analytics', path: '/seller-hub', badgeKey: 'seller' },
    { icon: Package, label: 'My Listings', path: '/profile/listings', badgeKey: 'listings' },
    { icon: FileText, label: 'Purchased Study Materials', path: '/profile/purchases', badgeKey: null },
    { icon: Heart, label: 'Saved Items', path: '/profile/saved', badge: null },
    { icon: Settings, label: 'Settings', path: '/profile/settings', badge: null },
    { icon: HelpCircle, label: 'Help & Support', path: '/profile/help', badge: null },
]

export default function ProfilePage() {
    const { user, session, isAuthenticated, isVerified, signOut, updateUser } = useAuth()
    const navigate = useNavigate()
    const [sellerStats, setSellerStats] = useState(null)
    const [togglingDrm, setTogglingDrm] = useState(false)

    useEffect(() => {
        const uid = session?.user?.id || user?.uid || user?.id
        if (isAuthenticated && uid) {
            getSellerAnalytics(uid)
                .then(data => setSellerStats(data))
                .catch(() => setSellerStats(null))
        }
    }, [isAuthenticated, session, user])

    const handleToggleDrmDefault = async () => {
        if (!user) return
        const nextVal = user.drm_enabled_by_default === false ? true : false
        setTogglingDrm(true)
        try {
            const uid = session?.user?.id || user?.uid || user?.id
            await upsertUser({
                uid,
                email: user.email,
                displayName: user.displayName,
                drm_enabled_by_default: nextVal,
            })
            if (updateUser) updateUser({ drm_enabled_by_default: nextVal })
        } catch (err) {
            console.error('Failed to update watermark setting:', err)
        } finally {
            setTogglingDrm(false)
        }
    }

    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (err) {
            console.error('Sign out failed:', err)
        }
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

                {/* Seller Hub Quick Card (for authenticated users) */}
                {isAuthenticated && (
                    <div
                        onClick={() => navigate('/seller-hub')}
                        style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            borderRadius: '0.875rem',
                            background: 'linear-gradient(135deg, #0F172A, #1E293B)',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <TrendingUp size={20} color="white" />
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700 }}>Seller Hub & Earnings</h3>
                                    <Sparkles size={14} color="#FBBF24" />
                                </div>
                                <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: '#94A3B8' }}>
                                    {sellerStats ? `${formatNaira(sellerStats.totalEarningsNaira)} earned • ${sellerStats.totalListings} listings` : 'Manage your sales & analytics'}
                                </p>
                            </div>
                        </div>
                        <ChevronRight size={18} color="#94A3B8" />
                    </div>
                )}

                {/* Seller Preference: Material Watermark/Encryption Toggle */}
                {isAuthenticated && user && (
                    <div
                        style={{
                            marginTop: '0.875rem',
                            padding: '1rem',
                            borderRadius: '0.875rem',
                            backgroundColor: 'white',
                            border: '1px solid var(--color-border)',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', backgroundColor: (user.drm_enabled_by_default !== false) ? '#EFF6FF' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: (user.drm_enabled_by_default !== false) ? '#2563EB' : '#64748B' }}>
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                        Material Watermark/Encryption
                                    </h3>
                                    <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                                        {(user.drm_enabled_by_default !== false) ? 'Watermarking & password DRM active by default' : 'Disabled by default for your new uploads'}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleToggleDrmDefault}
                                disabled={togglingDrm}
                                style={{
                                    width: '2.75rem',
                                    height: '1.5rem',
                                    borderRadius: '9999px',
                                    backgroundColor: (user.drm_enabled_by_default !== false) ? '#3B82F6' : '#CBD5E1',
                                    border: 'none',
                                    cursor: togglingDrm ? 'not-allowed' : 'pointer',
                                    position: 'relative',
                                    transition: 'background-color 0.2s',
                                    padding: 0,
                                    flexShrink: 0
                                }}
                            >
                                <div
                                    style={{
                                        width: '1.125rem',
                                        height: '1.125rem',
                                        borderRadius: '9999px',
                                        backgroundColor: 'white',
                                        position: 'absolute',
                                        top: '0.1875rem',
                                        left: (user.drm_enabled_by_default !== false) ? '1.4375rem' : '0.1875rem',
                                        transition: 'left 0.2s',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                    }}
                                />
                            </button>
                        </div>
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
                        let badgeValue = null
                        if (badgeKey === 'listings' && sellerStats?.totalListings !== undefined) {
                            badgeValue = String(sellerStats.totalListings)
                        } else if (badgeKey === 'seller' && sellerStats?.totalSalesCount) {
                            badgeValue = `${sellerStats.totalSalesCount} sales`
                        }

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
