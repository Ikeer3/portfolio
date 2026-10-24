import { useUi } from '@/content'
import { getFile, type FileId } from '@/content/files'
import { formatComment } from '@/lib/comments'
import { useWorkspaceStore } from '@/store/workspace'
import { panelId, tabId } from './TabBar'

// Página provisional de cada archivo: línea de comentario en verde y titular grande.
// El contenido real de cada página llega en la fase 4.
function Titular({ id, texto }: { id: FileId; texto: string }) {
  if (id !== 'home') return <>{texto}</>
  const [nombre = '', ...apellidos] = texto.split(' ')
  return (
    <>
      {nombre} <span className="text-surname">{apellidos.join(' ')}</span>
    </>
  )
}

export function Editor() {
  const ui = useUi()
  const activeId = useWorkspaceStore((estado) => estado.activeId)

  if (!activeId) {
    return (
      <main className="grid min-w-0 flex-1 place-items-center p-8 text-center">
        <div>
          <p className="font-display text-title">{ui.editor.emptyTitle}</p>
          <p className="mt-2 text-fg-muted">{ui.editor.emptyHint}</p>
        </div>
      </main>
    )
  }

  const archivo = getFile(activeId)
  return (
    <main
      role="tabpanel"
      id={panelId(activeId)}
      aria-labelledby={tabId(activeId)}
      className="min-w-0 flex-1 overflow-auto p-8"
    >
      <p className="text-comment">
        {formatComment(archivo.comentario, ui.fileComments[activeId])}
      </p>
      <h1 className="mt-4 font-display text-display">
        <Titular id={activeId} texto={ui.pageTitles[activeId]} />
      </h1>
      <p className="mt-6 text-fg-muted">{ui.editor.building}</p>
    </main>
  )
}
