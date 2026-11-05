import { ImageOff, Image as ImageIcon } from 'lucide-react'
import { useDataSaver } from '../hooks/useDataSaver'

/**
 * The one line that explains why the pictures are missing.
 *
 * Hiding photographs without saying so would look like a broken page. This bar
 * appears only while pictures are off, says whether that was the reader's
 * choice or the connection's, and gives them the switch back.
 */
export default function LightModeBar() {
    const { saving, slowLink, choice, setChoice } = useDataSaver()

    if (!saving) return null

    return (
        <div className="zs-light-bar" role="status" aria-live="polite">
            <ImageOff size={14} aria-hidden="true" />
            <span>
                {choice === 'on'
                    ? 'Pictures are off, because you turned them off. Every title still opens.'
                    : slowLink
                      ? 'This connection looks slow, so pictures are off to save your data.'
                      : 'Pictures are off to save your data.'}
            </span>
            <button
                type="button"
                className="zs-light-bar__action"
                onClick={() => setChoice('off')}
                aria-label="Show pictures on this device"
            >
                <ImageIcon size={13} aria-hidden="true" /> Show pictures
            </button>
        </div>
    )
}
