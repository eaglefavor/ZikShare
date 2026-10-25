import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Download, BookOpen, ShieldAlert, ExternalLink } from 'lucide-react'
import { findBookBySlug, findRelatedBooks, toBookCard, CHRISTIAN_BOOKS_DOMAIN } from '../lib/christianBooks'
import BookCover from '../components/BookCover'
import usePageMeta from '../hooks/usePageMeta'

const RIGHTS_NOTE = {
    'publisher-copyright': 'The edition in this file carries a publisher copyright notice. Rights in the text and this edition remain with the publisher; ZikShare hosts it for reading and does not claim any licence over it.',
    'edition-claims-public-domain': 'This edition states that its text is in the public domain. That claim comes from the file itself and has not been independently verified.',
    unverified: 'This file carries no copyright notice. Its rights status has not been established, so nothing here should be read as a licence.',
}

function formatSize(bytes) {
    if (!bytes) return null
    const mb = bytes / (1024 * 1024)
    return `${mb >= 1 ? mb.toFixed(1) : (bytes / 1024).toFixed(0)} ${mb >= 1 ? 'MB' : 'KB'}`
}

export default function BookDetailPage() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const book = findBookBySlug(slug)

    usePageMeta({
        title: book ? book.title : 'Book not found',
        description: book
            ? `${book.title} by ${book.author} — ${book.page_count} pages, free to read or download as a PDF.`
            : 'There is no book at this address.',
        path: `/library/books/${slug}`,
        type: 'book',
    })

    if (!book) {
        return (
            <div className="zs-container">
                <button type="button" className="zs-link" onClick={() => navigate('/library')}>
                    <ArrowLeft size={15} /> Back to the library
                </button>
                <div className="zs-panel" style={{ marginTop: '1rem', textAlign: 'center', maxWidth: '32rem' }}>
                    <BookOpen size={32} color="var(--color-text-muted)" style={{ margin: '0 auto 0.6rem', display: 'block' }} aria-hidden="true" />
                    <h1 style={{ margin: '0 0 0.4rem', fontSize: 'var(--zs-fs-section)' }}>Book not found</h1>
                    <p style={{ margin: 0, fontSize: 'var(--zs-fs-body)', color: 'var(--color-text-secondary)' }}>
                        There is no book at this address. The shelf may have changed since the link was shared.
                    </p>
                </div>
            </div>
        )
    }

    const card = toBookCard(book)
    const size = formatSize(book.file_size_bytes)
    const related = findRelatedBooks(book.slug)

    return (
        <div className="zs-container">
            <button type="button" className="zs-link" onClick={() => navigate('/library')}>
                <ArrowLeft size={15} /> Back to the {CHRISTIAN_BOOKS_DOMAIN} shelf
            </button>

            <article className="zs-panel" style={{ marginTop: '0.75rem' }}>
                <div className="zs-detail">
                    <div className="zs-detail__cover">
                        <BookCover
                            src={card.cover_path}
                            title={book.title}
                            author={book.author}
                            alt={`Cover of ${book.title}`}
                        />
                    </div>

                    <div className="zs-detail__body">
                        <span className="zs-tag zs-tag--book" style={{ alignSelf: 'flex-start' }}>
                            {CHRISTIAN_BOOKS_DOMAIN}
                        </span>

                        <h1 className="zs-detail__title">{book.title}</h1>
                        {book.subtitle && <p className="zs-detail__subtitle">{book.subtitle}</p>}

                        <p className="zs-detail__byline">
                            <strong>{book.author}</strong>
                            {[book.publisher, book.year].filter(Boolean).length > 0 && (
                                <> · {[book.publisher, book.year].filter(Boolean).join(' · ')}</>
                            )}
                        </p>

                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            <span className="zs-tag zs-tag--muted">{book.page_count} pages</span>
                            {size && <span className="zs-tag zs-tag--muted">{size} PDF</span>}
                            <span className="zs-tag zs-tag--free">Free</span>
                        </div>

                        <div className="zs-detail__actions">
                            <button
                                type="button"
                                className="zs-btn zs-btn--primary"
                                onClick={() => navigate(`/library/books/${book.slug}/read`)}
                            >
                                <BookOpen size={15} /> Start reading
                            </button>
                            <a href={card.download_path} download className="zs-btn zs-btn--green">
                                <Download size={15} /> Download the PDF
                            </a>
                        </div>

                        <p className="zs-detail__fineprint">
                            No account, no checkout, no payment — read it here or{' '}
                            <a href={card.download_path} target="_blank" rel="noopener noreferrer" className="zs-link" style={{ display: 'inline-flex', gap: '0.15rem' }}>
                                open the PDF in a new tab <ExternalLink size={11} />
                            </a>
                        </p>
                    </div>
                </div>

                <hr className="zs-divider" />

                <h2 style={{ margin: '0 0 0.4rem', fontSize: 'var(--zs-fs-section)' }}>About this book</h2>
                <p className="zs-prose" style={{ marginBottom: '1.25rem' }}>{book.description}</p>

                {book.topics?.length > 0 && (
                    <>
                        <h2 style={{ margin: '0 0 0.5rem', fontSize: 'var(--zs-fs-section)' }}>Topics</h2>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                            {book.topics.map((topic) => (
                                <span key={topic} className="zs-tag zs-tag--muted">{topic}</span>
                            ))}
                        </div>
                    </>
                )}

                <div className="zs-notice">
                    <ShieldAlert size={15} style={{ flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true" />
                    <p style={{ margin: 0 }}>{RIGHTS_NOTE[book.rights] || RIGHTS_NOTE.unverified}</p>
                </div>
            </article>

            {/* Same author first, then books that share a subject. Hidden when
                the shelf genuinely has nothing related. */}
            {related.length > 0 && (
                <section style={{ marginTop: '1.75rem' }} aria-labelledby="related-books">
                    <h2 id="related-books" style={{ margin: '0 0 0.75rem', fontSize: 'var(--zs-fs-section)' }}>
                        More on this shelf
                    </h2>
                    <div className="zs-grid zs-grid--wide">
                        {related.map((other) => (
                            <button
                                key={other.slug}
                                type="button"
                                onClick={() => navigate(`/library/books/${other.slug}`)}
                                className="zs-item-card"
                                style={{ flexDirection: 'row', alignItems: 'flex-start', textAlign: 'left', gap: '0.7rem', font: 'inherit' }}
                            >
                                <div style={{ width: '3.6rem', flexShrink: 0 }}>
                                    <BookCover
                                        src={toBookCard(other).cover_path}
                                        title={other.title}
                                        author={other.author}
                                        alt={`Cover of ${other.title}`}
                                    />
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <p className="zs-item-card__title" style={{ fontSize: 'var(--zs-fs-small)' }}>{other.title}</p>
                                    <p className="zs-item-card__sub">{other.author}</p>
                                    <p className="zs-item-card__sub" style={{ marginTop: '0.2rem' }}>
                                        {other.page_count} pages · Free
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
