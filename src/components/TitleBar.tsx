import { useUi } from '@/content'
import { PROJECT_NAME } from '@/config'
import { WindowButtons } from './WindowButtons'

// Botones de ventana (cerrar, minimizar y pantalla completa) y buscador falso (abrirá la paleta en la fase 5)
export function TitleBar() {
  const ui = useUi()

  return (
    <div className="flex h-9 items-center gap-3 border-b border-line bg-sidebar px-3">
      <WindowButtons />
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
