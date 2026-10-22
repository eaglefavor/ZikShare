import { CHRISTIAN_BOOKS } from './christianBooksData'

export const CHRISTIAN_BOOKS_DOMAIN = 'Christian Books'

export { CHRISTIAN_BOOKS }

/**
 * Maps a catalogued book into the shape LibraryPage renders.
 *
 * Books are not study packs: they are full-length third-party works served
 * from /library/books/<slug>.pdf. They are marked `isBook` so the UI can label
 * them as books rather than course packs, and they carry their rights status
 * through to the card so nothing here quietly implies we hold a licence.
 */
export function toBookCard(book) {
    return {
        id: `book-${book.slug}`,
        slug: book.slug,
        code: '',
        title: book.title,
        subtitle: book.subtitle || '',
        author: book.author,
        publisher: book.publisher || '',
        rights: book.rights,
        topics: book.topics || [],
        faculty: 'Christian Literature',
        department: book.author,
        level: 'All levels',
        material_type: 'textbooks',
        domain: CHRISTIAN_BOOKS_DOMAIN,
        priceKobo: 0,
        is_free: true,
        download_path: book.download_path || `/library/books/${book.slug}.pdf`,
        // The first page of the PDF, rendered by scripts/render-book-covers.py.
        cover_path: book.cover_path || `/library/books/covers/${book.slug}.jpg`,
        page_count: book.page_count,
        file_size_bytes: book.file_size_bytes,
        description: book.description,
        storage_path: book.storage_path || `christian-books/${book.slug}.pdf`,
        is_official: true,
        isBook: true,
        isFresherPdf: false,
    }
}

export function findBookBySlug(slug) {
    return CHRISTIAN_BOOKS.find((b) => b.slug === slug) || null
}

export function findBookByStoragePath(storagePath) {
    if (!storagePath) return null
    return (
        CHRISTIAN_BOOKS.find(
            (b) => (b.storage_path || `christian-books/${b.slug}.pdf`) === storagePath
        ) || null
    )
}

export const CHRISTIAN_BOOK_CARDS = CHRISTIAN_BOOKS.map(toBookCard)

/**
 * Other books worth opening next: same author first, then books that share a
 * topic. Never includes the book you are already on, and never invents one.
 * Returns [] when the shelf has nothing related, so callers can hide the row.
 */
export function findRelatedBooks(slug, limit = 3) {
    const current = findBookBySlug(slug)
    if (!current) return []

    const others = CHRISTIAN_BOOKS.filter((b) => b.slug !== current.slug)
    const sameAuthor = others.filter((b) => b.author === current.author)
    const sharesTopic = others.filter(
        (b) =>
            b.author !== current.author &&
            (b.topics || []).some((topic) => (current.topics || []).includes(topic))
    )

    return [...sameAuthor, ...sharesTopic].slice(0, limit)
}

/** True where the document itself carries a publisher copyright notice. */
export function isPublisherCopyrighted(book) {
    return book?.rights === 'publisher-copyright'
}
