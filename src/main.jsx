if (typeof window !== 'undefined' && (import.meta.env.DEV || (window.location.search.includes('debug=1') && /^(localhost|127\.0\.0\.1)/.test(window.location.hostname)))) {
  import('eruda').then(({ default: eruda }) => eruda.init()).catch(() => {})
}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { applyTheme } from './lib/theme'

// Before the first paint, so a dark-mode reader never sees a white flash.
applyTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
