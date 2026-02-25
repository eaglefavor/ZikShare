/**
 * localStorage-backed saved / wishlisted items.
 * IDs are stored as a JSON array under a single key.
 */

const STORAGE_KEY = 'zikshare_saved_items'

function getIds() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
        return []
    }
}

function persist(ids) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

/** @returns {string[]} all saved listing IDs */
export function getSavedIds() {
    return getIds()
}

/** @returns {boolean} whether the given listing ID is saved */
export function isSaved(id) {
    return getIds().includes(id)
}

/**
 * Toggle a listing's saved state.
 * @returns {boolean} the new state (true = now saved)
 */
export function toggleSaved(id) {
    const ids = getIds()
    const index = ids.indexOf(id)
    if (index === -1) {
        ids.push(id)
        persist(ids)
        return true
    } else {
        ids.splice(index, 1)
        persist(ids)
        return false
    }
}

/** Remove a specific listing from saved items */
export function removeSaved(id) {
    const ids = getIds().filter(i => i !== id)
    persist(ids)
}
