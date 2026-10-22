import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ChatPage from '../pages/ChatPage'

const sendMessage = vi.fn().mockResolvedValue({ id: 'm2', conversationId: 'c1', senderId: 'me', text: 'Hello', createdAt: new Date().toISOString() })

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    session: { user: { id: 'me' } },
    user: { uid: 'me', displayName: 'Chike' },
    isAuthenticated: true,
  }),
}))

vi.mock('../components/Toast', () => ({
  useToast: () => ({ success: vi.fn(), error: vi.fn(), info: vi.fn() }),
}))

vi.mock('../lib/messaging', () => ({
  getConversation: vi.fn().mockResolvedValue({
    id: 'c1',
    buyerId: 'me',
    sellerId: 'them',
    item: { id: 'i1', title: 'Oxford Standing Fan', price: 15000, isDigital: false },
  }),
  getMessages: vi.fn().mockResolvedValue([
    { id: 'm1', senderId: 'them', text: 'Yes, still available', createdAt: '2026-10-01T10:00:00.000Z' },
  ]),
  sendMessage: (...args) => sendMessage(...args),
  subscribeToMessages: vi.fn(() => () => {}),
  uploadChatAttachment: vi.fn(),
}))

vi.mock('../lib/database', () => ({
  getUser: vi.fn().mockResolvedValue({ displayName: 'Ada', department: 'Theatre and Film Studies', isVerified: true, phoneNumber: '' }),
  createOffer: vi.fn(),
  getOffersForConversation: vi.fn().mockResolvedValue([]),
  respondToOffer: vi.fn(),
  verifyHandshakePin: vi.fn(),
  getEscrowTradesForUser: vi.fn().mockResolvedValue([]),
}))

vi.mock('../lib/readStatus', () => ({
  markConversationRead: vi.fn(),
}))

vi.mock('../components/PaystackCheckout', () => ({
  default: () => null,
}))

function renderChat() {
  return render(
    <MemoryRouter initialEntries={['/chat/c1']}>
      <Routes>
        <Route path="/chat/:conversationId" element={<ChatPage />} />
        <Route path="/messages" element={<div>INBOX PAGE</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Conversation screen', () => {
  beforeEach(() => vi.clearAllMocks())

  it('names the other student and the item the thread is about', async () => {
    renderChat()

    expect(await screen.findByText('Ada')).toBeInTheDocument()
    expect(screen.getByText('Oxford Standing Fan')).toBeInTheDocument()
    expect(screen.getByText(/₦15,000/)).toBeInTheDocument()
    expect(screen.getByText('Yes, still available')).toBeInTheDocument()
  })

  it('sends a typed message through the composer', async () => {
    renderChat()

    const field = await screen.findByLabelText('Message')
    fireEvent.change(field, { target: { value: 'Hello' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))

    await waitFor(() => expect(sendMessage).toHaveBeenCalledWith('c1', 'me', 'Hello'))
  })

  it('can send a one-tap reply without typing', async () => {
    renderChat()

    fireEvent.click(await screen.findByRole('button', { name: 'Is this still available?' }))

    await waitFor(() =>
      expect(sendMessage).toHaveBeenCalledWith('c1', 'me', 'Is this still available?')
    )
  })

  it('keeps the offer sheet behind a button', async () => {
    renderChat()

    fireEvent.click(await screen.findByRole('button', { name: /^Offer$/ }))

    expect(screen.getByLabelText(/your offer/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send offer/i })).toBeInTheDocument()
  })
})
