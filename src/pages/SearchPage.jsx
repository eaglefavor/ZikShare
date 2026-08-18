import { useState, useEffect, useCallback } from 'react'
import { Search as SearchIcon, X, SlidersHorizontal, History, Sparkles, TrendingUp } from 'lucide-react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getListings, getDigitalProducts } from '../lib/database'

const categories = ['All', 'Electronics', 'Books', 'Fashion', 'Services', 'Engineering', 'Science', 'Past Questions', 'Notes']
const conditions = ['All', 'Brand New', 'Like New', 'Fairly Used', 'Digital PDF']
const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low → High' },
    { value: 'price-high', label: 'Price: High → Low' },
]

const popularSearches = ['GST 112', 'FAC 202', 'Calculus', 'Standing Fan', 'Past Questions', 'MTH 101']

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)
}

export default function SearchPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const initialCategory = searchParams.get('category') || 'All'
    const [query, setQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState(initialCategory)
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [sortBy, setSortBy] = useState('newest')
    const [conditionFilter, setConditionFilter] = useState('All')

    // Recent search history
    const [recentSearches, setRecentSearches] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('zikshare_recent_searches') || '[]')
        } catch {
            return []
        }
    })

    const saveSearchTerm = (term) => {
        const clean = term.trim()
        if (!clean || clean.length < 2) return
        setRecentSearches(prev => {
            const updated = [clean, ...prev.filter(s => s.toLowerCase() !== clean.toLowerCase())].slice(0, 6)
            try {
                localStorage.setItem('zikshare_recent_searches', JSON.stringify(updated))
            } catch {}
            return updated
        })
    }

    const clearRecentSearches = () => {
        setRecentSearches([])
        try {
            localStorage.removeItem('zikshare_recent_searches')
        } catch {}
    }

    const fetchResults = useCallback(async () => {
        setIsLoading(true)
        try {
            const [physical, digital] = await Promise.all([
                getListings({
                    category: activeCategory,
                    search: query || undefined,
                    limit: 30,
                }).catch(() => []),
                getDigitalProducts({
                    category: activeCategory,
                    search: query || undefined,
                    limit: 30,
                }).catch(() => [])
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

            let combined = [...(physical || []), ...digitalTagged]

            // Client-side condition filter
            if (conditionFilter !== 'All') {
                combined = combined.filter(item => item.condition === conditionFilter)
            }

            // Client-side sort
            if (sortBy === 'price-low') {
                combined.sort((a, b) => a.price - b.price)
            } else if (sortBy === 'price-high') {
                combined.sort((a, b) => b.price - a.price)
            } else {
                combined.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
            }

            setResults(combined)
            if (query.trim()) {
                saveSearchTerm(query)
            }
        } catch (err) {
            console.error('Search error:', err)
            setResults([])
        } finally {
            setIsLoading(false)
        }
    }, [activeCategory, query, sortBy, conditionFilter])

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(fetchResults, 280)
        return () => clearTimeout(timer)
    }, [fetchResults])

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.625rem 0.875rem',
                            borderRadius: '0.75rem',
                            backgroundColor: 'var(--color-background)',
                            border: '1.5px solid var(--color-brand)',
                            transition: 'box-shadow 0.2s',
                        }}
                    >
                        <SearchIcon size={16} color="var(--color-brand)" style={{ flexShrink: 0 }} />
                        <input
                            type="text"
                            placeholder="Search past questions, books, gadgets..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                fontSize: '0.8125rem',
                                fontFamily: 'inherit',
                                color: 'var(--color-text-primary)',
                            }}
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.125rem', color: 'var(--color-text-muted)' }}
                                aria-label="Clear search"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '0.75rem',
                            border: showFilters ? '2px solid var(--color-brand)' : '1px solid var(--color-border)',
                            backgroundColor: showFilters ? '#EFF6FF' : 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            flexShrink: 0
                        }}
                    >
                        <SlidersHorizontal size={16} color={showFilters ? 'var(--color-brand)' : 'var(--color-text-secondary)'} />
                    </button>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div
                        style={{
                            padding: '0.875rem',
                            marginBottom: '0.75rem',
                            borderRadius: '0.75rem',
                            backgroundColor: '#F8FAFC',
                            border: '1px solid var(--color-border)',
                            animation: 'fadeIn 0.2s ease-out'
                        }}
                    >
                        {/* Sort */}
                        <div style={{ marginBottom: '0.75rem' }}>
                            <label style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.375rem' }}>
                                Sort By
                            </label>
                            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                                {sortOptions.map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setSortBy(opt.value)}
                                        style={{
                                            padding: '0.375rem 0.75rem',
                                            borderRadius: '9999px',
                                            border: 'none',
                                            fontSize: '0.6875rem',
                                            fontWeight: 600,
                                            fontFamily: 'inherit',
                                            cursor: 'pointer',
                                            backgroundColor: sortBy === opt.value ? 'var(--color-brand)' : 'white',
                                            color: sortBy === opt.value ? 'white' : 'var(--color-text-secondary)',
                                            transition: 'all 0.15s ease',
                                            boxShadow: sortBy === opt.value ? '0 2px 6px rgba(59,130,246,0.3)' : '0 1px 2px rgba(0,0,0,0.04)',
                                        }}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Condition */}
                        <div>
                            <label style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.375rem' }}>
                                Item Type & Condition
                            </label>
                            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                                {conditions.map(cond => (
                                    <button
                                        key={cond}
                                        onClick={() => setConditionFilter(cond)}
                                        style={{
                                            padding: '0.375rem 0.75rem',
                                            borderRadius: '9999px',
                                            border: 'none',
                                            fontSize: '0.6875rem',
                                            fontWeight: 600,
                                            fontFamily: 'inherit',
                                            cursor: 'pointer',
                                            backgroundColor: conditionFilter === cond ? 'var(--color-brand)' : 'white',
                                            color: conditionFilter === cond ? 'white' : 'var(--color-text-secondary)',
                                            transition: 'all 0.15s ease',
                                            boxShadow: conditionFilter === cond ? '0 2px 6px rgba(59,130,246,0.3)' : '0 1px 2px rgba(0,0,0,0.04)',
                                        }}
                                    >
                                        {cond}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Category chips */}
                <div className="hide-scrollbar" style={{ display: 'flex', gap: '0.375rem', overflowX: 'auto', paddingBottom: '0.125rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '0.375rem 0.875rem',
                                borderRadius: '9999px',
                                border: 'none',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                fontFamily: 'inherit',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                backgroundColor: activeCategory === cat ? 'var(--color-brand)' : 'var(--color-background)',
                                color: activeCategory === cat ? 'white' : 'var(--color-text-secondary)',
                                transition: 'all 0.15s ease',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            {/* Recent Searches Chips (shown when no query typed) */}
            {!query && recentSearches.length > 0 && (
                <div style={{ padding: '0.75rem 1rem 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                            <History size={12} />
                            Recent Searches
                        </div>
                        <button
                            onClick={clearRecentSearches}
                            style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.6875rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                            Clear
                        </button>
                    </div>
                    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                        {recentSearches.map(term => (
                            <button
                                key={term}
                                onClick={() => setQuery(term)}
                                style={{
                                    padding: '0.3125rem 0.625rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: 'white',
                                    fontSize: '0.75rem',
                                    color: 'var(--color-text-primary)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Results Section */}
            <section style={{ padding: '0.75rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 0 0.625rem' }}>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                        {isLoading ? 'Searching UNIZIK marketplace...' : `${results.length} item${results.length !== 1 ? 's' : ''} found`}
                    </p>
                    {activeCategory !== 'All' && (
                        <span style={{ fontSize: '0.6875rem', backgroundColor: '#EFF6FF', color: '#2563EB', padding: '0.125rem 0.5rem', borderRadius: '9999px', fontWeight: 600 }}>
                            {activeCategory}
                        </span>
                    )}
                </div>

                {isLoading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} style={{ borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                                <div className="skeleton" style={{ width: '100%', height: '130px' }} />
                                <div style={{ padding: '0.75rem' }}>
                                    <div className="skeleton" style={{ width: '80%', height: '0.875rem', borderRadius: '0.25rem', marginBottom: '0.5rem' }} />
                                    <div className="skeleton" style={{ width: '50%', height: '1rem', borderRadius: '0.25rem' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : results.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                        {results.map(item => {
                            const placeholderColors = ['#DBEAFE', '#E0E7FF', '#D9F99D', '#FBCFE8', '#E9D5FF', '#FDE68A']
                            const bgColor = placeholderColors[(item.id?.charCodeAt?.(0) || 0) % placeholderColors.length]
                            const condMap = {
                                'Brand New': 'condition-new',
                                'Like New': 'condition-like-new',
                                'Fairly Used': 'condition-used',
                                'Digital PDF': 'condition-like-new',
                            }
                            const imageUrl = item.images?.[0]

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => navigate(`/item/${item.id}`)}
                                    style={{
                                        borderRadius: '0.75rem',
                                        overflow: 'hidden',
                                        backgroundColor: 'white',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                                        cursor: 'pointer',
                                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-2px)'
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)'
                                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'
                                    }}
                                >
                                    <div style={{ width: '100%', height: '130px', backgroundColor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', position: 'relative', overflow: 'hidden' }}>
                                        {imageUrl ? (
                                            <img src={imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            item.isDigital ? '📄' : '📦'
                                        )}
                                        <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem' }}>
                                            <span className={`condition-badge ${condMap[item.condition] || 'condition-used'}`}>{item.condition || 'Available'}</span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '0.75rem' }}>
                                        <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
                                        <p className="price-tag" style={{ margin: '0.375rem 0 0', fontSize: '0.9375rem' }}>{formatNaira(item.price)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div style={{ padding: '2.5rem 1rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', marginTop: '0.5rem' }}>
                        <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', fontSize: '1.5rem', color: '#2563EB' }}>
                            🔍
                        </div>
                        <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: '0 0 0.25rem', color: 'var(--color-text-primary)' }}>No items found</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0 0 1.25rem' }}>
                            We couldn't find matches for "{query}". Try checking one of these popular searches:
                        </p>
                        <div style={{ display: 'flex', gap: '0.375rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {popularSearches.map(pop => (
                                <button
                                    key={pop}
                                    onClick={() => {
                                        setQuery(pop)
                                        setActiveCategory('All')
                                    }}
                                    style={{
                                        padding: '0.375rem 0.75rem',
                                        borderRadius: '9999px',
                                        border: '1px solid #BFDBFE',
                                        backgroundColor: '#EFF6FF',
                                        color: '#1E40AF',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}
                                >
                                    <Sparkles size={12} color="#2563EB" />
                                    {pop}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}
