import supabase from './supabase'

// ── Listings ──

export async function getListings({ category, search, limit = 20, offset = 0 } = {}) {
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
    if (error) throw error
    return data
}

export async function getListing(id) {
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
            } catch (e) {
                console.warn('Could not fetch seller info:', e.message)
            }
        }
        return data
    }

    // If not found in listings table, fallback to digital_products table
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
                price: digitalData.price / 100, // Normalized to Naira for display
            }
        }
    } catch {
        // Continue to throw original error
    }

    if (error) throw error
    return data
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
    const { data, error } = await supabase
        .from('listings')
        .update(updates)
        .eq('id', id)
        .select()
        .maybeSingle()

    if (data) return data

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
    if (error) throw error
    if (dError) throw dError
    return null
}

export async function deleteListing(id) {
    const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id)

    // Also attempt deletion from digital_products
    await supabase
        .from('digital_products')
        .delete()
        .eq('id', id)

    if (error) throw error
}

export async function getMyListings(userId) {
    const [physicalRes, digitalRes] = await Promise.all([
        supabase
            .from('listings')
            .select('*')
            .eq('sellerId', userId)
            .order('createdAt', { ascending: false }),
        supabase
            .from('digital_products')
            .select('*')
            .eq('seller_id', userId)
            .order('created_at', { ascending: false }),
    ])

    const physical = physicalRes.data || []
    const digital = (digitalRes.data || []).map(d => ({
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
    const [userRes, physicalRes, digitalRes] = await Promise.all([
        getUser(sellerId).catch(() => null),
        supabase
            .from('listings')
            .select('*')
            .eq('sellerId', sellerId)
            .eq('status', 'Active')
            .order('createdAt', { ascending: false }),
        supabase
            .from('digital_products')
            .select('*')
            .eq('seller_id', sellerId)
            .eq('status', 'active')
            .order('created_at', { ascending: false }),
    ])

    const seller = userRes || { uid: sellerId, displayName: 'Seller' }
    const physical = (physicalRes.data || []).map(p => ({
        ...p,
        isDigital: false,
    }))
    const digital = (digitalRes.data || []).map(d => ({
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
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('uid', userId)
        .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 = not found
    return data
}

export async function upsertUser(user) {
    const { data, error } = await supabase
        .from('users')
        .upsert(user, { onConflict: 'uid' })
        .select()
        .single()

    if (error) throw error
    return data
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
    if (error) throw error
    return data
}

export async function getDigitalProduct(id) {
    const { data, error } = await supabase
        .from('digital_products')
        .select('*, users!seller_id(uid, displayName, isVerified, phoneNumber, department, paystack_subaccount_code)')
        .eq('id', id)
        .single()

    if (error) throw error

    if (data && !data.users && data.seller_id) {
        try {
            const seller = await getUser(data.seller_id)
            if (seller) {
                data.users = {
                    uid: seller.uid,
                    displayName: seller.displayName,
                    isVerified: seller.isVerified,
                    phoneNumber: seller.phoneNumber,
                    department: seller.department,
                    paystack_subaccount_code: seller.paystack_subaccount_code,
                }
            }
        } catch (e) {
            console.warn('Could not fetch seller info:', e.message)
        }
    }

    return data
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
    const [listingsRes, digitalRes, ordersRes, userProfile] = await Promise.all([
        supabase.from('listings').select('*').eq('sellerId', userId),
        supabase.from('digital_products').select('*').eq('seller_id', userId),
        supabase.from('orders').select('*').eq('seller_id', userId).order('created_at', { ascending: false }),
        getUser(userId).catch(() => null)
    ])

    const physicalListings = listingsRes.data || []
    const digitalProducts = (digitalRes.data || []).map(d => ({
        ...d,
        isDigital: true,
        priceInKobo: d.price,
        price: d.price / 100,
    }))
    const orders = ordersRes.data || []

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
}

export async function getSellerOrders(userId) {
    const { data, error } = await supabase
        .from('orders')
        .select('*, product:digital_products(title, category, price), buyer:users!buyer_id(displayName, email, phoneNumber, department)')
        .eq('seller_id', userId)
        .order('created_at', { ascending: false })

    if (error) {
        const simple = await supabase
            .from('orders')
            .select('*')
            .eq('seller_id', userId)
            .order('created_at', { ascending: false })
        return simple.data || []
    }
    return data || []
}
