import { useContent, useUi } from '@/content'
import { describeTab } from '@/lib/tabs'
import { DEFAULT_BRANCH, PROJECT_NAME } from '@/config'
import { useNow } from '@/hooks/useNow'
import { formatClock } from '@/lib/time'
import { useWorkspaceStore } from '@/store/workspace'
import { Icon } from './Icon'
import { ThemePicker } from './ThemePicker'

const BOTON = 'rounded px-1.5 py-0.5 hover:bg-white/15'

export function StatusBar() {
  const ui = useUi()
  const { projects } = useContent()
  const activeId = useWorkspaceStore((estado) => estado.activeId)
  const ahora = useNow()
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
          <span className={`${BOTON} max-md:hidden`}>
            {describeTab(activeId, projects).lenguaje ?? ui.statusBar.previewLanguage}
          </span>
        )}
        <span className="px-1.5 max-md:hidden">UTF-8</span>
        <span className="px-1.5 max-md:hidden">Prettier</span>
        <ThemePicker />
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
