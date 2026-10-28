import type { PortfolioContent } from '@/content'
import {
  breadcrumbOf,
  certificateIdOf,
  getFile,
  isCertificateTab,
  isPreviewTab,
  projectIdOf,
  type FileKind,
  type TabId,
} from '@/content/files'

export interface TabDescription {
  etiqueta: string // texto de la pestaña
  ruta: string[] // migas de pan
  icono: FileKind | 'preview' | 'pdf'
  lenguaje: string | null // lenguaje para la barra de estado (null en las vistas previas)
}

// Describe cualquier pestaña: un archivo del explorador, la vista previa de un proyecto
// o el visor de un certificado
export function describeTab(
  id: TabId,
  contenido: Pick<PortfolioContent, 'projects' | 'experience'>,
): TabDescription {
  if (isPreviewTab(id)) {
    const idProyecto = projectIdOf(id)
    const direccion =
      contenido.projects.find((proyecto) => proyecto.id === idProyecto)?.vistaPrevia
        ?.direccion ?? idProyecto
    return { etiqueta: direccion, ruta: [direccion], icono: 'preview', lenguaje: null }
  }
  if (isCertificateTab(id)) {
    const idCertificado = certificateIdOf(id)
    const certificacion = contenido.experience.certificaciones.find(
      (c) => c.id === idCertificado,
    )
    const nombreArchivo = certificacion?.pdf.split('/').pop() ?? `${idCertificado}.pdf`
    return {
      etiqueta: nombreArchivo,
      ruta: [nombreArchivo],
      icono: 'pdf',
      lenguaje: 'PDF',
    }
  }
  const archivo = getFile(id)
  return {
    etiqueta: archivo.nombre,
    ruta: breadcrumbOf(archivo),
    icono: archivo.tipo,
    lenguaje: archivo.lenguaje,
  }
}
