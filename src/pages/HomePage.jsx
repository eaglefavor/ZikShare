import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    BookOpen,
    ChevronRight,
    GraduationCap,
    Library,
    Package,
    Plus,
    Store,
    Sparkles,
    ShieldCheck,
} from 'lucide-react'
import { useCachedQuery } from '../hooks/useCachedQuery'
import { getListings } from '../lib/database'
import { FRESHER_LIBRARY_PACKS, libraryCounts, libraryCountLabel } from '../lib/fresherLibrary'
import { CHRISTIAN_BOOKS, toBookCard } from '../lib/christianBooks'
import { domainSummary } from '../lib/libraryView'
import { Button, SectionHeading, Tag } from '../components/ui'
import BookCover from '../components/BookCover'
import LibraryCard from '../components/LibraryCard'
import { HomeAnnouncementBanner } from '../components/AnnouncementModal'

const LIBRARY_COUNTS = libraryCounts()
const LIBRARY_TOTAL = LIBRARY_COUNTS.total
const LIBRARY_LABEL = libraryCountLabel(LIBRARY_COUNTS)

function formatNaira(amount) {
    const n = Number(amount) || 0
    if (n === 0) return 'Free'
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
    }).format(n)
}

function ListingCard({ listing, onOpen }) {
    const image = listing.images?.[0]
    return (
        <button type="button" className="zs-item-card" onClick={() => onOpen(listing)}>
            {image && (
                <img
                    src={image}
                    alt=""
                    loading="lazy"
                    style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: '0.5rem' }}
                />
            )}
            <p className="zs-item-card__title">{listing.title}</p>
            <p className="zs-item-card__sub">
                {listing.condition || 'Campus item'}
                {listing.location ? ` · ${listing.location}` : ''}
            </p>
            <div className="zs-item-card__foot">
                <strong style={{ fontSize: '0.95rem', color: 'var(--color-brand-dark)' }}>
                    {formatNaira(listing.price)}
                </strong>
                <span className="zs-link">
                    View <ChevronRight size={14} />
                </span>
            </div>
        </button>
    )
}

export default function HomePage() {
    const navigate = useNavigate()

    // Only real, physical marketplace listings belong here. The library is not
    // a marketplace, and the two used to be mixed into one ₦0 feed.
    const { data: listings, isLoading } = useCachedQuery(
        'home-marketplace',
        async () => {
            const rows = await getListings({ limit: 8 }).catch(() => [])
            return (rows || []).filter((row) => row.isDigital !== true).slice(0, 4)
        },
        { ttl: 5 * 60 * 1000 }
    )

    const domains = useMemo(() => domainSummary(), [])
    // Packs only: the books have their own shelf directly below, and repeating
    // them here made the newest list look like a second book section.
    const newest = useMemo(
        () => FRESHER_LIBRARY_PACKS.slice(-6).map((pack) => ({ ...pack, isBook: false })),
        []
    )

    const openLibraryItem = (item) => {
        navigate(item.isBook && item.slug ? `/library/books/${item.slug}` : `/library?q=${encodeURIComponent(item.code || item.title)}`)
    }

    return (
        <div className="zs-container">
            <HomeAnnouncementBanner />

            {/* ── Opening block ─────────────────────────────────────────── */}
            <section className="zs-page-head" aria-labelledby="home-title">
                <div className="zs-eyebrow">
                    <GraduationCap size={14} /> Nnamdi Azikiwe University
                </div>
                <h1 id="home-title">Free study material, on your phone, right now.</h1>
                <p className="zs-lead">
                    {LIBRARY_LABEL}, free to open. No fee, no sign-in, no payment step — pick a
                    title and start reading.
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                    <Button onClick={() => navigate('/library')}>
                        <Library size={16} /> Browse the library
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/search')}>
                        <Store size={16} /> Campus marketplace
                    </Button>
                </div>
            </section>

            {/* ── Three ways in ─────────────────────────────────────────── */}
            <section className="zs-grid zs-grid--wide" aria-label="Start here">
                <button type="button" className="zs-item-card" onClick={() => navigate('/library')}>
                    <div className="zs-item-card__top">
                        <Tag tone="pack">FREE</Tag>
                    </div>
                    <p className="zs-item-card__title">Study library</p>
                    <p className="zs-item-card__desc">
                        {LIBRARY_LABEL}. Every document downloads as a PDF from this site,
                        including the Greek and Roman plays.
                    </p>
                    <div className="zs-item-card__foot">
                        <span className="zs-item-card__sub">Open instantly</span>
                        <span className="zs-link">
                            Open <ChevronRight size={14} />
                        </span>
                    </div>
                </button>

                <button type="button" className="zs-item-card" onClick={() => navigate('/search')}>
                    <div className="zs-item-card__top">
                        <Tag tone="muted">CAMPUS</Tag>
                    </div>
                    <p className="zs-item-card__title">Marketplace</p>
                    <p className="zs-item-card__desc">
                        Phones, laptops, hostel essentials and services from other students.
                    </p>
                    <div className="zs-item-card__foot">
                        <span className="zs-item-card__sub">Buy and sell</span>
                        <span className="zs-link">
                            Browse <ChevronRight size={14} />
                        </span>
                    </div>
                </button>

                <button type="button" className="zs-item-card" onClick={() => navigate('/post')}>
                    <div className="zs-item-card__top">
                        <Tag tone="muted">SELL</Tag>
                    </div>
                    <p className="zs-item-card__title">Post an item</p>
                    <p className="zs-item-card__desc">
                        List something you no longer need, or share notes with your department.
                    </p>
                    <div className="zs-item-card__foot">
                        <span className="zs-item-card__sub">Takes a minute</span>
                        <span className="zs-link">
                            Post <Plus size={14} />
                        </span>
                    </div>
                </button>
            </section>

            {/* ── Shelves ───────────────────────────────────────────────── */}
            <section className="zs-section" aria-labelledby="shelves-title">
                <SectionHeading
                    id="shelves-title"
                    title="Browse by shelf"
                    description="Every document is free and mapped to a faculty or a study subject."
                    action={
                        <button type="button" className="zs-link" onClick={() => navigate('/library')}>
                            All {LIBRARY_TOTAL} <ChevronRight size={14} />
                        </button>
                    }
                />
                <div className="zs-chip-row">
                    {domains.map((domain) => (
                        <button
                            key={domain.name}
                            type="button"
                            className="zs-chip"
                            onClick={() => navigate(`/library?domain=${encodeURIComponent(domain.name)}`)}
                        >
                            <span aria-hidden="true">{domain.emoji}</span>
                            {domain.name}
                            <span className="zs-chip__count">{domain.count}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* ── Newest in the library ─────────────────────────────────── */}
            {/* Only when there are packs to show: with an empty pack shelf this
                block would repeat the book shelf that follows it. */}
            {newest.length > 0 && (
            <section className="zs-section" aria-labelledby="new-title">
                <SectionHeading
                    id="new-title"
                    title="Newest in the library"
                    description="Course packs for this semester and books you can read in the browser."
                    action={
                        <button type="button" className="zs-link" onClick={() => navigate('/library')}>
                            See all <ChevronRight size={14} />
                        </button>
                    }
                />
                <div className="zs-grid">
                    {newest.map((item) => (
                        <LibraryCard key={item.id || item.slug} item={item} onOpen={openLibraryItem} />
                    ))}
                </div>
            </section>
            )}

            {/* ── Book spotlight ────────────────────────────────────────── */}
            <section className="zs-section" aria-labelledby="books-title">
                <SectionHeading
                    id="books-title"
                    title="Christian Books shelf"
                    description={`${CHRISTIAN_BOOKS.length} full-length books, read in the browser or downloaded as PDF.`}
                    action={
                        <button
                            type="button"
                            className="zs-link"
                            onClick={() => navigate('/library?domain=Christian%20Books')}
                        >
                            The shelf <ChevronRight size={14} />
                        </button>
                    }
                />
                <div className="zs-grid zs-grid--wide">
                    {CHRISTIAN_BOOKS.slice(0, 4).map((book) => (
                        <button
                            key={book.slug}
                            type="button"
                            className="zs-item-card"
                            onClick={() => navigate(`/library/books/${book.slug}`)}
                            style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: '0.75rem', alignItems: 'start' }}
                        >
                            <BookCover
                                src={toBookCard(book).cover_path}
                                title={book.title}
                                author={book.author}
                                style={{ borderRadius: '0.375rem' }}
                            />
                            <div style={{ minWidth: 0 }}>
                                <p className="zs-item-card__title">{book.title}</p>
                                <p className="zs-item-card__sub">{book.author}</p>
                                <div style={{ marginTop: '0.4rem', display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                                    <Tag tone="free">Free</Tag>
                                    <span className="zs-item-card__sub">{book.page_count} pages</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* ── Marketplace ───────────────────────────────────────────── */}
            <section className="zs-section" aria-labelledby="market-title">
                <SectionHeading
                    id="market-title"
                    title="On the marketplace"
                    description="Physical items listed by students on campus."
                    action={
                        <Button size="sm" variant="outline" onClick={() => navigate('/search')}>
                            Browse all
                        </Button>
                    }
                />

                {isLoading ? (
                    <div className="zs-grid">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="skeleton" style={{ height: '9rem', borderRadius: '0.75rem' }} />
                        ))}
                    </div>
                ) : listings?.length > 0 ? (
                    <div className="zs-grid">
                        {listings.map((listing) => (
                            <ListingCard
                                key={listing.id}
                                listing={listing}
                                onOpen={(item) => navigate(`/item/${item.id}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="zs-empty">
                        <Package size={28} color="#94A3B8" aria-hidden="true" />
                        <strong>No items listed yet</strong>
                        <p>
                            The marketplace is new. Post the first thing you want to sell — a phone, a
                            fan, a textbook — and other students will find it here.
                        </p>
                        <Button size="sm" onClick={() => navigate('/post')}>
                            <Plus size={15} /> Post an item
                        </Button>
                    </div>
                )}
            </section>

            {/* ── Promise ───────────────────────────────────────────────── */}
            <section className="zs-section">
                <div className="zs-panel" style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <ShieldCheck size={20} color="var(--color-campus-green)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', flex: '1 1 18rem' }}>
                        <strong style={{ color: 'var(--color-brand-dark)' }}>Everything in the library is free.</strong>{' '}
                        There is no fee, no account and no payment step before a download. Books are
                        third-party works hosted for free reading; nothing here replaces your course
                        outline, so confirm what you are examined on with your department.
                    </p>
                    <button type="button" className="zs-link" onClick={() => navigate('/library')}>
                        <BookOpen size={15} /> Open the library
                    </button>
                </div>
            </section>

            <p style={{ marginTop: '1.5rem', fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                <Sparkles size={12} aria-hidden="true" /> Built for UNIZIK students.
            </p>
        </div>
    )
}
