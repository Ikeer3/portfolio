import { Breadcrumbs } from './Breadcrumbs'
import { Editor } from './Editor'
import { TabBar } from './TabBar'

// Columna central: pestañas, migas de pan y contenido del archivo activo
export function EditorArea() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <TabBar />
      <Breadcrumbs />
      <Editor />
    </div>
  )
}
