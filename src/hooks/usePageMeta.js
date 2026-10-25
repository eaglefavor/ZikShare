import { useEffect } from 'react'

const SITE_NAME = 'ZikShare'
const SITE_URL = 'https://zik-share.vercel.app'

function setMeta({ name, property, content }) {
    if (typeof document === 'undefined' || typeof content !== 'string') return
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
    let tag = document.head.querySelector(selector)
    if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(property ? 'property' : 'name', name)
        document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
}

function setLink(rel, href) {
    if (typeof document === 'undefined') return
    let link = document.head.querySelector(`link[rel="${rel}"]`)
    if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', rel)
        document.head.appendChild(link)
    }
    link.setAttribute('href', href)
}

/**
 * The browser tab, the share card and the canonical URL for one screen.
 *
 * Every page used to inherit the single title in index.html, so a link to a
 * play previewed as "Campus Marketplace" on WhatsApp. Each page now states its
 * own title, description and canonical address.
 *
 * `path` is the address of the page as a reader sees it (defaults to the
 * current location), and `type` is 'website', 'book' or 'article'.
 */
export default function usePageMeta({ title, description, path, type = 'website', image }) {
    useEffect(() => {
        if (typeof document === 'undefined') return

        const fullTitle = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} — Campus Marketplace`
        const url = `${SITE_URL}${path || window.location.pathname}`

        document.title = fullTitle
        setMeta({ property: true, name: 'og:title', content: fullTitle })
        setMeta({ property: true, name: 'og:type', content: type })
        setMeta({ property: true, name: 'og:url', content: url })
        setMeta({ name: 'twitter:title', content: fullTitle })
        setMeta({ name: 'twitter:url', content: url })
        setLink('canonical', url)

        if (description) {
            setMeta({ name: 'description', content: description })
            setMeta({ property: true, name: 'og:description', content: description })
            setMeta({ name: 'twitter:description', content: description })
        }

        if (image) {
            const absolute = image.startsWith('http') ? image : `${SITE_URL}${image}`
            setMeta({ property: true, name: 'og:image', content: absolute })
            setMeta({ name: 'twitter:image', content: absolute })
        }
    }, [title, description, path, type, image])
}
