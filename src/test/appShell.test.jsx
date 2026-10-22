import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import AppShell from '../components/AppShell'

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ isAuthenticated: false, user: null, session: null }),
}))

vi.mock('../lib/messaging', () => ({
  getConversations: vi.fn().mockResolvedValue([]),
}))

vi.mock('../lib/database', () => ({
  getAnnouncements: vi.fn().mockResolvedValue([]),
}))

vi.mock('../lib/announcements', () => ({
  getUnreadAnnouncementsCount: () => 0,
}))

function renderShell() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<AppShell><div>PAGE CONTENT</div></AppShell>} />
        <Route path="/search" element={<div>SEARCH RESULTS PAGE</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('App shell', { timeout: 20000 }, () => {
  beforeEach(() => vi.clearAllMocks())

  it('frames every page with the same navigation and content', () => {
    renderShell()

    expect(screen.getByText('PAGE CONTENT')).toBeInTheDocument()
    // Desktop nav and the mobile bottom bar both exist in the tree; CSS decides
    // which one is on screen, so more than one match is expected and correct.
    expect(screen.getAllByRole('link', { name: 'Home' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Library' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Marketplace' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /Sell something/i }).length).toBeGreaterThan(0)
  })

  it('searches from the header instead of asking people to hunt for a page', () => {
    renderShell()

    const field = screen.getByLabelText('Search ZikShare')
    fireEvent.change(field, { target: { value: 'THA 151' } })
    fireEvent.submit(field.closest('form'))

    expect(screen.getByText('SEARCH RESULTS PAGE')).toBeInTheDocument()
  })

  it('puts the library and messages where a phone user can reach them', () => {
    renderShell()

    expect(screen.getAllByRole('link', { name: 'Library' }).length).toBeGreaterThan(0)
    const messageLinks = screen.getAllByRole('link', { name: 'Messages' })
    expect(messageLinks.length).toBeGreaterThan(0)
    expect(messageLinks[0]).toHaveAttribute('href', '/messages')
    for (const link of screen.getAllByRole('link', { name: 'Search' })) {
      expect(link).toHaveAttribute('href', '/search')
    }
  })

  it('never shows an empty notification badge', () => {
    renderShell()
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('states the free promise in the footer', () => {
    renderShell()
    expect(screen.getByText(/no fee, no sign-in, no payment step/i)).toBeInTheDocument()
  })
})
