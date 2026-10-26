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
  pages: {
    home: {
      rolesLabel: string
      statsLabel: string
      linksLabel: string
      projects: string
      about: string
      contact: string
    }
    about: { educationTitle: string; fullPath: string }
    skills: { intro: string; levelsLabel: string }
    experience: { intro: string }
    contact: {
      intro: string
      cardsLabel: string
      formTitle: string
      labels: Record<'nombre' | 'correo' | 'asunto' | 'mensaje', string>
      submit: string
      errors: Record<'required' | 'email' | 'tooShort', string>
      soon: (correo: string) => string
    }
    readme: { fileLabel: string; about: string; stack: string; contact: string }
    projects: {
      intro: string
      role: string
      technologies: string
      showPreview: string
      hidePreview: string
      openInNewTab: string
      previewNote: string
      browserLabel: string
    }
  }
  // Texto de la línea de comentario con la que empieza cada archivo
  fileComments: Record<FileId, string>
  // Titular grande de cada archivo (el de home lleva el nombre completo)
  pageTitles: Record<FileId, string>
}
