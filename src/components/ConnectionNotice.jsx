import { RefreshCw, WifiOff } from 'lucide-react'

/**
 * "We could not load this" — said plainly, with a way to try again.
 *
 * On a weak connection a request can time out, and the screen used to answer
 * that with an empty list: "Nothing listed yet", as though the marketplace had
 * been checked and found empty. That is a statement about the world made on the
 * strength of a dropped packet. This says what actually happened.
 */
export default function ConnectionNotice({
    what = 'this page',
    onRetry,
    retrying = false,
    compact = false,
}) {
    return (
        <div className="zs-connnotice" role="status" aria-live="polite">
            <span className="zs-connnotice__icon" aria-hidden="true">
                <WifiOff size={compact ? 15 : 18} />
            </span>
            <div className="zs-connnotice__body">
                <strong>Could not reach ZikShare</strong>
                <p>
                    Your connection dropped while loading {what}. Nothing is lost — try again when you
                    have a bar or two.
                </p>
            </div>
            {onRetry && (
                <button type="button" className="zs-btn zs-btn--outline zs-btn--sm" onClick={onRetry} disabled={retrying}>
                    <RefreshCw size={14} className={retrying ? 'animate-spin' : undefined} />
                    {retrying ? 'Trying…' : 'Try again'}
                </button>
            )}
        </div>
    )
}
