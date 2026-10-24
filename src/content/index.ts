import { uiEs } from './es/ui'
import type { UiStrings } from './types'

export type { UiStrings } from './types'

// Hasta que exista el selector de idioma (fase 11) la interfaz siempre está en español
export function useUi(): UiStrings {
  return uiEs
}
