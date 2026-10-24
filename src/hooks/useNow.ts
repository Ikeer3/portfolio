import { useEffect, useState } from 'react'

// Fecha actual que se refresca cada cierto tiempo (para el reloj de la barra de estado)
export function useNow(intervaloMs = 15_000): Date {
  const [ahora, setAhora] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setAhora(new Date()), intervaloMs)
    return () => window.clearInterval(id)
  }, [intervaloMs])

  return ahora
}
