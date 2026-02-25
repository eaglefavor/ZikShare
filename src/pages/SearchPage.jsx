import { useState, useEffect, useCallback } from 'react'
import { Search as SearchIcon, X, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getListings } from '../lib/database'

const categories = ['All', 'Electronics', 'Books', 'Fashion', 'Hostel', 'Services']
const conditions = ['All', 'Brand New', 'Like New', 'Fairly Used']
const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low → High' },
    { value: 'price-high', label: 'Price: High → Low' },
]

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

    const fetchResults = useCallback(async () => {
        setIsLoading(true)
        try {
            const data = await getListings({
                category: activeCategory,
                search: query || undefined,
                limit: 30,
            })
            let sorted = data || []

            // Client-side condition filter
            if (conditionFilter !== 'All') {
                sorted = sorted.filter(item => item.condition === conditionFilter)
            }

            // Client-side sort
            if (sortBy === 'price-low') {
                sorted = [...sorted].sort((a, b) => a.price - b.price)
            } else if (sortBy === 'price-high') {
                sorted = [...sorted].sort((a, b) => b.price - a.price)
            }
            // 'newest' is already the default server order

            setResults(sorted)
        } catch (err) {
            console.error('Search error:', err)
            setResults([])
        } finally {
            setIsLoading(false)
        }
    }, [activeCategory, query, sortBy, conditionFilter])

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(fetchResults, 300)
        return () => clearTimeout(timer)
    }, [fetchResults])

    return (
        <div>
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
                            border: '2px solid var(--color-brand)',
                        }}
                    >
                        <SearchIcon size={16} color="var(--color-brand)" />
                        <input
                            type="text"
                            placeholder="Search items, books, electronics..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            autoFocus
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
                                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.125rem' }}
                            >
                                <X size={14} color="var(--color-text-muted)" />
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
                        }}
                    >
                        <SlidersHorizontal size={16} color={showFilters ? 'var(--color-brand)' : 'var(--color-text-secondary)'} />
                    </button>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div
                        style={{
                            padding: '0.75rem',
                            marginBottom: '0.75rem',
                            borderRadius: '0.75rem',
                            backgroundColor: 'var(--color-background)',
                            border: '1px solid var(--color-border)',
                        }}
                    >
                        {/* Sort */}
                        <div style={{ marginBottom: '0.75rem' }}>
                            <label style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.375rem' }}>
                                Sort by
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
                                            transition: 'all 0.2s ease',
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
                            <label style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.375rem' }}>
                                Condition
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
                                            transition: 'all 0.2s ease',
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
                <div className="hide-scrollbar" style={{ display: 'flex', gap: '0.375rem', overflowX: 'auto' }}>
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
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            {/* Results */}
            <section style={{ padding: '0.75rem 1rem' }}>
                <p style={{ margin: '0 0 0.625rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                    {isLoading ? 'Searching...' : `${results.length} result${results.length !== 1 ? 's' : ''} found`}
                </p>

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
                            const condMap = { 'Brand New': 'condition-new', 'Like New': 'condition-like-new', 'Fairly Used': 'condition-used' }
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
                                        transition: 'transform 0.2s ease',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                                    onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                                >
                                    <div style={{ width: '100%', height: '130px', backgroundColor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', position: 'relative', overflow: 'hidden' }}>
                                        {imageUrl ? (
                                            <img src={imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            '📦'
                                        )}
                                        <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem' }}>
                                            <span className={`condition-badge ${condMap[item.condition] || 'condition-used'}`}>{item.condition}</span>
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
                    <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</p>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No items found</p>
                        <p style={{ fontSize: '0.75rem' }}>Try a different search or category</p>
                    </div>
                )}
            </section>
        </div>
    )
}
