import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { contentEs } from '@/content/es'
import { ReadmePage } from './ReadmePage'

describe('ReadmePage', () => {
  it('muestra el nombre, el titular y las etiquetas', () => {
    render(<ReadmePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Iker Santos')
    expect(screen.getByText(contentEs.profile.titularReadme)).toBeInTheDocument()
    expect(screen.getByText('A Coruña, España')).toBeInTheDocument()
    expect(screen.getByText('Estudiante de DAM')).toBeInTheDocument()
  })

  it('tiene las secciones Sobre mí, Stack y Contacto', () => {
    render(<ReadmePage />)
    for (const nombre of ['Sobre mí', 'Stack', 'Contacto']) {
      expect(screen.getByRole('region', { name: nombre })).toBeInTheDocument()
    }
  })

  it('el stack se agrupa por categorías con las mismas tecnologías de Habilidades', () => {
    render(<ReadmePage />)
    const stack = screen.getByRole('region', { name: 'Stack' })
    const total = [
      ...contentEs.skills.principales,
      ...contentEs.skills.complementarias,
    ].flatMap((c) => c.habilidades).length
    expect(stack.querySelectorAll('code')).toHaveLength(total)
    expect(within(stack).getByText('Bases de datos')).toBeInTheDocument()
  })

  it('los enlaces de contacto salen del array único', () => {
    render(<ReadmePage />)
    const contacto = screen.getByRole('region', { name: 'Contacto' })
    expect(within(contacto).getAllByRole('link')).toHaveLength(contentEs.links.length)
  })
})
