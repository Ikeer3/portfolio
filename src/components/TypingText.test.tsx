import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TypingText } from './TypingText'

function simularMovimientoReducido(reducido: boolean) {
  vi.stubGlobal('matchMedia', (consulta: string) => ({
    matches: reducido && consulta.includes('reduce'),
    addEventListener: () => {},
    removeEventListener: () => {},
  }))
}

describe('TypingText', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('escribe el texto poco a poco y lo deja completo', () => {
    simularMovimientoReducido(false)
    const { container } = render(<TypingText texto="Hola" velocidadMs={10} />)
    const visible = () => container.querySelector('[aria-hidden="true"]')?.textContent
    expect(visible()).toBe('')
    act(() => void vi.advanceTimersByTime(20))
    expect(visible()).toBe('Ho')
    act(() => void vi.advanceTimersByTime(100))
    expect(visible()).toBe('Hola')
  })

  it('con reducir movimiento muestra el texto entero al instante', () => {
    simularMovimientoReducido(true)
    const { container } = render(<TypingText texto="Hola" velocidadMs={10} />)
    expect(container.querySelector('[aria-hidden="true"]')?.textContent).toBe('Hola')
  })

  it('los lectores de pantalla reciben siempre el texto completo', () => {
    simularMovimientoReducido(false)
    render(<TypingText texto="Hola mundo" velocidadMs={10} />)
    expect(screen.getByText('Hola mundo')).toHaveClass('sr-only')
  })
})
