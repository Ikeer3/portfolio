import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useThemeStore } from './store/theme'
import { applyTheme } from './themes'

// Aplica el tema guardado antes de pintar la interfaz
applyTheme(useThemeStore.getState().themeId)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
