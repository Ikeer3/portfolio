import { describe, expect, it } from 'vitest'
import { formatClock } from './time'

describe('formatClock', () => {
  it('rellena con ceros horas y minutos', () => {
    expect(formatClock(new Date(2026, 9, 24, 9, 5))).toBe('09:05')
  })

  it('usa formato de 24 horas', () => {
    expect(formatClock(new Date(2026, 9, 24, 23, 59))).toBe('23:59')
    expect(formatClock(new Date(2026, 9, 24, 0, 0))).toBe('00:00')
  })
})
