import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { contentEs } from '@/content/es'
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

  it('muestra las certificaciones', () => {
    render(<ExperiencePage />)
    const certificaciones = screen.getByRole('region', { name: 'Certificaciones' })
    expect(within(certificaciones).getAllByRole('listitem')).toHaveLength(2)
    expect(
      within(certificaciones).getByText('Generative AI Foundations'),
    ).toBeInTheDocument()
  })
})
