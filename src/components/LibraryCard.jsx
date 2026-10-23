import { BookOpen, Download } from 'lucide-react'
import { Tag } from './ui'
import BookCover from './BookCover'

/**
 * The one card for a library document, used by Home, Library and Search.
 *
 * Three facts, in this order: what it is (badge + pages), what it covers
 * (title + author or department), how to open it (one download control).
 * Every document here is a file ZikShare hosts, so the card never sends a
 * reader to another website to read it.
 */
export default function LibraryCard({ item, onOpen }) {
    const href = item.isBook ? `/library/books/${item.slug}` : item.download_path
    const isPlay = Boolean(
        item.isDrama || item.isRoman || item.isMedieval || item.isRenaissance || item.isModern
    )

    return (
        <article className="zs-item-card" style={{ padding: 0, overflow: 'hidden' }}>
            {item.isBook && (
                <div onClick={() => onOpen(item)} style={{ cursor: 'pointer', padding: '0.75rem 0.75rem 0' }}>
                    <BookCover
                        src={item.cover_path}
                        title={item.title}
                        author={item.author}
                        style={{ borderRadius: '0.5rem' }}
                    />
                </div>
            )}

            <div style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                <div className="zs-item-card__top">
                    <Tag tone={item.isBook ? 'book' : 'pack'}>
                        {item.isBook
                            ? 'BOOK'
                            : item.code || (isPlay ? 'PLAY' : 'PACK')}
                    </Tag>
                    <span className="zs-item-card__sub" style={{ marginLeft: 'auto' }}>
                        {item.page_count} pages
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => onOpen(item)}
                    style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', font: 'inherit' }}
                >
                    <span className="zs-item-card__title" style={{ display: 'block' }}>
                        {item.title}
                    </span>
                </button>

                <p className="zs-item-card__sub">
                    {item.isBook || isPlay ? item.author : item.department}
                </p>

                <p className="zs-item-card__desc">{item.description}</p>

                <div className="zs-item-card__foot">
                    <Tag tone="free">Free</Tag>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {item.preview_path && (
                            <a
                                href={item.preview_path}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none' }}
                            >
                                Preview
                            </a>
                        )}
                        <a
                            href={href}
                            download={!item.isBook}
                            target={item.isBook ? undefined : '_blank'}
                            rel={item.isBook ? undefined : 'noopener noreferrer'}
                            className="zs-btn zs-btn--primary zs-btn--sm"
                        >
                            {item.isBook ? <BookOpen size={13} /> : <Download size={13} />}
                            {item.isBook ? 'Read book' : 'Download Free PDF'}
                        </a>
                    </div>
                </div>
            </div>
        </article>
    )
}
