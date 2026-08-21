import supabase from './supabase'
import { notifyError, notifyWarn } from './notify'
import { uploadImage } from './cloudinary'

// ── Item Metadata Cache for Conversations ──
const itemCache = new Map()

async function resolveConversationItem(listingId) {
    if (!listingId) return null
    if (itemCache.has(listingId)) return itemCache.get(listingId)

    try {
        // 1. Try physical listings
        const { data: physical } = await supabase
            .from('listings')
            .select('id, title, price, images, category, status, sellerId')
            .eq('id', listingId)
            .maybeSingle()

        if (physical) {
            const item = {
                id: physical.id,
                title: physical.title,
                price: physical.price,
                images: physical.images || [],
                category: physical.category,
                status: physical.status,
                sellerId: physical.sellerId,
                isDigital: false,
            }
            itemCache.set(listingId, item)
            return item
        }

        // 2. Try digital products
        const { data: digital } = await supabase
            .from('digital_products')
            .select('id, title, price, cover_image_url, category, status, seller_id, original_storage_path')
            .eq('id', listingId)
            .maybeSingle()

        if (digital) {
            const item = {
                id: digital.id,
                title: digital.title,
                price: digital.price / 100, // convert kobo to Naira
                images: digital.cover_image_url ? [digital.cover_image_url] : [],
                category: digital.category,
                status: digital.status,
                sellerId: digital.seller_id,
                isDigital: true,
                original_storage_path: digital.original_storage_path,
            }
            itemCache.set(listingId, item)
            return item
        }
    } catch (err) {
        console.warn('resolveConversationItem warning:', err?.message)
    }

    return null
}

// ── Conversations ──

/**
 * Get or create a conversation between buyer and seller about a listing.
 */
export async function getOrCreateConversation(listingId, buyerId, sellerId) {
    if (!buyerId || !sellerId) return null
    try {
        let query = supabase
            .from('conversations')
            .select('*')
            .eq('buyerId', buyerId)
            .eq('sellerId', sellerId)

        if (listingId) {
            query = query.eq('listingId', listingId)
        }

        const { data: existing } = await query.maybeSingle()
        if (existing) {
            const item = await resolveConversationItem(existing.listingId)
            return { ...existing, item, listings: item }
        }

        const { data, error } = await supabase
            .from('conversations')
            .insert({ listingId: listingId || null, buyerId, sellerId })
            .select()
            .single()

        if (error) throw error
        const item = await resolveConversationItem(data.listingId)
        return { ...data, item, listings: item }
    } catch (err) {
        console.warn('getOrCreateConversation error:', err?.message)
        throw err
    }
}

/**
 * Get all conversations for a user (as buyer or seller), with enriched item info.
 */
export async function getConversations(userId) {
    if (!userId) return []
    try {
        const { data: rawConvs, error } = await supabase
            .from('conversations')
            .select('*')
            .or(`buyerId.eq.${userId},sellerId.eq.${userId}`)
            .order('lastMessageAt', { ascending: false })

        if (error) throw error
        if (!rawConvs || rawConvs.length === 0) return []

        // Enrich all conversations with their corresponding item details
        const enriched = await Promise.all(
            rawConvs.map(async (conv) => {
                const item = await resolveConversationItem(conv.listingId)
                return {
                    ...conv,
                    item,
                    listings: item || conv.listings || null,
                }
            })
        )

        return enriched
    } catch (err) {
        console.error('[DB] getConversations failed:', err?.message)
        notifyError('Failed to load conversations')
        return []
    }
}

/**
 * Get a single conversation by ID with enriched item details.
 */
export async function getConversation(conversationId) {
    if (!conversationId) return null
    try {
        const { data: conv, error } = await supabase
            .from('conversations')
            .select('*')
            .eq('id', conversationId)
            .single()

        if (error) throw error
        if (!conv) return null

        const item = await resolveConversationItem(conv.listingId)
        return {
            ...conv,
            item,
            listings: item || null,
        }
    } catch (err) {
        console.error('[DB] getConversation failed:', err?.message)
        return null
    }
}

// ── Messages ──

/**
 * Get all messages in a conversation, ordered oldest first.
 */
export async function getMessages(conversationId) {
    if (!conversationId) return []
    try {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('conversationId', conversationId)
            .order('createdAt', { ascending: true })

        if (!error && data) return data
        return []
    } catch (err) {
        console.error('[DB] getMessages failed:', err?.message)
        notifyWarn('Failed to load messages')
        return []
    }
}

/**
 * Send a message and update the conversation's lastMessage.
 */
export async function sendMessage(conversationId, senderId, text, imageUrl = null) {
    if (!conversationId || !senderId || (!text && !imageUrl)) return null
    try {
        const payload = {
            conversationId,
            senderId,
            text: (text || '').trim() || (imageUrl ? '📷 Photo' : ''),
        }

        const { data, error } = await supabase
            .from('messages')
            .insert(payload)
            .select()
            .single()

        if (error) throw error

        try {
            await supabase
                .from('conversations')
                .update({
                    lastMessage: payload.text,
                    lastMessageAt: new Date().toISOString(),
                })
                .eq('id', conversationId)
        } catch (err) {
            console.warn('[DB] sendMessage lastMessage update warning:', err?.message)
        }

        return data
    } catch (err) {
        console.error('sendMessage error:', err?.message)
        throw err
    }
}

/**
 * Upload an image attachment for chat.
 */
export async function uploadChatAttachment(file) {
    if (!file) return null
    return await uploadImage(file)
}

/**
 * Subscribe to new messages in a conversation in real-time.
 * @returns {function} unsubscribe function
 */
export function subscribeToMessages(conversationId, onNewMessage) {
    if (!conversationId) return () => {}
    try {
        const channel = supabase
            .channel(`messages:${conversationId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `conversationId=eq.${conversationId}`,
                },
                (payload) => {
                    if (onNewMessage && payload?.new) onNewMessage(payload.new)
                }
            )
            .subscribe()

        return () => {
            try {
                supabase.removeChannel(channel)
            } catch (err) {
                console.warn('[DB] removeChannel warning:', err?.message)
            }
        }
    } catch (err) {
        console.error('[DB] subscribeToMessages failed:', err?.message)
        notifyError('Realtime connection failed')
        return () => {}
    }
}
