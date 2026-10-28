import { PageHeader } from '@/components/PageHeader'
import { useContent, useUi, type Milestone, type MilestoneKind } from '@/content'
import { formatDate, formatPeriod } from '@/lib/period'
import { useWorkspaceStore } from '@/store/workspace'

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
  const openCertificate = useWorkspaceStore((estado) => estado.openCertificate)

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
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {experience.certificaciones.map((certificacion) => (
            <li key={certificacion.id}>
              {/* Toda la tarjeta es un botón: abre el visor del certificado en una pestaña */}
              <button
                type="button"
                onClick={() => openCertificate(certificacion.id)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-md border border-accent/40 bg-sidebar text-left transition-colors duration-150 hover:border-accent hover:bg-hover motion-reduce:transition-none"
              >
                <img
                  src={certificacion.miniatura}
                  alt=""
                  width={480}
                  height={Math.round((480 * certificacion.alto) / certificacion.ancho)}
                  loading="lazy"
                  className="block aspect-[16/10] w-full border-b border-line bg-white object-cover object-top"
                />
                <span className="flex flex-col gap-1 p-4 text-[13px]">
                  <span className="font-semibold text-fg">{certificacion.nombre}</span>
                  <span className="text-fg-muted">
                    {certificacion.entidad} · {ui.issuedOn}{' '}
                    {formatDate(certificacion.emision)}
                  </span>
                  <span className="mt-1 font-semibold text-accent group-hover:underline">
                    {ui.viewCertificate} →
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
