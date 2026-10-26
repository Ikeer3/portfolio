export interface ContactFormValues {
  nombre: string
  correo: string
  asunto: string
  mensaje: string
}

export type ContactErrorCode = 'required' | 'email' | 'tooShort'
export type ContactErrors = Partial<Record<keyof ContactFormValues, ContactErrorCode>>

export const MIN_MESSAGE_LENGTH = 10
const FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Devuelve un código de error por cada campo inválido (vacío si todo está bien)
export function validateContact(valores: ContactFormValues): ContactErrors {
  const errores: ContactErrors = {}
  if (!valores.nombre.trim()) errores.nombre = 'required'
  if (!valores.correo.trim()) errores.correo = 'required'
  else if (!FORMATO_CORREO.test(valores.correo.trim())) errores.correo = 'email'
  if (!valores.asunto.trim()) errores.asunto = 'required'
  if (!valores.mensaje.trim()) errores.mensaje = 'required'
  else if (valores.mensaje.trim().length < MIN_MESSAGE_LENGTH)
    errores.mensaje = 'tooShort'
  return errores
}
