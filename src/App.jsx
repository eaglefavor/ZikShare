import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
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

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Full-screen pages (no bottom nav) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />
          <Route path="/seller/:id" element={<SellerProfilePage />} />
          <Route path="/user/:id" element={<SellerProfilePage />} />
          <Route path="/seller-hub" element={<SellerHubPage />} />
          <Route path="/profile/listings" element={<MyListingsPage />} />
          <Route path="/profile/saved" element={<SavedItemsPage />} />
          <Route path="/profile/purchases" element={<PurchasedItemsPage />} />
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
        <DebugConsole />
      </div>
    </AuthProvider>
  )
}

export default App
