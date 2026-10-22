import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Download, BookOpen, ShieldAlert, FileText, ExternalLink } from 'lucide-react'
import { findBookBySlug, findRelatedBooks, toBookCard, CHRISTIAN_BOOKS_DOMAIN } from '../lib/christianBooks'
import BookCover from '../components/BookCover'

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

    if (!book) {
        return (
            <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1rem 4rem' }}>
                <button
                    onClick={() => navigate('/library')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: '#1E40AF', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', padding: 0, marginBottom: '1.5rem' }}
                >
                    <ArrowLeft size={16} /> Back to the library
                </button>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.875rem', padding: '2rem', textAlign: 'center' }}>
                    <BookOpen size={40} color="#94A3B8" style={{ margin: '0 auto 0.75rem', display: 'block' }} />
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>Book not found</h2>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>
                        There is no book at this address. The shelf may have been changed since the link was shared.
                    </p>
                </div>
            </div>
        )
    }

    const card = toBookCard(book)
    const size = formatSize(book.file_size_bytes)
    const related = findRelatedBooks(book.slug)

    return (
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '1.5rem 1rem 4rem' }}>
            <button
                onClick={() => navigate('/library')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: '#1E40AF', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', padding: 0, marginBottom: '1.25rem' }}
            >
                <ArrowLeft size={16} /> Back to the {CHRISTIAN_BOOKS_DOMAIN} shelf
            </button>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    <div style={{ width: '190px', flexShrink: 0 }}>
                        <BookCover
                            src={card.cover_path}
                            title={book.title}
                            author={book.author}
                            alt={`Cover of ${book.title}`}
                        />
                    </div>

                    <div style={{ flex: '1 1 280px', minWidth: 0 }}>
                        <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#7C1D3F', backgroundColor: '#FDF2F8', border: '1px solid #FBCFE8', borderRadius: '9999px', padding: '0.15rem 0.6rem', marginBottom: '0.6rem' }}>
                            {CHRISTIAN_BOOKS_DOMAIN}
                        </span>

                        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.25, margin: '0 0 0.35rem' }}>
                            {book.title}
                        </h1>
                        {book.subtitle && (
                            <p style={{ fontSize: '0.95rem', color: '#475569', margin: '0 0 0.75rem', lineHeight: 1.45 }}>{book.subtitle}</p>
                        )}

                        <p style={{ fontSize: '0.9rem', color: '#0F172A', fontWeight: 700, margin: '0 0 0.25rem' }}>{book.author}</p>
                        <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1rem' }}>
                            {[book.publisher, book.year].filter(Boolean).join(' · ')}
                        </p>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', fontWeight: 700, color: '#334155', backgroundColor: '#F1F5F9', borderRadius: '9999px', padding: '0.2rem 0.6rem' }}>
                                <FileText size={12} /> {book.page_count} pages
                            </span>
                            {size && (
                                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#334155', backgroundColor: '#F1F5F9', borderRadius: '9999px', padding: '0.2rem 0.6rem' }}>
                                    {size} PDF
                                </span>
                            )}
                            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#047857', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '9999px', padding: '0.2rem 0.6rem' }}>
                                Free — no fee, no checkout
                            </span>
                        </div>

                        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => navigate(`/library/books/${book.slug}/read`)}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', backgroundColor: '#1E40AF', color: '#FFFFFF', border: 'none', padding: '0.65rem 1.1rem', borderRadius: '0.625rem', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer' }}
                            >
                                <BookOpen size={16} /> Start reading
                            </button>
                            <a
                                href={card.download_path}
                                download
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', backgroundColor: '#F0FDF4', color: '#065F46', border: '1.5px solid #10B981', padding: '0.65rem 1.1rem', borderRadius: '0.625rem', fontSize: '0.85rem', fontWeight: 800, textDecoration: 'none' }}
                            >
                                <Download size={16} /> Download the PDF
                            </a>
                        </div>
                        <p style={{ fontSize: '0.72rem', color: '#94A3B8', margin: '0.6rem 0 0' }}>
                            Reading happens here in the browser. No account and no payment are required.{' '}
                            <a href={card.download_path} target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>
                                Open the PDF in a new tab <ExternalLink size={11} style={{ display: 'inline', verticalAlign: '-1px' }} />
                            </a>
                        </p>
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', margin: '1.5rem 0' }} />

                <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>About this book</h2>
                <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6, margin: '0 0 1.25rem' }}>{book.description}</p>

                {book.topics?.length > 0 && (
                    <>
                        <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>Topics</h2>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                            {book.topics.map((topic) => (
                                <span key={topic} style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0F766E', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '9999px', padding: '0.2rem 0.6rem' }}>
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </>
                )}

                <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '0.75rem', padding: '0.85rem' }}>
                    <ShieldAlert size={16} color="#B45309" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '0.75rem', color: '#92400E', lineHeight: 1.5, margin: 0 }}>
                        {RIGHTS_NOTE[book.rights] || RIGHTS_NOTE.unverified}
                    </p>
                </div>
            </div>

            {/* Same author first, then books that share a subject. Hidden when
                the shelf genuinely has nothing related. */}
            {related.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.75rem' }}>
                        More on this shelf
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem' }}>
                        {related.map((other) => (
                            <button
                                key={other.slug}
                                onClick={() => navigate(`/library/books/${other.slug}`)}
                                style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', textAlign: 'left', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '0.75rem', cursor: 'pointer', font: 'inherit' }}
                            >
                                <div style={{ width: '58px', flexShrink: 0 }}>
                                    <BookCover
                                        src={toBookCard(other).cover_path}
                                        title={other.title}
                                        author={other.author}
                                        alt={`Cover of ${other.title}`}
                                        style={{ borderRadius: '0.375rem' }}
                                    />
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>{other.title}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '0.2rem' }}>{other.author}</div>
                                    <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '0.25rem' }}>{other.page_count} pages · Free</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
