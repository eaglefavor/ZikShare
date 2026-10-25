import { ChevronRight, GraduationCap, Library, Plus, ShieldCheck, Store } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCachedQuery } from '../hooks/useCachedQuery'
import { getListings } from '../lib/database'
import { FRESHER_LIBRARY_DOMAINS, libraryCounts, libraryCountLabel } from '../lib/fresherLibrary'
import { shelfInfo } from '../lib/shelfGuide'
import { Button, SectionHeading } from '../components/ui'
import { HomeAnnouncementBanner } from '../components/AnnouncementModal'
import usePageMeta from '../hooks/usePageMeta'

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

/**
 * The home page has one job: get a student into the library in one tap.
 *
 * It opens with the promise and a single button, then shows the nine shelves
 * themselves — the same index the library page uses, so the two screens never
 * disagree. Nothing else competes for the first screen.
 */
export default function HomePage() {
    const navigate = useNavigate()

    usePageMeta({
        title: 'Free study material for UNIZIK students',
        description: `${LIBRARY_LABEL} — every document free to open, no sign-in and no payment step.`,
        path: '/',
    })

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

    return (
        <div className="zs-container">
            <HomeAnnouncementBanner />

            {/* ── Opening block: the promise, then one way in ───────────── */}
            <section className="zs-page-head" aria-labelledby="home-title">
                <div className="zs-eyebrow">
                    <GraduationCap size={14} /> Nnamdi Azikiwe University
                </div>
                <h1 id="home-title">Free study material, on your phone, right now.</h1>
                <p className="zs-lead">
                    {LIBRARY_LABEL}, free to open. No fee, no sign-in, no payment step — pick a
                    shelf below or search the whole library.
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                    <Button onClick={() => navigate('/library')}>
                        <Library size={16} /> Browse the library
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/search')}>
                        <Store size={16} /> Search everything
                    </Button>
                </div>
            </section>

            {/* ── The nine shelves, each one tap away ───────────────────── */}
            <section className="zs-section" aria-labelledby="home-shelves">
                <SectionHeading
                    id="home-shelves"
                    title="Browse by shelf"
                    action={
                        <button type="button" className="zs-link" onClick={() => navigate('/library')}>
                            All {LIBRARY_TOTAL} <ChevronRight size={14} />
                        </button>
                    }
                />

                <div className="zs-shelf-grid">
                    {LIBRARY_SHELVES.map((shelf) => (
                        <button
                            key={shelf.name}
                            type="button"
                            className="zs-shelf-card"
                            onClick={() => navigate(`/library?domain=${encodeURIComponent(shelf.name)}`)}
                        >
                            <span className="zs-shelf-card__emoji" aria-hidden="true">
                                {shelf.emoji}
                            </span>
                            <span className="zs-shelf-card__body">
                                <strong>{shelf.name}</strong>
                                <span className="zs-shelf-card__count">
                                    {shelf.count} {shelf.count === 1 ? shelf.unit : shelf.unitPlural}
                                </span>
                                <span className="zs-shelf-card__blurb">{shelf.blurb}</span>
                            </span>
                            <ChevronRight size={18} aria-hidden="true" />
                        </button>
                    ))}
                </div>
            </section>

            {/* ── Marketplace: a strip, not a second home page ──────────── */}
            <section className="zs-section" aria-labelledby="market-title">
                <SectionHeading
                    id="market-title"
                    title="On the marketplace"
                    action={
                        <button type="button" className="zs-link" onClick={() => navigate('/search')}>
                            Browse all <ChevronRight size={14} />
                        </button>
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
                        <strong>Nothing listed yet</strong>
                        <p>The marketplace is new. Post the first thing you want to sell.</p>
                        <Button size="sm" onClick={() => navigate('/post')}>
                            <Plus size={15} /> Post an item
                        </Button>
                    </div>
                )}
            </section>

            <p className="zs-home-note">
                <ShieldCheck size={13} aria-hidden="true" />
                Everything in the library is free — no fee, no account, no payment step before a
                download. Books are third-party works hosted for free reading; nothing here replaces
                your course outline.
            </p>
        </div>
    )
}

/** The shelves, in the library's order, with their real counts. */
const LIBRARY_SHELVES = FRESHER_LIBRARY_DOMAINS.map((shelf) => {
    const info = shelfInfo(shelf.name)
    return {
        name: shelf.name,
        emoji: shelf.emoji,
        count: shelf.count,
        blurb: info.blurb,
        unit: info.unit,
        unitPlural: info.unitPlural,
    }
})
