import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp, Megaphone, Shield, Mail } from 'lucide-react'
import { PageHeader, SectionHeading } from '../components/ui'

const faqs = [
    {
        question: 'Do I need an account to read or download the library?',
        answer:
            'No. Every book in the library opens and downloads without signing in, paying or checking out. An account is only needed to post a listing, message another student, or track what you saved.',
    },
    {
        question: 'How do I find material for my course?',
        answer:
            'Search by title or by author (for example Watchman Nee). The library is organised into shelves, and only shelves that hold documents are shown — right now that is the Christian Books shelf. Every card shows the page count before you open it, and the count on the library page is taken from the shelf itself, so it is never out of date.',
    },
    {
        question: 'How do I post an item or study material?',
        answer:
            'Sign in with your UNIZIK email, tap Sell, choose whether you are listing a physical item or uploading a document, then fill in the title, price, category and description. Photos are optional but listings with a photo are easier to trust.',
    },
    {
        question: 'How do I contact a seller?',
        answer:
            'Open a listing and use Contact seller. That starts a conversation inside ZikShare — your phone number is not shared unless you have added one and choose to call.',
    },
    {
        question: 'Where should we meet to exchange an item?',
        answer:
            'Agree on a public part of campus — Garba Square, Chisco Park or the Student Center are the usual spots. Inspect a physical item before paying, and never send money to someone before you have the item in hand.',
    },
    {
        question: 'Can I change or remove a listing?',
        answer:
            'Yes. Open Seller hub from your account to edit a listing, mark it sold, boost it, or delete it. Marking something sold hides it from the marketplace without losing your records.',
    },
    {
        question: 'How do payouts work?',
        answer:
            'Add your bank account under Seller hub → Payouts and verify it. Money from a sale settles to that account, and you can withdraw the available balance yourself. Paystack’s processing fee is added on top of the price, so the seller receives the amount they listed.',
    },
]

export default function HelpPage() {
    const navigate = useNavigate()
    const [openIndex, setOpenIndex] = useState(null)

    return (
        <div className="zs-container">
            <PageHeader
                eyebrow="Support"
                title="Help and support"
                lead="Short answers to the questions students ask most. If something is broken, tell the team through the official channel."
            />

            <div style={{ maxWidth: '42rem' }}>
                <section>
                    <SectionHeading title="Common questions" />
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index
                            return (
                                <div key={faq.question} className="zs-panel" style={{ padding: 0, overflow: 'hidden' }}>
                                    <button
                                        type="button"
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        aria-expanded={isOpen}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '0.5rem',
                                            padding: '0.8rem 0.9rem',
                                            background: 'none',
                                            border: 'none',
                                            font: 'inherit',
                                            fontSize: 'var(--zs-fs-body)',
                                            fontWeight: 600,
                                            color: 'var(--color-text-primary)',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {faq.question}
                                        {isOpen ? <ChevronUp size={16} color="var(--color-text-muted)" aria-hidden="true" /> : <ChevronDown size={16} color="var(--color-text-muted)" aria-hidden="true" />}
                                    </button>
                                    {isOpen && (
                                        <p style={{ margin: 0, padding: '0 0.9rem 0.9rem', fontSize: 'var(--zs-fs-small)', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                                            {faq.answer}
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section style={{ marginTop: '1.5rem' }}>
                    <SectionHeading title="Where to get help" />
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <button
                            type="button"
                            className="zs-panel"
                            onClick={() => navigate('/official-channel')}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textAlign: 'left', font: 'inherit', cursor: 'pointer', width: '100%' }}
                        >
                            <Megaphone size={17} color="var(--color-brand)" aria-hidden="true" />
                            <span style={{ flex: 1 }}>
                                <span style={{ display: 'block', fontSize: 'var(--zs-fs-small)', fontWeight: 600 }}>Official channel</span>
                                <span style={{ display: 'block', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                    Policy changes, outages and new features, announced by the team.
                                </span>
                            </span>
                        </button>

                        <a
                            href="mailto:admin@zikshare.com"
                            className="zs-panel"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none', color: 'inherit' }}
                        >
                            <Mail size={17} color="var(--color-brand)" aria-hidden="true" />
                            <span style={{ flex: 1 }}>
                                <span style={{ display: 'block', fontSize: 'var(--zs-fs-small)', fontWeight: 600 }}>Email the team</span>
                                <span style={{ display: 'block', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>admin@zikshare.com</span>
                            </span>
                        </a>
                    </div>
                </section>

                <section style={{ marginTop: '1.5rem' }}>
                    <div className="zs-notice" style={{ borderColor: '#BBF7D0', background: 'var(--color-campus-green-soft)', color: '#166534' }}>
                        <Shield size={16} style={{ flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true" />
                        <div>
                            <p style={{ margin: '0 0 0.2rem', fontSize: 'var(--zs-fs-small)', fontWeight: 700 }}>Keeping yourself safe</p>
                            <p style={{ margin: 0 }}>
                                Meet in public campus areas, inspect a physical item before paying, and never
                                share your password. ZikShare staff will never ask for your password or your PIN.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
