import { useUi } from '@/content'
import { PAGES } from '@/pages'
import { useWorkspaceStore } from '@/store/workspace'
import { panelId, tabId } from './TabBar'

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

  const Pagina = PAGES[activeId]
  return (
    <main
      role="tabpanel"
      id={panelId(activeId)}
      aria-labelledby={tabId(activeId)}
      // "relative" contiene los textos ocultos (sr-only), que si no ensanchan toda la página
      className="relative min-w-0 flex-1 overflow-auto px-6 py-8 sm:px-10"
    >
      <Pagina />
    </main>
  )
}
