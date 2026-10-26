import { describe, expect, it } from 'vitest'
import { sendContactMessage } from './send'
import { validateContact, type ContactFormValues } from './validate'

const valido: ContactFormValues = {
  nombre: 'Ana',
  correo: 'ana@ejemplo.com',
  asunto: 'Prácticas',
  mensaje: 'Me gustaría hablar contigo.',
}

describe('validateContact', () => {
  it('acepta un formulario completo', () => {
    expect(validateContact(valido)).toEqual({})
  })

  it('marca como obligatorios los campos vacíos o con solo espacios', () => {
    expect(
      validateContact({ nombre: ' ', correo: '', asunto: '', mensaje: '   ' }),
    ).toEqual({
      nombre: 'required',
      correo: 'required',
      asunto: 'required',
      mensaje: 'required',
    })
  })

  it('rechaza correos mal formados', () => {
    for (const correo of ['ana', 'ana@', 'ana@ejemplo', 'ana @ejemplo.com']) {
      expect(validateContact({ ...valido, correo }).correo).toBe('email')
    }
  })

  it('exige un mensaje de al menos 10 caracteres', () => {
    expect(validateContact({ ...valido, mensaje: 'Hola' }).mensaje).toBe('tooShort')
  })
})

describe('sendContactMessage', () => {
  it('todavía no envía nada y lo indica con un resultado explícito', async () => {
    await expect(sendContactMessage(valido)).resolves.toEqual({
      ok: false,
      motivo: 'not-configured',
    })
  })
})
