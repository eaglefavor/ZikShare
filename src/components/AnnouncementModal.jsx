import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Sparkles, AlertTriangle, ShieldAlert, Megaphone, X, ExternalLink, ArrowRight, Pin } from 'lucide-react'
import { getAnnouncements } from '../lib/database'
import { markAnnouncementsAsRead } from '../lib/announcements'

const categoryConfig = {
    feature_update: { label: 'Feature Update', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE', icon: Sparkles },
    disciplinary_notice: { label: 'Disciplinary Notice', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA', icon: ShieldAlert },
    security_alert: { label: 'Safety & Policy', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', icon: AlertTriangle },
    marketplace_notice: { label: 'Marketplace Update', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0', icon: Megaphone },
    maintenance: { label: 'System Notice', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE', icon: Shield },
}

export default function AnnouncementModal() {
    const navigate = useNavigate()
    const [urgentAnnouncement, setUrgentAnnouncement] = useState(null)

    useEffect(() => {
        async function checkUrgentBroadcasts() {
            try {
                const list = await getAnnouncements({ limit: 5 })
                const dismissed = JSON.parse(localStorage.getItem('zikshare_dismissed_announcements') || '[]')
                // Find urgent popup that user hasn't dismissed yet
                const target = list.find(a => a.priority === 'urgent_popup' && !dismissed.includes(a.id))
                if (target) {
                    setUrgentAnnouncement(target)
                }
            } catch (err) {
                // Silently ignore
            }
        }

        checkUrgentBroadcasts()
    }, [])

    if (!urgentAnnouncement) return null

    const handleDismiss = () => {
        try {
            const dismissed = JSON.parse(localStorage.getItem('zikshare_dismissed_announcements') || '[]')
            localStorage.setItem('zikshare_dismissed_announcements', JSON.stringify([...dismissed, urgentAnnouncement.id]))
            markAnnouncementsAsRead([urgentAnnouncement.id])
        } catch {}
        setUrgentAnnouncement(null)
    }

    const handleActionClick = () => {
        handleDismiss()
        if (urgentAnnouncement.action_url) {
            navigate(urgentAnnouncement.action_url)
        } else {
            navigate('/official-channel')
        }
    }

    const cfg = categoryConfig[urgentAnnouncement.category] || categoryConfig.feature_update
    const CategoryIcon = cfg.icon

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={handleDismiss}
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 100,
                    animation: 'fadeIn 0.2s ease-out'
                }}
            />

            {/* Modal Dialog */}
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'calc(100% - 2rem)',
                    maxWidth: '24rem',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '1.25rem',
                    padding: '1.5rem',
                    zIndex: 101,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    animation: 'modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
            >
                {/* Top Badge & Close button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, fontSize: '0.6875rem', fontWeight: 800 }}>
                        <CategoryIcon size={12} />
                        <span>{cfg.label}</span>
                    </div>

                    <button
                        onClick={handleDismiss}
                        style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '0.25rem' }}
                    >
                        <X size={18} />
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                        <Shield size={14} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.3 }}>
                            {urgentAnnouncement.title}
                        </h2>
                        <span style={{ fontSize: '0.625rem', color: '#64748B' }}>Official UNIZIK Broadcast</span>
                    </div>
                </div>

                <p style={{ fontSize: '0.8125rem', color: '#334155', lineHeight: 1.45, margin: '0 0 1.25rem' }}>
                    {urgentAnnouncement.content}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button
                        onClick={handleActionClick}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                            color: 'white',
                            fontSize: '0.8125rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.375rem',
                            boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
                        }}
                    >
                        <span>{urgentAnnouncement.action_label || 'Acknowledge & View'}</span>
                        <ArrowRight size={14} />
                    </button>

                    <button
                        onClick={handleDismiss}
                        style={{
                            width: '100%',
                            padding: '0.625rem',
                            borderRadius: '0.75rem',
                            border: '1px solid #E2E8F0',
                            backgroundColor: 'white',
                            color: '#64748B',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        Dismiss
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes modalPop {
                    from { transform: translate(-50%, -46%); opacity: 0; }
                    to { transform: translate(-50%, -50%); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </>
    )
}

export function HomeAnnouncementBanner() {
    const navigate = useNavigate()
    const [pinnedAnnouncement, setPinnedAnnouncement] = useState(null)
    const [dismissed, setDismissed] = useState(false)

    useEffect(() => {
        async function fetchPinned() {
            try {
                const list = await getAnnouncements({ limit: 5 })
                const pinned = list.find(a => a.is_pinned && a.is_active)
                if (pinned) setPinnedAnnouncement(pinned)
            } catch {}
        }
        fetchPinned()
    }, [])

    if (!pinnedAnnouncement || dismissed) return null

    const cfg = categoryConfig[pinnedAnnouncement.category] || categoryConfig.feature_update

    return (
        <div
            style={{
                backgroundColor: '#EFF6FF',
                border: '1.5px solid #BFDBFE',
                borderRadius: '0.875rem',
                padding: '0.75rem 0.875rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.625rem',
                boxShadow: '0 2px 6px rgba(37,99,235,0.06)'
            }}
        >
            <div
                onClick={() => navigate('/official-channel')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', flex: 1, minWidth: 0 }}
            >
                <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', backgroundColor: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1D4ED8', flexShrink: 0 }}>
                    <Megaphone size={16} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#1D4ED8', textTransform: 'uppercase' }}>
                            Official Broadcast
                        </span>
                    </div>
                    <p style={{ margin: '0.125rem 0 0', fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {pinnedAnnouncement.title}
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <button
                    onClick={() => navigate('/official-channel')}
                    style={{ padding: '0.3rem 0.5rem', borderRadius: '0.375rem', border: 'none', backgroundColor: '#2563EB', color: 'white', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                    Read
                </button>
                <button
                    onClick={() => setDismissed(true)}
                    style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '0.2rem' }}
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    )
}
