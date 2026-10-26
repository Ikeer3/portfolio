import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { contentEs } from '@/content/es'
import { SkillsPage } from './SkillsPage'

const { skills } = contentEs
const todas = [...skills.principales, ...skills.complementarias].flatMap(
  (c) => c.habilidades,
)

describe('SkillsPage', () => {
  it('muestra todas las habilidades, cada una con su nivel escrito en texto', () => {
    render(<SkillsPage />)
    const filas = screen
      .getAllByRole('listitem')
      .filter((fila) => fila.className.includes('justify-between'))
    expect(filas).toHaveLength(todas.length)
    for (const habilidad of todas) {
      const fila = screen.getByText(habilidad.nombre).closest('li') as HTMLElement
      expect(within(fila).getByText(skills.niveles[habilidad.nivel])).toBeInTheDocument()
    }
  })

  it('no comunica ningún nivel con porcentajes', () => {
    render(<SkillsPage />)
    expect(screen.queryByText(/%/)).not.toBeInTheDocument()
  })

  it('los iconos de nivel son decorativos, el nivel va siempre en texto', () => {
    const { container } = render(<SkillsPage />)
    const iconos = container.querySelectorAll('li svg')
    expect(iconos.length).toBeGreaterThan(todas.length)
    for (const icono of iconos) expect(icono).toHaveAttribute('aria-hidden', 'true')
  })

  it('agrupa por categorías con los niveles acordados', () => {
    render(<SkillsPage />)
    const datos = screen.getByRole('region', { name: 'Bases de datos' })
    expect(
      within(datos.querySelector('li:nth-child(1)') as HTMLElement).getByText(
        'Uso a diario',
      ),
    ).toBeInTheDocument()
    expect(within(datos).getByText('PostgreSQL').closest('li')).toHaveTextContent(
      'Aprendiendo',
    )
  })

  it('pone multimedia y marketing en una sección aparte, con todo con soltura', () => {
    render(<SkillsPage />)
    const seccion = screen.getByRole('region', { name: 'Multimedia y marketing' })
    const niveles = within(seccion)
      .getAllByRole('listitem')
      .map((fila) => fila.textContent)
    expect(niveles.every((texto) => texto?.includes('Con soltura'))).toBe(true)
    expect(within(seccion).getByText('Adobe Photoshop')).toBeInTheDocument()
    expect(within(seccion).getByText('Metricool')).toBeInTheDocument()
  })

  it('no muestra las tecnologías con las que se hizo el portfolio', () => {
    render(<SkillsPage />)
    for (const excluida of ['Vite', 'Tailwind', 'Zustand', 'Vitest']) {
      expect(screen.queryByText(excluida)).not.toBeInTheDocument()
    }
  })
})
