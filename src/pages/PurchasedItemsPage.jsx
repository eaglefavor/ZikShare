import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Download, Loader2, Search, X, Check, Copy, Sparkles, AlertCircle, Key } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getBuyerOrders, createSignedDownloadUrl } from '../lib/database'
import { claimPurchaseByReference } from '../lib/paystack'
import { downloadWatermarkedPdf, getDrmPassword } from '../lib/pdfWatermark'
import { useToast } from '../components/Toast'
import { Button, EmptyState } from '../components/ui'

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

    const loadPurchases = useCallback(async () => {
        if (!currentUserId) return
        setLoading(true)
        try {
            const data = await getBuyerOrders(currentUserId)
            setOrders(data || [])
        } catch (err) {
            console.error('Failed to load purchases:', err)
        } finally {
            setLoading(false)
        }
    }, [currentUserId])

    useEffect(() => {
        if (!isAuthenticated || !currentUserId) {
            setLoading(false)
            return
        }

        loadPurchases()
    }, [isAuthenticated, currentUserId, loadPurchases])

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
                const isDrmProtected = order?.product?.drm_enabled !== false
                const drmPassword = getDrmPassword(order, user)

                await downloadWatermarkedPdf(url, title, {
                    buyerName,
                    regNumber,
                    orderId: order?.id,
                    password: drmPassword,
                    drmEnabled: isDrmProtected,
                })
                toast.success('DRM-protected study material downloaded! 🚀')
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
            <div className="zs-container">
                <div className="zs-panel" style={{ maxWidth: '28rem', margin: '0 auto', textAlign: 'center' }}>
                    <h1 style={{ margin: '0 0 0.5rem', fontSize: 'var(--zs-fs-h2)' }}>Purchased material</h1>
                    <p style={{ margin: '0 0 1.25rem', fontSize: 'var(--zs-fs-body)', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>
                        Sign in to see the documents you have bought. Everything in the free library stays open
                        without an account.
                    </p>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <button type="button" className="zs-btn zs-btn--primary zs-btn--block" onClick={() => navigate('/login')}>
                            Sign in
                        </button>
                        <button type="button" className="zs-btn zs-btn--outline zs-btn--block" onClick={() => navigate('/library')}>
                            Open the free library
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="zs-container">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div>
                    <p className="zs-eyebrow">Account</p>
                    <h1 style={{ margin: '0.2rem 0 0.35rem', fontSize: 'var(--zs-fs-title)', letterSpacing: '-0.02em' }}>Purchased material</h1>
                    <p className="zs-lead" style={{ margin: 0 }}>
                        {orders.length === 0
                            ? 'Documents you buy appear here with their download and unlocking password.'
                            : `${orders.length} document${orders.length === 1 ? '' : 's'} you have bought.`}
                    </p>
                </div>
                <button type="button" className="zs-btn zs-btn--outline" onClick={() => setShowClaimModal(true)}>
                    <Sparkles size={15} /> Claim a purchase
                </button>
            </div>

            {orders.length > 0 && (
                <div className="zs-field" style={{ marginTop: '1rem', marginBottom: '1rem', maxWidth: '30rem' }}>
                    <Search size={15} color="var(--color-text-muted)" aria-hidden="true" />
                    <input
                        type="search"
                        placeholder="Search by title, course or reference"
                        aria-label="Search purchased material"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex' }}>
                            <X size={14} />
                        </button>
                    )}
                </div>
            )}

            {loading ? (
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="skeleton" style={{ height: '8rem', borderRadius: 'var(--zs-radius-lg)' }} />
                    ))}
                </div>
            ) : filteredOrders.length === 0 ? (
                <EmptyState
                    icon={FileText}
                    title={searchQuery ? 'No purchases match that search' : 'Nothing bought yet'}
                    action={
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Button size="sm" onClick={() => setShowClaimModal(true)}>Claim with a Paystack reference</Button>
                            <Button size="sm" variant="outline" onClick={() => navigate('/library')}>Browse the free library</Button>
                        </div>
                    }
                >
                    {searchQuery
                        ? `Nothing matches “${searchQuery}”.`
                        : 'Paid for something and cannot see it? Paste the Paystack reference and it will be unlocked.'}
                </EmptyState>
            ) : (
                <div style={{ display: 'grid', gap: '0.75rem', maxWidth: '42rem' }}>
                    {filteredOrders.map((order) => {
                        const product = order.product || {}
                        const isDrm = product.drm_enabled !== false
                        const orderPassword = getDrmPassword(order, user)

                        return (
                            <article key={order.id} className="zs-panel" style={{ display: 'grid', gap: '0.7rem' }}>
                                <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                                    <span className="zs-thread__thumb" style={{ width: '2.9rem', height: '2.9rem' }}>
                                        <FileText size={18} aria-hidden="true" />
                                    </span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                                            <span className="zs-tag zs-tag--muted">{product.category || 'Document'}</span>
                                            <span className={`zs-tag ${isDrm ? 'zs-tag--book' : 'zs-tag--free'}`}>
                                                {isDrm ? 'Password protected' : 'Open file'}
                                            </span>
                                        </div>
                                        <h2 style={{ margin: 0, fontSize: 'var(--zs-fs-card)', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {product.title || 'Study material'}
                                        </h2>
                                        <p style={{ margin: '0.15rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                            Bought {formatDate(order.created_at)} · {formatNaira(order.amount / 100)}
                                        </p>
                                    </div>
                                </div>

                                {isDrm && (
                                    <div className="zs-chat__pending" style={{ border: '1px dashed #F59E0B', borderRadius: 'var(--zs-radius-sm)', borderTop: '1px dashed #F59E0B' }}>
                                        <Key size={13} color="#B45309" aria-hidden="true" />
                                        <span style={{ flex: 1 }}>
                                            Open password: <strong style={{ fontFamily: 'ui-monospace, monospace' }}>{orderPassword}</strong>
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleCopyText(`pwd-${order.id}`, orderPassword)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', font: 'inherit', fontSize: 'var(--zs-fs-meta)', fontWeight: 700, color: '#B45309' }}
                                        >
                                            {copiedId === `pwd-${order.id}` ? <Check size={12} /> : <Copy size={12} />}
                                            {copiedId === `pwd-${order.id}` ? 'Copied' : 'Copy'}
                                        </button>
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                    <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        Ref <code style={{ fontFamily: 'ui-monospace, monospace' }}>{order.paystack_reference}</code>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleCopyText(order.id, order.paystack_reference)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', font: 'inherit', fontSize: 'var(--zs-fs-meta)', fontWeight: 700, color: 'var(--color-brand)' }}
                                    >
                                        {copiedId === order.id ? <Check size={12} /> : <Copy size={12} />}
                                        {copiedId === order.id ? 'Copied' : 'Copy ref'}
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    className="zs-btn zs-btn--green zs-btn--block"
                                    onClick={() => handleDownload(order)}
                                    disabled={downloadingId === order.id}
                                >
                                    {downloadingId === order.id ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                    {downloadingId === order.id ? 'Preparing your watermarked PDF…' : 'Download PDF'}
                                </button>
                            </article>
                        )
                    })}
                </div>
            )}

            {showClaimModal && (
                <div className="zs-sheet-backdrop" role="dialog" aria-modal="true" aria-label="Claim a purchase" onClick={() => setShowClaimModal(false)}>
                    <form className="zs-sheet" onSubmit={handleClaimSubmit} onClick={(e) => e.stopPropagation()}>
                        <div className="zs-sheet__head">
                            <strong style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: 'var(--zs-fs-card)' }}>
                                <Sparkles size={15} color="var(--color-brand)" aria-hidden="true" /> Claim a purchase
                            </strong>
                            <button type="button" className="zs-icon-btn" onClick={() => setShowClaimModal(false)} aria-label="Close">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="zs-sheet__body">
                            <p style={{ margin: 0, fontSize: 'var(--zs-fs-small)', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>
                                If you were debited or got a Paystack email but the document is not in your list,
                                paste the transaction reference to verify and unlock it.
                            </p>
                            <div>
                                <label className="zs-label" htmlFor="claim-reference">Paystack reference</label>
                                <input
                                    id="claim-reference"
                                    className="zs-input"
                                    type="text"
                                    value={claimReference}
                                    onChange={(e) => setClaimReference(e.target.value)}
                                    placeholder="e.g. ZKS-1787258553381-P1A807T"
                                    required
                                    autoFocus
                                    style={{ fontFamily: 'ui-monospace, monospace' }}
                                />
                            </div>
                            {claimError && (
                                <p className="zs-auth__error" role="alert">
                                    <AlertCircle size={15} style={{ flexShrink: 0 }} />
                                    <span>{claimError}</span>
                                </p>
                            )}
                        </div>
                        <div className="zs-sheet__foot">
                            <button type="button" className="zs-btn zs-btn--outline" onClick={() => setShowClaimModal(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="zs-btn zs-btn--primary zs-btn--block" disabled={claiming || !claimReference.trim()}>
                                {claiming ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
                                {claiming ? 'Verifying with Paystack…' : 'Verify and unlock'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
