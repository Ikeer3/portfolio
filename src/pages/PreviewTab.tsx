import { BrowserFrame } from '@/components/BrowserFrame'
import { useContent } from '@/content'
import { projectIdOf, type PreviewTabId } from '@/content/files'

// Contenido de una pestaña de vista previa: el marco de navegador ocupa todo el área del editor
export function PreviewTab({ id }: { id: PreviewTabId }) {
  const { projects } = useContent()
  const vista = projects.find((proyecto) => proyecto.id === projectIdOf(id))?.vistaPrevia
  return vista ? <BrowserFrame {...vista} /> : null
}
