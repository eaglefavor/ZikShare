import { useState } from 'react'
import { Check, Download, Loader2 } from 'lucide-react'
import { isSavedOffline, offlineSupported, removeOffline, saveOffline } from '../lib/offlineLibrary'
import { useToast } from './Toast'

/**
 * "Keep this on the phone."
 *
 * On a campus connection the useful moment for a PDF is not the one where you
 * have bars — it is the queue an hour later. This caches the file itself and
 * says so afterwards, so the reader knows it will open with no data.
 */
export default function OfflineButton({ item, className = 'zs-btn zs-btn--outline' }) {
    const toast = useToast()
    const [saved, setSaved] = useState(() => isSavedOffline(item.slug))
    const [busy, setBusy] = useState(false)
    const supported = offlineSupported()

    if (!supported) return null

    const toggle = async () => {
        if (busy) return
        setBusy(true)
        if (saved) {
            await removeOffline(item.slug)
            setSaved(false)
            toast?.success?.('Removed from this device')
        } else {
            const result = await saveOffline({
                slug: item.slug,
                path: item.download_path,
                title: item.title,
                author: item.author,
                pages: item.page_count,
            })
            if (result.success) {
                setSaved(true)
                toast?.success?.('Saved on this device — it will open without data')
            } else {
                toast?.error?.(`Could not save it offline: ${result.error}`)
            }
        }
        setBusy(false)
    }

    return (
        <button type="button" className={className} onClick={toggle} disabled={busy}>
            {busy ? (
                <Loader2 size={15} className="animate-spin" />
            ) : saved ? (
                <Check size={15} />
            ) : (
                <Download size={15} />
            )}
            {busy ? 'Saving…' : saved ? 'Saved offline' : 'Save offline'}
        </button>
    )
}
