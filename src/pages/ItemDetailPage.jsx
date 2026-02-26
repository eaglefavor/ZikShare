import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Heart, Share2, MapPin, ShieldCheck, MessageCircle, Phone, ChevronLeft, ChevronRight, Loader2, Clock, X, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { useCachedQuery } from '../hooks/useCachedQuery'
import { getListing } from '../lib/database'
import { getUser } from '../lib/database'
import { isSaved as checkSaved, toggleSaved } from '../lib/savedItems'
import { getOrCreateConversation } from '../lib/messaging'
import { useAuth } from '../contexts/AuthContext'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)
}

function formatDate(iso) {
    return new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso))
}

function timeAgo(iso) {
    const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
    if (seconds < 60) return 'just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d ago`
    return formatDate(iso)
}

export default function ItemDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { session, isAuthenticated } = useAuth()
    const [currentImage, setCurrentImage] = useState(0)
    const [isSaved, setIsSaved] = useState(() => checkSaved(id))
    const [showCallSheet, setShowCallSheet] = useState(false)
    const [contacting, setContacting] = useState(false)

    const handleToggleSave = () => {
        const nowSaved = toggleSaved(id)
        setIsSaved(nowSaved)
    }

    const { data: item, isLoading, error } = useCachedQuery(
        `listing-${id}`,
        () => getListing(id),
        { ttl: 5 * 60 * 1000 }
    )

    const condClass = {
        'Brand New': 'condition-new',
        'Like New': 'condition-like-new',
        'Fairly Used': 'condition-used',
    }

    const handleContactSeller = async () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        if (contacting) return
        setContacting(true)
        try {
            const conv = await getOrCreateConversation(id, session.user.id, item.sellerId)
            navigate(`/chat/${conv.id}`)
        } catch (err) {
            console.error('Failed to start conversation:', err)
            alert('Failed to start conversation. Please try again.')
        } finally {
            setContacting(false)
        }
    }

    if (isLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <Loader2 size={28} color="var(--color-brand)" style={{ animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        )
    }

    if (error || !item) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
                <header style={{ padding: '0.75rem 1rem', backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Item Not Found</h1>
                </header>
                <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    <p style={{ fontSize: '2rem' }}>😕</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>This listing may have been removed</p>
                </div>
            </div>
        )
    }

    const seller = item.users || {}
    const images = item.images?.length ? item.images : [null]
    const sellerPhone = seller.phoneNumber || ''
    const isOwnListing = session?.user?.id === item.sellerId

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({ title: item.title, text: `Check out "${item.title}" on ZikShare for ${formatNaira(item.price)}`, url: window.location.href })
        } else {
            await navigator.clipboard.writeText(window.location.href)
            alert('Link copied!')
        }
    }

    const placeholderColors = ['#DBEAFE', '#E0E7FF', '#D1FAE5']

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', paddingBottom: '5.5rem' }}>
            {/* Image Carousel */}
            <div style={{ position: 'relative' }}>
                <div style={{ width: '100%', height: '300px', backgroundColor: placeholderColors[currentImage % placeholderColors.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', overflow: 'hidden' }}>
                    {images[currentImage] ? (
                        <img src={images[currentImage]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : '📦'}
                </div>

                {/* Top navigation overlay */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)' }}>
                    <button onClick={() => navigate(-1)} style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
                        <ArrowLeft size={18} />
                    </button>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={handleShare} style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
                            <Share2 size={16} />
                        </button>
                        <button onClick={handleToggleSave} style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
                            <Heart size={16} fill={isSaved ? '#EF4444' : 'none'} color={isSaved ? '#EF4444' : '#1E293B'} />
                        </button>
                    </div>
                </div>

                {/* Photo count */}
                {images.length > 1 && (
                    <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', padding: '0.25rem 0.625rem', borderRadius: '9999px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.6875rem', fontWeight: 600 }}>
                        📷 {currentImage + 1}/{images.length}
                    </div>
                )}

                {/* Dots */}
                {images.length > 1 && (
                    <div style={{ position: 'absolute', bottom: '0.75rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.375rem' }}>
                        {images.map((_, i) => (
                            <button key={i} onClick={() => setCurrentImage(i)} style={{ width: currentImage === i ? '1.25rem' : '0.375rem', height: '0.375rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', backgroundColor: currentImage === i ? 'white' : 'rgba(255,255,255,0.5)', transition: 'all 0.2s ease' }} />
                        ))}
                    </div>
                )}

                {/* Arrows */}
                {currentImage > 0 && (
                    <button onClick={() => setCurrentImage(currentImage - 1)} style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', width: '2rem', height: '2rem', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <ChevronLeft size={16} />
                    </button>
                )}
                {currentImage < images.length - 1 && (
                    <button onClick={() => setCurrentImage(currentImage + 1)} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', width: '2rem', height: '2rem', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <ChevronRight size={16} />
                    </button>
                )}
            </div>

            {/* Price & Title Card */}
            <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '1rem 1rem 0 0', marginTop: '-0.75rem', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                    <MapPin size={12} />
                    <span>UNIZIK Campus</span>
                    <span>•</span>
                    <Clock size={12} />
                    <span>{timeAgo(item.createdAt)}</span>
                </div>

                <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.0625rem', fontWeight: 700, lineHeight: 1.3 }}>{item.title}</h1>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <p className="price-tag" style={{ margin: 0, fontSize: '1.5rem' }}>{formatNaira(item.price)}</p>
                    <span className={`condition-badge ${condClass[item.condition] || ''}`}>{item.condition}</span>
                </div>

                {/* Action Buttons */}
                {!isOwnListing && (
                    <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '0.5rem' }}>
                        <button onClick={() => setShowCallSheet(true)} style={{ flex: 0, width: '3.5rem', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'white', fontSize: '0.8125rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-text-primary)' }}>
                            <Phone size={18} />
                        </button>
                        <button onClick={handleContactSeller} disabled={contacting} style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.8125rem', fontWeight: 700, fontFamily: 'inherit', cursor: contacting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(59,130,246,0.3)', opacity: contacting ? 0.7 : 1 }}>
                            <MessageCircle size={16} />
                            {contacting ? 'Opening chat...' : 'Chat with Seller'}
                        </button>
                    </div>
                )}
            </div>

            {/* Description */}
            {item.description && (
                <div style={{ margin: '0.5rem 0', padding: '1rem', backgroundColor: 'white' }}>
                    <h3 style={{ margin: '0 0 0.375rem', fontSize: '0.875rem', fontWeight: 700 }}>Description</h3>
                    <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{item.description}</p>
                </div>
            )}

            {/* Item Details Grid */}
            <div style={{ margin: '0.5rem 0', padding: '1rem', backgroundColor: 'white' }}>
                <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: 700 }}>Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600 }}>{item.condition}</p>
                        <p style={{ margin: '0.125rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Condition</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600 }}>{item.category}</p>
                        <p style={{ margin: '0.125rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Category</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600 }}>{formatDate(item.createdAt)}</p>
                        <p style={{ margin: '0.125rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Listed</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600 }}>{item.status || 'Active'}</p>
                        <p style={{ margin: '0.125rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Status</p>
                    </div>
                </div>
            </div>

            {/* Seller Card */}
            <div style={{ margin: '0.5rem 0', padding: '1rem', backgroundColor: 'white' }}>
                <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: 700 }}>Seller</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.125rem', fontWeight: 700, flexShrink: 0 }}>
                        {(seller.displayName || 'S').charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700 }}>{seller.displayName || 'Seller'}</p>
                            {seller.isVerified && <ShieldCheck size={14} color="var(--color-campus-green)" />}
                        </div>
                        {seller.department && (
                            <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{seller.department}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Safe Meetup */}
            <div style={{ margin: '0.5rem 0 1rem', padding: '1rem', backgroundColor: 'white' }}>
                <div style={{ padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <MapPin size={16} color="#166534" />
                    <p style={{ margin: 0, fontSize: '0.6875rem', color: '#166534', lineHeight: 1.3 }}>
                        <strong>Safe Meetup:</strong> Meet at Garba Square, Chisco Park, or the Student Center.
                    </p>
                </div>
            </div>

            {/* Sticky Bottom CTA */}
            {!isOwnListing && (
                <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '0.625rem 1rem', backgroundColor: 'white', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.625rem', zIndex: 50, paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom, 0px))' }}>
                    <button onClick={() => setShowCallSheet(true)} style={{ width: '3.5rem', height: '3rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-primary)' }}>
                        <Phone size={20} />
                    </button>
                    <button onClick={handleContactSeller} disabled={contacting} style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.9375rem', fontWeight: 700, fontFamily: 'inherit', cursor: contacting ? 'not-allowed' : 'pointer', textAlign: 'center', boxShadow: '0 4px 12px rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: contacting ? 0.7 : 1 }}>
                        <MessageCircle size={18} />
                        {contacting ? 'Opening...' : 'Contact Seller'}
                    </button>
                </div>
            )}

            {/* Call Bottom Sheet */}
            {showCallSheet && (
                <>
                    <div onClick={() => setShowCallSheet(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }} />
                    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 101, backgroundColor: 'white', borderRadius: '1rem 1rem 0 0', padding: '1.25rem 1rem', paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))', animation: 'slideUp 0.25s ease-out' }}>
                        <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.875rem', fontWeight: 700 }}>
                                    {(seller.displayName || 'S').charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700 }}>{seller.displayName || 'Seller'}</p>
                                    {seller.department && <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{seller.department}</p>}
                                </div>
                            </div>
                            <button onClick={() => setShowCallSheet(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex' }}>
                                <X size={20} color="var(--color-text-muted)" />
                            </button>
                        </div>

                        {sellerPhone ? (
                            <div style={{ padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div>
                                    <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.02em' }}>{sellerPhone}</p>
                                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>Charged at your operator's rate</p>
                                </div>
                                <a href={`tel:${sellerPhone}`} style={{ padding: '0.625rem 1.25rem', borderRadius: '0.625rem', border: '2px solid var(--color-campus-green)', backgroundColor: 'transparent', color: 'var(--color-campus-green)', fontSize: '0.8125rem', fontWeight: 700, fontFamily: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Phone size={16} />
                                    Mobile call
                                </a>
                            </div>
                        ) : (
                            <div style={{ padding: '1rem', borderRadius: '0.75rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', textAlign: 'center', marginBottom: '1rem' }}>
                                <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600, color: '#DC2626' }}>Phone number not available</p>
                                <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: '#DC2626' }}>Use the in-app chat to contact this seller.</p>
                            </div>
                        )}

                        <div style={{ padding: '0.75rem', borderRadius: '0.625rem', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D' }}>
                            <p style={{ margin: 0, fontSize: '0.625rem', color: '#92400E', lineHeight: 1.4 }}>
                                <strong>❗ Never pay in advance!</strong> Even for delivery.<br />
                                <strong>✅ Inform the seller</strong> you got their number on ZikShare.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
