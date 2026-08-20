import { useState } from 'react'
import { Wrench, RefreshCw, Shield, Zap, Lock, Sparkles, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { isUserAdmin } from '../components/AdminRoute'
import { useNavigate } from 'react-router-dom'

export default function MaintenancePage() {
    const { user, session, signInWithGoogle, loading } = useAuth()
    const navigate = useNavigate()
    const [refreshing, setRefreshing] = useState(false)
    const [showAdminLogin, setShowAdminLogin] = useState(false)
    const [loginLoading, setLoginLoading] = useState(false)

    const isAdmin = isUserAdmin(user, session)

    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            window.location.reload()
        }, 600)
    }

    const handleAdminGoogleLogin = async () => {
        setLoginLoading(true)
        try {
            await signInWithGoogle()
        } catch (err) {
            console.error('Admin login error:', err)
            setLoginLoading(false)
        }
    }

    if (isAdmin) {
        return (
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#0B0F19',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                color: 'white',
                fontFamily: 'inherit'
            }}>
                <div style={{
                    maxWidth: '26rem',
                    width: '100%',
                    backgroundColor: '#1E293B',
                    borderRadius: '1.25rem',
                    border: '1px solid #334155',
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                }}>
                    <div style={{
                        width: '3.5rem',
                        height: '3.5rem',
                        borderRadius: '9999px',
                        backgroundColor: '#064E3B',
                        border: '2px solid #059669',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.25rem',
                        color: '#34D399'
                    }}>
                        <CheckCircle2 size={28} />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
                        Admin Bypass Active 👑
                    </h2>
                    <p style={{ fontSize: '0.8125rem', color: '#94A3B8', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
                        Maintenance mode is enabled for general visitors, but you are recognized as the platform admin (<strong>{user?.email}</strong>).
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <button
                            onClick={() => navigate('/admin')}
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                borderRadius: '0.75rem',
                                border: 'none',
                                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                                color: 'white',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 4px 14px rgba(59,130,246,0.35)'
                            }}
                        >
                            Open Admin Suite
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #475569',
                                backgroundColor: 'transparent',
                                color: '#E2E8F0',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            Browse Site as Admin
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#0B0F19',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem 1rem',
            color: 'white',
            fontFamily: 'inherit',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Background Glows */}
            <div style={{
                position: 'absolute',
                top: '-15%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '450px',
                height: '450px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(11, 15, 25, 0) 70%)',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-10%',
                width: '350px',
                height: '350px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(234, 179, 8, 0.10) 0%, rgba(11, 15, 25, 0) 70%)',
                pointerEvents: 'none'
            }} />

            <div style={{
                maxWidth: '28rem',
                width: '100%',
                backgroundColor: 'rgba(30, 41, 59, 0.85)',
                backdropFilter: 'blur(16px)',
                borderRadius: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '2.25rem 1.5rem',
                textAlign: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                zIndex: 10,
                position: 'relative'
            }}>
                {/* Brand Logo Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <div style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '0.75rem',
                        background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 900,
                        fontSize: '1.125rem',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
                    }}>
                        Z
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#F8FAFC' }}>
                        ZikShare<span style={{ color: '#60A5FA' }}>.</span>
                    </span>
                </div>

                {/* Animated Maintenance Icon Badge */}
                <div style={{
                    width: '4.5rem',
                    height: '4.5rem',
                    borderRadius: '1.25rem',
                    backgroundColor: 'rgba(234, 179, 8, 0.12)',
                    border: '1.5px solid rgba(234, 179, 8, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    color: '#FACC15',
                    boxShadow: '0 0 25px rgba(234, 179, 8, 0.2)'
                }}>
                    <Wrench size={36} className="animate-pulse" />
                </div>

                {/* Status Pill */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(234, 179, 8, 0.15)',
                    border: '1px solid rgba(234, 179, 8, 0.3)',
                    color: '#FDE047',
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '1rem'
                }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FACC15', display: 'inline-block' }} />
                    Scheduled System Upgrade
                </div>

                {/* Heading */}
                <h1 style={{ fontSize: '1.375rem', fontWeight: 800, margin: '0 0 0.625rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                    We'll Be Right Back! 🛠️
                </h1>

                {/* Description */}
                <p style={{ fontSize: '0.875rem', color: '#94A3B8', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
                    ZikShare is currently undergoing routine system maintenance and security enhancements for UNIZIK students. All course notes, listings, and digital orders will resume shortly.
                </p>

                {/* What's New Pills */}
                <div style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    borderRadius: '0.875rem',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '0.875rem',
                    marginBottom: '1.5rem',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#CBD5E1' }}>
                        <Zap size={14} color="#60A5FA" style={{ flexShrink: 0 }} />
                        <span>Faster study material search & PWA offline caching</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#CBD5E1' }}>
                        <Shield size={14} color="#34D399" style={{ flexShrink: 0 }} />
                        <span>Enhanced PDF watermarking & anti-piracy protection</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#CBD5E1' }}>
                        <Sparkles size={14} color="#FBBF24" style={{ flexShrink: 0 }} />
                        <span>Official campus broadcast & announcement channel</span>
                    </div>
                </div>

                {/* Refresh Button */}
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    style={{
                        width: '100%',
                        padding: '0.875rem',
                        borderRadius: '0.75rem',
                        border: 'none',
                        background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                        color: 'white',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        cursor: refreshing ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 14px rgba(59,130,246,0.35)',
                        transition: 'opacity 0.2s ease',
                        opacity: refreshing ? 0.7 : 1
                    }}
                >
                    <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                    {refreshing ? 'Checking Status...' : 'Check If System Is Back Online'}
                </button>

                {/* Admin Access Option */}
                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    {!showAdminLogin ? (
                        <button
                            onClick={() => setShowAdminLogin(true)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#64748B',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                transition: 'color 0.15s ease'
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
                        >
                            <Lock size={12} />
                            Platform Administrator Login
                        </button>
                    ) : (
                        <div style={{
                            backgroundColor: '#0F172A',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            border: '1px solid #334155'
                        }}>
                            <p style={{ margin: '0 0 0.75rem', fontSize: '0.75rem', color: '#94A3B8' }}>
                                Sign in with authorized admin account (<strong>rc5632250@gmail.com</strong>) to manage and preview changes:
                            </p>
                            <button
                                onClick={handleAdminGoogleLogin}
                                disabled={loginLoading || loading}
                                style={{
                                    width: '100%',
                                    padding: '0.625rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #475569',
                                    backgroundColor: 'white',
                                    color: '#0F172A',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                </svg>
                                {loginLoading ? 'Authenticating...' : 'Sign in with Google'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Note */}
                <p style={{ margin: '1.25rem 0 0', fontSize: '0.6875rem', color: '#64748B' }}>
                    UNIZIK Campus Marketplace • Est. Downtime: Minimal
                </p>
            </div>
        </div>
    )
}
