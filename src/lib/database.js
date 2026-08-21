import supabase from './supabase'
import { invalidateCacheByPrefix } from './cache'
import { notifyError, notifyWarn } from './notify'
import { verifyPaystackPayment } from './paystack'

function queryWithTimeout(promise, ms = 8000, fallbackVal = null) {
    let timer
    const timeoutPromise = new Promise((resolve) => {
        timer = setTimeout(() => {
            console.warn(`Query timed out after ${ms}ms, returning fallback.`)
            resolve(fallbackVal)
        }, ms)
    })

    return Promise.race([Promise.resolve(promise), timeoutPromise]).finally(() => {
        if (timer) clearTimeout(timer)
    })
}

// ── Listings ──

export async function getListings({ category, search, limit = 20, offset = 0 } = {}) {
    try {
        let query = supabase
            .from('listings')
            .select('*, users!sellerId(displayName, isVerified, phoneNumber)')
            .eq('status', 'Active')
            .order('createdAt', { ascending: false })
            .range(offset, offset + limit - 1)

        if (category && category !== 'All') {
            query = query.eq('category', category)
        }

        if (search) {
            query = query.ilike('title', `%${search}%`)
        }

        const res = await queryWithTimeout(query, 6000, { data: null, error: new Error('Timeout') })
        if (res?.data && !res?.error) return res.data
    } catch (e) {
        console.warn('getListings with join error, falling back to simple:', e?.message)
    }

    try {
        let query = supabase
            .from('listings')
            .select('*')
            .eq('status', 'Active')
            .order('createdAt', { ascending: false })
            .range(offset, offset + limit - 1)

        if (category && category !== 'All') {
            query = query.eq('category', category)
        }

        if (search) {
            query = query.ilike('title', `%${search}%`)
        }

        const res = await queryWithTimeout(query, 6000, { data: [] })
        return res?.data || []
    } catch (err) {
        console.error('[DB] getListings fallback failed:', err?.message, err)
        notifyError('Failed to load listings — check network')
        return []
    }
}

export async function getListing(id) {
    try {
        const query = supabase
            .from('listings')
            .select('*, users!sellerId(displayName, isVerified, phoneNumber, department)')
            .eq('id', id)
            .single()

        const res = await queryWithTimeout(query, 6000, { data: null })
        const data = res?.data
        if (data) {
            if (!data.users && data.sellerId) {
                try {
                    const seller = await getUser(data.sellerId)
                    if (seller) {
                        data.users = {
                            displayName: seller.displayName,
                            isVerified: seller.isVerified,
                            phoneNumber: seller.phoneNumber,
                            department: seller.department,
                        }
                    }
                } catch (err) {
                    console.warn('[DB] getListing seller enrich warning:', err?.message)
                }
            }
            return data
        }
    } catch (err) {
        console.warn('[DB] getListing primary query warning:', err?.message)
    }

    // Fallback to digital_products table
    try {
        const digitalData = await getDigitalProduct(id)
        if (digitalData) {
            return {
                ...digitalData,
                isDigital: true,
                sellerId: digitalData.seller_id,
                createdAt: digitalData.created_at,
                condition: 'Digital PDF',
                images: digitalData.cover_image_url ? [digitalData.cover_image_url] : [],
                priceInKobo: digitalData.price,
                price: (digitalData.price || 0) / 100,
                users: digitalData.users || {
                    displayName: 'UNIZIK Seller',
                    isVerified: true,
                    phoneNumber: '',
                    department: digitalData.category || 'Academic',
                },
            }
        }
    } catch (err) {
        console.warn('[DB] getListing digital fallback warning:', err?.message)
    }

    return null
}

export async function createListing(listing) {
    const query = supabase
        .from('listings')
        .insert(listing)
        .select()
        .single()

    const res = await queryWithTimeout(query, 10000, null)
    if (!res || res.error) throw res?.error || new Error('Create listing timed out')

    invalidateCacheByPrefix('listings')
    invalidateCacheByPrefix('seller')
    invalidateCacheByPrefix('catalog')
    invalidateCacheByPrefix('feed')

    return res.data
}

export async function updateListing(id, updates) {
    invalidateCacheByPrefix('listings')
    invalidateCacheByPrefix('digital')
    invalidateCacheByPrefix('seller')
    invalidateCacheByPrefix('catalog')
    invalidateCacheByPrefix('feed')
    invalidateCacheByPrefix(`listing-${id}`)

    try {
        const query = supabase
            .from('listings')
            .update(updates)
            .eq('id', id)
            .select()
            .maybeSingle()

        const res = await queryWithTimeout(query, 8000, { data: null })
        if (res?.data) return res.data
    } catch (err) {
        console.error('[DB] updateListing listings table failed:', err?.message)
        notifyError('Update failed — try again')
    }

    // Try digital_products
    try {
        return await updateDigitalProduct(id, updates)
    } catch (err) {
        console.error('[DB] updateListing digital fallback failed:', err?.message)
        notifyError('Update failed on both tables')
    }

    return null
}

export async function deleteListing(id) {
    if (!id) return true

    // 1. Invalidate caches immediately
    invalidateCacheByPrefix('listings')
    invalidateCacheByPrefix('digital')
    invalidateCacheByPrefix('seller')
    invalidateCacheByPrefix('catalog')
    invalidateCacheByPrefix('feed')
    invalidateCacheByPrefix(`listing-${id}`)

    // 2. Mark status as deleted in digital_products and listings
    try {
        await supabase.from('digital_products').update({ status: 'deleted' }).eq('id', id)
    } catch (err) {
        console.warn('[DB] deleteListing soft-delete digital warning:', err?.message)
    }

    try {
        await supabase.from('listings').update({ status: 'Deleted' }).eq('id', id)
    } catch (err) {
        console.warn('[DB] deleteListing soft-delete listings warning:', err?.message)
    }

    // 3. Hard delete from both tables
    try {
        await supabase.from('digital_products').delete().eq('id', id)
    } catch (e) {
        console.warn('Digital product hard delete note:', e)
    }

    try {
        await supabase.from('listings').delete().eq('id', id)
    } catch (e) {
        console.warn('Physical listing hard delete note:', e)
    }

    // 4. Invalidate caches again
    invalidateCacheByPrefix('listings')
    invalidateCacheByPrefix('digital')
    invalidateCacheByPrefix('seller')
    invalidateCacheByPrefix(`listing-${id}`)

    return true
}

export async function getSellerStore(sellerId) {
    if (!sellerId) return null

    const [seller, physicalRes, digitalRes] = await Promise.all([
        getUser(sellerId).catch(() => null),
        queryWithTimeout(supabase.from('listings').select('*').eq('sellerId', sellerId).eq('status', 'Active'), 6000, { data: [] }),
        queryWithTimeout(supabase.from('digital_products').select('*').eq('seller_id', sellerId).eq('status', 'active'), 6000, { data: [] }),
    ])

    const physical = (physicalRes?.data || []).map(p => ({
        ...p,
        isDigital: false,
    }))

    const digital = (digitalRes?.data || []).map(d => ({
        ...d,
        isDigital: true,
        title: d.title,
        description: d.description,
        category: d.category,
        createdAt: d.created_at,
        images: d.cover_image_url ? [d.cover_image_url] : [],
        priceInKobo: d.price,
        price: d.price / 100,
    }))

    const listings = [...physical, ...digital].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))

    return {
        seller,
        listings,
        totalListings: listings.length,
        digitalCount: digital.length,
        physicalCount: physical.length,
    }
}

export const getSellerPublicProfile = getSellerStore

// ── Users ──

export async function getUser(userId) {
    if (!userId) return null
    try {
        const query = supabase
            .from('users')
            .select('*')
            .eq('uid', userId)
            .single()

        const res = await queryWithTimeout(query, 5000, { data: null })
        return res?.data || null
    } catch (err) {
        console.error('[DB] getUser failed:', err?.message)
        notifyWarn('Could not load user profile')
        return null
    }
}

export async function upsertUser(user) {
    if (!user?.uid) return null
    try {
        const payload = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || 'Student',
            ...user,
            updatedAt: new Date().toISOString(),
        }
        const query = supabase
            .from('users')
            .upsert(payload, { onConflict: 'uid' })
            .select()
            .single()

        const res = await queryWithTimeout(query, 5000, { data: payload })
        return res?.data || payload
    } catch (err) {
        console.error('[DB] upsertUser failed:', err?.message)
        notifyWarn('Profile sync failed — data saved locally')
        return user
    }
}

// ── Digital Products ──

export async function createDigitalProduct(product) {
    const query = supabase
        .from('digital_products')
        .insert(product)
        .select()
        .single()

    const res = await queryWithTimeout(query, 10000, null)
    if (!res || res.error) {
        throw res?.error || new Error('Saving material to database timed out after 10s.')
    }

    invalidateCacheByPrefix('digital')
    invalidateCacheByPrefix('listings')
    invalidateCacheByPrefix('seller')
    invalidateCacheByPrefix('catalog')
    invalidateCacheByPrefix('feed')

    return res.data
}

export async function getDigitalProducts({ category, search, limit = 20, offset = 0 } = {}) {
    try {
        let query = supabase
            .from('digital_products')
            .select('*, users!seller_id(displayName, isVerified, phoneNumber)')
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)

        if (category && category !== 'All') {
            query = query.eq('category', category)
        }

        if (search) {
            query = query.ilike('title', `%${search}%`)
        }

        const res = await queryWithTimeout(query, 6000, { data: null })
        if (res?.data && !res?.error) return res.data
    } catch (e) {
        console.warn('getDigitalProducts with join error, falling back to simple:', e?.message)
    }

    try {
        let query = supabase
            .from('digital_products')
            .select('*')
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)

        if (category && category !== 'All') {
            query = query.eq('category', category)
        }

        if (search) {
            query = query.ilike('title', `%${search}%`)
        }

        const res = await queryWithTimeout(query, 6000, { data: [] })
        return res?.data || []
    } catch (err) {
        console.error('[DB] getDigitalProducts fallback failed:', err?.message)
        notifyError('Failed to load study materials')
        return []
    }
}

export async function getDigitalProduct(id) {
    try {
        const query = supabase
            .from('digital_products')
            .select('*, users!seller_id(displayName, isVerified, phoneNumber, department, paystack_subaccount_code)')
            .eq('id', id)
            .single()

        const res = await queryWithTimeout(query, 6000, { data: null })
        if (res?.data) return res.data
    } catch (err) {
        console.warn('[DB] getDigitalProduct with join warning:', err?.message)
    }

    try {
        const query = supabase
            .from('digital_products')
            .select('*')
            .eq('id', id)
            .single()

        const res = await queryWithTimeout(query, 6000, { data: null })
        return res?.data || null
    } catch (err) {
        console.error('[DB] getDigitalProduct fallback failed:', err?.message)
        return null
    }
}

export async function updateDigitalProduct(id, updates) {
    const payload = { ...updates, updated_at: new Date().toISOString() }
    if (payload.price !== undefined) {
        payload.price = Math.round(Number(payload.price) * 100) // Ensure kobo in DB
    }

    const query = supabase
        .from('digital_products')
        .update(payload)
        .eq('id', id)
        .select()
        .single()

    const res = await queryWithTimeout(query, 8000, null)
    if (!res || res.error) throw res?.error || new Error('Update digital product timed out')

    invalidateCacheByPrefix('digital')
    invalidateCacheByPrefix('listings')
    invalidateCacheByPrefix('seller')
    invalidateCacheByPrefix('catalog')
    invalidateCacheByPrefix('feed')
    invalidateCacheByPrefix(`listing-${id}`)

    return res.data
}

// ── Seller Analytics, Orders & Payouts ──

export async function getSellerAnalytics(userId) {
    if (!userId) return null
    try {
        const [listingsRes, digitalRes, ordersRes, payoutsRes, userProfile] = await Promise.all([
            queryWithTimeout(supabase.from('listings').select('*').eq('sellerId', userId), 6000, { data: [] }),
            queryWithTimeout(supabase.from('digital_products').select('*').eq('seller_id', userId), 6000, { data: [] }),
            queryWithTimeout(supabase.from('orders').select('*').eq('seller_id', userId).order('created_at', { ascending: false }), 6000, { data: [] }),
            queryWithTimeout(supabase.from('payouts').select('*').eq('seller_id', userId).order('created_at', { ascending: false }), 6000, { data: [] }),
            getUser(userId).catch(() => null)
        ])

        const physicalListings = (listingsRes?.data || []).filter(l => l.status !== 'Deleted' && l.status !== 'deleted')
        const digitalProducts = (digitalRes?.data || [])
            .filter(d => d.status !== 'deleted' && d.status !== 'Deleted')
            .map(d => ({
                ...d,
                isDigital: true,
                priceInKobo: d.price,
                price: d.price / 100,
            }))
        const orders = ordersRes?.data || []
        const payouts = payoutsRes?.data || []

        const totalPhysical = physicalListings.length
        const totalDigital = digitalProducts.length
        const activeListings = physicalListings.filter(l => l.status === 'Active').length + digitalProducts.filter(d => d.status === 'active').length

        const completedOrders = orders.filter(o => o.status === 'delivered' || o.status === 'success' || o.status === 'ready')
        const totalEarningsKobo = completedOrders.reduce((sum, o) => sum + (o.seller_settlement || o.amount || 0), 0)
        const totalEarningsNaira = totalEarningsKobo / 100
        const totalSalesCount = completedOrders.length

        const successfulPayouts = payouts.filter(p => p.status !== 'failed')
        const totalWithdrawnNaira = successfulPayouts.reduce((sum, p) => sum + Number(p.amount_naira || (p.amount ? p.amount / 100 : 0) || 0), 0)
        const availableBalanceNaira = Math.max(0, totalEarningsNaira - totalWithdrawnNaira)

        const productSalesMap = {}
        completedOrders.forEach(o => {
            if (o.product_id) {
                productSalesMap[o.product_id] = (productSalesMap[o.product_id] || 0) + 1
            }
        })

        const topProducts = digitalProducts
            .map(p => ({
                ...p,
                sales_count: productSalesMap[p.id] || p.sales_count || 0,
                revenue: (productSalesMap[p.id] || p.sales_count || 0) * p.price
            }))
            .sort((a, b) => b.sales_count - a.sales_count)

        return {
            totalEarningsNaira,
            totalWithdrawnNaira,
            availableBalanceNaira,
            totalSalesCount,
            activeListings,
            totalPhysical,
            totalDigital,
            totalListings: totalPhysical + totalDigital,
            orders,
            payouts,
            topProducts,
            userProfile,
            listings: [...physicalListings, ...digitalProducts].sort((a, b) => new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0))
        }
    } catch (err) {
        console.warn('getSellerAnalytics caught error:', err)
        return {
            totalEarningsNaira: 0,
            totalWithdrawnNaira: 0,
            availableBalanceNaira: 0,
            totalSalesCount: 0,
            activeListings: 0,
            totalPhysical: 0,
            totalDigital: 0,
            totalListings: 0,
            orders: [],
            payouts: [],
            topProducts: [],
            userProfile: null,
            listings: []
        }
    }
}

export async function getSellerPayouts(userId) {
    if (!userId) return []
    try {
        const res = await queryWithTimeout(
            supabase.from('payouts').select('*').eq('seller_id', userId).order('created_at', { ascending: false }),
            6000,
            { data: [] }
        )
        return res?.data || []
    } catch (err) {
        console.warn('[DB] getSellerPayouts warning:', err?.message)
        return []
    }
}

export async function getSellerOrders(userId) {
    if (!userId) return []
    try {
        const query = supabase
            .from('orders')
            .select('*, product:digital_products(title, category, price), buyer:users!buyer_id(displayName, email, phoneNumber, department)')
            .eq('seller_id', userId)
            .order('created_at', { ascending: false })

        const res = await queryWithTimeout(query, 6000, { data: null })
        if (res?.data) return res.data
    } catch (err) {
        console.warn('[DB] getSellerOrders join warning:', err?.message)
    }

    try {
        const query = supabase
            .from('orders')
            .select('*')
            .eq('seller_id', userId)
            .order('created_at', { ascending: false })
        const res = await queryWithTimeout(query, 6000, { data: [] })
        return res?.data || []
    } catch (err) {
        console.error('[DB] getSellerOrders fallback failed:', err?.message)
        notifyError('Failed to load seller orders')
        return []
    }
}

export async function getBuyerOrders(buyerId) {
    if (!buyerId) return []
    try {
        const query = supabase
            .from('orders')
            .select('*, product:digital_products(title, category, price, cover_image_url), seller:users!seller_id(displayName, email, phoneNumber)')
            .eq('buyer_id', buyerId)
            .order('created_at', { ascending: false })

        const res = await queryWithTimeout(query, 6000, { data: null })
        if (res?.data) return res.data
    } catch (err) {
        console.warn('[DB] getBuyerOrders join warning:', err?.message)
    }

    try {
        const query = supabase
            .from('orders')
            .select('*')
            .eq('buyer_id', buyerId)
            .order('created_at', { ascending: false })
        const res = await queryWithTimeout(query, 6000, { data: [] })
        return res?.data || []
    } catch (err) {
        console.error('[DB] getBuyerOrders fallback failed:', err?.message)
        notifyError('Failed to load purchases')
        return []
    }
}

export async function getUserPurchaseForProduct(userId, productId) {
    if (!userId || !productId) return null
    try {
        const query = supabase
            .from('orders')
            .select('*, product:digital_products(*), seller:users!seller_id(displayName, email, phoneNumber)')
            .eq('buyer_id', userId)
            .eq('product_id', productId)
            .order('created_at', { ascending: false })
            .limit(1)

        const res = await queryWithTimeout(query, 5000, { data: [] })
        const list = res?.data || []
        if (list.length > 0) {
            return list[0]
        }
        return null
    } catch (err) {
        console.error('[DB] getUserPurchaseForProduct failed:', err?.message)
        return null
    }
}

export async function getOrder(referenceOrId) {
    if (!referenceOrId) return null
    try {
        let query = supabase
            .from('orders')
            .select('*, product:digital_products(*), seller:users!seller_id(displayName, email, phoneNumber)')

        if (referenceOrId.includes('-') && referenceOrId.length > 20 && !referenceOrId.startsWith('ZKS-')) {
            query = query.eq('id', referenceOrId)
        } else {
            query = query.eq('paystack_reference', referenceOrId)
        }

        const res = await queryWithTimeout(query.single(), 6000, { data: null })
        return res?.data || null
    } catch (err) {
        console.error('[DB] getOrder failed:', err?.message)
        return null
    }
}

export async function createSignedDownloadUrl(storagePath, expiresInSeconds = 3600) {
    if (!storagePath) return null
    try {
        // Try digital-orders first
        let { data, error } = await supabase
            .storage
            .from('digital-orders')
            .createSignedUrl(storagePath, expiresInSeconds)

        if (!data?.signedUrl || error) {
            // Try digital-originals fallback
            const origRes = await supabase
                .storage
                .from('digital-originals')
                .createSignedUrl(storagePath, expiresInSeconds)
            if (origRes.data?.signedUrl) {
                return origRes.data.signedUrl
            }
        }
        return data?.signedUrl || null
    } catch (err) {
        console.error('Failed to create signed URL:', err)
        return null
    }
}

export async function fulfillDigitalOrder(order) {
    if (!order) return null
    if (order.status === 'delivered' || order.status === 'ready') return order

    try {
        // If order has a paystack reference, verify via server edge function
        if (order.paystack_reference) {
            const verifyRes = await verifyPaystackPayment(order.paystack_reference, order.buyer_id)
            if (verifyRes?.success && verifyRes?.order) {
                return verifyRes.order
            }
        }

        // Re-fetch latest order status directly from database
        const { data: latestOrder, error } = await supabase
            .from('orders')
            .select('*, product:digital_products(*), seller:users!seller_id(displayName, email, phoneNumber)')
            .eq('id', order.id)
            .maybeSingle()

        if (!error && latestOrder) {
            return latestOrder
        }

        return order
    } catch (err) {
        console.warn('[DB] fulfillDigitalOrder check note:', err?.message)
        return order
    }
}

// ── Admin Suite Operations (Exclusive to rc5632250@gmail.com) ──

export async function getAdminStats() {
    try {
        const [usersRes, listingsRes, digitalRes, ordersRes] = await Promise.all([
            supabase.from('users').select('uid, is_banned, isVerified', { count: 'exact' }),
            supabase.from('listings').select('id, status', { count: 'exact' }),
            supabase.from('digital_products').select('id, status, price, drm_enabled', { count: 'exact' }),
            supabase.from('orders').select('id, amount, status, unique_password', { count: 'exact' }),
        ])

        const totalUsers = usersRes.count || usersRes.data?.length || 0
        const bannedUsers = usersRes.data?.filter(u => u.is_banned)?.length || 0
        const verifiedUsers = usersRes.data?.filter(u => u.isVerified)?.length || 0

        const totalListings = listingsRes.count || listingsRes.data?.length || 0
        const activeListings = listingsRes.data?.filter(l => l.status === 'Active')?.length || 0

        const totalDigital = digitalRes.count || digitalRes.data?.length || 0
        const activeDigital = digitalRes.data?.filter(d => d.status === 'active')?.length || 0

        const totalOrders = ordersRes.count || ordersRes.data?.length || 0
        const totalRevenueKobo = (ordersRes.data || []).reduce((acc, o) => acc + (o.amount || 0), 0)
        const drmOrdersCount = (ordersRes.data || []).filter(o => Boolean(o.unique_password))?.length || 0

        return {
            totalUsers,
            bannedUsers,
            verifiedUsers,
            totalListings,
            activeListings,
            totalDigital,
            activeDigital,
            totalOrders,
            totalRevenueNaira: Math.round(totalRevenueKobo / 100),
            drmOrdersCount,
        }
    } catch (err) {
        console.error('getAdminStats error:', err)
        throw err
    }
}

export async function getAdminUsers({ search = '', filter = 'all', limit = 100 } = {}) {
    try {
        let query = supabase
            .from('users')
            .select('*')
            .order('createdAt', { ascending: false })
            .limit(limit)

        if (filter === 'banned') {
            query = query.eq('is_banned', true)
        } else if (filter === 'verified') {
            query = query.eq('isVerified', true)
        } else if (filter === 'unverified') {
            query = query.eq('isVerified', false)
        }

        const { data, error } = await query
        if (error) throw error

        let list = data || []
        if (search.trim()) {
            const q = search.toLowerCase().trim()
            list = list.filter(u => 
                (u.displayName || '').toLowerCase().includes(q) ||
                (u.email || '').toLowerCase().includes(q) ||
                (u.department || '').toLowerCase().includes(q) ||
                (u.phoneNumber || '').includes(q)
            )
        }
        return list
    } catch (err) {
        console.error('getAdminUsers error:', err)
        return []
    }
}

export async function toggleUserBan(uid, isBanned) {
    const { error } = await supabase
        .from('users')
        .update({ is_banned: isBanned, updatedAt: new Date().toISOString() })
        .eq('uid', uid)

    if (error) throw error
    invalidateCacheByPrefix('users')
    return true
}

export async function toggleUserVerification(uid, isVerified) {
    const { error } = await supabase
        .from('users')
        .update({ isVerified, updatedAt: new Date().toISOString() })
        .eq('uid', uid)

    if (error) throw error
    invalidateCacheByPrefix('users')
    return true
}

export async function getAdminListings({ search = '', type = 'all', status = 'all', limit = 100 } = {}) {
    try {
        const [physicalRes, digitalRes] = await Promise.all([
            supabase.from('listings').select('*, seller:users!sellerId(displayName, email, phoneNumber, isVerified)').order('createdAt', { ascending: false }).limit(limit),
            supabase.from('digital_products').select('*, seller:users!seller_id(displayName, email, phoneNumber, isVerified)').order('created_at', { ascending: false }).limit(limit),
        ])

        const physical = (physicalRes.data || []).map(p => ({
            ...p,
            isDigital: false,
            createdAt: p.createdAt,
            displayPrice: p.price,
        }))

        const digital = (digitalRes.data || []).map(d => ({
            ...d,
            isDigital: true,
            createdAt: d.created_at,
            displayPrice: d.price / 100,
            images: d.cover_image_url ? [d.cover_image_url] : [],
        }))

        let combined = []
        if (type === 'physical') {
            combined = physical
        } else if (type === 'digital') {
            combined = digital
        } else {
            combined = [...physical, ...digital]
        }

        combined.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))

        if (status !== 'all') {
            combined = combined.filter(item => (item.status || '').toLowerCase() === status.toLowerCase())
        }

        if (search.trim()) {
            const q = search.toLowerCase().trim()
            combined = combined.filter(item =>
                (item.title || '').toLowerCase().includes(q) ||
                (item.category || '').toLowerCase().includes(q) ||
                (item.seller?.displayName || '').toLowerCase().includes(q) ||
                (item.seller?.email || '').toLowerCase().includes(q)
            )
        }

        return combined
    } catch (err) {
        console.error('getAdminListings error:', err)
        return []
    }
}

export async function adminDeleteListing(id, isDigital, storagePath) {
    if (isDigital) {
        const { error } = await supabase.from('digital_products').delete().eq('id', id)
        if (error) throw error
        if (storagePath) {
            try {
                await supabase.storage.from('digital-originals').remove([storagePath])
            } catch (err) {
                console.warn('Storage purge warning:', err)
            }
        }
        invalidateCacheByPrefix('digital')
    } else {
        const { error } = await supabase.from('listings').delete().eq('id', id)
        if (error) throw error
        invalidateCacheByPrefix('listings')
    }
    return true
}

export async function adminUpdateListingStatus(id, isDigital, status) {
    if (isDigital) {
        const { error } = await supabase
            .from('digital_products')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', id)
        if (error) throw error
        invalidateCacheByPrefix('digital')
    } else {
        const { error } = await supabase
            .from('listings')
            .update({ status, updatedAt: new Date().toISOString() })
            .eq('id', id)
        if (error) throw error
        invalidateCacheByPrefix('listings')
    }
    return true
}

export async function getAdminOrders({ search = '', limit = 100 } = {}) {
    try {
        let query = supabase
            .from('orders')
            .select('*, product:digital_products(*), buyer:users!buyer_id(displayName, email, phoneNumber), seller:users!seller_id(displayName, email, phoneNumber)')
            .order('created_at', { ascending: false })
            .limit(limit)

        const { data, error } = await query
        if (error) throw error

        let list = data || []
        if (search.trim()) {
            const q = search.toLowerCase().trim()
            list = list.filter(o => 
                (o.paystack_reference || '').toLowerCase().includes(q) ||
                (o.product?.title || '').toLowerCase().includes(q) ||
                (o.buyer?.displayName || '').toLowerCase().includes(q) ||
                (o.buyer?.email || '').toLowerCase().includes(q)
            )
        }
        return list
    } catch (err) {
        console.error('getAdminOrders error:', err)
        return []
    }
}

// ── Official Campus Announcements & Broadcasts ──

export async function getAnnouncements({ limit = 50, includeInactive = false } = {}) {
    try {
        let query = supabase
            .from('announcements')
            .select('*')
            .order('is_pinned', { ascending: false })
            .order('created_at', { ascending: false })
            .limit(limit)

        if (!includeInactive) {
            query = query.eq('is_active', true)
        }

        const { data, error } = await query
        if (error) throw error
        return data || []
    } catch (err) {
        console.error('getAnnouncements error:', err)
        return []
    }
}

export async function createAnnouncement({
    title,
    content,
    category = 'feature_update',
    priority = 'normal',
    sender_email = 'rc5632250@gmail.com',
    action_url = '',
    action_label = '',
    is_pinned = false
}) {
    const { data, error } = await supabase
        .from('announcements')
        .insert([{
            title: title.trim(),
            content: content.trim(),
            category,
            priority,
            sender_email,
            action_url: action_url.trim() || null,
            action_label: action_label.trim() || null,
            is_pinned: Boolean(is_pinned),
            is_active: true
        }])
        .select()
        .single()

    if (error) throw error
    invalidateCacheByPrefix('announcements')
    return data
}

export async function deleteAnnouncement(id) {
    const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id)

    if (error) throw error
    invalidateCacheByPrefix('announcements')
    return true
}

export async function togglePinAnnouncement(id, is_pinned) {
    const { error } = await supabase
        .from('announcements')
        .update({ is_pinned, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) throw error
    invalidateCacheByPrefix('announcements')
    return true
}

export async function toggleAnnouncementStatus(id, is_active) {
    const { error } = await supabase
        .from('announcements')
        .update({ is_active, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) throw error
    invalidateCacheByPrefix('announcements')
    return true
}


