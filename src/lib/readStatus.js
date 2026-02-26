/**
 * Track read status of conversations using localStorage.
 * Each conversation stores the timestamp of when it was last read.
 */

const STORAGE_KEY = 'zikshare_read_status'

function getReadMap() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
    } catch {
        return {}
    }
}

/**
 * Mark a conversation as read (set lastReadAt to now).
 */
export function markConversationRead(conversationId) {
    const map = getReadMap()
    map[conversationId] = new Date().toISOString()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

/**
 * Get the lastReadAt timestamp for a conversation.
 */
export function getLastReadAt(conversationId) {
    return getReadMap()[conversationId] || null
}

/**
 * Count how many conversations have unread messages.
 * A conversation is "unread" if its lastMessageAt > our lastReadAt for it.
 */
export function countUnread(conversations) {
    const map = getReadMap()
    let count = 0
    for (const conv of conversations) {
        const lastRead = map[conv.id]
        // Count as unread if never read, or if lastMessageAt is after our read timestamp
        if (!lastRead || new Date(conv.lastMessageAt) > new Date(lastRead)) {
            count++
        }
    }
    return count
}
