import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, MoreVertical, Trash2, CheckCircle, Package } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getMyListings, updateListing, deleteListing } from '../lib/database'
import { invalidateCacheByPrefix } from '../lib/cache'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)
}

export default function MyListingsPage() {
    const { session, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)
    const [actionMenu, setActionMenu] = useState(null) // id of item with open menu

    useEffect(() => {
        if (!isAuthenticated || !session?.user?.id) {
            setLoading(false)
            return
        }
        fetchListings()
    }, [isAuthenticated, session])

    async function fetchListings() {
        setLoading(true)
        try {
            const data = await getMyListings(session.user.id)
            setListings(data || [])
        } catch (err) {
            console.error('Failed to load listings:', err)
        } finally {
            setLoading(false)
        }
    }

    async function handleMarkSold(id) {
        try {
            await updateListing(id, { status: 'Sold' })
            setListings(prev => prev.map(l => l.id === id ? { ...l, status: 'Sold' } : l))
            invalidateCacheByPrefix('listings')
            setActionMenu(null)
        } catch (err) {
            console.error('Failed to mark sold:', err)
            alert('Failed to update. Please try again.')
        }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this listing permanently?')) return
        try {
            await deleteListing(id)
            setListings(prev => prev.filter(l => l.id !== id))
            invalidateCacheByPrefix('listings')
            setActionMenu(null)
        } catch (err) {
            console.error('Failed to delete:', err)
            alert('Failed to delete. Please try again.')
        }
    }

    if (!isAuthenticated) {
        return (
            <div>
                <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}><ArrowLeft size={20} /></button>
                    <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>My Listings</h1>
                </header>
                <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '2rem' }}>🔒</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Sign in to view your listings</p>
                    <button onClick={() => navigate('/login')} style={{ marginTop: '1rem', padding: '0.75rem 2rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.875rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer' }}>Sign In</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}><ArrowLeft size={20} /></button>
                <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>My Listings</h1>
                <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{listings.length} item{listings.length !== 1 ? 's' : ''}</span>
            </header>

            <div style={{ padding: '1rem' }}>
                {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 0' }}>
                        <Loader2 size={28} color="var(--color-brand)" style={{ animation: 'spin 1s linear infinite' }} />
                        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : listings.length === 0 ? (
                    <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</p>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No listings yet</p>
                        <p style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>Start selling by posting your first item!</p>
                        <button onClick={() => navigate('/post')} style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.875rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>Post Your First Item</button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {listings.map(item => {
                            const imageUrl = item.images?.[0]
                            const isSold = item.status === 'Sold'
                            return (
                                <div key={item.id} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: 'white', border: '1px solid var(--color-border)', opacity: isSold ? 0.6 : 1, position: 'relative' }}>
                                    <div style={{ width: '5rem', height: '5rem', borderRadius: '0.625rem', overflow: 'hidden', flexShrink: 0, backgroundColor: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                        {imageUrl ? <img src={imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📦'}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h3 style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
                                        <p className="price-tag" style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>{formatNaira(item.price)}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '0.625rem', padding: '0.125rem 0.5rem', borderRadius: '9999px', backgroundColor: isSold ? '#FEF2F2' : '#F0FDF4', color: isSold ? '#DC2626' : '#166534', fontWeight: 600 }}>
                                                {item.status || 'Active'}
                                            </span>
                                            <span style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>{item.category}</span>
                                        </div>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <button onClick={() => setActionMenu(actionMenu === item.id ? null : item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex' }}>
                                            <MoreVertical size={18} color="var(--color-text-muted)" />
                                        </button>
                                        {actionMenu === item.id && (
                                            <div style={{ position: 'absolute', right: 0, top: '2rem', backgroundColor: 'white', borderRadius: '0.625rem', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: '1px solid var(--color-border)', overflow: 'hidden', zIndex: 10, minWidth: '9rem' }}>
                                                {!isSold && (
                                                    <button onClick={() => handleMarkSold(item.id)} style={{ width: '100%', padding: '0.625rem 0.875rem', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 500, fontFamily: 'inherit', color: 'var(--color-campus-green)' }}>
                                                        <CheckCircle size={14} /> Mark as Sold
                                                    </button>
                                                )}
                                                <button onClick={() => handleDelete(item.id)} style={{ width: '100%', padding: '0.625rem 0.875rem', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 500, fontFamily: 'inherit', color: '#DC2626' }}>
                                                    <Trash2 size={14} /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
