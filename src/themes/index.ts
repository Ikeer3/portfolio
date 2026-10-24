import { ikerAmber } from './iker-amber'
import { ikerDark } from './iker-dark'
import { ikerLight } from './iker-light'
import type { Theme, ThemeId } from './types'

export type { Theme, ThemeId, ThemeTokens } from './types'

// Orden en el que se muestran y rotan los temas
export const THEMES: readonly Theme[] = [ikerDark, ikerLight, ikerAmber]

export const DEFAULT_THEME_ID: ThemeId = 'iker-dark'

export function isThemeId(valor: unknown): valor is ThemeId {
  return THEMES.some((tema) => tema.id === valor)
}

export function getTheme(id: ThemeId): Theme {
  return THEMES.find((tema) => tema.id === id) ?? ikerDark
}

// bgSidebar -> --bg-sidebar
function aVariableCss(clave: string): string {
  return `--${clave.replace(/[A-Z]/g, (letra) => `-${letra.toLowerCase()}`)}`
}

// Vuelca los tokens del tema como variables CSS en <html> y avisa al navegador
// del esquema de color para que barras de scroll y controles nativos coincidan
export function applyTheme(
  id: ThemeId,
  raiz: HTMLElement = document.documentElement,
): void {
  const tema = getTheme(id)
  for (const [clave, valor] of Object.entries(tema.tokens)) {
    raiz.style.setProperty(aVariableCss(clave), valor)
  }
  raiz.dataset['theme'] = tema.id
  raiz.style.colorScheme = tema.esOscuro ? 'dark' : 'light'
}
