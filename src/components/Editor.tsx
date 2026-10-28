import { useUi } from '@/content'
import { isCertificateTab, isPreviewTab, type TabId } from '@/content/files'
import { PAGES } from '@/pages'
import { CertificateViewer } from '@/pages/CertificateViewer'
import { PreviewTab } from '@/pages/PreviewTab'
import { useWorkspaceStore } from '@/store/workspace'
import { panelId, tabId } from './TabBar'

// Página de un archivo o marco de navegador, según el tipo de pestaña
function Contenido({ id }: { id: TabId }) {
  if (isPreviewTab(id)) return <PreviewTab id={id} />
  if (isCertificateTab(id)) return <CertificateViewer id={id} />
  const Pagina = PAGES[id]
  return <Pagina />
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

  return (
    // key: cada pestaña monta su propio contenedor, así siempre empieza arriba del todo.
    // "relative" contiene los textos ocultos (sr-only), que si no ensanchan toda la página.
    // Las vistas previas no llevan relleno ni scroll propio: el marco ocupa toda el área.
    <main
      key={activeId}
      role="tabpanel"
      id={panelId(activeId)}
      aria-labelledby={tabId(activeId)}
      className={`relative min-w-0 flex-1 ${
        isPreviewTab(activeId) || isCertificateTab(activeId)
          ? 'flex flex-col overflow-hidden'
          : 'overflow-auto px-6 py-6'
      }`}
    >
      <Contenido id={activeId} />
    </main>
  )
}
