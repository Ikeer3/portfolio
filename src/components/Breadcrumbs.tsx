import { Fragment } from 'react'
import { useUi } from '@/content'
import { breadcrumbOf, getFile } from '@/content/files'
import { useWorkspaceStore } from '@/store/workspace'
import { Icon } from './Icon'

export function Breadcrumbs() {
  const ui = useUi().breadcrumbs
  const activeId = useWorkspaceStore((estado) => estado.activeId)

  if (!activeId) return null
  const ruta = breadcrumbOf(getFile(activeId))

  return (
    <nav
      aria-label={ui.label}
      className="border-b border-line px-4 py-1.5 text-xs text-fg-muted"
    >
      <ol className="flex items-center gap-1">
        {ruta.map((tramo, i) => {
          const ultimo = i === ruta.length - 1
          return (
            <Fragment key={tramo}>
              <li
                aria-current={ultimo ? 'page' : undefined}
                className={ultimo ? 'text-fg' : ''}
              >
                {tramo}
              </li>
              {!ultimo && (
                <li aria-hidden="true">
                  <Icon name="chevronRight" className="size-3" />
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
