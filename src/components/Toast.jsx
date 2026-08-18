import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'success', duration = 2800) => {
        const id = Date.now() + Math.random().toString(36).substring(2, 6)
        setToasts(prev => [...prev.slice(-2), { id, message, type }])

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, duration)
    }, [])

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    const toast = {
        success: (msg, dur) => addToast(msg, 'success', dur),
        error: (msg, dur) => addToast(msg, 'error', dur),
        info: (msg, dur) => addToast(msg, 'info', dur),
    }

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <div
                style={{
                    position: 'fixed',
                    bottom: '5.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    width: 'calc(100% - 2rem)',
                    maxWidth: '24rem',
                    pointerEvents: 'none',
                }}
            >
                {toasts.map(t => (
                    <div
                        key={t.id}
                        style={{
                            pointerEvents: 'auto',
                            width: '100%',
                            padding: '0.6875rem 0.875rem',
                            borderRadius: '0.75rem',
                            backgroundColor: t.type === 'error' ? '#1E293B' : t.type === 'info' ? '#1E3A8A' : '#0F172A',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.625rem',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
                            border: `1px solid ${t.type === 'error' ? '#EF4444' : t.type === 'info' ? '#3B82F6' : '#22C55E'}`,
                            animation: 'toastSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                            {t.type === 'error' && <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0 }} />}
                            {t.type === 'info' && <Info size={16} color="#60A5FA" style={{ flexShrink: 0 }} />}
                            {t.type === 'success' && <CheckCircle2 size={16} color="#4ADE80" style={{ flexShrink: 0 }} />}
                            <span style={{ fontSize: '0.8125rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {t.message}
                            </span>
                        </div>
                        <button
                            onClick={() => removeToast(t.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#94A3B8',
                                padding: '0.125rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                flexShrink: 0
                            }}
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes toastSlideUp {
                    from { transform: translateY(16px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        return {
            success: (m) => console.log('Toast:', m),
            error: (m) => console.error('Toast:', m),
            info: (m) => console.log('Toast:', m),
        }
    }
    return context
}

export default ToastProvider
