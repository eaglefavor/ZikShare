import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Download,
    ExternalLink,
    Loader2,
    AlertTriangle,
    ZoomIn,
    ZoomOut,
} from 'lucide-react'
import { findBookBySlug, findRelatedBooks } from '../lib/christianBooks'
import { mergeLibraryMaterials } from '../lib/fresherLibrary'
import {
    documentPath,
    documentSlug,
    findDocumentBySlug,
    relatedDocuments,
} from '../lib/libraryRoutes'
import { getProgress, recordProgress } from '../lib/readingProgress'
import {
    openPdfDocument,
    renderPdfPage,
    naturalPageWidth,
} from '../lib/pdfReader'

const MIN_SCALE = 0.5
const MAX_SCALE = 3
const SCALE_STEP = 0.2

/**
 * The reader itself. It used to be book-only, which meant 301 of the 309
 * documents opened in the phone's PDF viewer instead — leaving the app, and
 * losing the page you were on. It now takes any document: a title, a file, the
 * page that describes it, and whatever to open next.
 */
function BookReader({ doc, pdfPath, backPath, backLabel, nextDoc, nextPath, isBook }) {
    const navigate = useNavigate()

    const canvasRef = useRef(null)
    const stageRef = useRef(null)
    const docRef = useRef(null)
    const renderChain = useRef(Promise.resolve())

    const [status, setStatus] = useState('loading')
    const [error, setError] = useState('')
    const [numPages, setNumPages] = useState(0)
    const [page, setPage] = useState(1)
    const [scale, setScale] = useState(1.4)

    // Load the document once per book. This component is remounted per slug, so
    // the initial state already means "loading": nothing is reset synchronously.
    useEffect(() => {
        let cancelled = false
        docRef.current = null

        openPdfDocument(pdfPath)
            .then((pdf) => {
                if (cancelled) return
                docRef.current = pdf
                setNumPages(pdf.numPages)

                // `doc` is the catalogue record; `pdf` is the file. They were both
                // called doc once, and the promise callback shadowed the prop.
                const saved = getProgress(doc.slug)
                const start = saved?.page && saved.page <= pdf.numPages ? saved.page : 1
                setPage(start)

                return naturalPageWidth(pdf, start).then((width) => {
                    if (cancelled) return
                    // The page stage only mounts once the document is ready, so
                    // measure the viewport as the fallback: a phone must get a
                    // page that fits, not a 640px page it has to scroll.
                    const viewport = typeof window !== 'undefined' ? window.innerWidth - 24 : 640
                    const available = stageRef.current?.clientWidth || viewport
                    const fit = Math.max(MIN_SCALE, Math.min(MAX_SCALE, available / width))
                    setScale(Number(fit.toFixed(2)))
                    setStatus('ready')
                })
            })
            .catch((err) => {
                if (cancelled) return
                setError(err?.message || 'The reader could not open this file')
                setStatus('error')
            })

        return () => {
            cancelled = true
        }
    }, [doc, pdfPath])

    // Draw the current page. Renders are serialised so a fast page flip cannot
    // draw two pages into the same canvas at once.
    useEffect(() => {
        if (status !== 'ready' || !docRef.current) return
        const doc = docRef.current
        const ratio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

        renderChain.current = renderChain.current
            .then(() => renderPdfPage(doc, page, canvasRef.current, { scale, devicePixelRatio: ratio }))
            .catch(() => {
                // A cancelled or superseded render is not an error the reader needs
            })

        recordProgress({
            slug: doc.slug,
            page,
            total: numPages,
            title: doc.title,
            author: doc.author,
            path: backPath,
        })
    }, [status, page, scale, doc, numPages, backPath])

    const goToPage = useCallback(
        (next) => {
            if (!numPages) return
            setPage((current) => Math.min(numPages, Math.max(1, Math.floor(next) || current)))
        },
        [numPages]
    )

    const zoom = useCallback((direction) => {
        setScale((current) => {
            const next = current + direction * SCALE_STEP
            return Number(Math.min(MAX_SCALE, Math.max(MIN_SCALE, next)).toFixed(2))
        })
    }, [])

    // Arrow keys and Page Up/Down, the way a document viewer behaves.
    useEffect(() => {
        const onKey = (event) => {
            if (event.target instanceof HTMLInputElement) return
            if (event.key === 'ArrowRight' || event.key === 'PageDown') {
                event.preventDefault()
                goToPage(page + 1)
            } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
                event.preventDefault()
                goToPage(page - 1)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [goToPage, page])

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0F172A', paddingBottom: '5rem' }}>
            {/* Reader bar: title, page counter, and a way out */}
            <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#0F172A', borderBottom: '1px solid #1E293B', padding: '0.65rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <button
                    onClick={() => navigate(backPath)}
                    aria-label={backLabel}
                    style={{ width: '2.1rem', height: '2.1rem', borderRadius: '9999px', backgroundColor: '#1E293B', border: 'none', color: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                >
                    <ArrowLeft size={16} />
                </button>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ color: '#F8FAFC', fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {doc.title}
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: '0.68rem' }}>
                        {doc.author}
                        {numPages ? ` · ${numPages} pages` : ''}
                    </div>
                </div>
                <a
                    href={pdfPath}
                    download
                    aria-label="Download this file"
                    style={{ width: '2.1rem', height: '2.1rem', borderRadius: '9999px', backgroundColor: '#1E40AF', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                    <Download size={16} />
                </a>
                {nextDoc && (
                    <button
                        type="button"
                        onClick={() => navigate(nextPath)}
                        aria-label={`Read ${nextDoc.title} next`}
                        title={`Next: ${nextDoc.title}`}
                        style={{ width: '2.1rem', height: '2.1rem', borderRadius: '9999px', backgroundColor: '#1E293B', border: '1px solid #334155', color: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}
                    >
                        <ChevronRight size={16} />
                    </button>
                )}
            </div>

            {status === 'loading' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '4rem 1rem', color: '#CBD5E1' }}>
                    <Loader2 size={26} className="animate-spin" />
                    <span style={{ fontSize: '0.82rem' }}>Opening the document…</span>
                </div>
            )}

            {status === 'error' && (
                <div style={{ maxWidth: '520px', margin: '2.5rem auto', backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '0.875rem', padding: '1.25rem', color: '#E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <AlertTriangle size={18} color="#F59E0B" />
                        <strong style={{ fontSize: '0.9rem' }}>The reader could not draw this file</strong>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: '0 0 0.9rem', lineHeight: 1.5 }}>
                        {error}. The file itself is fine — open it directly or download it instead.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <a href={pdfPath} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#1E40AF', color: '#FFFFFF', padding: '0.55rem 0.9rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}>
                            <ExternalLink size={14} /> Open the PDF
                        </a>
                        <a href={pdfPath} download style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#F0FDF4', color: '#065F46', border: '1.5px solid #10B981', padding: '0.55rem 0.9rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}>
                            <Download size={14} /> Download
                        </a>
                    </div>
                </div>
            )}

            {status === 'ready' && (
                <>
                    <div ref={stageRef} style={{ display: 'flex', justifyContent: 'center', padding: '0.75rem 0.5rem 1rem', overflowX: 'auto' }}>
                        <canvas
                            ref={canvasRef}
                            aria-label={`Page ${page} of ${numPages} of ${doc.title}`}
                            style={{ backgroundColor: '#FFFFFF', borderRadius: '0.25rem', boxShadow: '0 10px 25px -8px rgba(0,0,0,0.7)' }}
                        />
                    </div>

                    {/* Page controls */}
                    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#0F172A', borderTop: '1px solid #1E293B', padding: '0.5rem 0.75rem calc(0.5rem + env(safe-area-inset-bottom))', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => goToPage(page - 1)}
                            disabled={page <= 1}
                            aria-label="Previous page"
                            style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', border: '1px solid #334155', backgroundColor: '#1E293B', color: page <= 1 ? '#475569' : '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#CBD5E1', fontSize: '0.78rem' }}>
                            <input
                                type="number"
                                min={1}
                                max={numPages}
                                value={page}
                                onChange={(e) => goToPage(Number(e.target.value))}
                                aria-label="Page number"
                                style={{ width: '3.5rem', padding: '0.35rem', borderRadius: '0.4rem', border: '1px solid #334155', backgroundColor: '#1E293B', color: '#F8FAFC', fontSize: '0.8rem', textAlign: 'center' }}
                            />
                            <span>of {numPages}</span>
                        </label>

                        <button
                            onClick={() => goToPage(page + 1)}
                            disabled={page >= numPages}
                            aria-label="Next page"
                            style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', border: '1px solid #334155', backgroundColor: '#1E293B', color: page >= numPages ? '#475569' : '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: page >= numPages ? 'not-allowed' : 'pointer' }}
                        >
                            <ChevronRight size={18} />
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(backPath)}
                            style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', padding: '0 0.25rem' }}
                        >
                            {isBook ? 'Book details' : 'Document details'}
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginLeft: '0.25rem' }}>
                            <button onClick={() => zoom(-1)} aria-label="Zoom out" style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', border: '1px solid #334155', backgroundColor: '#1E293B', color: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <ZoomOut size={16} />
                            </button>
                            <span style={{ color: '#94A3B8', fontSize: '0.72rem', minWidth: '2.6rem', textAlign: 'center' }}>{Math.round(scale * 100)}%</span>
                            <button onClick={() => zoom(1)} aria-label="Zoom in" style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', border: '1px solid #334155', backgroundColor: '#1E293B', color: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <ZoomIn size={16} />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

/**
 * `/library/books/:slug/read` and `/library/doc/:slug/read` both land here: a
 * book uses its book page, every other document uses the page built for it.
 */
export default function BookReaderPage() {
    const { slug } = useParams()
    const navigate = useNavigate()

    const book = findBookBySlug(slug)
    const materials = book ? [] : mergeLibraryMaterials([])
    const doc = book ? null : findDocumentBySlug(materials, slug)

    if (!book && !doc) {
        return (
            <div style={{ maxWidth: '640px', margin: '0 auto', padding: '2rem 1rem' }}>
                <button
                    onClick={() => navigate('/library')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: '#1E40AF', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', padding: 0, marginBottom: '1.5rem' }}
                >
                    <ArrowLeft size={16} /> Back to the library
                </button>
                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.875rem', padding: '2rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#0F172A' }}>Document not found</h2>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>There is no document at this address.</p>
                </div>
            </div>
        )
    }

    if (book) {
        const nextBook = findRelatedBooks(book.slug, 1)[0] || null
        // Keyed so moving to a different document starts a clean reader rather
        // than showing the previous one's page for a moment.
        return (
            <BookReader
                key={book.slug}
                doc={book}
                isBook
                pdfPath={book.download_path || `/library/books/${book.slug}.pdf`}
                backPath={`/library/books/${book.slug}`}
                backLabel="Back to the book page"
                nextDoc={nextBook}
                nextPath={nextBook ? `/library/books/${nextBook.slug}/read` : null}
            />
        )
    }

    const next = relatedDocuments(materials, doc, 1)[0] || null
    return (
        <BookReader
            key={documentSlug(doc)}
            doc={doc}
            isBook={false}
            pdfPath={doc.download_path}
            backPath={documentPath(doc)}
            backLabel="Back to the document page"
            nextDoc={next}
            nextPath={next ? `/library/doc/${documentSlug(next)}/read` : null}
        />
    )
}
