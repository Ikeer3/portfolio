// Identificadores de los tres temas del portfolio
export type ThemeId = 'iker-dark' | 'iker-light' | 'iker-amber'

// Tokens de color: cada uno se convierte en una variable CSS (bgSidebar -> --bg-sidebar)
export interface ThemeTokens {
  bg: string // fondo del editor
  bgSidebar: string // barra lateral y paneles
  bgActivity: string // barra de actividad
  bgStatus: string // barra de estado
  bgHover: string // elemento bajo el cursor
  bgSelection: string // texto seleccionado
  border: string // separadores
  text: string // texto principal
  textMuted: string // texto secundario
  textOnActivity: string // iconos sobre la barra de actividad
  textOnStatus: string // texto sobre la barra de estado
  accent: string // enlaces, foco y elementos activos
  surname: string // apellido en el titular
  comment: string // líneas de comentario
  danger: string // errores de validación
}

export interface Theme {
  id: ThemeId
  nombre: string
  esOscuro: boolean
  tokens: ThemeTokens
}
