import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Filter, Search, ShieldCheck, WifiOff, X } from 'lucide-react'
import { getDigitalProducts } from '../lib/database'
import { UNIZIK_FACULTIES, ACADEMIC_LEVELS, ACADEMIC_MATERIAL_TYPES } from '../lib/categories'
import {
    FRESHER_LIBRARY_DOMAINS,
    libraryCountLabel,
    libraryCounts,
    mergeLibraryMaterials,
} from '../lib/fresherLibrary'
import { shelfGaps, shelfInfo } from '../lib/shelfGuide'
import { documentLink, shelfFromSlug, shelfPath } from '../lib/libraryRoutes'
import { suggestCorrections } from '../lib/librarySearch'
import {
    EMPTY_FILTERS,
    SORT_OPTIONS,
    activeFilterCount,
    filterLibrary,
    sortLibrary,
} from '../lib/libraryView'
import { Button, Chip, EmptyState, PageHeader, SearchField, SectionHeading } from '../components/ui'
import LibraryCard from '../components/LibraryCard'
import ThemeToggle from '../components/ThemeToggle'
import usePageMeta from '../hooks/usePageMeta'

const COUNTS = libraryCounts()
const TOTAL = COUNTS.total
const COUNT_LABEL = libraryCountLabel(COUNTS)

/**
 * Play shelves with dozens of titles are listed by playwright, movement or
 * topic instead of as one undifferentiated wall of cards.
 */
function groupItems(items) {
    const groups = []
    for (const item of items) {
        const name = item.group || item.author || 'Other'
        let group = groups.find((entry) => entry.name === name)
        if (!group) {
            group = { name, items: [] }
            groups.push(group)
        }
        group.items.push(item)
    }
    return groups
}

function FilterGroup({ label, children }) {
    return (
        <div>
            <div className="zs-filter-group__label">{label}</div>
            <div className="zs-filter-group__chips">{children}</div>
        </div>
    )
}

/** The one line above a shelf's cards: "31 plays · free PDFs". */
function shelfLine(name, count) {
    const info = shelfInfo(name)
    return `${count} ${count === 1 ? info.unit : info.unitPlural} · free PDFs`
}

function GapPanel({ name }) {
    const gaps = shelfGaps(name)
    if (!gaps) return null
    return (
        <details className="zs-details">
            <summary>
                {gaps.title} <span className="zs-details__hint">({gaps.items.length})</span>
            </summary>
            <p className="zs-details__lead">{gaps.description}</p>
            <ul className="zs-details__list">
                {gaps.items.map((item) => (
                    <li key={item.label}>
                        <strong>{item.label}</strong>
                        {item.hint && (
                            <>
                                {' ('}
                                <span className="zs-details__hint">{item.hint}</span>
                                {')'}
                            </>
                        )}
                        . <span className="zs-details__note">{item.note}</span>
                    </li>
                ))}
            </ul>
        </details>
    )
}

/**
 * All four gap notes behind one control on the index, so a reader sees five
 * shelf cards and two footers instead of nine competing blocks.
 */
function GapLibrary() {
    const shelves = ['Greek Tragedy', 'Medieval Theatre', 'Renaissance Theatre', 'Modern Theatre']
    const total = shelves.reduce((sum, name) => sum + (shelfGaps(name)?.items.length || 0), 0)
    return (
        <details className="zs-details">
            <summary>
                Titles that are not on these shelves
                <span className="zs-details__hint"> ({total})</span>
            </summary>
            {shelves.map((name) => {
                const gaps = shelfGaps(name)
                if (!gaps) return null
                return (
                    <div key={name} className="zs-details__block">
                        <h3 className="zs-details__title">{name}</h3>
                        <p className="zs-details__lead">{gaps.description}</p>
                        <ul className="zs-details__list">
                            {gaps.items.map((item) => (
                                <li key={item.label}>
                                    <strong>{item.label}</strong>
                                    {item.hint && (
                                        <>
                                            {' ('}
                                            <span className="zs-details__hint">{item.hint}</span>
                                            {')'}
                                        </>
                                    )}
                                    . <span className="zs-details__note">{item.note}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            })}
        </details>
    )
}

function Licence({ compact = false }) {
    return (
        <details className="zs-details">
            <summary>Where these documents come from</summary>
            <p className="zs-details__lead">
                <strong>NOUN course manuals</strong> are published by the National Open University of
                Nigeria and hosted here free of charge; NOUN permits educational use and prohibits
                commercial use. <strong>Books</strong> are third-party works: copyright stays with the
                author and publisher. <strong>Plays and Theatre Arts titles</strong> are public-domain
                English texts, typeset as PDFs and hosted here too; the edition and translator of each
                one is credited on the card and printed inside the file.
                {compact ? '' : ' Always confirm your current outline with your department.'}
            </p>
        </details>
    )
}

export default function LibraryPage() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    // A shelf has two addresses: /library/shelf/greek-tragedy for a link that
    // can be shared or indexed, and ?domain=Greek Tragedy for the links that
    // were already handed out. Both land on the same shelf.
    const { name: shelfParam } = useParams()
    const routeShelf = shelfFromSlug(shelfParam)

    const [filters, setFilters] = useState(() => ({
        ...EMPTY_FILTERS,
        query: searchParams.get('q') || '',
        domain: routeShelf || searchParams.get('domain') || 'All',
    }))
    const [sortBy, setSortBy] = useState('relevance')
    const [dbMaterials, setDbMaterials] = useState([])
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        let mounted = true
        getDigitalProducts({ category: 'Academic & Study Materials', limit: 150 })
            .then((items) => {
                if (mounted) setDbMaterials(items || [])
            })
            .catch((err) => {
                console.warn('Could not load library rows from the database:', err)
            })
        return () => {
            mounted = false
        }
    }, [])

    // The address wins: /library/shelf/greek-tragedy always shows that shelf,
    // and the filter sheet can still switch shelves on /library itself.
    const domain = routeShelf || filters.domain

    // Keep the URL in step with the two filters that can arrive by link.
    useEffect(() => {
        const next = new URLSearchParams(searchParams)
        // On a shelf's own address the shelf is already in the path; adding it
        // to the query as well would make a shared link ugly for no reason.
        if (routeShelf) next.delete('domain')
        else if (domain !== 'All') next.set('domain', domain)
        else next.delete('domain')
        if (filters.query) next.set('q', filters.query)
        else next.delete('q')
        if (next.toString() !== searchParams.toString()) {
            setSearchParams(next, { replace: true })
        }
    }, [domain, routeShelf, filters.query, searchParams, setSearchParams])

    const allMaterials = useMemo(() => mergeLibraryMaterials(dbMaterials), [dbMaterials])
    const effectiveFilters = useMemo(() => ({ ...filters, domain }), [filters, domain])
    const results = useMemo(
        () => sortLibrary(filterLibrary(allMaterials, effectiveFilters), sortBy),
        [allMaterials, effectiveFilters, sortBy]
    )

    const availableDepartments = useMemo(() => {
        if (filters.faculty === 'All') return []
        return UNIZIK_FACULTIES.find((f) => f.name === filters.faculty)?.departments || []
    }, [filters.faculty])

    const onShelf = domain !== 'All'
    // Every filter except the shelf itself: a shelf page is not "searching".
    const extraFilters = activeFilterCount({ ...filters, domain: 'All' })
    const isSearching = Boolean(filters.query) || extraFilters > 0
    const info = shelfInfo(domain)
    // When a search finds nothing, say what it might have meant instead of
    // showing a blank page. Only computed for an empty result set.
    const suggestions = useMemo(
        () =>
            results.length === 0 && filters.query
                ? suggestCorrections(allMaterials, filters.query, 3)
                : [],
        [results.length, allMaterials, filters.query]
    )

    const shelfCount = useMemo(
        () => allMaterials.filter((item) => item.domain === domain).length,
        [allMaterials, domain]
    )

    const set = (patch) => setFilters((current) => ({ ...current, ...patch }))
    const setFaculty = (name) => set({ faculty: name, department: 'All' })
    const clearAll = () => setFilters({ ...EMPTY_FILTERS })
    // Clearing filters on a shelf keeps the reader on that shelf; the back
    // button beside the title is the way out of it.
    const clearFilters = () => setFilters({ ...EMPTY_FILTERS, domain })
    const leaveShelf = () => {
        if (routeShelf) navigate('/library')
        clearAll()
    }
    const openShelf = (name) => {
        setFilters({ ...EMPTY_FILTERS, domain: name })
        // On a shelf's own address, moving to another shelf is a navigation, so
        // the back button returns to the shelf the reader came from.
        if (routeShelf) navigate(shelfPath(name))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // The title of a card opens the document's own page, where its edition,
    // page count and rights note are stated before the file downloads. Books
    // keep their richer page; everything else now has one too.
    const openItem = (item) => {
        if (item.isBook) {
            navigate(`/library/books/${item.slug}`)
            return
        }
        navigate(documentLink(item))
    }

    usePageMeta({
        title: onShelf ? domain : 'Digital Library',
        description: onShelf
            ? `${shelfCount} ${info.unitPlural} on the ${domain} shelf — free PDFs, no sign-in and no payment step.`
            : `${TOTAL} free study documents on nine shelves: NOUN course manuals, plays and books, all as PDFs.`,
        path: onShelf ? shelfPath(domain) : '/library',
    })

    return (
        <div className="zs-container">
            {onShelf && (
                <button type="button" className="zs-back" onClick={leaveShelf}>
                    <ChevronLeft size={16} /> All shelves
                </button>
            )}

            {isSearching ? (
                <PageHeader
                    eyebrow={
                        <>
                            <ShieldCheck size={13} /> Free · no sign-in
                        </>
                    }
                    title={filters.query ? `Results for “${filters.query}”` : domain === 'All' ? 'Filtered library' : domain}
                    lead={`${results.length} of ${TOTAL} documents`}
                />
            ) : onShelf ? (
                <PageHeader
                    eyebrow={
                        <>
                            <ShieldCheck size={13} /> Free · no sign-in · no payment step
                        </>
                    }
                    title={`${FRESHER_LIBRARY_DOMAINS.find((d) => d.name === domain)?.emoji || '📚'} ${domain}`}
                    lead={`${shelfLine(domain, shelfCount)}. ${info.blurb}`}
                />
            ) : (
                <PageHeader
                    eyebrow={
                        <>
                            <ShieldCheck size={13} /> Free · no sign-in · no payment step
                        </>
                    }
                    title="Digital Library"
                    lead={`${TOTAL} free documents on nine shelves. Pick a shelf, or search by course code, title or author.`}
                />
            )}

            {/* ── One toolbar, always in reach ──────────────────────────── */}
            <div className="zs-toolbar">
                <SearchField
                    value={filters.query}
                    onChange={(value) => set({ query: value })}
                    placeholder={
                        onShelf && !isSearching
                            ? `Search ${domain.toLowerCase()}`
                            : 'Search by title, author or course code'
                    }
                />

                <Button variant="outline" size="sm" onClick={() => setShowFilters(true)}>
                    <Filter size={14} /> Filters{extraFilters > 0 ? ` · ${extraFilters}` : ''}
                </Button>

                {(onShelf || isSearching) && (
                <label className="zs-select" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>SORT</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        aria-label="Sort library"
                        style={{ border: 'none', background: 'transparent', font: 'inherit', fontWeight: 700, cursor: 'pointer' }}
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                )}
            </div>

            {/* ── Active filters, removable ─────────────────────────────── */}
            {extraFilters > 0 && (
                <div className="zs-filter-row">
                    <span>Showing</span>
                    {['faculty', 'department', 'level', 'type']
                        .filter((key) => filters[key] !== 'All')
                        .map((key) => (
                            <button
                                key={key}
                                type="button"
                                className="zs-chip zs-chip--active"
                                onClick={() =>
                                    key === 'faculty'
                                        ? set({ faculty: 'All', department: 'All' })
                                        : set({ [key]: 'All' })
                                }
                            >
                                {filters[key]} <X size={12} />
                            </button>
                        ))}
                    <button type="button" className="zs-link" onClick={clearFilters}>
                        Clear filters
                    </button>
                </div>
            )}

            {/* ── The shelf index: the whole library in one screen ──────── */}
            {!onShelf && !isSearching && (
                <section className="zs-section" aria-labelledby="shelves-title">
                    <SectionHeading
                        id="shelves-title"
                        title="Browse by shelf"
                        description="Nine shelves. Every document is free and downloads as a PDF from this site."
                    />
                    <div className="zs-shelf-grid">
                        {FRESHER_LIBRARY_DOMAINS.map((shelf) => {
                            const meta = shelfInfo(shelf.name)
                            return (
                                <button
                                    key={shelf.name}
                                    type="button"
                                    className="zs-shelf-card"
                                    onClick={() => openShelf(shelf.name)}
                                >
                                    <span className="zs-shelf-card__emoji" aria-hidden="true">
                                        {shelf.emoji}
                                    </span>
                                    <span className="zs-shelf-card__body">
                                        <strong>{shelf.name}</strong>
                                        <span className="zs-shelf-card__count">
                                            {shelf.count} {shelf.count === 1 ? meta.unit : meta.unitPlural}
                                        </span>
                                        <span className="zs-shelf-card__blurb">{meta.blurb}</span>
                                    </span>
                                    <ChevronRight size={18} aria-hidden="true" />
                                </button>
                            )
                        })}
                    </div>

                    <div style={{ marginTop: '1.5rem', display: 'grid', gap: '0.5rem' }}>
                        <button
                            type="button"
                            className="zs-details zs-details--link"
                            onClick={() => navigate('/library/offline')}
                        >
                            <WifiOff size={13} aria-hidden="true" /> Saved on this device
                            <span className="zs-details__hint">Read with no data →</span>
                        </button>
                        <details className="zs-details">
                            <summary>What the library holds</summary>
                            <p className="zs-details__lead">{COUNT_LABEL}.</p>
                        </details>
                        <GapLibrary />
                        <details className="zs-details">
                            <summary>Appearance</summary>
                            <div className="zs-details__lead">
                                <ThemeToggle />
                            </div>
                        </details>
                        <Licence />
                    </div>
                </section>
            )}

            {/* ── Results, or one shelf's documents ─────────────────────── */}
            <p className="zs-live" role="status" aria-live="polite">
                {results.length} {results.length === 1 ? 'document' : 'documents'}
                {domain !== 'All' ? ` on the ${domain} shelf` : ''}
            </p>

            {results.length === 0 && (isSearching || onShelf) ? (
                <div style={{ paddingTop: '1rem' }}>
                    <EmptyState
                        icon={Search}
                        title="Nothing matches that search"
                        action={
                            <Button size="sm" variant="outline" onClick={onShelf ? clearFilters : clearAll}>
                                Clear filters
                            </Button>
                        }
                    >
                        {suggestions.length > 0 ? (
                            <>
                                <p style={{ margin: '0 0 0.5rem' }}>Perhaps you meant:</p>
                                <div className="zs-chip-row" style={{ justifyContent: 'center' }}>
                                    {suggestions.map((suggestion) => (
                                        <button
                                            key={`${suggestion.item.id}-${suggestion.label}`}
                                            type="button"
                                            className="zs-chip"
                                            onClick={() =>
                                                set({
                                                    query: suggestion.field === 'author' ? suggestion.label : suggestion.item.title,
                                                })
                                            }
                                        >
                                            {suggestion.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                Try an author such as <strong>Watchman Nee</strong>, a title such as{' '}
                                <strong>The Spiritual Man</strong>, or clear your filters to browse the
                                whole library.
                            </>
                        )}
                    </EmptyState>
                </div>
            ) : isSearching ? (
                <section className="zs-section" aria-labelledby="results-title">
                    <SectionHeading
                        id="results-title"
                        title={`${domain === 'All' ? 'All shelves' : domain} (${results.length})`}
                        description="Every document here is free to open and download."
                    />
                    <div className="zs-grid">
                        {results.map((item) => (
                            <LibraryCard key={item.id} item={item} onOpen={openItem} />
                        ))}
                    </div>
                </section>
            ) : onShelf ? (
                <section className="zs-section" aria-labelledby="shelf-documents">
                    {groupItems(results).map((group) => (
                        <div key={group.name} className="zs-group">
                            <h3 className="zs-group__title">
                                {group.name}
                                <span>
                                    {' '}
                                    · {group.items.length}{' '}
                                    {group.items.length === 1 ? info.unit : info.unitPlural}
                                </span>
                            </h3>
                            <div className="zs-grid">
                                {group.items.map((item) => (
                                    <LibraryCard key={item.id} item={item} onOpen={openItem} />
                                ))}
                            </div>
                        </div>
                    ))}

                    <div style={{ marginTop: '1.5rem', display: 'grid', gap: '0.5rem' }}>
                        <GapPanel name={domain} />
                        <Licence compact />
                    </div>

                    <div className="zs-other-shelves">
                        <span>Other shelves</span>
                        <div className="zs-chip-row">
                            {FRESHER_LIBRARY_DOMAINS.filter((shelf) => shelf.name !== domain).map(
                                (shelf) => (
                                    <button
                                        key={shelf.name}
                                        type="button"
                                        className="zs-chip"
                                        onClick={() => openShelf(shelf.name)}
                                    >
                                        <span aria-hidden="true">{shelf.emoji}</span> {shelf.name}
                                        <span className="zs-chip__count">{shelf.count}</span>
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── Filter sheet ──────────────────────────────────────────── */}
            {showFilters && (
                <div className="zs-sheet-backdrop" role="dialog" aria-modal="true" aria-label="Filter the library" onClick={() => setShowFilters(false)}>
                    <div className="zs-sheet" onClick={(e) => e.stopPropagation()}>
                        <div className="zs-sheet__head">
                            <strong style={{ fontSize: '0.95rem' }}>Filter the library</strong>
                            <button type="button" className="zs-icon-btn" onClick={() => setShowFilters(false)} aria-label="Close filters">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="zs-sheet__body">
                            <FilterGroup label="Shelf">
                                <Chip active={domain === 'All'} onClick={() => set({ domain: 'All' })}>
                                    All shelves ({TOTAL})
                                </Chip>
                                {FRESHER_LIBRARY_DOMAINS.map((shelf) => (
                                    <Chip
                                        key={shelf.name}
                                        active={domain === shelf.name}
                                        onClick={() => set({ domain: shelf.name })}
                                    >
                                        {shelf.emoji} {shelf.name} ({shelf.count})
                                    </Chip>
                                ))}
                            </FilterGroup>

                            <FilterGroup label="Faculty">
                                <Chip active={filters.faculty === 'All'} onClick={() => setFaculty('All')}>
                                    All Faculties
                                </Chip>
                                {UNIZIK_FACULTIES.map((faculty) => (
                                    <Chip
                                        key={faculty.name}
                                        active={filters.faculty === faculty.name}
                                        onClick={() => setFaculty(faculty.name)}
                                    >
                                        {faculty.name}
                                    </Chip>
                                ))}
                            </FilterGroup>

                            {availableDepartments.length > 0 && (
                                <FilterGroup label={`Departments in ${filters.faculty}`}>
                                    <Chip
                                        active={filters.department === 'All'}
                                        onClick={() => set({ department: 'All' })}
                                    >
                                        All departments
                                    </Chip>
                                    {availableDepartments.map((department) => (
                                        <Chip
                                            key={department}
                                            active={filters.department === department}
                                            onClick={() => set({ department })}
                                        >
                                            {department}
                                        </Chip>
                                    ))}
                                </FilterGroup>
                            )}

                            <FilterGroup label="Level">
                                <Chip active={filters.level === 'All'} onClick={() => set({ level: 'All' })}>
                                    All Levels
                                </Chip>
                                {ACADEMIC_LEVELS.map((level) => (
                                    <Chip
                                        key={level.id}
                                        active={filters.level === level.id}
                                        onClick={() => set({ level: level.id })}
                                    >
                                        {level.name}
                                    </Chip>
                                ))}
                            </FilterGroup>

                            <FilterGroup label="Material type">
                                <Chip active={filters.type === 'All'} onClick={() => set({ type: 'All' })}>
                                    All Types
                                </Chip>
                                {ACADEMIC_MATERIAL_TYPES.map((type) => (
                                    <Chip
                                        key={type.id}
                                        active={filters.type === type.id}
                                        onClick={() => set({ type: type.id })}
                                    >
                                        {type.emoji} {type.name.split('&')[0]}
                                    </Chip>
                                ))}
                            </FilterGroup>
                        </div>

                        <div className="zs-sheet__foot">
                            <Button variant="outline" block onClick={clearAll}>
                                Clear all filters
                            </Button>
                            <Button block onClick={() => setShowFilters(false)}>
                                Show {results.length} {results.length === 1 ? 'result' : 'results'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
