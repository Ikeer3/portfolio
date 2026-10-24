import { useUi } from '@/content'
import { CV_FILE } from '@/content/files'
import { useWorkspaceStore } from '@/store/workspace'
import { Icon, type IconName } from './Icon'

const BASE =
  'relative grid size-12 place-items-center text-on-activity opacity-80 hover:opacity-100'
const ACTIVO =
  'aria-pressed:opacity-100 aria-pressed:shadow-[inset_2px_0_0_var(--accent)]'

interface ItemInactivo {
  etiqueta: string
  icono: IconName
}

export function ActivityBar() {
  const ui = useUi().activityBar
  const soon = useUi().soon
  const { sidebarVisible, sidebarView, showSidebarView } = useWorkspaceStore()

  // Elementos cuya función llega en fases posteriores
  const noDisponible = ({ etiqueta, icono }: ItemInactivo) => (
    <li key={etiqueta}>
      <button
        type="button"
        aria-disabled="true"
        aria-label={etiqueta}
        title={soon}
        className={BASE}
      >
        <Icon name={icono} />
      </button>
    </li>
  )

  return (
    <nav
      aria-label={ui.label}
      className="flex w-12 shrink-0 flex-col justify-between bg-activity"
    >
      <ul>
        <li>
          <button
            type="button"
            aria-label={ui.explorer}
            title={ui.explorer}
            aria-pressed={sidebarVisible && sidebarView === 'explorer'}
            onClick={() => showSidebarView('explorer')}
            className={`${BASE} ${ACTIVO}`}
          >
            <Icon name="files" />
          </button>
        </li>
        <li>
          <button
            type="button"
            aria-label={ui.search}
            title={ui.search}
            aria-pressed={sidebarVisible && sidebarView === 'search'}
            onClick={() => showSidebarView('search')}
            className={`${BASE} ${ACTIVO}`}
          >
            <Icon name="search" />
          </button>
        </li>
        {noDisponible({ etiqueta: ui.sourceControl, icono: 'branch' })}
        <li>
          <a
            href={CV_FILE.url}
            download
            aria-label={ui.downloadCv}
            title={ui.downloadCv}
            className={BASE}
          >
            <Icon name="download" />
          </a>
        </li>
        {noDisponible({ etiqueta: ui.assistant, icono: 'sparkle' })}
      </ul>
      <ul>{noDisponible({ etiqueta: ui.settings, icono: 'sliders' })}</ul>
    </nav>
  )
}
