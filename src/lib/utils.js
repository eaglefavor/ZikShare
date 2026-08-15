/**
 * Shared utility functions for ZikShare
 */

/**
 * Format amount as Nigerian Naira (₦)
 */
export function formatNaira(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return '₦0'
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

/**
 * Convert kobo to Naira formatted string
 */
export function formatKoboToNaira(kobo) {
    if (!kobo || isNaN(kobo)) return '₦0'
    return formatNaira(kobo / 100)
}

/**
 * Check if an email belongs to the UNIZIK student/faculty domain
 */
export function isUnizikEmail(email) {
    if (!email || typeof email !== 'string') return false
    return email.trim().toLowerCase().endsWith('@unizik.edu.ng')
}

/**
 * Derive human-readable name from email address
 */
export function deriveNameFromEmail(email) {
    if (!email || typeof email !== 'string') return 'UNIZIK Student'
    const handle = email.split('@')[0] || ''
    return handle
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
        .trim() || 'UNIZIK Student'
}

/**
 * Format relative time (e.g., '2m ago', '3h ago', '5d ago')
 */
export function timeAgo(isoDate) {
    if (!isoDate) return ''
    const diffMs = Date.now() - new Date(isoDate).getTime()
    const diffSec = Math.floor(diffMs / 1000)
    if (diffSec < 60) return 'Just now'
    const diffMin = Math.floor(diffSec / 60)
    if (diffMin < 60) return `${diffMin}m ago`
    const diffHr = Math.floor(diffMin / 60)
    if (diffHr < 24) return `${diffHr}h ago`
    const diffDay = Math.floor(diffHr / 24)
    if (diffDay < 30) return `${diffDay}d ago`
    return new Intl.DateTimeFormat('en-NG', { month: 'short', day: 'numeric' }).format(new Date(isoDate))
}

/**
 * Format readable calendar date
 */
export function formatDate(isoDate) {
    if (!isoDate) return ''
    return new Intl.DateTimeFormat('en-NG', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(new Date(isoDate))
}
