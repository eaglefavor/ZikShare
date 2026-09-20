import { Search, SlidersHorizontal, ChevronRight, ShieldCheck, TrendingUp, BookOpen, MessageCircle, Smartphone, Armchair, Package, Users, Zap, GraduationCap, Landmark, Library, BadgeCheck, ClipboardList } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCachedQuery } from '../hooks/useCachedQuery'
import { getListings, getDigitalProducts } from '../lib/database'
import { HomeAnnouncementBanner } from '../components/AnnouncementModal'
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
    const placeholderColors = ['#F8FAFC', '#F1F5F9', '#EFF6FF', '#FFF3EB', '#F8FAFC']
    const bgColor = placeholderColors[(listing.id?.charCodeAt?.(0) || 0) % placeholderColors.length]
    const imageUrl = listing.images?.[0]
    const isBoosted = listing.is_boosted && (!listing.boosted_until || new Date(listing.boosted_until) > new Date())

    return (
        <article
            className={`academic-listing-card ${isBoosted ? 'academic-listing-card--boosted' : ''}`}
            onClick={() => navigate(`/item/${listing.id}`)}
        >
            <div className="academic-listing-card__media" style={{ backgroundColor: bgColor }}>
                {imageUrl ? (
                    <img src={imageUrl} alt={listing.title} />
                ) : (
                    <div className="academic-listing-card__placeholder">
                        {listing.isDigital ? <BookOpen size={34} /> : <Package size={34} />}
                    </div>
                )}
                <div className="academic-listing-card__badges">
                    <ConditionBadge condition={listing.condition} />
                    {isBoosted && <span className="academic-promoted-badge">Featured</span>}
                </div>
            </div>
            <div className="academic-listing-card__body">
                <h3>{listing.title}</h3>
                <div className="academic-listing-card__meta">
                    {listing.subcategory && <span>{listing.subcategory}</span>}
                    <span>{listing.isDigital ? 'Digital resource' : 'Campus item'}</span>
                </div>
                <div className="academic-listing-card__footer">
                    <p className="price-tag">{formatNaira(listing.price)}</p>
                    <ChevronRight size={16} />
                </div>
            </div>
        </article>
    )
}

function SkeletonCard() {
    return (
        <div className="academic-listing-card academic-listing-card--skeleton">
            <div className="skeleton academic-listing-card__media" />
            <div className="academic-listing-card__body">
                <div className="skeleton" style={{ width: '86%', height: '1rem' }} />
                <div className="skeleton" style={{ width: '62%', height: '0.875rem', marginTop: '0.65rem' }} />
                <div className="skeleton" style={{ width: '44%', height: '1.125rem', marginTop: '1rem' }} />
            </div>
        </div>
    )
}

const categoryCards = [
    { id: 'library', title: 'UNIZIK Digital Library', description: 'Past questions, course packs and academic PDFs', icon: Library, tone: 'blue' },
    { id: 'electronics', title: 'Electronics', description: 'Phones, laptops, accessories and gadgets', icon: Smartphone, tone: 'orange' },
    { id: 'materials', title: 'Study Materials', description: 'Textbooks, handouts and printed resources', icon: BookOpen, tone: 'green' },
    { id: 'furniture', title: 'Hostel Essentials', description: 'Furniture, appliances and room supplies', icon: Armchair, tone: 'slate' },
]

const campusStats = [
    { label: 'Campus-first listings', value: '20+', icon: ClipboardList },
    { label: 'Academic resources', value: '150+', icon: BookOpen },
    { label: 'Student-focused support', value: '24/7', icon: ShieldCheck },
]

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

    const listings = data

    const handleCategoryClick = (categoryId) => {
        if (categoryId === 'library') {
            navigate('/library')
            return
        }
        navigate(`/search?segment=${categoryId}`)
    }

    return (
        <div className="academic-home-shell">
            <header className="academic-site-header">
                <div className="academic-container academic-site-header__inner">
                    <ZikShareLogo size="md" withTagline />
                    <button className="academic-campus-pill" onClick={() => navigate('/library')}>
                        <GraduationCap size={15} />
                        UNIZIK Campus
                    </button>
                </div>
            </header>

            <main className="academic-container academic-home-main">
                <HomeAnnouncementBanner />

                <section className="academic-hero" aria-labelledby="home-hero-title">
                    <div className="academic-hero__content">
                        <div className="academic-eyebrow">
                            <Landmark size={16} />
                            Academic marketplace for Nnamdi Azikiwe University students
                        </div>
                        <h1 id="home-hero-title">
                            A more trusted way to exchange campus resources.
                        </h1>
                        <p>
                            Buy, sell and discover verified academic materials, electronics, hostel essentials and student services within the UNIZIK community.
                        </p>

                        <div className="academic-hero__actions">
                            <button className="academic-primary-action" onClick={() => navigate('/search')}>
                                Explore marketplace <ChevronRight size={18} />
                            </button>
                            <button className="academic-secondary-action" onClick={() => navigate('/library')}>
                                <BookOpen size={18} /> Open Digital Library
                            </button>
                        </div>

                        <button className="academic-search-panel" onClick={() => navigate('/search')}>
                            <Search size={20} />
                            <span>Search phones, laptops, generators, past questions...</span>
                            <span className="academic-search-panel__filter"><SlidersHorizontal size={15} /></span>
                        </button>
                    </div>

                    <aside className="academic-hero__panel" aria-label="Campus trust summary">
                        <div className="academic-panel-card academic-panel-card--featured">
                            <div className="academic-panel-card__icon"><BadgeCheck size={22} /></div>
                            <div>
                                <span>Campus verified</span>
                                <strong>Student-first transactions</strong>
                                <p>Built for academic exchange, peer-to-peer trade and safer communication.</p>
                            </div>
                        </div>
                        <div className="academic-stat-grid">
                            {campusStats.map((stat) => {
                                const Icon = stat.icon
                                return (
                                    <div className="academic-stat-card" key={stat.label}>
                                        <Icon size={18} />
                                        <strong>{stat.value}</strong>
                                        <span>{stat.label}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </aside>
                </section>

                <section className="academic-section" aria-labelledby="category-title">
                    <div className="academic-section-heading">
                        <div>
                            <span className="academic-section-kicker">Browse by need</span>
                            <h2 id="category-title">Academic and campus essentials</h2>
                        </div>
                        <button className="academic-text-button" onClick={() => navigate('/search')}>
                            View all <ChevronRight size={15} />
                        </button>
                    </div>

                    <div className="academic-category-grid">
                        {categoryCards.map((category) => {
                            const Icon = category.icon
                            return (
                                <button
                                    key={category.id}
                                    className={`academic-category-card academic-category-card--${category.tone}`}
                                    onClick={() => handleCategoryClick(category.id)}
                                >
                                    <span className="academic-category-card__icon"><Icon size={23} /></span>
                                    <strong>{category.title}</strong>
                                    <span>{category.description}</span>
                                </button>
                            )
                        })}
                    </div>
                </section>

                <section className="academic-section academic-section--market" aria-labelledby="market-title">
                    <div className="academic-section-heading">
                        <div>
                            <span className="academic-section-kicker">Current marketplace</span>
                            <h2 id="market-title">Featured campus listings</h2>
                        </div>
                        <button className="academic-text-button academic-text-button--filled" onClick={() => navigate('/search')}>
                            View all <ChevronRight size={15} />
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="academic-listing-grid">
                            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                        </div>
                    ) : error ? (
                        <div className="academic-empty-state">
                            <ShieldCheck size={32} />
                            <p>Unable to load listings</p>
                            <span>Please check your connection and try again.</span>
                        </div>
                    ) : listings?.length > 0 ? (
                        <div className="academic-listing-grid">
                            {listings.map(listing => (
                                <ListingCard key={listing.id} listing={listing} navigate={navigate} />
                            ))}
                        </div>
                    ) : (
                        <div className="academic-empty-state">
                            <Package size={34} />
                            <p>No listings yet</p>
                            <span>Be the first to post an item or academic resource.</span>
                        </div>
                    )}
                </section>

                <section className="academic-trust-strip" aria-label="Why students use ZikShare">
                    <div>
                        <Users size={18} />
                        <strong>Student community</strong>
                        <span>Purpose-built for campus exchange.</span>
                    </div>
                    <div>
                        <MessageCircle size={18} />
                        <strong>Direct communication</strong>
                        <span>Discuss details before meeting or delivery.</span>
                    </div>
                    <div>
                        <Zap size={18} />
                        <strong>Fast discovery</strong>
                        <span>Find resources by category and need.</span>
                    </div>
                    <div>
                        <TrendingUp size={18} />
                        <strong>Professional presentation</strong>
                        <span>Clean listing flows for sellers and buyers.</span>
                    </div>
                </section>
            </main>
        </div>
    )
}
