import { Search, SlidersHorizontal, ChevronRight, MapPin, ShieldCheck, Zap, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCachedQuery } from '../hooks/useCachedQuery'
import { getListings, getDigitalProducts } from '../lib/database'
import { HomeAnnouncementBanner } from '../components/AnnouncementModal'

const categories = [
    { name: 'Electronics', emoji: '📱', color: '#3B82F6' },
    { name: 'Books', emoji: '📚', color: '#8B5CF6' },
    { name: 'Fashion', emoji: '👕', color: '#EC4899' },
    { name: 'Services', emoji: '🔧', color: '#F59E0B' },
]

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
    }).format(amount)
}

function ConditionBadge({ condition }) {
    const classMap = {
        'Brand New': 'condition-new',
        'Like New': 'condition-like-new',
        'Fairly Used': 'condition-used',
        'Digital PDF': 'condition-like-new',
    }
    return <span className={`condition-badge ${classMap[condition] || 'condition-used'}`}>{condition || 'Available'}</span>
}

function ListingCard({ listing, navigate }) {
    const placeholderColors = ['#DBEAFE', '#E0E7FF', '#D9F99D', '#FBCFE8', '#E9D5FF', '#FDE68A']
    const bgColor = placeholderColors[(listing.id?.charCodeAt?.(0) || 0) % placeholderColors.length]
    const imageUrl = listing.images?.[0]

    return (
        <div
            onClick={() => navigate(`/item/${listing.id}`)}
            style={{
                borderRadius: '0.75rem',
                overflow: 'hidden',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '140px',
                    backgroundColor: bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {imageUrl ? (
                    <img src={imageUrl} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    listing.isDigital ? '📄' : '📦'
                )}
                <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem' }}>
                    <ConditionBadge condition={listing.condition} />
                </div>
            </div>
            <div style={{ padding: '0.75rem' }}>
                <h3
                    style={{
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {listing.title}
                </h3>
                <p className="price-tag" style={{ margin: '0.375rem 0 0', fontSize: '0.9375rem' }}>
                    {formatNaira(listing.price)}
                </p>
            </div>
        </div>
    )
}

function SkeletonCard() {
    return (
        <div style={{ borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div className="skeleton" style={{ width: '100%', height: '140px' }} />
            <div style={{ padding: '0.75rem' }}>
                <div className="skeleton" style={{ width: '80%', height: '0.875rem', borderRadius: '0.25rem', marginBottom: '0.5rem' }} />
                <div className="skeleton" style={{ width: '50%', height: '1rem', borderRadius: '0.25rem' }} />
            </div>
        </div>
    )
}

export default function HomePage() {
    const navigate = useNavigate()
    const { data, isLoading, error } = useCachedQuery(
        'listings-home',
        async () => {
            const [physical, digital] = await Promise.all([
                getListings({ limit: 20 }).catch(() => []),
                getDigitalProducts({ limit: 20 }).catch(() => [])
            ])
            // Tag digital products
            const digitalTagged = (digital || []).map(d => ({
                ...d,
                isDigital: true,
                createdAt: d.created_at,
                sellerId: d.seller_id,
                condition: 'Digital PDF',
                images: d.cover_image_url ? [d.cover_image_url] : [],
                priceInKobo: d.price,
                price: d.price / 100, // normalized to Naira for display
            }))

            // Merge and sort
            const merged = [...(physical || []), ...digitalTagged]
            merged.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
            return merged.slice(0, 20)
        },
        { ttl: 5 * 60 * 1000 } // 5 min cache
    )

    const listings = data;

    return (
        <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
            {/* Header */}
            <header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 40,
                    backgroundColor: 'white',
                    borderBottom: '1px solid var(--color-border)',
                    padding: '0.75rem 1rem',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div>
                        <h1
                            style={{
                                margin: 0,
                                fontSize: '1.375rem',
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            ZikShare
                        </h1>
                        <p style={{ margin: 0, fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                            <MapPin size={10} style={{ display: 'inline', marginRight: '0.125rem' }} />
                            UNIZIK Campus
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                padding: '0.25rem 0.625rem',
                                borderRadius: '9999px',
                                backgroundColor: '#DCFCE7',
                                color: 'var(--color-campus-green)',
                                fontSize: '0.6875rem',
                                fontWeight: 600,
                            }}
                        >
                            <ShieldCheck size={12} />
                            Verified Zone
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div
                    onClick={() => navigate('/search')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.625rem 0.875rem',
                        borderRadius: '0.75rem',
                        backgroundColor: 'var(--color-background)',
                        border: '1px solid var(--color-border)',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s ease',
                    }}
                >
                    <Search size={16} color="var(--color-text-muted)" />
                    <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                        Search for items...
                    </span>
                    <SlidersHorizontal size={16} color="var(--color-text-muted)" style={{ marginLeft: 'auto' }} />
                </div>
            </header>

            {/* Official Campus Announcement Banner (if pinned) */}
            <div style={{ padding: '0.75rem 1rem 0' }}>
                <HomeAnnouncementBanner />
            </div>

            {/* Quick Stats Banner */}
            <div
                onClick={() => navigate('/search')}
                style={{
                    margin: '0.75rem 1rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer',
                }}
            >
                <div
                    style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '0.625rem',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Zap size={20} />
                </div>
                <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 700 }}>Urgent Deals 🔥</p>
                    <p style={{ margin: 0, fontSize: '0.6875rem', opacity: 0.85 }}>
                        {listings?.length || 0} items available now
                    </p>
                </div>
                <ChevronRight size={18} style={{ opacity: 0.7 }} />
            </div>

            {/* Categories */}
            <section style={{ padding: '0 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                    <h2 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700 }}>Categories</h2>
                    <button
                        onClick={() => navigate('/search')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-brand)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.125rem',
                        }}
                    >
                        See all <ChevronRight size={14} />
                    </button>
                </div>
                <div
                    className="hide-scrollbar"
                    style={{
                        display: 'flex',
                        gap: '0.625rem',
                        overflowX: 'auto',
                        paddingBottom: '0.25rem',
                    }}
                >
                    {categories.map(cat => (
                        <div
                            key={cat.name}
                            onClick={() => navigate(`/search?category=${cat.name}`)}
                            style={{
                                minWidth: '5rem',
                                padding: '0.75rem 0.5rem',
                                borderRadius: '0.75rem',
                                backgroundColor: 'white',
                                textAlign: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                                transition: 'transform 0.2s ease',
                                border: '1px solid var(--color-border)',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{cat.emoji}</div>
                            <p style={{ margin: 0, fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                                {cat.name}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Listings */}
            <section style={{ padding: '1.25rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <TrendingUp size={16} color="var(--color-brand)" />
                        <h2 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700 }}>Trending Now</h2>
                    </div>
                    <button
                        onClick={() => navigate('/search')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-brand)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.125rem',
                        }}
                    >
                        View all <ChevronRight size={14} />
                    </button>
                </div>

                {isLoading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                        {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                    </div>
                ) : error ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
                        <p>Unable to load listings right now.</p>
                        <p style={{ fontSize: '0.6875rem' }}>Check your connection and try again.</p>
                    </div>
                ) : listings?.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                        {listings.map(listing => (
                            <ListingCard key={listing.id} listing={listing} navigate={navigate} />
                        ))}
                    </div>
                ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
                        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛒</p>
                        <p style={{ fontWeight: 600 }}>No listings yet</p>
                        <p style={{ fontSize: '0.6875rem' }}>Be the first to post something!</p>
                    </div>
                )}
            </section>

            {/* Safe Meetup Zone Banner */}
            <section style={{ padding: '0 1rem 1.5rem' }}>
                <div
                    style={{
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        backgroundColor: '#F0FDF4',
                        border: '1px solid #BBF7D0',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                    }}
                >
                    <div
                        style={{
                            width: '2.25rem',
                            height: '2.25rem',
                            borderRadius: '0.5rem',
                            backgroundColor: '#DCFCE7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                    >
                        <MapPin size={18} color="var(--color-campus-green)" />
                    </div>
                    <div>
                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-campus-green)' }}>
                            Safe Meetup Zones
                        </p>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                            Always transact at Garba Square, Chisco Park or the Student Center for your safety.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
