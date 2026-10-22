import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

const signInWithEmail = vi.fn().mockResolvedValue({})
const signUpWithEmail = vi.fn().mockResolvedValue({})
const signInWithGoogle = vi.fn().mockResolvedValue({})

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    authError: '',
  }),
  isUnizikEmail: (email) => String(email).toLowerCase().endsWith('@unizik.edu.ng'),
}))

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <LoginPage />
    </MemoryRouter>
  )
}

describe('Sign-in page', () => {
  it('says the library needs no account and links to it', () => {
    renderLogin()

    expect(screen.getByRole('heading', { name: /sign in to zikshare/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /go straight to the library/i })).toHaveAttribute(
      'href',
      '/library'
    )
  })

  it('keeps registration behind a UNIZIK email', async () => {
    renderLogin()

    fireEvent.click(screen.getByRole('button', { name: /create an account/i }))
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Chike Obi' } })
    fireEvent.change(screen.getByLabelText(/unizik student email/i), {
      target: { value: 'someone@gmail.com' },
    })
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'secret123' } })
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/official unizik student email/i)
    expect(signUpWithEmail).not.toHaveBeenCalled()
  })

  it('offers Google sign-in for accounts already on the UNIZIK domain', () => {
    renderLogin()

    fireEvent.click(screen.getByRole('button', { name: /continue with unizik google account/i }))
    expect(signInWithGoogle).toHaveBeenCalled()
  })
})
