import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Loader2, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { upsertUser } from '../lib/database'

export default function SettingsPage() {
    const navigate = useNavigate()
    const { user, session, isAuthenticated, updateUser, refreshUser } = useAuth()
    const [displayName, setDisplayName] = useState(user?.displayName || '')
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '')
    const [department, setDepartment] = useState(user?.department || '')
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')

    const handleSave = async (e) => {
        e.preventDefault()
        if (!displayName.trim()) {
            setError('Display name is required')
            return
        }
        setSaving(true)
        setError('')
        setSaved(false)

        try {
            const currentUserId = user?.uid || user?.id || session?.user?.id;
            if (!currentUserId) {
                throw new Error('Not authenticated')
            }

            const updates = {
                displayName: displayName.trim(),
                phoneNumber: phoneNumber.trim(),
                department: department.trim(),
            }
            await upsertUser({
                uid: currentUserId,
                email: user?.email || session?.user?.email,
                ...updates,
                isVerified: user?.isVerified || false,
                createdAt: user?.createdAt || new Date().toISOString(),
            })
            // Update in-memory state immediately + reload from DB for full sync
            updateUser(updates)
            await refreshUser()
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch (err) {
            console.error('Settings save error:', err)
            setError('Failed to save. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    if (!isAuthenticated) {
        return (
            <div>
                <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}><ArrowLeft size={20} /></button>
                    <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Settings</h1>
                </header>
                <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '2rem' }}>🔒</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Sign in to access settings</p>
                    <button onClick={() => navigate('/login')} style={{ marginTop: '1rem', padding: '0.75rem 2rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.875rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer' }}>Sign In</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}><ArrowLeft size={20} /></button>
                <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Settings</h1>
            </header>

            <form onSubmit={handleSave} style={{ padding: '1.25rem 1rem' }}>
                {/* Display Name */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Display Name *</label>
                    <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} required maxLength={50}
                        style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--color-brand)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>

                {/* Phone */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Phone Number (WhatsApp) *</label>
                    <input type="tel" placeholder="2348012345678" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))} maxLength={15}
                        style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--color-brand)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--color-border)')} />
                    <div style={{ marginTop: '0.375rem', padding: '0.5rem 0.625rem', borderRadius: '0.5rem', backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                        <p style={{ margin: 0, fontSize: '0.625rem', color: '#1E40AF', fontWeight: 600 }}>📱 Format: country code + number, no spaces or "+"</p>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: '#1E40AF', fontFamily: 'monospace' }}>✅ 2348012345678 &nbsp; ❌ +2348012345678</p>
                    </div>
                </div>

                {/* Department */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Department</label>
                    <input type="text" placeholder="e.g., Computer Science" value={department} onChange={e => setDepartment(e.target.value)} maxLength={60}
                        style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--color-brand)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>

                {/* Error */}
                {error && (
                    <div style={{ padding: '0.625rem 0.875rem', borderRadius: '0.625rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginBottom: '1rem' }}>
                        {error}
                    </div>
                )}

                {/* Success */}
                {saved && (
                    <div style={{ padding: '0.625rem 0.875rem', borderRadius: '0.625rem', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534', fontSize: '0.75rem', fontWeight: 500, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <CheckCircle size={14} /> Profile updated successfully!
                    </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={saving}
                    style={{ width: '100%', padding: '0.875rem', borderRadius: '0.75rem', border: 'none', fontSize: '0.9375rem', fontWeight: 700, fontFamily: 'inherit', cursor: saving ? 'not-allowed' : 'pointer', background: saving ? '#93C5FD' : 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', boxShadow: saving ? 'none' : '0 4px 14px rgba(59,130,246,0.4)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    {saving ? (
                        <>
                            <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Save Changes
                        </>
                    )}
                </button>
            </form>

            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}
