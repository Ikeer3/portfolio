import type { PortfolioContent } from './data-types'
import { contentEs } from './es'
import { uiEs } from './es/ui'
import type { UiStrings } from './types'

export type { UiStrings } from './types'
export type * from './data-types'

// Hasta que exista el selector de idioma (fase 11) la interfaz siempre está en español
export function useUi(): UiStrings {
  return uiEs
}

// Datos de contenido (perfil, proyectos, habilidades...) en el idioma activo
export function useContent(): PortfolioContent {
  return contentEs
}
