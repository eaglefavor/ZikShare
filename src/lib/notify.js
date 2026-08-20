/**
 * Global error notifier — bridges non-React libs (database.js, messaging.js)
 * to the UI Toast system without circular imports.
 * Emits a custom event that ToastProvider listens to, plus console.error.
 */

function emit(level, message) {
  const detail = { level, message, at: new Date().toISOString() }
  // Console always
  if (level === 'error') console.error(`[ZikShare] ${message}`, detail)
  else if (level === 'warn') console.warn(`[ZikShare] ${message}`, detail)
  else console.log(`[ZikShare] ${message}`, detail)

  // Dispatch for ToastProvider (if mounted) and DebugConsole
  try {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('zikshare:notify', { detail }))
    }
  } catch (err) {
    console.debug?.('Error dispatching notify event:', err)
  }
  
  // Also push to DebugConsole if available
  try {
    if (typeof window !== 'undefined' && window.__zikshare_logDebug) {
      window.__zikshare_logDebug(level, message, detail)
    }
  } catch (err) {
    console.debug?.('Error logging to DebugConsole:', err)
  }
}

export function notifyError(message) { emit('error', message) }
export function notifyWarn(message) { emit('warn', message) }
export function notifyInfo(message) { emit('info', message) }

export default { notifyError, notifyWarn, notifyInfo }
