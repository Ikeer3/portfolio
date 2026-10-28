import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Chip } from './Chip'

describe('Chip', () => {
  it('tiene borde de acento atenuado que se enciende al pasar el cursor', () => {
    render(<Chip>Java</Chip>)
    const chip = screen.getByText('Java')
    expect(chip).toHaveClass('border-accent/40', 'hover:border-accent', 'hover:bg-hover')
  })

  it('no anima con «reducir movimiento»', () => {
    render(<Chip>Java</Chip>)
    expect(screen.getByText('Java')).toHaveClass('motion-reduce:transition-none')
  })
})
