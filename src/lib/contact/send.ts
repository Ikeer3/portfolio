import type { ContactFormValues } from './validate'

export type SendResult =
  { ok: true } | { ok: false; motivo: 'not-configured' | 'network' }

// Único punto de envío del formulario. Todavía no hay servicio conectado: cuando lo haya,
// basta con sustituir el cuerpo de esta función (por ejemplo, un fetch a un endpoint)
// sin tocar la interfaz.
export async function sendContactMessage(
  valores: ContactFormValues,
): Promise<SendResult> {
  void valores
  return { ok: false, motivo: 'not-configured' }
}
