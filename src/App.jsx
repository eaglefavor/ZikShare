import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import PostPage from './pages/PostPage'
import MessagesPage from './pages/MessagesPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import ItemDetailPage from './pages/ItemDetailPage'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Full-screen pages (no bottom nav) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />

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
      </div>
    </AuthProvider>
  )
}

export default App
