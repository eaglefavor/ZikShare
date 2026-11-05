/**
 * Pictures cost more than text on a campus connection.
 *
 * These tests pin the rule: the browser's own judgement about the link is
 * obeyed, the reader's choice beats it, and nothing is hidden without a line
 * on screen explaining where it went.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import {
    DATA_SAVER_KEY,
    connectionIsSlow,
    readConnection,
    readDataSaverChoice,
    storeDataSaverChoice,
} from '../lib/dataSaver'
import { refreshConnectionState, setDataSaverChoice } from '../hooks/useDataSaver'
import LightModeBar from '../components/LightModeBar'

function setConnection(connection) {
    Object.defineProperty(navigator, 'connection', {
        value: connection,
        configurable: true,
        writable: true,
    })
}

beforeEach(() => {
    localStorage.clear()
    setConnection(undefined)
    setDataSaverChoice('auto')
})

afterEach(() => {
    setConnection(undefined)
})

describe('Reading the connection', () => {
    it('treats Data Saver as "do not send pictures"', () => {
        expect(connectionIsSlow({ saveData: true, effectiveType: '4g' })).toBe(true)
    })

    it('treats a 2G link as slow, and 3G and up as fast enough', () => {
        expect(connectionIsSlow({ effectiveType: '2g' })).toBe(true)
        expect(connectionIsSlow({ effectiveType: 'slow-2g' })).toBe(true)
        expect(connectionIsSlow({ effectiveType: '3g' })).toBe(false)
        expect(connectionIsSlow({ effectiveType: '4g' })).toBe(false)
    })

    it('says nothing when the browser does not report a connection', () => {
        expect(readConnection({})).toBeNull()
        expect(connectionIsSlow(null)).toBe(false)
    })

    it('remembers the reader\u2019s choice, and forgets it when they go back to auto', () => {
        storeDataSaverChoice('on')
        expect(localStorage.getItem(DATA_SAVER_KEY)).toBe('on')
        expect(readDataSaverChoice()).toBe('on')

        storeDataSaverChoice('auto')
        expect(localStorage.getItem(DATA_SAVER_KEY)).toBeNull()
        expect(readDataSaverChoice()).toBe('auto')
    })

    it('ignores anything but on, off or auto', () => {
        localStorage.setItem(DATA_SAVER_KEY, 'sometimes')
        expect(readDataSaverChoice()).toBe('auto')
    })
})

describe('What the reader sees when pictures are off', () => {
    it('says nothing at all while pictures are on', () => {
        setConnection({ effectiveType: '4g' })
        refreshConnectionState()
        const { container } = render(<LightModeBar />)
        expect(container).toBeEmptyDOMElement()
    })

    it('explains a slow link, and lets the reader overrule it', () => {
        setConnection({ effectiveType: '2g' })
        refreshConnectionState()

        render(<LightModeBar />)
        expect(screen.getByText(/connection looks slow/i)).toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', { name: /Show pictures/i }))
        expect(localStorage.getItem(DATA_SAVER_KEY)).toBe('off')
        expect(screen.queryByText(/connection looks slow/i)).not.toBeInTheDocument()
    })

    it('does not let a fast link undo a choice the reader made', () => {
        setDataSaverChoice('on')
        setConnection({ effectiveType: '4g' })
        act(() => refreshConnectionState())

        render(<LightModeBar />)
        expect(screen.getByText(/because you turned them off/i)).toBeInTheDocument()
    })

    it('marks the bar as a live status, so it is announced', () => {
        setDataSaverChoice('on')
        render(<LightModeBar />)
        expect(screen.getByRole('status')).toHaveTextContent(/Pictures are off/i)
    })
})

describe('The choice is shared, not per card', () => {
    it('reaches every subscriber when it changes', async () => {
        setDataSaverChoice('on')
        const { container } = render(<LightModeBar />)
        expect(container).not.toBeEmptyDOMElement()

        act(() => setDataSaverChoice('off'))
        expect(container).toBeEmptyDOMElement()
    })
})

describe('Library cards', () => {
    it('render as text when pictures are off', async () => {
        setDataSaverChoice('on')
        const { default: LibraryCard } = await import('../components/LibraryCard')
        render(
            <LibraryCard
                item={{
                    isBook: true,
                    slug: 'let-us-pray',
                    title: 'Let Us Pray',
                    author: 'Watchman Nee',
                    description: 'A book about prayer.',
                    cover_path: '/library/books/let-us-pray-cover.jpg',
                    page_count: 71,
                    download_path: '/library/books/let-us-pray.pdf',
                }}
                onOpen={vi.fn()}
            />
        )

        // The title is still there; the cover image is not requested at all.
        expect(screen.getByText('Let Us Pray')).toBeInTheDocument()
        expect(document.querySelector('img')).toBeNull()
    })
})
