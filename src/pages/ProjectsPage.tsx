import { useState } from 'react'
import { BrowserFrame } from '@/components/BrowserFrame'
import { Chip } from '@/components/Chip'
import { Icon } from '@/components/Icon'
import { PageHeader } from '@/components/PageHeader'
import { SmartLink } from '@/components/SmartLink'
import { useContent, useUi, type Project } from '@/content'

function ProjectCard({ proyecto }: { proyecto: Project }) {
  const ui = useUi().pages.projects
  const [vistaAbierta, setVistaAbierta] = useState(false)
  const idVista = `vista-${proyecto.id}`
  const idTitulo = `titulo-${proyecto.id}`

  return (
    <article
      aria-labelledby={idTitulo}
      className="flex flex-col gap-4 rounded-md border border-line bg-sidebar p-5"
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold tracking-wider text-accent uppercase">
          {proyecto.categoria}
        </p>
        <h2 id={idTitulo} className="font-display text-title">
          {proyecto.titulo}
        </h2>
        {proyecto.subtitulo && (
          <p className="text-xs text-fg-muted">{proyecto.subtitulo}</p>
        )}
      </div>

      <p className="text-fg">{proyecto.descripcion}</p>
      {proyecto.rol && (
        <p className="border-l-2 border-accent pl-3 text-[13px] text-fg-muted">
          {proyecto.rol}
        </p>
      )}

      <ul aria-label={ui.technologies} className="flex flex-wrap gap-2">
        {proyecto.tecnologias.map((tecnologia) => (
          <li key={tecnologia}>
            <Chip>{tecnologia}</Chip>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-3">
        {proyecto.enlaces.map((enlace) => (
          <SmartLink
            key={enlace.url}
            href={enlace.url}
            externo
            className="inline-flex items-center gap-1.5 rounded border border-line px-3 py-1.5 text-[13px] hover:bg-hover"
          >
            {enlace.etiqueta}
            <Icon name="external" className="size-3.5" />
          </SmartLink>
        ))}
        {proyecto.vistaPrevia && (
          <button
            type="button"
            aria-expanded={vistaAbierta}
            aria-controls={idVista}
            onClick={() => setVistaAbierta((previo) => !previo)}
            className="rounded bg-accent px-3 py-1.5 text-[13px] font-semibold text-bg hover:opacity-90"
          >
            {vistaAbierta ? ui.hidePreview : ui.showPreview}
          </button>
        )}
      </div>

      {proyecto.vistaPrevia && (
        <div id={idVista} hidden={!vistaAbierta}>
          {vistaAbierta && <BrowserFrame {...proyecto.vistaPrevia} />}
        </div>
      )}
    </article>
  )
}

export function ProjectsPage() {
  const ui = useUi().pages.projects
  const { projects } = useContent()

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <PageHeader id="projects" />
      <p className="text-fg-muted">{ui.intro}</p>
      <div className="flex flex-col gap-6">
        {projects.map((proyecto) => (
          <ProjectCard key={proyecto.id} proyecto={proyecto} />
        ))}
      </div>
    </div>
  )
}
