import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CertificateViewer } from './CertificateViewer'

describe('CertificateViewer', () => {
  it('muestra la imagen con su texto alternativo descriptivo y sus dimensiones reservadas', () => {
    render(<CertificateViewer id="certificate:generative-ai-foundations" />)
    const imagen = screen.getByRole('img', { name: /Generative AI Foundations/ })
    expect(imagen).toHaveAttribute('src', '/certificates/generative-ai-foundations.webp')
    expect(imagen).toHaveAttribute('width', '1600')
    expect(imagen).toHaveAttribute('height', '1237')
    expect(imagen.getAttribute('alt')).toMatch(/22 de mayo de 2026/)
  })

  it('indica el nombre, la entidad y la fecha de emisión', () => {
    render(<CertificateViewer id="certificate:wordpress-credits" />)
    expect(screen.getByText('WordPress Credits Certificate')).toBeInTheDocument()
    expect(screen.getByText(/WordPress · Emitido el 01\/10\/2026/)).toBeInTheDocument()
  })

  it('permite descargar el PDF original y abrirlo en una pestaña nueva', () => {
    render(<CertificateViewer id="certificate:wordpress-credits" />)
    const barra = within(screen.getByRole('group', { name: 'Acciones del certificado' }))
    const descarga = barra.getByRole('link', { name: /descargar pdf/i })
    expect(descarga).toHaveAttribute('href', '/certificates/wordpress-credits.pdf')
    expect(descarga).toHaveAttribute('download', 'wordpress-credits.pdf')
    const abrir = barra.getByRole('link', { name: /abrir pdf en pestaña nueva/i })
    expect(abrir).toHaveAttribute('target', '_blank')
    expect(abrir).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('ofrece verificar la credencial solo si el certificado la tiene', () => {
    const { unmount } = render(
      <CertificateViewer id="certificate:generative-ai-foundations" />,
    )
    const verificar = screen.getByRole('link', { name: /verificar credencial/i })
    expect(verificar).toHaveAttribute('href', 'https://verify.certiport.com')
    expect(verificar).toHaveTextContent('w9ahh-H9ob')
    unmount()
    render(<CertificateViewer id="certificate:wordpress-credits" />)
    expect(
      screen.queryByRole('link', { name: /verificar credencial/i }),
    ).not.toBeInTheDocument()
  })

  it('alterna entre ajustar al ancho y tamaño real', async () => {
    const usuario = userEvent.setup()
    render(<CertificateViewer id="certificate:wordpress-credits" />)
    const imagen = screen.getByRole('img')
    expect(imagen).toHaveClass('w-full')
    const boton = screen.getByRole('button', { name: 'Ver a tamaño real' })
    expect(boton).toHaveAttribute('aria-pressed', 'false')
    await usuario.click(boton)
    expect(screen.getByRole('button', { name: 'Ajustar al ancho' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(imagen).toHaveClass('max-w-none')
    expect(imagen).toHaveStyle({ width: '1600px' })
  })

  it('no muestra nada si el certificado no existe', () => {
    const { container } = render(<CertificateViewer id="certificate:inexistente" />)
    expect(container).toBeEmptyDOMElement()
  })
})
