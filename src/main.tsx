import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'
import HostFormPage from './pages/host/HostFormPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HostFormPage />
    <App />
  </StrictMode>,
)
