import { describe, expect, it } from 'vitest'
import { formatPeriod } from './period'

describe('formatPeriod', () => {
  it('muestra "Presente" cuando no hay fecha de fin', () => {
    expect(formatPeriod('2025-09', undefined, 'Presente')).toBe('09/2025 – Presente')
  })

  it('formatea un rango de meses', () => {
    expect(formatPeriod('2024-01', '2025-04', 'Presente')).toBe('01/2024 – 04/2025')
  })

  it('un año suelto igual al de fin se muestra una sola vez', () => {
    expect(formatPeriod('2026', '2026', 'Presente')).toBe('2026')
  })
})
