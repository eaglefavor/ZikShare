import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, Heart, X } from 'lucide-react'
import { getSavedIds, removeSaved } from '../lib/savedItems'
import { getListing } from '../lib/database'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)
}

export default function SavedItemsPage() {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSavedItems()
    }, [])

    async function fetchSavedItems() {
        setLoading(true)
        const ids = getSavedIds()
        if (ids.length === 0) {
            setItems([])
            setLoading(false)
            return
        }

        const fetched = []
        for (const id of ids) {
            try {
                const item = await getListing(id)
                if (item) fetched.push(item)
            } catch {
                // Item may have been deleted — skip
            }
        }
        setItems(fetched)
        setLoading(false)
    }

    function handleRemove(id) {
        removeSaved(id)
        setItems(prev => prev.filter(item => item.id !== id))
    }

    return (
        <div>
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}><ArrowLeft size={20} /></button>
                <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Saved Items</h1>
                <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{items.length} item{items.length !== 1 ? 's' : ''}</span>
            </header>

            <div style={{ padding: '1rem' }}>
                {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 0' }}>
                        <Loader2 size={28} color="var(--color-brand)" style={{ animation: 'spin 1s linear infinite' }} />
                        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : items.length === 0 ? (
                    <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💛</p>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No saved items yet</p>
                        <p style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>Tap the heart on any listing to save it here</p>
                        <button onClick={() => navigate('/')} style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.875rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>Browse Listings</button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {items.map(item => {
                            const imageUrl = item.images?.[0]
                            return (
                                <div key={item.id} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: 'white', border: '1px solid var(--color-border)', cursor: 'pointer' }} onClick={() => navigate(`/item/${item.id}`)}>
                                    <div style={{ width: '5rem', height: '5rem', borderRadius: '0.625rem', overflow: 'hidden', flexShrink: 0, backgroundColor: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                        {imageUrl ? <img src={imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📦'}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h3 style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
                                        <p className="price-tag" style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>{formatNaira(item.price)}</p>
                                        <span style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>{item.category}</span>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); handleRemove(item.id) }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignSelf: 'center' }}>
                                        <Heart size={18} fill="#EF4444" color="#EF4444" />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
