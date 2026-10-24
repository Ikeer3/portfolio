import { useThemeStore } from '@/store/theme'
import { THEMES } from '@/themes'

// Pantalla provisional para comprobar los temas; la interfaz real llega en la fase 3
export default function App() {
  const { themeId, setTheme } = useThemeStore()

  return (
    <main className="flex min-h-full flex-col gap-6 bg-bg p-8 text-fg">
      <h1 className="font-display text-display">
        Iker <span className="text-surname">Santos</span>
      </h1>
      <p className="text-fg-muted">Portfolio en construcción.</p>
      <p className="text-comment">{'// los comentarios se ven en verde'}</p>
      <div role="group" aria-label="Tema de color" className="flex flex-wrap gap-2">
        {THEMES.map((tema) => (
          <button
            key={tema.id}
            type="button"
            aria-pressed={tema.id === themeId}
            onClick={() => setTheme(tema.id)}
            className="rounded border border-line px-3 py-2 hover:bg-hover aria-pressed:border-accent aria-pressed:text-accent"
          >
            {tema.nombre}
          </button>
        ))}
      </div>
    </main>
  )
}
