import { beforeEach, describe, expect, it } from 'vitest'
import { activeAfterClosing, useWorkspaceStore } from './workspace'

const estado = () => useWorkspaceStore.getState()

describe('store del espacio de trabajo', () => {
  beforeEach(() => {
    useWorkspaceStore.setState({
      tabs: ['home'],
      activeId: 'home',
      sidebarVisible: true,
      sidebarView: 'explorer',
    })
  })

  it('arranca solo con home abierto', () => {
    expect(estado().tabs).toEqual(['home'])
    expect(estado().activeId).toBe('home')
  })

  it('abre una pestaña nueva y la activa', () => {
    estado().openFile('about')
    expect(estado().tabs).toEqual(['home', 'about'])
    expect(estado().activeId).toBe('about')
  })

  it('no duplica una pestaña ya abierta: solo la activa', () => {
    estado().openFile('about')
    estado().openFile('home')
    expect(estado().tabs).toEqual(['home', 'about'])
    expect(estado().activeId).toBe('home')
  })

  it('al cerrar la activa pasa a la vecina de la derecha, o de la izquierda si era la última', () => {
    estado().openFile('about')
    estado().openFile('projects')
    estado().openFile('about')
    estado().closeTab('about')
    expect(estado().activeId).toBe('projects')
    estado().closeTab('projects')
    expect(estado().activeId).toBe('home')
  })

  it('cerrar una pestaña no activa mantiene la activa', () => {
    estado().openFile('about')
    estado().closeTab('home')
    expect(estado().activeId).toBe('about')
    expect(estado().tabs).toEqual(['about'])
  })

  it('al cerrar todas no queda ninguna activa', () => {
    estado().openFile('about')
    estado().closeAllTabs()
    expect(estado().tabs).toEqual([])
    expect(estado().activeId).toBeNull()
  })

  it('recorre las pestañas dando la vuelta en los extremos', () => {
    estado().openFile('about')
    estado().openFile('projects')
    estado().nextTab()
    expect(estado().activeId).toBe('home')
    estado().prevTab()
    expect(estado().activeId).toBe('projects')
  })

  it('alterna la barra lateral al pulsar la vista ya visible', () => {
    estado().showSidebarView('explorer')
    expect(estado().sidebarVisible).toBe(false)
    estado().showSidebarView('search')
    expect(estado().sidebarVisible).toBe(true)
    expect(estado().sidebarView).toBe('search')
  })

  it('activeAfterClosing devuelve null si era la única pestaña', () => {
    expect(activeAfterClosing(['home'], 'home', 'home')).toBeNull()
  })
})
