import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Filter, Search, ShieldCheck, X } from 'lucide-react'
import { getDigitalProducts } from '../lib/database'
import { UNIZIK_FACULTIES, ACADEMIC_LEVELS, ACADEMIC_MATERIAL_TYPES } from '../lib/categories'
import { EURIPIDES_NOT_ON_GUTENBERG } from '../lib/dramaLibrary'
import {
    FRESHER_LIBRARY_DOMAINS,
    libraryCountLabel,
    libraryCounts,
    mergeLibraryMaterials,
} from '../lib/fresherLibrary'
import {
    EMPTY_FILTERS,
    SORT_OPTIONS,
    activeFilterCount,
    filterLibrary,
    groupByShelf,
    sortLibrary,
} from '../lib/libraryView'
import { Button, Chip, EmptyState, PageHeader, SearchField, SectionHeading } from '../components/ui'
import LibraryCard from '../components/LibraryCard'

const COUNTS = libraryCounts()
const TOTAL = COUNTS.total
const COUNT_LABEL = libraryCountLabel(COUNTS)

function FilterGroup({ label, children }) {
    return (
        <div>
            <div className="zs-filter-group__label">{label}</div>
            <div className="zs-filter-group__chips">{children}</div>
        </div>
    )
}

export default function LibraryPage() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [filters, setFilters] = useState(() => ({
        ...EMPTY_FILTERS,
        query: searchParams.get('q') || '',
        domain: searchParams.get('domain') || 'All',
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

    // Keep the URL in step with the two filters that can arrive by link.
    useEffect(() => {
        const next = new URLSearchParams(searchParams)
        if (filters.domain !== 'All') next.set('domain', filters.domain)
        else next.delete('domain')
        if (filters.query) next.set('q', filters.query)
        else next.delete('q')
        if (next.toString() !== searchParams.toString()) {
            setSearchParams(next, { replace: true })
        }
    }, [filters.domain, filters.query, searchParams, setSearchParams])

    const allMaterials = useMemo(() => mergeLibraryMaterials(dbMaterials), [dbMaterials])
    const results = useMemo(
        () => sortLibrary(filterLibrary(allMaterials, filters), sortBy),
        [allMaterials, filters, sortBy]
    )

    const availableDepartments = useMemo(() => {
        if (filters.faculty === 'All') return []
        return UNIZIK_FACULTIES.find((f) => f.name === filters.faculty)?.departments || []
    }, [filters.faculty])

    const isBrowsing = !filters.query && activeFilterCount(filters) === 0
    const shelves = useMemo(() => (isBrowsing ? groupByShelf(results) : []), [isBrowsing, results])

    const set = (patch) => setFilters((current) => ({ ...current, ...patch }))
    const setFaculty = (name) => set({ faculty: name, department: 'All' })
    const clearAll = () => setFilters({ ...EMPTY_FILTERS })

    const openItem = (item) => {
        if (item.isBook) {
            navigate(`/library/books/${item.slug}`)
            return
        }
        // Greek plays are read on Project Gutenberg; ZikShare holds no copy.
        window.open(item.external_url || item.download_path, '_blank', 'noopener,noreferrer')
    }

    const filterCount = activeFilterCount(filters)
    const headingLabel =
        filters.domain === 'All' ? 'Library Materials' : filters.domain

    return (
        <div className="zs-container">
            <PageHeader
                eyebrow={
                    <>
                        <ShieldCheck size={13} /> Free · no sign-in · no payment step
                    </>
                }
                title="UNIZIK Digital Library"
                lead={`${COUNT_LABEL}. Everything is free — no sign-in, no payment step. Books download as PDF; the plays open in full on Project Gutenberg.`}
            />

            {/* ── One toolbar, always in reach ──────────────────────────── */}
            <div className="zs-toolbar">
                <SearchField
                    value={filters.query}
                    onChange={(value) => set({ query: value })}
                    placeholder="Search by title, author or course code"
                />

                <Button variant="outline" size="sm" onClick={() => setShowFilters(true)}>
                    <Filter size={14} /> Filters{filterCount > 0 ? ` · ${filterCount}` : ''}
                </Button>

                <label className="zs-select" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700 }}>SORT</span>
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
            </div>

            {/* ── Active filters, removable ─────────────────────────────── */}
            {(filterCount > 0 || filters.query) && (
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem 0' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700 }}>Showing</span>
                    {['domain', 'faculty', 'department', 'level', 'type']
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
                    <button type="button" className="zs-link" onClick={clearAll}>
                        Clear all
                    </button>
                </div>
            )}

            {/* ── Results ───────────────────────────────────────────────── */}
            {results.length === 0 ? (
                <div style={{ paddingTop: '1rem' }}>
                    <EmptyState
                        icon={Search}
                        title="Nothing matches that search"
                        action={
                            <Button size="sm" variant="outline" onClick={clearAll}>
                                Clear filters
                            </Button>
                        }
                    >
                        Try an author such as <strong>Watchman Nee</strong>, a title such as{' '}
                        <strong>The Spiritual Man</strong>, or clear your filters to browse the whole
                        library.
                    </EmptyState>
                </div>
            ) : isBrowsing ? (
                shelves.map((shelf) => (
                    <section className="zs-section" key={shelf.name} aria-labelledby={`shelf-${shelf.name}`}>
                        <SectionHeading
                            id={`shelf-${shelf.name}`}
                            title={`${shelf.emoji} ${shelf.name}`}
                            description={`${shelf.items.length} ${shelf.items.length === 1 ? 'document' : 'documents'} · free`}
                        />
                        <div className="zs-grid">
                            {shelf.items.map((item) => (
                                <LibraryCard key={item.id} item={item} onOpen={openItem} />
                            ))}
                        </div>
                    </section>
                ))
            ) : (
                <section className="zs-section" aria-labelledby="results-title">
                    <SectionHeading
                        id="results-title"
                        title={`${headingLabel} (${results.length})`}
                        description="Every document here is free to open and download."
                    />
                    <div className="zs-grid">
                        {results.map((item) => (
                            <LibraryCard key={item.id} item={item} onOpen={openItem} />
                        ))}
                    </div>
                </section>
            )}

            {/* ── The four plays that have no free English text ──────────── */}
            <section className="zs-section" aria-labelledby="missing-plays">
                <SectionHeading
                    id="missing-plays"
                    title="Four Euripides plays are not linked here"
                    description="They survive in Greek, but no public-domain English translation of them is free to read — so they get no card rather than a dead link."
                />
                <div className="zs-grid">
                    {EURIPIDES_NOT_ON_GUTENBERG.map((play) => (
                        <div key={play.title} className="zs-panel" style={{ margin: 0 }}>
                            <strong style={{ display: 'block', fontSize: '0.9rem' }}>{play.title}</strong>
                            <span style={{ display: 'block', fontSize: '0.72rem', color: '#94A3B8', margin: '0.15rem 0 0.5rem' }}>
                                {play.greekTitle}
                            </span>
                            <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                                {play.note}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="zs-panel" style={{ marginTop: '2.5rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <ShieldCheck size={18} color="var(--color-campus-green)" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', flex: '1 1 18rem' }}>
                    <strong>Books</strong> are third-party works: copyright stays with the author and
                    publisher, and they are hosted here for free reading only. <strong>Greek plays</strong>{' '}
                    leave this site — each card opens a public-domain translation on Project Gutenberg,
                    which hosts the file. Course material added later is written for ZikShare: always
                    confirm the current outline with your department.
                </p>
            </div>

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
                                <Chip active={filters.domain === 'All'} onClick={() => set({ domain: 'All' })}>
                                    All Domains ({TOTAL})
                                </Chip>
                                {FRESHER_LIBRARY_DOMAINS.map((domain) => (
                                    <Chip
                                        key={domain.name}
                                        active={filters.domain === domain.name}
                                        onClick={() => set({ domain: domain.name })}
                                    >
                                        {domain.emoji} {domain.name} ({domain.count})
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
