import { Chip } from '@/components/Chip'
import { ContactIcon } from '@/components/ContactIcon'
import { PageHeader } from '@/components/PageHeader'
import { RichTextView } from '@/components/RichTextView'
import { SmartLink } from '@/components/SmartLink'
import { TypingText } from '@/components/TypingText'
import { useContent, useUi } from '@/content'
import type { FileId } from '@/content/files'
import { useWorkspaceStore } from '@/store/workspace'

const BOTON = 'rounded px-5 py-2.5 font-semibold border border-line hover:bg-hover'
const BOTON_PRINCIPAL =
  'rounded px-5 py-2.5 font-semibold bg-accent text-bg hover:opacity-90'

export function HomePage() {
  const ui = useUi().pages.home
  const { profile, links } = useContent()
  const openFile = useWorkspaceStore((estado) => estado.openFile)

  const acciones: ReadonlyArray<{ id: FileId; etiqueta: string }> = [
    { id: 'projects', etiqueta: ui.projects },
    { id: 'about', etiqueta: ui.about },
    { id: 'contact', etiqueta: ui.contact },
  ]

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <PageHeader id="home">
        {profile.nombre} <span className="text-surname">{profile.apellido}</span>
      </PageHeader>

      <ul aria-label={ui.rolesLabel} className="flex flex-wrap gap-2">
        {profile.roles.map((rol) => (
          <li key={rol}>
            <Chip>{rol}</Chip>
          </li>
        ))}
      </ul>

      <TypingText texto={profile.eslogan} className="min-h-[1.75em] text-xl text-fg" />

      <p className="max-w-2xl text-fg-muted">
        <RichTextView texto={profile.introduccion} />
      </p>

      <div className="flex flex-wrap gap-3">
        {acciones.map(({ id, etiqueta }, i) => (
          <button
            key={id}
            type="button"
            onClick={() => openFile(id)}
            className={i === 0 ? BOTON_PRINCIPAL : BOTON}
          >
            {etiqueta}
          </button>
        ))}
      </div>

      <div role="group" aria-label={ui.statsLabel}>
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {profile.estadisticas.map((dato) => (
            <div
              key={dato.etiqueta}
              className="flex flex-col-reverse gap-1 rounded border border-line bg-sidebar p-4"
            >
              <dt className="text-xs text-fg-muted">{dato.etiqueta}</dt>
              <dd className="font-display text-title text-accent">{dato.valor}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ul aria-label={ui.linksLabel} className="flex flex-wrap gap-3">
        {links.map((enlace) => (
          <li key={enlace.id}>
            <SmartLink
              href={enlace.url}
              externo={enlace.externo}
              className="inline-flex items-center gap-2 rounded border border-line px-3 py-2 text-[13px] hover:bg-hover"
            >
              <ContactIcon icono={enlace.icono} className="size-4" />
              {enlace.etiqueta}
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
