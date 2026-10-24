import { useUi } from '@/content'

// Los desplegables llegan en la fase 5; hasta entonces los botones están marcados como no disponibles
export function MenuBar() {
  const ui = useUi()

  return (
    <nav
      aria-label={ui.menuBar.label}
      className="flex h-8 items-center overflow-x-auto border-b border-line bg-sidebar px-2 text-[13px]"
    >
      <ul className="flex">
        {ui.menuBar.items.map((etiqueta) => (
          <li key={etiqueta}>
            <button
              type="button"
              aria-disabled="true"
              title={ui.soon}
              className="rounded px-2 py-1 hover:bg-hover"
            >
              {etiqueta}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
