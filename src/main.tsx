import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyTheme, DEFAULT_THEME_ID } from './themes'

// Tema inicial antes de pintar la interfaz; la persistencia llega en el siguiente commit
applyTheme(DEFAULT_THEME_ID)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
