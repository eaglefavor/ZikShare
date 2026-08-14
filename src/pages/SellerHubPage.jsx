import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeft, TrendingUp, DollarSign, ShoppingBag, Package, FileText, 
    Share2, Plus, Edit3, Trash2, CheckCircle2, AlertCircle, ExternalLink, 
    Download, Clock, Building2, User, Loader2, Sparkles, RefreshCw, Eye
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getSellerAnalytics, updateListing, deleteListing, upsertUser } from '../lib/database'
import EditListingModal from '../components/EditListingModal'
import { invalidateCacheByPrefix } from '../lib/cache'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount || 0)
}

function formatDate(iso) {
    if (!iso) return 'Recent'
    return new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso))
}

const NIGERIAN_BANKS = [
    'Access Bank', 'Citibank', 'Ecobank Nigeria', 'Fidelity Bank', 'First Bank of Nigeria',
    'First City Monument Bank (FCMB)', 'Guaranty Trust Bank (GTBank)', 'Heritage Bank',
    'Keystone Bank', 'Kuda Bank', 'Moniepoint MFB', 'OPay', 'Palmpay', 'Polaris Bank',
    'Providus Bank', 'Stanbic IBTC Bank', 'Standard Chartered Bank', 'Sterling Bank',
    'SunTrust Bank', 'Union Bank of Nigeria', 'United Bank for Africa (UBA)', 'Unity Bank',
    'Wema Bank (ALAT)', 'Zenith Bank'
]

export default function SellerHubPage() {
    const { session, user, isAuthenticated, refreshUser } = useAuth()
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState('analytics') // 'analytics', 'inventory', 'orders', 'payout'
    const [loading, setLoading] = useState(true)
    const [analytics, setAnalytics] = useState(null)
    const [editingListing, setEditingListing] = useState(null)
    const [inventoryFilter, setInventoryFilter] = useState('All') // 'All', 'Digital', 'Physical', 'Inactive'
    const [searchQuery, setSearchQuery] = useState('')

    // Payout form state
    const [bankName, setBankName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [accountName, setAccountName] = useState('')
    const [savingPayout, setSavingPayout] = useState(false)
    const [payoutSuccess, setPayoutSuccess] = useState(false)
    const [payoutError, setPayoutError] = useState('')

    const currentUserId = session?.user?.id || user?.uid || user?.id

    useEffect(() => {
        if (!isAuthenticated || !currentUserId) {
            setLoading(false)
            return
        }
        loadDashboardData()
    }, [isAuthenticated, currentUserId])

    async function loadDashboardData() {
        setLoading(true)
        try {
            const data = await getSellerAnalytics(currentUserId)
            setAnalytics(data)
            if (data?.userProfile) {
                setBankName(data.userProfile.bank_name || '')
                setAccountNumber(data.userProfile.account_number || '')
                setAccountName(data.userProfile.account_name || '')
            }
        } catch (err) {
            console.error('Failed to load seller hub:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleShareStore = async () => {
        const url = window.location.origin
        const shareData = {
            title: `${user?.displayName || 'Student'}'s Store on ZikShare`,
            text: `Browse study materials and listings from ${user?.displayName || 'me'} on ZikShare UNIZIK!`,
            url: url,
        }
        if (navigator.share) {
            try { await navigator.share(shareData) } catch {}
        } else {
            await navigator.clipboard.writeText(url)
            alert('Store link copied to clipboard!')
        }
    }

    const handleSavePayout = async (e) => {
        e.preventDefault()
        if (!accountNumber || accountNumber.length < 10) {
            setPayoutError('Please enter a valid 10-digit NUBAN account number.')
            return
        }
        setSavingPayout(true)
        setPayoutError('')
        setPayoutSuccess(false)

        try {
            await upsertUser({
                uid: currentUserId,
                email: session?.user?.email || user?.email || '',
                displayName: user?.displayName || 'Seller',
                bank_name: bankName,
                account_number: accountNumber,
                account_name: accountName,
                isVerified: user?.isVerified || false,
                createdAt: user?.createdAt || new Date().toISOString()
            })
            await refreshUser()
            setPayoutSuccess(true)
            setTimeout(() => setPayoutSuccess(false), 3500)
        } catch (err) {
            console.error('Payout save error:', err)
            setPayoutError('Failed to save bank details. Please try again.')
        } finally {
            setSavingPayout(false)
        }
    }

    const handleToggleStatus = async (item) => {
        const isCurrentlyActive = (item.status === 'Active' || item.status === 'active')
        const nextStatus = isCurrentlyActive ? 'Sold' : (item.isDigital ? 'active' : 'Active')
        try {
            await updateListing(item.id, { status: nextStatus })
            setAnalytics(prev => ({
                ...prev,
                listings: prev.listings.map(l => l.id === item.id ? { ...l, status: nextStatus } : l)
            }))
            invalidateCacheByPrefix('listings')
            invalidateCacheByPrefix(`listing-${item.id}`)
        } catch (err) {
            alert('Failed to update listing status.')
        }
    }

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
                <header style={{ padding: '1rem', backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><ArrowLeft size={20} /></button>
                    <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Seller Hub</h1>
                </header>
                <div style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                    <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                        <ShoppingBag size={32} color="#2563EB" />
                    </div>
                    <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 700 }}>Sign In to access Seller Hub</h2>
                    <p style={{ margin: '0 0 1.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Track sales, manage study materials, and manage payouts.</p>
                    <button onClick={() => navigate('/login')} style={{ padding: '0.875rem 2.5rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.9375rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(59,130,246,0.35)' }}>
                        Sign In Now
                    </button>
                </div>
            </div>
        )
    }

    const filteredListings = (analytics?.listings || []).filter(item => {
        const matchesSearch = !searchQuery || item.title?.toLowerCase().includes(searchQuery.toLowerCase())
        if (!matchesSearch) return false
        if (inventoryFilter === 'Digital') return item.isDigital || item.original_storage_path
        if (inventoryFilter === 'Physical') return !item.isDigital && !item.original_storage_path
        if (inventoryFilter === 'Inactive') return item.status === 'Sold' || item.status === 'inactive'
        return true
    })

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingBottom: '5rem' }}>
            {/* Top Navigation Bar */}
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => navigate('/profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            Seller Hub <Sparkles size={16} color="#EAB308" />
                        </h1>
                        <p style={{ margin: 0, fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{user?.displayName || 'Store Dashboard'}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={handleShareStore} style={{ padding: '0.5rem 0.75rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', backgroundColor: 'white', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Share2 size={14} /> Share
                    </button>
                    <button onClick={() => navigate('/post')} style={{ padding: '0.5rem 0.875rem', borderRadius: '0.625rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem', boxShadow: '0 2px 8px rgba(59,130,246,0.3)' }}>
                        <Plus size={14} /> Upload
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', display: 'flex', padding: '0 0.5rem', overflowX: 'auto' }} className="hide-scrollbar">
                {[
                    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                    { id: 'inventory', label: `Inventory (${analytics?.totalListings || 0})`, icon: Package },
                    { id: 'orders', label: `Sales & Orders (${analytics?.orders?.length || 0})`, icon: ShoppingBag },
                    { id: 'payout', label: 'Payout Settings', icon: Building2 },
                ].map(tab => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '0.875rem 1rem',
                                border: 'none',
                                borderBottom: isActive ? '2px solid var(--color-brand)' : '2px solid transparent',
                                backgroundColor: 'transparent',
                                color: isActive ? 'var(--color-brand)' : 'var(--color-text-secondary)',
                                fontWeight: isActive ? 700 : 500,
                                fontSize: '0.8125rem',
                                fontFamily: 'inherit',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s',
                            }}
                        >
                            <Icon size={16} />
                            <span>{tab.label}</span>
                        </button>
                    )
                })}
            </div>

            {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 0' }}>
                    <Loader2 size={32} color="var(--color-brand)" className="animate-spin" />
                </div>
            ) : (
                <div style={{ padding: '1rem', maxWidth: '48rem', margin: '0 auto' }}>

                    {/* ──────────────── TAB 1: ANALYTICS ──────────────── */}
                    {activeTab === 'analytics' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* KPI Metrics Cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                                <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                                            <DollarSign size={16} />
                                        </div>
                                        <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Earnings</span>
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.375rem', fontWeight: 800, color: '#0F172A' }}>{formatNaira(analytics?.totalEarningsNaira)}</h3>
                                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: '#10B981', fontWeight: 600 }}>● Instant Paystack settlement</p>
                                </div>

                                <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                                            <ShoppingBag size={16} />
                                        </div>
                                        <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Orders Delivered</span>
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.375rem', fontWeight: 800, color: '#0F172A' }}>{analytics?.totalSalesCount || 0}</h3>
                                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{analytics?.orders?.length || 0} total requests</p>
                                </div>

                                <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
                                            <Package size={16} />
                                        </div>
                                        <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Active Listings</span>
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.375rem', fontWeight: 800, color: '#0F172A' }}>{analytics?.activeListings || 0}</h3>
                                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{analytics?.totalDigital || 0} PDFs • {analytics?.totalPhysical || 0} items</p>
                                </div>

                                <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', backgroundColor: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
                                            <Building2 size={16} />
                                        </div>
                                        <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Payout Status</span>
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>
                                        {user?.bank_name ? 'Linked & Active' : 'Setup Required'}
                                    </h3>
                                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: user?.bank_name ? '#10B981' : '#F59E0B', fontWeight: 600 }}>
                                        {user?.bank_name ? `🏦 ${user.bank_name}` : 'Click Payout tab to set'}
                                    </p>
                                </div>
                            </div>

                            {/* Top Selling Materials Ranking */}
                            <div style={{ backgroundColor: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                <h3 style={{ margin: '0 0 1rem', fontSize: '0.9375rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Top Performing Materials</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)' }}>By Sales</span>
                                </h3>

                                {(analytics?.topProducts || []).length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--color-text-muted)' }}>
                                        <FileText size={32} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600 }}>No digital material sales yet</p>
                                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem' }}>Upload past questions, lecture notes, or textbooks to start earning!</p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {analytics.topProducts.slice(0, 5).map((prod, idx) => (
                                            <div key={prod.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)' }}>
                                                <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '0.5rem', backgroundColor: idx === 0 ? '#FEF3C7' : '#EFF6FF', color: idx === 0 ? '#D97706' : '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>
                                                    #{idx + 1}
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <h4 style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prod.title}</h4>
                                                    <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{prod.category} • {formatNaira(prod.price)}</p>
                                                </div>
                                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                    <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#10B981' }}>{formatNaira(prod.revenue)}</span>
                                                    <p style={{ margin: 0, fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>{prod.sales_count} sold</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ──────────────── TAB 2: INVENTORY & LISTINGS ──────────────── */}
                    {activeTab === 'inventory' && (
                        <div>
                            {/* Search and Category Filters */}
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                <input
                                    type="text"
                                    placeholder="Search your listings..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ flex: 1, padding: '0.625rem 0.875rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', outline: 'none', backgroundColor: 'white' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '0.375rem', overflowX: 'auto', marginBottom: '1rem' }} className="hide-scrollbar">
                                {['All', 'Digital', 'Physical', 'Inactive'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setInventoryFilter(f)}
                                        style={{
                                            padding: '0.375rem 0.875rem',
                                            borderRadius: '9999px',
                                            border: 'none',
                                            backgroundColor: inventoryFilter === f ? 'var(--color-brand)' : 'white',
                                            color: inventoryFilter === f ? 'white' : 'var(--color-text-secondary)',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>

                            {/* Inventory List */}
                            {filteredListings.length === 0 ? (
                                <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '3rem 1rem', textAlign: 'center', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                                    <Package size={40} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
                                    <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700 }}>No listings found</p>
                                    <p style={{ margin: '0.25rem 0 1.25rem', fontSize: '0.75rem' }}>Upload course notes or items to populate your catalog.</p>
                                    <button onClick={() => navigate('/post')} style={{ padding: '0.625rem 1.5rem', borderRadius: '0.625rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.8125rem', fontWeight: 700, cursor: 'pointer' }}>
                                        + Post Material
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {filteredListings.map(item => {
                                        const isDigital = item.isDigital || item.original_storage_path
                                        const imageUrl = item.cover_image_url || item.images?.[0]
                                        const isSold = item.status === 'Sold' || item.status === 'inactive'

                                        return (
                                            <div
                                                key={item.id}
                                                style={{
                                                    backgroundColor: 'white',
                                                    borderRadius: '1rem',
                                                    border: '1px solid var(--color-border)',
                                                    padding: '1rem',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '0.75rem',
                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                                                    opacity: isSold ? 0.75 : 1
                                                }}
                                            >
                                                <div style={{ display: 'flex', gap: '0.875rem' }}>
                                                    {/* Thumbnail */}
                                                    <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--color-border)' }}>
                                                        {imageUrl ? (
                                                            <img src={imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        ) : (
                                                            <span style={{ fontSize: '1.75rem' }}>{isDigital ? '📄' : '📦'}</span>
                                                        )}
                                                    </div>

                                                    {/* Meta */}
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
                                                            <span style={{ fontSize: '0.625rem', padding: '0.125rem 0.5rem', borderRadius: '9999px', backgroundColor: isDigital ? '#EFF6FF' : '#FEF3C7', color: isDigital ? '#1E40AF' : '#92400E', fontWeight: 700 }}>
                                                                {isDigital ? 'Digital PDF' : 'Physical Item'}
                                                            </span>
                                                            <span style={{ fontSize: '0.625rem', padding: '0.125rem 0.5rem', borderRadius: '9999px', backgroundColor: isSold ? '#FEF2F2' : '#F0FDF4', color: isSold ? '#DC2626' : '#166534', fontWeight: 700 }}>
                                                                {item.status || 'Active'}
                                                            </span>
                                                        </div>
                                                        <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h4>
                                                        <p className="price-tag" style={{ margin: '0.25rem 0 0', fontSize: '1rem' }}>{formatNaira(item.price)}</p>
                                                    </div>
                                                </div>

                                                {/* In-depth Stats & Quick Action Toolbar */}
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
                                                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                                                        {item.sales_count ? `⚡ ${item.sales_count} sales` : `Added ${formatDate(item.createdAt || item.created_at)}`}
                                                    </span>

                                                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                                                        <button
                                                            onClick={() => navigate(`/item/${item.id}`)}
                                                            title="View live listing"
                                                            style={{ padding: '0.375rem 0.625rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', backgroundColor: '#F8FAFC', fontSize: '0.6875rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                        >
                                                            <Eye size={12} /> Preview
                                                        </button>
                                                        <button
                                                            onClick={() => handleToggleStatus(item)}
                                                            style={{ padding: '0.375rem 0.625rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', backgroundColor: 'white', fontSize: '0.6875rem', fontWeight: 600, cursor: 'pointer' }}
                                                        >
                                                            {isSold ? 'Set Active' : 'Mark Sold'}
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingListing(item)}
                                                            style={{ padding: '0.375rem 0.625rem', borderRadius: '0.5rem', border: '1px solid #BFDBFE', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                        >
                                                            <Edit3 size={12} /> Edit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ──────────────── TAB 3: ORDERS & SALES ──────────────── */}
                    {activeTab === 'orders' && (
                        <div>
                            {(analytics?.orders || []).length === 0 ? (
                                <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '3.5rem 1rem', textAlign: 'center', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                                    <ShoppingBag size={40} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
                                    <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700 }}>No completed orders yet</p>
                                    <p style={{ margin: '0.25rem 0', fontSize: '0.75rem' }}>Purchases of your encrypted materials will be logged here automatically.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {analytics.orders.map(order => (
                                        <div
                                            key={order.id}
                                            style={{
                                                backgroundColor: 'white',
                                                borderRadius: '1rem',
                                                border: '1px solid var(--color-border)',
                                                padding: '1rem',
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <div>
                                                    <span style={{ fontSize: '0.625rem', padding: '0.125rem 0.5rem', borderRadius: '9999px', backgroundColor: order.status === 'delivered' ? '#F0FDF4' : '#FEF3C7', color: order.status === 'delivered' ? '#166534' : '#92400E', fontWeight: 700 }}>
                                                        {order.status === 'delivered' ? 'Encrypted & Delivered' : order.status}
                                                    </span>
                                                    <p style={{ margin: '0.375rem 0 0', fontSize: '0.875rem', fontWeight: 700 }}>Ref: {order.paystack_reference || order.id?.slice(0, 8)}</p>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#10B981' }}>{formatNaira((order.seller_settlement || order.amount) / 100)}</span>
                                                    <p style={{ margin: '0.125rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>Net Settlement</p>
                                                </div>
                                            </div>

                                            <div style={{ padding: '0.625rem', borderRadius: '0.5rem', backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)', fontSize: '0.6875rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                <p style={{ margin: 0 }}><strong>Product ID:</strong> {order.product_id}</p>
                                                <p style={{ margin: 0 }}><strong>Date:</strong> {formatDate(order.created_at)}</p>
                                                {order.download_count !== undefined && (
                                                    <p style={{ margin: 0 }}><strong>Downloads Used:</strong> {order.download_count} / {order.max_downloads || 3}</p>
                                                )}
                                                {order.watermark_text && (
                                                    <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>{order.watermark_text}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ──────────────── TAB 4: PAYOUT SETTINGS ──────────────── */}
                    {activeTab === 'payout' && (
                        <div style={{ backgroundColor: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Direct Bank Payouts</h3>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Earnings from study materials are settled directly to your Nigerian bank account</p>
                                </div>
                            </div>

                            <form onSubmit={handleSavePayout}>
                                {/* Bank Selector */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.375rem' }}>Bank Name</label>
                                    <select
                                        value={bankName}
                                        onChange={(e) => setBankName(e.target.value)}
                                        required
                                        style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', backgroundColor: 'white', boxSizing: 'border-box' }}
                                    >
                                        <option value="">Select your bank...</option>
                                        {NIGERIAN_BANKS.map(b => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Account Number */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.375rem' }}>NUBAN Account Number (10 Digits)</label>
                                    <input
                                        type="tel"
                                        maxLength={10}
                                        placeholder="0123456789"
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, ''))}
                                        required
                                        style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'monospace', letterSpacing: '0.05em', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                </div>

                                {/* Account Name */}
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.375rem' }}>Account Holder Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Victor Chukwudebelu"
                                        value={accountName}
                                        onChange={(e) => setAccountName(e.target.value)}
                                        required
                                        style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                </div>

                                {payoutError && (
                                    <div style={{ padding: '0.625rem 0.875rem', borderRadius: '0.625rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>
                                        {payoutError}
                                    </div>
                                )}

                                {payoutSuccess && (
                                    <div style={{ padding: '0.625rem 0.875rem', borderRadius: '0.625rem', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                        <CheckCircle2 size={16} /> Bank payout details saved successfully!
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={savingPayout}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem',
                                        borderRadius: '0.75rem',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #10B981, #059669)',
                                        color: 'white',
                                        fontSize: '0.875rem',
                                        fontWeight: 700,
                                        fontFamily: 'inherit',
                                        cursor: savingPayout ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
                                    }}
                                >
                                    {savingPayout ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                                    <span>Save Settlement Details</span>
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}

            {/* In-Place Edit Modal */}
            {editingListing && (
                <EditListingModal
                    listing={editingListing}
                    onClose={() => setEditingListing(null)}
                    onUpdated={(updated) => {
                        setAnalytics(prev => ({
                            ...prev,
                            listings: prev.listings.map(l => l.id === updated.id ? updated : l)
                        }))
                    }}
                    onDeleted={(deletedId) => {
                        setAnalytics(prev => ({
                            ...prev,
                            listings: prev.listings.filter(l => l.id !== deletedId),
                            totalListings: Math.max(0, prev.totalListings - 1)
                        }))
                    }}
                />
            )}
        </div>
    )
}
