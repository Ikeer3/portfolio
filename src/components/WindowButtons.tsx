import type { ReactNode } from 'react'
import { useUi } from '@/content'

// Colores fijos de los semáforos de ventana: no cambian con el tema
interface Boton {
  id: 'close' | 'minimize' | 'fullscreen'
  color: string
  glifo: ReactNode
}

const BOTONES: readonly Boton[] = [
  { id: 'close', color: '#ff5f57', glifo: <path d="m3.5 3.5 5 5m0-5-5 5" /> },
  { id: 'minimize', color: '#febc2e', glifo: <path d="M3 6h6" /> },
  {
    id: 'fullscreen',
    color: '#28c840',
    glifo: (
      <path
        d="M3.5 3.5h3.2L3.5 6.7z M8.5 8.5H5.3l3.2-3.2z"
        fill="currentColor"
        stroke="none"
      />
    ),
  },
]

// Cerrar y pantalla completa tendrán función más adelante; hasta entonces son botones
// no disponibles. El icono aparece al pasar el cursor o enfocar, como en un sistema de escritorio.
export function WindowButtons() {
  const ui = useUi()

  return (
    <div
      role="group"
      aria-label={ui.titleBar.windowLabel}
      className="group flex w-14 gap-2"
    >
      {BOTONES.map(({ id, color, glifo }) => (
        <button
          key={id}
          type="button"
          aria-disabled="true"
          aria-label={ui.titleBar[id]}
          title={`${ui.titleBar[id]} · ${ui.soon}`}
          style={{ backgroundColor: color }}
          className="relative grid size-3 place-items-center rounded-full text-black/60 before:absolute before:-inset-1 before:content-['']"
        >
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            aria-hidden="true"
            className="size-3 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100"
          >
            {glifo}
          </svg>
        </button>
      ))}
    </div>
  )
}
