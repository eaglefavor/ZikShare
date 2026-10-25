import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, Loader2, CheckCircle, ShieldCheck, Key, Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { upsertUser } from '../lib/database'
import { UNIZIK_LOCATIONS, UNIZIK_FACULTIES, ACADEMIC_LEVELS } from '../lib/categories'
import { PageHeader } from '../components/ui'
import ThemeToggle from '../components/ThemeToggle'

export default function SettingsPage() {
    const navigate = useNavigate()
    const { user, session, isAuthenticated, updateUser, refreshUser, bindAccountPassword } = useAuth()
    const [displayName, setDisplayName] = useState(user?.displayName || '')
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '')
    const [faculty, setFaculty] = useState(user?.faculty || '')
    const [department, setDepartment] = useState(user?.department || '')
    const [level, setLevel] = useState(user?.level || '100L')
    const [lodgeLocation, setLodgeLocation] = useState(user?.lodge_location || 'Garba Square (Perm Site)')

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
            setError('A display name is required.')
            return
        }
        setSaving(true)
        setError('')
        setSaved(false)

        try {
            const currentUserId = user?.uid || user?.id || session?.user?.id
            if (!currentUserId) throw new Error('Not signed in')

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
            setError('Could not save your details. Try again.')
        } finally {
            setSaving(false)
        }
    }

    const handleBindPassword = async (e) => {
        e.preventDefault()
        setPasswordError('')
        setPasswordSuccess(false)

        if (newPassword.length < 6) {
            setPasswordError('Use at least 6 characters.')
            return
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('The two passwords do not match.')
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
            setPasswordError(err.message || 'Could not set a password.')
        } finally {
            setBindingPassword(false)
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="zs-container">
                <div className="zs-panel" style={{ maxWidth: '28rem', margin: '0 auto', textAlign: 'center' }}>
                    <h1 style={{ margin: '0 0 0.5rem', fontSize: 'var(--zs-fs-h2)' }}>Settings</h1>
                    <p style={{ margin: '0 0 1.25rem', fontSize: 'var(--zs-fs-body)', color: 'var(--color-text-secondary)' }}>
                        Sign in to change your name, department and contact details.
                    </p>
                    <button type="button" className="zs-btn zs-btn--primary zs-btn--block" onClick={() => navigate('/login')}>
                        Sign in
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="zs-container">
            <PageHeader
                eyebrow="Account"
                title="Settings"
                lead="Your name, department and where you usually meet buyers or sellers."
            />

            <div style={{ maxWidth: '34rem', display: 'grid', gap: '1rem' }}>
                <section className="zs-panel" aria-labelledby="settings-appearance">
                    <h2 id="settings-appearance" style={{ margin: '0 0 0.6rem', fontSize: 'var(--zs-fs-small)' }}>
                        Appearance
                    </h2>
                    <ThemeToggle />
                </section>

                <div className="zs-panel" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                    <span
                        aria-hidden="true"
                        style={{ width: '2.4rem', height: '2.4rem', borderRadius: '9999px', background: 'var(--color-brand)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}
                    >
                        {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
                    </span>
                    <div style={{ minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 'var(--zs-fs-small)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {user?.email || session?.user?.email}
                        </p>
                        <p style={{ margin: '0.1rem 0 0', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: 'var(--zs-fs-meta)', color: user?.isVerified ? 'var(--color-campus-green)' : 'var(--color-text-muted)' }}>
                            {user?.isVerified ? <ShieldCheck size={12} aria-hidden="true" /> : null}
                            {user?.isVerified ? 'Verified UNIZIK student' : 'UNIZIK email not verified'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSave} className="zs-panel" style={{ display: 'grid', gap: '0.85rem' }}>
                    <div>
                        <label className="zs-label" htmlFor="settings-name">Full name</label>
                        <input
                            id="settings-name"
                            className="zs-input"
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                            maxLength={50}
                        />
                    </div>

                    <div>
                        <label className="zs-label" htmlFor="settings-phone">Phone number</label>
                        <input
                            id="settings-phone"
                            className="zs-input"
                            type="tel"
                            inputMode="numeric"
                            placeholder="2348012345678"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                            maxLength={15}
                        />
                        <p style={{ margin: '0.3rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                            Shown only to a student you are already chatting with. Start with 234, no plus sign or spaces.
                        </p>
                    </div>

                    <div>
                        <label className="zs-label" htmlFor="settings-location">Usual meetup area</label>
                        <select
                            id="settings-location"
                            className="zs-select"
                            style={{ width: '100%' }}
                            value={lodgeLocation}
                            onChange={(e) => setLodgeLocation(e.target.value)}
                        >
                            {UNIZIK_LOCATIONS.map((loc) => (
                                <option key={loc.id} value={loc.name}>{loc.name} ({loc.zone})</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(9rem, 1fr))', gap: '0.75rem' }}>
                        <div>
                            <label className="zs-label" htmlFor="settings-faculty">Faculty</label>
                            <select id="settings-faculty" className="zs-select" style={{ width: '100%' }} value={faculty} onChange={(e) => setFaculty(e.target.value)}>
                                <option value="">Not set</option>
                                {UNIZIK_FACULTIES.map((f) => (
                                    <option key={f.name} value={f.name}>{f.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="zs-label" htmlFor="settings-level">Level</label>
                            <select id="settings-level" className="zs-select" style={{ width: '100%' }} value={level} onChange={(e) => setLevel(e.target.value)}>
                                {ACADEMIC_LEVELS.map((lvl) => (
                                    <option key={lvl} value={lvl}>{lvl}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="zs-label" htmlFor="settings-department">Department</label>
                        <input
                            id="settings-department"
                            className="zs-input"
                            type="text"
                            placeholder="e.g. Theatre and Film Studies"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            maxLength={60}
                        />
                    </div>

                    {error && <p className="zs-auth__error" role="alert">{error}</p>}
                    {saved && <p className="zs-tag zs-tag--free" style={{ display: 'inline-flex' }}><CheckCircle size={12} /> Saved</p>}

                    <button type="submit" className="zs-btn zs-btn--primary zs-btn--block" disabled={saving}>
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {saving ? 'Saving…' : 'Save details'}
                    </button>
                </form>

                <form onSubmit={handleBindPassword} className="zs-panel" style={{ display: 'grid', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <Key size={16} color="var(--color-brand)" aria-hidden="true" style={{ marginTop: '0.15rem' }} />
                        <div>
                            <h2 style={{ margin: 0, fontSize: 'var(--zs-fs-card)', fontWeight: 700 }}>Password sign-in</h2>
                            <p style={{ margin: '0.15rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                Set a password so you can still sign in with your email if Google sign-in is unavailable.
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(9rem, 1fr))', gap: '0.75rem' }}>
                        <div>
                            <label className="zs-label" htmlFor="settings-password">New password</label>
                            <input
                                id="settings-password"
                                className="zs-input"
                                type="password"
                                autoComplete="new-password"
                                placeholder="At least 6 characters"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>
                        <div>
                            <label className="zs-label" htmlFor="settings-password-confirm">Repeat password</label>
                            <input
                                id="settings-password-confirm"
                                className="zs-input"
                                type="password"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    {passwordError && <p className="zs-auth__error" role="alert">{passwordError}</p>}
                    {passwordSuccess && (
                        <p className="zs-tag zs-tag--free" style={{ display: 'inline-flex' }}>
                            <CheckCircle size={12} /> Password set — you can now sign in with email and password
                        </p>
                    )}

                    <button type="submit" className="zs-btn zs-btn--outline" disabled={bindingPassword} style={{ justifySelf: 'start' }}>
                        {bindingPassword ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
                        {bindingPassword ? 'Saving…' : 'Set password'}
                    </button>
                </form>
            </div>
        </div>
    )
}
