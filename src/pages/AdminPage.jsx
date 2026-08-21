import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Shield, Users, Package, ShoppingCart, Activity, Search, RefreshCw,
    CheckCircle2, XCircle, AlertTriangle, Trash2, Eye, ExternalLink,
    Lock, Unlock, Download, ArrowLeft, TrendingUp, DollarSign, Database,
    FileText, UserCheck, UserX, ShieldAlert, Sparkles, Filter, Check, Copy,
    ChevronRight, Server, Zap, Megaphone, Pin, Send, Plus, Wrench, Info
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import {
    getAdminStats, getAdminUsers, toggleUserBan, toggleUserVerification,
    getAdminListings, adminDeleteListing, adminUpdateListingStatus, getAdminOrders,
    getAnnouncements, createAnnouncement, deleteAnnouncement, togglePinAnnouncement, toggleAnnouncementStatus
} from '../lib/database'
import { useToast } from '../components/Toast'
import { invalidateCacheByPrefix } from '../lib/cache'
import { verifyPaystackPayment } from '../lib/paystack'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount || 0)
}

function formatDate(iso) {
    if (!iso) return 'N/A'
    return new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
}

const templates = [
    {
        name: '🚀 Feature Update',
        category: 'feature_update',
        priority: 'high',
        title: 'New Feature Live on ZikShare! 🚀',
        content: 'We have just introduced a major update to help you find and purchase past questions and study notes faster. Try it out now!',
        action_url: '/search',
        action_label: 'Explore New Features',
        is_pinned: true
    },
    {
        name: '⚠️ Disciplinary / Ban Warning',
        category: 'disciplinary_notice',
        priority: 'urgent_popup',
        title: 'Disciplinary Notice: Fraud & Malpractice ⚠️',
        content: 'Multiple student accounts were suspended today for uploading copyright-infringing materials and fraudulent listings. Academic integrity is strictly enforced on ZikShare.',
        action_url: '/profile/help',
        action_label: 'Read Marketplace Rules',
        is_pinned: false
    },
    {
        name: '🛡️ Safe Meetup Alert',
        category: 'security_alert',
        priority: 'normal',
        title: 'Campus Safety Reminder: Meetup Points 🛡️',
        content: 'Always conduct physical exchanges in verified public campus locations: Garba Square, Chisco Park, or Student Center. Never send money before inspection.',
        action_url: '/messages',
        action_label: 'Campus Safety Hub',
        is_pinned: true
    },
    {
        name: '🔧 Scheduled Maintenance',
        category: 'maintenance',
        priority: 'normal',
        title: 'Scheduled System Optimization 🔧',
        content: 'ZikShare servers will undergo routine performance upgrades tonight between 1:00 AM and 2:00 AM. Study materials access remains fully functional.',
        action_url: '',
        action_label: '',
        is_pinned: false
    }
]

export default function AdminPage() {
    const navigate = useNavigate()
    useAuth()
    const toast = useToast()

    const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'users' | 'listings' | 'orders' | 'broadcasts' | 'system'
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    // Data States
    const [stats, setStats] = useState(null)
    const [usersList, setUsersList] = useState([])
    const [listingsList, setListingsList] = useState([])
    const [ordersList, setOrdersList] = useState([])
    const [announcementsList, setAnnouncementsList] = useState([])

    // Filter & Search States
    const [userSearch, setUserSearch] = useState('')
    const [userFilter, setUserFilter] = useState('all') // 'all' | 'verified' | 'unverified' | 'banned'

    const [listingSearch, setListingSearch] = useState('')
    const [listingType, setListingType] = useState('all') // 'all' | 'physical' | 'digital'
    const [listingStatus] = useState('all')

    const [orderSearch, setOrderSearch] = useState('')
    const [orderFilter, setOrderFilter] = useState('all') // 'all' | 'delivered' | 'pending' | 'amount_mismatch'
    const [disputeRefInput, setDisputeRefInput] = useState('')
    const [resolvingDispute, setResolvingDispute] = useState(false)

    // Broadcast Composer States
    const [broadcastTitle, setBroadcastTitle] = useState('')
    const [broadcastContent, setBroadcastContent] = useState('')
    const [broadcastCategory, setBroadcastCategory] = useState('feature_update')
    const [broadcastPriority, setBroadcastPriority] = useState('normal')
    const [broadcastActionUrl, setBroadcastActionUrl] = useState('')
    const [broadcastActionLabel, setBroadcastActionLabel] = useState('')
    const [broadcastPinned, setBroadcastPinned] = useState(false)
    const [broadcasting, setBroadcasting] = useState(false)

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
            const [st, uList, lList, oList, aList] = await Promise.all([
                getAdminStats().catch(err => { console.error('Stats error:', err); return null }),
                getAdminUsers({ limit: 150 }).catch(err => { console.error('Users error:', err); return [] }),
                getAdminListings({ limit: 150 }).catch(err => { console.error('Listings error:', err); return [] }),
                getAdminOrders({ limit: 150 }).catch(err => { console.error('Orders error:', err); return [] }),
                getAnnouncements({ limit: 50, includeInactive: true }).catch(err => { console.error('Announcements error:', err); return [] }),
            ])

            setDbLatency(Math.round(performance.now() - startTime))
            setStats(st)
            setUsersList(uList || [])
            setListingsList(lList || [])
            setOrdersList(oList || [])
            setAnnouncementsList(aList || [])

            if (isRefresh) toast.success('Admin data updated!')
        } catch (err) {
            console.error('Failed to load admin suite:', err)
            toast.error('Failed to load dashboard data')
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
        if (orderFilter !== 'all') {
            list = list.filter(o => o.status === orderFilter)
        }
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
    }, [ordersList, orderFilter, orderSearch])

    // Reconcile / Re-Verify Paystack Transaction (Dispute Tool)
    const handleReverifyOrder = async (reference) => {
        if (!reference) return
        setActionLoading(true)
        try {
            const res = await verifyPaystackPayment(reference)
            if (res?.success) {
                toast.success(res.message || 'Payment verified & order status synced with Paystack! 🎉')
                await loadAllData(true)
            } else {
                toast.error(res?.message || res?.error || 'Paystack check returned unverified/failed status.')
            }
        } catch (err) {
            toast.error('Re-verification failed: ' + err.message)
        } finally {
            setActionLoading(false)
        }
    }

    const handleDisputeReconcile = async (e) => {
        e.preventDefault()
        if (!disputeRefInput.trim()) {
            toast.error('Please enter a Paystack reference.')
            return
        }

        setResolvingDispute(true)
        try {
            const res = await verifyPaystackPayment(disputeRefInput.trim())
            if (res?.success) {
                toast.success(`✓ Resolved! Order for "${res.order?.product?.title || 'Material'}" confirmed delivered.`)
                setDisputeRefInput('')
                await loadAllData(true)
            } else {
                toast.error(res?.message || res?.error || 'No successful charge found on Paystack for this reference.')
            }
        } catch (err) {
            toast.error('Dispute lookup failed: ' + err.message)
        } finally {
            setResolvingDispute(false)
        }
    }

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
            toast.error('Failed to update ban: ' + err.message)
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

    // Broadcast Handlers
    const handleApplyTemplate = (tmpl) => {
        setBroadcastCategory(tmpl.category)
        setBroadcastPriority(tmpl.priority)
        setBroadcastTitle(tmpl.title)
        setBroadcastContent(tmpl.content)
        setBroadcastActionUrl(tmpl.action_url)
        setBroadcastActionLabel(tmpl.action_label)
        setBroadcastPinned(tmpl.is_pinned)
        toast.success(`Applied "${tmpl.name}" template`)
    }

    const handleSendBroadcast = async (e) => {
        e.preventDefault()
        if (!broadcastTitle.trim() || !broadcastContent.trim()) {
            toast.error('Please provide both title and announcement content')
            return
        }

        setBroadcasting(true)
        try {
            const created = await createAnnouncement({
                title: broadcastTitle,
                content: broadcastContent,
                category: broadcastCategory,
                priority: broadcastPriority,
                action_url: broadcastActionUrl,
                action_label: broadcastActionLabel,
                is_pinned: broadcastPinned,
                sender_email: 'rc5632250@gmail.com'
            })

            setAnnouncementsList(prev => [created, ...prev])
            toast.success('Broadcast dispatched to all students! 🚀')
            // Reset form
            setBroadcastTitle('')
            setBroadcastContent('')
            setBroadcastActionUrl('')
            setBroadcastActionLabel('')
            setBroadcastPinned(false)
        } catch (err) {
            console.error('Broadcast error:', err)
            toast.error('Failed to dispatch broadcast: ' + err.message)
        } finally {
            setBroadcasting(false)
        }
    }

    const handleDeleteAnnouncement = async (id) => {
        if (!window.confirm('Delete this broadcast announcement?')) return
        try {
            await deleteAnnouncement(id)
            setAnnouncementsList(prev => prev.filter(a => a.id !== id))
            toast.success('Announcement removed')
        } catch (err) {
            toast.error('Failed to delete: ' + err.message)
        }
    }

    const handleTogglePinAnnouncement = async (id, currentPin) => {
        try {
            await togglePinAnnouncement(id, !currentPin)
            setAnnouncementsList(prev => prev.map(a => a.id === id ? { ...a, is_pinned: !currentPin } : a))
            toast.success(!currentPin ? 'Pinned to top of official channel' : 'Unpinned')
        } catch (err) {
            toast.error('Failed to update pin: ' + err.message)
        }
    }

    const handleToggleAnnouncementStatus = async (id, currentActive) => {
        try {
            await toggleAnnouncementStatus(id, !currentActive)
            setAnnouncementsList(prev => prev.map(a => a.id === id ? { ...a, is_active: !currentActive } : a))
            toast.success(!currentActive ? 'Broadcast activated' : 'Broadcast hidden')
        } catch (err) {
            toast.error('Failed to update status: ' + err.message)
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
        invalidateCacheByPrefix('announcements')
        toast.success('All client caches purged!')
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0B0F19', color: '#F8FAFC', paddingBottom: '4rem', fontFamily: 'inherit' }}>
            {/* ── MOBILE-OPTIMIZED TOP APP BAR ── */}
            <header
                style={{
                    backgroundColor: '#111827',
                    borderBottom: '1px solid #1F2937',
                    padding: '0.75rem 1rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                }}
            >
                {/* Main Header Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                width: '2.125rem',
                                height: '2.125rem',
                                borderRadius: '0.5rem',
                                backgroundColor: '#1F2937',
                                border: '1px solid #374151',
                                color: '#9CA3AF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                flexShrink: 0,
                            }}
                            title="Exit to Marketplace"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', minWidth: 0 }}>
                            <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '0.375rem', backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                                <Shield size={14} />
                            </div>
                            <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                ZikShare Admin
                            </span>
                            <span style={{ fontSize: '0.5625rem', fontWeight: 800, backgroundColor: '#DC2626', color: 'white', padding: '0.1rem 0.35rem', borderRadius: '0.25rem', flexShrink: 0 }}>
                                SUPERADMIN
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => loadAllData(true)}
                        disabled={refreshing}
                        style={{
                            height: '2.125rem',
                            padding: '0 0.625rem',
                            borderRadius: '0.5rem',
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            color: '#E5E7EB',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: refreshing ? 'not-allowed' : 'pointer',
                            flexShrink: 0,
                        }}
                    >
                        <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
                        <span style={{ display: 'inline-block' }}>{refreshing ? 'Syncing...' : 'Sync'}</span>
                    </button>
                </div>

                {/* Sub-bar: Authenticated Status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.375rem 0.625rem', backgroundColor: '#0B0F19', borderRadius: '0.5rem', border: '1px solid #1E293B', fontSize: '0.6875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#10B981', flexShrink: 0 }} />
                        <span style={{ color: '#60A5FA', fontWeight: 600 }}>rc5632250@gmail.com</span>
                    </div>
                    <span style={{ color: '#64748B', fontWeight: 700, flexShrink: 0 }}>
                        {dbLatency ? `${dbLatency}ms` : 'Connected'}
                    </span>
                </div>
            </header>

            {/* ── HORIZONTAL SCROLLING PILL TABS BAR ── */}
            <div style={{ backgroundColor: '#111827', borderBottom: '1px solid #1F2937', padding: '0.5rem 0.75rem', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
                <div style={{ display: 'flex', gap: '0.375rem', width: 'max-content' }}>
                    {[
                        { id: 'overview', label: 'Overview', icon: Activity, count: null },
                        { id: 'broadcasts', label: 'Broadcasts', icon: Megaphone, count: announcementsList.length },
                        { id: 'users', label: 'Users', icon: Users, count: usersList.length },
                        { id: 'listings', label: 'Marketplace', icon: Package, count: listingsList.length },
                        { id: 'orders', label: 'Orders', icon: ShoppingCart, count: ordersList.length },
                        { id: 'system', label: 'System', icon: Database, count: null },
                    ].map(tab => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '0.45rem 0.75rem',
                                    borderRadius: '9999px',
                                    border: `1px solid ${isActive ? '#3B82F6' : '#334155'}`,
                                    backgroundColor: isActive ? '#2563EB' : '#1E293B',
                                    color: isActive ? '#FFFFFF' : '#94A3B8',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.15s'
                                }}
                            >
                                <Icon size={14} />
                                <span>{tab.label}</span>
                                {tab.count !== null && (
                                    <span style={{ fontSize: '0.625rem', padding: '0.05rem 0.35rem', borderRadius: '9999px', backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#0F172A', color: isActive ? 'white' : '#CBD5E1', fontWeight: 800 }}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* ── MAIN CONTENT CONTAINER ── */}
            <main style={{ maxWidth: '48rem', margin: '0 auto', padding: '1rem 0.75rem' }}>
                {loading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '0.75rem' }}>
                        <RefreshCw size={28} className="animate-spin" color="#3B82F6" />
                        <p style={{ color: '#94A3B8', fontSize: '0.8125rem', fontWeight: 600 }}>Loading administration telemetry...</p>
                    </div>
                ) : (
                    <>
                        {/* ── TAB 1: OVERVIEW & PULSE ── */}
                        {activeTab === 'overview' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {/* 2x2 Clean Responsive KPI Metric Cards Grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem' }}>
                                    {/* Card 1: Revenue */}
                                    <div style={{ backgroundColor: '#1E293B', padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #334155', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                                            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Revenue</span>
                                            <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '0.375rem', backgroundColor: '#064E3B', color: '#34D399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <DollarSign size={13} />
                                            </div>
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#34D399', letterSpacing: '-0.02em' }}>
                                                {formatNaira(stats?.totalRevenueNaira || 0)}
                                            </p>
                                            <p style={{ margin: '0.125rem 0 0', fontSize: '0.625rem', color: '#64748B' }}>
                                                {stats?.totalOrders || 0} orders
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card 2: Students */}
                                    <div style={{ backgroundColor: '#1E293B', padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #334155', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                                            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Students</span>
                                            <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '0.375rem', backgroundColor: '#1E3A8A', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Users size={13} />
                                            </div>
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                                                {stats?.totalUsers || 0}
                                            </p>
                                            <p style={{ margin: '0.125rem 0 0', fontSize: '0.625rem', color: '#64748B' }}>
                                                {stats?.verifiedUsers || 0} verified
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card 3: Study Materials */}
                                    <div style={{ backgroundColor: '#1E293B', padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #334155', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                                            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Materials</span>
                                            <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '0.375rem', backgroundColor: '#4C1D95', color: '#C084FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <FileText size={13} />
                                            </div>
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#C084FC', letterSpacing: '-0.02em' }}>
                                                {stats?.totalDigital || 0}
                                            </p>
                                            <p style={{ margin: '0.125rem 0 0', fontSize: '0.625rem', color: '#64748B' }}>
                                                {stats?.drmOrdersCount || 0} DRM copies
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card 4: Listings */}
                                    <div style={{ backgroundColor: '#1E293B', padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #334155', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                                            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Listings</span>
                                            <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '0.375rem', backgroundColor: '#78350F', color: '#FBBF24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Package size={13} />
                                            </div>
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#FBBF24', letterSpacing: '-0.02em' }}>
                                                {stats?.totalListings || 0}
                                            </p>
                                            <p style={{ margin: '0.125rem 0 0', fontSize: '0.625rem', color: '#64748B' }}>
                                                {stats?.activeListings || 0} active
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Platform System Pulse Status */}
                                <div style={{ backgroundColor: '#1E293B', borderRadius: '0.75rem', border: '1px solid #334155', padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                        <Activity size={16} color="#38BDF8" />
                                        <h2 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 800, color: 'white' }}>Live Telemetry Health</h2>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.625rem', backgroundColor: '#0F172A', borderRadius: '0.5rem', fontSize: '0.75rem' }}>
                                            <span style={{ color: '#94A3B8' }}>Postgres Database</span>
                                            <span style={{ fontWeight: 700, color: '#34D399', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem' }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#10B981' }} />
                                                Healthy ({dbLatency}ms)
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.625rem', backgroundColor: '#0F172A', borderRadius: '0.5rem', fontSize: '0.75rem' }}>
                                            <span style={{ color: '#94A3B8' }}>Storage (digital-originals)</span>
                                            <span style={{ fontWeight: 700, color: '#34D399', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem' }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#10B981' }} />
                                                Operational
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.625rem', backgroundColor: '#0F172A', borderRadius: '0.5rem', fontSize: '0.75rem' }}>
                                            <span style={{ color: '#94A3B8' }}>Official Broadcast Channel</span>
                                            <span style={{ fontWeight: 700, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem' }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#38BDF8' }} />
                                                {announcementsList.length} Broadcasts
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Maintenance Actions */}
                                <div style={{ backgroundColor: '#1E293B', borderRadius: '0.75rem', border: '1px solid #334155', padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                        <Sparkles size={16} color="#FBBF24" />
                                        <h2 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 800, color: 'white' }}>Quick Actions</h2>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => setActiveTab('broadcasts')}
                                            style={{ width: '100%', padding: '0.625rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #2563EB', backgroundColor: '#1E3A8A', color: '#93C5FD', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                        >
                                            <span>📢 Send General Campus Broadcast</span>
                                            <Send size={13} />
                                        </button>
                                        <button
                                            onClick={handlePurgePlatformCache}
                                            style={{ width: '100%', padding: '0.625rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #475569', backgroundColor: '#334155', color: 'white', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                        >
                                            <span>Purge Client Feeds Cache</span>
                                            <RefreshCw size={13} />
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('users')}
                                            style={{ width: '100%', padding: '0.625rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #475569', backgroundColor: '#334155', color: 'white', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                        >
                                            <span>Moderate Users & Students</span>
                                            <Users size={13} />
                                        </button>
                                    </div>
                                </div>

                                {/* Recent Sales Feed */}
                                <div style={{ backgroundColor: '#1E293B', borderRadius: '0.75rem', border: '1px solid #334155', padding: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <h3 style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 800, color: 'white' }}>Recent Purchase Activity</h3>
                                        <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: '#60A5FA', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer' }}>View All →</button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {ordersList.slice(0, 5).map(o => (
                                            <div key={o.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.625rem', backgroundColor: '#0F172A', borderRadius: '0.5rem', border: '1px solid #334155', gap: '0.5rem' }}>
                                                <div style={{ minWidth: 0, flex: 1 }}>
                                                    <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {o.product?.title || 'Study Material'}
                                                    </p>
                                                    <p style={{ margin: 0, fontSize: '0.625rem', color: '#94A3B8' }}>
                                                        {formatDate(o.created_at)} • {o.buyer?.displayName || 'Student'}
                                                    </p>
                                                </div>
                                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                    <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 800, color: '#34D399' }}>
                                                        {formatNaira(o.amount / 100)}
                                                    </p>
                                                    <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: o.unique_password ? '#60A5FA' : '#34D399' }}>
                                                        {o.unique_password ? '🛡️ DRM' : '🔓 Open'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── TAB 2: 📢 CAMPUS BROADCASTS & ANNOUNCEMENTS (WHATSAPP-STYLE) ── */}
                        {activeTab === 'broadcasts' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {/* Broadcast Composer Form */}
                                <form onSubmit={handleSendBroadcast} style={{ backgroundColor: '#1E293B', borderRadius: '0.875rem', border: '1px solid #334155', padding: '1.125rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                                <Megaphone size={16} />
                                            </div>
                                            <div>
                                                <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: 'white' }}>New Campus Broadcast</h3>
                                                <p style={{ margin: 0, fontSize: '0.6875rem', color: '#94A3B8' }}>Sends instant general notification to all UNIZIK students</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Templates */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#94A3B8', marginBottom: '0.375rem', textTransform: 'uppercase' }}>
                                            Quick Templates:
                                        </label>
                                        <div style={{ display: 'flex', gap: '0.375rem', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '0.25rem' }}>
                                            {templates.map(t => (
                                                <button
                                                    key={t.name}
                                                    type="button"
                                                    onClick={() => handleApplyTemplate(t)}
                                                    style={{
                                                        padding: '0.3rem 0.6rem',
                                                        borderRadius: '9999px',
                                                        border: '1px solid #334155',
                                                        backgroundColor: '#0F172A',
                                                        color: '#E2E8F0',
                                                        fontSize: '0.6875rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {t.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Category Selector */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#94A3B8', marginBottom: '0.375rem', textTransform: 'uppercase' }}>
                                            Category & Tone
                                        </label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.375rem' }}>
                                            {[
                                                { id: 'feature_update', label: '🚀 Feature Update' },
                                                { id: 'disciplinary_notice', label: '⚠️ Disciplinary Warning' },
                                                { id: 'security_alert', label: '🛡️ Safety & Policy' },
                                                { id: 'marketplace_notice', label: '📢 General Notice' },
                                                { id: 'maintenance', label: '🔧 Maintenance' },
                                            ].map(cat => (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => setBroadcastCategory(cat.id)}
                                                    style={{
                                                        padding: '0.45rem',
                                                        borderRadius: '0.5rem',
                                                        border: `1px solid ${broadcastCategory === cat.id ? '#3B82F6' : '#334155'}`,
                                                        backgroundColor: broadcastCategory === cat.id ? '#1E3A8A' : '#0F172A',
                                                        color: broadcastCategory === cat.id ? '#93C5FD' : '#94A3B8',
                                                        fontSize: '0.6875rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {cat.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Priority Selector */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#94A3B8', marginBottom: '0.375rem', textTransform: 'uppercase' }}>
                                            Delivery Mode & Urgency
                                        </label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.375rem' }}>
                                            {[
                                                { id: 'normal', label: 'Feed & Bell' },
                                                { id: 'high', label: 'Home Banner' },
                                                { id: 'urgent_popup', label: '🚨 Urgent Pop-up' },
                                            ].map(p => (
                                                <button
                                                    key={p.id}
                                                    type="button"
                                                    onClick={() => setBroadcastPriority(p.id)}
                                                    style={{
                                                        padding: '0.45rem',
                                                        borderRadius: '0.5rem',
                                                        border: `1px solid ${broadcastPriority === p.id ? '#3B82F6' : '#334155'}`,
                                                        backgroundColor: broadcastPriority === p.id ? '#1E3A8A' : '#0F172A',
                                                        color: broadcastPriority === p.id ? '#93C5FD' : '#94A3B8',
                                                        fontSize: '0.6875rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {p.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                                            Announcement Title *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Warning: Fraudulent Accounts Suspended / New Search Filter Added"
                                            value={broadcastTitle}
                                            onChange={e => setBroadcastTitle(e.target.value)}
                                            required
                                            maxLength={100}
                                            style={{ width: '100%', padding: '0.625rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #334155', backgroundColor: '#0F172A', color: 'white', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                                            Broadcast Message Body *
                                        </label>
                                        <textarea
                                            placeholder="State details clearly. Will be broadcasted to all active students on web & mobile..."
                                            value={broadcastContent}
                                            onChange={e => setBroadcastContent(e.target.value)}
                                            required
                                            rows={3}
                                            style={{ width: '100%', padding: '0.625rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #334155', backgroundColor: '#0F172A', color: 'white', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>

                                    {/* Optional Action CTA Link */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#94A3B8', marginBottom: '0.25rem' }}>
                                                Action Link (e.g. /post)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="/post or /search"
                                                value={broadcastActionUrl}
                                                onChange={e => setBroadcastActionUrl(e.target.value)}
                                                style={{ width: '100%', padding: '0.5rem 0.625rem', borderRadius: '0.5rem', border: '1px solid #334155', backgroundColor: '#0F172A', color: 'white', fontSize: '0.75rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#94A3B8', marginBottom: '0.25rem' }}>
                                                Button Label
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Try Now / Read Rules"
                                                value={broadcastActionLabel}
                                                onChange={e => setBroadcastActionLabel(e.target.value)}
                                                style={{ width: '100%', padding: '0.5rem 0.625rem', borderRadius: '0.5rem', border: '1px solid #334155', backgroundColor: '#0F172A', color: 'white', fontSize: '0.75rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Pin Option Checkbox */}
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', color: '#CBD5E1' }}>
                                        <input
                                            type="checkbox"
                                            checked={broadcastPinned}
                                            onChange={e => setBroadcastPinned(e.target.checked)}
                                            style={{ width: '1rem', height: '1rem', accentColor: '#2563EB' }}
                                        />
                                        <span>Pin to top of official channel & home banner</span>
                                    </label>

                                    {/* Submit Broadcast Button */}
                                    <button
                                        type="submit"
                                        disabled={broadcasting || !broadcastTitle.trim() || !broadcastContent.trim()}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '0.625rem',
                                            border: 'none',
                                            background: (broadcasting || !broadcastTitle.trim() || !broadcastContent.trim()) ? '#475569' : 'linear-gradient(135deg, #3B82F6, #2563EB)',
                                            color: 'white',
                                            fontSize: '0.875rem',
                                            fontWeight: 800,
                                            cursor: (broadcasting || !broadcastTitle.trim() || !broadcastContent.trim()) ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
                                        }}
                                    >
                                        <Send size={16} />
                                        <span>{broadcasting ? 'Broadcasting...' : '🚀 Broadcast to All Students'}</span>
                                    </button>
                                </form>

                                {/* Broadcast History & Moderation */}
                                <div style={{ backgroundColor: '#1E293B', borderRadius: '0.875rem', border: '1px solid #334155', padding: '1.125rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                                        <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 800, color: 'white' }}>
                                            Broadcast History ({announcementsList.length})
                                        </h3>
                                        <button
                                            onClick={() => navigate('/official-channel')}
                                            style={{ background: 'none', border: 'none', color: '#60A5FA', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                        >
                                            <span>Open Channel Feed</span>
                                            <ExternalLink size={12} />
                                        </button>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                        {announcementsList.map(item => (
                                            <div
                                                key={item.id}
                                                style={{
                                                    backgroundColor: item.is_active ? '#0F172A' : '#18181B',
                                                    border: `1px solid ${item.is_pinned ? '#3B82F6' : '#334155'}`,
                                                    borderRadius: '0.75rem',
                                                    padding: '0.75rem 0.875rem',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '0.5rem'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexWrap: 'wrap' }}>
                                                        <span style={{ fontSize: '0.5625rem', fontWeight: 800, backgroundColor: '#1E3A8A', color: '#93C5FD', padding: '0.1rem 0.35rem', borderRadius: '0.2rem', textTransform: 'uppercase' }}>
                                                            {item.category?.replace('_', ' ')}
                                                        </span>
                                                        {item.is_pinned && (
                                                            <span style={{ fontSize: '0.5625rem', fontWeight: 800, backgroundColor: '#064E3B', color: '#34D399', padding: '0.1rem 0.35rem', borderRadius: '0.2rem' }}>
                                                                📌 PINNED
                                                            </span>
                                                        )}
                                                        {item.priority === 'urgent_popup' && (
                                                            <span style={{ fontSize: '0.5625rem', fontWeight: 800, backgroundColor: '#7F1D1D', color: '#FCA5A5', padding: '0.1rem 0.35rem', borderRadius: '0.2rem' }}>
                                                                🚨 POP-UP
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span style={{ fontSize: '0.625rem', color: '#64748B' }}>
                                                        {formatDate(item.created_at)}
                                                    </span>
                                                </div>

                                                <div>
                                                    <h4 style={{ margin: '0 0 0.125rem', fontSize: '0.8125rem', fontWeight: 800, color: 'white' }}>
                                                        {item.title}
                                                    </h4>
                                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#94A3B8', lineHeight: 1.35 }}>
                                                        {item.content}
                                                    </p>
                                                </div>

                                                {/* Action Bar */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.375rem' }}>
                                                    <button
                                                        onClick={() => handleTogglePinAnnouncement(item.id, item.is_pinned)}
                                                        style={{ flex: 1, padding: '0.3rem', borderRadius: '0.375rem', border: '1px solid #475569', backgroundColor: '#1E293B', color: item.is_pinned ? '#60A5FA' : '#CBD5E1', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer' }}
                                                    >
                                                        {item.is_pinned ? 'Unpin' : '📌 Pin'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleAnnouncementStatus(item.id, item.is_active)}
                                                        style={{ flex: 1, padding: '0.3rem', borderRadius: '0.375rem', border: '1px solid #475569', backgroundColor: '#1E293B', color: item.is_active ? '#34D399' : '#94A3B8', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer' }}
                                                    >
                                                        {item.is_active ? 'Active' : 'Hidden'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteAnnouncement(item.id)}
                                                        style={{ padding: '0.3rem 0.5rem', borderRadius: '0.375rem', border: '1px solid #991B1B', backgroundColor: '#7F1D1D', color: '#FCA5A5', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer' }}
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── TAB 3: USER DIRECTORY & MODERATION ── */}
                        {activeTab === 'users' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {/* Search Bar */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#1E293B', padding: '0.5rem 0.75rem', borderRadius: '0.625rem', border: '1px solid #334155' }}>
                                    <Search size={15} color="#94A3B8" />
                                    <input
                                        type="text"
                                        placeholder="Search student by name, email..."
                                        value={userSearch}
                                        onChange={e => setUserSearch(e.target.value)}
                                        style={{ flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent', color: 'white', fontSize: '0.75rem', fontFamily: 'inherit' }}
                                    />
                                    {userSearch && (
                                        <button onClick={() => setUserSearch('')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: '0.75rem' }}>✕</button>
                                    )}
                                </div>

                                {/* Filter Pills */}
                                <div style={{ display: 'flex', gap: '0.375rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
                                    {['all', 'verified', 'unverified', 'banned'].map(f => (
                                        <button
                                            key={f}
                                            onClick={() => setUserFilter(f)}
                                            style={{
                                                padding: '0.3rem 0.625rem',
                                                borderRadius: '9999px',
                                                border: 'none',
                                                backgroundColor: userFilter === f ? '#2563EB' : '#1E293B',
                                                color: userFilter === f ? 'white' : '#94A3B8',
                                                fontSize: '0.6875rem',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                textTransform: 'capitalize',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>

                                {/* User Cards List */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {filteredUsers.map(u => (
                                        <div
                                            key={u.uid}
                                            style={{
                                                backgroundColor: u.is_banned ? '#450A0A' : '#1E293B',
                                                border: `1px solid ${u.is_banned ? '#991B1B' : '#334155'}`,
                                                borderRadius: '0.75rem',
                                                padding: '0.75rem 0.875rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.625rem'
                                            }}
                                        >
                                            {/* User Header */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                                                <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', backgroundColor: u.is_banned ? '#7F1D1D' : '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.8125rem', flexShrink: 0 }}>
                                                    {(u.displayName || u.email || 'U').charAt(0).toUpperCase()}
                                                </div>
                                                <div style={{ minWidth: 0, flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 700, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                            {u.displayName || 'UNIZIK Student'}
                                                        </p>
                                                        {u.isVerified && <CheckCircle2 size={13} color="#34D399" />}
                                                        {u.is_banned && (
                                                            <span style={{ fontSize: '0.5rem', fontWeight: 800, backgroundColor: '#DC2626', color: 'white', padding: '0.05rem 0.25rem', borderRadius: '0.2rem' }}>
                                                                BANNED
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {u.email} {u.department ? `• ${u.department}` : ''}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Actions Bar */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem' }}>
                                                <button
                                                    onClick={() => handleToggleVerification(u)}
                                                    disabled={actionLoading}
                                                    style={{
                                                        flex: 1,
                                                        padding: '0.35rem',
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
                                                        flex: 1,
                                                        padding: '0.35rem',
                                                        borderRadius: '0.375rem',
                                                        border: `1px solid ${u.is_banned ? '#10B981' : '#EF4444'}`,
                                                        backgroundColor: u.is_banned ? '#064E3B' : '#7F1D1D',
                                                        color: u.is_banned ? '#34D399' : '#FCA5A5',
                                                        fontSize: '0.6875rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    {u.is_banned ? 'Unban' : 'Ban'}
                                                </button>

                                                {u.phoneNumber && (
                                                    <a
                                                        href={`https://wa.me/${u.phoneNumber.replace(/[^0-9]/g, '')}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        style={{
                                                            padding: '0.35rem 0.625rem',
                                                            borderRadius: '0.375rem',
                                                            border: '1px solid #166534',
                                                            backgroundColor: '#14532D',
                                                            color: '#86EFAC',
                                                            fontSize: '0.6875rem',
                                                            fontWeight: 700,
                                                            textDecoration: 'none',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.25rem'
                                                        }}
                                                    >
                                                        💬 WhatsApp
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── TAB 4: MARKETPLACE INVENTORY ── */}
                        {activeTab === 'listings' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {/* Search */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#1E293B', padding: '0.5rem 0.75rem', borderRadius: '0.625rem', border: '1px solid #334155' }}>
                                    <Search size={15} color="#94A3B8" />
                                    <input
                                        type="text"
                                        placeholder="Search title, category, seller..."
                                        value={listingSearch}
                                        onChange={e => setListingSearch(e.target.value)}
                                        style={{ flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent', color: 'white', fontSize: '0.75rem', fontFamily: 'inherit' }}
                                    />
                                    {listingSearch && (
                                        <button onClick={() => setListingSearch('')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: '0.75rem' }}>✕</button>
                                    )}
                                </div>

                                {/* Type Pills */}
                                <div style={{ display: 'flex', gap: '0.375rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
                                    {[
                                        { id: 'all', label: 'All' },
                                        { id: 'physical', label: 'Physical' },
                                        { id: 'digital', label: 'Digital PDFs' },
                                    ].map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setListingType(t.id)}
                                            style={{
                                                padding: '0.3rem 0.625rem',
                                                borderRadius: '9999px',
                                                border: 'none',
                                                backgroundColor: listingType === t.id ? '#2563EB' : '#1E293B',
                                                color: listingType === t.id ? 'white' : '#94A3B8',
                                                fontSize: '0.6875rem',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Listings Cards */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                    {filteredListings.map(item => (
                                        <div
                                            key={item.id}
                                            style={{
                                                backgroundColor: '#1E293B',
                                                border: '1px solid #334155',
                                                borderRadius: '0.75rem',
                                                padding: '0.75rem 0.875rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.625rem'
                                            }}
                                        >
                                            {/* Item Info Header */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                                                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', backgroundColor: item.isDigital ? '#1E3A8A' : '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.isDigital ? '#60A5FA' : '#9CA3AF', flexShrink: 0, overflow: 'hidden' }}>
                                                    {item.images?.[0] ? (
                                                        <img src={item.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        item.isDigital ? <FileText size={18} /> : <Package size={18} />
                                                    )}
                                                </div>
                                                <div style={{ minWidth: 0, flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 800, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                            {item.title}
                                                        </p>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.125rem' }}>
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34D399' }}>
                                                            {formatNaira(item.displayPrice)}
                                                        </span>
                                                        <span style={{ fontSize: '0.5625rem', fontWeight: 800, backgroundColor: item.isDigital ? '#1E3A8A' : '#374151', color: item.isDigital ? '#93C5FD' : '#D1D5DB', padding: '0.05rem 0.25rem', borderRadius: '0.2rem' }}>
                                                            {item.isDigital ? 'Digital' : 'Physical'}
                                                        </span>
                                                        {item.isDigital && (
                                                            <span style={{ fontSize: '0.5625rem', fontWeight: 700, backgroundColor: item.drm_enabled !== false ? '#064E3B' : '#374151', color: item.drm_enabled !== false ? '#34D399' : '#9CA3AF', padding: '0.05rem 0.25rem', borderRadius: '0.2rem' }}>
                                                                {item.drm_enabled !== false ? '🛡️ DRM' : '🔓 Open'}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <p style={{ margin: 0, fontSize: '0.6875rem', color: '#94A3B8' }}>
                                                Seller: <strong style={{ color: '#E2E8F0' }}>{item.seller?.displayName || 'Student'}</strong> ({item.seller?.email || 'N/A'})
                                            </p>

                                            {/* Action Buttons */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem' }}>
                                                <button
                                                    onClick={() => navigate(`/item/${item.id}`)}
                                                    style={{ flex: 1, padding: '0.35rem', borderRadius: '0.375rem', border: '1px solid #475569', backgroundColor: '#334155', color: 'white', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer' }}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleToggleListingStatus(item)}
                                                    disabled={actionLoading}
                                                    style={{
                                                        flex: 1.5,
                                                        padding: '0.35rem',
                                                        borderRadius: '0.375rem',
                                                        border: '1px solid #64748B',
                                                        backgroundColor: (item.status || '').toLowerCase() === 'active' ? '#1E293B' : '#064E3B',
                                                        color: (item.status || '').toLowerCase() === 'active' ? '#CBD5E1' : '#34D399',
                                                        fontSize: '0.6875rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {(item.status || '').toLowerCase() === 'active' ? 'Hide' : 'Publish'}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteListing(item)}
                                                    disabled={actionLoading}
                                                    style={{ flex: 1, padding: '0.35rem', borderRadius: '0.375rem', border: '1px solid #991B1B', backgroundColor: '#7F1D1D', color: '#FCA5A5', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}
                                                >
                                                    <Trash2 size={11} />
                                                    Purge
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── TAB 5: ORDERS & REVENUE AUDIT ── */}
                        {activeTab === 'orders' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                                {/* Dispute Resolution & Reference Lookup Bar */}
                                <form onSubmit={handleDisputeReconcile} style={{ backgroundColor: '#1E293B', padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #3B82F6', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                        <Sparkles size={16} color="#60A5FA" />
                                        <h4 style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 800, color: 'white' }}>Paystack Dispute Lookup & Instant Reconciliation</h4>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.6875rem', color: '#94A3B8' }}>
                                        Enter any Paystack transaction reference (e.g. <code>ZKS-...</code>) to check Paystack live status, verify payment amount, and deliver the material.
                                    </p>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="text"
                                            placeholder="Paste Paystack reference here..."
                                            value={disputeRefInput}
                                            onChange={e => setDisputeRefInput(e.target.value)}
                                            style={{ flex: 1, padding: '0.5rem 0.75rem', backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '0.5rem', color: 'white', fontSize: '0.75rem', fontFamily: 'monospace', outline: 'none' }}
                                        />
                                        <button
                                            type="submit"
                                            disabled={resolvingDispute || !disputeRefInput.trim()}
                                            style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontWeight: 800, fontSize: '0.75rem', cursor: resolvingDispute ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem', whiteSpace: 'nowrap' }}
                                        >
                                            {resolvingDispute ? <RefreshCw size={13} className="animate-spin" /> : <Shield size={13} />}
                                            <span>{resolvingDispute ? 'Checking...' : 'Reconcile'}</span>
                                        </button>
                                    </div>
                                </form>

                                {/* Search and Status Filter Strip */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#1E293B', padding: '0.5rem 0.75rem', borderRadius: '0.625rem', border: '1px solid #334155' }}>
                                        <Search size={15} color="#94A3B8" />
                                        <input
                                            type="text"
                                            placeholder="Search orders by ref, buyer, title..."
                                            value={orderSearch}
                                            onChange={e => setOrderSearch(e.target.value)}
                                            style={{ flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent', color: 'white', fontSize: '0.75rem', fontFamily: 'inherit' }}
                                        />
                                        {orderSearch && (
                                            <button onClick={() => setOrderSearch('')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: '0.75rem' }}>✕</button>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.375rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                                        {[
                                            { key: 'all', label: `All (${ordersList.length})` },
                                            { key: 'delivered', label: `Delivered (${ordersList.filter(o => o.status === 'delivered').length})` },
                                            { key: 'pending', label: `Pending (${ordersList.filter(o => o.status === 'pending').length})` },
                                            { key: 'amount_mismatch', label: `Amount Mismatch (${ordersList.filter(o => o.status === 'amount_mismatch').length})` },
                                        ].map(f => (
                                            <button
                                                key={f.key}
                                                onClick={() => setOrderFilter(f.key)}
                                                style={{
                                                    padding: '0.25rem 0.625rem',
                                                    borderRadius: '9999px',
                                                    border: `1px solid ${orderFilter === f.key ? '#3B82F6' : '#334155'}`,
                                                    backgroundColor: orderFilter === f.key ? '#1E3A8A' : '#1E293B',
                                                    color: orderFilter === f.key ? '#93C5FD' : '#94A3B8',
                                                    fontSize: '0.6875rem',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {f.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Cards */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                    {filteredOrders.length === 0 ? (
                                        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#1E293B', borderRadius: '0.75rem', color: '#94A3B8', fontSize: '0.8125rem' }}>
                                            No orders match your filter criteria.
                                        </div>
                                    ) : filteredOrders.map(order => {
                                        const isDelivered = order.status === 'delivered'
                                        const isMismatch = order.status === 'amount_mismatch'
                                        return (
                                            <div
                                                key={order.id}
                                                style={{
                                                    backgroundColor: '#1E293B',
                                                    border: `1px solid ${isMismatch ? '#EF4444' : isDelivered ? '#334155' : '#F59E0B'}`,
                                                    borderRadius: '0.75rem',
                                                    padding: '0.875rem',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '0.5rem'
                                                }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                                                    <div style={{ minWidth: 0, flex: 1 }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.125rem' }}>
                                                            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#38BDF8', fontFamily: 'monospace' }}>
                                                                {order.paystack_reference}
                                                            </span>
                                                            <button
                                                                onClick={() => handleCopyText(order.paystack_reference, order.id + '_ref')}
                                                                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                                                            >
                                                                {copiedRef === order.id + '_ref' ? <Check size={11} color="#34D399" /> : <Copy size={11} />}
                                                            </button>
                                                            <span style={{ fontSize: '0.5625rem', fontWeight: 800, padding: '0.125rem 0.375rem', borderRadius: '0.25rem', backgroundColor: isDelivered ? '#064E3B' : isMismatch ? '#7F1D1D' : '#78350F', color: isDelivered ? '#6EE7B7' : isMismatch ? '#FCA5A5' : '#FCD34D', textTransform: 'uppercase' }}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                        <h4 style={{ margin: '0.2rem 0 0', fontSize: '0.875rem', fontWeight: 800, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                            {order.product?.title || 'Study Material'}
                                                        </h4>
                                                    </div>
                                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                        <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 900, color: '#34D399' }}>
                                                            {formatNaira(order.amount / 100)}
                                                        </p>
                                                        <p style={{ margin: 0, fontSize: '0.5625rem', color: '#94A3B8' }}>
                                                            Fee: {formatNaira(order.platform_fee / 100)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div style={{ backgroundColor: '#0F172A', padding: '0.5rem 0.625rem', borderRadius: '0.5rem', fontSize: '0.625rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span style={{ color: '#64748B' }}>Buyer:</span>
                                                        <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{order.buyer?.displayName || 'Student'} ({order.buyer?.email || 'N/A'})</span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span style={{ color: '#64748B' }}>Seller:</span>
                                                        <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{order.seller?.displayName || 'Seller'}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span style={{ color: '#64748B' }}>Date:</span>
                                                        <span style={{ color: '#E2E8F0' }}>{formatDate(order.created_at)}</span>
                                                    </div>
                                                    {order.paystack_transaction_id && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: '#64748B' }}>Paystack TX ID:</span>
                                                            <span style={{ color: '#38BDF8', fontFamily: 'monospace' }}>{order.paystack_transaction_id}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.25rem' }}>
                                                    <button
                                                        onClick={() => handleReverifyOrder(order.paystack_reference)}
                                                        disabled={actionLoading}
                                                        style={{ flex: 1, padding: '0.375rem', borderRadius: '0.375rem', border: '1px solid #3B82F6', backgroundColor: '#1E3A8A', color: '#93C5FD', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                                                    >
                                                        <RefreshCw size={11} />
                                                        <span>Re-Verify Paystack</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ── TAB 6: SYSTEM HEALTH ── */}
                        {activeTab === 'system' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ backgroundColor: '#1E293B', borderRadius: '0.75rem', border: '1px solid #334155', padding: '1rem' }}>
                                    <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: 800, color: 'white' }}>System Configuration</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.6875rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0.5rem', backgroundColor: '#0F172A', borderRadius: '0.375rem' }}>
                                            <span style={{ color: '#94A3B8' }}>Sole Admin Email</span>
                                            <code style={{ color: '#60A5FA', fontWeight: 700 }}>rc5632250@gmail.com</code>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0.5rem', backgroundColor: '#0F172A', borderRadius: '0.375rem' }}>
                                            <span style={{ color: '#94A3B8' }}>Database Engine</span>
                                            <span style={{ color: '#34D399', fontWeight: 700 }}>Supabase PostgreSQL</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0.5rem', backgroundColor: '#0F172A', borderRadius: '0.375rem' }}>
                                            <span style={{ color: '#94A3B8' }}>Payment Processing</span>
                                            <span style={{ color: '#34D399', fontWeight: 700 }}>Paystack Split Gateway</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0.5rem', backgroundColor: '#0F172A', borderRadius: '0.375rem' }}>
                                            <span style={{ color: '#94A3B8' }}>Storage Buckets</span>
                                            <span style={{ color: '#34D399', fontWeight: 700 }}>digital-originals</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0.5rem', backgroundColor: '#0F172A', borderRadius: '0.375rem' }}>
                                            <span style={{ color: '#94A3B8' }}>Hosting & CDN</span>
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
