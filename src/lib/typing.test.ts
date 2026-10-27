import { describe, expect, it } from 'vitest'
import {
  avanzar,
  ESTADO_INICIAL,
  retardoDe,
  RITMOS,
  type EstadoEscritura,
} from './typing'

const frases = ['ab', 'xyz']

function recorrer(pasos: number): EstadoEscritura[] {
  const visitados: EstadoEscritura[] = [ESTADO_INICIAL]
  for (let i = 0; i < pasos; i++)
    visitados.push(avanzar(visitados[visitados.length - 1]!, frases))
  return visitados
}

describe('máquina de escritura', () => {
  it('escribe, mantiene, borra y pasa a la siguiente frase', () => {
    const letras = recorrer(13).map((e) => `${e.indice}:${e.fase[0]}:${e.escritas}`)
    expect(letras).toEqual([
      '0:e:0',
      '0:e:1',
      '0:e:2', // escribe "ab"
      '0:b:2', // pasa a borrar con la frase entera
      '0:b:1',
      '0:b:0', // borra letra a letra
      '1:e:0', // siguiente frase
      '1:e:1',
      '1:e:2',
      '1:e:3', // escribe "xyz"
      '1:b:3',
      '1:b:2',
      '1:b:1',
      '1:b:0',
    ])
  })

  it('vuelve a la primera frase tras la última', () => {
    const estados = recorrer(40)
    expect(
      estados.some((e) => e.indice === 0 && e.escritas === 0 && estados.indexOf(e) > 10),
    ).toBe(true)
  })

  it('borra al mismo ritmo (o más rápido) que escribe y respeta las pausas', () => {
    expect(retardoDe({ indice: 0, escritas: 1, fase: 'escribiendo' }, frases)).toBe(
      RITMOS.escribir,
    )
    expect(retardoDe({ indice: 0, escritas: 2, fase: 'escribiendo' }, frases)).toBe(
      RITMOS.pausaCompleta,
    )
    expect(retardoDe({ indice: 0, escritas: 1, fase: 'borrando' }, frases)).toBe(
      RITMOS.borrar,
    )
    expect(retardoDe({ indice: 0, escritas: 0, fase: 'borrando' }, frases)).toBe(
      RITMOS.pausaVacia,
    )
    expect(RITMOS.borrar).toBeLessThanOrEqual(RITMOS.escribir)
  })
})
