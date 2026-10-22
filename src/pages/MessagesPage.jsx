import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Loader2, Shield, Check, Package, FileText, Search, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getConversations } from '../lib/messaging'
import { getUser, getAnnouncements } from '../lib/database'
import { getUnreadAnnouncementsCount } from '../lib/announcements'
import { getLastReadAt } from '../lib/readStatus'
import { Button, EmptyState, PageHeader } from '../components/ui'

function timeAgo(iso) {
    if (!iso) return 'Recent'
    const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
    if (seconds < 60) return 'now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h`
    const days = Math.floor(hours / 24)
    return `${days}d`
}

export default function MessagesPage() {
    const { session, user, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [conversations, setConversations] = useState([])
    const [otherUsers, setOtherUsers] = useState({})
    const [latestAnnouncement, setLatestAnnouncement] = useState(null)
    const [unreadAnnouncements, setUnreadAnnouncements] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)

    const currentUserId = session?.user?.id || user?.uid || user?.id

    useEffect(() => {
        async function fetchOfficialSnippet() {
            try {
                const list = await getAnnouncements({ limit: 5 })
                if (list && list.length > 0) {
                    setLatestAnnouncement(list[0])
                    setUnreadAnnouncements(getUnreadAnnouncementsCount(list))
                }
            } catch (err) {
                console.warn('Failed to fetch official announcements snippet:', err)
            }
        }
        fetchOfficialSnippet()
    }, [])

    useEffect(() => {
        if (!isAuthenticated || !currentUserId) {
            setLoading(false)
            return
        }

        let isMounted = true
        setLoading(true)

        const safetyTimer = setTimeout(() => {
            if (isMounted) setLoading(false)
        }, 3000)

        async function fetchConversations() {
            try {
                const convs = await getConversations(currentUserId)
                if (!isMounted) return
                setConversations(convs || [])
                setLoading(false)

                const otherIds = [...new Set((convs || []).map((c) => (c.buyerId === currentUserId ? c.sellerId : c.buyerId)).filter(Boolean))]
                const userEntries = await Promise.all(
                    otherIds.map(async (id) => {
                        try {
                            const u = await getUser(id)
                            return u ? [id, u] : null
                        } catch {
                            return null
                        }
                    })
                )
                if (!isMounted) return
                const userMap = {}
                userEntries.forEach((entry) => {
                    if (entry) userMap[entry[0]] = entry[1]
                })
                setOtherUsers(userMap)
            } catch (err) {
                console.warn('Failed to load conversations:', err)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchConversations()

        return () => {
            isMounted = false
            clearTimeout(safetyTimer)
        }
    }, [isAuthenticated, currentUserId])

    const filteredConversations = useMemo(() => {
        if (!searchQuery.trim()) return conversations
        const q = searchQuery.toLowerCase().trim()
        return conversations.filter((conv) => {
            const otherId = conv.buyerId === currentUserId ? conv.sellerId : conv.buyerId
            const other = otherUsers[otherId]
            const name = (other?.displayName || '').toLowerCase()
            const itemTitle = (conv.item?.title || conv.listings?.title || '').toLowerCase()
            const lastMsg = (conv.lastMessage || '').toLowerCase()
            return name.includes(q) || itemTitle.includes(q) || lastMsg.includes(q)
        })
    }, [conversations, searchQuery, currentUserId, otherUsers])

    return (
        <div className="zs-container">
            <PageHeader
                eyebrow="Inbox"
                title="Messages"
                lead="Conversations about listings and study material. Nothing here is a substitute for meeting in a public place on campus."
            />

            <button
                type="button"
                className="zs-panel"
                onClick={() => navigate('/official-channel')}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    textAlign: 'left',
                    font: 'inherit',
                    cursor: 'pointer',
                    marginBottom: '1rem',
                }}
            >
                <span
                    style={{
                        position: 'relative',
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '9999px',
                        background: 'var(--color-brand)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    <Shield size={18} aria-hidden="true" />
                    <span
                        aria-hidden="true"
                        style={{
                            position: 'absolute',
                            bottom: '-1px',
                            right: '-1px',
                            width: '0.9rem',
                            height: '0.9rem',
                            borderRadius: '9999px',
                            background: 'var(--color-campus-green)',
                            border: '2px solid white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Check size={8} strokeWidth={4} color="white" />
                    </span>
                </span>

                <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: 'var(--zs-fs-body)', fontWeight: 700 }}>ZikShare Official</span>
                        <span className="zs-tag zs-tag--muted">Channel</span>
                    </span>
                    <span
                        style={{
                            display: 'block',
                            marginTop: '0.1rem',
                            fontSize: 'var(--zs-fs-meta)',
                            color: 'var(--color-text-secondary)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {latestAnnouncement ? latestAnnouncement.title : 'Campus updates and announcements'}
                    </span>
                </span>

                {unreadAnnouncements > 0 && (
                    <span className="zs-tag zs-tag--pack">{unreadAnnouncements} new</span>
                )}
            </button>

            {!isAuthenticated ? (
                <EmptyState
                    icon={MessageCircle}
                    title="Sign in to see your messages"
                    action={
                        <Button size="sm" onClick={() => navigate('/login')}>
                            Sign in
                        </Button>
                    }
                >
                    Messages are only for students who are buying or selling. The library needs no account.
                </EmptyState>
            ) : loading ? (
                <div className="zs-panel" style={{ display: 'flex', justifyContent: 'center', padding: '2.5rem 0' }}>
                    <Loader2 size={24} className="animate-spin" color="var(--color-brand)" aria-label="Loading messages" />
                </div>
            ) : (
                <>
                    {conversations.length > 0 && (
                        <div className="zs-field" style={{ marginBottom: '0.85rem' }}>
                            <Search size={15} aria-hidden="true" color="var(--color-text-muted)" />
                            <input
                                type="search"
                                placeholder="Search by student, item or message"
                                aria-label="Search messages"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    aria-label="Clear search"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex' }}
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    )}

                    {filteredConversations.length === 0 ? (
                        <EmptyState
                            icon={MessageCircle}
                            title={searchQuery ? 'No conversations match that search' : 'No messages yet'}
                            action={
                                <Button size="sm" variant="outline" onClick={() => navigate('/search')}>
                                    Browse the marketplace
                                </Button>
                            }
                        >
                            {searchQuery
                                ? `No chats match “${searchQuery}”.`
                                : 'Message a student from any listing and the conversation will appear here.'}
                        </EmptyState>
                    ) : (
                        <div className="zs-panel zs-threads">
                            {filteredConversations.map((conv) => {
                                const otherId = conv.buyerId === currentUserId ? conv.sellerId : conv.buyerId
                                const other = otherUsers[otherId]
                                const otherName = other?.displayName || 'Campus user'
                                const item = conv.item || conv.listings || {}
                                const imageUrl = item.images?.[0]
                                const isDigital = item.isDigital || false

                                const lastRead = getLastReadAt(conv.id)
                                const isUnread = !lastRead || new Date(conv.lastMessageAt) > new Date(lastRead)

                                return (
                                    <button
                                        key={conv.id}
                                        type="button"
                                        onClick={() => navigate(`/chat/${conv.id}`)}
                                        className={`zs-thread${isUnread ? ' is-unread' : ''}`}
                                    >
                                        <span className="zs-thread__thumb">
                                            {imageUrl ? (
                                                <img src={imageUrl} alt="" loading="lazy" />
                                            ) : isDigital ? (
                                                <FileText size={18} aria-hidden="true" />
                                            ) : (
                                                <Package size={18} aria-hidden="true" />
                                            )}
                                        </span>

                                        <span className="zs-thread__body">
                                            <span className="zs-thread__top">
                                                <span className="zs-thread__name">{otherName}</span>
                                                <span className="zs-thread__time">{timeAgo(conv.lastMessageAt)}</span>
                                            </span>
                                            <span className="zs-thread__item">Re: {item.title || 'Campus item'}</span>
                                            <span className="zs-thread__preview">{conv.lastMessage || 'Start the conversation'}</span>
                                        </span>

                                        {isUnread && <span className="zs-thread__dot" aria-label="Unread" />}
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
