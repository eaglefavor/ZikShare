import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle, Mail, Shield } from 'lucide-react'

const faqs = [
    {
        question: 'How do I post an item for sale?',
        answer: 'Tap the "+" button in the bottom navigation bar, fill in the item details — title, price, category, condition, and optionally add photos — then tap "Post Item". Your listing will appear on the marketplace immediately.',
    },
    {
        question: 'How do I contact a seller?',
        answer: 'Open any listing and tap the "Contact Seller" button at the bottom. This will open WhatsApp with a pre-filled message so you can chat directly with the seller.',
    },
    {
        question: 'Is ZikShare free to use?',
        answer: 'Yes! ZikShare is completely free. There are no listing fees, no commission on sales, and no hidden charges.',
    },
    {
        question: 'How do I get the verified badge?',
        answer: 'Sign up or sign in with your @unizik.edu.ng email address. Your account will automatically receive a verified student badge, which helps build trust with buyers and sellers.',
    },
    {
        question: 'Where should I meet to exchange items?',
        answer: 'For your safety, always meet at designated Safe Meetup Zones: Garba Square, Chisco Park, or the Student Center. Avoid meeting in secluded areas.',
    },
    {
        question: 'How do I mark my item as sold?',
        answer: 'Go to Profile → My Listings, tap the three-dot menu on the item you sold, and select "Mark as Sold". The item will be hidden from the marketplace.',
    },
    {
        question: 'Can I edit my listing after posting?',
        answer: 'Currently, you can mark items as sold or delete them. Full editing is coming soon in a future update!',
    },
]

export default function HelpPage() {
    const navigate = useNavigate()
    const [openIndex, setOpenIndex] = useState(null)

    return (
        <div>
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}><ArrowLeft size={20} /></button>
                <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Help & Support</h1>
            </header>

            <div style={{ padding: '1rem' }}>
                {/* FAQ Section */}
                <h2 style={{ margin: '0 0 0.75rem', fontSize: '0.9375rem', fontWeight: 700 }}>Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {faqs.map((faq, index) => (
                        <div key={index} style={{ borderRadius: '0.75rem', border: '1px solid var(--color-border)', overflow: 'hidden', backgroundColor: 'white' }}>
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1rem',
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    fontFamily: 'inherit',
                                    fontSize: '0.8125rem',
                                    fontWeight: 600,
                                    color: 'var(--color-text-primary)',
                                    textAlign: 'left',
                                }}
                            >
                                {faq.question}
                                {openIndex === index ? <ChevronUp size={16} color="var(--color-text-muted)" /> : <ChevronDown size={16} color="var(--color-text-muted)" />}
                            </button>
                            {openIndex === index && (
                                <div style={{ padding: '0 1rem 0.875rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <h2 style={{ margin: '0 0 0.75rem', fontSize: '0.9375rem', fontWeight: 700 }}>Contact Us</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <a
                        href="mailto:support@zikshare.com"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.875rem 1rem',
                            borderRadius: '0.75rem',
                            backgroundColor: 'white',
                            border: '1px solid var(--color-border)',
                            textDecoration: 'none',
                            color: 'var(--color-text-primary)',
                            transition: 'background-color 0.15s ease',
                        }}
                    >
                        <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Mail size={16} color="var(--color-brand)" />
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600 }}>Email Support</p>
                            <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>support@zikshare.com</p>
                        </div>
                    </a>
                    <a
                        href="https://wa.me/2348000000000?text=Hi%2C%20I%20need%20help%20with%20ZikShare"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.875rem 1rem',
                            borderRadius: '0.75rem',
                            backgroundColor: 'white',
                            border: '1px solid var(--color-border)',
                            textDecoration: 'none',
                            color: 'var(--color-text-primary)',
                            transition: 'background-color 0.15s ease',
                        }}
                    >
                        <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MessageCircle size={16} color="var(--color-campus-green)" />
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600 }}>WhatsApp Support</p>
                            <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>Chat with our team</p>
                        </div>
                    </a>
                </div>

                {/* Safety Tip */}
                <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '0.75rem', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                    <Shield size={18} color="#166534" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                    <div>
                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 700, color: '#166534' }}>Safety Reminder</p>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: '#166534', lineHeight: 1.4 }}>
                            Always meet at Safe Meetup Zones. Never share your password or bank details with anyone. Report suspicious activity to our support team.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
