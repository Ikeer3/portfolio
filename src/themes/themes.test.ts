import { describe, expect, it } from 'vitest'
import { contraste } from './contrast'
import { applyTheme, isThemeId, THEMES, type ThemeTokens } from './index'

// Pares texto/fondo que se usarán en la interfaz. Todos deben cumplir WCAG AA (4.5:1).
const PARES: ReadonlyArray<[keyof ThemeTokens, keyof ThemeTokens]> = [
  ['text', 'bg'],
  ['text', 'bgSidebar'],
  ['text', 'bgHover'],
  ['text', 'bgSelection'],
  ['textMuted', 'bg'],
  ['textMuted', 'bgSidebar'],
  ['accent', 'bg'],
  ['accent', 'bgSidebar'],
  ['surname', 'bg'],
  ['surname', 'bgSidebar'],
  ['comment', 'bg'],
  ['comment', 'bgSidebar'],
  ['textOnActivity', 'bgActivity'],
  ['textOnStatus', 'bgStatus'],
]

describe('contraste de los temas', () => {
  it('calcula valores conocidos de la fórmula WCAG', () => {
    expect(contraste('#000000', '#ffffff')).toBeCloseTo(21, 1)
    expect(contraste('#ffffff', '#ffffff')).toBeCloseTo(1, 5)
  })

  for (const tema of THEMES) {
    describe(tema.nombre, () => {
      for (const [primer, fondo] of PARES) {
        it(`${primer} sobre ${fondo} cumple 4.5:1`, () => {
          expect(
            contraste(tema.tokens[primer], tema.tokens[fondo]),
          ).toBeGreaterThanOrEqual(4.5)
        })
      }
    })
  }
})

describe('applyTheme', () => {
  it('vuelca los tokens como variables CSS y fija el esquema de color', () => {
    const raiz = document.createElement('div')
    applyTheme('iker-light', raiz)
    expect(raiz.style.getPropertyValue('--bg-sidebar')).toBe('#f3f3f3')
    expect(raiz.dataset['theme']).toBe('iker-light')
    expect(raiz.style.colorScheme).toBe('light')
  })

  it('reconoce solo identificadores de tema válidos', () => {
    expect(isThemeId('iker-amber')).toBe(true)
    expect(isThemeId('otro')).toBe(false)
  })
})
