import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { contentEs } from '@/content/es'
import { ProjectsPage } from './ProjectsPage'

describe('ProjectsPage', () => {
  it('muestra una tarjeta por proyecto con categoría, título y tecnologías', () => {
    render(<ProjectsPage />)
    const tarjetas = screen.getAllByRole('article')
    expect(tarjetas).toHaveLength(contentEs.projects.length)
    const formula1 = screen.getByRole('article', { name: /simulador de carreras/i })
    expect(within(formula1).getByText('Java · POO')).toBeInTheDocument()
    expect(within(formula1).getByRole('list', { name: 'Tecnologías' })).toHaveTextContent(
      'Arrays',
    )
  })

  it('indica la parte que hizo Iker en los proyectos de grupo', () => {
    render(<ProjectsPage />)
    const flota = screen.getByRole('article', { name: /hundir la flota/i })
    expect(within(flota).getByText(/Mi parte: la clase Disparos/)).toBeInTheDocument()
  })

  it('cada repositorio se enlaza en pestaña nueva con rel seguro y un nombre único', () => {
    render(<ProjectsPage />)
    const repos = screen.getAllByRole('link', { name: /ver repositorio/i })
    expect(repos).toHaveLength(3)
    expect(new Set(repos.map((enlace) => enlace.textContent)).size).toBe(3)
    for (const repo of repos) {
      expect(repo).toHaveAttribute('target', '_blank')
      expect(repo).toHaveAttribute('rel', 'noopener noreferrer')
      expect(repo.getAttribute('href')).toContain('github.com/Ikeer3/')
    }
    expect(
      screen.getByRole('link', { name: /ver repositorio.*hundir la flota/i }),
    ).toHaveAttribute('href', 'https://github.com/Ikeer3/hundirFlota')
  })

  it('la vista previa no carga nada hasta que se pide y se puede ocultar', async () => {
    const usuario = userEvent.setup()
    render(<ProjectsPage />)
    const moodboard = screen.getByRole('article', { name: /moodboard/i })
    expect(moodboard.querySelector('iframe')).toBeNull()

    await usuario.click(
      within(moodboard).getByRole('button', { name: 'Ver vista previa' }),
    )
    const marco = moodboard.querySelector('iframe')
    expect(marco).toHaveAttribute('src', 'https://moodboardiker.pages.dev/')
    expect(marco).toHaveAttribute('title', 'Vista previa del moodboard')
    expect(within(moodboard).getByText('http://localhost:5173/')).toBeInTheDocument()
    expect(
      within(moodboard).getByRole('link', { name: /abrir en pestaña nueva/i }),
    ).toHaveAttribute('href', 'https://moodboardiker.pages.dev/')

    await usuario.click(
      within(moodboard).getByRole('button', { name: 'Ocultar vista previa' }),
    )
    expect(moodboard.querySelector('iframe')).toBeNull()
  })

  it('el marco aísla la web mostrada con sandbox y sin referrer', async () => {
    const usuario = userEvent.setup()
    render(<ProjectsPage />)
    const blog = screen.getByRole('article', { name: /contribuciones a wordpress/i })
    await usuario.click(within(blog).getByRole('button', { name: 'Ver vista previa' }))
    const marco = blog.querySelector('iframe')
    expect(marco?.getAttribute('sandbox')).not.toContain('allow-top-navigation')
    expect(marco).toHaveAttribute('referrerpolicy', 'no-referrer')
  })

  it('solo los proyectos con vista previa ofrecen el botón', () => {
    render(<ProjectsPage />)
    expect(screen.getAllByRole('button', { name: 'Ver vista previa' })).toHaveLength(2)
  })
})
