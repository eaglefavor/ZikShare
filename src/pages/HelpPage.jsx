import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp, Megaphone, Shield, Mail, Flag, Search, MapPin, Handshake } from 'lucide-react'
import { PageHeader, SectionHeading } from '../components/ui'
import usePageMeta from '../hooks/usePageMeta'

const faqs = [
    {
        question: 'Do I need an account to read or download the library?',
        answer:
            'No. Every book in the library opens and downloads without signing in, paying or checking out. An account is only needed to post a listing, message another student, or track what you saved.',
    },
    {
        question: 'How do I find material for my course?',
        answer:
            'Open the library and pick a shelf, or type a course code, title or author into the search field. The library has nine shelves: GST and compulsory courses, money and career, the Greek, Roman, medieval, Renaissance and modern play shelves, Theatre Arts, and Christian books. Every count you see is taken from the shelf itself, so a shelf can never advertise a document that is not there.',
    },
    {
        question: 'Is anything in the library ever paid for?',
        answer:
            'No. Every document downloads with no account, no checkout and no payment step. The marketplace is separate: physical items listed by students have prices, and the library never does.',
    },
    {
        question: 'A listing looks like a scam. What do I do?',
        answer:
            'Open the listing and tap Report this listing at the bottom, choose the closest reason and send it. The team reads every report. Reporting is not automatic takedown: if money is involved, stop messaging the seller and do not send anything, and report the conversation too.',
    },
    {
        question: 'How do I post an item or study material?',
        answer:
            'Sign in with your UNIZIK email, tap Sell, choose whether you are listing a physical item or uploading a document, then give it a title and a price — that is all it needs. Category, condition, meetup spot and description sit under “More details” and are optional, though a photo is what makes a stranger trust the listing.',
    },
    {
        question: 'How do I contact a seller?',
        answer:
            'Open a listing and use Contact seller. That starts a conversation inside ZikShare — your phone number is not shared unless you have added one and choose to call.',
    },
    {
        question: 'Where should we meet to exchange an item?',
        answer:
            'Agree on a public part of campus — Garba Square, Chisco Park or the Student Center are the usual spots. Inspect the item before you pay, and never send money to someone before you have it in hand. In the chat, tap the key to arrange the meetup: the buyer gets a four-digit handshake PIN, and at handover the seller types it in so both sides have a record that the item changed hands. ZikShare never holds the money for a campus sale.',
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

const BUYING_STEPS = [
    {
        icon: Search,
        title: 'Find the item',
        body: 'Search or browse the marketplace. Every listing says what condition it is in, where it is, and who is selling it; a verified seller has signed up with a UNIZIK email.',
    },
    {
        icon: MapPin,
        title: 'Ask first',
        body: 'Tap Contact seller to start a conversation inside ZikShare. Ask about condition, price and a place to meet. Your phone number is never shared unless you choose to call.',
    },
    {
        icon: Shield,
        title: 'Inspect before money moves',
        body: 'Meet in public — Garba Square, Chisco Park, the Student Center — and look at the item before you pay anything. You pay the seller yourself; ZikShare does not hold or move money for a campus sale.',
    },
    {
        icon: Handshake,
        title: 'Confirm the handover',
        body: 'The buyer arranges the meetup in chat and gets a four-digit handshake PIN. At the exchange, the seller types that PIN in and the item is marked handed over on both sides.',
    },
]

export default function HelpPage() {
    const navigate = useNavigate()
    const [openIndex, setOpenIndex] = useState(null)

    usePageMeta({
        title: 'Help, safety and how buying works',
        description: 'How the free library works, how to buy safely on campus, and how to report a listing that is not what it claims.',
        path: '/profile/help',
    })

    return (
        <div className="zs-container">
            <PageHeader
                eyebrow="Support"
                title="Help and support"
                lead="Short answers to the questions students ask most. If something is broken, tell the team through the official channel."
            />

            <div style={{ maxWidth: '42rem' }}>
                <section>
                    <SectionHeading title="How buying works" description="Four steps, and none of them involves sending money to a stranger." />
                    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.5rem', counterReset: 'step' }}>
                        {BUYING_STEPS.map((step, index) => {
                            const Icon = step.icon
                            return (
                                <li key={step.title} className="zs-panel" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            flexShrink: 0,
                                            width: '1.9rem',
                                            height: '1.9rem',
                                            borderRadius: '9999px',
                                            backgroundColor: 'var(--color-brand-soft)',
                                            color: '#1D4ED8',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 800,
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        {index + 1}
                                    </span>
                                    <div style={{ flex: 1 }}>
                                        <strong style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: 'var(--zs-fs-small)' }}>
                                            <Icon size={14} color="var(--color-brand)" aria-hidden="true" /> {step.title}
                                        </strong>
                                        <p style={{ margin: '0.2rem 0 0', fontSize: 'var(--zs-fs-small)', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                                            {step.body}
                                        </p>
                                    </div>
                                </li>
                            )
                        })}
                    </ol>

                    <div
                        className="zs-panel"
                        style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}
                    >
                        <Flag size={16} color="#B91C1C" aria-hidden="true" />
                        <span style={{ flex: 1 }}>
                            <span style={{ display: 'block', fontSize: 'var(--zs-fs-small)', fontWeight: 600 }}>Something wrong with a listing?</span>
                            <span style={{ display: 'block', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-muted)' }}>
                                Open the listing and tap Report this listing at the bottom of the page.
                            </span>
                        </span>
                    </div>
                </section>

                <section style={{ marginTop: '1.75rem' }}>
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
                    <div className="zs-notice" style={{ borderColor: '#BBF7D0', background: 'var(--color-campus-green-soft)', color: 'var(--color-success-text)' }}>
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
