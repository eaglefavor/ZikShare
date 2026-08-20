import supabase from './supabase'
import { notifyError, notifyWarn } from './notify'

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
        if (existing) return existing

        const { data, error } = await supabase
            .from('conversations')
            .insert({ listingId: listingId || null, buyerId, sellerId })
            .select()
            .single()

        if (error) throw error
        return data
    } catch (err) {
        console.warn('getOrCreateConversation error:', err?.message)
        throw err
    }
}

/**
 * Get all conversations for a user (as buyer or seller), with listing info.
 */
export async function getConversations(userId) {
    if (!userId) return []
    try {
        let { data, error } = await supabase
            .from('conversations')
            .select('*, listings!listingId(title, price, images, category)')
            .or(`buyerId.eq.${userId},sellerId.eq.${userId}`)
            .order('lastMessageAt', { ascending: false })

        if (!error && data) return data
    } catch (err) {
        console.warn('[DB] getConversations join warning:', err?.message)
    }

    try {
        const { data } = await supabase
            .from('conversations')
            .select('*')
            .or(`buyerId.eq.${userId},sellerId.eq.${userId}`)
            .order('lastMessageAt', { ascending: false })

        return data || []
    } catch (err) {
        console.error('[DB] getConversations fallback failed:', err?.message)
        notifyError('Failed to load conversations')
        return []
    }
}

/**
 * Get a single conversation by ID.
 */
export async function getConversation(conversationId) {
    if (!conversationId) return null
    try {
        let { data, error } = await supabase
            .from('conversations')
            .select('*, listings!listingId(title, price, images, category, sellerId)')
            .eq('id', conversationId)
            .single()

        if (!error && data) return data
    } catch (err) {
        console.warn('[DB] getConversations join warning:', err?.message)
    }

    try {
        const { data } = await supabase
            .from('conversations')
            .select('*')
            .eq('id', conversationId)
            .single()

        return data || null
    } catch (err) {
        console.error('[DB] getConversation fallback failed:', err?.message)
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
export async function sendMessage(conversationId, senderId, text) {
    if (!conversationId || !senderId || !text) return null
    try {
        const { data, error } = await supabase
            .from('messages')
            .insert({ conversationId, senderId, text })
            .select()
            .single()

        if (error) throw error

        try {
            await supabase
                .from('conversations')
                .update({ lastMessage: text, lastMessageAt: new Date().toISOString() })
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
