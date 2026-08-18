import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, Lock, Download, Loader2, CheckCircle2, ShieldAlert, Sparkles, Search, X, Check, Copy } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getBuyerOrders, createSignedDownloadUrl, fulfillDigitalOrder } from '../lib/database'
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
            return title.includes(q) || cat.includes(q)
        })
    }, [orders, searchQuery])

    const handleDownload = async (order) => {
        setDownloadingId(order.id)
        try {
            let activeOrder = order
            if (!activeOrder.unique_storage_path || activeOrder.status === 'pending') {
                activeOrder = await fulfillDigitalOrder(activeOrder)
            }

            const storagePath = activeOrder?.unique_storage_path || activeOrder?.product?.original_storage_path
            const url = await createSignedDownloadUrl(storagePath, 3600)
            if (url) {
                const buyerName = user?.displayName || session?.user?.user_metadata?.full_name || 'UNIZIK STUDENT'
                const regNumber = activeOrder?.watermark_text?.match(/REG NO: ([^|]+)/i)?.[1]?.trim() || 'STUDENT'
                const title = activeOrder?.product?.title || 'ZikShare Study Material'

                if (activeOrder.unique_password) {
                    await downloadWatermarkedPdf(url, title, {
                        buyerName,
                        regNumber,
                        orderId: activeOrder?.id
                    })
                } else {
                    const res = await fetch(url)
                    const blob = await res.blob()
                    const blobUrl = window.URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = blobUrl
                    a.download = `${title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    window.URL.revokeObjectURL(blobUrl)
                }
                toast.success('Download started successfully!')
            } else {
                toast.error('Could not generate download link. Please refresh.')
            }
        } catch (err) {
            toast.error('Download failed: ' + err.message)
        } finally {
            setDownloadingId(null)
        }
    }

    const handleCopyPassword = (orderId, pwd) => {
        navigator.clipboard.writeText(pwd)
        setCopiedId(orderId)
        toast.success('Unlock password copied to clipboard!')
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: orders.length > 0 ? '0.75rem' : 0 }}>
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

                {/* In-Library Search Bar */}
                {orders.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', backgroundColor: 'var(--color-background)', borderRadius: '0.625rem', border: '1px solid var(--color-border)' }}>
                        <Search size={15} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
                        <input
                            type="text"
                            placeholder="Search your purchased courses & notes..."
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
                            {searchQuery ? 'No matching materials found' : 'No Study Materials Yet'}
                        </h2>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: '0 0 1.5rem' }}>
                            {searchQuery ? `No files match "${searchQuery}". Try another search.` : 'Browse the campus catalog for lecture slides, past questions, and summaries.'}
                        </p>
                        <button
                            onClick={() => navigate('/search?category=Past%20Questions')}
                            style={{ padding: '0.75rem 1.75rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(59,130,246,0.3)' }}
                        >
                            Explore Study Materials
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                        {filteredOrders.map(order => {
                            const product = order.product || {}
                            const isDrmProtected = Boolean(order.unique_password)
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
                                                backgroundColor: isDrmProtected ? '#EFF6FF' : '#F0FDF4',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: isDrmProtected ? '#2563EB' : '#16A34A',
                                                flexShrink: 0,
                                            }}
                                        >
                                            <FileText size={24} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
                                                <span style={{ fontSize: '0.625rem', fontWeight: 800, padding: '0.125rem 0.375rem', borderRadius: '0.25rem', backgroundColor: isDrmProtected ? '#DBEAFE' : '#DCFCE7', color: isDrmProtected ? '#1E40AF' : '#166534', textTransform: 'uppercase' }}>
                                                    {product.category || 'PDF Material'}
                                                </span>
                                            </div>
                                            <h3 style={{ margin: '0 0 0.125rem', fontSize: '0.9375rem', fontWeight: 800, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {product.title || 'Digital Study Material'}
                                            </h3>
                                            <p style={{ margin: 0, fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                                                Purchased on {formatDate(order.created_at)} • {formatNaira(order.amount / 100)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Password / Access Card */}
                                    {isDrmProtected ? (
                                        <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div>
                                                    <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Unlock Password:</span>
                                                    <p style={{ margin: '0.125rem 0 0', fontFamily: 'monospace', fontWeight: 800, fontSize: '0.9375rem', color: '#1E40AF' }}>
                                                        {order.unique_password}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleCopyPassword(order.id, order.unique_password)}
                                                    style={{ padding: '0.375rem 0.625rem', borderRadius: '0.375rem', border: '1px solid #BFDBFE', backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                >
                                                    {copiedId === order.id ? <Check size={12} /> : <Copy size={12} />}
                                                    {copiedId === order.id ? 'Copied!' : 'Copy'}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ backgroundColor: '#F0FDF4', padding: '0.625rem 0.75rem', borderRadius: '0.75rem', border: '1px solid #DCFCE7', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '0.9375rem' }}>🔓</span>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#166534' }}>Open PDF (No Password Required)</p>
                                                <p style={{ margin: 0, fontSize: '0.625rem', color: '#15803D' }}>Standard unencrypted document</p>
                                            </div>
                                        </div>
                                    )}

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
                                                <span>Preparing PDF Download...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Download size={16} />
                                                <span>Download PDF Document</span>
                                            </>
                                        )}
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
