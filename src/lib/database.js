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
    const { data, error } = await supabase
        .from('listings')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return data
}

export async function deleteListing(id) {
    const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id)

    if (error) throw error
}

export async function getMyListings(userId) {
    const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('sellerId', userId)
        .order('createdAt', { ascending: false })

    if (error) throw error
    return data
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
