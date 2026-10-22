import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Heart, Package, FileText } from 'lucide-react'
import { getSavedIds, removeSaved } from '../lib/savedItems'
import { getListing } from '../lib/database'
import { Button, EmptyState, PageHeader } from '../components/ui'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(Number(amount) || 0)
}

export default function SavedItemsPage() {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        async function loadSavedItems() {
            setLoading(true)
            const ids = getSavedIds()
            if (ids.length === 0) {
                if (isMounted) {
                    setItems([])
                    setLoading(false)
                }
                return
            }

            const fetched = []
            for (const id of ids) {
                try {
                    const item = await getListing(id)
                    if (item) fetched.push(item)
                } catch {
                    // The listing may have been removed since it was saved.
                }
            }
            if (isMounted) {
                setItems(fetched)
                setLoading(false)
            }
        }

        loadSavedItems()
        return () => {
            isMounted = false
        }
    }, [])

    function handleRemove(id) {
        removeSaved(id)
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <div className="zs-container">
            <PageHeader
                eyebrow="Account"
                title="Saved items"
                lead={
                    items.length > 0
                        ? `${items.length} listing${items.length === 1 ? '' : 's'} kept for later. Saving is local to this browser.`
                        : 'Listings you keep for later show up here. Saving is local to this browser.'
                }
            />

            {loading ? (
                <div className="zs-panel" style={{ display: 'flex', justifyContent: 'center', padding: '2.5rem 0' }}>
                    <Loader2 size={24} className="animate-spin" color="var(--color-brand)" aria-label="Loading saved items" />
                </div>
            ) : items.length === 0 ? (
                <EmptyState
                    icon={Heart}
                    title="Nothing saved yet"
                    action={
                        <Button size="sm" variant="outline" onClick={() => navigate('/search')}>
                            Browse the marketplace
                        </Button>
                    }
                >
                    Tap the heart on any listing and it will be waiting here.
                </EmptyState>
            ) : (
                <div className="zs-panel" style={{ padding: 0, overflow: 'hidden' }}>
                    {items.map((item, index) => {
                        const imageUrl = item.images?.[0]
                        const isDigital = item.isDigital || Boolean(item.original_storage_path)

                        return (
                            <div
                                key={item.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.7rem',
                                    padding: '0.7rem 0.85rem',
                                    borderTop: index === 0 ? 'none' : '1px solid var(--color-border-subtle)',
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={() => navigate(`/item/${item.id}`)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', flex: 1, minWidth: 0, background: 'none', border: 'none', padding: 0, font: 'inherit', textAlign: 'left', cursor: 'pointer' }}
                                >
                                    <span className="zs-thread__thumb">
                                        {imageUrl ? <img src={imageUrl} alt="" loading="lazy" /> : isDigital ? <FileText size={17} aria-hidden="true" /> : <Package size={17} aria-hidden="true" />}
                                    </span>
                                    <span style={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ display: 'block', fontSize: 'var(--zs-fs-small)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {item.title}
                                        </span>
                                        <span style={{ display: 'block', marginTop: '0.1rem', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                            {formatNaira(item.price)} · {item.category || (isDigital ? 'Study material' : 'Campus item')}
                                        </span>
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className="zs-icon-btn"
                                    onClick={() => handleRemove(item.id)}
                                    aria-label={`Remove ${item.title} from saved`}
                                    style={{ color: 'var(--color-danger)' }}
                                >
                                    <Heart size={16} fill="currentColor" />
                                </button>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
