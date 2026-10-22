import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
    BookOpen, Search, Filter, ShieldCheck, Sparkles, GraduationCap, 
    FileText, Award, Download, CheckCircle, ChevronRight, ArrowRight,
    Library, Layers, BookmarkCheck, Star
} from 'lucide-react'
import { getDigitalProducts } from '../lib/database'
import { UNIZIK_FACULTIES, ACADEMIC_LEVELS, ACADEMIC_MATERIAL_TYPES, formatCourseCode } from '../lib/categories'
import { FRESHER_LIBRARY_PACKS, FRESHER_LIBRARY_DOMAINS, mergeLibraryMaterials } from '../lib/fresherLibrary'
import { CHRISTIAN_BOOKS } from '../lib/christianBooks'

export default function LibraryPage() {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFaculty, setSelectedFaculty] = useState('All')
    const [selectedDepartment, setSelectedDepartment] = useState('All')
    const [selectedLevel, setSelectedLevel] = useState('All')
    const [selectedMaterialType, setSelectedMaterialType] = useState('All')
    const [selectedDomain, setSelectedDomain] = useState('All')
    const [dbMaterials, setDbMaterials] = useState([])
    const [, setIsLoading] = useState(true)

    // Compute departments available for currently selected faculty
    const availableDepartments = useMemo(() => {
        if (selectedFaculty === 'All') return []
        const facObj = UNIZIK_FACULTIES.find(f => f.name === selectedFaculty)
        return facObj?.departments || []
    }, [selectedFaculty])

    // Reset department filter when faculty changes
    const handleFacultyChange = (facName) => {
        setSelectedFaculty(facName)
        setSelectedDepartment('All')
    }

    useEffect(() => {
        let isMounted = true
        async function fetchLibraryItems() {
            setIsLoading(true)
            try {
                const items = await getDigitalProducts({
                    category: 'Academic & Study Materials',
                    limit: 150,
                })
                if (isMounted) {
                    setDbMaterials(items || [])
                }
            } catch (err) {
                console.warn('Could not load dynamic materials from database:', err)
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }
        fetchLibraryItems()
        return () => { isMounted = false }
    }, [])

    // Database rows plus the authored PDF catalog. Packs that an admin has not
    // yet seeded are still listed, with their free preview, so the library is
    // never empty and every card links to a real document.
    const allMaterials = useMemo(() => mergeLibraryMaterials(dbMaterials), [dbMaterials])

    // Filter logic
    const filteredMaterials = useMemo(() => {
        return allMaterials.filter(item => {
            const matchesQuery = !searchQuery.trim() || 
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.code && item.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))

            const matchesFaculty = selectedFaculty === 'All' || item.faculty === selectedFaculty
            const matchesDepartment = selectedDepartment === 'All' || item.department === selectedDepartment || (item.title && item.title.toLowerCase().includes(selectedDepartment.toLowerCase()))
            const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel
            const matchesType = selectedMaterialType === 'All' || item.material_type === selectedMaterialType
            const matchesDomain = selectedDomain === 'All' || item.domain === selectedDomain

            return matchesQuery && matchesFaculty && matchesDepartment && matchesLevel && matchesType && matchesDomain
        })
    }, [allMaterials, searchQuery, selectedFaculty, selectedDepartment, selectedLevel, selectedMaterialType, selectedDomain])

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingBottom: '5rem' }}>
            {/* ── PRESTIGIOUS ROYAL NAVY HERO HEADER ── */}
            <section style={{
                background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 55%, #1E40AF 100%)',
                color: 'white',
                padding: '2.5rem 1rem 3rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background decorative circles */}
                <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '180px',
                    height: '180px',
                    borderRadius: '9999px',
                    background: 'radial-gradient(circle, rgba(217, 119, 6, 0.25) 0%, rgba(217, 119, 6, 0) 70%)',
                    pointerEvents: 'none'
                }} />

                <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(217, 119, 6, 0.2)', border: '1px solid rgba(253, 230, 138, 0.4)', borderRadius: '9999px', padding: '0.35rem 0.85rem', marginBottom: '0.85rem' }}>
                        <ShieldCheck size={16} color="#FBBF24" />
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FEF3C7', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                            Free Student Study Library
                        </span>
                    </div>

                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '0.65rem', color: '#FFFFFF' }}>
                        UNIZIK Digital Library
                    </h1>
                    <p style={{ fontSize: '0.92rem', color: '#E2E8F0', maxWidth: '640px', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                        {FRESHER_LIBRARY_PACKS.length} student-written study packs across every faculty — including the Faculty of Arts and a year-by-year Theatre &amp; Film Studies outline archive — plus a shelf of {CHRISTIAN_BOOKS.length} full-length Christian books. Everything is free: no fee, no sign-in, no payment step before download.
                    </p>

                    {/* Search Input Bar */}
                    <div style={{
                        position: 'relative',
                        maxWidth: '680px',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '0.875rem',
                        padding: '0.35rem 0.5rem 0.35rem 1rem',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)'
                    }}>
                        <Search size={20} color="#64748B" style={{ flexShrink: 0, marginRight: '0.5rem' }} />
                        <input
                            type="text"
                            placeholder="Search course code (e.g. GST 112, FEG 280, ACC 101, LAW 101)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                border: 'none',
                                outline: 'none',
                                fontSize: '0.92rem',
                                color: '#0F172A',
                                fontWeight: 500,
                                backgroundColor: 'transparent'
                            }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                style={{ background: 'none', border: 'none', color: '#94A3B8', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* ── MAIN CONTENT CONTAINER ── */}
            <div style={{ maxWidth: '1000px', margin: '-1.25rem auto 0', padding: '0 1rem', position: 'relative', zIndex: 10 }}>
                {/* Quick Quality Guarantee Card */}
                <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '0.875rem',
                    padding: '1rem 1.25rem',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginBottom: '1.25rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E40AF', flexShrink: 0 }}>
                            <Award size={22} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>Free, student-written, no payment step</div>
                            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Syllabus-mapped (confirm with your department) • No fee • No sign-in • Direct PDF download</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.75rem', backgroundColor: '#FEF3C7', color: '#92400E', fontWeight: 600, padding: '0.25rem 0.6rem', borderRadius: '9999px', border: '1px solid #FDE68A' }}>
                            🏛️ Official ZikShare Repository
                        </span>
                    </div>
                </div>

                {/* ── FILTER CONTROLS ── */}
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.875rem', padding: '1.25rem', border: '1px solid #E2E8F0', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    {/* Faculty Selector Pills */}
                    <div style={{ marginBottom: availableDepartments.length > 0 ? '0.75rem' : '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                Select Faculty ({UNIZIK_FACULTIES.length})
                            </div>
                            {selectedFaculty !== 'All' && (
                                <button
                                    onClick={() => handleFacultyChange('All')}
                                    style={{ background: 'none', border: 'none', color: '#2563EB', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                                >
                                    Show All Faculties
                                </button>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem', scrollbarWidth: 'none' }}>
                            <button
                                onClick={() => handleFacultyChange('All')}
                                style={{
                                    whiteSpace: 'nowrap',
                                    padding: '0.4rem 0.85rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.82rem',
                                    fontWeight: selectedFaculty === 'All' ? 700 : 500,
                                    backgroundColor: selectedFaculty === 'All' ? '#1E40AF' : '#F1F5F9',
                                    color: selectedFaculty === 'All' ? '#FFFFFF' : '#334155',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                All Faculties
                            </button>
                            {UNIZIK_FACULTIES.map(fac => (
                                <button
                                    key={fac.name}
                                    onClick={() => handleFacultyChange(fac.name)}
                                    style={{
                                        whiteSpace: 'nowrap',
                                        padding: '0.4rem 0.85rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.82rem',
                                        fontWeight: selectedFaculty === fac.name ? 700 : 500,
                                        backgroundColor: selectedFaculty === fac.name ? '#1E40AF' : '#F1F5F9',
                                        color: selectedFaculty === fac.name ? '#FFFFFF' : '#334155',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    {fac.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Department Selector Pills (Shown when specific faculty is active) */}
                    {availableDepartments.length > 0 && (
                        <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '0.625rem', border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                                Departments in {selectedFaculty} ({availableDepartments.length})
                            </div>
                            <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem', scrollbarWidth: 'none' }}>
                                <button
                                    onClick={() => setSelectedDepartment('All')}
                                    style={{
                                        whiteSpace: 'nowrap',
                                        padding: '0.3rem 0.7rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: selectedDepartment === 'All' ? 700 : 500,
                                        backgroundColor: selectedDepartment === 'All' ? '#2563EB' : '#FFFFFF',
                                        color: selectedDepartment === 'All' ? '#FFFFFF' : '#475569',
                                        border: '1px solid #CBD5E1',
                                        cursor: 'pointer'
                                    }}
                                >
                                    All Departments
                                </button>
                                {availableDepartments.map(dept => (
                                    <button
                                        key={dept}
                                        onClick={() => setSelectedDepartment(dept)}
                                        style={{
                                            whiteSpace: 'nowrap',
                                            padding: '0.3rem 0.7rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: selectedDepartment === dept ? 700 : 500,
                                            backgroundColor: selectedDepartment === dept ? '#2563EB' : '#FFFFFF',
                                            color: selectedDepartment === dept ? '#FFFFFF' : '#475569',
                                            border: '1px solid #CBD5E1',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {dept}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Domain Selector Pills */}
                    <div style={{ marginBottom: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                            Material Domain ({FRESHER_LIBRARY_DOMAINS.length})
                        </div>
                        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem', scrollbarWidth: 'none' }}>
                            <button
                                onClick={() => setSelectedDomain('All')}
                                style={{
                                    whiteSpace: 'nowrap',
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.78rem',
                                    fontWeight: selectedDomain === 'All' ? 700 : 500,
                                    backgroundColor: selectedDomain === 'All' ? '#0F172A' : '#F8FAFC',
                                    color: selectedDomain === 'All' ? '#FFFFFF' : '#475569',
                                    border: '1px solid #E2E8F0',
                                    cursor: 'pointer'
                                }}
                            >
                                All Domains ({FRESHER_LIBRARY_PACKS.length + CHRISTIAN_BOOKS.length})
                            </button>
                            {FRESHER_LIBRARY_DOMAINS.map(domain => (
                                <button
                                    key={domain.name}
                                    onClick={() => setSelectedDomain(domain.name)}
                                    style={{
                                        whiteSpace: 'nowrap',
                                        padding: '0.35rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.78rem',
                                        fontWeight: selectedDomain === domain.name ? 700 : 500,
                                        backgroundColor: selectedDomain === domain.name ? '#0F172A' : '#F8FAFC',
                                        color: selectedDomain === domain.name ? '#FFFFFF' : '#475569',
                                        border: '1px solid #E2E8F0',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {domain.emoji} {domain.name} ({domain.count})
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Level & Material Type Row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', paddingTop: '0.5rem', borderTop: '1px solid #F1F5F9' }}>
                        {/* Level Filter */}
                        <div style={{ flex: 1, minWidth: '220px' }}>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                                Academic Level
                            </div>
                            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => setSelectedLevel('All')}
                                    style={{
                                        padding: '0.3rem 0.65rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.78rem',
                                        fontWeight: selectedLevel === 'All' ? 700 : 500,
                                        backgroundColor: selectedLevel === 'All' ? '#D97706' : '#F8FAFC',
                                        color: selectedLevel === 'All' ? '#FFFFFF' : '#475569',
                                        border: '1px solid #E2E8F0',
                                        cursor: 'pointer'
                                    }}
                                >
                                    All Levels
                                </button>
                                {ACADEMIC_LEVELS.slice(0, 5).map(lvl => (
                                    <button
                                        key={lvl}
                                        onClick={() => setSelectedLevel(lvl)}
                                        style={{
                                            padding: '0.3rem 0.65rem',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.78rem',
                                            fontWeight: selectedLevel === lvl ? 700 : 500,
                                            backgroundColor: selectedLevel === lvl ? '#D97706' : '#F8FAFC',
                                            color: selectedLevel === lvl ? '#FFFFFF' : '#475569',
                                            border: '1px solid #E2E8F0',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Material Type Filter */}
                        <div style={{ flex: 2, minWidth: '260px' }}>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                                Material Type
                            </div>
                            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => setSelectedMaterialType('All')}
                                    style={{
                                        padding: '0.3rem 0.65rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.78rem',
                                        fontWeight: selectedMaterialType === 'All' ? 700 : 500,
                                        backgroundColor: selectedMaterialType === 'All' ? '#0F172A' : '#F8FAFC',
                                        color: selectedMaterialType === 'All' ? '#FFFFFF' : '#475569',
                                        border: '1px solid #E2E8F0',
                                        cursor: 'pointer'
                                    }}
                                >
                                    All Types
                                </button>
                                {ACADEMIC_MATERIAL_TYPES.map(mat => (
                                    <button
                                        key={mat.id}
                                        onClick={() => setSelectedMaterialType(mat.id)}
                                        style={{
                                            padding: '0.3rem 0.65rem',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.78rem',
                                            fontWeight: selectedMaterialType === mat.id ? 700 : 500,
                                            backgroundColor: selectedMaterialType === mat.id ? '#0F172A' : '#F8FAFC',
                                            color: selectedMaterialType === mat.id ? '#FFFFFF' : '#475569',
                                            border: '1px solid #E2E8F0',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {mat.emoji} {mat.name.split('&')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {selectedDomain === 'Christian Books' && (
                    <div style={{
                        backgroundColor: '#FFFBEB',
                        border: '1px solid #FDE68A',
                        borderRadius: '0.75rem',
                        padding: '0.9rem 1rem',
                        marginBottom: '1rem',
                        fontSize: '0.8rem',
                        color: '#78350F',
                        lineHeight: 1.5
                    }}>
                        <strong>Full-length books, not study packs.</strong> These are third-party works supplied to the
                        library and served as complete PDFs, free to read. Copyright remains with the authors and
                        publishers — check their terms before redistributing a file outside ZikShare.
                    </div>
                )}

                {/* ── RESULTS HEADER & COUNT ── */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
                        {selectedDomain === 'Christian Books'
                            ? 'Christian Books'
                            : selectedDomain === 'All'
                                ? 'Library Materials'
                                : selectedDomain} ({filteredMaterials.length})
                    </div>
                    {filteredMaterials.length > 0 && (
                        <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                            Sorted by High Relevance
                        </div>
                    )}
                </div>

                {/* ── STUDY PACK GRID ── */}
                {filteredMaterials.length === 0 ? (
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.875rem', padding: '3rem 1.5rem', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                        <BookOpen size={48} color="#94A3B8" style={{ margin: '0 auto 1rem', display: 'block' }} />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>No study packs match your filter</h3>
                        <p style={{ fontSize: '0.85rem', color: '#64748B', maxWidth: '400px', margin: '0 auto 1.25rem' }}>
                            Try searching for another course code or clearing some filters to explore other departments.
                        </p>
                        <button
                            onClick={() => { handleFacultyChange('All'); setSelectedLevel('All'); setSelectedMaterialType('All'); setSelectedDomain('All'); setSearchQuery('') }}
                            style={{ backgroundColor: '#1E40AF', color: 'white', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                            Reset All Filters
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                        {filteredMaterials.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    const id = String(item.id || '')
                                    // A book always opens its own page, whether or
                                    // not it has a database row: the row id leads
                                    // to a listing that has no files of its own.
                                    if (item.isBook) {
                                        navigate(`/library/books/${item.slug}`)
                                        return
                                    }
                                    const isPublished = id
                                        && !id.startsWith('pdf-')
                                        && !id.startsWith('catalog-')
                                        && !id.startsWith('book-')
                                    if (isPublished) {
                                        navigate(`/item/${item.id}`)
                                        return
                                    }
                                    // Unseeded packs still have a public free PDF, so
                                    // open the full document rather than a preview.
                                    const href = item.download_path || (item.slug ? `/library/packs/${item.slug}.pdf` : null)
                                    if (href) {
                                        window.open(href, '_blank', 'noopener,noreferrer')
                                        return
                                    }
                                    if (item.preview_path) {
                                        window.open(item.preview_path, '_blank', 'noopener,noreferrer')
                                        return
                                    }
                                    navigate(`/search?query=${encodeURIComponent(item.code || item.title)}`)
                                }}
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '0.875rem',
                                    border: '1px solid #E2E8F0',
                                    padding: '1.25rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)'
                                    e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(15, 23, 42, 0.1)'
                                    e.currentTarget.style.borderColor = '#BFDBFE'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'none'
                                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'
                                    e.currentTarget.style.borderColor = '#E2E8F0'
                                }}
                            >
                                <div>
                                    {/* Books show their own title page as a cover */}
                                    {item.isBook && item.cover_path && (
                                        <img
                                            src={item.cover_path}
                                            alt={`Cover of ${item.title}`}
                                            loading="lazy"
                                            style={{
                                                width: '100%',
                                                aspectRatio: '3 / 4',
                                                objectFit: 'cover',
                                                objectPosition: 'top center',
                                                borderRadius: '0.625rem',
                                                border: '1px solid #E2E8F0',
                                                backgroundColor: '#F8FAFC',
                                                display: 'block',
                                                marginBottom: '0.75rem'
                                            }}
                                        />
                                    )}

                                    {/* Card Top Badges */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                                        <span style={{
                                            backgroundColor: '#1E40AF',
                                            color: '#FFFFFF',
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            padding: '0.2rem 0.55rem',
                                            borderRadius: '0.375rem',
                                            letterSpacing: '0.02em'
                                        }}>
                                            {formatCourseCode(item.code) || (item.isBook ? 'BOOK' : 'CORE')}
                                        </span>

                                        <span style={{
                                            backgroundColor: '#FEF3C7',
                                            color: '#92400E',
                                            fontSize: '0.72rem',
                                            fontWeight: 700,
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '9999px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            border: '1px solid #FDE68A'
                                        }}>
                                            <ShieldCheck size={12} color="#D97706" /> {item.page_count ? `${item.page_count} pages` : 'Verified'}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.35, marginBottom: '0.5rem' }}>
                                        {item.title}
                                    </h4>

                                    {/* Books carry an author and publisher instead of a course code */}
                                    {item.isBook && (
                                        <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 600, marginBottom: '0.5rem' }}>
                                            {item.author}
                                            {item.publisher ? <span style={{ color: '#94A3B8', fontWeight: 500 }}> · {item.publisher}</span> : null}
                                        </div>
                                    )}

                                    {/* Outline archive years (only on year-demarcated packs) */}
                                    {item.archive_years?.length > 0 && (
                                        <div style={{ marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#7C1D3F', backgroundColor: '#FDF2F8', border: '1px solid #FBCFE8', padding: '0.15rem 0.45rem', borderRadius: '9999px', letterSpacing: '0.02em' }}>
                                                🗓 Archive: {item.archive_years.join(' → ')}
                                            </span>
                                        </div>
                                    )}

                                    {/* Faculty, Department & Level Pill */}
                                    {item.domain && (
                                        <div style={{ marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0F766E', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '0.15rem 0.45rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                                                {item.domain}
                                            </span>
                                        </div>
                                    )}

                                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                                        <span style={{ fontWeight: 700, color: '#1E40AF' }}>{item.level}</span>
                                        <span>•</span>
                                        <span style={{ color: '#334155', fontWeight: 600 }}>{item.faculty}</span>
                                        {item.department && (
                                            <>
                                                <span>•</span>
                                                <span style={{ color: '#64748B' }}>{item.department}</span>
                                            </>
                                        )}
                                    </div>

                                    {/* Description Snippet */}
                                    <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.45, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {item.description}
                                    </p>

                                    {item.isBook && (
                                        <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                                            Third-party book. Rights remain with the publisher.
                                        </div>
                                    )}
                                </div>

                                {/* Card Bottom Action / Price */}
                                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Price</div>
                                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#047857' }}>
                                            Free
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.35rem',
                                            backgroundColor: '#1E40AF',
                                            color: '#FFFFFF',
                                            padding: '0.45rem 0.85rem',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.8rem',
                                            fontWeight: 700
                                        }}>
                                            {item.isBook ? <BookOpen size={14} /> : <Download size={14} />}
                                            {item.isBook ? 'Open book — free' : 'Download Free PDF'}
                                        </div>
                                        {item.preview_path && (
                                            <a
                                                href={item.preview_path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                style={{ fontSize: '0.7rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none' }}
                                            >
                                                Free {item.preview_page_count || 3}-page preview
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── COURSE REP / SUBMISSIONS BANNER ── */}
                <div style={{
                    marginTop: '2.5rem',
                    backgroundColor: '#0F172A',
                    borderRadius: '0.875rem',
                    padding: '1.5rem',
                    color: '#FFFFFF',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1.25rem',
                    border: '1px solid #334155'
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                            <GraduationCap size={20} color="#F59E0B" />
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase' }}>UNIZIK Course Rep Network</span>
                        </div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                            Have Verified Study Notes for Your Class?
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: '#94A3B8', maxWidth: '520px', lineHeight: 1.45 }}>
                            Publish your department’s verified past questions and handouts on ZikShare to help fellow students and earn revenue per download.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/post')}
                        style={{
                            backgroundColor: '#D97706',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '0.65rem 1.25rem',
                            borderRadius: '0.625rem',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                        }}
                    >
                        Publish Study Pack <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}
