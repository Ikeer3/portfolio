import { describe, expect, it } from 'vitest'
import { formatComment } from './comments'

describe('formatComment', () => {
  it('usa la sintaxis de cada lenguaje', () => {
    expect(formatComment('line', 'hola')).toBe('// hola')
    expect(formatComment('block', 'hola')).toBe('/* hola */')
    expect(formatComment('html', 'hola')).toBe('<!-- hola -->')
  })
})
