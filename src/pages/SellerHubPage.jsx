import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    TrendingUp, DollarSign, ShoppingBag, Package, FileText,
    Share2, Plus, Edit3, Trash2, CheckCircle2, AlertCircle,
    Building2, Loader2, Sparkles, RefreshCw, Eye, Store, Search, Check
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getSellerAnalytics, updateListing, deleteListing, upsertUser, boostListing } from '../lib/database'
import EditListingModal from '../components/EditListingModal'
import { invalidateCacheByPrefix } from '../lib/cache'
import { NIGERIAN_BANKS, resolveBankAccount, createPaystackSubaccount, initiateSellerPayout } from '../lib/paystack'
import { logDebug } from '../components/DebugConsole'
import { Button, EmptyState } from '../components/ui'

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

    const loadDashboardData = useCallback(async () => {
        if (!currentUserId) return
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
    }, [currentUserId, user])

    useEffect(() => {
        if (!isAuthenticated || !currentUserId) {
            setLoading(false)
            return
        }

        let isMounted = true
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
    }, [isAuthenticated, currentUserId, loadDashboardData])

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
            try {
                await navigator.share(shareData)
            } catch (err) {
                if (err.name !== 'AbortError') console.warn('Share error:', err)
            }
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
        const availableBalance = analytics?.availableBalanceNaira ?? 0
        if (availableBalance <= 0) {
            setWithdrawError('No available earnings to withdraw yet.')
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
                const refreshed = await getSellerAnalytics(currentUserId)
                if (refreshed) setAnalytics(refreshed)
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
            const isDigital = listing.isDigital || listing.original_storage_path
            const isCurrentActive = listing.status === 'Active' || listing.status === 'active'
            const nextStatus = isCurrentActive
                ? (isDigital ? 'inactive' : 'Sold')
                : (isDigital ? 'active' : 'Active')

            await updateListing(listing.id, { status: nextStatus })
            setAnalytics(prev => ({
                ...prev,
                listings: (prev?.listings || []).map(l => l.id === listing.id ? { ...l, status: nextStatus } : l)
            }))
            invalidateCacheByPrefix('listings')
            invalidateCacheByPrefix('digital')
            invalidateCacheByPrefix('seller')
            invalidateCacheByPrefix('catalog')
            invalidateCacheByPrefix('feed')
        } catch (err) {
            alert('Failed to update listing status: ' + err.message)
        }
    }

    const handleDeleteListing = async (listing) => {
        if (!confirm(`Are you sure you want to delete "${listing.title}"? This cannot be undone.`)) {
            return
        }

        try {
            await deleteListing(listing.id)
            setAnalytics(prev => ({
                ...prev,
                listings: (prev?.listings || []).filter(l => l.id !== listing.id),
                totalListings: Math.max(0, (prev?.totalListings || 1) - 1)
            }))
            invalidateCacheByPrefix('listings')
            invalidateCacheByPrefix('digital')
            invalidateCacheByPrefix('seller')
            invalidateCacheByPrefix(`listing-${listing.id}`)
        } catch (err) {
            alert('Failed to delete listing: ' + err.message)
        }
    }

    const handleBoostListing = async (listing) => {
        try {
            await boostListing(listing.id, 7)
            const boostedUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            setAnalytics(prev => ({
                ...prev,
                listings: (prev?.listings || []).map(l => l.id === listing.id ? { ...l, is_boosted: true, boosted_until: boostedUntil } : l)
            }))
            invalidateCacheByPrefix('listings')
            invalidateCacheByPrefix('digital')
            alert(`🚀 "${listing.title}" is now boosted for 7 days! It will appear with a PROMOTED badge at the top of feed and search.`)
        } catch (err) {
            alert('Failed to boost listing: ' + (err.message || 'Error occurred.'))
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
            <div className="zs-container">
                <div className="zs-panel" style={{ maxWidth: '28rem', margin: '0 auto', textAlign: 'center' }}>
                    <div className="zs-icon-btn" style={{ margin: '0 auto 0.75rem', width: '2.75rem', height: '2.75rem', background: 'var(--color-brand-soft)', color: 'var(--color-brand)', cursor: 'default' }}>
                        <Store size={19} aria-hidden="true" />
                    </div>
                    <h1 style={{ margin: '0 0 0.5rem', fontSize: 'var(--zs-fs-h2)' }}>Seller hub</h1>
                    <p style={{ margin: '0 0 1.25rem', fontSize: 'var(--zs-fs-body)', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>
                        Sign in with your UNIZIK student account to see your listings, sales and payouts.
                    </p>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <button type="button" className="zs-btn zs-btn--primary zs-btn--block" onClick={() => navigate('/login')}>
                            Sign in or register
                        </button>
                        <button type="button" className="zs-btn zs-btn--outline zs-btn--block" onClick={() => navigate('/library')}>
                            Open the library instead
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="zs-container">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                    <p className="zs-eyebrow">Selling</p>
                    <h1 style={{ margin: '0.2rem 0 0.35rem', fontSize: 'var(--zs-fs-title)', letterSpacing: '-0.02em' }}>Seller hub</h1>
                    <p className="zs-lead" style={{ margin: 0 }}>
                        What you have listed, what has sold, and where the money goes.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button type="button" className="zs-btn zs-btn--outline" onClick={handleShareStore}>
                        <Share2 size={15} /> Share my catalog
                    </button>
                    <button type="button" className="zs-btn zs-btn--primary" onClick={() => navigate('/post')}>
                        <Plus size={15} /> New listing
                    </button>
                </div>
            </div>

            <div className="zs-chip-row" role="tablist" aria-label="Seller sections" style={{ margin: '1.25rem 0 1rem' }}>
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`zs-chip${isActive ? ' zs-chip--active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <Icon size={14} aria-hidden="true" /> {tab.label}
                        </button>
                    )
                })}
            </div>

            {loading ? (
                <div className="zs-panel" style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
                    <Loader2 size={24} className="animate-spin" color="var(--color-brand)" aria-label="Loading seller data" />
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* ── Analytics ─────────────────────────────────────── */}
                    {activeTab === 'analytics' && (
                        <>
                            <div className="zs-grid zs-grid--wide" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(9.5rem, 1fr))' }}>
                                <div className="zs-card" style={{ padding: '0.9rem' }}>
                                    <p className="zs-eyebrow" style={{ margin: 0 }}>Total earned</p>
                                    <p style={{ margin: '0.2rem 0 0', fontSize: '1.3rem', fontWeight: 700 }}>{formatNaira(analytics?.totalEarningsNaira)}</p>
                                    <p style={{ margin: '0.15rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>From completed sales</p>
                                </div>
                                <div className="zs-card" style={{ padding: '0.9rem' }}>
                                    <p className="zs-eyebrow" style={{ margin: 0 }}>Sales</p>
                                    <p style={{ margin: '0.2rem 0 0', fontSize: '1.3rem', fontWeight: 700 }}>{analytics?.totalSalesCount || 0}</p>
                                    <p style={{ margin: '0.15rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>{analytics?.orders?.length || 0} orders logged</p>
                                </div>
                                <div className="zs-card" style={{ padding: '0.9rem' }}>
                                    <p className="zs-eyebrow" style={{ margin: 0 }}>Live listings</p>
                                    <p style={{ margin: '0.2rem 0 0', fontSize: '1.3rem', fontWeight: 700 }}>{analytics?.activeListings || 0}</p>
                                    <p style={{ margin: '0.15rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                        {analytics?.totalDigital || 0} PDF · {analytics?.totalPhysical || 0} items
                                    </p>
                                </div>
                                <div className="zs-card" style={{ padding: '0.9rem' }}>
                                    <p className="zs-eyebrow" style={{ margin: 0 }}>Payouts</p>
                                    <p style={{ margin: '0.2rem 0 0', fontSize: 'var(--zs-fs-card)', fontWeight: 700 }}>
                                        {user?.account_number ? 'Bank linked' : 'Not set up'}
                                    </p>
                                    <p style={{ margin: '0.15rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                        {user?.account_number ? `${user.account_name || 'Account'} · ${user.bank_name || 'Bank'}` : 'Add a bank account in Payouts'}
                                    </p>
                                </div>
                            </div>

                            <section className="zs-panel">
                                <div className="zs-section-head" style={{ marginBottom: '0.85rem' }}>
                                    <h2>Best sellers</h2>
                                    <p>Ranked by how many times each listing sold.</p>
                                </div>

                                {(analytics?.topProducts || []).length === 0 ? (
                                    <EmptyState
                                        icon={FileText}
                                        title="Nothing has sold yet"
                                        action={
                                            <Button size="sm" variant="outline" onClick={() => navigate('/post')}>
                                                Post something
                                            </Button>
                                        }
                                    >
                                        Sales of your material will be ranked here as they come in.
                                    </EmptyState>
                                ) : (
                                    <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
                                        {analytics.topProducts.slice(0, 5).map((prod, idx) => (
                                            <li
                                                key={prod.id}
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.7rem', borderRadius: 'var(--zs-radius-sm)', background: 'var(--color-background)' }}
                                            >
                                                <span className="zs-tag zs-tag--muted">#{idx + 1}</span>
                                                <span style={{ flex: 1, minWidth: 0 }}>
                                                    <span style={{ display: 'block', fontSize: 'var(--zs-fs-small)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {prod.title}
                                                    </span>
                                                    <span style={{ display: 'block', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                                        {prod.category} · {formatNaira(prod.price)}
                                                    </span>
                                                </span>
                                                <span style={{ textAlign: 'right', flexShrink: 0 }}>
                                                    <span style={{ display: 'block', fontSize: 'var(--zs-fs-small)', fontWeight: 700, color: 'var(--color-campus-green)' }}>{formatNaira(prod.revenue)}</span>
                                                    <span style={{ display: 'block', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>{prod.sales_count} sold</span>
                                                </span>
                                            </li>
                                        ))}
                                    </ol>
                                )}
                            </section>
                        </>
                    )}

                    {/* ── Inventory ─────────────────────────────────────── */}
                    {activeTab === 'inventory' && (
                        <>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <div className="zs-field" style={{ flex: '1 1 14rem' }}>
                                    <Search size={15} aria-hidden="true" color="var(--color-text-muted)" />
                                    <input
                                        type="search"
                                        placeholder="Search your listings"
                                        aria-label="Search your listings"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <select className="zs-select" aria-label="Filter listings" value={inventoryFilter} onChange={(e) => setInventoryFilter(e.target.value)}>
                                    {['All', 'Digital', 'Physical', 'Inactive'].map((f) => (
                                        <option key={f} value={f}>{f}</option>
                                    ))}
                                </select>
                            </div>

                            {filteredListings.length === 0 ? (
                                <EmptyState
                                    icon={Package}
                                    title={searchQuery || inventoryFilter !== 'All' ? 'No listings match this view' : 'You have not listed anything yet'}
                                    action={
                                        <Button size="sm" onClick={() => navigate('/post')}>
                                            <Plus size={14} /> New listing
                                        </Button>
                                    }
                                >
                                    {searchQuery || inventoryFilter !== 'All'
                                        ? 'Try a different filter or clear the search.'
                                        : 'Post a physical item or upload material and it will appear here.'}
                                </EmptyState>
                            ) : (
                                <div className="zs-panel" style={{ padding: 0, overflow: 'hidden' }}>
                                    {filteredListings.map((item, index) => {
                                        const isDigital = item.isDigital || item.original_storage_path
                                        const imageUrl = item.cover_image_url || item.images?.[0]
                                        const isSold = item.status === 'Sold' || item.status === 'inactive'

                                        return (
                                            <div
                                                key={item.id}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.7rem',
                                                    padding: '0.75rem 0.85rem',
                                                    borderTop: index === 0 ? 'none' : '1px solid var(--color-border-subtle)',
                                                    opacity: isSold ? 0.7 : 1,
                                                }}
                                            >
                                                <span className="zs-thread__thumb" style={{ width: '2.9rem', height: '2.9rem' }}>
                                                    {imageUrl ? <img src={imageUrl} alt="" loading="lazy" /> : isDigital ? <FileText size={17} aria-hidden="true" /> : <Package size={17} aria-hidden="true" />}
                                                </span>

                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', marginBottom: '0.15rem' }}>
                                                        <span className="zs-tag zs-tag--muted">{isDigital ? 'PDF' : 'Item'}</span>
                                                        {isSold && <span className="zs-tag" style={{ background: 'var(--color-danger-soft)', color: 'var(--color-danger)' }}>{item.status}</span>}
                                                        {item.is_boosted && <span className="zs-tag zs-tag--pack">Boosted</span>}
                                                    </div>
                                                    <p style={{ margin: 0, fontSize: 'var(--zs-fs-small)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {item.title}
                                                    </p>
                                                    <p style={{ margin: '0.1rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                                        {formatNaira(item.price)} · {item.sales_count ? `${item.sales_count} sold` : `Added ${formatDate(item.createdAt || item.created_at)}`}
                                                    </p>
                                                </div>

                                                <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                                    <button type="button" className="zs-icon-btn" onClick={() => navigate(`/item/${item.id}`)} aria-label={`Preview ${item.title}`}>
                                                        <Eye size={15} />
                                                    </button>
                                                    <button type="button" className="zs-icon-btn" onClick={() => setEditingListing(item)} aria-label={`Edit ${item.title}`}>
                                                        <Edit3 size={15} />
                                                    </button>
                                                    <button type="button" className="zs-icon-btn" onClick={() => handleToggleStatus(item)} aria-label={isSold ? `Reactivate ${item.title}` : `Mark ${item.title} sold`}>
                                                        {isSold ? <RefreshCw size={15} /> : <CheckCircle2 size={15} />}
                                                    </button>
                                                    <button type="button" className="zs-icon-btn" onClick={() => handleBoostListing(item)} aria-label={`Boost ${item.title}`}>
                                                        <Sparkles size={15} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="zs-icon-btn"
                                                        onClick={() => handleDeleteListing(item)}
                                                        aria-label={`Delete ${item.title}`}
                                                        style={{ color: 'var(--color-danger)' }}
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </>
                    )}

                    {/* ── Orders ────────────────────────────────────────── */}
                    {activeTab === 'orders' && (
                        (analytics?.orders || []).length === 0 ? (
                            <EmptyState icon={ShoppingBag} title="No completed orders yet">
                                When someone buys your material, the order and its settlement are logged here.
                            </EmptyState>
                        ) : (
                            <div className="zs-panel" style={{ padding: 0, overflow: 'hidden' }}>
                                {(analytics.orders || []).map((order, index) => (
                                    <div
                                        key={order.id}
                                        style={{ padding: '0.8rem 0.9rem', borderTop: index === 0 ? 'none' : '1px solid var(--color-border-subtle)' }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                                            <div style={{ minWidth: 0 }}>
                                                <span className={`zs-tag ${order.status === 'delivered' ? 'zs-tag--free' : 'zs-tag--muted'}`}>
                                                    {order.status === 'delivered' ? 'Delivered' : order.status}
                                                </span>
                                                <p style={{ margin: '0.35rem 0 0', fontSize: 'var(--zs-fs-small)', fontWeight: 600 }}>
                                                    Ref {order.paystack_reference || order.id?.slice(0, 8)}
                                                </p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ margin: 0, fontSize: 'var(--zs-fs-card)', fontWeight: 700, color: 'var(--color-campus-green)' }}>
                                                    {formatNaira((order.seller_settlement || order.amount) / 100)}
                                                </p>
                                                <p style={{ margin: '0.1rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>Net settlement</p>
                                            </div>
                                        </div>
                                        <p style={{ margin: '0.4rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                            {formatDate(order.created_at)}
                                            {order.download_count !== undefined ? ` · ${order.download_count} of ${order.max_downloads || 3} downloads used` : ''}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )
                    )}

                    {/* ── Payouts ───────────────────────────────────────── */}
                    {activeTab === 'payout' && (
                        <>
                            <section className="zs-panel">
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    <div>
                                        <p className="zs-eyebrow" style={{ margin: 0 }}>Available to withdraw</p>
                                        <p style={{ margin: '0.25rem 0 0', fontSize: '1.6rem', fontWeight: 700 }}>{formatNaira(analytics?.availableBalanceNaira || 0)}</p>
                                    </div>
                                    <span className="zs-tag zs-tag--muted">
                                        {user?.paystack_subaccount_code ? 'Instant bank split' : 'On-demand payout'}
                                    </span>
                                </div>

                                <p style={{ margin: '0.75rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                    Lifetime {formatNaira(analytics?.totalEarningsNaira || 0)} · withdrawn {formatNaira(analytics?.totalWithdrawnNaira || 0)}
                                    {user?.account_name ? ` · pays to ${user.account_name} (${user.bank_name || 'Bank'})` : ' · no bank account linked'}
                                </p>

                                {withdrawSuccess && (
                                    <p className="zs-tag zs-tag--free" style={{ marginTop: '0.85rem', display: 'inline-flex' }}>{withdrawSuccess}</p>
                                )}
                                {withdrawError && (
                                    <p className="zs-auth__error" style={{ marginTop: '0.85rem' }} role="alert">{withdrawError}</p>
                                )}

                                <button
                                    type="button"
                                    className="zs-btn zs-btn--green zs-btn--block"
                                    style={{ marginTop: '1rem' }}
                                    onClick={handleWithdrawEarnings}
                                    disabled={withdrawing || !analytics?.availableBalanceNaira || analytics?.availableBalanceNaira <= 0 || !user?.account_number}
                                >
                                    {withdrawing ? <Loader2 size={16} className="animate-spin" /> : <DollarSign size={16} />}
                                    {withdrawing ? 'Transferring…' : `Withdraw ${formatNaira(analytics?.availableBalanceNaira || 0)}`}
                                </button>
                                {!user?.account_number && (
                                    <p style={{ margin: '0.5rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                        Add a bank account below before you can withdraw.
                                    </p>
                                )}
                            </section>

                            {(analytics?.payouts || []).length > 0 && (
                                <section className="zs-panel">
                                    <div className="zs-section-head" style={{ marginBottom: '0.6rem' }}>
                                        <h2>Withdrawals</h2>
                                    </div>
                                    {analytics.payouts.map((p) => (
                                        <div
                                            key={p.id}
                                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 0', borderTop: '1px solid var(--color-border-subtle)' }}
                                        >
                                            <div>
                                                <p style={{ margin: 0, fontSize: 'var(--zs-fs-small)', fontWeight: 600 }}>
                                                    {formatNaira(p.amount_naira || (p.amount ? p.amount / 100 : 0))}
                                                </p>
                                                <p style={{ margin: '0.1rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                                    {formatDate(p.created_at)} · {p.bank_name || 'Bank'}
                                                </p>
                                            </div>
                                            <span className={`zs-tag ${p.status === 'success' ? 'zs-tag--free' : p.status === 'failed' ? '' : 'zs-tag--muted'}`}>
                                                {p.status}
                                            </span>
                                        </div>
                                    ))}
                                </section>
                            )}

                            <section className="zs-panel">
                                <div className="zs-section-head" style={{ marginBottom: '0.85rem' }}>
                                    <h2>Payout bank account</h2>
                                    <p>Where money for your sold material is transferred.</p>
                                </div>

                                <form onSubmit={handleSavePayout} style={{ display: 'grid', gap: '0.85rem' }}>
                                    <div>
                                        <label className="zs-label" htmlFor="payout-bank">Bank</label>
                                        <select id="payout-bank" className="zs-select" style={{ width: '100%' }} value={bankCode} onChange={handleBankChange} required>
                                            <option value="">Select your bank</option>
                                            {NIGERIAN_BANKS.map((b) => (
                                                <option key={b.code} value={b.code}>{b.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="zs-label" htmlFor="payout-account">Account number (10 digits)</label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input
                                                id="payout-account"
                                                className="zs-input"
                                                type="tel"
                                                inputMode="numeric"
                                                maxLength={10}
                                                placeholder="0123456789"
                                                value={accountNumber}
                                                onChange={handleAccountNumberChange}
                                                required
                                                style={{ fontFamily: 'ui-monospace, monospace', letterSpacing: '0.05em' }}
                                            />
                                            <button
                                                type="button"
                                                className="zs-btn zs-btn--outline"
                                                onClick={() => handleResolve(accountNumber, bankCode)}
                                                disabled={resolvingAccount || !accountNumber || accountNumber.length !== 10 || !bankCode}
                                            >
                                                {resolvingAccount ? <Loader2 size={14} className="animate-spin" /> : accountVerified ? <Check size={14} /> : null}
                                                {accountVerified ? 'Verified' : 'Verify'}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="zs-label" style={{ marginBottom: '0.3rem' }}>Account name</p>
                                        <div
                                            style={{
                                                padding: '0.6rem 0.75rem',
                                                borderRadius: 'var(--zs-radius-sm)',
                                                border: '1px solid var(--color-border)',
                                                background: accountVerified ? 'var(--color-campus-green-soft)' : 'var(--color-background)',
                                                fontSize: 'var(--zs-fs-body)',
                                                fontWeight: accountVerified ? 600 : 400,
                                                color: accountVerified ? '#166534' : 'var(--color-text-muted)',
                                            }}
                                        >
                                            {resolvingAccount ? 'Resolving account name…' : accountName || 'Enter the number and select a bank, then verify'}
                                        </div>
                                    </div>

                                    {payoutError && <p className="zs-auth__error" role="alert"><AlertCircle size={15} /> <span>{payoutError}</span></p>}
                                    {payoutSuccess && <p className="zs-tag zs-tag--free" style={{ display: 'inline-flex' }}>Bank details saved</p>}

                                    <button
                                        type="submit"
                                        className="zs-btn zs-btn--primary zs-btn--block"
                                        disabled={savingPayout || resolvingAccount || !accountNumber || accountNumber.length !== 10 || !bankCode}
                                    >
                                        {savingPayout ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                                        {savingPayout ? 'Saving…' : 'Save payout details'}
                                    </button>
                                </form>
                            </section>
                        </>
                    )}
                </div>
            )}

            {editingListing && (
                <EditListingModal
                    listing={editingListing}
                    onClose={() => setEditingListing(null)}
                    onUpdated={(updated) => {
                        setAnalytics((prev) => ({
                            ...prev,
                            listings: prev.listings.map((l) => (l.id === updated.id ? updated : l)),
                        }))
                    }}
                    onDeleted={(deletedId) => {
                        setAnalytics((prev) => ({
                            ...prev,
                            listings: prev.listings.filter((l) => l.id !== deletedId),
                            totalListings: Math.max(0, prev.totalListings - 1),
                        }))
                    }}
                />
            )}
        </div>
    )
}
