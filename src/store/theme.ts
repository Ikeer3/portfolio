import { create } from 'zustand'
import { readStorage, writeStorage } from '@/lib/storage'
import { applyTheme, DEFAULT_THEME_ID, isThemeId, THEMES, type ThemeId } from '@/themes'

export const THEME_STORAGE_KEY = 'iker-portfolio:tema'

// Tema inicial: el guardado por la persona; si no hay, el que pide su sistema
export function resolveInitialTheme(): ThemeId {
  const guardado = readStorage(THEME_STORAGE_KEY)
  if (isThemeId(guardado)) return guardado
  const prefiereClaro =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  return prefiereClaro ? 'iker-light' : DEFAULT_THEME_ID
}

interface ThemeState {
  themeId: ThemeId
  setTheme: (id: ThemeId) => void
  // Pasa al siguiente tema de la lista (dark -> light -> amber -> dark)
  cycleTheme: () => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  themeId: resolveInitialTheme(),
  setTheme: (id) => {
    applyTheme(id)
    writeStorage(THEME_STORAGE_KEY, id)
    set({ themeId: id })
  },
  cycleTheme: () => {
    const actual = THEMES.findIndex((tema) => tema.id === get().themeId)
    const siguiente = THEMES[(actual + 1) % THEMES.length]
    if (siguiente) get().setTheme(siguiente.id)
  },
}))
