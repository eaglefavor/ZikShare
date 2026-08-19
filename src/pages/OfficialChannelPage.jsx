import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, CheckCheck, Sparkles, AlertTriangle, ShieldAlert, Pin, ExternalLink, RefreshCw, Megaphone, Wrench, Info, Check } from 'lucide-react'
import { getAnnouncements } from '../lib/database'
import supabase from '../lib/supabase'

function formatDate(iso) {
    if (!iso) return 'Just now'
    return new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
}

const categoryConfig = {
    feature_update: { label: 'Feature Update', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE', icon: Sparkles },
    disciplinary_notice: { label: 'Disciplinary Notice', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA', icon: ShieldAlert },
    security_alert: { label: 'Safety & Policy Alert', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', icon: AlertTriangle },
    marketplace_notice: { label: 'Marketplace Notice', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0', icon: Megaphone },
    maintenance: { label: 'System Maintenance', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE', icon: Wrench },
}

export function markAnnouncementsAsRead(announcementIds = []) {
    try {
        const existing = JSON.parse(localStorage.getItem('zikshare_read_announcements') || '[]')
        const combined = [...new Set([...existing, ...announcementIds])]
        localStorage.setItem('zikshare_read_announcements', JSON.stringify(combined))
    } catch {}
}

export function getUnreadAnnouncementsCount(announcements = []) {
    try {
        const readIds = JSON.parse(localStorage.getItem('zikshare_read_announcements') || '[]')
        return announcements.filter(a => a.is_active && !readIds.includes(a.id)).length
    } catch {
        return 0
    }
}

export default function OfficialChannelPage() {
    const navigate = useNavigate()
    const [announcements, setAnnouncements] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const fetchAnnouncements = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true)
        else setLoading(true)

        try {
            const data = await getAnnouncements({ limit: 50 })
            setAnnouncements(data)
            // Mark all as read when opening official channel
            markAnnouncementsAsRead((data || []).map(a => a.id))
        } catch (err) {
            console.error('Failed to load official channel broadcasts:', err)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        fetchAnnouncements()

        // Realtime subscription for instant broadcast updates!
        const channel = supabase
            .channel('public:announcements')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'announcements' }, () => {
                fetchAnnouncements(true)
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#EFEAE2', display: 'flex', flexDirection: 'column', paddingBottom: '4.5rem' }}>
            {/* ── WHATSAPP-STYLE APP BAR ── */}
            <header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 40,
                    backgroundColor: '#1E293B',
                    color: 'white',
                    padding: '0.625rem 0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.25rem'
                        }}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div style={{ position: 'relative', width: '2.375rem', height: '2.375rem', borderRadius: '9999px', backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                        <Shield size={18} />
                        <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '0.875rem', height: '0.875rem', borderRadius: '9999px', backgroundColor: '#10B981', border: '2px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={8} strokeWidth={4} color="white" />
                        </div>
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <h1 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                ZikShare Official
                            </h1>
                            <span style={{ fontSize: '0.5625rem', fontWeight: 800, backgroundColor: '#3B82F6', color: 'white', padding: '0.05rem 0.3rem', borderRadius: '0.25rem', textTransform: 'uppercase' }}>
                                Channel
                            </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.6875rem', color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Official Campus Updates & Announcements
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => fetchAnnouncements(true)}
                    disabled={refreshing}
                    style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '0.25rem' }}
                    title="Refresh Feed"
                >
                    <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                </button>
            </header>

            {/* ── BROADCAST MESSAGES STREAM ── */}
            <main style={{ flex: 1, maxWidth: '36rem', width: '100%', margin: '0 auto', padding: '1rem 0.875rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Official Channel Info Card */}
                <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '0.75rem', border: '1px solid #E2E8F0', padding: '0.75rem 1rem', textAlign: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4 }}>
                        🔒 <strong>Verified Channel:</strong> Messages from this official channel are sent directly by the ZikShare campus administration team to keep all UNIZIK students updated on new features, marketplace policies, and safety notices.
                    </p>
                </div>

                {loading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '30vh', gap: '0.5rem' }}>
                        <RefreshCw size={24} className="animate-spin" color="#2563EB" />
                        <p style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Loading announcements...</p>
                    </div>
                ) : announcements.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem 1rem', backgroundColor: 'white', borderRadius: '0.875rem', border: '1px solid #E2E8F0' }}>
                        <Megaphone size={32} color="#94A3B8" style={{ margin: '0 auto 0.5rem' }} />
                        <h3 style={{ margin: '0 0 0.25rem', fontSize: '0.9375rem', fontWeight: 800, color: '#1E293B' }}>No Announcements Yet</h3>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>Stay tuned for official updates from the campus team.</p>
                    </div>
                ) : (
                    announcements.map(item => {
                        const cfg = categoryConfig[item.category] || categoryConfig.feature_update
                        const CategoryIcon = cfg.icon

                        return (
                            <div
                                key={item.id}
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '0.875rem',
                                    padding: '1rem',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                                    border: item.is_pinned ? '1.5px solid #3B82F6' : '1px solid #E2E8F0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.625rem',
                                    position: 'relative'
                                }}
                            >
                                {/* Header: Category badge + Pinned / Urgent indicator */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.375rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, fontSize: '0.6875rem', fontWeight: 800 }}>
                                        <CategoryIcon size={12} />
                                        <span>{cfg.label}</span>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                        {item.is_pinned && (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.625rem', fontWeight: 800, color: '#2563EB', backgroundColor: '#EFF6FF', padding: '0.15rem 0.35rem', borderRadius: '0.25rem' }}>
                                                <Pin size={10} />
                                                PINNED
                                            </span>
                                        )}
                                        {item.priority === 'urgent_popup' && (
                                            <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#DC2626', backgroundColor: '#FEF2F2', padding: '0.15rem 0.35rem', borderRadius: '0.25rem' }}>
                                                URGENT
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.3 }}>
                                    {item.title}
                                </h3>

                                {/* Message Content */}
                                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#334155', lineHeight: 1.45, whiteSpace: 'pre-line' }}>
                                    {item.content}
                                </p>

                                {/* Optional CTA Action Button */}
                                {item.action_url && (
                                    <button
                                        onClick={() => navigate(item.action_url)}
                                        style={{
                                            marginTop: '0.25rem',
                                            padding: '0.625rem 0.875rem',
                                            borderRadius: '0.625rem',
                                            border: 'none',
                                            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                                            color: 'white',
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.375rem',
                                            boxShadow: '0 2px 6px rgba(37,99,235,0.25)'
                                        }}
                                    >
                                        <span>{item.action_label || 'View Details'}</span>
                                        <ExternalLink size={12} />
                                    </button>
                                )}

                                {/* Footer: Timestamp + Verified double check */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.375rem', marginTop: '0.125rem' }}>
                                    <span style={{ fontSize: '0.625rem', color: '#94A3B8' }}>
                                        {formatDate(item.created_at)}
                                    </span>
                                    <CheckCheck size={14} color="#3B82F6" />
                                </div>
                            </div>
                        )
                    })
                )}
            </main>
        </div>
    )
}
