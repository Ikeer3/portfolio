// Convierte "AAAA-MM" en "MM/AAAA"; un año suelto ("2026") se deja como está
function formatearFecha(fecha: string): string {
  const [anio, mes] = fecha.split('-')
  return mes ? `${mes}/${anio}` : (anio ?? fecha)
}

// Periodo legible: "09/2025 – Presente", "01/2024 – 04/2025" o "2026"
export function formatPeriod(
  desde: string,
  hasta: string | undefined,
  presente: string,
): string {
  const inicio = formatearFecha(desde)
  if (hasta === undefined) return `${inicio} – ${presente}`
  const fin = formatearFecha(hasta)
  return inicio === fin ? inicio : `${inicio} – ${fin}`
}
