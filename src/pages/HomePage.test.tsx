import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { contentEs } from '@/content/es'
import { useWorkspaceStore } from '@/store/workspace'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  beforeEach(() => {
    useWorkspaceStore.setState({ tabs: ['home'], activeId: 'home' })
  })

  it('muestra el nombre con el apellido destacado y los roles', () => {
    render(<HomePage />)
    const titular = screen.getByRole('heading', { level: 1 })
    expect(titular).toHaveTextContent('Iker Santos')
    expect(within(titular).getByText('Santos')).toHaveClass('text-surname')
    const roles = within(screen.getByRole('list', { name: 'Roles' })).getAllByRole(
      'listitem',
    )
    expect(roles).toHaveLength(contentEs.profile.roles.length)
  })

  it('resalta las palabras clave de la introducción', () => {
    render(<HomePage />)
    expect(screen.getByText('Java')).toHaveClass('text-accent')
  })

  it('muestra las estadísticas reales con su etiqueta', () => {
    render(<HomePage />)
    const datos = screen.getByRole('group', { name: 'Datos destacados' })
    for (const dato of contentEs.profile.estadisticas) {
      expect(within(datos).getByText(dato.etiqueta)).toBeInTheDocument()
      expect(within(datos).getAllByText(dato.valor).length).toBeGreaterThan(0)
    }
  })

  it('los botones abren las pestañas de proyectos, sobre mí y contacto', async () => {
    const usuario = userEvent.setup()
    render(<HomePage />)
    await usuario.click(screen.getByRole('button', { name: 'Proyectos' }))
    await usuario.click(screen.getByRole('button', { name: 'Sobre mí' }))
    await usuario.click(screen.getByRole('button', { name: 'Contacto' }))
    expect(useWorkspaceStore.getState().tabs).toEqual([
      'home',
      'projects',
      'about',
      'contact',
    ])
    expect(useWorkspaceStore.getState().activeId).toBe('contact')
  })

  it('muestra todos los enlaces del array, los externos en pestaña nueva con rel seguro', () => {
    render(<HomePage />)
    const lista = screen.getByRole('list', { name: 'Enlaces' })
    expect(within(lista).getAllByRole('link')).toHaveLength(contentEs.links.length)
    const github = within(lista).getByRole('link', { name: /github/i })
    expect(github).toHaveAttribute('href', 'https://github.com/Ikeer3')
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
    expect(within(lista).getByRole('link', { name: /correo/i })).not.toHaveAttribute(
      'target',
    )
  })

  it('las cifras de las estadísticas se alinean arriba, aunque la etiqueta ocupe dos líneas', () => {
    render(<HomePage />)
    const tarjetas = screen
      .getByRole('group', { name: 'Datos destacados' })
      .querySelectorAll('dl > div')
    expect(tarjetas).toHaveLength(4)
    for (const tarjeta of tarjetas) {
      // Columna invertida con el contenido pegado arriba: la cifra queda siempre en la misma línea
      expect(tarjeta).toHaveClass('flex-col-reverse', 'justify-end')
    }
  })
})
