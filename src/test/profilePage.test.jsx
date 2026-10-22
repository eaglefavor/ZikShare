import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProfilePage from '../pages/ProfilePage'

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: null, session: null, isAuthenticated: false, isVerified: false, signOut: vi.fn() }),
}))

vi.mock('../lib/database', () => ({
  getSellerAnalytics: vi.fn().mockResolvedValue(null),
}))

vi.mock('../components/AdminRoute', () => ({
  isUserAdmin: () => false,
}))

describe('Account page for a visitor', () => {
  it('leads with the fact that reading needs no account', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <ProfilePage />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /you do not need an account to read/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in with your unizik email/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open the library instead/i })).toBeInTheDocument()
  })

  it('does not show account-only destinations to a signed-out visitor', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <ProfilePage />
      </MemoryRouter>
    )

    expect(screen.queryByRole('button', { name: /seller hub/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^my listings$/i })).not.toBeInTheDocument()
    expect(screen.queryByText(/welcome to zikshare/i)).not.toBeInTheDocument()
  })
})
