import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, Download, Loader2, Search, X, Check, Copy, HelpCircle, Sparkles, RefreshCw, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getBuyerOrders, createSignedDownloadUrl } from '../lib/database'
import { claimPurchaseByReference } from '../lib/paystack'
import { downloadWatermarkedPdf } from '../lib/pdfWatermark'
import { useToast } from '../components/Toast'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount || 0)
}

function formatDate(iso) {
    if (!iso) return 'Recent'
    return new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso))
}

export default function PurchasedItemsPage() {
    const navigate = useNavigate()
    const { session, user, isAuthenticated } = useAuth()
    const toast = useToast()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [downloadingId, setDownloadingId] = useState(null)
    const [copiedId, setCopiedId] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')

    // Self-Service Dispute / Purchase Claim Modal
    const [showClaimModal, setShowClaimModal] = useState(false)
    const [claimReference, setClaimReference] = useState('')
    const [claiming, setClaiming] = useState(false)
    const [claimError, setClaimError] = useState('')

    const currentUserId = session?.user?.id || user?.uid || user?.id

    useEffect(() => {
        if (!isAuthenticated || !currentUserId) {
            setLoading(false)
            return
        }

        loadPurchases()
    }, [isAuthenticated, currentUserId])

    async function loadPurchases() {
        setLoading(true)
        try {
            const data = await getBuyerOrders(currentUserId)
            setOrders(data || [])
        } catch (err) {
            console.error('Failed to load purchases:', err)
        } finally {
            setLoading(false)
        }
    }

    const filteredOrders = useMemo(() => {
        if (!searchQuery.trim()) return orders
        const q = searchQuery.toLowerCase().trim()
        return orders.filter(o => {
            const title = (o.product?.title || '').toLowerCase()
            const cat = (o.product?.category || '').toLowerCase()
            const ref = (o.paystack_reference || '').toLowerCase()
            return title.includes(q) || cat.includes(q) || ref.includes(q)
        })
    }, [orders, searchQuery])

    const handleDownload = async (order) => {
        setDownloadingId(order.id)
        try {
            const storagePath = order?.unique_storage_path || order?.product?.original_storage_path
            if (!storagePath) {
                toast.error('File link is being finalized. Please try again.')
                return
            }

            const url = await createSignedDownloadUrl(storagePath, 3600)
            if (url) {
                const buyerName = user?.displayName || session?.user?.user_metadata?.full_name || 'UNIZIK STUDENT'
                const regNumber = order?.watermark_text?.match(/REG NO: ([^|]+)/i)?.[1]?.trim() || 'STUDENT'
                const title = order?.product?.title || 'ZikShare Study Material'

                await downloadWatermarkedPdf(url, title, {
                    buyerName,
                    regNumber,
                    orderId: order?.id
                })
                toast.success('Personalized study material downloaded! 🚀')
            } else {
                toast.error('Could not generate download link. Please refresh.')
            }
        } catch (err) {
            toast.error('Download error: ' + err.message)
        } finally {
            setDownloadingId(null)
        }
    }

    const handleClaimSubmit = async (e) => {
        e.preventDefault()
        if (!claimReference.trim()) {
            setClaimError('Please enter your Paystack transaction reference.')
            return
        }

        setClaiming(true)
        setClaimError('')

        try {
            const res = await claimPurchaseByReference(claimReference.trim(), currentUserId)
            if (res?.success) {
                toast.success(res.message || 'Purchase successfully verified & added to your library! 🎉')
                setShowClaimModal(false)
                setClaimReference('')
                await loadPurchases()
            } else {
                setClaimError(res?.message || res?.error || 'Could not verify payment with this reference. Please check and retry.')
            }
        } catch (err) {
            setClaimError(err.message || 'Error communicating with verification service.')
        } finally {
            setClaiming(false)
        }
    }

    const handleCopyText = (id, text) => {
        navigator.clipboard.writeText(text)
        setCopiedId(id)
        toast.success('Copied to clipboard!')
        setTimeout(() => setCopiedId(null), 2500)
    }

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', maxWidth: '42rem', margin: '0 auto' }}>
                <header style={{ padding: '0.875rem 1rem', backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><ArrowLeft size={20} /></button>
                    <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800 }}>Purchased Study Materials</h1>
                </header>
                <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '2.5rem', margin: '0 0 0.5rem' }}>🔒</p>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 800 }}>Sign in to view your library</h2>
                    <button onClick={() => navigate('/login')} style={{ marginTop: '1rem', padding: '0.75rem 2rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
                        Sign In
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingBottom: '3rem', maxWidth: '42rem', margin: '0 auto' }}>
            <header style={{ padding: '0.875rem 1rem', backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, zIndex: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}>
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800, color: '#0F172A' }}>Purchased Study Materials</h1>
                            <p style={{ margin: 0, fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                                {orders.length} digital document{orders.length !== 1 ? 's' : ''} in library
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowClaimModal(true)}
                        style={{
                            padding: '0.375rem 0.625rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #BFDBFE',
                            backgroundColor: '#EFF6FF',
                            color: '#2563EB',
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}
                    >
                        <Sparkles size={13} />
                        <span>Claim Reference</span>
                    </button>
                </div>

                {/* In-Library Search Bar */}
                {orders.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', backgroundColor: 'var(--color-background)', borderRadius: '0.625rem', border: '1px solid var(--color-border)' }}>
                        <Search size={15} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
                        <input
                            type="text"
                            placeholder="Search by title, course, or reference..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            style={{ flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent', fontSize: '0.8125rem', fontFamily: 'inherit' }}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#94A3B8' }}>
                                <X size={14} />
                            </button>
                        )}
                    </div>
                )}
            </header>

            <div style={{ padding: '1rem' }}>
                {loading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="skeleton" style={{ height: '140px', borderRadius: '1rem' }} />
                        ))}
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div style={{ padding: '3.5rem 1.5rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)' }}>
                        <div style={{ width: '4rem', height: '4rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#2563EB' }}>
                            <FileText size={28} />
                        </div>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 800, margin: '0 0 0.375rem', color: '#0F172A' }}>
                            {searchQuery ? 'No matching materials found' : 'No Study Materials in Library'}
                        </h2>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: '0 0 1.5rem', lineHeight: 1.4 }}>
                            {searchQuery ? `No files match "${searchQuery}".` : 'Paid for a material but not seeing it? You can claim it instantly with your Paystack transaction reference.'}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => setShowClaimModal(true)}
                                style={{ padding: '0.625rem 1.25rem', borderRadius: '0.625rem', border: '1px solid #3B82F6', backgroundColor: '#EFF6FF', color: '#2563EB', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}
                            >
                                ⚡ Claim with Paystack Ref
                            </button>
                            <button
                                onClick={() => navigate('/search?category=Past%20Questions')}
                                style={{ padding: '0.625rem 1.25rem', borderRadius: '0.625rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}
                            >
                                Browse Catalog
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                        {filteredOrders.map(order => {
                            const product = order.product || {}
                            return (
                                <div
                                    key={order.id}
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: '1rem',
                                        padding: '1.125rem',
                                        border: '1px solid var(--color-border)',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.875rem',
                                    }}
                                >
                                    <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                                        <div
                                            style={{
                                                width: '3.25rem',
                                                height: '3.25rem',
                                                borderRadius: '0.75rem',
                                                backgroundColor: '#EFF6FF',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#2563EB',
                                                flexShrink: 0,
                                            }}
                                        >
                                            <FileText size={24} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
                                                <span style={{ fontSize: '0.625rem', fontWeight: 800, padding: '0.125rem 0.375rem', borderRadius: '0.25rem', backgroundColor: '#DBEAFE', color: '#1E40AF', textTransform: 'uppercase' }}>
                                                    {product.category || 'PDF Material'}
                                                </span>
                                                <span style={{ fontSize: '0.625rem', fontWeight: 800, padding: '0.125rem 0.375rem', borderRadius: '0.25rem', backgroundColor: '#ECFDF5', color: '#059669' }}>
                                                    ✓ Verified
                                                </span>
                                            </div>
                                            <h3 style={{ margin: '0 0 0.125rem', fontSize: '0.9375rem', fontWeight: 800, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {product.title || 'Digital Study Material'}
                                            </h3>
                                            <p style={{ margin: 0, fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                                                Purchased {formatDate(order.created_at)} • {formatNaira(order.amount / 100)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Reference metadata strip */}
                                    <div style={{ backgroundColor: '#F8FAFC', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.6875rem' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Ref: <code style={{ color: '#0F172A', fontFamily: 'monospace', fontWeight: 600 }}>{order.paystack_reference}</code></span>
                                        <button
                                            onClick={() => handleCopyText(order.id, order.paystack_reference)}
                                            style={{ background: 'none', border: 'none', color: '#2563EB', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem', fontWeight: 700 }}
                                        >
                                            {copiedId === order.id ? <Check size={12} /> : <Copy size={12} />}
                                            <span>{copiedId === order.id ? 'Copied' : 'Copy Ref'}</span>
                                        </button>
                                    </div>

                                    {/* Download Button */}
                                    <button
                                        onClick={() => handleDownload(order)}
                                        disabled={downloadingId === order.id}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '0.75rem',
                                            border: 'none',
                                            background: 'linear-gradient(135deg, #10B981, #059669)',
                                            color: 'white',
                                            fontSize: '0.875rem',
                                            fontWeight: 700,
                                            cursor: downloadingId === order.id ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
                                        }}
                                    >
                                        {downloadingId === order.id ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                <span>Personalizing PDF Copy...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Download size={16} />
                                                <span>Download Licensed PDF</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Self-Service Dispute / Claim Modal */}
            {showClaimModal && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', padding: '1rem' }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '1.25rem', width: '100%', maxWidth: '28rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Sparkles size={18} color="#2563EB" />
                                <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800 }}>Claim Missing Purchase</h3>
                            </div>
                            <button onClick={() => setShowClaimModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', color: 'var(--color-text-muted)' }}>
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleClaimSubmit} style={{ padding: '1.25rem' }}>
                            <p style={{ margin: '0 0 1rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                                If you were debited by your bank or received a Paystack email confirmation but your document isn't appearing, paste the transaction reference below to verify and unlock it.
                            </p>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.375rem', color: '#0F172A' }}>
                                    Paystack Reference or Transaction ID *
                                </label>
                                <input
                                    type="text"
                                    value={claimReference}
                                    onChange={e => setClaimReference(e.target.value)}
                                    placeholder="e.g. ZKS-1787258553381-P1A807T"
                                    required
                                    autoFocus
                                    style={{ width: '100%', padding: '0.625rem 0.75rem', borderRadius: '0.5rem', border: '1.5px solid #3B82F6', fontSize: '0.8125rem', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>

                            {claimError && (
                                <div style={{ padding: '0.625rem 0.75rem', borderRadius: '0.5rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                    <AlertCircle size={15} style={{ flexShrink: 0 }} />
                                    <span>{claimError}</span>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowClaimModal(false)}
                                    style={{ flex: 1, padding: '0.625rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', backgroundColor: 'white', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={claiming || !claimReference.trim()}
                                    style={{
                                        flex: 2,
                                        padding: '0.625rem',
                                        borderRadius: '0.625rem',
                                        border: 'none',
                                        background: claiming ? '#94A3B8' : 'linear-gradient(135deg, #3B82F6, #2563EB)',
                                        color: 'white',
                                        fontWeight: 800,
                                        fontSize: '0.8125rem',
                                        cursor: claiming ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.375rem'
                                    }}
                                >
                                    {claiming ? (
                                        <>
                                            <Loader2 size={15} className="animate-spin" />
                                            <span>Verifying with Paystack...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={15} />
                                            <span>Verify & Unlock Material</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
