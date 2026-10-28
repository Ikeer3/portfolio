import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { contentEs } from '@/content/es'
import { useWorkspaceStore } from '@/store/workspace'
import { ExperiencePage } from './ExperiencePage'

describe('ExperiencePage', () => {
  it('agrupa los hitos en formación, colaboraciones y experiencia', () => {
    render(<ExperiencePage />)
    expect(screen.getByRole('region', { name: 'Formación' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Colaboraciones' })).toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: 'Experiencia laboral' }),
    ).toBeInTheDocument()
    const total = contentEs.experience.hitos.length
    const items = screen.getAllByRole('heading', { level: 3 })
    expect(items).toHaveLength(total)
  })

  it('muestra los periodos con el formato del CV', () => {
    render(<ExperiencePage />)
    const formacion = screen.getByRole('region', { name: 'Formación' })
    expect(within(formacion).getByText('09/2025 – Presente')).toBeInTheDocument()
    expect(within(formacion).getByText('09/2020 – 09/2024')).toBeInTheDocument()
    const experiencia = screen.getByRole('region', { name: 'Experiencia laboral' })
    expect(within(experiencia).getByText('01/2024 – 04/2025')).toBeInTheDocument()
  })

  it('lista los detalles de cada puesto', () => {
    render(<ExperiencePage />)
    expect(
      screen.getByText(
        /Control de gastos diarios, pagos y gestión del servicio de catering/,
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Más de 30 fotografías originales aprobadas/),
    ).toBeInTheDocument()
  })

  it('muestra cada certificación como tarjeta con miniatura, entidad y fecha de emisión', () => {
    render(<ExperiencePage />)
    const certificaciones = screen.getByRole('region', { name: 'Certificaciones' })
    const tarjetas = within(certificaciones).getAllByRole('button')
    expect(tarjetas).toHaveLength(2)
    const pearson = within(certificaciones).getByRole('button', {
      name: /Generative AI Foundations/,
    })
    expect(pearson).toHaveTextContent('Pearson · Emitido el 22/05/2026')
    expect(pearson.querySelector('img')).toHaveAttribute(
      'src',
      '/certificates/generative-ai-foundations-miniatura.webp',
    )
    expect(pearson.querySelector('img')).toHaveAttribute('alt', '')
    expect(pearson).toHaveTextContent('Ver certificado')
  })

  it('pulsar una tarjeta abre el visor de ese certificado en una pestaña', async () => {
    const usuario = userEvent.setup()
    useWorkspaceStore.setState({ tabs: ['experience'], activeId: 'experience' })
    render(<ExperiencePage />)
    await usuario.click(
      screen.getByRole('button', { name: /WordPress Credits Certificate/ }),
    )
    expect(useWorkspaceStore.getState().tabs).toEqual([
      'experience',
      'certificate:wordpress-credits',
    ])
    expect(useWorkspaceStore.getState().activeId).toBe('certificate:wordpress-credits')
  })

  it('pulsarla de nuevo no duplica la pestaña', async () => {
    const usuario = userEvent.setup()
    useWorkspaceStore.setState({ tabs: ['experience'], activeId: 'experience' })
    render(<ExperiencePage />)
    const tarjeta = screen.getByRole('button', { name: /Generative AI Foundations/ })
    await usuario.click(tarjeta)
    useWorkspaceStore.setState({ activeId: 'experience' })
    await usuario.click(tarjeta)
    expect(useWorkspaceStore.getState().tabs).toEqual([
      'experience',
      'certificate:generative-ai-foundations',
    ])
  })

  it('las colaboraciones aparecen debajo de la experiencia laboral', () => {
    render(<ExperiencePage />)
    const titulos = screen
      .getAllByRole('heading', { level: 2 })
      .map((titulo) => titulo.textContent)
    expect(titulos).toEqual([
      'Formación',
      'Experiencia laboral',
      'Colaboraciones',
      'Certificaciones',
    ])
  })
})
