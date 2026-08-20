import { Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ToastProvider } from './components/Toast'
import BottomNav from './components/BottomNav'
import DebugConsole from './components/DebugConsole'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import PostPage from './pages/PostPage'
import MessagesPage from './pages/MessagesPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import ItemDetailPage from './pages/ItemDetailPage'
import MyListingsPage from './pages/MyListingsPage'
import SellerHubPage from './pages/SellerHubPage'
import SellerProfilePage from './pages/SellerProfilePage'
import SavedItemsPage from './pages/SavedItemsPage'
import SettingsPage from './pages/SettingsPage'
import HelpPage from './pages/HelpPage'
import ChatPage from './pages/ChatPage'
import PaymentSuccess from './pages/PaymentSuccess'
import PurchasedItemsPage from './pages/PurchasedItemsPage'
import AdminPage from './pages/AdminPage'
import AdminRoute, { isUserAdmin } from './components/AdminRoute'
import OfficialChannelPage from './pages/OfficialChannelPage'
import AnnouncementModal from './components/AnnouncementModal'
import MaintenancePage from './pages/MaintenancePage'

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
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-background">
          <AppRoutes />
          <DebugConsole />
        </div>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
