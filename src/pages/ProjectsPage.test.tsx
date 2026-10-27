import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { contentEs } from '@/content/es'
import { useWorkspaceStore } from '@/store/workspace'
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

  it('«Abrir vista previa» abre una pestaña del editor y no carga nada dentro de la tarjeta', async () => {
    const usuario = userEvent.setup()
    useWorkspaceStore.setState({ tabs: ['projects'], activeId: 'projects' })
    const { container } = render(<ProjectsPage />)
    expect(container.querySelector('iframe')).toBeNull()
    const moodboard = screen.getByRole('article', { name: /moodboard/i })
    await usuario.click(
      within(moodboard).getByRole('button', { name: /abrir vista previa/i }),
    )
    expect(useWorkspaceStore.getState().tabs).toEqual(['projects', 'preview:moodboard'])
    expect(useWorkspaceStore.getState().activeId).toBe('preview:moodboard')
    expect(container.querySelector('iframe')).toBeNull()
  })

  it('pulsarlo otra vez no duplica la pestaña: solo la activa', async () => {
    const usuario = userEvent.setup()
    useWorkspaceStore.setState({ tabs: ['projects'], activeId: 'projects' })
    render(<ProjectsPage />)
    const boton = screen.getByRole('button', { name: /abrir vista previa.*moodboard/i })
    await usuario.click(boton)
    useWorkspaceStore.setState({ activeId: 'projects' })
    await usuario.click(boton)
    expect(useWorkspaceStore.getState().tabs).toEqual(['projects', 'preview:moodboard'])
    expect(useWorkspaceStore.getState().activeId).toBe('preview:moodboard')
  })

  it('solo los proyectos con vista previa ofrecen el botón', () => {
    render(<ProjectsPage />)
    expect(screen.getAllByRole('button', { name: /abrir vista previa/i })).toHaveLength(2)
  })
})
