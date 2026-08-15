if (typeof window !== 'undefined' && (import.meta.env.DEV || window.location.search.includes('debug=1'))) {
  import('eruda').then(({ default: eruda }) => eruda.init()).catch(() => {})
}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
