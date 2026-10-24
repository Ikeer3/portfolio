import { useUi } from '@/content'
import { PROJECT_NAME } from '@/config'

// Botones de ventana decorativos y buscador falso (abrirá la paleta en la fase 5)
export function TitleBar() {
  const ui = useUi()

  return (
    <div className="flex h-9 items-center gap-3 border-b border-line bg-sidebar px-3">
      <div aria-hidden="true" className="flex w-14 gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-3 rounded-full border border-line bg-hover" />
        ))}
      </div>
      <button
        type="button"
        aria-disabled="true"
        aria-label={ui.titleBar.searchLabel}
        title={ui.soon}
        className="mx-auto flex h-6 w-full max-w-md items-center justify-between gap-3 rounded border border-line bg-bg px-3 text-xs text-fg-muted"
      >
        <span className="truncate">{PROJECT_NAME}</span>
        <kbd className="font-mono">Ctrl+P</kbd>
      </button>
      <div aria-hidden="true" className="w-14 max-sm:hidden" />
    </div>
  )
}
