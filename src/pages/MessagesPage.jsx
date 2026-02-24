import { MessageCircle, ArrowRight } from 'lucide-react'

export default function MessagesPage() {
    return (
        <div>
            <header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 40,
                    backgroundColor: 'white',
                    borderBottom: '1px solid var(--color-border)',
                    padding: '1rem',
                }}
            >
                <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Messages</h1>
            </header>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4rem 2rem',
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        width: '5rem',
                        height: '5rem',
                        borderRadius: '9999px',
                        background: 'linear-gradient(135deg, #DBEAFE, #93C5FD)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.25rem',
                    }}
                >
                    <MessageCircle size={32} color="#3B82F6" />
                </div>
                <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    WhatsApp Bridge
                </h2>
                <p
                    style={{
                        margin: '0.5rem 0 0',
                        fontSize: '0.8125rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.5,
                        maxWidth: '18rem',
                    }}
                >
                    ZikShare connects you directly with sellers via WhatsApp for faster, easier communication.
                </p>
                <div
                    style={{
                        marginTop: '1.5rem',
                        padding: '0.75rem 1.25rem',
                        borderRadius: '0.75rem',
                        backgroundColor: '#F0FDF4',
                        border: '1px solid #BBF7D0',
                        fontSize: '0.75rem',
                        color: 'var(--color-campus-green)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                    }}
                >
                    Tap "Contact Seller" on any listing
                    <ArrowRight size={14} />
                </div>
            </div>
        </div>
    )
}
