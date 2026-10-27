import { useEffect, useState } from 'react'

/**
 * Whether the phone thinks it is online.
 *
 * A student in a queue with no bars should be told that the app knows, instead
 * of watching spinners and reading empty marketplaces. `navigator.onLine` is not
 * a guarantee — a captive portal reports online — so this only drives a notice,
 * never a decision about whether to fetch.
 */
export default function useOnline() {
    const [online, setOnline] = useState(() =>
        typeof navigator === 'undefined' ? true : navigator.onLine !== false
    )

    useEffect(() => {
        const goOnline = () => setOnline(true)
        const goOffline = () => setOnline(false)
        window.addEventListener('online', goOnline)
        window.addEventListener('offline', goOffline)
        return () => {
            window.removeEventListener('online', goOnline)
            window.removeEventListener('offline', goOffline)
        }
    }, [])

    return online
}
