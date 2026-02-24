import { useState } from 'react'
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const categories = ['All', 'Electronics', 'Books', 'Fashion', 'Hostel', 'Services']

const mockResults = [
    { id: 1, title: 'Engineering Textbook (300L)', price: 3500, condition: 'Fairly Used', category: 'Books' },
    { id: 2, title: 'HP Laptop Charger 65W', price: 8000, condition: 'Brand New', category: 'Electronics' },
    { id: 3, title: 'LED Reading Lamp', price: 2000, condition: 'Like New', category: 'Hostel' },
    { id: 4, title: 'Casio fx-991ES Plus', price: 5500, condition: 'Fairly Used', category: 'Electronics' },
    { id: 5, title: 'Mini Fridge (50L)', price: 25000, condition: 'Fairly Used', category: 'Hostel' },
    { id: 6, title: 'Ring Light + Tripod', price: 4500, condition: 'Brand New', category: 'Electronics' },
    { id: 7, title: 'Ankara Fabric (6 yards)', price: 6000, condition: 'Brand New', category: 'Fashion' },
    { id: 8, title: 'Assignment Typing Services', price: 500, condition: 'Brand New', category: 'Services' },
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

    const filtered = mockResults.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory
        const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase())
        return matchesCategory && matchesQuery
    })

    return (
        <div>
            {/* Search Header */}
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
                <div
                    style={{
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
                        placeholder="Search items, e.g., 'Generator'"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        autoFocus
                        style={{
                            flex: 1,
                            border: 'none',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            fontSize: '0.8125rem',
                            color: 'var(--color-text-primary)',
                            fontFamily: 'inherit',
                        }}
                    />
                    {query && (
                        <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.125rem', display: 'flex' }}>
                            <X size={16} color="var(--color-text-muted)" />
                        </button>
                    )}
                    <div style={{ width: '1px', height: '1.25rem', backgroundColor: 'var(--color-border)' }} />
                    <SlidersHorizontal size={16} color="var(--color-text-secondary)" style={{ cursor: 'pointer' }} />
                </div>

                {/* Category Chips */}
                <div
                    className="hide-scrollbar"
                    style={{
                        display: 'flex',
                        gap: '0.5rem',
                        overflowX: 'auto',
                        marginTop: '0.75rem',
                        paddingBottom: '0.125rem',
                    }}
                >
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '0.375rem 0.875rem',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s ease',
                                backgroundColor: activeCategory === cat ? 'var(--color-brand)' : 'white',
                                color: activeCategory === cat ? 'white' : 'var(--color-text-secondary)',
                                boxShadow: activeCategory === cat
                                    ? '0 2px 8px rgba(59, 130, 246, 0.3)'
                                    : '0 1px 2px rgba(0,0,0,0.04)',
                                border: activeCategory === cat ? '1px solid var(--color-brand)' : '1px solid var(--color-border)',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            {/* Results */}
            <div style={{ padding: '0.75rem 1rem' }}>
                <p style={{ margin: '0 0 0.75rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                    {filtered.map(item => {
                        const colors = ['#DBEAFE', '#E0E7FF', '#D9F99D', '#FBCFE8', '#E9D5FF', '#FDE68A']
                        const bg = colors[item.id % colors.length]
                        const condClass = {
                            'Brand New': 'condition-new',
                            'Like New': 'condition-like-new',
                            'Fairly Used': 'condition-used',
                        }

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
                                <div
                                    style={{
                                        width: '100%',
                                        height: '130px',
                                        backgroundColor: bg,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2rem',
                                        position: 'relative',
                                    }}
                                >
                                    📦
                                    <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem' }}>
                                        <span className={`condition-badge ${condClass[item.condition] || ''}`}>{item.condition}</span>
                                    </div>
                                </div>
                                <div style={{ padding: '0.625rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {item.title}
                                    </h3>
                                    <p className="price-tag" style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>
                                        {formatNaira(item.price)}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🔍</div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>No items found</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                            Try a different search term or category
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
