import { useEffect, type RefObject } from 'react'

// Llama a `alCerrar` al hacer clic fuera del elemento o al pulsar Escape
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  activo: boolean,
  alCerrar: () => void,
): void {
  useEffect(() => {
    if (!activo) return

    const alPulsar = (evento: MouseEvent) => {
      if (ref.current && !ref.current.contains(evento.target as Node)) alCerrar()
    }
    const alTeclear = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') alCerrar()
    }

    document.addEventListener('mousedown', alPulsar)
    document.addEventListener('keydown', alTeclear)
    return () => {
      document.removeEventListener('mousedown', alPulsar)
      document.removeEventListener('keydown', alTeclear)
    }
  }, [ref, activo, alCerrar])
}
