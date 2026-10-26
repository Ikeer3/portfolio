import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { FILES } from './content/files'
import { useThemeStore } from './store/theme'
import { useWorkspaceStore } from './store/workspace'

describe('interfaz del editor', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useThemeStore.getState().setTheme('iker-dark')
    useWorkspaceStore.setState({
      tabs: ['home'],
      activeId: 'home',
      sidebarVisible: true,
      sidebarView: 'explorer',
    })
  })

  it('arranca con home.tsx abierto, con el nombre y la línea de comentario', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { level: 1, name: /iker santos/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/^\/\/ Hola, mundo/)).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(1)
  })

  it('un clic en un archivo abre su pestaña y no la duplica al repetir', async () => {
    const usuario = userEvent.setup()
    render(<App />)
    const arbol = screen.getByRole('navigation', { name: /archivos del portfolio/i })
    await usuario.click(within(arbol).getByRole('button', { name: /about\.html/ }))
    await usuario.click(within(arbol).getByRole('button', { name: /about\.html/ }))
    expect(screen.getAllByRole('tab')).toHaveLength(2)
    expect(
      screen.getByRole('tab', { name: /about\.html/, selected: true }),
    ).toBeInTheDocument()
    expect(screen.getByText('<!-- Quién soy y por qué programo -->')).toBeInTheDocument()
  })

  it('cierra una pestaña con su «x» y muestra el estado vacío al cerrar la última', async () => {
    const usuario = userEvent.setup()
    render(<App />)
    await usuario.click(screen.getByRole('button', { name: 'Cerrar home.tsx' }))
    expect(screen.queryAllByRole('tab')).toHaveLength(0)
    expect(screen.getByText('Ningún archivo abierto')).toBeInTheDocument()
  })

  it('muestra la ruta carpeta › archivo en las migas de pan', async () => {
    const usuario = userEvent.setup()
    render(<App />)
    const arbol = screen.getByRole('navigation', { name: /archivos del portfolio/i })
    await usuario.click(within(arbol).getByRole('button', { name: /skills\.json/ }))
    const migas = screen.getByRole('navigation', { name: /ruta del archivo/i })
    expect(within(migas).getByText('data')).toBeInTheDocument()
    expect(within(migas).getByText('skills.json')).toHaveAttribute('aria-current', 'page')
  })

  it('navega entre pestañas con las flechas del teclado', async () => {
    const usuario = userEvent.setup()
    render(<App />)
    const arbol = screen.getByRole('navigation', { name: /archivos del portfolio/i })
    await usuario.click(within(arbol).getByRole('button', { name: /projects\.js/ }))
    // Las flechas actúan cuando el foco está en la lista de pestañas
    await usuario.click(screen.getByRole('tab', { name: /projects\.js/ }))
    await usuario.keyboard('{ArrowLeft}')
    expect(screen.getByRole('tab', { name: /home\.tsx/, selected: true })).toHaveFocus()
  })

  it('el icono del explorador oculta y vuelve a mostrar la barra lateral', async () => {
    const usuario = userEvent.setup()
    render(<App />)
    const explorador = screen.getByRole('button', { name: 'Explorador' })
    await usuario.click(explorador)
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    await usuario.click(explorador)
    expect(screen.getByRole('complementary')).toBeInTheDocument()
  })

  it('el CV se descarga desde la barra de actividad y desde el árbol', () => {
    render(<App />)
    for (const enlace of screen.getAllByRole('link', { name: /cv/i })) {
      expect(enlace).toHaveAttribute('href', '/CV_Iker_Santos.pdf')
      expect(enlace).toHaveAttribute('download')
    }
    expect(screen.getAllByRole('link', { name: /cv/i })).toHaveLength(2)
  })

  it('el botón del tema abre una ventana emergente y permite elegir otro', async () => {
    const usuario = userEvent.setup()
    render(<App />)
    await usuario.click(screen.getByRole('button', { name: /elegir tema de color/i }))
    const menu = screen.getByRole('menu', { name: /tema de color/i })
    expect(within(menu).getAllByRole('menuitemradio')).toHaveLength(3)
    expect(within(menu).getByRole('menuitemradio', { name: /iker dark/i })).toBeChecked()
    await usuario.click(within(menu).getByRole('menuitemradio', { name: /iker amber/i }))
    expect(useThemeStore.getState().themeId).toBe('iker-amber')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /actual: iker amber/i }),
    ).toBeInTheDocument()
  })

  it('la ventana de temas se cierra con Escape devolviendo el foco al botón', async () => {
    const usuario = userEvent.setup()
    render(<App />)
    const boton = screen.getByRole('button', { name: /elegir tema de color/i })
    await usuario.click(boton)
    await usuario.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(boton).toHaveFocus()
  })

  it('la ventana de temas se cierra al hacer clic fuera', async () => {
    const usuario = userEvent.setup()
    render(<App />)
    await usuario.click(screen.getByRole('button', { name: /elegir tema de color/i }))
    await usuario.click(screen.getByRole('heading', { level: 1 }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('se puede elegir tema solo con teclado: flechas y Enter', async () => {
    const usuario = userEvent.setup()
    render(<App />)
    await usuario.click(screen.getByRole('button', { name: /elegir tema de color/i }))
    await usuario.keyboard('{ArrowDown}{Enter}')
    expect(useThemeStore.getState().themeId).toBe('iker-light')
  })

  it('la barra de estado muestra el lenguaje del archivo activo', async () => {
    const usuario = userEvent.setup()
    render(<App />)
    const barraEstado = within(screen.getByRole('contentinfo'))
    expect(barraEstado.getByText('TypeScript React')).toBeInTheDocument()
    const arbol = screen.getByRole('navigation', { name: /archivos del portfolio/i })
    await usuario.click(within(arbol).getByRole('button', { name: /contact\.css/ }))
    expect(barraEstado.getByText('CSS')).toBeInTheDocument()
  })

  it('cada archivo del explorador abre su página real con titular, sin contenido provisional', async () => {
    const usuario = userEvent.setup()
    render(<App />)
    const arbol = screen.getByRole('navigation', { name: /archivos del portfolio/i })
    for (const archivo of FILES) {
      await usuario.click(
        within(arbol).getByRole('button', {
          name: new RegExp(archivo.nombre.replace('.', '\\.')),
        }),
      )
      const panel = screen.getByRole('tabpanel')
      expect(within(panel).getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(panel).not.toHaveTextContent(/en construcción/i)
    }
  })
})
