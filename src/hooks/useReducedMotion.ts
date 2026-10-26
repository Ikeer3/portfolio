import { useEffect, useState } from 'react'

const CONSULTA = '(prefers-reduced-motion: reduce)'

// true si la persona pidió al sistema reducir las animaciones
export function useReducedMotion(): boolean {
  const [reducido, setReducido] = useState(
    () => typeof window.matchMedia === 'function' && window.matchMedia(CONSULTA).matches,
  )

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const lista = window.matchMedia(CONSULTA)
    const alCambiar = (evento: MediaQueryListEvent) => setReducido(evento.matches)
    lista.addEventListener('change', alCambiar)
    return () => lista.removeEventListener('change', alCambiar)
  }, [])

  return reducido
}
