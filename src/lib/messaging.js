import supabase from './supabase'

// ── Conversations ──

/**
 * Get or create a conversation between buyer and seller about a listing.
 */
export async function getOrCreateConversation(listingId, buyerId, sellerId) {
    // Check for existing conversation
    const { data: existing } = await supabase
        .from('conversations')
        .select('*')
        .eq('listingId', listingId)
        .eq('buyerId', buyerId)
        .eq('sellerId', sellerId)
        .single()

    if (existing) return existing

    // Create new conversation
    const { data, error } = await supabase
        .from('conversations')
        .insert({ listingId, buyerId, sellerId })
        .select()
        .single()

    if (error) throw error
    return data
}

/**
 * Get all conversations for a user (as buyer or seller), with listing info.
 */
export async function getConversations(userId) {
    // Try with listing join first
    let { data, error } = await supabase
        .from('conversations')
        .select('*, listings!listingId(title, price, images, category)')
        .or(`buyerId.eq.${userId},sellerId.eq.${userId}`)
        .order('lastMessageAt', { ascending: false })

    // Fall back to simple query if join fails
    if (error) {
        const result = await supabase
            .from('conversations')
            .select('*')
            .or(`buyerId.eq.${userId},sellerId.eq.${userId}`)
            .order('lastMessageAt', { ascending: false })
        data = result.data
        error = result.error
    }

    if (error) throw error
    return data || []
}

/**
 * Get a single conversation by ID.
 */
export async function getConversation(conversationId) {
    let { data, error } = await supabase
        .from('conversations')
        .select('*, listings!listingId(title, price, images, category, sellerId)')
        .eq('id', conversationId)
        .single()

    // Fall back to simple query if join fails
    if (error) {
        const result = await supabase
            .from('conversations')
            .select('*')
            .eq('id', conversationId)
            .single()
        data = result.data
        error = result.error
    }

    if (error) throw error
    return data
}

// ── Messages ──

/**
 * Get all messages in a conversation, ordered oldest first.
 */
export async function getMessages(conversationId) {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversationId', conversationId)
        .order('createdAt', { ascending: true })

    if (error) throw error
    return data || []
}

/**
 * Send a message and update the conversation's lastMessage.
 */
export async function sendMessage(conversationId, senderId, text) {
    const { data, error } = await supabase
        .from('messages')
        .insert({ conversationId, senderId, text })
        .select()
        .single()

    if (error) throw error

    // Update conversation preview
    try {
        await supabase
            .from('conversations')
            .update({ lastMessage: text, lastMessageAt: new Date().toISOString() })
            .eq('id', conversationId)
    } catch (err) {
        console.warn('Failed to update conversation preview:', err.message)
    }

    return data
}

/**
 * Subscribe to new messages in a conversation in real-time.
 * @returns {function} unsubscribe function
 */
export function subscribeToMessages(conversationId, onNewMessage) {
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
                onNewMessage(payload.new)
            }
        )
        .subscribe()

    return () => {
        supabase.removeChannel(channel)
    }
}
