import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, Lock, Download, Loader2, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getBuyerOrders, createSignedDownloadUrl, fulfillDigitalOrder } from '../lib/database'
import { downloadWatermarkedPdf } from '../lib/pdfWatermark'

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
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [downloadingId, setDownloadingId] = useState(null)
    const [copiedId, setCopiedId] = useState(null)

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

                await downloadWatermarkedPdf(url, title, {
                    buyerName,
                    regNumber,
                    orderId: activeOrder?.id
                })
            } else {
                alert('Could not generate download link. Please contact support.')
            }
        } catch (err) {
            alert('Download failed: ' + err.message)
        } finally {
            setDownloadingId(null)
        }
    }

    const handleCopyPassword = (orderId, pwd) => {
        navigator.clipboard.writeText(pwd)
        setCopiedId(orderId)
        setTimeout(() => setCopiedId(null), 2000)
    }

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
                <header style={{ padding: '0.875rem 1rem', backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><ArrowLeft size={20} /></button>
                    <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800 }}>My Purchased Materials</h1>
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
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingBottom: '5rem' }}>
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><ArrowLeft size={20} /></button>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800, color: '#0F172A' }}>Purchased Study Materials</h1>
                    <p style={{ margin: 0, fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>Your permanent digital library & PDF passwords</p>
                </div>
            </header>

            <div style={{ maxWidth: '36rem', margin: '0 auto', padding: '1rem' }}>
                {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0' }}>
                        <Loader2 size={32} color="var(--color-brand)" className="animate-spin" />
                    </div>
                ) : orders.length === 0 ? (
                    <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '3.5rem 1rem', textAlign: 'center', border: '1px solid var(--color-border)' }}>
                        <FileText size={40} color="#94A3B8" style={{ margin: '0 auto 0.75rem' }} />
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>No purchased materials yet</h3>
                        <p style={{ margin: '0.25rem 0 1.25rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Past questions and lecture materials you purchase on ZikShare will appear here.</p>
                        <button onClick={() => navigate('/search')} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
                            Explore Study Materials
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {orders.map(order => {
                            const product = order.product || {}
                            const isReady = order.status === 'delivered' || order.status === 'ready'

                            return (
                                <div key={order.id} style={{ backgroundColor: 'white', borderRadius: '1.25rem', padding: '1.25rem', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                        <div>
                                            <span style={{ fontSize: '0.625rem', padding: '0.125rem 0.5rem', borderRadius: '9999px', backgroundColor: isReady ? '#DCFCE7' : '#FEF3C7', color: isReady ? '#166534' : '#92400E', fontWeight: 700 }}>
                                                {isReady ? 'Encrypted & Ready' : order.status}
                                            </span>
                                            <h3 style={{ margin: '0.375rem 0 0.125rem', fontSize: '0.9375rem', fontWeight: 800, color: '#0F172A' }}>
                                                {product.title || 'Digital Study Material'}
                                            </h3>
                                            <p style={{ margin: 0, fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                                                Purchased on {formatDate(order.created_at)} • {formatNaira(order.amount / 100)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Password / Access Card */}
                                    {order.unique_password ? (
                                        <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', marginBottom: '0.75rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div>
                                                    <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Unlock Password:</span>
                                                    <p style={{ margin: '0.125rem 0 0', fontFamily: 'monospace', fontWeight: 800, fontSize: '0.9375rem', color: '#1E40AF' }}>
                                                        {order.unique_password}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleCopyPassword(order.id, order.unique_password)}
                                                    style={{ padding: '0.375rem 0.625rem', borderRadius: '0.375rem', border: '1px solid #BFDBFE', backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer' }}
                                                >
                                                    {copiedId === order.id ? 'Copied!' : 'Copy'}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ backgroundColor: '#F0FDF4', padding: '0.625rem 0.75rem', borderRadius: '0.75rem', border: '1px solid #DCFCE7', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '0.9375rem' }}>🔓</span>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#166534' }}>Open PDF (No Password Required)</p>
                                                <p style={{ margin: 0, fontSize: '0.625rem', color: '#15803D' }}>Standard unlocked document</p>
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
                                                <span>Opening PDF...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Download size={16} />
                                                <span>Download PDF</span>
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
