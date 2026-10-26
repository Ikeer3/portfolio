import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { contentEs } from '@/content/es'
import { ContactPage } from './ContactPage'

async function rellenar(usuario: ReturnType<typeof userEvent.setup>) {
  await usuario.type(screen.getByLabelText('Nombre'), 'Ana')
  await usuario.type(screen.getByLabelText('Correo electrónico'), 'ana@ejemplo.com')
  await usuario.type(screen.getByLabelText('Asunto'), 'Prácticas')
  await usuario.type(screen.getByLabelText('Mensaje'), 'Me gustaría hablar contigo.')
}

describe('ContactPage', () => {
  it('muestra una tarjeta por cada enlace del array', () => {
    render(<ContactPage />)
    const tarjetas = within(screen.getByRole('list', { name: 'Formas de contacto' }))
    expect(tarjetas.getAllByRole('link')).toHaveLength(contentEs.links.length)
    expect(tarjetas.getByRole('link', { name: /correo/i })).toHaveAttribute(
      'href',
      'mailto:ikersantosinsua@gmail.com',
    )
  })

  it('el formulario está completo: cuatro campos con etiqueta y botón de envío', () => {
    render(<ContactPage />)
    for (const etiqueta of ['Nombre', 'Correo electrónico', 'Asunto', 'Mensaje']) {
      expect(screen.getByLabelText(etiqueta)).toBeInTheDocument()
    }
    expect(screen.getByRole('button', { name: 'Enviar mensaje' })).toBeInTheDocument()
  })

  it('al enviar vacío muestra un error por campo con texto, marca los campos y enfoca el primero', async () => {
    const usuario = userEvent.setup()
    render(<ContactPage />)
    await usuario.click(screen.getByRole('button', { name: 'Enviar mensaje' }))
    expect(screen.getAllByText('Este campo es obligatorio.')).toHaveLength(4)
    const nombre = screen.getByLabelText('Nombre')
    expect(nombre).toHaveAttribute('aria-invalid', 'true')
    expect(nombre).toHaveAccessibleDescription(/obligatorio/)
    expect(nombre).toHaveFocus()
  })

  it('valida el correo y la longitud del mensaje', async () => {
    const usuario = userEvent.setup()
    render(<ContactPage />)
    await usuario.type(screen.getByLabelText('Nombre'), 'Ana')
    await usuario.type(screen.getByLabelText('Correo electrónico'), 'ana@')
    await usuario.type(screen.getByLabelText('Asunto'), 'Hola')
    await usuario.type(screen.getByLabelText('Mensaje'), 'Corto')
    await usuario.click(screen.getByRole('button', { name: 'Enviar mensaje' }))
    expect(screen.getByText(/correo válido/)).toBeInTheDocument()
    expect(screen.getByText(/al menos 10 caracteres/)).toBeInTheDocument()
  })

  it('el error desaparece en cuanto el campo se corrige', async () => {
    const usuario = userEvent.setup()
    render(<ContactPage />)
    await usuario.click(screen.getByRole('button', { name: 'Enviar mensaje' }))
    await usuario.type(screen.getByLabelText('Nombre'), 'Ana')
    expect(screen.getByLabelText('Nombre')).not.toHaveAttribute('aria-invalid')
    expect(screen.getAllByText('Este campo es obligatorio.')).toHaveLength(3)
  })

  it('con datos válidos no envía nada: muestra el aviso «Próximamente»', async () => {
    const usuario = userEvent.setup()
    render(<ContactPage />)
    await rellenar(usuario)
    await usuario.click(screen.getByRole('button', { name: 'Enviar mensaje' }))
    const aviso = await screen.findByRole('status')
    expect(aviso).toHaveTextContent(/Próximamente/)
    expect(aviso).toHaveTextContent('ikersantosinsua@gmail.com')
    expect(screen.queryByText('Este campo es obligatorio.')).not.toBeInTheDocument()
  })
})
