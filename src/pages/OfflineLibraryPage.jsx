import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Trash2, WifiOff } from 'lucide-react'
import {
    clearOffline,
    listOffline,
    offlineBytes,
    offlineSupported,
    removeOffline,
} from '../lib/offlineLibrary'
import usePageMeta from '../hooks/usePageMeta'
import { Button, EmptyState, PageHeader, SectionHeading } from '../components/ui'
import { useToast } from '../components/Toast'

function formatSize(bytes) {
    if (!bytes) return null
    const mb = bytes / (1024 * 1024)
    return `${mb >= 1 ? mb.toFixed(1) : (bytes / 1024).toFixed(0)} ${mb >= 1 ? 'MB' : 'KB'}`
}

/**
 * What is actually on this phone.
 *
 * The library is over ninety megabytes of PDFs, which is more than many readers
 * want to spend data on at once — so nothing is downloaded unless it is asked
 * for, and this screen is the honest list of what has been.
 */
export default function OfflineLibraryPage() {
    const navigate = useNavigate()
    const toast = useToast()
    const [items, setItems] = useState(() => listOffline())
    const supported = offlineSupported()
    const bytes = useMemo(() => offlineBytes(), [items]) // eslint-disable-line react-hooks/exhaustive-deps

    usePageMeta({
        title: 'Saved offline',
        description: 'The library documents kept on this device, readable with no data connection.',
        path: '/library/offline',
    })

    const remove = async (slug) => {
        await removeOffline(slug)
        setItems(listOffline())
        toast?.success?.('Removed from this device')
    }

    const emptyAll = async () => {
        await clearOffline()
        setItems([])
        toast?.success?.('The offline shelf is empty')
    }

    return (
        <div className="zs-container">
            <button type="button" className="zs-back" onClick={() => navigate('/library')}>
                <ArrowLeft size={16} /> Library
            </button>

            <PageHeader
                eyebrow={
                    <>
                        <WifiOff size={13} /> Works with no data
                    </>
                }
                title="Saved offline"
                lead={
                    items.length > 0
                        ? `${items.length} ${items.length === 1 ? 'document' : 'documents'} kept on this device${formatSize(bytes) ? ` · ${formatSize(bytes)}` : ''}. They open with no connection.`
                        : 'Documents you keep on this device open with no connection at all.'
                }
            />

            {!supported ? (
                <EmptyState icon={WifiOff} title="This browser cannot keep files offline">
                    Open ZikShare in Chrome, Safari or Edge on your phone, and files can be saved here
                    for reading with no data.
                </EmptyState>
            ) : items.length === 0 ? (
                <EmptyState
                    icon={WifiOff}
                    title="Nothing saved yet"
                    action={
                        <Button size="sm" onClick={() => navigate('/library')}>
                            Browse the shelves
                        </Button>
                    }
                >
                    Open any document and tap <strong>Save offline</strong>. It is kept on this phone, not
                    on a server, and you can remove it at any time.
                </EmptyState>
            ) : (
                <section className="zs-section" aria-labelledby="offline-list">
                    <SectionHeading
                        id="offline-list"
                        title="On this device"
                        description="Kept in this browser only. Clearing your browser data removes them."
                        action={
                            <Button size="sm" variant="outline" onClick={emptyAll}>
                                <Trash2 size={14} /> Remove all
                            </Button>
                        }
                    />

                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {items.map((entry) => (
                            <div key={entry.slug} className="zs-panel" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <strong style={{ display: 'block', fontSize: 'var(--zs-fs-small)', lineHeight: 1.3 }}>
                                        {entry.title || entry.slug}
                                    </strong>
                                    <span style={{ fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                        {[entry.author, entry.pages ? `${entry.pages} pages` : null, formatSize(entry.size)]
                                            .filter(Boolean)
                                            .join(' · ')}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className="zs-btn zs-btn--primary zs-btn--sm"
                                    onClick={() => navigate(`/library/doc/${entry.slug}/read`)}
                                >
                                    <BookOpen size={13} /> Read
                                </button>
                                <button
                                    type="button"
                                    className="zs-icon-btn"
                                    onClick={() => remove(entry.slug)}
                                    aria-label={`Remove ${entry.title || entry.slug} from this device`}
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
