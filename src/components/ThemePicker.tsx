import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useUi } from '@/content'
import { useDismiss } from '@/hooks/useDismiss'
import { useThemeStore } from '@/store/theme'
import { getTheme, THEMES, type Theme } from '@/themes'

// Muestra del tema: mitad color de fondo, mitad color de acento
function Muestra({ tema }: { tema: Theme }) {
  return (
    <span
      aria-hidden="true"
      style={{
        background: `linear-gradient(135deg, ${tema.tokens.bg} 50%, ${tema.tokens.accent} 50%)`,
      }}
      className="size-5 shrink-0 rounded-full border border-line"
    />
  )
}

// Botón de la barra de estado + ventana emergente con los temas disponibles
export function ThemePicker() {
  const ui = useUi().statusBar
  const { themeId, setTheme } = useThemeStore()
  const [abierto, setAbierto] = useState(false)
  const contenedor = useRef<HTMLDivElement>(null)
  const boton = useRef<HTMLButtonElement>(null)
  const opciones = useRef<(HTMLButtonElement | null)[]>([])
  const actual = getTheme(themeId)

  const cerrar = useCallback(() => setAbierto(false), [])
  useDismiss(contenedor, abierto, cerrar)

  // Al abrir, el foco va al tema seleccionado
  useEffect(() => {
    if (!abierto) return
    const indice = THEMES.findIndex((tema) => tema.id === themeId)
    opciones.current[indice]?.focus()
  }, [abierto, themeId])

  const cerrarYDevolverFoco = () => {
    setAbierto(false)
    boton.current?.focus()
  }

  const alTeclear = (evento: KeyboardEvent<HTMLDivElement>) => {
    const enfocada = opciones.current.findIndex((el) => el === document.activeElement)
    const ultimo = THEMES.length - 1
    const destinos: Record<string, number> = {
      ArrowDown: enfocada >= ultimo ? 0 : enfocada + 1,
      ArrowUp: enfocada <= 0 ? ultimo : enfocada - 1,
      Home: 0,
      End: ultimo,
    }
    if (evento.key === 'Escape') {
      evento.preventDefault()
      cerrarYDevolverFoco()
    } else if (evento.key === 'Tab') {
      setAbierto(false)
    } else if (evento.key in destinos) {
      evento.preventDefault()
      opciones.current[destinos[evento.key] ?? 0]?.focus()
    }
  }

  const elegir = (tema: Theme) => {
    setTheme(tema.id)
    cerrarYDevolverFoco()
  }

  return (
    <div ref={contenedor} className="relative">
      <button
        ref={boton}
        type="button"
        aria-haspopup="menu"
        aria-expanded={abierto}
        aria-label={ui.changeTheme(actual.nombre)}
        title={ui.changeTheme(actual.nombre)}
        onClick={() => setAbierto((previo) => !previo)}
        className="rounded px-1.5 py-0.5 hover:bg-white/15"
      >
        {actual.nombre}
      </button>
      {abierto && (
        <div
          role="menu"
          tabIndex={-1}
          aria-label={ui.themePickerTitle}
          onKeyDown={alTeclear}
          className="absolute right-0 bottom-full z-20 mb-2 w-64 overflow-hidden rounded-md border border-line bg-sidebar text-[13px] text-fg shadow-2xl"
        >
          <p className="border-b border-line px-4 py-2.5 text-xs font-semibold tracking-wider text-fg-muted">
            {ui.themePickerTitle}
          </p>
          <ul>
            {THEMES.map((tema, i) => {
              const seleccionado = tema.id === themeId
              return (
                <li key={tema.id} role="none">
                  <button
                    ref={(el) => {
                      opciones.current[i] = el
                    }}
                    type="button"
                    role="menuitemradio"
                    aria-checked={seleccionado}
                    tabIndex={seleccionado ? 0 : -1}
                    onClick={() => elegir(tema)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-hover ${
                      seleccionado
                        ? 'bg-selection shadow-[inset_2px_0_0_var(--accent)]'
                        : ''
                    }`}
                  >
                    <Muestra tema={tema} />
                    <span className="flex-1 font-semibold">{tema.nombre}</span>
                    {seleccionado && (
                      <span aria-hidden="true" className="text-accent">
                        ✓
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
