import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SellerHubPage from '../pages/SellerHubPage'

const hubAnalytics = {
  totalEarningsNaira: 0,
  totalSalesCount: 0,
  activeListings: 1,
  totalListings: 1,
  totalPhysical: 1,
  totalDigital: 0,
  availableBalanceNaira: 0,
  totalWithdrawnNaira: 0,
  orders: [],
  topProducts: [],
  payouts: [],
  listings: [
    { id: 'l1', title: 'Oxford Standing Fan', price: 15000, category: 'Electronics', isDigital: false, status: 'Active' },
  ],
}



vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    session: { user: { id: 'me' } },
    user: { uid: 'me', displayName: 'Chike', email: 'chike@unizik.edu.ng' },
    isAuthenticated: true,
    refreshUser: vi.fn(),
  }),
}))

vi.mock('../lib/database', () => ({
  getSellerAnalytics: vi.fn(() => Promise.resolve(hubAnalytics)),
  updateListing: vi.fn(),
  deleteListing: vi.fn(),
  upsertUser: vi.fn(),
  boostListing: vi.fn(),
}))

vi.mock('../components/EditListingModal', () => ({ default: () => null }))
vi.mock('../lib/paystack', () => ({
  NIGERIAN_BANKS: [{ code: '058', name: 'Guaranty Trust Bank' }],
  resolveBankAccount: vi.fn(),
  createPaystackSubaccount: vi.fn(),
  initiateSellerPayout: vi.fn(),
}))
vi.mock('../components/DebugConsole', () => ({ logDebug: vi.fn() }))

function renderHub() {
  return render(
    <MemoryRouter initialEntries={['/seller-hub']}>
      <SellerHubPage />
    </MemoryRouter>
  )
}

describe('Seller hub', () => {
  beforeEach(() => vi.clearAllMocks())

  it('opens on real numbers, with zero stated as zero', async () => {
    renderHub()

    expect(await screen.findByRole('heading', { name: 'Seller hub' })).toBeInTheDocument()
    expect(await screen.findByText('Live listings')).toBeInTheDocument()
    expect(await screen.findByText('Nothing has sold yet')).toBeInTheDocument()
  })

  it('lists inventory with an action for each listing', async () => {
    renderHub()

    fireEvent.click(await screen.findByRole('tab', { name: /Inventory/ }))

    expect(await screen.findByText('Oxford Standing Fan')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Edit Oxford Standing Fan/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Delete Oxford Standing Fan/ })).toBeInTheDocument()
  })

  it('asks for a bank account before offering a withdrawal', async () => {
    renderHub()

    fireEvent.click(await screen.findByRole('tab', { name: /Payouts/ }))

    expect(await screen.findByText(/no bank account linked/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Withdraw/ })).toBeDisabled()
  })
})
