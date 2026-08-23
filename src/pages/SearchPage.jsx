import { useState, useEffect, useCallback } from 'react'
import { Search as SearchIcon, X, SlidersHorizontal, History, Sparkles, Plus, MapPin, MessageCircle, Send, Loader2, BookOpen, Tag } from 'lucide-react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getListings, getDigitalProducts, getStudentRequests, createStudentRequest } from '../lib/database'
import { useAuth } from '../contexts/AuthContext'
import { MARKETPLACE_SEGMENTS, ALL_SUBCATEGORIES, UNIZIK_LOCATIONS, ACADEMIC_LEVELS } from '../lib/categories'
import { getOrCreateConversation } from '../lib/messaging'

const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low → High' },
    { value: 'price-high', label: 'Price: High → Low' },
]

const conditions = ['All', 'Brand New', 'Like New', 'Fairly Used', 'Digital PDF']
const popularSearches = ['GST 112', 'Standing Fan', 'MTH 101', 'Tiger Generator', 'Mouka Bed', 'Pressing Iron', 'Laptop', 'CED 341']

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount || 0)
}

export default function SearchPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuth()

    const initialSubcategory = searchParams.get('subcategory') || ''
    const initialCategory = searchParams.get('category') || 'All'

    const [mainTab, setMainTab] = useState('marketplace') // 'marketplace' | 'requests' | 'academic'
    const [query, setQuery] = useState('')
    const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory)
    const [activeCategory, setActiveCategory] = useState(initialCategory)
    
    // Academic Explorer State
    const [selectedLevel, setSelectedLevel] = useState('All')
    
    // Filter State
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [sortBy, setSortBy] = useState('newest')
    const [conditionFilter, setConditionFilter] = useState('All')

    // ISO (Student Requests Board) State
    const [requestsList, setRequestsList] = useState([])
    const [loadingRequests, setLoadingRequests] = useState(false)
    const [showRequestModal, setShowRequestModal] = useState(false)
    const [newRequestTitle, setNewRequestTitle] = useState('')
    const [newRequestDesc, setNewRequestDesc] = useState('')
    const [newRequestCat, setNewRequestCat] = useState('Tech')
    const [newRequestBudget, setNewRequestBudget] = useState('')
    const [newRequestLocation, setNewRequestLocation] = useState('Garba Square (Perm Site)')
    const [submittingRequest, setSubmittingRequest] = useState(false)

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
            } catch (e) {
                console.debug?.('LocalStorage save failed:', e)
            }
            return updated
        })
    }

    const clearRecentSearches = () => {
        setRecentSearches([])
        try {
            localStorage.removeItem('zikshare_recent_searches')
        } catch (e) {
            console.debug?.('LocalStorage clear failed:', e)
        }
    }

    const fetchResults = useCallback(async () => {
        setIsLoading(true)
        try {
            const [physical, digital] = await Promise.all([
                getListings({
                    category: activeCategory !== 'All' ? activeCategory : undefined,
                    search: query || undefined,
                    limit: 40,
                }).catch(() => []),
                getDigitalProducts({
                    category: activeCategory !== 'All' ? activeCategory : undefined,
                    search: query || undefined,
                    limit: 40,
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

            // Filter by subcategory if selected
            if (selectedSubcategory) {
                combined = combined.filter(item => {
                    const itemSub = (item.subcategory || '').toLowerCase()
                    const targetSub = selectedSubcategory.toLowerCase()
                    const title = (item.title || '').toLowerCase()
                    const desc = (item.description || '').toLowerCase()
                    return itemSub === targetSub || title.includes(targetSub) || desc.includes(targetSub)
                })
            }

            // Filter by academic level if selected
            if (selectedLevel !== 'All') {
                combined = combined.filter(item => item.level === selectedLevel)
            }

            // Condition filter
            if (conditionFilter !== 'All') {
                combined = combined.filter(item => item.condition === conditionFilter)
            }

            // Sorting (Boosted listings pinned to top if newest)
            if (sortBy === 'price-low') {
                combined.sort((a, b) => a.price - b.price)
            } else if (sortBy === 'price-high') {
                combined.sort((a, b) => b.price - a.price)
            } else {
                combined.sort((a, b) => {
                    const aBoosted = a.is_boosted && (!a.boosted_until || new Date(a.boosted_until) > new Date())
                    const bBoosted = b.is_boosted && (!b.boosted_until || new Date(b.boosted_until) > new Date())
                    if (aBoosted && !bBoosted) return -1
                    if (!aBoosted && bBoosted) return 1
                    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
                })
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
    }, [activeCategory, selectedSubcategory, selectedLevel, query, sortBy, conditionFilter])

    const fetchRequests = useCallback(async () => {
        setLoadingRequests(true)
        try {
            const data = await getStudentRequests()
            setRequestsList(data || [])
        } catch (err) {
            console.error('Failed to load requests:', err)
        } finally {
            setLoadingRequests(false)
        }
    }, [])

    useEffect(() => {
        if (mainTab === 'marketplace' || mainTab === 'academic') {
            const timer = setTimeout(fetchResults, 250)
            return () => clearTimeout(timer)
        } else if (mainTab === 'requests') {
            fetchRequests()
        }
    }, [fetchResults, fetchRequests, mainTab])

    const handleCreateRequest = async (e) => {
        e.preventDefault()
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        if (!newRequestTitle.trim()) return

        setSubmittingRequest(true)
        try {
            await createStudentRequest({
                userId: user?.uid || user?.id,
                title: newRequestTitle,
                description: newRequestDesc,
                category: newRequestCat,
                budgetNaira: newRequestBudget,
                preferredLocation: newRequestLocation,
            })
            setShowRequestModal(false)
            setNewRequestTitle('')
            setNewRequestDesc('')
            setNewRequestBudget('')
            fetchRequests()
        } catch (err) {
            console.error('Create request error:', err)
        } finally {
            setSubmittingRequest(false)
        }
    }

    const handleContactStudent = async (studentId) => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        try {
            const currentUserId = user?.uid || user?.id
            const conv = await getOrCreateConversation(currentUserId, studentId)
            if (conv?.id) {
                navigate(`/chat/${conv.id}`)
            }
        } catch (err) {
            console.error('Error starting conversation:', err)
        }
    }

    return (
        <div style={{ maxWidth: '42rem', margin: '0 auto', paddingBottom: '3rem' }}>
            {/* Top Navigation & Tabs */}
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 1rem' }}>
                {/* Main View Tabs: Marketplace / Student Demands / Course Explorer */}
                <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '0.75rem', backgroundColor: '#F1F5F9', padding: '0.25rem', borderRadius: '0.75rem' }}>
                    <button
                        onClick={() => setMainTab('marketplace')}
                        style={{
                            flex: 1,
                            padding: '0.5rem 0.25rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            backgroundColor: mainTab === 'marketplace' ? 'var(--color-brand)' : 'transparent',
                            color: mainTab === 'marketplace' ? '#FFFFFF' : '#64748B',
                            boxShadow: mainTab === 'marketplace' ? '0 2px 6px rgba(30,64,175,0.3)' : 'none',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        🛍️ Marketplace
                    </button>
                    <button
                        onClick={() => setMainTab('requests')}
                        style={{
                            flex: 1,
                            padding: '0.5rem 0.25rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            backgroundColor: mainTab === 'requests' ? 'var(--color-gold)' : 'transparent',
                            color: mainTab === 'requests' ? '#FFFFFF' : '#64748B',
                            boxShadow: mainTab === 'requests' ? '0 2px 6px rgba(217,119,6,0.3)' : 'none',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        🙋 Demands (ISO)
                    </button>
                    <button
                        onClick={() => {
                            setMainTab('academic')
                            setActiveCategory('Books')
                        }}
                        style={{
                            flex: 1,
                            padding: '0.5rem 0.25rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            backgroundColor: mainTab === 'academic' ? '#0F172A' : 'transparent',
                            color: mainTab === 'academic' ? '#FFFFFF' : '#64748B',
                            boxShadow: mainTab === 'academic' ? '0 2px 6px rgba(15,23,42,0.3)' : 'none',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        📚 Course Packs
                    </button>
                </div>

                {/* Search Input Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 0.875rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-background)', border: '1.5px solid var(--color-brand)' }}>
                        <SearchIcon size={16} color="var(--color-brand)" style={{ flexShrink: 0 }} />
                        <input
                            type="text"
                            placeholder={mainTab === 'academic' ? "Search course code (e.g. GST 112, MTH 101, FEG 281)..." : "Search phones, generators, beds, past questions..."}
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            style={{ flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent', fontSize: '0.8125rem', fontFamily: 'inherit', color: 'var(--color-text-primary)' }}
                        />
                        {query && (
                            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.125rem', color: 'var(--color-text-muted)' }}>
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    {mainTab === 'marketplace' && (
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', border: showFilters ? '2px solid var(--color-brand)' : '1px solid var(--color-border)', backgroundColor: showFilters ? '#EFF6FF' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                        >
                            <SlidersHorizontal size={16} color={showFilters ? 'var(--color-brand)' : 'var(--color-text-secondary)'} />
                        </button>
                    )}
                </div>

                {/* Filter Options Popup */}
                {showFilters && mainTab === 'marketplace' && (
                    <div style={{ padding: '0.875rem', marginBottom: '0.5rem', borderRadius: '0.75rem', backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)' }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <label style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Sort By</label>
                            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                                {sortOptions.map(opt => (
                                    <button key={opt.value} onClick={() => setSortBy(opt.value)}
                                        style={{ padding: '0.3125rem 0.625rem', borderRadius: '9999px', border: 'none', fontSize: '0.6875rem', fontWeight: 600, cursor: 'pointer', backgroundColor: sortBy === opt.value ? 'var(--color-brand)' : 'white', color: sortBy === opt.value ? 'white' : '#475569' }}>
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Condition</label>
                            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                                {conditions.map(cond => (
                                    <button key={cond} onClick={() => setConditionFilter(cond)}
                                        style={{ padding: '0.3125rem 0.625rem', borderRadius: '9999px', border: 'none', fontSize: '0.6875rem', fontWeight: 600, cursor: 'pointer', backgroundColor: conditionFilter === cond ? 'var(--color-brand)' : 'white', color: conditionFilter === cond ? 'white' : '#475569' }}>
                                        {cond}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Subcategory & Level Filter Pills */}
                {mainTab === 'marketplace' && (
                    <div className="hide-scrollbar" style={{ display: 'flex', gap: '0.375rem', overflowX: 'auto', paddingBottom: '0.125rem' }}>
                        <button
                            onClick={() => { setSelectedSubcategory(''); setActiveCategory('All'); }}
                            style={{ padding: '0.3125rem 0.75rem', borderRadius: '9999px', border: 'none', fontSize: '0.6875rem', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', backgroundColor: !selectedSubcategory ? '#2563EB' : '#F1F5F9', color: !selectedSubcategory ? 'white' : '#475569' }}>
                            All Items
                        </button>
                        {ALL_SUBCATEGORIES.map(sub => (
                            <button
                                key={sub.id}
                                onClick={() => setSelectedSubcategory(selectedSubcategory === sub.id ? '' : sub.id)}
                                style={{ padding: '0.3125rem 0.75rem', borderRadius: '9999px', border: '1px solid var(--color-border)', fontSize: '0.6875rem', fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer', backgroundColor: selectedSubcategory === sub.id ? sub.segmentColor : 'white', color: selectedSubcategory === sub.id ? 'white' : '#334155' }}>
                                {sub.emoji} {sub.name}
                            </button>
                        ))}
                    </div>
                )}

                {/* Academic Level Pills */}
                {mainTab === 'academic' && (
                    <div className="hide-scrollbar" style={{ display: 'flex', gap: '0.375rem', overflowX: 'auto', paddingBottom: '0.125rem' }}>
                        <button
                            onClick={() => setSelectedLevel('All')}
                            style={{ padding: '0.3125rem 0.75rem', borderRadius: '9999px', border: 'none', fontSize: '0.6875rem', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', backgroundColor: selectedLevel === 'All' ? '#059669' : '#F1F5F9', color: selectedLevel === 'All' ? 'white' : '#475569' }}>
                            All Levels
                        </button>
                        {ACADEMIC_LEVELS.map(lvl => (
                            <button
                                key={lvl}
                                onClick={() => setSelectedLevel(selectedLevel === lvl ? 'All' : lvl)}
                                style={{ padding: '0.3125rem 0.75rem', borderRadius: '9999px', border: '1px solid var(--color-border)', fontSize: '0.6875rem', fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer', backgroundColor: selectedLevel === lvl ? '#059669' : 'white', color: selectedLevel === lvl ? 'white' : '#334155' }}>
                                🎓 {lvl}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            {/* TAB 1 & 3: Marketplace & Academic Results */}
            {(mainTab === 'marketplace' || mainTab === 'academic') && (
                <section style={{ padding: '0.75rem 1rem' }}>
                    {/* Recent searches prompt */}
                    {!query && recentSearches.length > 0 && (
                        <div style={{ marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                                    <History size={12} /> Recent Searches
                                </div>
                                <button onClick={clearRecentSearches} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.6875rem', fontWeight: 600, cursor: 'pointer' }}>Clear</button>
                            </div>
                            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                                {recentSearches.map(term => (
                                    <button key={term} onClick={() => setQuery(term)}
                                        style={{ padding: '0.25rem 0.5rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', backgroundColor: 'white', fontSize: '0.6875rem', color: '#334155', cursor: 'pointer' }}>
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 0 0.625rem' }}>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                            {isLoading ? 'Searching campus marketplace...' : `${results.length} item${results.length !== 1 ? 's' : ''} found`}
                        </p>
                    </div>

                    {isLoading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} style={{ borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: 'white', height: '180px' }} className="skeleton" />
                            ))}
                        </div>
                    ) : results.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                            {results.map(item => {
                                const imageUrl = item.images?.[0]
                                const isBoosted = item.is_boosted && (!item.boosted_until || new Date(item.boosted_until) > new Date())
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => navigate(`/item/${item.id}`)}
                                        style={{
                                            borderRadius: '0.75rem',
                                            overflow: 'hidden',
                                            backgroundColor: 'white',
                                            boxShadow: isBoosted ? '0 4px 14px rgba(234, 179, 8, 0.25)' : '0 1px 3px rgba(0,0,0,0.06)',
                                            border: isBoosted ? '1.5px solid #FACC15' : '1px solid var(--color-border)',
                                            cursor: 'pointer',
                                            transition: 'transform 0.15s ease',
                                        }}
                                    >
                                        <div style={{ width: '100%', height: '130px', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', position: 'relative', overflow: 'hidden' }}>
                                            {imageUrl ? (
                                                <img src={imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                item.isDigital ? '📄' : '📦'
                                            )}
                                            {isBoosted && (
                                                <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', fontSize: '0.5625rem', fontWeight: 800, padding: '0.125rem 0.375rem', borderRadius: '0.25rem', backgroundColor: '#FEF08A', color: '#854D0E', display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
                                                    <Sparkles size={10} /> PROMOTED
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ padding: '0.75rem' }}>
                                            <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.375rem' }}>
                                                <p className="price-tag" style={{ margin: 0, fontSize: '0.9375rem' }}>{formatNaira(item.price)}</p>
                                                {item.subcategory && (
                                                    <span style={{ fontSize: '0.5625rem', color: '#64748B', backgroundColor: '#F1F5F9', padding: '0.125rem 0.25rem', borderRadius: '0.25rem' }}>{item.subcategory}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div style={{ padding: '2.5rem 1rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)' }}>
                            <p style={{ fontSize: '2rem', margin: '0 0 0.5rem' }}>🔍</p>
                            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: 0 }}>No items found</h3>
                            <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '0.25rem 0 1rem' }}>Try searching popular campus items or post a student request!</p>
                            <div style={{ display: 'flex', gap: '0.375rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                {popularSearches.map(pop => (
                                    <button key={pop} onClick={() => setQuery(pop)}
                                        style={{ padding: '0.375rem 0.75rem', borderRadius: '9999px', border: '1px solid #BFDBFE', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                                        {pop}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            )}

            {/* TAB 2: Student Demands & ISO Board */}
            {mainTab === 'requests' && (
                <section style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>Student "Looking For" Board</h2>
                            <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: '#64748B' }}>Students actively looking to buy items on campus right now.</p>
                        </div>
                        <button
                            onClick={() => setShowRequestModal(true)}
                            style={{ padding: '0.5rem 0.875rem', borderRadius: '0.625rem', border: 'none', backgroundColor: '#D97706', color: 'white', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', boxShadow: '0 2px 8px rgba(217,119,6,0.3)' }}
                        >
                            <Plus size={14} /> Post Request
                        </button>
                    </div>

                    {loadingRequests ? (
                        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                            <Loader2 size={24} className="animate-spin" color="#D97706" />
                        </div>
                    ) : requestsList.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {requestsList.map(req => (
                                <div key={req.id} style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.875rem', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                                        <div>
                                            <span style={{ fontSize: '0.625rem', fontWeight: 700, padding: '0.125rem 0.375rem', borderRadius: '0.25rem', backgroundColor: '#FEF3C7', color: '#92400E' }}>
                                                {req.category} {req.subcategory ? `• ${req.subcategory}` : ''}
                                            </span>
                                            <h3 style={{ margin: '0.375rem 0 0.25rem', fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>
                                                {req.title}
                                            </h3>
                                        </div>
                                        {req.budget_naira && (
                                            <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#059669', whiteSpace: 'nowrap' }}>
                                                {formatNaira(req.budget_naira)}
                                            </div>
                                        )}
                                    </div>
                                    {req.description && (
                                        <p style={{ margin: '0.375rem 0 0.75rem', fontSize: '0.75rem', color: '#475569', lineHeight: 1.4 }}>
                                            {req.description}
                                        </p>
                                    )}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '0.625rem', marginTop: '0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem', color: '#64748B' }}>
                                            <MapPin size={12} color="#2563EB" /> {req.preferred_location || 'UNIZIK Perm Site'}
                                        </div>
                                        {req.user_id !== (user?.uid || user?.id) && (
                                            <button
                                                onClick={() => handleContactStudent(req.user_id)}
                                                style={{ padding: '0.375rem 0.75rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#2563EB', color: 'white', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                            >
                                                <MessageCircle size={12} /> I Have This!
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ padding: '3rem 1rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)' }}>
                            <p style={{ fontSize: '2rem', margin: 0 }}>🙋</p>
                            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: '0.5rem 0 0.25rem' }}>No open student requests yet</h3>
                            <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '0 0 1rem' }}>Are you looking for an item? Post your request and campus sellers will reach out!</p>
                            <button
                                onClick={() => setShowRequestModal(true)}
                                style={{ padding: '0.625rem 1.25rem', borderRadius: '0.625rem', border: 'none', backgroundColor: '#D97706', color: 'white', fontSize: '0.8125rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                                Post First Student Request
                            </button>
                        </div>
                    )}
                </section>
            )}

            {/* Modal: Post Student Demand / ISO Request */}
            {showRequestModal && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ width: '100%', maxWidth: '28rem', backgroundColor: 'white', borderRadius: '1rem', padding: '1.25rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Post What You Need</h3>
                            <button onClick={() => setShowRequestModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleCreateRequest}>
                            <div style={{ marginBottom: '0.75rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Item Name / Title *</label>
                                <input type="text" placeholder="e.g., Looking for a working standing fan" value={newRequestTitle} onChange={e => setNewRequestTitle(e.target.value)} required
                                    style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', boxSizing: 'border-box' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Category</label>
                                    <select value={newRequestCat} onChange={e => setNewRequestCat(e.target.value)}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontSize: '0.75rem', backgroundColor: 'white' }}>
                                        {MARKETPLACE_SEGMENTS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Max Budget (₦)</label>
                                    <input type="number" placeholder="e.g. 15000" value={newRequestBudget} onChange={e => setNewRequestBudget(e.target.value)}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontSize: '0.75rem', boxSizing: 'border-box' }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '0.75rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Preferred Meetup Location</label>
                                <select value={newRequestLocation} onChange={e => setNewRequestLocation(e.target.value)}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontSize: '0.75rem', backgroundColor: 'white' }}>
                                    {UNIZIK_LOCATIONS.map(loc => <option key={loc.id} value={loc.name}>{loc.name} ({loc.zone})</option>)}
                                </select>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Description & Specifics</label>
                                <textarea placeholder="Describe any preferred brands, specifications, or urgency..." value={newRequestDesc} onChange={e => setNewRequestDesc(e.target.value)} rows={3}
                                    style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontSize: '0.75rem', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                            </div>
                            <button type="submit" disabled={submittingRequest}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.625rem', border: 'none', backgroundColor: '#D97706', color: 'white', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}>
                                {submittingRequest ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                {submittingRequest ? 'Posting...' : 'Publish Request to Campus'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
