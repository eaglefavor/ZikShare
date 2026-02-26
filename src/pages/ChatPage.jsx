import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Send, Phone, Loader2, AlertTriangle, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getConversation, getMessages, sendMessage, subscribeToMessages } from '../lib/messaging'
import { getUser } from '../lib/database'

function timeLabel(iso) {
    const d = new Date(iso)
    return d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
}

function dateLabel(iso) {
    const d = new Date(iso)
    const today = new Date()
    if (d.toDateString() === today.toDateString()) return 'Today'
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
    return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })
}

const quickReplies = [
    'Is this still available?',
    'What\'s the last price?',
    'Can we meet today?',
    'Where on campus?',
]

export default function ChatPage() {
    const { conversationId } = useParams()
    const navigate = useNavigate()
    const { session, isAuthenticated } = useAuth()
    const myId = session?.user?.id

    const [conversation, setConversation] = useState(null)
    const [messages, setMessages] = useState([])
    const [otherUser, setOtherUser] = useState(null)
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [showCallSheet, setShowCallSheet] = useState(false)
    const messagesEndRef = useRef(null)

    // Load conversation + messages
    useEffect(() => {
        if (!conversationId || !myId) return
        let unsubscribe = null

        async function load() {
            try {
                const conv = await getConversation(conversationId)
                setConversation(conv)

                const msgs = await getMessages(conversationId)
                setMessages(msgs)

                // Load the other user's profile
                const otherId = conv.buyerId === myId ? conv.sellerId : conv.buyerId
                const other = await getUser(otherId)
                setOtherUser(other)
            } catch (err) {
                console.error('Failed to load chat:', err)
            } finally {
                setLoading(false)
            }

            // Subscribe to real-time messages
            unsubscribe = subscribeToMessages(conversationId, (newMsg) => {
                setMessages(prev => {
                    // Avoid duplicates
                    if (prev.some(m => m.id === newMsg.id)) return prev
                    return [...prev, newMsg]
                })
            })
        }

        load()
        return () => { if (unsubscribe) unsubscribe() }
    }, [conversationId, myId])

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = async (messageText) => {
        const msg = (messageText || text).trim()
        if (!msg || sending) return
        setSending(true)
        setText('')
        try {
            await sendMessage(conversationId, myId, msg)
        } catch (err) {
            console.error('Send failed:', err)
            setText(msg) // Restore on failure
        } finally {
            setSending(false)
        }
    }

    if (!isAuthenticated) {
        return (
            <div>
                <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}><ArrowLeft size={20} /></button>
                    <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Chat</h1>
                </header>
                <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '2rem' }}>🔒</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Sign in to chat</p>
                    <button onClick={() => navigate('/login')} style={{ marginTop: '1rem', padding: '0.75rem 2rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.875rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer' }}>Sign In</button>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <Loader2 size={28} color="var(--color-brand)" style={{ animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        )
    }

    const listing = conversation?.listings || {}
    const otherName = otherUser?.displayName || 'User'
    const otherPhone = otherUser?.phoneNumber || ''

    // Group messages by date
    let lastDate = ''

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F0F2F5' }}>
            {/* Header */}
            <header style={{ flexShrink: 0, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.625rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 40 }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}>
                    <ArrowLeft size={20} />
                </button>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.875rem', fontWeight: 700, flexShrink: 0 }}>
                    {otherName.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{otherName}</p>
                    {listing.title && (
                        <p style={{ margin: 0, fontSize: '0.625rem', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            Re: {listing.title}
                        </p>
                    )}
                </div>
                <button onClick={() => setShowCallSheet(true)} style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', border: '1px solid var(--color-border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Phone size={16} color="var(--color-campus-green)" />
                </button>
            </header>

            {/* Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem' }}>
                {/* Safety Banner */}
                <div style={{ margin: '0 0 0.75rem', padding: '0.625rem 0.75rem', borderRadius: '0.625rem', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertTriangle size={14} color="#92400E" style={{ flexShrink: 0 }} />
                    <p style={{ margin: 0, fontSize: '0.625rem', color: '#92400E', lineHeight: 1.3 }}>
                        <strong>Safety:</strong> Never pay in advance! Meet at campus Safe Meetup Zones only.
                    </p>
                </div>

                {/* Messages */}
                {messages.map((msg) => {
                    const isMe = msg.senderId === myId
                    const msgDate = dateLabel(msg.createdAt)
                    let showDateHeader = false
                    if (msgDate !== lastDate) {
                        lastDate = msgDate
                        showDateHeader = true
                    }

                    return (
                        <div key={msg.id}>
                            {showDateHeader && (
                                <div style={{ textAlign: 'center', margin: '0.75rem 0', fontSize: '0.625rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                                    {msgDate}
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', marginBottom: '0.375rem' }}>
                                <div style={{
                                    maxWidth: '75%',
                                    padding: '0.5rem 0.75rem',
                                    borderRadius: isMe ? '0.75rem 0.75rem 0.125rem 0.75rem' : '0.75rem 0.75rem 0.75rem 0.125rem',
                                    backgroundColor: isMe ? 'var(--color-brand)' : 'white',
                                    color: isMe ? 'white' : 'var(--color-text-primary)',
                                    fontSize: '0.8125rem',
                                    lineHeight: 1.4,
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                                }}>
                                    <p style={{ margin: 0, wordBreak: 'break-word' }}>{msg.text}</p>
                                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.5625rem', opacity: 0.7, textAlign: 'right' }}>
                                        {timeLabel(msg.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies (only if no messages yet) */}
            {messages.length === 0 && (
                <div style={{ flexShrink: 0, padding: '0.5rem 1rem', display: 'flex', gap: '0.375rem', overflowX: 'auto', backgroundColor: 'white', borderTop: '1px solid var(--color-border)' }} className="hide-scrollbar">
                    {quickReplies.map((qr, i) => (
                        <button key={i} onClick={() => handleSend(qr)} style={{ padding: '0.375rem 0.75rem', borderRadius: '9999px', border: '1px solid var(--color-brand)', backgroundColor: 'white', fontSize: '0.6875rem', fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', color: 'var(--color-brand)', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
                            {qr}
                        </button>
                    ))}
                </div>
            )}

            {/* Input Bar */}
            <div style={{ flexShrink: 0, padding: '0.5rem 1rem', backgroundColor: 'white', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}>
                <input
                    type="text"
                    placeholder="Write your message..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                    style={{ flex: 1, padding: '0.625rem 0.875rem', borderRadius: '1.25rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', backgroundColor: '#F0F2F5', transition: 'border-color 0.2s' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--color-brand)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                />
                <button
                    onClick={() => handleSend()}
                    disabled={!text.trim() || sending}
                    style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '9999px',
                        border: 'none',
                        backgroundColor: text.trim() ? 'var(--color-brand)' : '#E2E8F0',
                        color: text.trim() ? 'white' : '#94A3B8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: text.trim() ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s',
                        flexShrink: 0,
                    }}
                >
                    <Send size={16} />
                </button>
            </div>

            {/* Call Bottom Sheet */}
            {showCallSheet && (
                <>
                    <div onClick={() => setShowCallSheet(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }} />
                    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 101, backgroundColor: 'white', borderRadius: '1rem 1rem 0 0', padding: '1.25rem 1rem', paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))', animation: 'slideUp 0.25s ease-out' }}>
                        <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.875rem', fontWeight: 700 }}>
                                    {otherName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700 }}>{otherName}</p>
                                    {otherUser?.department && <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{otherUser.department}</p>}
                                </div>
                            </div>
                            <button onClick={() => setShowCallSheet(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex' }}>
                                <X size={20} color="var(--color-text-muted)" />
                            </button>
                        </div>

                        {otherPhone ? (
                            <div style={{ padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div>
                                    <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.02em' }}>{otherPhone}</p>
                                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>Charged at your operator's rate</p>
                                </div>
                                <a href={`tel:${otherPhone}`} style={{ padding: '0.625rem 1.25rem', borderRadius: '0.625rem', border: '2px solid var(--color-campus-green)', backgroundColor: 'transparent', color: 'var(--color-campus-green)', fontSize: '0.8125rem', fontWeight: 700, fontFamily: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Phone size={16} />
                                    Mobile call
                                </a>
                            </div>
                        ) : (
                            <div style={{ padding: '1rem', borderRadius: '0.75rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', textAlign: 'center', marginBottom: '1rem' }}>
                                <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600, color: '#DC2626' }}>Phone number not available</p>
                                <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: '#DC2626' }}>The seller hasn't added their phone number yet. Use the chat to communicate.</p>
                            </div>
                        )}

                        <div style={{ padding: '0.75rem', borderRadius: '0.625rem', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D' }}>
                            <p style={{ margin: 0, fontSize: '0.625rem', color: '#92400E', lineHeight: 1.4 }}>
                                <strong>❗ Never pay in advance!</strong> Even for delivery.<br />
                                <strong>✅ Inform the seller</strong> you got their number on ZikShare so they know where you came from.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
