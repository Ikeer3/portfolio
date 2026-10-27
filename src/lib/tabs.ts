import type { Project } from '@/content'
import {
  breadcrumbOf,
  getFile,
  isPreviewTab,
  projectIdOf,
  type FileKind,
  type TabId,
} from '@/content/files'

export interface TabDescription {
  etiqueta: string // texto de la pestaña
  ruta: string[] // migas de pan
  icono: FileKind | 'preview'
  lenguaje: string | null // lenguaje para la barra de estado (null en las vistas previas)
}

// Describe cualquier pestaña, sea un archivo del explorador o la vista previa de un proyecto
export function describeTab(id: TabId, proyectos: readonly Project[]): TabDescription {
  if (isPreviewTab(id)) {
    const idProyecto = projectIdOf(id)
    const direccion =
      proyectos.find((proyecto) => proyecto.id === idProyecto)?.vistaPrevia?.direccion ??
      idProyecto
    return { etiqueta: direccion, ruta: [direccion], icono: 'preview', lenguaje: null }
  }
  const archivo = getFile(id)
  return {
    etiqueta: archivo.nombre,
    ruta: breadcrumbOf(archivo),
    icono: archivo.tipo,
    lenguaje: archivo.lenguaje,
  }
}
