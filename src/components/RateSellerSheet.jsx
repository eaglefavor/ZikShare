import { useState } from 'react'
import { Loader2, Star, X } from 'lucide-react'
import { createReview } from '../lib/database'
import { useToast } from './Toast'

const RATING_LABELS = {
    1: 'Bad',
    2: 'Poor',
    3: 'Fine',
    4: 'Good',
    5: 'Excellent',
}

/**
 * Rating the student you bought from.
 *
 * Only offered for something you actually bought — the review carries the order
 * it came from, so a five-star line on a seller's page means a real handover
 * happened, not that someone liked a photo.
 */
export default function RateSellerSheet({ open, onClose, order, sellerName, onSaved }) {
    const toast = useToast()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    if (!open) return null

    const sellerId = order?.seller_id || order?.seller?.id || order?.product?.seller_id
    const title = order?.product?.title || order?.item_title || 'this document'

    const submit = async (e) => {
        e.preventDefault()
        setError('')
        if (!rating) {
            setError('Choose a star rating first.')
            return
        }
        if (comment.trim().length < 4) {
            setError('Add a sentence so the next student knows what to expect.')
            return
        }
        setSaving(true)
        try {
            await createReview({
                sellerId,
                reviewerId: order?.buyer_id,
                listingId: order?.product_id,
                orderId: order?.id,
                itemTitle: title,
                rating,
                comment,
            })
            toast?.success?.(`Rating saved for ${sellerName || 'the seller'}`)
            setRating(0)
            setComment('')
            onSaved?.()
            onClose?.()
        } catch (err) {
            setError(err?.message || 'The rating could not be saved. Try again.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div
            className="zs-sheet-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={`Rate ${sellerName || 'the seller'}`}
            onClick={onClose}
        >
            <form className="zs-sheet" onSubmit={submit} onClick={(e) => e.stopPropagation()}>
                <div className="zs-sheet__head">
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: 'var(--zs-fs-card)' }}>
                        <Star size={16} color="var(--color-orange)" aria-hidden="true" />
                        Rate {sellerName || 'the seller'}
                    </strong>
                    <button type="button" className="zs-icon-btn" onClick={onClose} aria-label="Close">
                        <X size={16} />
                    </button>
                </div>

                <div className="zs-sheet__body">
                    <p style={{ margin: 0, fontSize: 'var(--zs-fs-small)', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>
                        You bought <strong>{title}</strong> from them. Your rating appears on their profile
                        and is marked as coming from a real purchase.
                    </p>

                    <fieldset className="zs-rate" style={{ border: 'none', margin: 0, padding: 0 }}>
                        <legend className="zs-label" style={{ padding: 0, marginBottom: '0.4rem' }}>
                            How did it go?
                        </legend>
                        <div className="zs-rate__stars" role="radiogroup" aria-label="Star rating">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    role="radio"
                                    aria-checked={rating === value}
                                    aria-label={`${value} of 5 — ${RATING_LABELS[value]}`}
                                    className={`zs-rate__star${rating >= value ? ' is-on' : ''}`}
                                    onClick={() => setRating(value)}
                                >
                                    <Star size={26} aria-hidden="true" />
                                </button>
                            ))}
                        </div>
                        <p className="zs-rate__label" aria-live="polite">
                            {rating ? RATING_LABELS[rating] : 'Tap a star'}
                        </p>
                    </fieldset>

                    <div>
                        <label className="zs-label" htmlFor="review-comment">
                            What should the next student know?
                        </label>
                        <textarea
                            id="review-comment"
                            className="zs-input"
                            rows={3}
                            maxLength={400}
                            placeholder="Answered my questions, met me at Garba Square on time, the PDF opened fine."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p role="alert" style={{ margin: 0, fontSize: 'var(--zs-fs-small)', fontWeight: 600, color: 'var(--color-danger)' }}>
                            {error}
                        </p>
                    )}
                </div>

                <div className="zs-sheet__foot">
                    <button type="button" className="zs-btn zs-btn--outline" onClick={onClose}>
                        Not now
                    </button>
                    <button type="submit" className="zs-btn zs-btn--primary zs-btn--block" disabled={saving}>
                        {saving ? <Loader2 size={15} className="animate-spin" /> : <Star size={15} />}
                        {saving ? 'Saving…' : 'Post rating'}
                    </button>
                </div>
            </form>
        </div>
    )
}
