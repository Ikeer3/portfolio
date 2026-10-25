import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { WindowButtons } from './WindowButtons'

describe('WindowButtons', () => {
  it('muestra cerrar, minimizar y pantalla completa con sus colores', () => {
    render(<WindowButtons />)
    const colores = {
      Cerrar: 'rgb(255, 95, 87)',
      Minimizar: 'rgb(254, 188, 46)',
      'Pantalla completa': 'rgb(40, 200, 64)',
    }
    for (const [nombre, color] of Object.entries(colores)) {
      const boton = screen.getByRole('button', { name: nombre })
      expect(boton).toHaveStyle({ backgroundColor: color })
      expect(boton).toHaveAttribute('aria-disabled', 'true')
    }
  })

  it('agrupa los botones bajo una etiqueta accesible', () => {
    render(<WindowButtons />)
    expect(
      screen.getByRole('group', { name: 'Controles de ventana' }),
    ).toBeInTheDocument()
  })
})
