import type { FileId } from './files'

// Todos los textos de la interfaz. Cada idioma implementa esta misma forma,
// así TypeScript avisa si falta alguna traducción.
export interface UiStrings {
  soon: string
  common: { newTab: string }
  titleBar: {
    searchLabel: string
    windowLabel: string
    close: string
    minimize: string
    fullscreen: string
  }
  menuBar: { label: string; items: readonly string[] }
  activityBar: {
    label: string
    explorer: string
    search: string
    sourceControl: string
    downloadCv: string
    assistant: string
    settings: string
  }
  sidebar: {
    explorerTitle: string
    searchTitle: string
    assistantButton: string
    branchLabel: string
    foldersLabel: string
  }
  tabs: { listLabel: string; close: (nombre: string) => string }
  breadcrumbs: { label: string }
  editor: { emptyTitle: string; emptyHint: string; building: string }
  statusBar: {
    warnings: (cantidad: number) => string
    changeTheme: (actual: string) => string
    themePickerTitle: string
    language: string
  }
  // Texto de la línea de comentario con la que empieza cada archivo
  fileComments: Record<FileId, string>
  // Titular grande de cada archivo (el de home lleva el nombre completo)
  pageTitles: Record<FileId, string>
}
