import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FILES } from '@/content/files'
import { FileIcon } from './FileIcon'

describe('FileIcon', () => {
  it('cada tipo de archivo del portfolio y el PDF tienen su propio icono decorativo', () => {
    const tipos = [...new Set(FILES.map((archivo) => archivo.tipo)), 'pdf' as const]
    const fuentes = tipos.map((tipo) => {
      const { container } = render(<FileIcon tipo={tipo} />)
      const imagen = container.querySelector('img')
      expect(imagen).not.toBeNull()
      expect(imagen).toHaveAttribute('alt', '')
      return imagen?.getAttribute('src')
    })
    expect(fuentes.every(Boolean)).toBe(true)
    expect(new Set(fuentes).size).toBe(tipos.length)
  })
})
