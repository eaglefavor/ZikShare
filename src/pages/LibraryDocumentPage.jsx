import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    ArrowLeft,
    BookOpen,
    Check,
    Play,
    Download,
    ExternalLink,
    FileText,
    Share2,
    ShieldAlert,
} from 'lucide-react'
import { mergeLibraryMaterials } from '../lib/fresherLibrary'
import { shelfGaps, shelfInfo } from '../lib/shelfGuide'
import {
    documentLink,
    documentPath,
    documentSlug,
    findDocumentBySlug,
    relatedDocuments,
    shelfPath,
} from '../lib/libraryRoutes'
import { useToast } from '../components/Toast'
import OfflineButton from '../components/OfflineButton'
import { getProgress, progressPercent } from '../lib/readingProgress'
import usePageMeta from '../hooks/usePageMeta'
import { Tag } from '../components/ui'
import BookCover from '../components/BookCover'
import LibraryCard from '../components/LibraryCard'

/** The terms each shelf is hosted under, stated on the document's own page. */
const RIGHTS_NOTE = {
    'GST & Compulsory Courses':
        'This is a NOUN course manual, published by the National Open University of Nigeria and hosted here free of charge. NOUN permits educational use and prohibits commercial use; the copyright stays with NOUN.',
    'Money & Career':
        'This is a NOUN course manual, published by the National Open University of Nigeria and hosted here free of charge. NOUN permits educational use and prohibits commercial use; the copyright stays with NOUN.',
    'Greek Tragedy':
        'The play is in the public domain; this English translation is too. The edition and translator are credited above and inside the file. ZikShare typeset it, and nothing here restricts your use of the text.',
    'Roman Theatre':
        'The play is in the public domain; this English translation is too. The edition and translator are credited above and inside the file. ZikShare typeset it, and nothing here restricts your use of the text.',
    'Medieval Theatre':
        'The play is in the public domain; this English translation is too. The edition and translator are credited above and inside the file. ZikShare typeset it, and nothing here restricts your use of the text.',
    'Renaissance Theatre':
        'The play is in the public domain; the anthology this text is taken from is out of copyright as well. The edition is credited above and inside the file.',
    'Modern Theatre':
        'The play is in the public domain in the edition ZikShare holds, and so is the translation. The edition and translator are credited above and inside the file.',
    'Theatre Arts':
        'Public-domain text or a ZikShare guide — the badge at the top of this page says which. A guide was written for this library and carries no restrictions; a text is out of copyright, with its edition credited inside the file.',
    'Christian Books':
        'This is a third-party work: copyright in the text and in this edition stays with the author and publisher. ZikShare hosts it for free reading and claims no licence over it.',
}

function formatSize(bytes) {
    if (!bytes) return null
    const mb = bytes / (1024 * 1024)
    return `${mb >= 1 ? mb.toFixed(1) : (bytes / 1024).toFixed(0)} ${mb >= 1 ? 'MB' : 'KB'}`
}

function copyToClipboard(text) {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
    const area = document.createElement('textarea')
    area.value = text
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    document.body.removeChild(area)
    return Promise.resolve()
}

export default function LibraryDocumentPage() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const toast = useToast()
    const [copied, setCopied] = useState(false)

    const materials = useMemo(() => mergeLibraryMaterials([]), [])
    const item = useMemo(() => findDocumentBySlug(materials, slug), [materials, slug])
    // Where this reader stopped last time, so they can pick it up rather than
    // starting at page one and paging back to where they were.
    const progress = useMemo(() => (item ? getProgress(documentSlug(item)) : null), [item])

    usePageMeta({
        title: item ? item.title : 'Document not found',
        description: item
            ? `${item.title}${item.author ? ` by ${item.author}` : ''} — free ${item.page_count || ''} page PDF, no sign-in, no payment.`.replace(/\s+/g, ' ')
            : 'There is no document at this address.',
        // A book has a richer page of its own; that one is the canonical address
        // for it, so the search engine does not see the same book twice.
        path: item ? (item.isBook ? `/library/books/${item.slug}` : documentPath(item)) : '/library',
        type: 'book',
    })

    if (!item) {
        return (
            <div className="zs-container">
                <button type="button" className="zs-link" onClick={() => navigate('/library')}>
                    <ArrowLeft size={15} /> Back to the library
                </button>
                <div className="zs-panel" style={{ marginTop: '1rem', textAlign: 'center', maxWidth: '32rem' }}>
                    <FileText size={32} color="var(--color-text-muted)" style={{ margin: '0 auto 0.6rem', display: 'block' }} aria-hidden="true" />
                    <h1 style={{ margin: '0 0 0.4rem', fontSize: 'var(--zs-fs-section)' }}>Document not found</h1>
                    <p style={{ margin: 0, fontSize: 'var(--zs-fs-body)', color: 'var(--color-text-secondary)' }}>
                        There is nothing at this address. The shelf may have changed since the link was shared.
                    </p>
                </div>
            </div>
        )
    }

    const info = shelfInfo(item.domain)
    const size = formatSize(item.file_size_bytes)
    const related = relatedDocuments(materials, item)
    const downloadHref = item.download_path
    const gaps = shelfGaps(item.domain)
    const kindLabel = item.isBook
        ? 'BOOK'
        : item.isGuide
          ? 'GUIDE'
          : item.isTheatre
            ? 'TEXT'
            : item.domain?.includes('Theatre') || item.domain?.includes('Tragedy')
              ? 'PLAY'
              : item.code || 'MANUAL'

    const share = async () => {
        const url = `https://zik-share.vercel.app${documentPath(item)}`
        const text = `${item.title}${item.author ? ` — ${item.author}` : ''} (free PDF, ZikShare)`
        if (navigator.share) {
            try {
                await navigator.share({ title: item.title, text, url })
                return
            } catch (err) {
                if (err.name === 'AbortError') return
            }
        }
        await copyToClipboard(`${text}\n${url}`)
        setCopied(true)
        toast?.success?.('Link copied')
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="zs-container">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '0.5rem' }}>
                <button type="button" className="zs-back" onClick={() => navigate(shelfPath(item.domain))} style={{ marginTop: 0 }}>
                    <ArrowLeft size={15} /> {info.emoji} {item.domain}
                </button>
            </div>

            <article className="zs-panel" style={{ marginTop: '0.5rem' }}>
                <div className="zs-detail">
                    {item.cover_path && (
                        <div className="zs-detail__cover">
                            <BookCover
                                src={item.cover_path}
                                title={item.title}
                                author={item.author}
                                alt={`Cover of ${item.title}`}
                            />
                        </div>
                    )}

                    <div className="zs-detail__body">
                        <h1 className="zs-detail__title">{item.title}</h1>
                        {item.subtitle && <p className="zs-detail__subtitle">{item.subtitle}</p>}

                        <p className="zs-detail__byline">
                            <strong>{item.author || item.department || 'ZikShare'}</strong>
                            {[item.translator && `translated by ${item.translator}`, item.dateLabel || item.year]
                                .filter(Boolean)
                                .length > 0 && (
                                <>
                                    {' · '}
                                    {[item.translator && `translated by ${item.translator}`, item.dateLabel || item.year]
                                        .filter(Boolean)
                                        .join(' · ')}
                                </>
                            )}
                        </p>

                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            <Tag tone={item.isBook ? 'book' : 'pack'}>{kindLabel}</Tag>
                            {item.page_count ? <span className="zs-tag zs-tag--muted">{item.page_count} pages</span> : null}
                            {size && <span className="zs-tag zs-tag--muted">{size} PDF</span>}
                            <span className="zs-tag zs-tag--free">Free</span>
                        </div>

                        <div className="zs-detail__actions">
                            <button
                                type="button"
                                className="zs-btn zs-btn--primary"
                                onClick={() => navigate(`${documentPath(item)}/read`)}
                            >
                                {progress ? <Play size={15} /> : <BookOpen size={15} />}
                                {progress
                                    ? `Continue on page ${progress.page}${progress.total ? ` of ${progress.total}` : ''}`
                                    : 'Read in the app'}
                            </button>
                            <a href={downloadHref} download className="zs-btn zs-btn--green">
                                <Download size={15} /> Download the PDF
                            </a>
                            <OfflineButton item={item} />
                            <button type="button" className="zs-btn zs-btn--outline" onClick={share}>
                                {copied ? <Check size={15} /> : <Share2 size={15} />}
                                {copied ? 'Link copied' : 'Share'}
                            </button>
                        </div>

                        {progress && progress.total ? (
                            <p className="zs-detail__fineprint">
                                You are {progressPercent(progress)}% through this file — page {progress.page} of{' '}
                                {progress.total}. Reading happens in the app, so it stays where you left it.
                            </p>
                        ) : null}

                        <p className="zs-detail__fineprint">
                            No account, no checkout, no payment — download it here or{' '}
                            <a
                                href={downloadHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="zs-link"
                                style={{ display: 'inline-flex', gap: '0.15rem' }}
                            >
                                open the PDF in a new tab <ExternalLink size={11} />
                            </a>
                        </p>
                    </div>
                </div>

                <hr className="zs-divider" />

                <h2 style={{ margin: '0 0 0.4rem', fontSize: 'var(--zs-fs-section)' }}>
                    {item.isBook ? 'About this book' : 'About this document'}
                </h2>
                <p className="zs-prose" style={{ marginBottom: item.context ? '0.85rem' : '1.25rem' }}>
                    {item.body || item.description}
                </p>
                {item.context && (
                    <p className="zs-prose" style={{ marginBottom: '1.25rem', color: 'var(--color-text-secondary)' }}>
                        {item.context}
                    </p>
                )}

                {item.topics?.length > 0 && (
                    <>
                        <h2 style={{ margin: '0 0 0.5rem', fontSize: 'var(--zs-fs-section)' }}>Topics</h2>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                            {item.topics.map((topic) => (
                                <span key={topic} className="zs-tag zs-tag--muted">{topic}</span>
                            ))}
                        </div>
                    </>
                )}

                <h2 style={{ margin: '0 0 0.5rem', fontSize: 'var(--zs-fs-section)' }}>The file</h2>
                <dl className="zs-meta-list">
                    <div>
                        <dt>Pages</dt>
                        <dd>{item.page_count || 'Not recorded'}</dd>
                    </div>
                    <div>
                        <dt>Format</dt>
                        <dd>PDF{size ? `, ${size}` : ''}</dd>
                    </div>
                    <div>
                        <dt>Shelf</dt>
                        <dd>
                            <button type="button" className="zs-link" onClick={() => navigate(shelfPath(item.domain))}>
                                {item.domain}
                            </button>
                        </dd>
                    </div>
                    {item.code && (
                        <div>
                            <dt>Course code</dt>
                            <dd>{item.code}</dd>
                        </div>
                    )}
                    {item.kind && (
                        <div>
                            <dt>Kind</dt>
                            <dd>{item.kind}</dd>
                        </div>
                    )}
                    {(item.sourceEdition || item.sourceName) && (
                        <div>
                            <dt>Edition</dt>
                            <dd>{[item.sourceEdition, item.sourceName].filter(Boolean).join(' · ')}</dd>
                        </div>
                    )}
                    <div>
                        <dt>Download</dt>
                        <dd>
                            <a href={downloadHref} className="zs-link" target="_blank" rel="noopener noreferrer">
                                {downloadHref}
                            </a>
                        </dd>
                    </div>
                </dl>

                <div className="zs-notice" style={{ marginTop: '1.25rem' }}>
                    <ShieldAlert size={15} style={{ flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true" />
                    <p style={{ margin: 0 }}>{RIGHTS_NOTE[item.domain] || RIGHTS_NOTE['Christian Books']}</p>
                </div>

                {gaps && (
                    <p className="zs-details__lead" style={{ marginTop: '0.9rem' }}>
                        Not every title on this shelf could be hosted.{' '}
                        <button type="button" className="zs-link" onClick={() => navigate(shelfPath(item.domain))}>
                            See what {item.domain} does not include
                        </button>
                        .
                    </p>
                )}
            </article>

            {related.length > 0 && (
                <section style={{ marginTop: '1.75rem' }} aria-labelledby="related-docs">
                    <h2 id="related-docs" style={{ margin: '0 0 0.75rem', fontSize: 'var(--zs-fs-section)' }}>
                        {related[0].author === item.author && item.author
                            ? `More by ${item.author}`
                            : `More on the ${item.domain} shelf`}
                    </h2>
                    <div className="zs-grid">
                        {related.map((other) => (
                            <LibraryCard
                                key={other.id}
                                item={other}
                                onOpen={(doc) => navigate(documentLink(doc))}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
