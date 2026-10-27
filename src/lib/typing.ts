// Máquina de estados del efecto de escritura: escribe una frase, la mantiene, la borra
// con el mismo ritmo y pasa a la siguiente, en bucle.
export type FaseEscritura = 'escribiendo' | 'borrando'

export interface EstadoEscritura {
  indice: number // frase actual
  escritas: number // letras visibles de la frase actual
  fase: FaseEscritura
}

export interface Ritmos {
  escribir: number // ms por letra al escribir
  borrar: number // ms por letra al borrar
  pausaCompleta: number // ms con la frase entera antes de borrarla
  pausaVacia: number // ms con la línea vacía antes de la siguiente frase
}

export const RITMOS: Ritmos = {
  escribir: 45,
  borrar: 25,
  pausaCompleta: 1800,
  pausaVacia: 350,
}
export const ESTADO_INICIAL: EstadoEscritura = {
  indice: 0,
  escritas: 0,
  fase: 'escribiendo',
}

// Cuánto se espera antes de dar el siguiente paso desde este estado
export function retardoDe(
  estado: EstadoEscritura,
  frases: readonly string[],
  ritmos: Ritmos = RITMOS,
): number {
  const longitud = frases[estado.indice]?.length ?? 0
  if (estado.fase === 'escribiendo') {
    return estado.escritas < longitud ? ritmos.escribir : ritmos.pausaCompleta
  }
  return estado.escritas > 0 ? ritmos.borrar : ritmos.pausaVacia
}

// Estado que sigue al actual
export function avanzar(
  estado: EstadoEscritura,
  frases: readonly string[],
): EstadoEscritura {
  const longitud = frases[estado.indice]?.length ?? 0
  if (estado.fase === 'escribiendo') {
    return estado.escritas < longitud
      ? { ...estado, escritas: estado.escritas + 1 }
      : { ...estado, fase: 'borrando' }
  }
  return estado.escritas > 0
    ? { ...estado, escritas: estado.escritas - 1 }
    : { indice: (estado.indice + 1) % frases.length, escritas: 0, fase: 'escribiendo' }
}
