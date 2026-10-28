import { PageHeader } from '@/components/PageHeader'
import { useContent, useUi, type Milestone, type MilestoneKind } from '@/content'
import { formatPeriod } from '@/lib/period'

const ORDEN: readonly MilestoneKind[] = ['formacion', 'experiencia', 'colaboracion']

function MilestoneItem({ hito }: { hito: Milestone }) {
  const { experience } = useContent()
  return (
    <li className="relative pb-8 pl-6 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-accent bg-bg"
      />
      <p className="text-xs text-accent">
        {formatPeriod(hito.desde, hito.hasta, experience.presente)}
      </p>
      <h3 className="mt-1 font-semibold text-fg">{hito.titulo}</h3>
      <p className="text-[13px] text-fg-muted">{hito.lugar}</p>
      {hito.detalles.length > 0 && (
        <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-[13px] text-fg">
          {hito.detalles.map((detalle) => (
            <li key={detalle}>{detalle}</li>
          ))}
        </ul>
      )}
    </li>
  )
}

export function ExperiencePage() {
  const ui = useUi().pages.experience
  const { experience } = useContent()

  return (
    <div className="flex max-w-5xl flex-col gap-10">
      <PageHeader id="experience" />
      <p className="text-fg-muted">{ui.intro}</p>

      {ORDEN.map((tipo) => {
        const hitos = experience.hitos.filter((hito) => hito.tipo === tipo)
        if (hitos.length === 0) return null
        const idTitulo = `grupo-${tipo}`
        return (
          <section key={tipo} aria-labelledby={idTitulo}>
            <h2 id={idTitulo} className="font-display text-title">
              {experience.grupos[tipo]}
            </h2>
            <ol className="mt-5 ml-1 border-l border-line">
              {hitos.map((hito) => (
                <MilestoneItem key={hito.id} hito={hito} />
              ))}
            </ol>
          </section>
        )
      })}

      <section aria-labelledby="certificaciones">
        <h2 id="certificaciones" className="font-display text-title">
          {experience.certificacionesTitulo}
        </h2>
        <ul className="mt-4 flex flex-col gap-2">
          {experience.certificaciones.map((certificacion) => (
            <li
              key={certificacion.nombre}
              className="rounded border border-line bg-sidebar px-4 py-3 text-[13px]"
            >
              <span className="font-semibold text-fg">{certificacion.nombre}</span>
              <span className="text-fg-muted"> · {certificacion.entidad}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
