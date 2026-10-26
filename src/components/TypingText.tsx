import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface TypingTextProps {
  texto: string
  velocidadMs?: number
  className?: string
}

// Texto que se escribe letra a letra. Con "reducir movimiento" aparece entero al instante.
// Los lectores de pantalla reciben siempre el texto completo, no el que se va escribiendo.
export function TypingText({ texto, velocidadMs = 40, className }: TypingTextProps) {
  const reducido = useReducedMotion()
  const [escritas, setEscritas] = useState(reducido ? texto.length : 0)

  useEffect(() => {
    if (reducido) {
      setEscritas(texto.length)
      return
    }
    setEscritas(0)
    const id = window.setInterval(() => {
      setEscritas((previas) => {
        if (previas >= texto.length) {
          window.clearInterval(id)
          return previas
        }
        return previas + 1
      })
    }, velocidadMs)
    return () => window.clearInterval(id)
  }, [texto, velocidadMs, reducido])

  const terminado = escritas >= texto.length
  return (
    <p className={className}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden="true">
        {texto.slice(0, escritas)}
        {!terminado && <span className="typing-caret" />}
      </span>
    </p>
  )
}
