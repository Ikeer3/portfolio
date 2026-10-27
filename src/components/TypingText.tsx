import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { avanzar, ESTADO_INICIAL, retardoDe, RITMOS, type Ritmos } from '@/lib/typing'

interface TypingTextProps {
  frases: readonly string[]
  ritmos?: Ritmos
  className?: string
}

// Escribe cada frase letra a letra, la borra con el mismo ritmo y pasa a la siguiente, en bucle.
// Con "reducir movimiento" no hay animación: se muestra la primera frase entera.
// Los lectores de pantalla reciben siempre todas las frases completas, no el texto a medias.
export function TypingText({ frases, ritmos = RITMOS, className }: TypingTextProps) {
  const reducido = useReducedMotion()
  const [estado, setEstado] = useState(ESTADO_INICIAL)

  useEffect(() => {
    if (reducido || frases.length === 0) return
    const id = window.setTimeout(
      () => setEstado((actual) => avanzar(actual, frases)),
      retardoDe(estado, frases, ritmos),
    )
    return () => window.clearTimeout(id)
  }, [estado, frases, ritmos, reducido])

  const primera = frases[0] ?? ''
  const visible = reducido
    ? primera
    : (frases[estado.indice] ?? '').slice(0, estado.escritas)

  return (
    <p className={className}>
      <span className="sr-only">{frases.join(' ')}</span>
      <span aria-hidden="true">
        {visible}
        {!reducido && <span className="typing-caret" />}
      </span>
    </p>
  )
}
