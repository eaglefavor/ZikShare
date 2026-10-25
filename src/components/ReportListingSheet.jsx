import { useState } from 'react'
import { Flag, Send, X } from 'lucide-react'
import { REPORT_REASONS, reportListing } from '../lib/database'
import { useToast } from './Toast'
import { Button, Chip } from './ui'

/**
 * Reporting a listing used to be impossible: moderation lived only inside the
 * admin page, so a scam stayed up until an admin saw it. This sheet is the one
 * control that closes that hole — reachable from the item page, below the
 * seller card, where a reader who has just been asked for a transfer will be.
 */
export default function ReportListingSheet({ listing, reporterId = null, onClose }) {
    const toast = useToast()
    const [reason, setReason] = useState('')
    const [detail, setDetail] = useState('')
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)

    const submit = async (event) => {
        event.preventDefault()
        if (!reason || sending) return
        setSending(true)
        const result = await reportListing({
            listingId: listing.id,
            reporterId,
            reason,
            detail,
        })
        setSending(false)
        if (result.success) {
            setSent(true)
        } else {
            toast?.error?.(
                'The report could not be sent. If it is urgent, message the seller from this page or tell the team through the official channel.'
            )
        }
    }

    return (
        <div
            className="zs-sheet-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Report this listing"
            onClick={onClose}
        >
            <form className="zs-sheet" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
                <div className="zs-sheet__head">
                    <strong style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Flag size={15} /> Report this listing
                    </strong>
                    <button type="button" className="zs-icon-btn" onClick={onClose} aria-label="Close">
                        <X size={16} />
                    </button>
                </div>

                {sent ? (
                    <div className="zs-sheet__body">
                        <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.6 }}>
                            Thank you — the report is with the team. A listing is not taken down
                            automatically, so if money is involved, stop talking to the seller and do not
                            send anything.
                        </p>
                        <p style={{ margin: '0.5rem 0 0', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                            Reported: <strong>{listing.title}</strong>
                        </p>
                    </div>
                ) : (
                    <div className="zs-sheet__body">
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                            Reporting <strong>{listing.title}</strong>. Pick the closest reason; the team reads
                            every report. Your name is not shown to the seller.
                        </p>

                        <div className="zs-filter-group__chips" role="radiogroup" aria-label="Reason for the report">
                            {REPORT_REASONS.map((option) => (
                                <Chip
                                    key={option}
                                    active={reason === option}
                                    onClick={() => setReason(option)}
                                >
                                    {option}
                                </Chip>
                            ))}
                        </div>

                        <label style={{ display: 'grid', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 700 }}>
                            What happened? (optional)
                            <textarea
                                value={detail}
                                onChange={(e) => setDetail(e.target.value)}
                                rows={3}
                                maxLength={500}
                                placeholder="Anything that helps: what was promised, what was asked for, where you met."
                                style={{
                                    width: '100%',
                                    resize: 'vertical',
                                    padding: '0.6rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--color-border)',
                                    font: 'inherit',
                                    fontWeight: 400,
                                    fontSize: '0.82rem',
                                }}
                            />
                        </label>
                    </div>
                )}

                <div className="zs-sheet__foot">
                    {sent ? (
                        <Button block type="button" onClick={onClose}>
                            Close
                        </Button>
                    ) : (
                        <Button block type="submit" disabled={!reason || sending}>
                            <Send size={15} /> {sending ? 'Sending…' : 'Send report'}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}
