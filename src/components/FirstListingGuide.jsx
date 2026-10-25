import { useNavigate } from 'react-router-dom'
import { Camera, MapPin, Plus, Tag, TagIcon } from 'lucide-react'
import { Button } from './ui'

/**
 * What the marketplace looks like when nobody has posted yet.
 *
 * "Nothing listed yet" is honest but useless: it tells a first-time seller
 * nothing about what to write. This shows the shape of a listing that works,
 * labelled for what it is — an example, not an item anyone can buy — and gives
 * one button to post the real first one.
 */
export default function FirstListingGuide({ title = 'Nothing listed yet', compact = false }) {
    const navigate = useNavigate()

    return (
        <div className="zs-first-listing">
            <div className="zs-first-listing__copy">
                <strong>{title}</strong>
                <p>
                    The marketplace is new, so nothing has been posted on your campus yet. A listing
                    takes about a minute, and the first one is always the one everyone else replies to.
                </p>
                <ul className="zs-first-listing__tips">
                    <li>
                        <Camera size={13} aria-hidden="true" /> A real photo of the thing, not a shop
                        picture.
                    </li>
                    <li>
                        <Tag size={13} aria-hidden="true" /> The honest condition and a price in naira.
                    </li>
                    <li>
                        <MapPin size={13} aria-hidden="true" /> Where you can meet — Garba Square, Chisco
                        Park, the Student Center.
                    </li>
                </ul>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <Button size="sm" onClick={() => navigate('/post?type=physical')}>
                        <Plus size={15} /> Post the first item
                    </Button>
                    {!compact && (
                        <Button size="sm" variant="outline" onClick={() => navigate('/profile/help')}>
                            How buying works
                        </Button>
                    )}
                </div>
            </div>

            {/* An example, marked as one. Nothing here is for sale. */}
            <figure className="zs-first-listing__example" aria-label="Example of a listing, not a real item">
                <figcaption className="zs-first-listing__example-label">
                    Example of a listing — not a real item
                </figcaption>
                <div className="zs-first-listing__example-body">
                    <span className="zs-first-listing__thumb" aria-hidden="true">
                        <Camera size={18} />
                    </span>
                    <div>
                        <strong>Oxford standing fan</strong>
                        <span className="zs-first-listing__example-meta">
                            Used, works perfectly · ₦12,000
                        </span>
                        <span className="zs-first-listing__example-meta">
                            <TagIcon size={11} aria-hidden="true" /> Ifite · meet at Garba Square
                        </span>
                    </div>
                </div>
            </figure>
        </div>
    )
}
