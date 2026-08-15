import { useState, useEffect } from 'react'
import { Bug, X, Play, CheckCircle, AlertTriangle, RefreshCw, Copy, Trash2, ShieldCheck, Database, UploadCloud } from 'lucide-react'
import supabase from '../lib/supabase'
import { resolveBankAccount } from '../lib/paystack'
import { useAuth } from '../contexts/AuthContext'

// Global in-memory log buffer so any module can log to debug console
const logListeners = new Set()
export const debugLogs = []

export function logDebug(type, message, details = null) {
    const entry = {
        id: Date.now() + Math.random().toString(36).substring(2, 7),
        time: new Date().toLocaleTimeString(),
        type, // 'info' | 'warn' | 'error' | 'success'
        message,
        details,
    }
    debugLogs.unshift(entry)
    if (debugLogs.length > 100) debugLogs.pop()
    logListeners.forEach(fn => fn([...debugLogs]))
}

export default function DebugConsole() {
    const { session, user, isAuthenticated } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [logs, setLogs] = useState([])
    const [diagnosticsRunning, setDiagnosticsRunning] = useState(false)
    const [diagResults, setDiagResults] = useState(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        setLogs([...debugLogs])
        const handler = (newLogs) => setLogs(newLogs)
        logListeners.add(handler)
        return () => logListeners.delete(handler)
    }, [])

    const runFullDiagnostics = async () => {
        setDiagnosticsRunning(true)
        const results = {
            auth: { name: 'Authentication State', status: 'pending', details: '' },
            usersTable: { name: 'Users Table Read/Write', status: 'pending', details: '' },
            digitalProductsTable: { name: 'Digital Products Table', status: 'pending', details: '' },
            storageOriginals: { name: 'Storage: digital-originals bucket', status: 'pending', details: '' },
            edgeFunction: { name: 'Edge Function: resolve-bank-account', status: 'pending', details: '' },
        }
        setDiagResults({ ...results })
        logDebug('info', '🚀 Starting full platform diagnostics...')

        // 1. Auth check
        try {
            const { data } = await supabase.auth.getSession()
            const s = data?.session
            results.auth = {
                name: 'Authentication State',
                status: s?.user ? 'success' : 'warn',
                details: s?.user ? `Logged in as: ${s.user.email} (UID: ${s.user.id.slice(0, 8)}...)` : 'Guest user (no active Supabase session)',
            }
            logDebug(results.auth.status, `Auth Check: ${results.auth.details}`)
        } catch (e) {
            results.auth = { name: 'Authentication State', status: 'error', details: e.message }
            logDebug('error', 'Auth Check Error', e.message)
        }
        setDiagResults({ ...results })

        // 2. Users Table Read/Write
        try {
            const uid = session?.user?.id || user?.uid || '00000000-0000-0000-0000-000000000001'
            const testUser = {
                uid,
                email: session?.user?.email || user?.email || 'diagnostic@test.com',
                displayName: 'Diagnostic Test User',
                isVerified: true,
                updatedAt: new Date().toISOString(),
            }
            const { data, error } = await supabase.from('users').upsert(testUser, { onConflict: 'uid' }).select()
            if (error) throw error
            results.usersTable = {
                name: 'Users Table Read/Write',
                status: 'success',
                details: `Successfully upserted user row in public.users (${data?.length || 1} row).`,
            }
            logDebug('success', `Users Table Check: OK`)
        } catch (e) {
            results.usersTable = { name: 'Users Table Read/Write', status: 'error', details: e.message }
            logDebug('error', 'Users Table Check Error', e.message)
        }
        setDiagResults({ ...results })

        // 3. Storage bucket: digital-originals
        try {
            const testBlob = new Blob(['%PDF-1.4 Diagnostic Test PDF Content'], { type: 'application/pdf' })
            const testPath = `diag/test-${Date.now()}.pdf`
            const { data, error } = await supabase.storage.from('digital-originals').upload(testPath, testBlob, {
                contentType: 'application/pdf',
                upsert: true,
            })
            if (error) throw error
            results.storageOriginals = {
                name: 'Storage: digital-originals bucket',
                status: 'success',
                details: `Successfully uploaded test file to digital-originals (${data?.path}).`,
            }
            logDebug('success', `Storage Check: digital-originals upload OK (${data?.path})`)

            // Cleanup test file
            supabase.storage.from('digital-originals').remove([testPath]).catch(() => {})
        } catch (e) {
            results.storageOriginals = { name: 'Storage: digital-originals bucket', status: 'error', details: e.message }
            logDebug('error', 'Storage Check Error', e.message)
        }
        setDiagResults({ ...results })

        // 4. Digital Products Table
        try {
            const { data, error } = await supabase.from('digital_products').select('id, title, status').limit(3)
            if (error) throw error
            results.digitalProductsTable = {
                name: 'Digital Products Table',
                status: 'success',
                details: `Successfully queried digital_products table (${data?.length || 0} active records found).`,
            }
            logDebug('success', `Digital Products Table Check: OK`)
        } catch (e) {
            results.digitalProductsTable = { name: 'Digital Products Table', status: 'error', details: e.message }
            logDebug('error', 'Digital Products Table Check Error', e.message)
        }
        setDiagResults({ ...results })

        // 5. Edge Function: resolve-bank-account
        try {
            const res = await resolveBankAccount('7016159288', '999992')
            if (res.success && res.accountName) {
                results.edgeFunction = {
                    name: 'Edge Function: resolve-bank-account',
                    status: 'success',
                    details: `Resolved OPay test account: "${res.accountName}" (HTTP 200 OK)`,
                }
                logDebug('success', `Edge Function Check: OK ("${res.accountName}")`)
            } else {
                results.edgeFunction = {
                    name: 'Edge Function: resolve-bank-account',
                    status: 'warn',
                    details: res.error || 'Edge function returned status false',
                }
                logDebug('warn', 'Edge Function Check Warning', res.error)
            }
        } catch (e) {
            results.edgeFunction = { name: 'Edge Function: resolve-bank-account', status: 'error', details: e.message }
            logDebug('error', 'Edge Function Check Error', e.message)
        }

        setDiagResults({ ...results })
        setDiagnosticsRunning(false)
        logDebug('info', '✅ Diagnostics suite completed.')
    }

    const copyAllLogs = () => {
        const text = JSON.stringify({ diagResults, logs }, null, 2)
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const clearLogs = () => {
        debugLogs.length = 0
        setLogs([])
    }

    return (
        <>
            {/* Floating Debug Icon at bottom-right */}
            <div
                onClick={() => setIsOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '4.5rem',
                    right: '1rem',
                    zIndex: 9999,
                    backgroundColor: '#1E293B',
                    color: '#38BDF8',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '9999px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    border: '1px solid rgba(255,255,255,0.1)',
                }}
            >
                <Bug size={14} color="#38BDF8" />
                <span>Diagnostics</span>
                {logs.some(l => l.type === 'error') && (
                    <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '9999px', backgroundColor: '#EF4444' }} />
                )}
            </div>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        zIndex: 10000,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            width: '100%',
                            maxWidth: '36rem',
                            maxHeight: '85vh',
                            backgroundColor: '#0F172A',
                            color: '#F8FAFC',
                            borderTopLeftRadius: '1.25rem',
                            borderTopRightRadius: '1.25rem',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            boxShadow: '0 -10px 25px rgba(0,0,0,0.5)',
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '0.875rem 1rem', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Bug size={18} color="#38BDF8" />
                                <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800 }}>ZikShare Diagnostics & Live Logs</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Quick Action Toolbar */}
                        <div style={{ padding: '0.75rem 1rem', backgroundColor: '#1E293B', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                            <button
                                onClick={runFullDiagnostics}
                                disabled={diagnosticsRunning}
                                style={{
                                    padding: '0.4rem 0.875rem',
                                    borderRadius: '0.5rem',
                                    border: 'none',
                                    background: diagnosticsRunning ? '#475569' : 'linear-gradient(135deg, #3B82F6, #2563EB)',
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    cursor: diagnosticsRunning ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.375rem',
                                }}
                            >
                                {diagnosticsRunning ? <RefreshCw size={12} className="animate-spin" /> : <Play size={12} />}
                                <span>{diagnosticsRunning ? 'Running Tests...' : 'Run Diagnostics'}</span>
                            </button>

                            <button
                                onClick={copyAllLogs}
                                style={{
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #334155',
                                    backgroundColor: '#0F172A',
                                    color: '#E2E8F0',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                }}
                            >
                                <Copy size={12} />
                                <span>{copied ? 'Copied!' : 'Copy Data'}</span>
                            </button>

                            <button
                                onClick={clearLogs}
                                style={{
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #334155',
                                    backgroundColor: '#0F172A',
                                    color: '#94A3B8',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    marginLeft: 'auto',
                                }}
                            >
                                <Trash2 size={12} />
                                <span>Clear</span>
                            </button>
                        </div>

                        {/* Main Body */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Current Session Summary */}
                            <div style={{ padding: '0.75rem', borderRadius: '0.625rem', backgroundColor: '#1E293B', border: '1px solid #334155', fontSize: '0.75rem' }}>
                                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: '#38BDF8' }}>Active Session Context:</p>
                                <p style={{ margin: 0, color: '#94A3B8' }}>Authenticated: <strong style={{ color: isAuthenticated ? '#4ADE80' : '#F87171' }}>{isAuthenticated ? 'YES' : 'NO'}</strong></p>
                                <p style={{ margin: '0.125rem 0 0', color: '#94A3B8' }}>User Email: <strong>{session?.user?.email || user?.email || 'N/A'}</strong></p>
                                <p style={{ margin: '0.125rem 0 0', color: '#94A3B8' }}>User ID: <code>{session?.user?.id || user?.uid || 'N/A'}</code></p>
                            </div>

                            {/* Diagnostics Results Cards */}
                            {diagResults && (
                                <div>
                                    <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.8125rem', fontWeight: 700, color: '#E2E8F0' }}>Diagnostic Results:</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                                        {Object.entries(diagResults).map(([key, item]) => {
                                            const isSuccess = item.status === 'success'
                                            const isError = item.status === 'error'
                                            const isWarn = item.status === 'warn'

                                            return (
                                                <div
                                                    key={key}
                                                    style={{
                                                        padding: '0.625rem',
                                                        borderRadius: '0.5rem',
                                                        backgroundColor: isSuccess ? 'rgba(34, 197, 94, 0.1)' : isError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(234, 179, 8, 0.1)',
                                                        border: `1px solid ${isSuccess ? '#15803D' : isError ? '#991B1B' : '#854D0E'}`,
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{item.name}</span>
                                                        <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: isSuccess ? '#4ADE80' : isError ? '#F87171' : '#FACC15' }}>
                                                            {item.status.toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <p style={{ margin: 0, fontSize: '0.6875rem', color: '#CBD5E1', fontFamily: 'monospace', wordBreak: 'break-word' }}>
                                                        {item.details}
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Live Logs Stream */}
                            <div>
                                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.8125rem', fontWeight: 700, color: '#E2E8F0' }}>Live Event Stream ({logs.length}):</h4>
                                {logs.length === 0 ? (
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>No events recorded yet. Perform an action or click "Run Diagnostics".</p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        {logs.map((log) => {
                                            const colorMap = {
                                                success: '#4ADE80',
                                                error: '#F87171',
                                                warn: '#FACC15',
                                                info: '#38BDF8',
                                            }
                                            return (
                                                <div
                                                    key={log.id}
                                                    style={{
                                                        padding: '0.4rem 0.5rem',
                                                        borderRadius: '0.375rem',
                                                        backgroundColor: '#020617',
                                                        border: '1px solid #1E293B',
                                                        fontSize: '0.6875rem',
                                                        fontFamily: 'monospace',
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                        <span style={{ color: '#64748B', fontSize: '0.625rem' }}>{log.time}</span>
                                                        <span style={{ color: colorMap[log.type] || '#CBD5E1', fontWeight: 700 }}>
                                                            [{log.type.toUpperCase()}]
                                                        </span>
                                                        <span style={{ color: '#E2E8F0', flex: 1, wordBreak: 'break-word' }}>{log.message}</span>
                                                    </div>
                                                    {log.details && (
                                                        <pre style={{ margin: '0.25rem 0 0', padding: '0.25rem', backgroundColor: '#0B0F17', color: '#94A3B8', fontSize: '0.625rem', overflowX: 'auto', borderRadius: '0.25rem' }}>
                                                            {typeof log.details === 'object' ? JSON.stringify(log.details, null, 2) : log.details}
                                                        </pre>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
