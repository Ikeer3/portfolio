// Archivos del portfolio. Cada uno se muestra como una pestaña del "editor".
export type FileId =
  'home' | 'about' | 'projects' | 'skills' | 'experience' | 'contact' | 'readme'
export type FolderId = 'src' | 'data'
export type FileKind = 'tsx' | 'html' | 'js' | 'json' | 'ts' | 'css' | 'md'
// Sintaxis de la línea de comentario con la que empieza cada archivo
export type CommentStyle = 'line' | 'block' | 'html'

export interface PortfolioFile {
  id: FileId
  nombre: string
  carpeta: FolderId | null // null = raíz del proyecto
  lenguaje: string // nombre que muestra la barra de estado
  tipo: FileKind
  comentario: CommentStyle
}

export const FILES: readonly PortfolioFile[] = [
  {
    id: 'home',
    nombre: 'home.tsx',
    carpeta: 'src',
    lenguaje: 'TypeScript React',
    tipo: 'tsx',
    comentario: 'line',
  },
  {
    id: 'about',
    nombre: 'about.html',
    carpeta: 'src',
    lenguaje: 'HTML',
    tipo: 'html',
    comentario: 'html',
  },
  {
    id: 'projects',
    nombre: 'projects.js',
    carpeta: 'src',
    lenguaje: 'JavaScript',
    tipo: 'js',
    comentario: 'line',
  },
  {
    id: 'experience',
    nombre: 'experience.ts',
    carpeta: 'src',
    lenguaje: 'TypeScript',
    tipo: 'ts',
    comentario: 'line',
  },
  {
    id: 'contact',
    nombre: 'contact.css',
    carpeta: 'src',
    lenguaje: 'CSS',
    tipo: 'css',
    comentario: 'block',
  },
  {
    id: 'skills',
    nombre: 'skills.json',
    carpeta: 'data',
    lenguaje: 'JSON con comentarios',
    tipo: 'json',
    comentario: 'line',
  },
  {
    id: 'readme',
    nombre: 'README.md',
    carpeta: null,
    lenguaje: 'Markdown',
    tipo: 'md',
    comentario: 'html',
  },
]

// Las vistas previas de proyectos también son pestañas del editor, pero no son archivos del árbol
export type PreviewTabId = `preview:${string}`
export type TabId = FileId | PreviewTabId

export const previewTabId = (idProyecto: string): PreviewTabId => `preview:${idProyecto}`
export const isPreviewTab = (id: TabId): id is PreviewTabId => id.startsWith('preview:')
export const projectIdOf = (id: PreviewTabId): string => id.slice('preview:'.length)

export const FOLDERS: readonly FolderId[] = ['src', 'data']

// El CV no es una pestaña: se descarga al hacer clic
export const CV_FILE = {
  nombre: 'CV_Iker_Santos.pdf',
  url: '/CV_Iker_Santos.pdf',
} as const

const POR_ID = Object.fromEntries(
  FILES.map((archivo) => [archivo.id, archivo]),
) as Record<FileId, PortfolioFile>

export function getFile(id: FileId): PortfolioFile {
  return POR_ID[id]
}

export function filesInFolder(carpeta: FolderId | null): PortfolioFile[] {
  return FILES.filter((archivo) => archivo.carpeta === carpeta)
}

// Ruta para las migas de pan: carpeta › archivo (o solo el archivo si está en la raíz)
export function breadcrumbOf(archivo: PortfolioFile): string[] {
  return archivo.carpeta ? [archivo.carpeta, archivo.nombre] : [archivo.nombre]
}
