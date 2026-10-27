/**
 * Addresses for library documents and shelves.
 *
 * Until now only the eight Christian books had a page of their own; the other
 * three hundred-odd documents were a bare `.pdf` link. A play could not be
 * shared, cited or linked to — and a search engine could not see it at all.
 *
 * A document's address is `/library/doc/<slug>`, where the slug is the file
 * name the PDF is served under. That is the one identifier every shelf already
 * has: plays, manuals, guides and books are all built from a slug, and the
 * downloads live at `.../<slug>.pdf`. So the address always resolves to the
 * document it names, and it stays stable when a card's title is reworded.
 *
 * Shelves also get a readable address, `/library/shelf/<shelf-slug>`, and the
 * old `?domain=` form keeps working so no link that has been shared breaks.
 */
// shelf names only: importing `shelfGuide` here would pull the whole catalogue
// (and its gap notes) into any page that needs one address.
import { SHELF_ORDER } from './shelves'

/** "Greek Tragedy" -> "greek-tragedy" */
export function slugify(value) {
    return String(value || '')
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export const SHELF_SLUGS = Object.fromEntries(
    SHELF_ORDER.map((name) => [slugify(name), name])
)

/** The shelf a readable address names, or null when nothing matches. */
export function shelfFromSlug(shelfSlug) {
    return SHELF_SLUGS[slugify(shelfSlug)] || null
}

/** `/library/shelf/greek-tragedy` for a shelf name. */
export function shelfPath(name) {
    return `/library/shelf/${slugify(name)}`
}

/** The slug a document is addressed by: its file name without the extension. */
export function documentSlug(item) {
    if (!item) return ''
    if (item.slug) return item.slug
    const path = item.download_path || ''
    const file = path.split('/').pop() || ''
    return file.replace(/\.pdf$/i, '')
}

/** `/library/doc/<slug>` for any document on any shelf. */
export function documentPath(item) {
    const slug = documentSlug(item)
    return slug ? `/library/doc/${slug}` : '/library'
}

/**
 * Where a reader should be sent when they click a card.
 *
 * Books keep their richer page; every other document now has one too. Nothing
 * in the library links straight at a PDF any more — the download is one tap
 * from the document's own page, where its edition, page count and rights note
 * are stated before the file opens.
 */
export function documentLink(item) {
    if (!item) return '/library'
    return `/library/doc/${documentSlug(item)}`
}

/** Finds a document by the slug in its address. */
export function findDocumentBySlug(items, slug) {
    const wanted = String(slug || '').toLowerCase()
    if (!wanted) return null
    return (items || []).find((item) => documentSlug(item).toLowerCase() === wanted) || null
}

/**
 * Documents worth opening next: same shelf, then same author, never the one
 * already open. Returns [] rather than inventing a recommendation.
 */
export function relatedDocuments(items, current, limit = 6) {
    if (!current) return []
    const others = (items || []).filter(
        (item) => documentSlug(item) !== documentSlug(current)
    )
    const sameAuthor = others.filter(
        (item) => current.author && item.author === current.author
    )
    const sameShelf = others.filter(
        (item) => item.domain === current.domain && !sameAuthor.includes(item)
    )
    const sameGroup = others.filter(
        (item) =>
            item.group &&
            item.group === current.group &&
            !sameAuthor.includes(item) &&
            !sameShelf.includes(item)
    )
    return [...sameAuthor, ...sameGroup, ...sameShelf].slice(0, limit)
}
