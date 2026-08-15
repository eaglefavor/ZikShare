import supabase from './supabase'

function queryWithTimeout(promise, ms = 8000, fallbackVal = null) {
    let timer
    const timeoutPromise = new Promise((resolve) => {
        timer = setTimeout(() => {
            console.warn(`Query timed out after ${ms}ms, returning fallback.`)
            resolve(fallbackVal)
        }, ms)
    })

    return Promise.race([promise, timeoutPromise]).finally(() => {
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
    } catch {
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
                } catch {}
            }
            return data
        }
    } catch {}

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
                price: digitalData.price / 100,
            }
        }
    } catch {}

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
    return res.data
}

export async function updateListing(id, updates) {
    try {
        const query = supabase
            .from('listings')
            .update(updates)
            .eq('id', id)
            .select()
            .maybeSingle()

        const res = await queryWithTimeout(query, 8000, { data: null })
        if (res?.data) return res.data
    } catch {}

    // Try digital_products
    try {
        return await updateDigitalProduct(id, updates)
    } catch {}

    return null
}

export async function deleteListing(id) {
    try {
        const query = supabase.from('listings').delete().eq('id', id)
        await queryWithTimeout(query, 8000, null)
    } catch {}

    try {
        const query = supabase.from('digital_products').delete().eq('id', id)
        await queryWithTimeout(query, 8000, null)
    } catch {}

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
    } catch {
        return null
    }
}

export async function upsertUser(user) {
    if (!user?.uid) return null
    try {
        const query = supabase
            .from('users')
            .upsert(user, { onConflict: 'uid' })
            .select()
            .single()

        const res = await queryWithTimeout(query, 5000, { data: user })
        return res?.data || user
    } catch {
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
    } catch {
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
    } catch {}

    try {
        const query = supabase
            .from('digital_products')
            .select('*')
            .eq('id', id)
            .single()

        const res = await queryWithTimeout(query, 6000, { data: null })
        return res?.data || null
    } catch {
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
    return res.data
}

// ── Seller Analytics & Orders ──

export async function getSellerAnalytics(userId) {
    if (!userId) return null
    try {
        const [listingsRes, digitalRes, ordersRes, userProfile] = await Promise.all([
            queryWithTimeout(supabase.from('listings').select('*').eq('sellerId', userId), 6000, { data: [] }),
            queryWithTimeout(supabase.from('digital_products').select('*').eq('seller_id', userId), 6000, { data: [] }),
            queryWithTimeout(supabase.from('orders').select('*').eq('seller_id', userId).order('created_at', { ascending: false }), 6000, { data: [] }),
            getUser(userId).catch(() => null)
        ])

        const physicalListings = listingsRes?.data || []
        const digitalProducts = (digitalRes?.data || []).map(d => ({
            ...d,
            isDigital: true,
            priceInKobo: d.price,
            price: d.price / 100,
        }))
        const orders = ordersRes?.data || []

        const totalPhysical = physicalListings.length
        const totalDigital = digitalProducts.length
        const activeListings = physicalListings.filter(l => l.status === 'Active').length + digitalProducts.filter(d => d.status === 'active').length

        const completedOrders = orders.filter(o => o.status === 'delivered' || o.status === 'success' || o.status === 'ready')
        const totalEarningsKobo = completedOrders.reduce((sum, o) => sum + (o.seller_settlement || o.amount || 0), 0)
        const totalSalesCount = completedOrders.length

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
            totalEarningsNaira: totalEarningsKobo / 100,
            totalSalesCount,
            activeListings,
            totalPhysical,
            totalDigital,
            totalListings: totalPhysical + totalDigital,
            orders,
            topProducts,
            userProfile,
            listings: [...physicalListings, ...digitalProducts].sort((a, b) => new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0))
        }
    } catch (err) {
        console.warn('getSellerAnalytics caught error:', err)
        return {
            totalEarningsNaira: 0,
            totalSalesCount: 0,
            activeListings: 0,
            totalPhysical: 0,
            totalDigital: 0,
            totalListings: 0,
            orders: [],
            topProducts: [],
            userProfile: null,
            listings: []
        }
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
    } catch {}

    try {
        const query = supabase
            .from('orders')
            .select('*')
            .eq('seller_id', userId)
            .order('created_at', { ascending: false })
        const res = await queryWithTimeout(query, 6000, { data: [] })
        return res?.data || []
    } catch {
        return []
    }
}
