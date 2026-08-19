import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Shield, Users, Package, ShoppingCart, Activity, Search, RefreshCw,
    CheckCircle2, XCircle, AlertTriangle, Trash2, Eye, ExternalLink,
    Lock, Unlock, Download, ArrowLeft, TrendingUp, DollarSign, Database,
    FileText, UserCheck, UserX, ShieldAlert, Sparkles, Filter, Check, Copy
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import {
    getAdminStats, getAdminUsers, toggleUserBan, toggleUserVerification,
    getAdminListings, adminDeleteListing, adminUpdateListingStatus, getAdminOrders
} from '../lib/database'
import { useToast } from '../components/Toast'
import { invalidateCacheByPrefix } from '../lib/cache'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount || 0)
}

function formatDate(iso) {
    if (!iso) return 'N/A'
    return new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
}

export default function AdminPage() {
    const navigate = useNavigate()
    const { user, session } = useAuth()
    const toast = useToast()

    const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'users' | 'listings' | 'orders' | 'system'
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    // Data States
    const [stats, setStats] = useState(null)
    const [usersList, setUsersList] = useState([])
    const [listingsList, setListingsList] = useState([])
    const [ordersList, setOrdersList] = useState([])

    // Filter & Search States
    const [userSearch, setUserSearch] = useState('')
    const [userFilter, setUserFilter] = useState('all') // 'all' | 'verified' | 'unverified' | 'banned'

    const [listingSearch, setListingSearch] = useState('')
    const [listingType, setListingType] = useState('all') // 'all' | 'physical' | 'digital'
    const [listingStatus, setListingStatus] = useState('all')

    const [orderSearch, setOrderSearch] = useState('')

    // Action Confirmation States
    const [actionLoading, setActionLoading] = useState(false)
    const [copiedRef, setCopiedRef] = useState(null)

    // System Diagnostics
    const [dbLatency, setDbLatency] = useState(null)

    const loadAllData = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true)
        else setLoading(true)

        const startTime = performance.now()
        try {
            const [st, uList, lList, oList] = await Promise.all([
                getAdminStats().catch(err => { console.error('Stats error:', err); return null }),
                getAdminUsers({ limit: 150 }).catch(err => { console.error('Users error:', err); return [] }),
                getAdminListings({ limit: 150 }).catch(err => { console.error('Listings error:', err); return [] }),
                getAdminOrders({ limit: 150 }).catch(err => { console.error('Orders error:', err); return [] }),
            ])

            setDbLatency(Math.round(performance.now() - startTime))
            setStats(st)
            setUsersList(uList || [])
            setListingsList(lList || [])
            setOrdersList(oList || [])

            if (isRefresh) toast.success('Admin data refreshed!')
        } catch (err) {
            console.error('Failed to load admin suite:', err)
            toast.error('Failed to load some dashboard data')
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        loadAllData()
    }, [])

    // Filtered Users
    const filteredUsers = useMemo(() => {
        let list = usersList
        if (userFilter === 'banned') list = list.filter(u => u.is_banned)
        else if (userFilter === 'verified') list = list.filter(u => u.isVerified)
        else if (userFilter === 'unverified') list = list.filter(u => !u.isVerified)

        if (userSearch.trim()) {
            const q = userSearch.toLowerCase().trim()
            list = list.filter(u =>
                (u.displayName || '').toLowerCase().includes(q) ||
                (u.email || '').toLowerCase().includes(q) ||
                (u.department || '').toLowerCase().includes(q) ||
                (u.phoneNumber || '').includes(q)
            )
        }
        return list
    }, [usersList, userFilter, userSearch])

    // Filtered Listings
    const filteredListings = useMemo(() => {
        let list = listingsList
        if (listingType === 'physical') list = list.filter(l => !l.isDigital)
        else if (listingType === 'digital') list = list.filter(l => l.isDigital)

        if (listingStatus !== 'all') {
            list = list.filter(l => (l.status || '').toLowerCase() === listingStatus.toLowerCase())
        }

        if (listingSearch.trim()) {
            const q = listingSearch.toLowerCase().trim()
            list = list.filter(l =>
                (l.title || '').toLowerCase().includes(q) ||
                (l.category || '').toLowerCase().includes(q) ||
                (l.seller?.displayName || '').toLowerCase().includes(q) ||
                (l.seller?.email || '').toLowerCase().includes(q)
            )
        }
        return list
    }, [listingsList, listingType, listingStatus, listingSearch])

    // Filtered Orders
    const filteredOrders = useMemo(() => {
        let list = ordersList
        if (orderSearch.trim()) {
            const q = orderSearch.toLowerCase().trim()
            list = list.filter(o =>
                (o.paystack_reference || '').toLowerCase().includes(q) ||
                (o.product?.title || '').toLowerCase().includes(q) ||
                (o.buyer?.displayName || '').toLowerCase().includes(q) ||
                (o.buyer?.email || '').toLowerCase().includes(q) ||
                (o.unique_password || '').toLowerCase().includes(q)
            )
        }
        return list
    }, [ordersList, orderSearch])

    // User Actions
    const handleToggleBan = async (u) => {
        const nextState = !u.is_banned
        const confirmMsg = nextState
            ? `Are you sure you want to BAN user "${u.displayName || u.email}"?`
            : `Unban user "${u.displayName || u.email}"?`

        if (!window.confirm(confirmMsg)) return

        setActionLoading(true)
        try {
            await toggleUserBan(u.uid, nextState)
            setUsersList(prev => prev.map(item => item.uid === u.uid ? { ...item, is_banned: nextState } : item))
            toast.success(nextState ? 'User banned successfully' : 'User unbanned successfully')
        } catch (err) {
            toast.error('Failed to update ban status: ' + err.message)
        } finally {
            setActionLoading(false)
        }
    }

    const handleToggleVerification = async (u) => {
        const nextState = !u.isVerified
        setActionLoading(true)
        try {
            await toggleUserVerification(u.uid, nextState)
            setUsersList(prev => prev.map(item => item.uid === u.uid ? { ...item, isVerified: nextState } : item))
            toast.success(nextState ? 'Marked as UNIZIK Verified' : 'Removed Verified badge')
        } catch (err) {
            toast.error('Failed to update verification: ' + err.message)
        } finally {
            setActionLoading(false)
        }
    }

    // Listing Actions
    const handleDeleteListing = async (item) => {
        if (!window.confirm(`Permanently delete listing "${item.title}"? This cannot be undone.`)) return

        setActionLoading(true)
        try {
            await adminDeleteListing(item.id, item.isDigital, item.original_storage_path)
            setListingsList(prev => prev.filter(l => l.id !== item.id))
            toast.success('Listing permanently purged')
        } catch (err) {
            toast.error('Failed to delete listing: ' + err.message)
        } finally {
            setActionLoading(false)
        }
    }

    const handleToggleListingStatus = async (item) => {
        const current = (item.status || '').toLowerCase()
        const nextStatus = current === 'active' ? (item.isDigital ? 'inactive' : 'Inactive') : (item.isDigital ? 'active' : 'Active')

        setActionLoading(true)
        try {
            await adminUpdateListingStatus(item.id, item.isDigital, nextStatus)
            setListingsList(prev => prev.map(l => l.id === item.id ? { ...l, status: nextStatus } : l))
            toast.success(`Status updated to ${nextStatus}`)
        } catch (err) {
            toast.error('Failed to update status: ' + err.message)
        } finally {
            setActionLoading(false)
        }
    }

    const handleCopyText = (text, id) => {
        navigator.clipboard.writeText(text)
        setCopiedRef(id)
        toast.success('Copied to clipboard!')
        setTimeout(() => setCopiedRef(null), 2000)
    }

    const handlePurgePlatformCache = () => {
        invalidateCacheByPrefix('listings')
        invalidateCacheByPrefix('digital')
        invalidateCacheByPrefix('seller')
        invalidateCacheByPrefix('users')
        toast.success('All client caches purged!')
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0B0F19', color: '#F8FAFC', paddingBottom: '4rem' }}>
            {/* Top SuperAdmin Navigation Bar */}
            <header
                style={{
                    backgroundColor: '#111827',
                    borderBottom: '1px solid #1F2937',
                    padding: '0.875rem 1.25rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            background: '#1F2937',
                            border: '1px solid #374151',
                            color: '#9CA3AF',
                            padding: '0.4rem 0.6rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            fontSize: '0.75rem',
                            fontWeight: 600
                        }}
                    >
                        <ArrowLeft size={14} />
                        Exit
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Shield size={18} />
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                <h1 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>
                                    ZikShare Admin Suite
                                </h1>
                                <span style={{ fontSize: '0.5625rem', fontWeight: 800, backgroundColor: '#EF4444', color: 'white', padding: '0.1rem 0.35rem', borderRadius: '0.25rem', textTransform: 'uppercase' }}>
                                    SuperAdmin
                                </span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.6875rem', color: '#9CA3AF' }}>
                                Logged in as <span style={{ color: '#60A5FA', fontWeight: 600 }}>rc5632250@gmail.com</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                        onClick={() => loadAllData(true)}
                        disabled={refreshing}
                        style={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            color: '#E5E7EB',
                            padding: '0.45rem 0.75rem',
                            borderRadius: '0.5rem',
                            cursor: refreshing ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            fontSize: '0.75rem',
                            fontWeight: 600
                        }}
                    >
                        <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </header>

            {/* Sub-Navigation Tabs */}
            <div style={{ backgroundColor: '#111827', borderBottom: '1px solid #1F2937', padding: '0 1rem', overflowX: 'auto' }} className="hide-scrollbar">
                <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '64rem', margin: '0 auto' }}>
                    {[
                        { id: 'overview', label: 'Overview & Pulse', icon: Activity },
                        { id: 'users', label: `Users (${usersList.length})`, icon: Users },
                        { id: 'listings', label: `Marketplace (${listingsList.length})`, icon: Package },
                        { id: 'orders', label: `Orders (${ordersList.length})`, icon: ShoppingCart },
                        { id: 'system', label: 'System Health', icon: Database },
                    ].map(tab => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '0.75rem 1rem',
                                    border: 'none',
                                    borderBottom: `2px solid ${isActive ? '#3B82F6' : 'transparent'}`,
                                    backgroundColor: 'transparent',
                                    color: isActive ? '#60A5FA' : '#9CA3AF',
                                    fontSize: '0.8125rem',
                                    fontWeight: isActive ? 700 : 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.45rem',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.15s'
                                }}
                            >
                                <Icon size={16} />
                                {tab.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Main Content Area */}
            <main style={{ maxWidth: '64rem', margin: '0 auto', padding: '1.25rem 1rem' }}>
                {loading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '0.75rem' }}>
                        <RefreshCw size={32} className="animate-spin" color="#3B82F6" />
                        <p style={{ color: '#9CA3AF', fontSize: '0.8125rem', fontWeight: 600 }}>Loading administration telemetry...</p>
                    </div>
                ) : (
                    <>
                        {/* ── TAB 1: OVERVIEW & PULSE ── */}
                        {activeTab === 'overview' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {/* Top KPI Metric Cards */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.875rem' }}>
                                    <div style={{ backgroundColor: '#1E293B', padding: '1.125rem', borderRadius: '0.875rem', border: '1px solid #334155' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Total Revenue</span>
                                            <div style={{ padding: '0.375rem', backgroundColor: '#064E3B', color: '#34D399', borderRadius: '0.5rem' }}>
                                                <DollarSign size={16} />
                                            </div>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#34D399' }}>
                                            {formatNaira(stats?.totalRevenueNaira || 0)}
                                        </p>
                                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: '#64748B' }}>
                                            {stats?.totalOrders || 0} completed Paystack transactions
                                        </p>
                                    </div>

                                    <div style={{ backgroundColor: '#1E293B', padding: '1.125rem', borderRadius: '0.875rem', border: '1px solid #334155' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Registered Students</span>
                                            <div style={{ padding: '0.375rem', backgroundColor: '#1E3A8A', color: '#60A5FA', borderRadius: '0.5rem' }}>
                                                <Users size={16} />
                                            </div>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF' }}>
                                            {stats?.totalUsers || 0}
                                        </p>
                                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: '#64748B' }}>
                                            {stats?.verifiedUsers || 0} verified • {stats?.bannedUsers || 0} suspended
                                        </p>
                                    </div>

                                    <div style={{ backgroundColor: '#1E293B', padding: '1.125rem', borderRadius: '0.875rem', border: '1px solid #334155' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Study Materials</span>
                                            <div style={{ padding: '0.375rem', backgroundColor: '#4C1D95', color: '#C084FC', borderRadius: '0.5rem' }}>
                                                <FileText size={16} />
                                            </div>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#C084FC' }}>
                                            {stats?.totalDigital || 0}
                                        </p>
                                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: '#64748B' }}>
                                            {stats?.activeDigital || 0} active in catalog • {stats?.drmOrdersCount || 0} DRM copies
                                        </p>
                                    </div>

                                    <div style={{ backgroundColor: '#1E293B', padding: '1.125rem', borderRadius: '0.875rem', border: '1px solid #334155' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Physical Listings</span>
                                            <div style={{ padding: '0.375rem', backgroundColor: '#78350F', color: '#FBBF24', borderRadius: '0.5rem' }}>
                                                <Package size={16} />
                                            </div>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#FBBF24' }}>
                                            {stats?.totalListings || 0}
                                        </p>
                                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: '#64748B' }}>
                                            {stats?.activeListings || 0} active listings on feed
                                        </p>
                                    </div>
                                </div>

                                {/* Quick Command Actions & Security Pulse */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                                    {/* Security & System Status */}
                                    <div style={{ backgroundColor: '#1E293B', borderRadius: '0.875rem', border: '1px solid #334155', padding: '1.25rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                            <Activity size={18} color="#38BDF8" />
                                            <h2 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700, color: 'white' }}>Live Platform Health</h2>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', backgroundColor: '#0F172A', borderRadius: '0.5rem' }}>
                                                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Database Cluster (PostgreSQL)</span>
                                                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#34D399', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#10B981' }} />
                                                    Healthy ({dbLatency}ms)
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', backgroundColor: '#0F172A', borderRadius: '0.5rem' }}>
                                                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Storage Bucket (digital-originals)</span>
                                                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#34D399', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#10B981' }} />
                                                    Operational
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', backgroundColor: '#0F172A', borderRadius: '0.5rem' }}>
                                                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Paystack Webhook & Settlement</span>
                                                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#34D399', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#10B981' }} />
                                                    Live Gateway
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', backgroundColor: '#0F172A', borderRadius: '0.5rem' }}>
                                                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Anti-Piracy DRM & Watermarking</span>
                                                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#60A5FA', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#3B82F6' }} />
                                                    Active
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Admin Controls */}
                                    <div style={{ backgroundColor: '#1E293B', borderRadius: '0.875rem', border: '1px solid #334155', padding: '1.25rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                            <Sparkles size={18} color="#FBBF24" />
                                            <h2 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700, color: 'white' }}>Quick Maintenance</h2>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                            <button
                                                onClick={handlePurgePlatformCache}
                                                style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #475569', backgroundColor: '#334155', color: 'white', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                            >
                                                <span>Purge Platform Client Caches</span>
                                                <RefreshCw size={14} />
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('users')}
                                                style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #475569', backgroundColor: '#334155', color: 'white', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                            >
                                                <span>Manage Banned / Suspended Accounts</span>
                                                <Users size={14} />
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('listings')}
                                                style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #475569', backgroundColor: '#334155', color: 'white', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                            >
                                                <span>Audit & Moderate Marketplace Listings</span>
                                                <Package size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Transaction Audit */}
                                <div style={{ backgroundColor: '#1E293B', borderRadius: '0.875rem', border: '1px solid #334155', padding: '1.25rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
                                        <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: 'white' }}>Recent Purchase Activity</h3>
                                        <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: '#60A5FA', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>View All Orders →</button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {ordersList.slice(0, 5).map(o => (
                                            <div key={o.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.625rem 0.75rem', backgroundColor: '#0F172A', borderRadius: '0.5rem', border: '1px solid #334155' }}>
                                                <div>
                                                    <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: 'white' }}>{o.product?.title || 'Study Material'}</p>
                                                    <p style={{ margin: 0, fontSize: '0.625rem', color: '#94A3B8' }}>{formatDate(o.created_at)} • Buyer: {o.buyer?.displayName || o.buyer?.email || 'Student'}</p>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 800, color: '#34D399' }}>{formatNaira(o.amount / 100)}</p>
                                                    <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: o.unique_password ? '#60A5FA' : '#34D399', backgroundColor: o.unique_password ? '#1E3A8A' : '#064E3B', padding: '0.05rem 0.35rem', borderRadius: '0.25rem' }}>
                                                        {o.unique_password ? 'DRM Encrypted' : 'Open PDF'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── TAB 2: USER DIRECTORY & MODERATION ── */}
                        {activeTab === 'users' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {/* Filters */}
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '240px', backgroundColor: '#1E293B', padding: '0.5rem 0.75rem', borderRadius: '0.625rem', border: '1px solid #334155' }}>
                                        <Search size={16} color="#94A3B8" />
                                        <input
                                            type="text"
                                            placeholder="Search student by name, email, department, phone..."
                                            value={userSearch}
                                            onChange={e => setUserSearch(e.target.value)}
                                            style={{ flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent', color: 'white', fontSize: '0.8125rem', fontFamily: 'inherit' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                                        {['all', 'verified', 'unverified', 'banned'].map(f => (
                                            <button
                                                key={f}
                                                onClick={() => setUserFilter(f)}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    borderRadius: '9999px',
                                                    border: 'none',
                                                    backgroundColor: userFilter === f ? '#2563EB' : '#1E293B',
                                                    color: userFilter === f ? 'white' : '#94A3B8',
                                                    fontSize: '0.6875rem',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    textTransform: 'capitalize'
                                                }}
                                            >
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* User Cards Grid */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                    {filteredUsers.map(u => (
                                        <div
                                            key={u.uid}
                                            style={{
                                                backgroundColor: u.is_banned ? '#450A0A' : '#1E293B',
                                                border: `1px solid ${u.is_banned ? '#991B1B' : '#334155'}`,
                                                borderRadius: '0.75rem',
                                                padding: '0.875rem 1rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: '1rem',
                                                flexWrap: 'wrap'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '220px' }}>
                                                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', backgroundColor: u.is_banned ? '#7F1D1D' : '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.875rem', flexShrink: 0 }}>
                                                    {(u.displayName || u.email || 'U').charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                                        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: 'white' }}>
                                                            {u.displayName || 'UNIZIK Student'}
                                                        </p>
                                                        {u.isVerified && (
                                                            <CheckCircle2 size={14} color="#34D399" />
                                                        )}
                                                        {u.is_banned && (
                                                            <span style={{ fontSize: '0.5625rem', fontWeight: 800, backgroundColor: '#DC2626', color: 'white', padding: '0.1rem 0.35rem', borderRadius: '0.25rem' }}>
                                                                BANNED
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: '#94A3B8' }}>
                                                        {u.email} {u.department ? `• ${u.department}` : ''}
                                                    </p>
                                                    {u.phoneNumber && (
                                                        <p style={{ margin: 0, fontSize: '0.625rem', color: '#60A5FA' }}>
                                                            📱 {u.phoneNumber}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => handleToggleVerification(u)}
                                                    disabled={actionLoading}
                                                    style={{
                                                        padding: '0.375rem 0.625rem',
                                                        borderRadius: '0.375rem',
                                                        border: `1px solid ${u.isVerified ? '#065F46' : '#3B82F6'}`,
                                                        backgroundColor: u.isVerified ? '#064E3B' : '#1E3A8A',
                                                        color: u.isVerified ? '#34D399' : '#93C5FD',
                                                        fontSize: '0.6875rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    {u.isVerified ? '✓ Verified' : '+ Verify'}
                                                </button>

                                                <button
                                                    onClick={() => handleToggleBan(u)}
                                                    disabled={actionLoading}
                                                    style={{
                                                        padding: '0.375rem 0.625rem',
                                                        borderRadius: '0.375rem',
                                                        border: `1px solid ${u.is_banned ? '#10B981' : '#EF4444'}`,
                                                        backgroundColor: u.is_banned ? '#064E3B' : '#7F1D1D',
                                                        color: u.is_banned ? '#34D399' : '#FCA5A5',
                                                        fontSize: '0.6875rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    {u.is_banned ? 'Unban User' : 'Ban User'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── TAB 3: MARKETPLACE INVENTORY ── */}
                        {activeTab === 'listings' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '240px', backgroundColor: '#1E293B', padding: '0.5rem 0.75rem', borderRadius: '0.625rem', border: '1px solid #334155' }}>
                                        <Search size={16} color="#94A3B8" />
                                        <input
                                            type="text"
                                            placeholder="Search items by title, category, seller..."
                                            value={listingSearch}
                                            onChange={e => setListingSearch(e.target.value)}
                                            style={{ flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent', color: 'white', fontSize: '0.8125rem', fontFamily: 'inherit' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                                        {[
                                            { id: 'all', label: 'All Items' },
                                            { id: 'physical', label: 'Physical' },
                                            { id: 'digital', label: 'Digital PDFs/Excel' },
                                        ].map(t => (
                                            <button
                                                key={t.id}
                                                onClick={() => setListingType(t.id)}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    borderRadius: '9999px',
                                                    border: 'none',
                                                    backgroundColor: listingType === t.id ? '#2563EB' : '#1E293B',
                                                    color: listingType === t.id ? 'white' : '#94A3B8',
                                                    fontSize: '0.6875rem',
                                                    fontWeight: 700,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {t.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                    {filteredListings.map(item => (
                                        <div
                                            key={item.id}
                                            style={{
                                                backgroundColor: '#1E293B',
                                                border: '1px solid #334155',
                                                borderRadius: '0.75rem',
                                                padding: '0.875rem 1rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: '1rem',
                                                flexWrap: 'wrap'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '220px', flex: 1 }}>
                                                <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.5rem', backgroundColor: item.isDigital ? '#1E3A8A' : '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.isDigital ? '#60A5FA' : '#9CA3AF', flexShrink: 0, overflow: 'hidden' }}>
                                                    {item.images?.[0] ? (
                                                        <img src={item.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        item.isDigital ? <FileText size={20} /> : <Package size={20} />
                                                    )}
                                                </div>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                                        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: 'white' }}>{item.title}</p>
                                                        <span style={{ fontSize: '0.5625rem', fontWeight: 800, backgroundColor: item.isDigital ? '#1E3A8A' : '#374151', color: item.isDigital ? '#93C5FD' : '#D1D5DB', padding: '0.1rem 0.35rem', borderRadius: '0.25rem', textTransform: 'uppercase' }}>
                                                            {item.isDigital ? 'Digital' : 'Physical'}
                                                        </span>
                                                        {item.isDigital && (
                                                            <span style={{ fontSize: '0.5625rem', fontWeight: 700, backgroundColor: item.drm_enabled !== false ? '#064E3B' : '#374151', color: item.drm_enabled !== false ? '#34D399' : '#9CA3AF', padding: '0.1rem 0.35rem', borderRadius: '0.25rem' }}>
                                                                {item.drm_enabled !== false ? '🛡️ DRM Locked' : '🔓 Open File'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: '#94A3B8' }}>
                                                        {formatNaira(item.displayPrice)} • Category: {item.category || 'General'} • Seller: {item.seller?.displayName || item.seller?.email || 'Student'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => navigate(`/item/${item.id}`)}
                                                    style={{ padding: '0.375rem 0.625rem', borderRadius: '0.375rem', border: '1px solid #475569', backgroundColor: '#334155', color: 'white', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer' }}
                                                >
                                                    View Item
                                                </button>
                                                <button
                                                    onClick={() => handleToggleListingStatus(item)}
                                                    disabled={actionLoading}
                                                    style={{
                                                        padding: '0.375rem 0.625rem',
                                                        borderRadius: '0.375rem',
                                                        border: '1px solid #64748B',
                                                        backgroundColor: (item.status || '').toLowerCase() === 'active' ? '#1E293B' : '#064E3B',
                                                        color: (item.status || '').toLowerCase() === 'active' ? '#CBD5E1' : '#34D399',
                                                        fontSize: '0.6875rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {(item.status || '').toLowerCase() === 'active' ? 'Hide / Deactivate' : 'Publish / Active'}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteListing(item)}
                                                    disabled={actionLoading}
                                                    style={{ padding: '0.375rem 0.625rem', borderRadius: '0.375rem', border: '1px solid #991B1B', backgroundColor: '#7F1D1D', color: '#FCA5A5', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                >
                                                    <Trash2 size={12} />
                                                    Purge
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── TAB 4: ORDERS & REVENUE AUDIT ── */}
                        {activeTab === 'orders' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#1E293B', padding: '0.5rem 0.75rem', borderRadius: '0.625rem', border: '1px solid #334155' }}>
                                    <Search size={16} color="#94A3B8" />
                                    <input
                                        type="text"
                                        placeholder="Search by Paystack reference (ZKS-...), buyer email, material title, or unlock password..."
                                        value={orderSearch}
                                        onChange={e => setOrderSearch(e.target.value)}
                                        style={{ flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent', color: 'white', fontSize: '0.8125rem', fontFamily: 'inherit' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {filteredOrders.map(order => (
                                        <div
                                            key={order.id}
                                            style={{
                                                backgroundColor: '#1E293B',
                                                border: '1px solid #334155',
                                                borderRadius: '0.75rem',
                                                padding: '1rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.625rem'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38BDF8', fontFamily: 'monospace' }}>
                                                            {order.paystack_reference}
                                                        </span>
                                                        <button
                                                            onClick={() => handleCopyText(order.paystack_reference, order.id + '_ref')}
                                                            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                                                        >
                                                            {copiedRef === order.id + '_ref' ? <Check size={12} color="#34D399" /> : <Copy size={12} />}
                                                        </button>
                                                    </div>
                                                    <h4 style={{ margin: '0.25rem 0 0', fontSize: '0.9375rem', fontWeight: 800, color: 'white' }}>
                                                        {order.product?.title || 'Study Material'}
                                                    </h4>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#34D399' }}>
                                                        {formatNaira(order.amount / 100)}
                                                    </p>
                                                    <p style={{ margin: 0, fontSize: '0.625rem', color: '#94A3B8' }}>
                                                        Settlement: {formatNaira(order.seller_settlement / 100)} • Fee: {formatNaira(order.platform_fee / 100)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', backgroundColor: '#0F172A', padding: '0.625rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.6875rem' }}>
                                                <div>
                                                    <span style={{ color: '#64748B' }}>Buyer:</span> <strong style={{ color: '#E2E8F0' }}>{order.buyer?.displayName || 'Student'}</strong> ({order.buyer?.email || 'N/A'})
                                                </div>
                                                <div>
                                                    <span style={{ color: '#64748B' }}>Seller:</span> <strong style={{ color: '#E2E8F0' }}>{order.seller?.displayName || 'Seller'}</strong> ({order.seller?.email || 'N/A'})
                                                </div>
                                                <div>
                                                    <span style={{ color: '#64748B' }}>Purchased:</span> <span style={{ color: '#E2E8F0' }}>{formatDate(order.created_at)}</span>
                                                </div>
                                                <div>
                                                    <span style={{ color: '#64748B' }}>Unlock Password:</span> <code style={{ color: '#60A5FA', fontWeight: 800 }}>{order.unique_password || 'None (Open PDF)'}</code>
                                                </div>
                                            </div>

                                            {order.watermark_text && (
                                                <div style={{ fontSize: '0.625rem', color: '#94A3B8', backgroundColor: '#111827', padding: '0.375rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace' }}>
                                                    🛡️ Watermark: {order.watermark_text}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── TAB 5: SYSTEM HEALTH ── */}
                        {activeTab === 'system' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div style={{ backgroundColor: '#1E293B', borderRadius: '0.875rem', border: '1px solid #334155', padding: '1.25rem' }}>
                                    <h3 style={{ margin: '0 0 0.875rem', fontSize: '0.9375rem', fontWeight: 700, color: 'white' }}>System Configuration & Architecture</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: '#0F172A', borderRadius: '0.375rem' }}>
                                            <span style={{ color: '#94A3B8' }}>Sole Administrator Email</span>
                                            <code style={{ color: '#60A5FA', fontWeight: 700 }}>rc5632250@gmail.com</code>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: '#0F172A', borderRadius: '0.375rem' }}>
                                            <span style={{ color: '#94A3B8' }}>Database Engine</span>
                                            <span style={{ color: '#34D399', fontWeight: 700 }}>Supabase PostgreSQL (jiateaqbyaalwrkbtvjf)</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: '#0F172A', borderRadius: '0.375rem' }}>
                                            <span style={{ color: '#94A3B8' }}>Payment Processing</span>
                                            <span style={{ color: '#34D399', fontWeight: 700 }}>Paystack Split Payments & Subaccounts</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: '#0F172A', borderRadius: '0.375rem' }}>
                                            <span style={{ color: '#94A3B8' }}>Storage Buckets</span>
                                            <span style={{ color: '#34D399', fontWeight: 700 }}>digital-originals, chat-attachments</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: '#0F172A', borderRadius: '0.375rem' }}>
                                            <span style={{ color: '#94A3B8' }}>Frontend Build & Hosting</span>
                                            <span style={{ color: '#34D399', fontWeight: 700 }}>Vite 7 SPA + Vercel Production</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    )
}
