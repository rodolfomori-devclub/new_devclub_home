import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ScrollToTop from './components/common/ScrollToTop'
import ImagePreloader from './components/common/ImagePreloader'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ImagePreloader>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ImagePreloader>
  </StrictMode>,
)
