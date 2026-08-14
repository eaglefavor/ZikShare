import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
    ArrowLeft, ShieldCheck, MapPin, Phone, MessageCircle, 
    FileText, Package, Share2, Loader2, Sparkles 
} from 'lucide-react'
import { getSellerPublicProfile } from '../lib/database'
import { getOrCreateConversation } from '../lib/messaging'
import { useAuth } from '../contexts/AuthContext'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount || 0)
}

function formatDate(iso) {
    if (!iso) return 'Recent'
    return new Intl.DateTimeFormat('en-NG', { month: 'short', year: 'numeric' }).format(new Date(iso))
}

export default function SellerProfilePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { session, isAuthenticated } = useAuth()

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [filter, setFilter] = useState('All') // 'All', 'Digital', 'Physical'
    const [contacting, setContacting] = useState(false)

    useEffect(() => {
        if (!id) return
        loadSellerProfile()
    }, [id])

    async function loadSellerProfile() {
        setLoading(true)
        try {
            const profileData = await getSellerPublicProfile(id)
            setData(profileData)
        } catch (err) {
            console.error('Failed to load seller profile:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleContact = async () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        if (contacting) return
        setContacting(true)
        try {
            const conv = await getOrCreateConversation(null, session.user.id, id)
            navigate(`/chat/${conv.id}`)
        } catch (err) {
            console.error('Chat start error:', err)
            alert('Failed to start chat with seller.')
        } finally {
            setContacting(false)
        }
    }

    const handleShare = async () => {
        const url = window.location.href
        const sellerName = data?.seller?.displayName || 'Seller'
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${sellerName}'s Store on ZikShare`,
                    text: `Check out study materials and campus listings from ${sellerName} on ZikShare!`,
                    url: url,
                })
            } catch {}
        } else {
            await navigator.clipboard.writeText(url)
            alert('Seller profile link copied!')
        }
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <Loader2 size={32} color="var(--color-brand)" className="animate-spin" />
            </div>
        )
    }

    if (!data || !data.seller) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
                <header style={{ padding: '1rem', backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><ArrowLeft size={20} /></button>
                    <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Seller Not Found</h1>
                </header>
                <div style={{ padding: '4rem 1rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    <p style={{ fontSize: '2rem' }}>🔍</p>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 600 }}>This seller profile does not exist.</p>
                </div>
            </div>
        )
    }

    const { seller, listings, totalListings, digitalCount, physicalCount } = data
    const filteredListings = listings.filter(item => {
        if (filter === 'Digital') return item.isDigital
        if (filter === 'Physical') return !item.isDigital
        return true
    })

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingBottom: '5rem' }}>
            {/* Top Navigation */}
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800 }}>Seller Profile</h1>
                </div>
                <button onClick={handleShare} style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', border: '1px solid var(--color-border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Share2 size={16} />
                </button>
            </header>

            {/* Seller Header Banner */}
            <div style={{ padding: '1.5rem 1rem 1rem', backgroundColor: 'white', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.75rem', fontWeight: 800, flexShrink: 0, boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
                        {(seller.displayName || 'S').charAt(0).toUpperCase()}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexWrap: 'wrap' }}>
                            <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 800 }}>{seller.displayName || 'Student Seller'}</h2>
                            {seller.isVerified && <ShieldCheck size={18} color="var(--color-campus-green)" />}
                        </div>
                        {seller.department && (
                            <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                                🎓 {seller.department}
                            </p>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                            <MapPin size={12} />
                            <span>UNIZIK Campus</span>
                            <span>•</span>
                            <span>Joined {formatDate(seller.createdAt)}</span>
                        </div>
                    </div>
                </div>

                {/* Seller Quick Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)', marginBottom: '1rem', textAlign: 'center' }}>
                    <div>
                        <span style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-brand)' }}>{totalListings}</span>
                        <p style={{ margin: '0.125rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Listings</p>
                    </div>
                    <div>
                        <span style={{ fontSize: '1.125rem', fontWeight: 800, color: '#10B981' }}>{digitalCount}</span>
                        <p style={{ margin: '0.125rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>PDF Materials</p>
                    </div>
                    <div>
                        <span style={{ fontSize: '1.125rem', fontWeight: 800, color: '#F59E0B' }}>{seller.isVerified ? 'Verified' : 'Active'}</span>
                        <p style={{ margin: '0.125rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</p>
                    </div>
                </div>

                {/* Contact Actions */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={handleContact}
                        disabled={contacting}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                            color: 'white',
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            fontFamily: 'inherit',
                            cursor: contacting ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
                        }}
                    >
                        <MessageCircle size={16} />
                        <span>{contacting ? 'Opening chat...' : 'Message Seller'}</span>
                    </button>

                    {seller.phoneNumber && (
                        <a
                            href={`https://wa.me/${seller.phoneNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: '0.75rem 1.25rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #BBF7D0',
                                backgroundColor: '#F0FDF4',
                                color: '#166534',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.375rem'
                            }}
                        >
                            <Phone size={16} />
                            <span>WhatsApp</span>
                        </a>
                    )}
                </div>
            </div>

            {/* Catalog Section */}
            <div style={{ padding: '1rem', maxWidth: '48rem', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800 }}>Store Items ({filteredListings.length})</h3>

                    {/* Filter Pills */}
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {[
                            { id: 'All', label: 'All' },
                            { id: 'Digital', label: `PDFs (${digitalCount})` },
                            { id: 'Physical', label: `Items (${physicalCount})` }
                        ].map(t => (
                            <button
                                key={t.id}
                                onClick={() => setFilter(t.id)}
                                style={{
                                    padding: '0.25rem 0.625rem',
                                    borderRadius: '9999px',
                                    border: 'none',
                                    backgroundColor: filter === t.id ? 'var(--color-brand)' : 'white',
                                    color: filter === t.id ? 'white' : 'var(--color-text-secondary)',
                                    fontSize: '0.6875rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                }}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredListings.length === 0 ? (
                    <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '3rem 1rem', textAlign: 'center', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                        <Package size={36} style={{ margin: '0 auto 0.5rem', opacity: 0.4 }} />
                        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>No items available in this category</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                        {filteredListings.map(item => {
                            const placeholderColors = ['#DBEAFE', '#E0E7FF', '#D9F99D', '#FBCFE8', '#E9D5FF', '#FDE68A']
                            const bgColor = placeholderColors[(item.id?.charCodeAt?.(0) || 0) % placeholderColors.length]
                            const imageUrl = item.images?.[0] || item.cover_image_url

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => navigate(`/item/${item.id}`)}
                                    style={{
                                        borderRadius: '0.75rem',
                                        overflow: 'hidden',
                                        backgroundColor: 'white',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                                        border: '1px solid var(--color-border)',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s ease',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                                    onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                                >
                                    <div style={{ width: '100%', height: '120px', backgroundColor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', position: 'relative', overflow: 'hidden' }}>
                                        {imageUrl ? (
                                            <img src={imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            item.isDigital ? '📄' : '📦'
                                        )}
                                        <div style={{ position: 'absolute', top: '0.375rem', left: '0.375rem' }}>
                                            <span style={{ fontSize: '0.5625rem', padding: '0.125rem 0.375rem', borderRadius: '9999px', backgroundColor: item.isDigital ? '#EFF6FF' : '#FEF3C7', color: item.isDigital ? '#1E40AF' : '#92400E', fontWeight: 700 }}>
                                                {item.isDigital ? 'PDF' : (item.condition || 'Item')}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '0.625rem' }}>
                                        <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h4>
                                        <p className="price-tag" style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>{formatNaira(item.price)}</p>
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
