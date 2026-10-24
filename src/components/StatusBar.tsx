import { useUi } from '@/content'
import { getFile } from '@/content/files'
import { DEFAULT_BRANCH, PROJECT_NAME } from '@/config'
import { useNow } from '@/hooks/useNow'
import { formatClock } from '@/lib/time'
import { useThemeStore } from '@/store/theme'
import { useWorkspaceStore } from '@/store/workspace'
import { getTheme } from '@/themes'
import { Icon } from './Icon'

const BOTON = 'rounded px-1.5 py-0.5 hover:bg-white/15'

export function StatusBar() {
  const ui = useUi()
  const activeId = useWorkspaceStore((estado) => estado.activeId)
  const { themeId, cycleTheme } = useThemeStore()
  const ahora = useNow()
  const tema = getTheme(themeId)
  const hora = formatClock(ahora)

  return (
    <footer className="flex h-6 shrink-0 items-center justify-between gap-4 bg-status px-2 text-xs text-on-status">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex items-center gap-1">
          <Icon name="branch" className="size-3.5" />
          <span className="sr-only">{ui.sidebar.branchLabel}: </span>
          {DEFAULT_BRANCH}
        </span>
        <span className="truncate max-sm:hidden">{PROJECT_NAME}</span>
        <span className="max-sm:hidden">{ui.statusBar.warnings(0)}</span>
      </div>
      <div className="flex items-center gap-1">
        {activeId && (
          <span className={`${BOTON} max-md:hidden`}>{getFile(activeId).lenguaje}</span>
        )}
        <span className="px-1.5 max-md:hidden">UTF-8</span>
        <span className="px-1.5 max-md:hidden">Prettier</span>
        <button
          type="button"
          onClick={cycleTheme}
          aria-label={ui.statusBar.changeTheme(tema.nombre)}
          title={ui.statusBar.changeTheme(tema.nombre)}
          className={BOTON}
        >
          {tema.nombre}
        </button>
        <span aria-label={ui.statusBar.language} className="px-1.5">
          ES
        </span>
        <time dateTime={hora} className="px-1.5">
          {hora}
        </time>
      </div>
    </footer>
  )
}
