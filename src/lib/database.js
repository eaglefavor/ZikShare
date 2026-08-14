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
        // If the FK join didn't return seller info, fetch it separately
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
    const { data: dData, error: dError } = await supabase
        .from('digital_products')
        .update(updates)
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
