import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ArrowLeft, Loader2, Lock } from 'lucide-react'

export const ADMIN_EMAILS = ['rc5632250@gmail.com']

export function isUserAdmin(user, session) {
    const email = (user?.email || session?.user?.email || '').toLowerCase().trim()
    return ADMIN_EMAILS.includes(email) || user?.role === 'admin'
}

export default function AdminRoute({ children }) {
    const { user, session, isAuthenticated, loading } = useAuth()
    const navigate = useNavigate()

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A' }}>
                <Loader2 size={36} className="animate-spin" color="#3B82F6" />
            </div>
        )
    }

    const isAdmin = isAuthenticated && isUserAdmin(user, session)

    if (!isAdmin) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#0B0F19', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', color: 'white' }}>
                <div style={{ maxWidth: '28rem', width: '100%', backgroundColor: '#1E293B', borderRadius: '1.25rem', border: '1px solid #334155', padding: '2rem 1.5rem', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <div style={{ width: '4rem', height: '4rem', borderRadius: '9999px', backgroundColor: '#450A0A', border: '2px solid #991B1B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: '#EF4444' }}>
                        <Lock size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
                        403 • Administrator Access Only
                    </h2>
                    <p style={{ fontSize: '0.8125rem', color: '#94A3B8', margin: '0 0 1.75rem', lineHeight: 1.5 }}>
                        This control portal is restricted to authorized platform administrators (<strong>rc5632250@gmail.com</strong>).
                    </p>
                    <button
                        onClick={() => navigate('/')}
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
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 14px rgba(59,130,246,0.35)'
                        }}
                    >
                        <ArrowLeft size={16} />
                        Return to Marketplace
                    </button>
                </div>
            </div>
        )
    }

    return children
}
