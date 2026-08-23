import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Loader2, CheckCircle, ShieldCheck, Key, Lock, MapPin, GraduationCap } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { upsertUser } from '../lib/database'
import { UNIZIK_LOCATIONS, UNIZIK_FACULTIES, ACADEMIC_LEVELS } from '../lib/categories'

export default function SettingsPage() {
    const navigate = useNavigate()
    const { user, session, isAuthenticated, updateUser, refreshUser, bindAccountPassword } = useAuth()
    const [displayName, setDisplayName] = useState(user?.displayName || '')
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '')
    const [faculty, setFaculty] = useState(user?.faculty || '')
    const [department, setDepartment] = useState(user?.department || '')
    const [level, setLevel] = useState(user?.level || '100L')
    const [lodgeLocation, setLodgeLocation] = useState(user?.lodge_location || 'Garba Square (Perm Site)')
    
    // Emergency Password Binding State
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [bindingPassword, setBindingPassword] = useState(false)
    const [passwordSuccess, setPasswordSuccess] = useState(false)
    const [passwordError, setPasswordError] = useState('')

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
                faculty: faculty.trim(),
                department: department.trim(),
                level,
                lodge_location: lodgeLocation,
            }
            await upsertUser({
                uid: currentUserId,
                email: user?.email || session?.user?.email,
                ...updates,
                isVerified: user?.isVerified || false,
                createdAt: user?.createdAt || new Date().toISOString(),
            })
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

    const handleBindPassword = async (e) => {
        e.preventDefault()
        setPasswordError('')
        setPasswordSuccess(false)

        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters')
            return
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match')
            return
        }

        setBindingPassword(true)
        try {
            await bindAccountPassword(newPassword)
            setPasswordSuccess(true)
            setNewPassword('')
            setConfirmPassword('')
            setTimeout(() => setPasswordSuccess(false), 4000)
        } catch (err) {
            console.error('Bind password error:', err)
            setPasswordError(err.message || 'Failed to bind password')
        } finally {
            setBindingPassword(false)
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
        <div style={{ maxWidth: '640px', margin: '0 auto', paddingBottom: '3rem' }}>
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}><ArrowLeft size={20} /></button>
                <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Profile & Account Settings</h1>
            </header>

            <form onSubmit={handleSave} style={{ padding: '1.25rem 1rem' }}>
                {/* Account info header */}
                <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '0.875rem', border: '1px solid #E2E8F0', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '9999px', backgroundColor: '#2563EB', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.125rem' }}>
                        {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>{user?.email || session?.user?.email}</div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.125rem' }}>
                            <ShieldCheck size={12} color="#059669" /> Verified UNIZIK Student Account
                        </div>
                    </div>
                </div>

                {/* Display Name */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Full Name / Display Name *</label>
                    <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} required maxLength={50}
                        style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                </div>

                {/* Phone */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>WhatsApp Phone Number *</label>
                    <input type="tel" placeholder="2348012345678" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))} maxLength={15}
                        style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                    <div style={{ marginTop: '0.375rem', padding: '0.5rem 0.625rem', borderRadius: '0.5rem', backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                        <p style={{ margin: 0, fontSize: '0.6875rem', color: '#1E40AF', fontWeight: 600 }}>Format: 2348012345678 (No + sign or spaces)</p>
                    </div>
                </div>

                {/* Campus Lodge / Location */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.375rem' }}>
                        <MapPin size={14} color="#2563EB" /> Campus Meetup & Lodge Location
                    </label>
                    <select value={lodgeLocation} onChange={e => setLodgeLocation(e.target.value)}
                        style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', backgroundColor: 'white' }}>
                        {UNIZIK_LOCATIONS.map(loc => (
                            <option key={loc.id} value={loc.name}>{loc.name} ({loc.zone})</option>
                        ))}
                    </select>
                </div>

                {/* Faculty & Level */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div>
                        <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.375rem' }}>
                            <GraduationCap size={14} color="#059669" /> Faculty
                        </label>
                        <select value={faculty} onChange={e => setFaculty(e.target.value)}
                            style={{ width: '100%', padding: '0.625rem 0.5rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.75rem', fontFamily: 'inherit', backgroundColor: 'white' }}>
                            <option value="">Select Faculty...</option>
                            {UNIZIK_FACULTIES.map(f => (
                                <option key={f.name} value={f.name}>{f.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Academic Level</label>
                        <select value={level} onChange={e => setLevel(e.target.value)}
                            style={{ width: '100%', padding: '0.625rem 0.5rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.75rem', fontFamily: 'inherit', backgroundColor: 'white' }}>
                            {ACADEMIC_LEVELS.map(lvl => (
                                <option key={lvl} value={lvl}>{lvl}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Department */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Department</label>
                    <input type="text" placeholder="e.g., Mechanical Engineering" value={department} onChange={e => setDepartment(e.target.value)} maxLength={60}
                        style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
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
                    style={{ width: '100%', padding: '0.875rem', borderRadius: '0.75rem', border: 'none', fontSize: '0.9375rem', fontWeight: 700, fontFamily: 'inherit', cursor: saving ? 'not-allowed' : 'pointer', background: saving ? '#BFDBFE' : 'linear-gradient(135deg, #1E40AF, #1E3A8A)', color: 'white', boxShadow: '0 4px 14px rgba(30,64,175,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    {saving ? (
                        <>
                            <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Save Profile Details
                        </>
                    )}
                </button>
            </form>

            {/* Emergency Password Setup Card for Google / Manual Login */}
            <div style={{ margin: '1rem', padding: '1.25rem', backgroundColor: '#F8FAFC', borderRadius: '1rem', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ padding: '0.375rem', borderRadius: '0.5rem', backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                        <Key size={18} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700 }}>Emergency Password Setup</h3>
                        <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: '#64748B' }}>
                            Bind a password to your account to sign in with email/password if Google OAuth is ever unavailable.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleBindPassword} style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>New Password</label>
                            <input type="password" placeholder="Min. 6 chars" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6}
                                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontSize: '0.75rem', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Confirm Password</label>
                            <input type="password" placeholder="Repeat password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required minLength={6}
                                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontSize: '0.75rem', boxSizing: 'border-box' }} />
                        </div>
                    </div>

                    {passwordError && (
                        <div style={{ padding: '0.5rem 0.75rem', borderRadius: '0.5rem', backgroundColor: '#FEF2F2', color: '#DC2626', fontSize: '0.6875rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                            {passwordError}
                        </div>
                    )}

                    {passwordSuccess && (
                        <div style={{ padding: '0.5rem 0.75rem', borderRadius: '0.5rem', backgroundColor: '#F0FDF4', color: '#166534', fontSize: '0.6875rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <CheckCircle size={14} /> Password bound successfully! You can now log in with email and this password anytime.
                        </div>
                    )}

                    <button type="submit" disabled={bindingPassword}
                        style={{ padding: '0.625rem 1.25rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#0F172A', color: 'white', fontSize: '0.8125rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        {bindingPassword ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
                        {bindingPassword ? 'Saving Password...' : 'Bind / Update Login Password'}
                    </button>
                </form>
            </div>

            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}
