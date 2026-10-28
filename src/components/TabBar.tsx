import type { KeyboardEvent } from 'react'
import { useContent, useUi } from '@/content'
import type { TabId } from '@/content/files'
import { describeTab } from '@/lib/tabs'
import { useWorkspaceStore } from '@/store/workspace'
import { FileIcon } from './FileIcon'
import { Icon } from './Icon'

export const tabId = (id: TabId) => `tab-${id}`
export const panelId = (id: TabId) => `panel-${id}`

export function TabBar() {
  const ui = useUi().tabs
  const contenido = useContent()
  const { tabs, activeId, openFile, closeTab } = useWorkspaceStore()

  if (tabs.length === 0) return null

  // Flechas, Inicio y Fin mueven el foco y activan la pestaña (patrón WAI-ARIA de tabs)
  const alTeclear = (evento: KeyboardEvent<HTMLDivElement>) => {
    const actual = activeId ? tabs.indexOf(activeId) : 0
    const destinos: Record<string, number> = {
      ArrowRight: (actual + 1) % tabs.length,
      ArrowLeft: (actual - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }
    const indice = destinos[evento.key]
    const destino = indice === undefined ? undefined : tabs[indice]
    if (!destino) return
    evento.preventDefault()
    openFile(destino)
    document.getElementById(tabId(destino))?.focus()
  }

  return (
    // El manejador de teclado vive en el contenedor: las pestañas son los únicos elementos enfocables
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      role="tablist"
      aria-label={ui.listLabel}
      onKeyDown={alTeclear}
      className="flex shrink-0 overflow-x-auto bg-sidebar"
    >
      {tabs.map((id) => {
        const pestana = describeTab(id, contenido)
        const activa = id === activeId
        return (
          <div
            key={id}
            role="presentation"
            className={`flex shrink-0 items-center border-r border-line text-[13px] ${
              activa
                ? 'bg-bg text-fg shadow-[inset_0_2px_0_var(--accent)]'
                : 'text-fg-muted hover:bg-hover'
            }`}
          >
            <button
              type="button"
              role="tab"
              id={tabId(id)}
              aria-selected={activa}
              aria-controls={panelId(id)}
              tabIndex={activa ? 0 : -1}
              onClick={() => openFile(id)}
              className="flex items-center gap-2 py-2 pl-3"
            >
              <FileIcon tipo={pestana.icono} />
              {pestana.etiqueta}
            </button>
            <button
              type="button"
              aria-label={ui.close(pestana.etiqueta)}
              title={ui.close(pestana.etiqueta)}
              onClick={() => closeTab(id)}
              className="mx-1 grid size-6 place-items-center rounded hover:bg-hover"
            >
              <Icon name="close" className="size-3.5" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
