import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    User,
    Settings,
    LogIn,
    LogOut,
    ShieldCheck,
    Package,
    Heart,
    HelpCircle,
    ChevronRight,
    TrendingUp,
    FileText,
    Shield,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getSellerAnalytics } from '../lib/database'
import { isUserAdmin } from '../components/AdminRoute'
import { PageHeader } from '../components/ui'
import { formatNaira } from '../lib/utils'

const accountMenu = [
    { icon: TrendingUp, label: 'Seller hub', hint: 'Sales and listing performance', path: '/seller-hub', badgeKey: 'seller' },
    { icon: Package, label: 'My listings', path: '/profile/listings', badgeKey: 'listings' },
    { icon: FileText, label: 'Purchased material', path: '/profile/purchases' },
    { icon: Heart, label: 'Saved items', path: '/profile/saved' },
    { icon: Settings, label: 'Settings', path: '/profile/settings' },
    { icon: HelpCircle, label: 'Help and support', path: '/profile/help' },
]

/** What an account actually unlocks. Kept honest: reading is never on the list. */
const accountBenefits = [
    'Post an item you no longer need',
    'Message a student selling something',
    'Keep track of what you saved or bought',
]

export default function ProfilePage() {
    const { user, session, isAuthenticated, isVerified, signOut } = useAuth()
    const navigate = useNavigate()
    const [sellerStats, setSellerStats] = useState(null)

    useEffect(() => {
        const uid = session?.user?.id || user?.uid || user?.id
        if (isAuthenticated && uid) {
            getSellerAnalytics(uid)
                .then((data) => setSellerStats(data))
                .catch(() => setSellerStats(null))
        }
    }, [isAuthenticated, session, user])

    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (err) {
            console.error('Sign out failed:', err)
        }
    }

    if (!isAuthenticated || !user) {
        return (
            <div className="zs-container">
                <PageHeader
                    eyebrow="Account"
                    title="You do not need an account to read"
                    lead="Every document in the library is free and open. An account is only for buying, selling and messaging other students."
                />

                <div className="zs-panel" style={{ maxWidth: '32rem' }}>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '0.55rem' }}>
                        {accountBenefits.map((benefit) => (
                            <li
                                key={benefit}
                                style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: 'var(--zs-fs-body)', color: 'var(--color-text-secondary)' }}
                            >
                                <User size={15} style={{ marginTop: '0.15rem', color: 'var(--color-brand)', flexShrink: 0 }} aria-hidden="true" />
                                {benefit}
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1.25rem' }}>
                        <button type="button" className="zs-btn zs-btn--primary zs-btn--block" onClick={() => navigate('/login')}>
                            <LogIn size={15} /> Sign in with your UNIZIK email
                        </button>
                        <button type="button" className="zs-btn zs-btn--outline zs-btn--block" onClick={() => navigate('/library')}>
                            Open the library instead
                        </button>
                    </div>
                </div>

                <p style={{ marginTop: '1.25rem', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                    Need help? <button type="button" className="zs-link" onClick={() => navigate('/profile/help')}>Read the help page</button>
                </p>
            </div>
        )
    }

    const listings = sellerStats?.totalListings
    const sales = sellerStats?.totalSalesCount
    const earnings = sellerStats?.totalEarningsNaira

    return (
        <div className="zs-container">
            <PageHeader eyebrow="Account" title="Your account" />

            <div className="zs-panel" style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', maxWidth: '32rem' }}>
                <div
                    aria-hidden="true"
                    style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '9999px',
                        background: 'var(--color-brand)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        flexShrink: 0,
                    }}
                >
                    {user.displayName?.charAt(0)?.toUpperCase() || 'S'}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <h2 style={{ margin: 0, fontSize: 'var(--zs-fs-card)', fontWeight: 700 }}>
                            {user.displayName || 'Student'}
                        </h2>
                        {isVerified && <ShieldCheck size={15} color="var(--color-campus-green)" aria-label="Verified UNIZIK email" />}
                    </div>
                    <p style={{ margin: '0.1rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {user.email}
                    </p>
                </div>
                <button type="button" className="zs-btn zs-btn--outline zs-btn--sm" onClick={handleSignOut}>
                    <LogOut size={14} /> Sign out
                </button>
            </div>

            {isVerified === false && (
                <button
                    type="button"
                    onClick={() => navigate('/profile/settings')}
                    className="zs-panel"
                    style={{ marginTop: '0.75rem', maxWidth: '32rem', width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left', cursor: 'pointer', font: 'inherit' }}
                >
                    <ShieldCheck size={18} color="var(--color-campus-green)" aria-hidden="true" />
                    <span style={{ flex: 1 }}>
                        <span style={{ display: 'block', fontSize: 'var(--zs-fs-small)', fontWeight: 600 }}>Verify your UNIZIK email</span>
                        <span style={{ display: 'block', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                            A verified student account carries a trust badge on its listings.
                        </span>
                    </span>
                    <ChevronRight size={16} color="var(--color-text-muted)" aria-hidden="true" />
                </button>
            )}

            {(listings || sales || earnings) ? (
                <div className="zs-grid" style={{ marginTop: '1rem' }}>
                    {listings ? (
                        <div className="zs-card" style={{ padding: '0.9rem' }}>
                            <p style={{ margin: 0, fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>Live listings</p>
                            <p style={{ margin: '0.15rem 0 0', fontSize: '1.25rem', fontWeight: 700 }}>{listings}</p>
                        </div>
                    ) : null}
                    {sales ? (
                        <div className="zs-card" style={{ padding: '0.9rem' }}>
                            <p style={{ margin: 0, fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>Sales</p>
                            <p style={{ margin: '0.15rem 0 0', fontSize: '1.25rem', fontWeight: 700 }}>{sales}</p>
                        </div>
                    ) : null}
                    {earnings ? (
                        <div className="zs-card" style={{ padding: '0.9rem' }}>
                            <p style={{ margin: 0, fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>Earned</p>
                            <p style={{ margin: '0.15rem 0 0', fontSize: '1.25rem', fontWeight: 700 }}>{formatNaira(earnings)}</p>
                        </div>
                    ) : null}
                </div>
            ) : null}

            <nav aria-label="Account" className="zs-panel" style={{ marginTop: '1rem', padding: 0, maxWidth: '32rem', overflow: 'hidden' }}>
                {accountMenu.map((entry, index) => {
                    const Icon = entry.icon
                    const badge =
                        entry.badgeKey === 'listings' && listings !== undefined
                            ? String(listings)
                            : entry.badgeKey === 'seller' && sales
                                ? `${sales} sales`
                                : null
                    return (
                        <button
                            key={entry.label}
                            type="button"
                            onClick={() => navigate(entry.path)}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.7rem',
                                padding: '0.8rem 0.9rem',
                                background: 'none',
                                border: 'none',
                                borderTop: index === 0 ? 'none' : '1px solid var(--color-border-subtle)',
                                font: 'inherit',
                                textAlign: 'left',
                                cursor: 'pointer',
                            }}
                        >
                            <Icon size={17} color="var(--color-text-secondary)" aria-hidden="true" />
                            <span style={{ flex: 1, minWidth: 0 }}>
                                <span style={{ display: 'block', fontSize: 'var(--zs-fs-body)', fontWeight: 600 }}>{entry.label}</span>
                                {entry.hint && (
                                    <span style={{ display: 'block', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>{entry.hint}</span>
                                )}
                            </span>
                            {badge && <span className="zs-tag zs-tag--muted">{badge}</span>}
                            <ChevronRight size={15} color="var(--color-text-muted)" aria-hidden="true" />
                        </button>
                    )
                })}
            </nav>

            {isUserAdmin(user, session) && (
                <button
                    type="button"
                    onClick={() => navigate('/admin')}
                    className="zs-panel"
                    style={{ marginTop: '0.75rem', maxWidth: '32rem', width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem', textAlign: 'left', font: 'inherit', cursor: 'pointer' }}
                >
                    <Shield size={17} color="var(--color-brand)" aria-hidden="true" />
                    <span style={{ flex: 1 }}>
                        <span style={{ display: 'block', fontSize: 'var(--zs-fs-body)', fontWeight: 600 }}>Admin suite</span>
                        <span style={{ display: 'block', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>Moderation and inventory</span>
                    </span>
                    <ChevronRight size={15} color="var(--color-text-muted)" aria-hidden="true" />
                </button>
            )}
        </div>
    )
}
