import { beforeEach, describe, expect, it, vi } from 'vitest'
import { resolveInitialTheme, THEME_STORAGE_KEY, useThemeStore } from './theme'

describe('store del tema', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useThemeStore.getState().setTheme('iker-dark')
  })

  it('guarda el tema elegido y lo aplica al documento', () => {
    useThemeStore.getState().setTheme('iker-amber')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('iker-amber')
    expect(document.documentElement.dataset['theme']).toBe('iker-amber')
  })

  it('rota dark -> light -> amber -> dark', () => {
    const { cycleTheme } = useThemeStore.getState()
    cycleTheme()
    expect(useThemeStore.getState().themeId).toBe('iker-light')
    cycleTheme()
    expect(useThemeStore.getState().themeId).toBe('iker-amber')
    cycleTheme()
    expect(useThemeStore.getState().themeId).toBe('iker-dark')
  })

  it('recupera el tema guardado y descarta valores no válidos', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'iker-light')
    expect(resolveInitialTheme()).toBe('iker-light')
    window.localStorage.setItem(THEME_STORAGE_KEY, 'inventado')
    expect(resolveInitialTheme()).toBe('iker-dark')
  })

  it('no falla si localStorage está bloqueado', () => {
    const espia = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('bloqueado')
    })
    expect(() => useThemeStore.getState().setTheme('iker-light')).not.toThrow()
    expect(useThemeStore.getState().themeId).toBe('iker-light')
    espia.mockRestore()
  })
})
