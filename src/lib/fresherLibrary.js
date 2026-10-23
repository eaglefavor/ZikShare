import { FRESHER_LIBRARY_PACKS } from './fresherLibraryData'
import { CHRISTIAN_BOOKS, CHRISTIAN_BOOKS_DOMAIN, toBookCard, findBookByStoragePath } from './christianBooks'
import { DRAMA_DOMAIN, DRAMA_PLAYS, toDramaCard } from './dramaLibrary'
import { GST_CARDS, GST_DOMAIN, ENTREPRENEURSHIP_DOMAIN } from './gstLibrary'
import { ROMAN_DOMAIN, ROMAN_PLAYS, toRomanCard } from './romanLibrary'
import { MEDIEVAL_DOMAIN, MEDIEVAL_PLAYS, toMedievalCard } from './medievalLibrary'
import { RENAISSANCE_DOMAIN, RENAISSANCE_PLAYS, toRenaissanceCard } from './renaissanceLibrary'
import { MODERN_DOMAIN, MODERN_PLAYS, toModernCard } from './modernLibrary'

/**
 * Display order of the shelves a study pack can sit on.
 *
 * This is the taxonomy, not the contents: after the old shelves were cleared no
 * shelf is displayed until a document exists for it (`FRESHER_LIBRARY_DOMAINS`
 * below filters empty shelves out), so the order can stay complete while the
 * library itself holds only the Christian Books shelf.
 */
export const FRESHER_LIBRARY_DOMAIN_ORDER = [
    'GST & Compulsory Courses',
    'Money & Career',
    DRAMA_DOMAIN,
    ROMAN_DOMAIN,
    MEDIEVAL_DOMAIN,
    RENAISSANCE_DOMAIN,
    MODERN_DOMAIN,
    'Faculty Primer',
    'Theatre & Film Studies',
    'Departmental Archive',
    'Study Skills',
    'Campus Life',
    'Digital Skills',
    'Health & Wellbeing',
    CHRISTIAN_BOOKS_DOMAIN,
]

export const FRESHER_DOMAIN_EMOJI = {
    [DRAMA_DOMAIN]: '🎭',
    [ROMAN_DOMAIN]: '🏺',
    [MEDIEVAL_DOMAIN]: '🕯️',
    [RENAISSANCE_DOMAIN]: '👑',
    [MODERN_DOMAIN]: '🌍',
    'GST & Compulsory Courses': '🏛️',
    'Faculty Primer': '🎓',
    'Theatre & Film Studies': '🎭',
    'Departmental Archive': '🗂️',
    'Study Skills': '📖',
    'Campus Life': '🏫',
    'Money & Career': '💼',
    'Digital Skills': '💻',
    'Health & Wellbeing': '💚',
    [CHRISTIAN_BOOKS_DOMAIN]: '📕',
}

export { FRESHER_LIBRARY_PACKS }

/**
 * What the library actually contains, right now.
 *
 * Every count shown to a reader is derived here, never typed into a page, so a
 * shelf that has been cleared says it is empty instead of advertising documents
 * that are no longer there.
 */
export function libraryCounts() {
    const packs = FRESHER_LIBRARY_PACKS.length
    const books = CHRISTIAN_BOOKS.length
    // Greek plays are typeset as PDFs and hosted here too, counted apart from
    // the manuals because they are a different shelf, not a different promise.
    const plays = DRAMA_PLAYS.length
    // Roman comedy and tragedy, typeset here from out-of-copyright editions.
    const roman = ROMAN_PLAYS.length
    // Medieval cycle plays, moralities and Hrotsvitha, hosted the same way.
    const medieval = MEDIEVAL_PLAYS.length
    // Shakespeare and the Elizabethan, Jacobean and Caroline stage.
    const renaissance = RENAISSANCE_PLAYS.length
    // Realism to the Absurd, in the editions Gutenberg publishes.
    const modern = MODERN_PLAYS.length
    // NOUN courseware is hosted on ZikShare: these download from us.
    const hosted = GST_CARDS.length
    return {
        packs,
        books,
        plays,
        roman,
        medieval,
        renaissance,
        modern,
        hosted,
        total: packs + books + plays + roman + medieval + renaissance + modern + hosted,
    }
}

function countOf(n, one, many) {
    return `${n} ${n === 1 ? one : many}`
}

/** e.g. "8 full-length books" or "12 study packs and 8 full-length books". */
export function libraryCountLabel({ packs, books, plays, roman, medieval, renaissance, modern, hosted } = libraryCounts()) {
    const parts = []
    if (packs > 0) parts.push(countOf(packs, 'study pack', 'study packs'))
    if (books > 0) parts.push(countOf(books, 'full-length book', 'full-length books'))
    if (hosted > 0) parts.push(`${hosted} NOUN course manuals to download`)
    if (plays > 0) parts.push(`${plays} Greek plays to download`)
    if (roman > 0) parts.push(`${roman} Roman plays to download`)
    if (medieval > 0) parts.push(`${medieval} medieval plays to download`)
    if (renaissance > 0) parts.push(`${renaissance} Renaissance plays to download`)
    if (modern > 0) parts.push(`${modern} modern plays to download`)
    if (parts.length === 0) return 'No documents yet'
    if (parts.length === 1) return parts[0]
    return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`
}

/**
 * Domain summary with counts, ordered for display.
 */
export const FRESHER_LIBRARY_DOMAINS = FRESHER_LIBRARY_DOMAIN_ORDER
    .map((name) => ({
        name,
        emoji: FRESHER_DOMAIN_EMOJI[name],
        count:
            FRESHER_LIBRARY_PACKS.filter((p) => p.domain === name).length +
            CHRISTIAN_BOOKS.filter((b) => b.domain === name).length +
            DRAMA_PLAYS.filter(() => name === DRAMA_DOMAIN).length +
            ROMAN_PLAYS.filter(() => name === ROMAN_DOMAIN).length +
            MEDIEVAL_PLAYS.filter(() => name === MEDIEVAL_DOMAIN).length +
            RENAISSANCE_PLAYS.filter(() => name === RENAISSANCE_DOMAIN).length +
            MODERN_PLAYS.filter(() => name === MODERN_DOMAIN).length +
            GST_CARDS.filter((card) => card.domain === name).length,
    }))
    .filter((d) => d.count > 0)

/**
 * Maps an authored pack (built by scripts/build-library-pdfs.mjs) into the shape
 * LibraryPage renders. Kept separate from database rows so the UI can show real
 * PDF packs even before an admin seeds them into Supabase.
 */
export function toLibraryCard(pack) {
    return {
        id: `pdf-${pack.slug}`,
        slug: pack.slug,
        code: pack.code || '',
        title: pack.title,
        faculty: pack.faculty,
        department: pack.department,
        level: pack.level,
        material_type: pack.material_type,
        domain: pack.domain,
        priceKobo: 0,
        is_free: true,
        download_path: pack.download_path || `/library/packs/${pack.slug}.pdf`,
        page_count: pack.page_count,
        file_size_bytes: pack.file_size_bytes,
        description: pack.description,
        preview_path: pack.preview_path,
        preview_page_count: pack.preview_page_count,
        storage_path: pack.storage_path,
        is_official: true,
        isFresherPdf: true,
    }
}

/** True for every library pack: nothing in the library is sold. */
export function isFreeLibraryItem(item) {
    return Boolean(item?.isFresherPdf || item?.is_free || item?.priceKobo === 0)
}

/** Archive year bands for a pack, newest last. Empty for non-archive packs. */
export function getArchiveYears(pack) {
    return (pack?.archive_years || []).slice()
}

export function findFresherPackBySlug(slug) {
    return FRESHER_LIBRARY_PACKS.find((p) => p.slug === slug) || null
}

export function findFresherPackByStoragePath(storagePath) {
    if (!storagePath) return null
    return FRESHER_LIBRARY_PACKS.find((p) => p.storage_path === storagePath) || null
}

/**
 * Merges database rows with the authored PDF catalog.
 *
 * The authored catalog is the source of truth for *content* (title, description,
 * domain, chapter metadata); the database row supplies identity and state (id,
 * status, any admin edit). Matching on `original_storage_path` means a row can
 * never invent copy that the catalog does not contain, and a pack that has not
 * been seeded still appears with its free PDF.
 */
/**
 * True for a database row that belongs to a retired authored pack.
 *
 * The old shelves were cleared, but their `digital_products` rows are still in
 * the database. A row like that points at `official-library/<slug>.pdf` and a
 * preview under `/library/previews/`, both of which are gone. Rendering it
 * would put a card in the library whose download 404s, so it is dropped until a
 * pack with that storage path exists again.
 */
export function isRetiredPackRow(row) {
    const path = row?.original_storage_path || row?.storage_path || ''
    if (!path.startsWith('official-library/')) return false
    return findFresherPackByStoragePath(path) === null
}

export function mergeLibraryMaterials(dbMaterials = []) {
    const rows = dbMaterials.filter((row) => !isRetiredPackRow(row))
    const seededPaths = new Set(
        rows.map((d) => d.original_storage_path || d.storage_path).filter(Boolean)
    )

    const fromDb = rows.map((d) => {
        const pack = findFresherPackByStoragePath(d.original_storage_path || d.storage_path)
        const book = pack ? null : findBookByStoragePath(d.original_storage_path || d.storage_path)

        // A seeded book keeps its catalogue card (author, topics, shelf note)
        // and only borrows the row's identity, so an admin edit in the database
        // cannot turn a book into something the catalogue does not describe.
        if (book) return { ...toBookCard(book), id: d.id }

        return {
            id: d.id,
            slug: pack?.slug || null,
            code: pack?.code || d.course_code || '',
            title: pack?.title || d.title,
            faculty: pack?.faculty || d.faculty || 'General Studies (GST / CED)',
            department: pack?.department || d.department || '',
            level: pack?.level || d.level || '100L',
            material_type: pack?.material_type || d.subcategory || 'lecture-notes',
            domain: pack?.domain || d.domain || null,
            priceKobo: 0,
            page_count: pack?.page_count || d.page_count || 0,
            file_size_bytes: pack?.file_size_bytes || d.file_size_bytes || 0,
            description: pack?.description || d.description || '',
            preview_path: pack?.preview_path || d.preview_path || null,
            preview_page_count: pack?.preview_page_count || d.preview_page_count || 3,
            download_path: pack?.download_path || (pack ? `/library/packs/${pack.slug}.pdf` : null),
            archive_years: pack?.archive_years || [],
            is_free: true,
            is_official: true,
            isFresherPdf: Boolean(pack || d.original_storage_path),
        }
    })

    const notYetSeeded = FRESHER_LIBRARY_PACKS
        .filter((p) => !seededPaths.has(p.storage_path))
        .map(toLibraryCard)

    // Books sit on their own shelf and are served as-is from
    // /library/books/<slug>.pdf. A book that has been seeded into the database
    // is already represented by its row above, so it is not listed twice.
    const books = CHRISTIAN_BOOKS
        .filter((b) => !seededPaths.has(b.storage_path || `christian-books/${b.slug}.pdf`))
        .map(toBookCard)

    // Greek plays are PDFs hosted under /library/drama. They are always listed:
    // there is no database row for them to collide with.
    const plays = DRAMA_PLAYS.map(toDramaCard)
    // Roman plays are hosted PDFs too, under /library/roman.
    const roman = ROMAN_PLAYS.map(toRomanCard)
    // Medieval plays are hosted PDFs too, under /library/medieval.
    const medieval = MEDIEVAL_PLAYS.map(toMedievalCard)
    // Renaissance plays are hosted PDFs too, under /library/renaissance.
    const renaissance = RENAISSANCE_PLAYS.map(toRenaissanceCard)
    // Modern plays are hosted PDFs too, under /library/modern.
    const modern = MODERN_PLAYS.map(toModernCard)

    // NOUN courseware is hosted here, so it is a normal library document with a
    // real download path. A database row never shadows it.
    return [
        ...fromDb,
        ...notYetSeeded,
        ...books,
        ...GST_CARDS,
        ...plays,
        ...roman,
        ...medieval,
        ...renaissance,
        ...modern,
    ]
}
