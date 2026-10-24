import { useUi } from '@/content'
import { DEFAULT_BRANCH } from '@/config'
import { useWorkspaceStore } from '@/store/workspace'
import { FileTree } from './FileTree'
import { Icon } from './Icon'

export function Sidebar() {
  const ui = useUi()
  const { sidebarView } = useWorkspaceStore()
  const titulo =
    sidebarView === 'explorer' ? ui.sidebar.explorerTitle : ui.sidebar.searchTitle

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-sidebar">
      <h2 className="px-4 py-2 text-xs font-semibold tracking-wider text-fg-muted">
        {titulo}
      </h2>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {sidebarView === 'explorer' ? (
          <FileTree />
        ) : (
          <p className="px-4 text-[13px] text-fg-muted">{ui.soon}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 border-t border-line p-2 text-[13px]">
        <button
          type="button"
          aria-disabled="true"
          title={ui.soon}
          className="flex items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-hover"
        >
          <Icon name="sparkle" className="size-4 shrink-0" />
          {ui.sidebar.assistantButton}
        </button>
        <p className="flex items-center gap-2 px-2 py-1 text-fg-muted">
          <Icon name="branch" className="size-4 shrink-0" />
          <span className="sr-only">{ui.sidebar.branchLabel}: </span>
          {DEFAULT_BRANCH}
        </p>
      </div>
    </aside>
  )
}
