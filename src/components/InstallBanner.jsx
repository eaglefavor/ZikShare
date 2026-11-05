import { useEffect, useState } from 'react'
import { Download, Share, X } from 'lucide-react'
import { dismissedRecently, isStandalone, rememberDismissal, useInstallPrompt } from '../hooks/useInstallPrompt'

/**
 * The invitation to keep ZikShare on the phone.
 *
 * Shown after the page has settled — never during the first paint, which is
 * where a weak connection needs every millisecond. On Android it uses the
 * browser's own install prompt; on an iPhone, which has none, it gives the two
 * taps the reader has to make instead.
 */
export default function InstallBanner() {
    const { canInstall, installed, ios, promptInstall } = useInstallPrompt()
    const [visible, setVisible] = useState(false)
    const [asked, setAsked] = useState(false)

    const offerable = (canInstall || ios) && !installed

    useEffect(() => {
        if (!offerable || dismissedRecently() || isStandalone()) return
        // Let the shelf render first.
        const timer = setTimeout(() => setVisible(true), 2500)
        return () => clearTimeout(timer)
    }, [offerable])

    if (!visible) return null

    const dismiss = () => {
        rememberDismissal()
        setVisible(false)
    }

    const install = async () => {
        const outcome = await promptInstall()
        setAsked(true)
        if (outcome === 'accepted' || outcome === 'unavailable') setVisible(false)
        else rememberDismissal()
    }

    return (
        <div className="zs-install" role="region" aria-label="Install ZikShare">
            <Download size={15} aria-hidden="true" />
            <span className="zs-install__text">
                {ios ? (
                    <>
                        Keep ZikShare on your phone: tap <Share size={12} aria-hidden="true" /> Share,
                        then <strong>Add to Home Screen</strong>. It opens with no data once the first
                        page has loaded.
                    </>
                ) : (
                    <>
                        Keep ZikShare on your phone. It opens with no data once a page has loaded, and
                        skips the browser address bar.
                    </>
                )}
            </span>
            {!ios && (
                <button type="button" className="zs-install__action" onClick={install} disabled={asked}>
                    {asked ? 'Asking…' : 'Add to home screen'}
                </button>
            )}
            <button type="button" className="zs-install__close" onClick={dismiss} aria-label="Not now">
                <X size={15} aria-hidden="true" />
            </button>
        </div>
    )
}
