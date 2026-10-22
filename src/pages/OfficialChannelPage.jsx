import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    Shield,
    CheckCheck,
    Sparkles,
    AlertTriangle,
    ShieldAlert,
    Pin,
    ExternalLink,
    RefreshCw,
    Megaphone,
    Wrench,
} from 'lucide-react'
import { getAnnouncements } from '../lib/database'
import { markAnnouncementsAsRead } from '../lib/announcements'
import supabase from '../lib/supabase'
import { PageHeader, EmptyState } from '../components/ui'

function formatDate(iso) {
    if (!iso) return 'Just now'
    return new Intl.DateTimeFormat('en-NG', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(iso))
}

const categoryConfig = {
    feature_update: { label: 'Feature update', color: 'var(--color-brand)', background: 'var(--color-brand-soft)', border: '#BFDBFE', icon: Sparkles },
    disciplinary_notice: { label: 'Disciplinary notice', color: 'var(--color-danger)', background: 'var(--color-danger-soft)', border: '#FECACA', icon: ShieldAlert },
    security_alert: { label: 'Safety and policy', color: '#B45309', background: '#FFFBEB', border: '#FDE68A', icon: AlertTriangle },
    marketplace_notice: { label: 'Marketplace', color: '#047857', background: 'var(--color-campus-green-soft)', border: '#A7F3D0', icon: Megaphone },
    maintenance: { label: 'Maintenance', color: '#6D28D9', background: '#F5F3FF', border: '#DDD6FE', icon: Wrench },
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
            markAnnouncementsAsRead((data || []).map((a) => a.id))
        } catch (err) {
            console.error('Failed to load official channel broadcasts:', err)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        fetchAnnouncements()

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
        <div className="zs-container">
            <button type="button" className="zs-link" onClick={() => navigate('/messages')}>
                <ArrowLeft size={15} /> Back to messages
            </button>

            <PageHeader
                eyebrow="Official channel"
                title="ZikShare Official"
                lead="Announcements from the campus team: new features, marketplace policy and safety notices."
                actions={
                    <button
                        type="button"
                        className="zs-btn zs-btn--outline zs-btn--sm"
                        onClick={() => fetchAnnouncements(true)}
                        disabled={refreshing}
                    >
                        <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                        {refreshing ? 'Refreshing…' : 'Refresh'}
                    </button>
                }
            />

            <div className="zs-panel" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Shield size={17} color="var(--color-brand)" aria-hidden="true" />
                <p style={{ margin: 0, fontSize: 'var(--zs-fs-meta)', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>
                    This channel is read-only. Every message here is published by the ZikShare team.
                </p>
            </div>

            {loading ? (
                <div className="zs-panel" style={{ display: 'flex', justifyContent: 'center', padding: '2.5rem 0' }}>
                    <RefreshCw size={22} className="animate-spin" color="var(--color-brand)" aria-label="Loading announcements" />
                </div>
            ) : announcements.length === 0 ? (
                <EmptyState icon={Megaphone} title="No announcements yet">
                    Updates from the campus team will appear here.
                </EmptyState>
            ) : (
                <div style={{ display: 'grid', gap: '0.75rem', maxWidth: '42rem' }}>
                    {announcements.map((item) => {
                        const cfg = categoryConfig[item.category] || categoryConfig.feature_update
                        const CategoryIcon = cfg.icon

                        return (
                            <article key={item.id} className="zs-panel">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.3rem',
                                            padding: '0.15rem 0.5rem',
                                            borderRadius: '9999px',
                                            background: cfg.background,
                                            border: `1px solid ${cfg.border}`,
                                            color: cfg.color,
                                            fontSize: 'var(--zs-fs-meta)',
                                            fontWeight: 700,
                                        }}
                                    >
                                        <CategoryIcon size={11} aria-hidden="true" />
                                        {cfg.label}
                                    </span>

                                    <span style={{ display: 'inline-flex', gap: '0.35rem' }}>
                                        {item.is_pinned && (
                                            <span className="zs-tag zs-tag--pack">
                                                <Pin size={10} aria-hidden="true" /> Pinned
                                            </span>
                                        )}
                                        {item.priority === 'urgent_popup' && (
                                            <span className="zs-tag" style={{ background: 'var(--color-danger-soft)', color: 'var(--color-danger)' }}>
                                                Urgent
                                            </span>
                                        )}
                                    </span>
                                </div>

                                <h2 style={{ margin: '0 0 0.35rem', fontSize: 'var(--zs-fs-card)', fontWeight: 700, lineHeight: 1.35 }}>
                                    {item.title}
                                </h2>

                                <p style={{ margin: 0, fontSize: 'var(--zs-fs-body)', lineHeight: 1.6, color: 'var(--color-text-secondary)', whiteSpace: 'pre-line' }}>
                                    {item.content}
                                </p>

                                {item.action_url && (
                                    <button
                                        type="button"
                                        className="zs-btn zs-btn--outline zs-btn--sm"
                                        onClick={() => navigate(item.action_url)}
                                        style={{ marginTop: '0.75rem' }}
                                    >
                                        {item.action_label || 'View details'} <ExternalLink size={12} />
                                    </button>
                                )}

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem', marginTop: '0.7rem' }}>
                                    <span style={{ fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                        {formatDate(item.created_at)}
                                    </span>
                                    <CheckCheck size={13} color="var(--color-brand)" aria-label="Published by ZikShare" />
                                </div>
                            </article>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
