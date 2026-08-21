import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Send, Phone, Loader2, AlertTriangle, X, Image as ImageIcon, Check, CheckCheck, ExternalLink, ShieldCheck, MapPin, Sparkles } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getConversation, getMessages, sendMessage, subscribeToMessages, uploadChatAttachment } from '../lib/messaging'
import { getUser } from '../lib/database'
import { markConversationRead } from '../lib/readStatus'
import { useToast } from '../components/Toast'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount || 0)
}

function timeLabel(iso) {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
}

function dateLabel(iso) {
    if (!iso) return 'Today'
    const d = new Date(iso)
    const today = new Date()
    if (d.toDateString() === today.toDateString()) return 'Today'
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
    return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })
}

const campusQuickReplies = [
    'Is this still available?',
    'Can we meet at Garba Square?',
    'Can we meet at Chisco Park?',
    'Meet at Student Center?',
    'What\'s your best price?',
    'I\'m on campus right now',
]

export default function ChatPage() {
    const { conversationId } = useParams()
    const navigate = useNavigate()
    const toast = useToast()
    const { session, isAuthenticated } = useAuth()
    const myId = session?.user?.id

    const [conversation, setConversation] = useState(null)
    const [messages, setMessages] = useState([])
    const [otherUser, setOtherUser] = useState(null)
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [selectedImageFile, setSelectedImageFile] = useState(null)
    const [showCallSheet, setShowCallSheet] = useState(false)
    const [showItemCard, setShowItemCard] = useState(true)

    const messagesEndRef = useRef(null)
    const fileInputRef = useRef(null)

    // Load conversation + messages
    useEffect(() => {
        if (!conversationId || !myId) return
        let unsubscribe = null
        let isMounted = true

        const safetyTimer = setTimeout(() => {
            if (isMounted) setLoading(false)
        }, 3000)

        async function load() {
            try {
                const conv = await getConversation(conversationId)
                if (!isMounted) return
                setConversation(conv)

                const msgs = await getMessages(conversationId)
                if (!isMounted) return
                setMessages(msgs || [])

                // Mark as read
                markConversationRead(conversationId)

                // Load the other user's profile
                if (conv) {
                    const otherId = conv.buyerId === myId ? conv.sellerId : conv.buyerId
                    if (otherId) {
                        const other = await getUser(otherId)
                        if (isMounted) setOtherUser(other)
                    }
                }
            } catch (err) {
                console.error('Failed to load chat:', err)
            } finally {
                if (isMounted) setLoading(false)
            }

            // Subscribe to real-time messages
            unsubscribe = subscribeToMessages(conversationId, (newMsg) => {
                if (!isMounted) return
                setMessages(prev => {
                    // If optimistic message with tempId exists, replace or deduplicate
                    const existingIdx = prev.findIndex(m => m.id === newMsg.id || (m.isOptimistic && m.text === newMsg.text && m.senderId === newMsg.senderId))
                    if (existingIdx !== -1) {
                        const copy = [...prev]
                        copy[existingIdx] = newMsg
                        return copy
                    }
                    return [...prev, newMsg]
                })
                markConversationRead(conversationId)
            })
        }

        load()
        return () => {
            isMounted = false
            clearTimeout(safetyTimer)
            if (unsubscribe) unsubscribe()
        }
    }, [conversationId, myId])

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, imagePreview])

    const handleSelectImage = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file (JPEG, PNG, WebP)')
            return
        }
        if (file.size > 10 * 1024 * 1024) {
            toast.error('Image is too large. Max 10MB.')
            return
        }

        setSelectedImageFile(file)
        const reader = new FileReader()
        reader.onload = () => setImagePreview(reader.result)
        reader.readAsDataURL(file)
    }

    const handleClearImage = () => {
        setImagePreview(null)
        setSelectedImageFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleSend = async (messageText) => {
        const msgContent = (messageText || text).trim()
        const hasImage = Boolean(selectedImageFile)
        if ((!msgContent && !hasImage) || sending) return

        const tempId = `temp-${Date.now()}`
        const optimisticMsg = {
            id: tempId,
            conversationId,
            senderId: myId,
            text: msgContent || (hasImage ? '📷 Uploading photo...' : ''),
            createdAt: new Date().toISOString(),
            isOptimistic: true,
            status: 'sending',
        }

        // 1. Optimistically append message to state immediately
        setMessages(prev => [...prev, optimisticMsg])
        setText('')
        setSending(true)

        let uploadedImageUrl = null

        try {
            // Upload image if attached
            if (selectedImageFile) {
                setUploadingImage(true)
                uploadedImageUrl = await uploadChatAttachment(selectedImageFile)
                handleClearImage()
            }

            const fullText = uploadedImageUrl 
                ? (msgContent ? `${msgContent}\n${uploadedImageUrl}` : uploadedImageUrl)
                : msgContent

            const realMsg = await sendMessage(conversationId, myId, fullText)

            // 2. Replace optimistic message with real message
            if (realMsg) {
                setMessages(prev => prev.map(m => m.id === tempId ? { ...realMsg, status: 'sent' } : m))
            }
        } catch (err) {
            console.error('Send failed:', err)
            toast.error('Message failed to send. Check network.')
            // Mark optimistic message as failed
            setMessages(prev => prev.map(m => m.id === tempId ? { ...m, status: 'failed' } : m))
            if (!hasImage) setText(msgContent) // Restore text on failure
        } finally {
            setSending(false)
            setUploadingImage(false)
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
                <Loader2 size={28} color="var(--color-brand)" className="animate-spin" />
            </div>
        )
    }

    const item = conversation?.item || conversation?.listings || {}
    const otherName = otherUser?.displayName || 'Campus User'
    const otherPhone = otherUser?.phoneNumber || ''
    const itemImage = item?.images?.[0] || null

    let lastDate = ''

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#F8FAFC', maxWidth: '42rem', margin: '0 auto', width: '100%' }}>
            {/* Header */}
            <header style={{ flexShrink: 0, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.625rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 40 }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}>
                    <ArrowLeft size={20} />
                </button>
                <div style={{ position: 'relative', width: '2.5rem', height: '2.5rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.875rem', fontWeight: 800, flexShrink: 0 }}>
                    {otherName.charAt(0).toUpperCase()}
                    {otherUser?.isVerified && (
                        <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', backgroundColor: '#10B981', borderRadius: '9999px', border: '2px solid white', width: '0.875rem', height: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={8} strokeWidth={4} color="white" />
                        </div>
                    )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#0F172A' }}>{otherName}</p>
                        {otherUser?.isVerified && (
                            <span style={{ fontSize: '0.5625rem', fontWeight: 800, backgroundColor: '#ECFDF5', color: '#059669', padding: '0.05rem 0.3rem', borderRadius: '0.25rem' }}>Verified</span>
                        )}
                    </div>
                    {otherUser?.department && (
                        <p style={{ margin: 0, fontSize: '0.625rem', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {otherUser.department}
                        </p>
                    )}
                </div>
                <button
                    onClick={() => setShowCallSheet(true)}
                    title="Call seller"
                    style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', border: '1px solid var(--color-border)', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#059669' }}
                >
                    <Phone size={16} />
                </button>
            </header>

            {/* Contextual Top Item Action Card */}
            {item?.title && showItemCard && (
                <div style={{ flexShrink: 0, backgroundColor: '#EFF6FF', borderBottom: '1px solid #BFDBFE', padding: '0.5rem 0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
                        <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', overflow: 'hidden', backgroundColor: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {itemImage ? (
                                <img src={itemImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ fontSize: '1.125rem' }}>{item.isDigital ? '📄' : '📦'}</span>
                            )}
                        </div>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                <span style={{ fontSize: '0.5625rem', fontWeight: 800, padding: '0.05rem 0.3rem', borderRadius: '0.2rem', backgroundColor: item.isDigital ? '#DBEAFE' : '#DCFCE7', color: item.isDigital ? '#1E40AF' : '#166534', textTransform: 'uppercase' }}>
                                    {item.category || (item.isDigital ? 'Study Material' : 'Physical')}
                                </span>
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB' }}>
                                    {formatNaira(item.price)}
                                </span>
                            </div>
                            <p style={{ margin: '0.125rem 0 0', fontSize: '0.75rem', fontWeight: 700, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {item.title}
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0 }}>
                        {item.id && (
                            <Link
                                to={`/item/${item.id}`}
                                style={{
                                    padding: '0.3rem 0.625rem',
                                    borderRadius: '0.5rem',
                                    backgroundColor: '#2563EB',
                                    color: 'white',
                                    fontSize: '0.6875rem',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}
                            >
                                <span>{item.isDigital ? 'Buy / View' : 'View Item'}</span>
                                <ExternalLink size={11} />
                            </Link>
                        )}
                        <button onClick={() => setShowItemCard(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: '#64748B' }}>
                            <X size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem' }}>
                {/* Safety Banner */}
                <div style={{ margin: '0 0 0.75rem', padding: '0.625rem 0.75rem', borderRadius: '0.625rem', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertTriangle size={14} color="#92400E" style={{ flexShrink: 0 }} />
                    <p style={{ margin: 0, fontSize: '0.625rem', color: '#92400E', lineHeight: 1.3 }}>
                        <strong>UNIZIK Safety Tip:</strong> Meet only at campus Safe Meetup Zones (Garba Square, Chisco Park, Student Center). Never pay before inspecting physical items!
                    </p>
                </div>

                {/* Messages Loop */}
                {messages.map((msg) => {
                    const isMe = msg.senderId === myId
                    const msgDate = dateLabel(msg.createdAt)
                    let showDateHeader = false
                    if (msgDate !== lastDate) {
                        lastDate = msgDate
                        showDateHeader = true
                    }

                    // Check if message has an image URL (e.g. cloudinary or data URL)
                    const lines = (msg.text || '').split('\n')
                    const imageUrlMatch = lines.find(l => l.startsWith('http') && (l.includes('cloudinary') || l.includes('image') || l.endsWith('.jpg') || l.endsWith('.png') || l.endsWith('.webp')))
                    const cleanText = lines.filter(l => l !== imageUrlMatch).join('\n')

                    return (
                        <div key={msg.id}>
                            {showDateHeader && (
                                <div style={{ textAlign: 'center', margin: '0.75rem 0', fontSize: '0.625rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                    {msgDate}
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', marginBottom: '0.5rem' }}>
                                <div style={{
                                    maxWidth: '80%',
                                    padding: '0.625rem 0.875rem',
                                    borderRadius: isMe ? '1rem 1rem 0.2rem 1rem' : '1rem 1rem 1rem 0.2rem',
                                    backgroundColor: isMe ? '#2563EB' : 'white',
                                    color: isMe ? 'white' : '#0F172A',
                                    fontSize: '0.8125rem',
                                    lineHeight: 1.45,
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                                    border: isMe ? 'none' : '1px solid var(--color-border)',
                                }}>
                                    {imageUrlMatch && (
                                        <div style={{ marginBottom: cleanText ? '0.5rem' : '0', borderRadius: '0.5rem', overflow: 'hidden', maxHeight: '14rem' }}>
                                            <img src={imageUrlMatch} alt="Chat attachment" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                    {cleanText && <p style={{ margin: 0, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{cleanText}</p>}
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem', marginTop: '0.25rem', fontSize: '0.5625rem', opacity: 0.8 }}>
                                        <span>{timeLabel(msg.createdAt)}</span>
                                        {isMe && (
                                            msg.status === 'sending' ? (
                                                <Loader2 size={10} className="animate-spin" />
                                            ) : msg.status === 'failed' ? (
                                                <span style={{ color: '#FCA5A5' }}>! Failed</span>
                                            ) : (
                                                <CheckCheck size={12} />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Response Chips */}
            <div style={{ flexShrink: 0, padding: '0.375rem 0.75rem', display: 'flex', gap: '0.375rem', overflowX: 'auto', backgroundColor: '#F8FAFC', borderTop: '1px solid var(--color-border)' }} className="hide-scrollbar">
                {campusQuickReplies.map((qr, i) => (
                    <button
                        key={i}
                        onClick={() => handleSend(qr)}
                        style={{
                            padding: '0.3rem 0.625rem',
                            borderRadius: '9999px',
                            border: '1px solid #BFDBFE',
                            backgroundColor: 'white',
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            fontFamily: 'inherit',
                            cursor: 'pointer',
                            color: '#1E40AF',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                        }}
                    >
                        {qr}
                    </button>
                ))}
            </div>

            {/* Image Preview Box before send */}
            {imagePreview && (
                <div style={{ flexShrink: 0, padding: '0.5rem 1rem', backgroundColor: '#FEF3C7', borderTop: '1px solid #FCD34D', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img src={imagePreview} alt="Preview" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.375rem', objectFit: 'cover' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#92400E' }}>Photo ready to send</span>
                    </div>
                    <button onClick={handleClearImage} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#92400E' }}>
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Input Bar */}
            <div style={{ flexShrink: 0, padding: '0.5rem 0.75rem', backgroundColor: 'white', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleSelectImage}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Attach photo"
                    disabled={uploadingImage}
                    style={{
                        width: '2.25rem',
                        height: '2.25rem',
                        borderRadius: '50%',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#F8FAFC',
                        color: '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                    }}
                >
                    <ImageIcon size={18} />
                </button>

                <input
                    type="text"
                    placeholder="Write a message..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                    style={{ flex: 1, padding: '0.625rem 0.875rem', borderRadius: '1.25rem', border: '1.5px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', backgroundColor: '#F8FAFC' }}
                    onFocus={e => (e.target.style.borderColor = '#2563EB')}
                    onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                />
                <button
                    onClick={() => handleSend()}
                    disabled={(!text.trim() && !selectedImageFile) || sending}
                    style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '9999px',
                        border: 'none',
                        background: (text.trim() || selectedImageFile) ? 'linear-gradient(135deg, #3B82F6, #2563EB)' : '#E2E8F0',
                        color: (text.trim() || selectedImageFile) ? 'white' : '#94A3B8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: (text.trim() || selectedImageFile) ? 'pointer' : 'not-allowed',
                        boxShadow: (text.trim() || selectedImageFile) ? '0 2px 8px rgba(37,99,235,0.35)' : 'none',
                        flexShrink: 0,
                    }}
                >
                    {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
            </div>

            {/* Call Bottom Sheet */}
            {showCallSheet && (
                <>
                    <div onClick={() => setShowCallSheet(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }} />
                    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 101, backgroundColor: 'white', borderRadius: '1.25rem 1.25rem 0 0', padding: '1.25rem 1rem', paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))', animation: 'slideUp 0.25s ease-out' }}>
                        <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.875rem', fontWeight: 800 }}>
                                    {otherName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: '#0F172A' }}>{otherName}</p>
                                    {otherUser?.department && <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{otherUser.department}</p>}
                                </div>
                            </div>
                            <button onClick={() => setShowCallSheet(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex' }}>
                                <X size={20} color="var(--color-text-muted)" />
                            </button>
                        </div>

                        {otherPhone ? (
                            <div style={{ padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', backgroundColor: '#F8FAFC' }}>
                                <div>
                                    <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '0.02em', color: '#0F172A' }}>{otherPhone}</p>
                                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>Direct phone contact</p>
                                </div>
                                <a href={`tel:${otherPhone}`} style={{ padding: '0.625rem 1.25rem', borderRadius: '0.625rem', backgroundColor: '#10B981', color: 'white', fontSize: '0.8125rem', fontWeight: 700, fontFamily: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 8px rgba(16,185,129,0.35)' }}>
                                    <Phone size={16} />
                                    <span>Call Phone</span>
                                </a>
                            </div>
                        ) : (
                            <div style={{ padding: '1rem', borderRadius: '0.75rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', textAlign: 'center', marginBottom: '1rem' }}>
                                <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 700, color: '#DC2626' }}>Phone number not added</p>
                                <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: '#B91C1C' }}>This student has not set a public phone number. Please use chat messages.</p>
                            </div>
                        )}

                        <div style={{ padding: '0.75rem', borderRadius: '0.625rem', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D' }}>
                            <p style={{ margin: 0, fontSize: '0.625rem', color: '#92400E', lineHeight: 1.4 }}>
                                <strong>⚠️ Campus Safety:</strong> Never pay before receiving physical goods. Always meet in public campus zones with friends nearby.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
