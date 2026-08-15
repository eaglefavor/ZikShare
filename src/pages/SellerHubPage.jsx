import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeft, TrendingUp, DollarSign, ShoppingBag, Package, FileText, 
    Share2, Plus, Edit3, Trash2, CheckCircle2, AlertCircle, ExternalLink, 
    Download, Clock, Building2, User, Loader2, Sparkles, RefreshCw, Eye,
    ShieldCheck, Check
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getSellerAnalytics, updateListing, deleteListing, upsertUser } from '../lib/database'
import EditListingModal from '../components/EditListingModal'
import { invalidateCacheByPrefix } from '../lib/cache'
import { NIGERIAN_BANKS, resolveBankAccount, createPaystackSubaccount, initiateSellerPayout } from '../lib/paystack'
import { logDebug } from '../components/DebugConsole'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount || 0)
}

function formatDate(iso) {
    if (!iso) return 'Recent'
    return new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso))
}

export default function SellerHubPage() {
    const { session, user, isAuthenticated, refreshUser } = useAuth()
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState('analytics') // 'analytics', 'inventory', 'orders', 'payout'
    const [loading, setLoading] = useState(true)
    const [analytics, setAnalytics] = useState(null)
    const [editingListing, setEditingListing] = useState(null)
    const [inventoryFilter, setInventoryFilter] = useState('All') // 'All', 'Digital', 'Physical', 'Inactive'
    const [searchQuery, setSearchQuery] = useState('')
    const [filterCategory, setFilterCategory] = useState('all')

    // Payout settings states
    const [bankName, setBankName] = useState('')
    const [bankCode, setBankCode] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [accountName, setAccountName] = useState('')
    const [resolvingAccount, setResolvingAccount] = useState(false)
    const [accountVerified, setAccountVerified] = useState(false)
    const [savingPayout, setSavingPayout] = useState(false)
    const [payoutSuccess, setPayoutSuccess] = useState(false)
    const [payoutError, setPayoutError] = useState('')

    // Withdrawal states
    const [withdrawing, setWithdrawing] = useState(false)
    const [withdrawSuccess, setWithdrawSuccess] = useState('')
    const [withdrawError, setWithdrawError] = useState('')

    const currentUserId = session?.user?.id || user?.uid || user?.id

    useEffect(() => {
        if (!isAuthenticated || !currentUserId) {
            setLoading(false)
            return
        }

        let isMounted = true
        // Guarantee loading state terminates within 4 seconds max
        const safetyTimer = setTimeout(() => {
            if (isMounted) setLoading(false)
        }, 4000)

        loadDashboardData().finally(() => {
            if (isMounted) setLoading(false)
        })

        return () => {
            isMounted = false
            clearTimeout(safetyTimer)
        }
    }, [isAuthenticated, currentUserId])

    async function loadDashboardData() {
        try {
            const data = await getSellerAnalytics(currentUserId)
            setAnalytics(data || {
                totalEarningsNaira: 0,
                totalSalesCount: 0,
                activeListings: 0,
                totalPhysical: 0,
                totalDigital: 0,
                totalListings: 0,
                orders: [],
                topProducts: [],
                userProfile: user || null,
                listings: []
            })
            if (data?.userProfile) {
                setBankName(data.userProfile.bank_name || '')
                setAccountNumber(data.userProfile.account_number || '')
                setAccountName(data.userProfile.account_name || '')
                if (data.userProfile.bank_code) {
                    setBankCode(data.userProfile.bank_code)
                } else if (data.userProfile.bank_name) {
                    const match = NIGERIAN_BANKS.find(b => b.name === data.userProfile.bank_name)
                    if (match) setBankCode(match.code)
                }
                if (data.userProfile.account_name) {
                    setAccountVerified(true)
                }
            }
        } catch (err) {
            console.error('Failed to load seller hub:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleResolve = useCallback(async (accNum, bCode) => {
        if (!accNum || accNum.length !== 10 || !bCode) return
        
        setResolvingAccount(true)
        setPayoutError('')
        setAccountVerified(false)
        logDebug('info', `Resolving bank account: ${accNum} with bank code ${bCode}...`)

        try {
            const res = await resolveBankAccount(accNum, bCode)
            if (res.success && res.accountName) {
                setAccountName(res.accountName)
                setAccountVerified(true)
                setPayoutError('')
                logDebug('success', `Account resolved: "${res.accountName}"`)
            } else {
                setAccountName('')
                setAccountVerified(false)
                setPayoutError(res.error || 'Could not verify account name.')
                logDebug('warn', `Account resolution failed: ${res.error || 'Unknown'}`)
            }
        } catch (err) {
            setAccountVerified(false)
            setPayoutError(err.message || 'Error resolving bank account.')
            logDebug('error', `Bank resolve error: ${err.message}`, err)
        } finally {
            setResolvingAccount(false)
        }
    }, [])

    const handleBankChange = (e) => {
        const selectedCode = e.target.value
        setBankCode(selectedCode)
        const bankObj = NIGERIAN_BANKS.find(b => b.code === selectedCode)
        setBankName(bankObj ? bankObj.name : '')
        setAccountVerified(false)
        setPayoutError('')
        logDebug('info', `Bank changed: ${bankObj?.name || 'None'} (${selectedCode})`)
        if (accountNumber && accountNumber.length === 10 && selectedCode) {
            handleResolve(accountNumber, selectedCode)
        }
    }

    const handleAccountNumberChange = (e) => {
        const clean = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
        setAccountNumber(clean)
        setAccountVerified(false)
        setPayoutError('')
        if (clean.length === 10 && bankCode) {
            handleResolve(clean, bankCode)
        }
    }

    const handleShareStore = async () => {
        const url = `${window.location.origin}/seller/${currentUserId}`
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
        const cleanNum = (accountNumber || '').replace(/[^0-9]/g, '').slice(0, 10)
        if (!cleanNum || cleanNum.length !== 10) {
            setPayoutError('Please enter a valid 10-digit NUBAN account number.')
            logDebug('warn', 'Save payout blocked: Invalid NUBAN length.')
            return
        }
        if (!bankCode || !bankName) {
            setPayoutError('Please select your bank.')
            logDebug('warn', 'Save payout blocked: No bank selected.')
            return
        }

        setSavingPayout(true)
        setPayoutError('')
        setPayoutSuccess(false)
        logDebug('info', `Saving payout details: ${bankName} - ${cleanNum}...`)

        let finalAccountName = accountName
        // If not verified yet, resolve right now before saving
        if (!accountVerified || !finalAccountName) {
            setResolvingAccount(true)
            logDebug('info', 'Auto-resolving account before saving...')
            try {
                const res = await resolveBankAccount(cleanNum, bankCode)
                if (res.success && res.accountName) {
                    finalAccountName = res.accountName
                    setAccountName(res.accountName)
                    setAccountVerified(true)
                    logDebug('success', `Auto-resolved account: "${res.accountName}"`)
                } else {
                    setPayoutError(res.error || 'Could not verify account with bank. Check account number and bank.')
                    logDebug('error', `Auto-resolve failed: ${res.error}`)
                    setSavingPayout(false)
                    setResolvingAccount(false)
                    return
                }
            } catch (err) {
                setPayoutError(err.message || 'Error resolving bank account.')
                logDebug('error', `Auto-resolve error: ${err.message}`)
                setSavingPayout(false)
                setResolvingAccount(false)
                return
            } finally {
                setResolvingAccount(false)
            }
        }

        try {
            // 1. Save bank information
            await upsertUser({
                uid: currentUserId,
                bank_name: bankName,
                bank_code: bankCode,
                account_number: cleanNum,
                account_name: finalAccountName,
            })

            // 2. Automatically generate / link Paystack subaccount
            try {
                const subRes = await createPaystackSubaccount({
                    userId: currentUserId,
                    businessName: finalAccountName || user?.displayName || 'UNIZIK Student Merchant',
                    bankCode: bankCode,
                    accountNumber: cleanNum,
                })
                if (subRes.success && subRes.subaccountCode) {
                    await upsertUser({
                        uid: currentUserId,
                        paystack_subaccount_code: subRes.subaccountCode,
                    })
                    logDebug('success', `Paystack subaccount linked: ${subRes.subaccountCode}`)
                }
            } catch (subErr) {
                console.warn('Subaccount auto-link note:', subErr)
            }

            setPayoutSuccess(true)
            logDebug('success', `Payout settings saved successfully for UID: ${currentUserId}`)
            await refreshUser()
            setTimeout(() => setPayoutSuccess(false), 4000)
        } catch (err) {
            setPayoutError(err.message || 'Failed to save payout settings.')
            logDebug('error', `Failed to save payout settings: ${err.message}`, err)
        } finally {
            setSavingPayout(false)
        }
    }

    const handleWithdrawEarnings = async () => {
        const availableBalance = analytics?.totalEarningsNaira || 0
        if (availableBalance <= 0) {
            setWithdrawError('No earnings available to withdraw yet.')
            return
        }

        if (!user?.account_number || !user?.bank_code) {
            setWithdrawError('Please save and verify your settlement bank account below before withdrawing.')
            return
        }

        setWithdrawing(true)
        setWithdrawError('')
        setWithdrawSuccess('')

        try {
            const res = await initiateSellerPayout({
                sellerId: currentUserId,
                amountInNaira: availableBalance,
                reason: `ZikShare Seller Earnings Payout (${user.displayName || 'Seller'})`
            })

            if (res.success) {
                setWithdrawSuccess(`🎉 Successfully initiated transfer of ${formatNaira(availableBalance)} to ${user.bank_name || 'your bank'} (${user.account_number})!`)
                logDebug('success', `Withdrawal transfer initiated: ${JSON.stringify(res.data)}`)
            } else {
                setWithdrawError(res.error || 'Failed to initiate transfer. Please verify your bank account.')
            }
        } catch (err) {
            setWithdrawError(err.message || 'Error processing payout transfer.')
        } finally {
            setWithdrawing(false)
        }
    }

    const handleToggleStatus = async (listing) => {
        try {
            const nextStatus = listing.status === 'Active' || listing.status === 'active' ? 'Sold' : 'Active'
            await updateListing(listing.id, { status: nextStatus })
            setAnalytics(prev => ({
                ...prev,
                listings: prev.listings.map(l => l.id === listing.id ? { ...l, status: nextStatus } : l)
            }))
            invalidateCacheByPrefix('listings')
            invalidateCacheByPrefix('digital')
        } catch (err) {
            alert('Failed to update listing status: ' + err.message)
        }
    }

    const filteredListings = (analytics?.listings || []).filter(item => {
        const matchesCategory = 
            inventoryFilter === 'All' ? true :
            inventoryFilter === 'Digital' ? item.isDigital :
            inventoryFilter === 'Physical' ? !item.isDigital :
            inventoryFilter === 'Inactive' ? (item.status === 'Sold' || item.status === 'inactive') : true

        const matchesSearch = !searchQuery || 
            item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category?.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesCategory && matchesSearch
    })

    const tabs = [
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'inventory', label: `Inventory (${analytics?.totalListings || 0})`, icon: Package },
        { id: 'orders', label: `Orders (${analytics?.totalSalesCount || 0})`, icon: ShoppingBag },
        { id: 'payout', label: 'Payouts', icon: Building2 },
    ]

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: '#F8FAFC' }}>
                <div style={{ backgroundColor: 'white', padding: '2rem 1.5rem', borderRadius: '1.25rem', border: '1px solid var(--color-border)', maxWidth: '24rem', width: '100%', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#2563EB', fontSize: '1.5rem' }}>
                        🏪
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#0F172A' }}>Seller Hub</h2>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: '0 0 1.5rem' }}>Sign in with your UNIZIK student account to manage your listings, sales, analytics, and bank payouts.</p>
                    <button
                        onClick={() => navigate('/login')}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                            color: '#FFFFFF',
                            fontSize: '0.9375rem',
                            fontWeight: 800,
                            fontFamily: 'inherit',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(59,130,246,0.35)'
                        }}
                    >
                        Sign In / Register
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingBottom: '5rem' }}>
            {/* Header Toolbar */}
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => navigate('/profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem', color: 'var(--color-text-primary)' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            Seller Hub <Sparkles size={16} color="#F59E0B" />
                        </h1>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>UNIZIK Merchant Dashboard</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={handleShareStore} title="Share your public catalog link" style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Share2 size={16} color="var(--color-text-primary)" />
                    </button>
                    <button onClick={() => navigate('/post')} style={{ padding: '0.375rem 0.875rem', borderRadius: '0.625rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem', boxShadow: '0 2px 8px rgba(59,130,246,0.3)' }}>
                        <Plus size={16} /> New Material
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0 0.5rem', overflowX: 'auto' }} className="hide-scrollbar">
                {tabs.map(tab => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                flex: 1,
                                minWidth: '5.5rem',
                                padding: '0.75rem 0.5rem',
                                border: 'none',
                                borderBottom: isActive ? '2.5px solid var(--color-brand)' : '2.5px solid transparent',
                                backgroundColor: 'transparent',
                                color: isActive ? 'var(--color-brand)' : 'var(--color-text-secondary)',
                                fontWeight: isActive ? 700 : 500,
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.375rem',
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* Available Balance & Instant Withdrawal Card */}
                            <div style={{ backgroundColor: '#0F172A', borderRadius: '1rem', padding: '1.5rem', color: 'white', boxShadow: '0 10px 25px -5px rgba(15,23,42,0.3)', border: '1px solid #1E293B' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div>
                                        <p style={{ margin: '0 0 0.25rem', fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Available Seller Revenue
                                        </p>
                                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#10B981', letterSpacing: '-0.02em' }}>
                                            {formatNaira(analytics?.totalEarningsNaira || 0)}
                                        </h2>
                                    </div>
                                    <div style={{ padding: '0.375rem 0.75rem', borderRadius: '2rem', backgroundColor: '#1E293B', fontSize: '0.6875rem', fontWeight: 700, color: '#38BDF8', border: '1px solid #334155' }}>
                                        {user?.paystack_subaccount_code ? '🟢 Instant Bank Split Active' : '⚡ On-Demand Bank Payout'}
                                    </div>
                                </div>

                                <div style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', backgroundColor: '#1E293B', marginBottom: '1.25rem', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#94A3B8' }}>Settlement Destination:</span>
                                    <span style={{ fontWeight: 700, color: '#F1F5F9' }}>
                                        {user?.account_name ? `${user.account_name} (${user.bank_name || 'Bank'})` : 'No bank account linked yet'}
                                    </span>
                                </div>

                                {withdrawSuccess && (
                                    <div style={{ padding: '0.75rem 1rem', borderRadius: '0.625rem', backgroundColor: '#064E3B', border: '1px solid #059669', color: '#6EE7B7', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <CheckCircle2 size={16} /> <span>{withdrawSuccess}</span>
                                    </div>
                                )}

                                {withdrawError && (
                                    <div style={{ padding: '0.75rem 1rem', borderRadius: '0.625rem', backgroundColor: '#7F1D1D', border: '1px solid #DC2626', color: '#FCA5A5', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <AlertCircle size={16} /> <span>{withdrawError}</span>
                                    </div>
                                )}

                                <button
                                    onClick={handleWithdrawEarnings}
                                    disabled={withdrawing || !analytics?.totalEarningsNaira || analytics?.totalEarningsNaira <= 0 || !user?.account_number}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem',
                                        borderRadius: '0.75rem',
                                        border: 'none',
                                        background: (!analytics?.totalEarningsNaira || analytics?.totalEarningsNaira <= 0 || !user?.account_number)
                                            ? '#334155'
                                            : 'linear-gradient(135deg, #10B981, #059669)',
                                        color: 'white',
                                        fontSize: '0.875rem',
                                        fontWeight: 800,
                                        fontFamily: 'inherit',
                                        cursor: (!analytics?.totalEarningsNaira || analytics?.totalEarningsNaira <= 0 || !user?.account_number || withdrawing) ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        boxShadow: (analytics?.totalEarningsNaira > 0 && user?.account_number) ? '0 4px 14px rgba(16,185,129,0.4)' : 'none'
                                    }}
                                >
                                    {withdrawing ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>Processing Transfer to Bank...</span>
                                        </>
                                    ) : (
                                        <>
                                            <DollarSign size={18} />
                                            <span>Withdraw {formatNaira(analytics?.totalEarningsNaira || 0)} to My Bank Account</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Settlement Bank Configuration Card */}
                            <div style={{ backgroundColor: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                    <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                                        <Building2 size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Settlement Bank Account</h3>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Configure where your PDF sales revenue is automatically transferred</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSavePayout}>
                                {/* Bank Selector */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.375rem' }}>Select Bank *</label>
                                    <select
                                        value={bankCode}
                                        onChange={handleBankChange}
                                        required
                                        style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', backgroundColor: 'white', boxSizing: 'border-box' }}
                                    >
                                        <option value="">Select your bank...</option>
                                        {NIGERIAN_BANKS.map(b => (
                                            <option key={b.code} value={b.code}>{b.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Account Number */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>NUBAN Account Number (10 Digits) *</label>
                                        {resolvingAccount && (
                                            <span style={{ fontSize: '0.6875rem', color: 'var(--color-brand)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Loader2 size={12} className="animate-spin" /> Verifying with Bank...
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="tel"
                                            maxLength={10}
                                            placeholder="0123456789"
                                            value={accountNumber}
                                            onChange={handleAccountNumberChange}
                                            required
                                            style={{ flex: 1, padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: `1px solid ${accountVerified ? '#10B981' : 'var(--color-border)'}`, fontSize: '0.875rem', fontFamily: 'monospace', letterSpacing: '0.05em', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleResolve(accountNumber, bankCode)}
                                            disabled={resolvingAccount || !accountNumber || accountNumber.length !== 10 || !bankCode}
                                            style={{
                                                padding: '0.625rem 1rem',
                                                borderRadius: '0.625rem',
                                                border: '1px solid var(--color-brand)',
                                                backgroundColor: accountVerified ? '#DCFCE7' : '#EFF6FF',
                                                color: accountVerified ? '#166534' : '#2563EB',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                cursor: (resolvingAccount || !accountNumber || accountNumber.length !== 10 || !bankCode) ? 'not-allowed' : 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {resolvingAccount ? <Loader2 size={14} className="animate-spin" /> : accountVerified ? <Check size={14} /> : null}
                                            <span>{accountVerified ? 'Verified' : 'Verify'}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Verified Account Name */}
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>Verified Account Name</label>
                                        {accountVerified && (
                                            <span style={{ fontSize: '0.625rem', color: '#166534', backgroundColor: '#DCFCE7', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Check size={10} strokeWidth={3} /> Verified
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', backgroundColor: accountVerified ? '#F0FDF4' : '#F8FAFC', border: `1px solid ${accountVerified ? '#BBF7D0' : 'var(--color-border)'}`, minHeight: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                                        <span style={{ fontSize: '0.8125rem', fontWeight: accountVerified ? 800 : 500, color: accountVerified ? '#166534' : 'var(--color-text-muted)' }}>
                                            {resolvingAccount ? 'Resolving account holder name...' : accountName || 'Enter 10 digits and select bank to resolve name'}
                                        </span>
                                    </div>
                                </div>

                                {payoutError && (
                                    <div style={{ padding: '0.625rem 0.875rem', borderRadius: '0.625rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                        <AlertCircle size={14} style={{ flexShrink: 0 }} />
                                        <span>{payoutError}</span>
                                    </div>
                                )}

                                {payoutSuccess && (
                                    <div style={{ padding: '0.625rem 0.875rem', borderRadius: '0.625rem', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                        <CheckCircle2 size={16} /> Bank payout details saved successfully!
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={savingPayout || resolvingAccount || !accountNumber || accountNumber.length !== 10 || !bankCode}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem',
                                        borderRadius: '0.75rem',
                                        border: 'none',
                                        background: (savingPayout || resolvingAccount || !accountNumber || accountNumber.length !== 10 || !bankCode) ? '#94A3B8' : 'linear-gradient(135deg, #10B981, #059669)',
                                        color: 'white',
                                        fontSize: '0.875rem',
                                        fontWeight: 700,
                                        fontFamily: 'inherit',
                                        cursor: (savingPayout || resolvingAccount || !accountNumber || accountNumber.length !== 10 || !bankCode) ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        boxShadow: accountVerified ? '0 4px 12px rgba(16,185,129,0.3)' : 'none'
                                    }}
                                >
                                    {savingPayout ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>Saving Settlement Account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 size={18} />
                                            <span>Save Settlement Details</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
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
