import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ToastProvider } from './components/Toast'
import ErrorBoundary from './components/ErrorBoundary'
import BottomNav from './components/BottomNav'
import DebugConsole from './components/DebugConsole'
import HomePage from './pages/HomePage'
import AdminRoute, { isUserAdmin } from './components/AdminRoute'
import AnnouncementModal from './components/AnnouncementModal'
import { Loader2 } from 'lucide-react'

// Code-split heavy routes for optimal bundle loading
const SearchPage = lazy(() => import('./pages/SearchPage'))
const PostPage = lazy(() => import('./pages/PostPage'))
const MessagesPage = lazy(() => import('./pages/MessagesPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const ItemDetailPage = lazy(() => import('./pages/ItemDetailPage'))
const MyListingsPage = lazy(() => import('./pages/MyListingsPage'))
const SellerHubPage = lazy(() => import('./pages/SellerHubPage'))
const SellerProfilePage = lazy(() => import('./pages/SellerProfilePage'))
const SavedItemsPage = lazy(() => import('./pages/SavedItemsPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const HelpPage = lazy(() => import('./pages/HelpPage'))
const ChatPage = lazy(() => import('./pages/ChatPage'))
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'))
const PurchasedItemsPage = lazy(() => import('./pages/PurchasedItemsPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const OfficialChannelPage = lazy(() => import('./pages/OfficialChannelPage'))
const MaintenancePage = lazy(() => import('./pages/MaintenancePage'))
const LibraryPage = lazy(() => import('./pages/LibraryPage'))

// Maintenance Mode Flag — Set to true to show maintenance screen to all standard visitors
export const MAINTENANCE_MODE = false

function AppRoutes() {
  const { user, session, loading } = useAuth()
  const isAdmin = isUserAdmin(user, session)

  // When maintenance mode is active, only authenticated admins bypass
  if (MAINTENANCE_MODE && !isAdmin && !loading) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path="*" element={<MaintenancePage />} />
      </Routes>
    )
  }

  return (
    <>
      <AnnouncementModal />
      <Routes>
        {/* Full-screen pages (no bottom nav) */}
        <Route path="/admin/*" element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path="/official-channel" element={<OfficialChannelPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
        <Route path="/seller/:id" element={<SellerProfilePage />} />
        <Route path="/user/:id" element={<SellerProfilePage />} />
        <Route path="/seller-hub" element={<SellerHubPage />} />
        <Route path="/profile/listings" element={<MyListingsPage />} />
        <Route path="/profile/saved" element={<SavedItemsPage />} />
        <Route path="/profile/purchases" element={<PurchasedItemsPage />} />
        <Route path="/purchases" element={<PurchasedItemsPage />} />
        <Route path="/profile/settings" element={<SettingsPage />} />
        <Route path="/profile/help" element={<HelpPage />} />
        <Route path="/chat/:conversationId" element={<ChatPage />} />

        {/* Pages with bottom nav */}
        <Route
          path="*"
          element={
            <>
              <main className="pb-safe">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/library" element={<LibraryPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/post" element={<PostPage />} />
                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </main>
              <BottomNav />
            </>
          }
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen bg-background">
            <Suspense fallback={
              <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 size={32} className="animate-spin" color="var(--color-brand)" />
              </div>
            }>
              <AppRoutes />
            </Suspense>
            <DebugConsole />
          </div>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
