import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Heart, Share2, MapPin, ShieldCheck, MessageCircle, Phone, ChevronLeft, ChevronRight, Loader2, Clock, X, FileText, ShieldAlert, ChevronRight as ChevronRightIcon, CheckCircle2, Lock, Download, Sparkles, Eye, CheckCircle } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useCachedQuery } from '../hooks/useCachedQuery'
import { getListing, getUserPurchaseForProduct, fulfillDigitalOrder, createSignedDownloadUrl } from '../lib/database'
import { downloadWatermarkedPdf, getDrmPassword } from '../lib/pdfWatermark'
import { renderPdfSampleCanvas } from '../lib/pdfPreview'
import PaystackCheckout from '../components/PaystackCheckout'
import { isSaved as checkSaved, toggleSaved } from '../lib/savedItems'
import { getOrCreateConversation } from '../lib/messaging'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/Toast'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)
}

function formatDate(iso) {
    if (!iso) return 'Recent'
    return new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso))
}

function timeAgo(iso) {
    if (!iso) return 'recently'
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
    const { session, user, isAuthenticated } = useAuth()
    const toast = useToast()
    const [currentImage, setCurrentImage] = useState(0)
    const [isSaved, setIsSaved] = useState(() => checkSaved(id))
    const [showCallSheet, setShowCallSheet] = useState(false)
    const [contacting, setContacting] = useState(false)
    const [existingOrder, setExistingOrder] = useState(null)
    const [downloadingExisting, setDownloadingExisting] = useState(false)
    const [showPreviewModal, setShowPreviewModal] = useState(false)
    const [previewLoading, setPreviewLoading] = useState(false)
    const [previewError, setPreviewError] = useState('')
    const [previewPageCount, setPreviewPageCount] = useState(null)
    const previewCanvasRef = useRef(null)

    const currentUserId = session?.user?.id || user?.uid || user?.id

    const handleToggleSave = () => {
        const nowSaved = toggleSaved(id)
        setIsSaved(nowSaved)
        if (nowSaved) {
            toast.success('Saved to your wishlist!')
        } else {
            toast.info('Removed from saved items')
        }
    }

    const handleShare = async () => {
        const shareUrl = window.location.href
        const shareText = `Check out "${item?.title || 'this item'}" on ZikShare (UNIZIK Campus Marketplace):`
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${item?.title || 'ZikShare'}`,
                    text: shareText,
                    url: shareUrl,
                })
                return
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.warn('Share error:', err)
                }
            }
        }

        try {
            await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
            toast.success('Listing link copied to clipboard!')
        } catch {
            toast.info('Share URL: ' + shareUrl)
        }
    }

    const { data: item, isLoading, error: itemError } = useCachedQuery(
        `listing-${id}`,
        () => getListing(id),
        { ttl: 5 * 60 * 1000 }
    )

    useEffect(() => {
        if (isAuthenticated && currentUserId && item?.isDigital) {
            getUserPurchaseForProduct(currentUserId, item.id).then(order => {
                if (order) setExistingOrder(order)
            })
        }
    }, [isAuthenticated, currentUserId, item])

    const handleDownloadExistingPdf = async () => {
        if (!existingOrder) return
        setDownloadingExisting(true)
        try {
            const storagePath = existingOrder?.unique_storage_path || existingOrder?.product?.original_storage_path || item?.original_storage_path
            const url = await createSignedDownloadUrl(storagePath, 3600)
            if (url) {
                const buyerName = user?.displayName || session?.user?.user_metadata?.full_name || 'UNIZIK STUDENT'
                const regNumber = existingOrder?.watermark_text?.match(/REG NO: ([^|]+)/i)?.[1]?.trim() || 'STUDENT'
                const title = item?.title || 'ZikShare Study Material'
                const drmPassword = getDrmPassword(existingOrder, user)

                await downloadWatermarkedPdf(url, title, {
                    buyerName,
                    regNumber,
                    orderId: existingOrder?.id,
                    password: drmPassword
                })
            } else {
                alert('Could not generate download link. Please refresh or contact support.')
            }
        } catch (err) {
            alert('Download failed: ' + err.message)
        } finally {
            setDownloadingExisting(false)
        }
    }

    const handleOpenPreview = async () => {
        setShowPreviewModal(true)
        setPreviewLoading(true)
        setPreviewError('')
        try {
            const storagePath = item?.original_storage_path
            if (!storagePath) {
                throw new Error('Preview document path not found.')
            }
            const signedUrl = await createSignedDownloadUrl(storagePath, 300)
            if (!signedUrl) throw new Error('Could not generate sample preview link.')

            setTimeout(async () => {
                try {
                    if (previewCanvasRef.current) {
                        const info = await renderPdfSampleCanvas(signedUrl, previewCanvasRef.current, {
                            scale: 1.3,
                            watermarkText: 'SAMPLE PREVIEW • ZIKSHARE ACADEMIC'
                        })
                        if (info?.numPages) setPreviewPageCount(info.numPages)
                        setPreviewLoading(false)
                    }
                } catch (canvasErr) {
                    console.error('Canvas render error:', canvasErr)
                    setPreviewError('Could not render document preview.')
                    setPreviewLoading(false)
                }
            }, 150)
        } catch (err) {
            console.error('Preview error:', err)
            setPreviewError(err.message || 'Failed to generate preview')
            setPreviewLoading(false)
        }
    }

    const condClass = {
        'Brand New': 'condition-new',
        'Like New': 'condition-like-new',
        'Fairly Used': 'condition-used',
        'Digital PDF': 'condition-like-new',
    }

    const handleContactSeller = async () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        if (contacting) return
        setContacting(true)
        try {
            const sellerUid = item.sellerId || item.seller_id
            const conv = await getOrCreateConversation(id, session.user.id, sellerUid)
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

    if (itemError || !item) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Listing Not Found</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>This item may have been removed or is no longer available.</p>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: 'var(--color-brand)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                    }}
                >
                    Back to Feed
                </button>
            </div>
        )
    }

    const images = item.images && item.images.length > 0 ? item.images : [null]
    const seller = item.users || {}
    const sellerId = item.sellerId || item.seller_id
    const isOwnListing = currentUserId === sellerId

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', paddingBottom: '5.5rem', maxWidth: '42rem', margin: '0 auto' }}>
            <div style={{ position: 'relative' }}>
                <div style={{ width: '100%', height: '300px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', overflow: 'hidden' }}>
                    {images[currentImage] ? (
                        <img src={images[currentImage]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : item.isDigital ? '📄' : '📦'}
                </div>

                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)' }}>
                    <button onClick={() => navigate(-1)} style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
                        <ArrowLeft size={18} />
                    </button>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={handleShare} style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
                            <Share2 size={18} />
                        </button>
                        <button onClick={handleToggleSave} style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
                            <Heart size={18} color={isSaved ? '#EF4444' : '#1E293B'} fill={isSaved ? '#EF4444' : 'none'} />
                        </button>
                    </div>
                </div>

                {images.length > 1 && (
                    <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', padding: '0.25rem 0.625rem', borderRadius: '9999px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.6875rem', fontWeight: 600 }}>
                        📷 {currentImage + 1}/{images.length}
                    </div>
                )}
            </div>

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
                    <span className={`condition-badge ${condClass[item.condition] || 'condition-like-new'}`}>{item.condition || 'Available'}</span>
                </div>

                {!isOwnListing && (
                    item.isDigital ? (
                        <div style={{ marginBottom: '0.5rem' }}>
                            {existingOrder ? (
                                <div style={{ backgroundColor: '#F0FDF4', border: '1.5px solid #10B981', borderRadius: '0.875rem', padding: '1.125rem', boxShadow: '0 4px 12px rgba(16,185,129,0.1)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                            <CheckCircle2 size={18} color="#10B981" />
                                            <span style={{ fontWeight: 800, fontSize: '0.875rem', color: '#065F46' }}>You Already Own This Material!</span>
                                        </div>
                                        <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#059669', backgroundColor: '#DCFCE7', padding: '0.125rem 0.5rem', borderRadius: '1rem' }}>
                                            Purchased
                                        </span>
                                    </div>
                                    <p style={{ margin: '0 0 0.75rem', fontSize: '0.75rem', color: '#047857', lineHeight: 1.4 }}>
                                        You previously purchased this study material on {formatDate(existingOrder.created_at)}. Your unlocked PDF is ready to download.
                                    </p>

                                    {item.drm_enabled !== false && (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px dashed #10B981', marginBottom: '0.75rem' }}>
                                            <span style={{ fontSize: '0.75rem', color: '#065F46', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Lock size={13} color="#10B981" /> PDF Password:
                                            </span>
                                            <code style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1E40AF', fontFamily: 'monospace' }}>
                                                {getDrmPassword(existingOrder, user)}
                                            </code>
                                        </div>
                                    )}
                                    <button
                                        onClick={handleDownloadExistingPdf}
                                        disabled={downloadingExisting}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '0.625rem',
                                            border: 'none',
                                            background: 'linear-gradient(135deg, #10B981, #059669)',
                                            color: 'white',
                                            fontSize: '0.875rem',
                                            fontWeight: 800,
                                            cursor: downloadingExisting ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
                                        }}
                                    >
                                        {downloadingExisting ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                <span>Watermarking & Preparing PDF...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Download size={16} />
                                                <span>Download Licensed PDF Now</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {/* Free First-Page Sample Preview Card */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.625rem 0.875rem', backgroundColor: '#F8FAFC', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '1.25rem' }}>📄</span>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#0F172A' }}>Want to check the questions?</p>
                                                <p style={{ margin: 0, fontSize: '0.625rem', color: '#64748B' }}>Preview Page 1 sample before purchasing</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleOpenPreview}
                                            style={{
                                                padding: '0.4rem 0.75rem',
                                                borderRadius: '0.5rem',
                                                border: '1.5px solid #2563EB',
                                                backgroundColor: '#EFF6FF',
                                                color: '#1E40AF',
                                                fontSize: '0.6875rem',
                                                fontWeight: 800,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                            }}
                                        >
                                            <Eye size={13} />
                                            <span>View Sample</span>
                                        </button>
                                    </div>

                                    {session?.user ? (
                                        <PaystackCheckout
                                            product={item}
                                            user={session.user}
                                            onSuccess={(ref) => navigate(`/payment/success?ref=${ref}`)}
                                        />
                                    ) : (
                                        <button onClick={() => navigate('/login')} style={{ width: '100%', padding: '0.875rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', fontSize: '0.9375rem', fontWeight: 800, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
                                            <span>🔒 Sign in to Purchase PDF ({formatNaira(item.price)})</span>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '0.5rem' }}>
                            <button onClick={() => setShowCallSheet(true)} style={{ flex: 0, width: '3.5rem', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'white', fontSize: '0.8125rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-text-primary)' }}>
                                <Phone size={18} />
                            </button>
                            <button onClick={handleContactSeller} disabled={contacting} style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.8125rem', fontWeight: 700, fontFamily: 'inherit', cursor: contacting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(59,130,246,0.3)', opacity: contacting ? 0.7 : 1 }}>
                                <MessageCircle size={16} />
                                {contacting ? 'Opening chat...' : 'Chat with Seller'}
                            </button>
                        </div>
                    )
                )}
            </div>

            {/* Preview Modal */}
            {showPreviewModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'white', zIndex: 1000, overflowY: 'auto' }}>
                    <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
                        <button onClick={() => setShowPreviewModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                        <h2 style={{ margin: '0 auto', fontSize: '1rem' }}>Material Preview</h2>
                    </div>
                    {previewLoading ? (
                        <div style={{ padding: '3rem', textAlign: 'center' }}>
                            <Loader2 size={32} className="animate-spin" />
                            <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>Loading preview...</p>
                        </div>
                    ) : previewError ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: '#DC2626' }}>{previewError}</div>
                    ) : (
                        <div style={{ padding: '1rem' }}>
                            <canvas ref={previewCanvasRef} style={{ width: '100%', height: 'auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }} />
                            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem' }}>Page 1 of {previewPageCount || '?'}</p>
                        </div>
                    )}
                </div>
            )}

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
                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600 }}>{item.condition || (item.isDigital ? 'Digital PDF' : 'Used')}</p>
                        <p style={{ margin: '0.125rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Type / Condition</p>
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
                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600 }}>
                            {item.file_size_bytes ? `${(item.file_size_bytes / 1024 / 1024).toFixed(1)} MB` : (item.status || 'Active')}
                        </p>
                        <p style={{ margin: '0.125rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            {item.file_size_bytes ? 'File Size' : 'Status'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Clickable Seller Card (routes to /seller/:id) */}
            <div 
                onClick={() => sellerId && navigate(`/seller/${sellerId}`)}
                style={{ 
                    margin: '0.5rem 0', 
                    padding: '1rem', 
                    backgroundColor: 'white', 
                    cursor: sellerId ? 'pointer' : 'default',
                    transition: 'background-color 0.15s ease'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700 }}>Seller</h3>
                    {sellerId && (
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-brand)', display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
                            View Store <ChevronRightIcon size={14} />
                        </span>
                    )}
                </div>
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

            {/* Safe Meetup (Physical Items) or Anti-Piracy Notice (Digital Items) */}
            <div style={{ margin: '0.5rem 0 1rem', padding: '1rem', backgroundColor: 'white' }}>
                {item.isDigital ? (
                    item.drm_enabled !== false ? (
                        <div style={{ padding: '0.875rem', borderRadius: '0.75rem', backgroundColor: '#FEF2F2', border: '1.5px solid #FECACA', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ShieldAlert size={18} color="#DC2626" />
                                <strong style={{ fontSize: '0.75rem', color: '#991B1B', textTransform: 'uppercase' }}>Watermarked & Traceable Copy</strong>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.6875rem', color: '#7F1D1D', lineHeight: 1.4 }}>
                                This PDF is permanently stamped with your <strong>Full Name</strong> and <strong>UNIZIK Reg Number</strong> on every page upon purchase.
                            </p>
                        </div>
                    ) : (
                        <div style={{ padding: '0.875rem', borderRadius: '0.75rem', backgroundColor: '#EFF6FF', border: '1.5px solid #BFDBFE', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle size={18} color="#2563EB" />
                                <strong style={{ fontSize: '0.75rem', color: '#1E40AF', textTransform: 'uppercase' }}>Direct PDF Access</strong>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.6875rem', color: '#1E3A8A', lineHeight: 1.4 }}>
                                Standard open document. Instant access & download in your library upon purchase.
                            </p>
                        </div>
                    )
                ) : (
                    <div style={{ padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <MapPin size={16} color="#166534" />
                        <p style={{ margin: 0, fontSize: '0.6875rem', color: '#166534', lineHeight: 1.3 }}>
                            <strong>Safe Meetup:</strong> Meet at Garba Square, Chisco Park, or the Student Center.
                        </p>
                    </div>
                )}
            </div>

            {/* Sticky Bottom CTA */}
            {!isOwnListing && (
                <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '42rem', padding: '0.625rem 1rem', backgroundColor: 'white', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.625rem', zIndex: 50, paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom, 0px))', boxSizing: 'border-box' }}>
                    {item.isDigital ? (
                        existingOrder ? (
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                style={{ width: '100%', padding: '0.875rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', fontSize: '0.9375rem', fontWeight: 800, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}
                            >
                                <span>✅ You Own This Material — View / Download</span>
                            </button>
                        ) : session?.user ? (
                            <PaystackCheckout
                                product={item}
                                user={session.user}
                                onSuccess={(ref) => navigate(`/payment/success?ref=${ref}`)}
                            />
                        ) : (
                            <button onClick={() => navigate('/login')} style={{ width: '100%', padding: '0.875rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', fontSize: '0.9375rem', fontWeight: 800, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
                                <span>🔒 Sign in to Purchase PDF ({formatNaira(item.price)})</span>
                            </button>
                        )
                    ) : (
                        <>
                            <button onClick={() => setShowCallSheet(true)} style={{ width: '3.5rem', height: '3rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-primary)' }}>
                                <Phone size={20} />
                            </button>
                            <button onClick={handleContactSeller} disabled={contacting} style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.9375rem', fontWeight: 700, fontFamily: 'inherit', cursor: contacting ? 'not-allowed' : 'pointer', textAlign: 'center', boxShadow: '0 4px 12px rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: contacting ? 0.7 : 1 }}>
                                <MessageCircle size={18} />
                                {contacting ? 'Opening...' : 'Contact Seller'}
                            </button>
                        </>
                    )}
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
