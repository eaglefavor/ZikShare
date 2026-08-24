import { Search, SlidersHorizontal, ChevronRight, MapPin, ShieldCheck, TrendingUp, Sparkles, BookOpen, MessageCircle, Smartphone, Armchair, Package, Users, Zap, GraduationCap } from 'lucide-react'
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
                borderRadius: '1rem',
                overflow: 'hidden',
                backgroundColor: 'white',
                boxShadow: isBoosted ? '0 8px 24px rgba(234, 179, 8, 0.2)' : '0 4px 12px rgba(0,0,0,0.04)',
                border: isBoosted ? '1.5px solid #FACC15' : '1px solid var(--color-border-subtle)',
                transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = isBoosted ? '0 12px 32px rgba(234, 179, 8, 0.25)' : '0 12px 24px rgba(0,0,0,0.08)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = isBoosted ? '0 8px 24px rgba(234, 179, 8, 0.2)' : '0 4px 12px rgba(0,0,0,0.04)'
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '150px',
                    backgroundColor: bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {imageUrl ? (
                    <img src={imageUrl} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    listing.isDigital ? '📄' : '📦'
                )}
                <div style={{ position: 'absolute', top: '0.625rem', left: '0.625rem', display: 'flex', gap: '0.375rem', flexDirection: 'column' }}>
                    <ConditionBadge condition={listing.condition} />
                    {isBoosted && (
                        <span style={{ fontSize: '0.625rem', fontWeight: 800, padding: '0.1875rem 0.5rem', borderRadius: '0.375rem', backgroundColor: '#FEF08A', color: '#854D0E', display: 'flex', alignItems: 'center', gap: '0.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <Sparkles size={12} /> PROMOTED
                        </span>
                    )}
                </div>
            </div>
            <div style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3
                    style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        margin: '0 0 0.5rem 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.4,
                    }}
                >
                    {listing.title}
                </h3>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p className="price-tag" style={{ margin: 0, fontSize: '1.0625rem' }}>
                        {formatNaira(listing.price)}
                    </p>
                    {listing.subcategory && (
                        <span style={{ fontSize: '0.6875rem', color: '#64748B', backgroundColor: '#F1F5F9', padding: '0.1875rem 0.5rem', borderRadius: '0.375rem', fontWeight: 500 }}>
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
        <div style={{ borderRadius: '1rem', overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: '1px solid var(--color-border-subtle)' }}>
            <div className="skeleton" style={{ width: '100%', height: '150px' }} />
            <div style={{ padding: '0.875rem' }}>
                <div className="skeleton" style={{ width: '85%', height: '1rem', borderRadius: '0.25rem', marginBottom: '0.5rem' }} />
                <div className="skeleton" style={{ width: '60%', height: '1rem', borderRadius: '0.25rem', marginBottom: '0.75rem' }} />
                <div className="skeleton" style={{ width: '40%', height: '1.25rem', borderRadius: '0.25rem' }} />
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
            const digitalTagged = (digital || []).map(d => ({
                ...d,
                isDigital: true,
                createdAt: d.created_at,
                sellerId: d.seller_id,
                condition: 'Digital PDF',
                images: d.cover_image_url ? [d.cover_image_url] : [],
                priceInKobo: d.price,
                price: d.price / 100,
            }))
            const merged = [...(physical || []), ...digitalTagged]
            merged.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
            return merged.slice(0, 20)
        },
        { ttl: 5 * 60 * 1000 }
    )

    const listings = data;

    return (
        <div style={{ maxWidth: '42rem', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Minimal Header */}
            <header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 40,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.75rem 1rem',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <ZikShareLogo size="md" />
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '9999px',
                            backgroundColor: '#FFFBEB',
                            color: '#D97706',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                        }}
                    >
                        <GraduationCap size={14} />
                        UNIZIK
                    </div>
                </div>
            </header>

            {/* Official Campus Announcement Banner */}
            <div style={{ padding: '0.25rem 1rem 0' }}>
                <HomeAnnouncementBanner />
            </div>

            {/* Redesigned Hero Section */}
            <section className="hero-gradient" style={{ margin: '1rem', borderRadius: '1.25rem', padding: '1.75rem 1.25rem', position: 'relative', overflow: 'hidden' }}>
                {/* Background decorative elements */}
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(250,90,0,0.1) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(0,102,255,0.08) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }} />
                
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <h1 style={{ margin: 0, fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.1, color: 'var(--color-brand-dark)', letterSpacing: '-0.02em' }}>
                        Students.<br />
                        <span style={{ color: 'var(--color-brand)' }}>Connecting.</span><br />
                        <span style={{ color: 'var(--color-orange)' }}>Deals That Make Sense.</span>
                    </h1>
                    <p style={{ margin: '1rem 0 1.25rem', fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, maxWidth: '280px' }}>
                        Buy and sell eBooks, gadgets, books, furniture and more — all <span style={{ fontWeight: 600, color: 'var(--color-brand)' }}>within the UNIZIK community.</span>
                    </p>

                    {/* Trust Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.625rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-brand)' }}>
                            <ShieldCheck size={14} /> Trusted Students
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.625rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-orange)' }}>
                            <TrendingUp size={14} /> Great Deals Everyday
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.625rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-brand)' }}>
                            <MessageCircle size={14} /> Safe & Easy Transactions
                        </div>
                    </div>

                    {/* Search Bar - Moved into Hero for better prominence */}
                    <div
                        onClick={() => navigate('/search')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.875rem 1rem',
                            borderRadius: '1rem',
                            backgroundColor: 'white',
                            boxShadow: '0 8px 24px rgba(0, 102, 255, 0.12)',
                            cursor: 'pointer',
                        }}
                    >
                        <Search size={18} color="var(--color-brand)" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: '0.875rem', color: '#8898AA', fontWeight: 500 }}>
                            Search for anything on campus...
                        </span>
                        <div style={{ marginLeft: 'auto', backgroundColor: 'var(--color-brand)', padding: '0.375rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <SlidersHorizontal size={14} color="white" />
                        </div>
                    </div>
                </div>

                {/* Floating Elements representing Categories (Visible on larger screens or positioned absolutely) */}
                <div className="animate-float" style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'white', padding: '0.5rem', borderRadius: '1rem', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', zIndex: 5 }}>
                    <div style={{ backgroundColor: '#FEE2E2', padding: '0.5rem', borderRadius: '0.75rem' }}>
                        <Smartphone size={24} color="#EF4444" />
                    </div>
                    <span style={{ fontSize: '0.5rem', fontWeight: 800, color: 'var(--color-text-secondary)' }}>Electronics</span>
                </div>
                <div className="animate-float-delayed" style={{ position: 'absolute', bottom: '6rem', right: '-0.5rem', backgroundColor: 'white', padding: '0.5rem', borderRadius: '1rem', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', zIndex: 5 }}>
                    <div style={{ backgroundColor: '#E0E7FF', padding: '0.5rem', borderRadius: '0.75rem' }}>
                        <BookOpen size={24} color="#4F46E5" />
                    </div>
                    <span style={{ fontSize: '0.5rem', fontWeight: 800, color: 'var(--color-text-secondary)' }}>eBooks & PDFs</span>
                </div>
            </section>

            {/* Top Categories Scrollbar Redesign */}
            <section style={{ padding: '0.5rem 0' }}>
                <div className="hide-scrollbar" style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', padding: '0.5rem 1rem', gap: '0.75rem' }}>
                    <div style={{ flexShrink: 0, paddingRight: '0.75rem', borderRight: '2px solid var(--color-border-subtle)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', backgroundColor: 'var(--color-brand)', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.75rem' }}>
                            <Search size={16} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Shop from<br/>Top Categories</span>
                        </div>
                    </div>
                    
                    {/* Category Icons mapped similar to design */}
                    {[
                        { id: 'library', name: 'eBooks & PDFs', icon: BookOpen, color: '#4F46E5', bg: '#E0E7FF' },
                        { id: 'electronics', name: 'Electronics', icon: Smartphone, color: '#0EA5E9', bg: '#E0F2FE' },
                        { id: 'furniture', name: 'Furniture', icon: Armchair, color: '#F59E0B', bg: '#FEF3C7' },
                        { id: 'materials', name: 'Physical Materials', icon: Package, color: '#10B981', bg: '#D1FAE5' },
                    ].map(cat => (
                        <div 
                            key={cat.id}
                            onClick={() => cat.id === 'library' ? navigate('/library') : navigate(`/search?segment=${cat.id}`)}
                            style={{ 
                                flexShrink: 0, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                gap: '0.375rem',
                                cursor: 'pointer',
                                width: '4.5rem'
                            }}
                        >
                            <div style={{ backgroundColor: cat.bg, width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <cat.icon size={20} color={cat.color} />
                            </div>
                            <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--color-text-secondary)', textAlign: 'center', lineHeight: 1.2 }}>{cat.name}</span>
                        </div>
                    ))}
                    
                    <div onClick={() => navigate('/search')} style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem', cursor: 'pointer', width: '4.5rem' }}>
                        <div style={{ backgroundColor: '#F1F5F9', width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', gap: '2px' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#64748B' }}/>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#64748B' }}/>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#64748B' }}/>
                            </div>
                        </div>
                        <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--color-text-secondary)', textAlign: 'center', lineHeight: 1.2 }}>... and more</span>
                    </div>
                </div>
            </section>

            {/* Listings Section */}
            <section style={{ padding: '1.5rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ backgroundColor: 'var(--color-brand-soft)', padding: '0.375rem', borderRadius: '0.5rem' }}>
                            <TrendingUp size={16} color="var(--color-brand)" />
                        </div>
                        <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-brand-dark)', letterSpacing: '-0.01em' }}>Trending Now</h2>
                    </div>
                    <button
                        onClick={() => navigate('/search')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-brand)',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '9999px',
                            backgroundColor: 'var(--color-brand-soft)',
                            transition: 'background-color 0.2s',
                        }}
                    >
                        View all <ChevronRight size={14} />
                    </button>
                </div>

                {isLoading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                    </div>
                ) : error ? (
                    <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--color-text-muted)', backgroundColor: 'white', borderRadius: '1rem', border: '1px solid var(--color-border-subtle)' }}>
                        <p style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Unable to load listings</p>
                        <p style={{ fontSize: '0.8125rem', marginTop: '0.5rem' }}>Please check your connection and try again.</p>
                    </div>
                ) : listings?.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        {listings.map(listing => (
                            <ListingCard key={listing.id} listing={listing} navigate={navigate} />
                        ))}
                    </div>
                ) : (
                    <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--color-text-muted)', backgroundColor: 'white', borderRadius: '1rem', border: '1px solid var(--color-border-subtle)' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem', opacity: 0.5 }}>🛒</div>
                        <p style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '1.125rem' }}>No listings yet</p>
                        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Be the first to post something to the campus!</p>
                    </div>
                )}
            </section>

            {/* Bottom Trust/Info Banner */}
            <section style={{ padding: '0 1rem 1.5rem' }}>
                <div className="trust-banner-gradient" style={{ borderRadius: '1.25rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(0, 102, 255, 0.1)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ backgroundColor: 'var(--color-brand)', padding: '0.5rem', borderRadius: '50%', color: 'white' }}>
                                <Users size={16} />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brand-dark)' }}>By Students</p>
                                <p style={{ margin: 0, fontSize: '0.625rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>For Students</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ backgroundColor: 'var(--color-brand)', padding: '0.5rem', borderRadius: '50%', color: 'white' }}>
                                <ShieldCheck size={16} />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brand-dark)' }}>Safe & Secure</p>
                                <p style={{ margin: 0, fontSize: '0.625rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Transactions</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ backgroundColor: 'var(--color-brand)', padding: '0.5rem', borderRadius: '50%', color: 'white' }}>
                                <Zap size={16} />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brand-dark)' }}>Quick & Easy</p>
                                <p style={{ margin: 0, fontSize: '0.625rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>To Use</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ backgroundColor: 'var(--color-orange)', padding: '0.5rem', borderRadius: '50%', color: 'white' }}>
                                <GraduationCap size={16} />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brand-dark)' }}>Proudly</p>
                                <p style={{ margin: 0, fontSize: '0.625rem', color: 'var(--color-orange)', fontWeight: 700 }}>UNIZIK</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
