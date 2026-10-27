import { useId, useRef, useState, type ChangeEvent, type FocusEvent } from 'react'
import { ContactIcon } from '@/components/ContactIcon'
import { PageHeader } from '@/components/PageHeader'
import { SmartLink } from '@/components/SmartLink'
import { useContent, useUi } from '@/content'
import { sendContactMessage } from '@/lib/contact/send'
import {
  validateContact,
  type ContactErrors,
  type ContactFormValues,
} from '@/lib/contact/validate'

type Campo = keyof ContactFormValues
const CAMPOS: readonly Campo[] = ['nombre', 'correo', 'asunto', 'mensaje']
const VACIO: ContactFormValues = { nombre: '', correo: '', asunto: '', mensaje: '' }

const CONTROL =
  'w-full rounded border bg-bg px-3 py-2 text-fg placeholder:text-fg-muted focus-visible:outline-offset-0'

function ContactForm() {
  const ui = useUi().pages.contact
  const { links } = useContent()
  const correo = links.find((enlace) => enlace.id === 'email')?.valor ?? ''
  const base = useId()
  const refs = useRef<
    Partial<Record<Campo, HTMLInputElement | HTMLTextAreaElement | null>>
  >({})
  const [valores, setValores] = useState<ContactFormValues>(VACIO)
  const [errores, setErrores] = useState<ContactErrors>({})
  const [aviso, setAviso] = useState(false)

  const alCambiar = (evento: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const campo = evento.target.name as Campo
    setValores((previos) => ({ ...previos, [campo]: evento.target.value }))
    setAviso(false)
    // Una vez mostrado un error, se corrige en cuanto el campo vuelve a ser válido
    if (errores[campo]) {
      const nuevos = validateContact({ ...valores, [campo]: evento.target.value })
      setErrores((previos) => {
        const { [campo]: _quitado, ...resto } = previos
        void _quitado
        return nuevos[campo] ? { ...resto, [campo]: nuevos[campo] } : resto
      })
    }
  }

  const alSalir = (evento: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const campo = evento.target.name as Campo
    const error = validateContact(valores)[campo]
    if (error && evento.target.value !== '')
      setErrores((previos) => ({ ...previos, [campo]: error }))
  }

  const alEnviar = async (evento: React.SyntheticEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const encontrados = validateContact(valores)
    setErrores(encontrados)
    const primero = CAMPOS.find((campo) => encontrados[campo])
    if (primero) {
      refs.current[primero]?.focus()
      setAviso(false)
      return
    }
    await sendContactMessage(valores)
    setAviso(true)
  }

  return (
    <form noValidate onSubmit={alEnviar} className="flex flex-col gap-4">
      {CAMPOS.map((campo) => {
        const id = `${base}-${campo}`
        const codigo = errores[campo]
        const compartido = {
          id,
          name: campo,
          value: valores[campo],
          onChange: alCambiar,
          onBlur: alSalir,
          'aria-invalid': codigo ? true : undefined,
          'aria-describedby': codigo ? `${id}-error` : undefined,
          className: `${CONTROL} ${codigo ? 'border-danger' : 'border-line'}`,
        }
        return (
          <div key={campo} className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-[13px] font-semibold">
              {ui.labels[campo]}
            </label>
            {campo === 'mensaje' ? (
              <textarea
                {...compartido}
                rows={5}
                ref={(el) => {
                  refs.current[campo] = el
                }}
              />
            ) : (
              <input
                {...compartido}
                type={campo === 'correo' ? 'email' : 'text'}
                autoComplete={
                  campo === 'correo' ? 'email' : campo === 'nombre' ? 'name' : 'off'
                }
                ref={(el) => {
                  refs.current[campo] = el
                }}
              />
            )}
            {codigo && (
              <p id={`${id}-error`} className="text-xs font-semibold text-danger">
                <span aria-hidden="true">✕ </span>
                {ui.errors[codigo]}
              </p>
            )}
          </div>
        )
      })}

      <button
        type="submit"
        className="w-fit rounded bg-accent px-5 py-2.5 font-semibold text-bg hover:opacity-90"
      >
        {ui.submit}
      </button>
      <p role="status" className="text-[13px] text-fg-muted">
        {aviso && ui.soon(correo)}
      </p>
    </form>
  )
}

export function ContactPage() {
  const ui = useUi().pages.contact
  const { links } = useContent()

  return (
    <div className="flex max-w-5xl flex-col gap-8">
      <PageHeader id="contact" />
      <p className="text-fg-muted">{ui.intro}</p>

      <ul aria-label={ui.cardsLabel} className="grid gap-4 sm:grid-cols-2">
        {links.map((enlace) => (
          <li key={enlace.id}>
            <SmartLink
              href={enlace.url}
              externo={enlace.externo}
              className="flex items-center gap-4 rounded-md border border-line bg-sidebar p-4 hover:bg-hover"
            >
              <ContactIcon icono={enlace.icono} className="size-7 shrink-0 text-accent" />
              <span className="flex min-w-0 flex-col">
                <span className="font-semibold">{enlace.etiqueta}</span>
                <span className="truncate text-xs text-fg-muted">{enlace.valor}</span>
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>

      <section aria-labelledby="formulario" className="flex max-w-xl flex-col gap-4">
        <h2 id="formulario" className="font-display text-title">
          {ui.formTitle}
        </h2>
        <ContactForm />
      </section>
    </div>
  )
}
