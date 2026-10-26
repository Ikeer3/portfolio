import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useWorkspaceStore } from '@/store/workspace'
import { AboutPage } from './AboutPage'

describe('AboutPage', () => {
  beforeEach(() => {
    useWorkspaceStore.setState({ tabs: ['about'], activeId: 'about' })
  })

  it('muestra la presentación y la caja «Enfoque actual»', () => {
    render(<AboutPage />)
    expect(
      screen.getByText(/Empecé mi camino en el mundo audiovisual/),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Enfoque actual' })).toBeInTheDocument()
    expect(
      screen.getByText(/Aprender TypeScript, JavaScript y React Native/),
    ).toBeInTheDocument()
  })

  it('muestra la formación de DAM con su periodo y abre la trayectoria completa', async () => {
    const usuario = userEvent.setup()
    render(<AboutPage />)
    expect(
      screen.getByText(/Desarrollo de Aplicaciones Multiplataforma \(DAM\)/),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Liceo La Paz, A Coruña · 09\/2025 – Presente/),
    ).toBeInTheDocument()
    await usuario.click(
      screen.getByRole('button', { name: 'Ver mi trayectoria completa' }),
    )
    expect(useWorkspaceStore.getState().activeId).toBe('experience')
  })
})
