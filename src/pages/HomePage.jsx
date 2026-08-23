import { Search, SlidersHorizontal, ChevronRight, MapPin, ShieldCheck, TrendingUp, Sparkles, Tag, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCachedQuery } from '../hooks/useCachedQuery'
import { getListings, getDigitalProducts } from '../lib/database'
import { HomeAnnouncementBanner } from '../components/AnnouncementModal'
import { MARKETPLACE_SEGMENTS } from '../lib/categories'
import ZikShareLogo from '../components/ZikShareLogo'

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
    const placeholderColors = ['#F8FAFC', '#F1F5F9', '#F3F4F6', '#F0F6FF', '#F8FAFC']
    const bgColor = placeholderColors[(listing.id?.charCodeAt?.(0) || 0) % placeholderColors.length]
    const imageUrl = listing.images?.[0]
    const isBoosted = listing.is_boosted && (!listing.boosted_until || new Date(listing.boosted_until) > new Date())

    return (
        <div
            onClick={() => navigate(`/item/${listing.id}`)}
            style={{
                borderRadius: '0.75rem',
                overflow: 'hidden',
                backgroundColor: 'white',
                boxShadow: isBoosted ? '0 4px 14px rgba(234, 179, 8, 0.25)' : '0 1px 3px rgba(0,0,0,0.06)',
                border: isBoosted ? '1.5px solid #FACC15' : '1px solid var(--color-border)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = isBoosted ? '0 4px 14px rgba(234, 179, 8, 0.25)' : '0 1px 3px rgba(0,0,0,0.06)'
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
                <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', display: 'flex', gap: '0.25rem', flexDirection: 'column' }}>
                    <ConditionBadge condition={listing.condition} />
                    {isBoosted && (
                        <span style={{ fontSize: '0.625rem', fontWeight: 800, padding: '0.125rem 0.375rem', borderRadius: '0.25rem', backgroundColor: '#FEF08A', color: '#854D0E', display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
                            <Sparkles size={10} /> PROMOTED
                        </span>
                    )}
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.375rem' }}>
                    <p className="price-tag" style={{ margin: 0, fontSize: '0.9375rem' }}>
                        {formatNaira(listing.price)}
                    </p>
                    {listing.subcategory && (
                        <span style={{ fontSize: '0.625rem', color: '#64748B', backgroundColor: '#F1F5F9', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>
                            {listing.subcategory}
                        </span>
                    )}
                </div>
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
                        <ZikShareLogo size="md" />
                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.6875rem', color: '#556987', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MapPin size={11} style={{ color: '#FA5A00', flexShrink: 0 }} />
                            UNIZIK Student Marketplace
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
                                backgroundColor: '#FFF3EB',
                                border: '1px solid #FFD2B8',
                                color: '#FA5A00',
                                fontSize: '0.6875rem',
                                fontWeight: 700,
                            }}
                        >
                            <ShieldCheck size={12} color="#FA5A00" />
                            Verified Campus
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div
                    onClick={() => navigate('/search')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.6875rem 1rem',
                        borderRadius: '0.75rem',
                        backgroundColor: '#F8FAFC',
                        border: '1.5px solid #0066FF',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    }}
                >
                    <Search size={17} color="#0066FF" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.8125rem', color: '#556987', fontWeight: 500 }}>
                        Search phones, laptops, generators, past questions...
                    </span>
                    <SlidersHorizontal size={16} color="#0066FF" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                </div>
            </header>

            {/* Official Campus Announcement Banner (if pinned) */}
            <div style={{ padding: '0.75rem 1rem 0' }}>
                <HomeAnnouncementBanner />
            </div>

            {/* Digital Library — Compact Accent Bar */}
            <div style={{ padding: '0.5rem 1rem' }}>
                <div
                    onClick={() => navigate('/library')}
                    style={{
                        padding: '0.625rem 0.875rem',
                        borderRadius: '0.75rem',
                        background: 'linear-gradient(135deg, #0066FF 0%, #0A2540 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0, 102, 255, 0.2)',
                        border: '1px solid rgba(250, 90, 0, 0.4)',
                    }}
                >
                    <div
                        style={{
                            width: '1.75rem',
                            height: '1.75rem',
                            borderRadius: '0.5rem',
                            backgroundColor: 'rgba(250, 90, 0, 0.2)',
                            border: '1px solid rgba(250, 90, 0, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FA5A00',
                            flexShrink: 0,
                        }}
                    >
                        <BookOpen size={14} />
                    </div>
                    <span style={{ fontSize: '0.78125rem', fontWeight: 700, flex: 1, color: '#FFFFFF' }}>
                        UNIZIK Digital Library — Past Questions & Study Packs
                    </span>
                    <ChevronRight size={15} color="#FA5A00" />
                </div>
            </div>

            {/* JiJi-Style Campus Marketplace Categories */}
            <section style={{ padding: '0 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Tag size={16} color="var(--color-brand)" />
                        <h2 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700, lineHeight: 1.2 }}>Browse by Category</h2>
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
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.125rem',
                            lineHeight: 1.2,
                            padding: 0,
                        }}
                    >
                        All Categories <ChevronRight size={14} />
                    </button>
                </div>
                
                {/* Parent Category Segments */}
                <div
                    className="hide-scrollbar"
                    style={{
                        display: 'flex',
                        gap: '0.625rem',
                        overflowX: 'auto',
                        paddingBottom: '0.5rem',
                    }}
                >
                    {MARKETPLACE_SEGMENTS.map(seg => (
                        <div
                            key={seg.id}
                            onClick={() => navigate(`/search?segment=${seg.id}`)}
                            style={{
                                minWidth: '6.25rem',
                                padding: '0.75rem 0.5rem',
                                borderRadius: '0.75rem',
                                backgroundColor: 'white',
                                textAlign: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s ease, border-color 0.2s ease',
                                border: '1px solid var(--color-border)',
                                flexShrink: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'scale(1.04)'
                                e.currentTarget.style.borderColor = seg.color
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'scale(1)'
                                e.currentTarget.style.borderColor = 'var(--color-border)'
                            }}
                        >
                            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', backgroundColor: seg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 0.375rem', fontSize: '1.25rem' }}>
                                {seg.emoji}
                            </div>
                            <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.25, textAlign: 'center' }}>
                                {seg.name}
                            </p>
                        </div>
                    ))}
                </div>


            </section>

            {/* Listings */}
            <section style={{ padding: '1.5rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.125rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <TrendingUp size={16} color="var(--color-brand)" />
                        <h2 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700, lineHeight: 1.2 }}>Trending Now</h2>
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
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.125rem',
                            lineHeight: 1.2,
                            padding: 0,
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
