import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
    BookOpen,
    ChevronRight,
    MapPin,
    MessageCircle,
    Package,
    Plus,
    X,
} from 'lucide-react'
import { getListings, getStudentRequests, createStudentRequest } from '../lib/database'
import { useAuth } from '../contexts/AuthContext'
import { mergeLibraryMaterials } from '../lib/fresherLibrary'
import { filterLibrary } from '../lib/libraryView'
import { getOrCreateConversation } from '../lib/messaging'
import { Button, EmptyState, PageHeader, SearchField, SectionHeading, Tag } from '../components/ui'
import LibraryCard from '../components/LibraryCard'

function formatNaira(amount) {
    const n = Number(amount) || 0
    if (n === 0) return 'Free'
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(n)
}

function ListingCard({ listing, onOpen }) {
    const image = listing.images?.[0]
    return (
        <article className="zs-item-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div
                onClick={() => onOpen(listing)}
                style={{ cursor: 'pointer', aspectRatio: '4 / 3', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                {image ? (
                    <img src={image} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <Package size={26} color="#94A3B8" aria-hidden="true" />
                )}
            </div>
            <div style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
                <button
                    type="button"
                    onClick={() => onOpen(listing)}
                    style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', font: 'inherit' }}
                >
                    <span className="zs-item-card__title" style={{ display: 'block' }}>{listing.title}</span>
                </button>
                <p className="zs-item-card__sub">
                    {listing.condition || 'Campus item'}
                    {listing.location ? ` · ${listing.location}` : ''}
                </p>
                <div className="zs-item-card__foot">
                    <strong style={{ fontSize: '0.95rem', color: 'var(--color-brand-dark)' }}>{formatNaira(listing.price)}</strong>
                    <span className="zs-link">
                        View <ChevronRight size={14} />
                    </span>
                </div>
            </div>
        </article>
    )
}

export default function SearchPage() {
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()

    const [query, setQuery] = useState(searchParams.get('q') || '')
    const [listings, setListings] = useState([])
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [showRequestModal, setShowRequestModal] = useState(false)
    const [requestForm, setRequestForm] = useState({ title: '', description: '', budget: '', category: 'Tech' })
    const [submitting, setSubmitting] = useState(false)

    // The library is local data, so it can be searched on every keystroke.
    const libraryResults = useMemo(
        () => filterLibrary(mergeLibraryMaterials([]), { query }),
        [query]
    )

    // Keep ?q= shareable.
    useEffect(() => {
        const next = new URLSearchParams(searchParams)
        if (query.trim()) next.set('q', query.trim())
        else next.delete('q')
        if (next.toString() !== searchParams.toString()) {
            setSearchParams(next, { replace: true })
        }
    }, [query, searchParams, setSearchParams])

    // Marketplace and student demands come from the database, so they are
    // fetched once and searched in memory.
    useEffect(() => {
        let mounted = true
        setLoading(true)
        Promise.all([
            getListings({ limit: 60 }).catch(() => []),
            getStudentRequests().catch(() => []),
        ])
            .then(([rows, wants]) => {
                if (!mounted) return
                setListings((rows || []).filter((row) => row.isDigital !== true))
                setRequests(wants || [])
            })
            .finally(() => {
                if (mounted) setLoading(false)
            })
        return () => {
            mounted = false
        }
    }, [])

    const term = query.trim().toLowerCase()
    const matches = (text) => !term || String(text || '').toLowerCase().includes(term)

    const marketResults = useMemo(
        () => listings.filter((row) => matches(row.title) || matches(row.category) || matches(row.description)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [listings, term]
    )

    const requestResults = useMemo(
        () => requests.filter((row) => matches(row.title) || matches(row.description) || matches(row.category)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [requests, term]
    )

    const openItem = (item) => {
        if (item.isBook) {
            navigate(`/library/books/${item.slug}`)
            return
        }
        window.open(item.download_path, '_blank', 'noopener,noreferrer')
    }

    const contactStudent = async (studentId) => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        try {
            const userId = user?.uid || user?.id
            const conversation = await getOrCreateConversation(userId, studentId)
            if (conversation?.id) navigate(`/chat/${conversation.id}`)
        } catch (err) {
            console.warn('Could not start a conversation:', err)
        }
    }

    const submitRequest = async (event) => {
        event.preventDefault()
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        if (!requestForm.title.trim()) return

        setSubmitting(true)
        try {
            await createStudentRequest({
                userId: user?.uid || user?.id,
                title: requestForm.title,
                description: requestForm.description,
                category: requestForm.category,
                budgetNaira: requestForm.budget,
                preferredLocation: 'UNIZIK Perm Site',
            })
            setShowRequestModal(false)
            setRequestForm({ title: '', description: '', budget: '', category: 'Tech' })
            const fresh = await getStudentRequests().catch(() => [])
            setRequests(fresh || [])
        } catch (err) {
            console.warn('Could not post the request:', err)
        } finally {
            setSubmitting(false)
        }
    }

    const total = libraryResults.length + marketResults.length + requestResults.length
    const searching = Boolean(term)

    return (
        <div className="zs-container">
            <PageHeader
                eyebrow="Search everything"
                title="Find material, items and requests"
                lead="One field across the free study library, the campus marketplace and what students are looking for."
            />

            <div className="zs-toolbar" style={{ position: 'static' }}>
                <SearchField
                    value={query}
                    onChange={setQuery}
                    placeholder="Search a course code, book, phone, fan…"
                    autoFocus={false}
                />
                <Button variant="outline" onClick={() => setShowRequestModal(true)}>
                    <Plus size={15} /> Post a request
                </Button>
            </div>

            {searching && (
                <p style={{ margin: '0.75rem 0 0', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                    {total} {total === 1 ? 'result' : 'results'} for <strong>“{query.trim()}”</strong>
                </p>
            )}

            {/* ── Library ───────────────────────────────────────────────── */}
            <section className="zs-section" aria-labelledby="search-library">
                <SectionHeading
                    id="search-library"
                    title={`Free study library (${libraryResults.length})`}
                    description="Course packs and books — open or download, no sign-in."
                    action={
                        <button type="button" className="zs-link" onClick={() => navigate('/library')}>
                            Browse all <ChevronRight size={14} />
                        </button>
                    }
                />
                {libraryResults.length > 0 ? (
                    <div className="zs-grid">
                        {libraryResults.slice(0, searching ? 12 : 3).map((item) => (
                            <LibraryCard key={item.id} item={item} onOpen={openItem} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={BookOpen}
                        title="Nothing in the library matches"
                        action={
                            <Button size="sm" variant="outline" onClick={() => setQuery('')}>
                                Clear search
                            </Button>
                        }
                    >
                        Try a course code such as <strong>GST 112</strong> or an author such as{' '}
                        <strong>Watchman Nee</strong>.
                    </EmptyState>
                )}
            </section>

            {/* ── Marketplace ───────────────────────────────────────────── */}
            <section className="zs-section" aria-labelledby="search-market">
                <SectionHeading
                    id="search-market"
                    title={`Marketplace (${marketResults.length})`}
                    description="Phones, laptops, hostel essentials and services from other students."
                    action={
                        <Button size="sm" variant="outline" onClick={() => navigate('/post')}>
                            <Plus size={14} /> Sell something
                        </Button>
                    }
                />
                {loading ? (
                    <div className="zs-grid">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="skeleton" style={{ height: '10rem', borderRadius: '0.75rem' }} />
                        ))}
                    </div>
                ) : marketResults.length > 0 ? (
                    <div className="zs-grid">
                        {marketResults.slice(0, 12).map((listing) => (
                            <ListingCard key={listing.id} listing={listing} onOpen={(item) => navigate(`/item/${item.id}`)} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={Package}
                        title={
                            listings.length === 0
                                ? 'The marketplace is empty'
                                : 'No items match that search'
                        }
                        action={
                            <Button size="sm" onClick={() => navigate('/post')}>
                                <Plus size={14} /> {listings.length === 0 ? 'Post the first item' : 'Sell something'}
                            </Button>
                        }
                    >
                        {listings.length === 0
                            ? 'Listings appear here as students post them. Nothing is listed yet.'
                            : `There are ${listings.length} item${listings.length === 1 ? '' : 's'} on the marketplace, but none match “${query.trim()}”. Try a shorter word.`}
                    </EmptyState>
                )}
            </section>

            {/* ── Student requests ──────────────────────────────────────── */}
            <section className="zs-section" aria-labelledby="search-requests">
                <SectionHeading
                    id="search-requests"
                    title={`Looking for (${requestResults.length})`}
                    description="Students who are trying to buy something specific."
                />
                {requestResults.length > 0 ? (
                    <div className="zs-grid zs-grid--wide">
                        {requestResults.slice(0, 9).map((request) => (
                            <article key={request.id} className="zs-card" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <div className="zs-item-card__top">
                                    <Tag tone="muted">{request.category || 'WANTED'}</Tag>
                                    {request.budget_naira ? (
                                        <span className="zs-item-card__sub" style={{ marginLeft: 'auto' }}>
                                            up to {formatNaira(request.budget_naira)}
                                        </span>
                                    ) : null}
                                </div>
                                <p className="zs-item-card__title">{request.title}</p>
                                {request.description && <p className="zs-item-card__desc">{request.description}</p>}
                                <div className="zs-item-card__foot">
                                    <span className="zs-item-card__sub" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <MapPin size={12} /> {request.preferred_location || 'UNIZIK'}
                                    </span>
                                    {request.user_id !== (user?.uid || user?.id) && (
                                        <button
                                            type="button"
                                            className="zs-btn zs-btn--soft zs-btn--sm"
                                            onClick={() => contactStudent(request.user_id)}
                                        >
                                            <MessageCircle size={13} /> I have this
                                        </button>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={MessageCircle}
                        title={
                            requests.length === 0
                                ? 'Nobody has posted a request here'
                                : 'No requests match that search'
                        }
                        action={
                            <Button size="sm" variant="outline" onClick={() => setShowRequestModal(true)}>
                                Post what you need
                            </Button>
                        }
                    >
                        If you are hunting for a specific book, fan or laptop, say so here and let
                        other students answer.
                    </EmptyState>
                )}
            </section>

            {/* ── Post-a-request sheet ──────────────────────────────────── */}
            {showRequestModal && (
                <div
                    className="zs-sheet-backdrop"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Post a request"
                    onClick={() => setShowRequestModal(false)}
                >
                    <form className="zs-sheet" onSubmit={submitRequest} onClick={(e) => e.stopPropagation()}>
                        <div className="zs-sheet__head">
                            <strong style={{ fontSize: '0.95rem' }}>Post what you are looking for</strong>
                            <button type="button" className="zs-icon-btn" onClick={() => setShowRequestModal(false)} aria-label="Close">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="zs-sheet__body">
                            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 700 }}>
                                What do you need?
                                <input
                                    value={requestForm.title}
                                    onChange={(e) => setRequestForm((f) => ({ ...f, title: e.target.value }))}
                                    placeholder="e.g. Standing fan for my hostel room"
                                    required
                                    style={{ padding: '0.6rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontFamily: 'inherit', fontSize: '0.85rem', width: '100%' }}
                                />
                            </label>
                            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 700 }}>
                                Details (optional)
                                <textarea
                                    value={requestForm.description}
                                    onChange={(e) => setRequestForm((f) => ({ ...f, description: e.target.value }))}
                                    rows={3}
                                    placeholder="Condition, size, how soon you need it…"
                                    style={{ padding: '0.6rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontFamily: 'inherit', fontSize: '0.85rem' }}
                                />
                            </label>
                            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 700 }}>
                                Category
                                <select
                                    value={requestForm.category}
                                    onChange={(e) => setRequestForm((f) => ({ ...f, category: e.target.value }))}
                                    style={{ padding: '0.6rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontFamily: 'inherit', fontSize: '0.85rem', background: '#FFFFFF' }}
                                >
                                    {['Tech', 'Hostel', 'Books', 'Services', 'Other'].map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </label>

                            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 700 }}>
                                Budget (optional)
                                <input
                                    type="number"
                                    min="0"
                                    value={requestForm.budget}
                                    onChange={(e) => setRequestForm((f) => ({ ...f, budget: e.target.value }))}
                                    placeholder="e.g. 15000"
                                    style={{ padding: '0.6rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontFamily: 'inherit', fontSize: '0.85rem' }}
                                />
                            </label>
                        </div>
                        <div className="zs-sheet__foot">
                            <Button type="button" variant="outline" block onClick={() => setShowRequestModal(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" block disabled={submitting || !requestForm.title.trim()}>
                                {submitting ? 'Posting…' : 'Post request'}
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
