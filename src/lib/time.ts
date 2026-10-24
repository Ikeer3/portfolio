// Hora en formato 24 h con dos dígitos (por ejemplo "09:05")
export function formatClock(fecha: Date): string {
  const horas = String(fecha.getHours()).padStart(2, '0')
  const minutos = String(fecha.getMinutes()).padStart(2, '0')
  return `${horas}:${minutos}`
}
