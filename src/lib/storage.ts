// Acceso seguro a localStorage: puede fallar (modo privado, cuota llena, bloqueado
// por el navegador), así que nunca debe romper la interfaz.
export function readStorage(clave: string): string | null {
  try {
    return window.localStorage.getItem(clave)
  } catch {
    return null
  }
}

export function writeStorage(clave: string, valor: string): void {
  try {
    window.localStorage.setItem(clave, valor)
  } catch {
    // Sin persistencia: la preferencia solo durará mientras la pestaña esté abierta
  }
}
