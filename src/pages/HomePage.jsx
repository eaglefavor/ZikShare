import { useState } from 'react'
import { BookOpen, ChevronRight, GraduationCap, Library, Play, Plus, ShieldCheck, Sparkles, Store } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCachedQuery } from '../hooks/useCachedQuery'
import { getListings } from '../lib/database'
import { SHELF_EMOJI, SHELF_META, SHELF_ORDER } from '../lib/shelves'
import { listProgress, progressPercent } from '../lib/readingProgress'
import { documentLink, shelfPath } from '../lib/libraryRoutes'
import useLibraryDigest from '../hooks/useLibraryDigest'
import { Button, SectionHeading } from '../components/ui'
import { HomeAnnouncementBanner } from '../components/AnnouncementModal'
import FirstListingGuide from '../components/FirstListingGuide'
import ConnectionNotice from '../components/ConnectionNotice'
import usePageMeta from '../hooks/usePageMeta'
import { photoAtWidth } from '../lib/cloudinary'

// What the page can say without the catalogue: the shelves themselves. The
// counts arrive in their own chunk (see useLibraryDigest) and are never typed
// here, so this file cannot drift from what the library actually holds.
const SHELVES = SHELF_ORDER.map((name) => ({ name, emoji: SHELF_EMOJI[name], ...SHELF_META[name] }))

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
                    // Drawn about 180 px wide on a phone: ask for 360 px, not the
                    // full upload, so a grid of listings is kilobytes not megabytes.
                    src={photoAtWidth(image, 360)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={360}
                    height={270}
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

    const [inProgress] = useState(() => listProgress({ limit: 4, excludeFinished: true }))
    // Counts and the shelf of the week come from the catalogue in its own
    // chunk; until it lands the page says what it knows and nothing more.
    const digest = useLibraryDigest()
    const weekly = digest?.weekly || null

    usePageMeta({
        title: 'Free study material for UNIZIK students',
        description: digest
            ? `${digest.label} — every document free to open, no sign-in and no payment step.`
            : 'Every document in the library is free to open — no sign-in and no payment step.',
        path: '/',
    })

    // Only real, physical marketplace listings belong here. The library is not
    // a marketplace, and the two used to be mixed into one ₦0 feed.
    const {
        data: listings,
        isLoading,
        error: listingsError,
        refetch: retryListings,
    } = useCachedQuery(
        'home-marketplace',
        async () => {
            // No silent `catch(() => [])`: an empty array has to mean the
            // marketplace answered, so that "nothing listed" is never shown
            // because a request timed out.
            const rows = await getListings({ limit: 8 })
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
                    {digest ? `${digest.label}, free to open.` : 'Every document free to open.'} No fee,
                    no sign-in, no payment step — pick a shelf below or search the whole library.
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

            {/* ── This week on the shelf ────────────────────────────────── */}
            {weekly && (
                <section className="zs-section" aria-labelledby="weekly-title">
                    <div className="zs-weekly">
                        <div className="zs-weekly__head">
                            <span className="zs-eyebrow">
                                <Sparkles size={13} aria-hidden="true" /> {weekly.label} on the shelf
                            </span>
                            <strong className="zs-weekly__shelf">
                                {weekly.emoji} {weekly.shelf}
                            </strong>
                        </div>

                        <div className="zs-weekly__body">
                            <div>
                                <h2 id="weekly-title" className="zs-weekly__title">
                                    {weekly.item.title}
                                </h2>
                                <p className="zs-weekly__byline">
                                    {[weekly.item.author, weekly.item.page_count ? `${weekly.item.page_count} pages` : null]
                                        .filter(Boolean)
                                        .join(' · ')}
                                </p>
                                <p className="zs-weekly__desc">{weekly.item.description}</p>
                            </div>

                            <div className="zs-weekly__actions">
                                <Button size="sm" onClick={() => navigate(`${documentLink(weekly.item)}/read`)}>
                                    <BookOpen size={15} /> Read it
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => navigate(shelfPath(weekly.shelf))}>
                                    The whole shelf <ChevronRight size={14} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Continue reading: only when it is this reader's own ───── */}
            {inProgress.length > 0 && (
                <section className="zs-section" aria-labelledby="continue-title">
                    <SectionHeading id="continue-title" title="Continue reading" />
                    <div className="zs-continue-row">
                        {inProgress.map((entry) => {
                            const percent = progressPercent(entry)
                            return (
                                <button
                                    key={entry.slug}
                                    type="button"
                                    className="zs-continue"
                                    onClick={() => navigate(`/library/doc/${entry.slug}/read`)}
                                >
                                    <span className="zs-continue__icon" aria-hidden="true">
                                        <Play size={15} />
                                    </span>
                                    <span className="zs-continue__body">
                                        <strong>{entry.title || entry.slug}</strong>
                                        <span>
                                            Page {entry.page}
                                            {entry.total ? ` of ${entry.total}` : ''}
                                            {percent ? ` · ${percent}%` : ''}
                                        </span>
                                        {percent && (
                                            <span className="zs-continue__bar" aria-hidden="true">
                                                <span style={{ width: `${percent}%` }} />
                                            </span>
                                        )}
                                    </span>
                                    <ChevronRight size={16} aria-hidden="true" />
                                </button>
                            )
                        })}
                    </div>
                </section>
            )}

            {/* ── The nine shelves, each one tap away ───────────────────── */}
            <section className="zs-section" aria-labelledby="home-shelves">
                <SectionHeading
                    id="home-shelves"
                    title="Browse by shelf"
                    action={
                        <button type="button" className="zs-link" onClick={() => navigate('/library')}>
                            {digest ? `All ${digest.total}` : 'All titles'} <ChevronRight size={14} />
                        </button>
                    }
                />

                <div className="zs-shelf-grid">
                    {SHELVES.map((shelf) => {
                        const count = digest?.shelves.find((entry) => entry.name === shelf.name)?.count
                        return (
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
                                        {count == null
                                            ? '\u00a0'
                                            : `${count} ${count === 1 ? shelf.unit : shelf.unitPlural}`}
                                    </span>
                                    <span className="zs-shelf-card__blurb">{shelf.blurb}</span>
                                </span>
                                <ChevronRight size={18} aria-hidden="true" />
                            </button>
                        )
                    })}
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

                {isLoading && !listings ? (
                    <div className="zs-grid">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="skeleton" style={{ height: '9rem', borderRadius: '0.75rem' }} />
                        ))}
                    </div>
                ) : listingsError && !listings?.length ? (
                    <ConnectionNotice
                        what="the marketplace"
                        onRetry={retryListings}
                        retrying={isLoading}
                    />
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
                    <FirstListingGuide title="Nothing listed yet" />
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

