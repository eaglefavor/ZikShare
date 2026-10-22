import { useState } from 'react'

/**
 * A book cover with an honest fallback.
 *
 * The cover is a rendered image of the book's own first page. If that image
 * cannot load — a stale deploy, a blocked request — we show a typographic
 * cover built from the same title and author rather than a broken image icon.
 * The fallback never invents a cover the book does not have; it names the book.
 */
export default function BookCover({ src, title, author, alt, style, width = '100%' }) {
    const [failed, setFailed] = useState(false)

    if (failed || !src) {
        return (
            <div
                role="img"
                aria-label={alt || `Cover of ${title}`}
                style={{
                    width,
                    aspectRatio: '3 / 4',
                    borderRadius: '0.75rem',
                    border: '1px solid #1E293B',
                    background: 'linear-gradient(150deg, #0F172A 0%, #1E3A8A 55%, #0F172A 100%)',
                    color: '#F8FAFC',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '0.9rem',
                    boxSizing: 'border-box',
                    ...style
                }}
            >
                <div style={{ width: '2rem', height: '3px', backgroundColor: '#D4AF37', borderRadius: '2px' }} />
                <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, lineHeight: 1.3 }}>{title}</div>
                    {author && (
                        <div style={{ marginTop: '0.4rem', fontSize: '0.68rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#CBD5E1' }}>
                            {author}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <img
            src={src}
            alt={alt || `Cover of ${title}`}
            loading="lazy"
            onError={() => setFailed(true)}
            style={{
                width,
                aspectRatio: '3 / 4',
                objectFit: 'cover',
                objectPosition: 'top center',
                borderRadius: '0.75rem',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                display: 'block',
                ...style
            }}
        />
    )
}
