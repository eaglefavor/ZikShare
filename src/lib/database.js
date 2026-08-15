import supabase from './supabase'

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

        const { data, error } = await query
        if (!error && data) return data
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

        const { data } = await query
        return data || []
    } catch {
        return []
    }
}

export async function getListing(id) {
    try {
        const { data, error } = await supabase
            .from('listings')
            .select('*, users!sellerId(displayName, isVerified, phoneNumber, department)')
            .eq('id', id)
            .single()

        if (!error && data) {
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
    const { data, error } = await supabase
        .from('listings')
        .insert(listing)
        .select()
        .single()

    if (error) throw error
    return data
}

export async function updateListing(id, updates) {
    // Try listings table
    try {
        const { data } = await supabase
            .from('listings')
            .update(updates)
            .eq('id', id)
            .select()
            .maybeSingle()

        if (data) return data
    } catch {}

    // Try digital_products table
    const digitalPayload = { ...updates }
    if (digitalPayload.price !== undefined) {
        digitalPayload.price = Math.round(Number(digitalPayload.price) * 100) // store in kobo
    }
    const { data: dData, error: dError } = await supabase
        .from('digital_products')
        .update(digitalPayload)
        .eq('id', id)
        .select()
        .maybeSingle()

    if (dData) return dData
    if (dError) throw dError
    return null
}

export async function deleteListing(id) {
    await supabase.from('listings').delete().eq('id', id)
    await supabase.from('digital_products').delete().eq('id', id)
}

export async function getMyListings(userId) {
    if (!userId) return []
    const [physicalRes, digitalRes] = await Promise.all([
        supabase
            .from('listings')
            .select('*')
            .eq('sellerId', userId)
            .order('createdAt', { ascending: false })
            .catch(() => ({ data: [] })),
        supabase
            .from('digital_products')
            .select('*')
            .eq('seller_id', userId)
            .order('created_at', { ascending: false })
            .catch(() => ({ data: [] })),
    ])

    const physical = physicalRes?.data || []
    const digital = (digitalRes?.data || []).map(d => ({
        ...d,
        isDigital: true,
        sellerId: d.seller_id,
        createdAt: d.created_at,
        condition: 'Digital PDF',
        images: d.cover_image_url ? [d.cover_image_url] : [],
        priceInKobo: d.price,
        price: d.price / 100,
    }))

    const combined = [...physical, ...digital]
    combined.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    return combined
}

// ── Public Seller Profile & Catalog ──

export async function getSellerPublicProfile(sellerId) {
    if (!sellerId) return null
    const [userRes, physicalRes, digitalRes] = await Promise.all([
        getUser(sellerId).catch(() => null),
        supabase
            .from('listings')
            .select('*')
            .eq('sellerId', sellerId)
            .eq('status', 'Active')
            .order('createdAt', { ascending: false })
            .catch(() => ({ data: [] })),
        supabase
            .from('digital_products')
            .select('*')
            .eq('seller_id', sellerId)
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .catch(() => ({ data: [] })),
    ])

    const seller = userRes || { uid: sellerId, displayName: 'Seller' }
    const physical = (physicalRes?.data || []).map(p => ({
        ...p,
        isDigital: false,
    }))
    const digital = (digitalRes?.data || []).map(d => ({
        ...d,
        isDigital: true,
        sellerId: d.seller_id,
        createdAt: d.created_at,
        condition: 'Digital PDF',
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
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('uid', userId)
            .single()

        if (error && error.code !== 'PGRST116') {
            console.warn('getUser error:', error.message)
            return null
        }
        return data || null
    } catch {
        return null
    }
}

export async function upsertUser(user) {
    if (!user?.uid) return null
    try {
        const { data, error } = await supabase
            .from('users')
            .upsert(user, { onConflict: 'uid' })
            .select()
            .single()

        if (error) {
            console.warn('upsertUser warning:', error.message)
            return user
        }
        return data || user
    } catch {
        return user
    }
}

// ── Digital Products ──

export async function createDigitalProduct(product) {
    const { data, error } = await supabase
        .from('digital_products')
        .insert(product)
        .select()
        .single()

    if (error) throw error
    return data
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

        const { data, error } = await query
        if (!error && data) return data
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

        const { data } = await query
        return data || []
    } catch {
        return []
    }
}

export async function getDigitalProduct(id) {
    try {
        const { data, error } = await supabase
            .from('digital_products')
            .select('*, users!seller_id(displayName, isVerified, phoneNumber, department, paystack_subaccount_code)')
            .eq('id', id)
            .single()

        if (!error && data) return data
    } catch {}

    try {
        const { data } = await supabase
            .from('digital_products')
            .select('*')
            .eq('id', id)
            .single()

        return data || null
    } catch {
        return null
    }
}

export async function updateDigitalProduct(id, updates) {
    const payload = { ...updates, updated_at: new Date().toISOString() }
    if (payload.price !== undefined) {
        payload.price = Math.round(Number(payload.price) * 100) // Ensure kobo in DB
    }

    const { data, error } = await supabase
        .from('digital_products')
        .update(payload)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return data
}

// ── Seller Analytics & Orders ──

export async function getSellerAnalytics(userId) {
    if (!userId) return null
    try {
        const [listingsRes, digitalRes, ordersRes, userProfile] = await Promise.all([
            supabase.from('listings').select('*').eq('sellerId', userId).catch(() => ({ data: [] })),
            supabase.from('digital_products').select('*').eq('seller_id', userId).catch(() => ({ data: [] })),
            supabase.from('orders').select('*').eq('seller_id', userId).order('created_at', { ascending: false }).catch(() => ({ data: [] })),
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
        const { data, error } = await supabase
            .from('orders')
            .select('*, product:digital_products(title, category, price), buyer:users!buyer_id(displayName, email, phoneNumber, department)')
            .eq('seller_id', userId)
            .order('created_at', { ascending: false })

        if (!error && data) return data
    } catch {}

    try {
        const { data } = await supabase
            .from('orders')
            .select('*')
            .eq('seller_id', userId)
            .order('created_at', { ascending: false })
        return data || []
    } catch {
        return []
    }
}
