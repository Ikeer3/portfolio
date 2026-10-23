import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('muestra el nombre del portfolio', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /iker santos/i })).toBeInTheDocument()
  })
})
