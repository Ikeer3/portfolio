import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TypingText } from './TypingText'

const ritmos = { escribir: 10, borrar: 10, pausaCompleta: 100, pausaVacia: 50 }
const frases = ['Hola', 'Adiós', 'Otra']

function simularMovimientoReducido(reducido: boolean) {
  vi.stubGlobal('matchMedia', (consulta: string) => ({
    matches: reducido && consulta.includes('reduce'),
    addEventListener: () => {},
    removeEventListener: () => {},
  }))
}

// Avanza en tramos cortos para que React programe cada paso antes del siguiente
const avanzar = (ms: number) => {
  for (let t = 0; t < ms; t += 5) act(() => void vi.advanceTimersByTime(5))
}

describe('TypingText', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('escribe la primera frase, la borra y escribe la siguiente, en bucle', () => {
    simularMovimientoReducido(false)
    const { container } = render(<TypingText frases={frases} ritmos={ritmos} />)
    const visible = () => container.querySelector('[aria-hidden="true"]')?.textContent
    expect(visible()).toBe('')
    avanzar(20)
    expect(visible()).toBe('Ho')
    avanzar(20 + 100) // termina "Hola" y espera con la frase entera
    expect(visible()).toBe('Hola')
    avanzar(20) // empieza a borrar
    expect(visible()).toBe('Ho')
    avanzar(20 + 50) // borra del todo y espera con la línea vacía
    expect(visible()).toBe('')
    avanzar(30)
    expect(visible()).toBe('Adi')
  })

  it('recorre las tres frases y vuelve a empezar por la primera', () => {
    simularMovimientoReducido(false)
    const { container } = render(<TypingText frases={frases} ritmos={ritmos} />)
    const vistas = new Set<string>()
    for (let i = 0; i < 400; i++) {
      avanzar(10)
      const texto = container.querySelector('[aria-hidden="true"]')?.textContent ?? ''
      for (const frase of frases) if (texto === frase) vistas.add(frase)
    }
    expect([...vistas].sort()).toEqual([...frases].sort())
    avanzar(10_000)
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })

  it('con reducir movimiento muestra la primera frase entera, sin cursor ni animación', () => {
    simularMovimientoReducido(true)
    const { container } = render(<TypingText frases={frases} ritmos={ritmos} />)
    expect(container.querySelector('[aria-hidden="true"]')?.textContent).toBe('Hola')
    expect(container.querySelector('.typing-caret')).toBeNull()
    avanzar(5_000)
    expect(container.querySelector('[aria-hidden="true"]')?.textContent).toBe('Hola')
  })

  it('los lectores de pantalla reciben siempre las tres frases completas', () => {
    simularMovimientoReducido(false)
    render(<TypingText frases={frases} ritmos={ritmos} />)
    expect(screen.getByText('Hola Adiós Otra')).toHaveClass('sr-only')
  })
})
