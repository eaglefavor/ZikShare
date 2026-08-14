import re

with open('src/lib/database.js', 'r') as f:
    content = f.read()

digital_funcs = """

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
    return data
}
"""

content += digital_funcs

with open('src/lib/database.js', 'w') as f:
    f.write(content)
