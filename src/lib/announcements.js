export function markAnnouncementsAsRead(announcementIds = []) {
    try {
        const existing = JSON.parse(localStorage.getItem('zikshare_read_announcements') || '[]')
        const combined = [...new Set([...existing, ...announcementIds])]
        localStorage.setItem('zikshare_read_announcements', JSON.stringify(combined))
    } catch {
        // Silently ignore storage errors
    }
}

export function getUnreadAnnouncementsCount(announcements = []) {
    try {
        const readIds = JSON.parse(localStorage.getItem('zikshare_read_announcements') || '[]')
        return announcements.filter(a => a && a.is_active && !readIds.includes(a.id)).length
    } catch {
        return 0
    }
}
