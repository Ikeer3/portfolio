import { PageHeader } from '@/components/PageHeader'
import { useContent, useUi } from '@/content'
import { formatPeriod } from '@/lib/period'
import { useWorkspaceStore } from '@/store/workspace'

export function AboutPage() {
  const ui = useUi().pages.about
  const { profile, experience } = useContent()
  const openFile = useWorkspaceStore((estado) => estado.openFile)
  const dam = experience.hitos.find((hito) => hito.id === 'dam')

  return (
    <div className="flex max-w-5xl flex-col gap-8">
      <PageHeader id="about" />

      <div className="grid gap-8 md:grid-cols-[1fr_18rem]">
        <div className="flex flex-col gap-4">
          {profile.presentacion.map((parrafo) => (
            <p key={parrafo} className="text-fg">
              {parrafo}
            </p>
          ))}
        </div>

        <aside className="h-fit rounded border border-line border-l-accent bg-sidebar p-5 [border-left-width:3px]">
          <h2 className="font-display text-lg font-semibold text-accent">
            {profile.enfoqueActual.titulo}
          </h2>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-[13px] text-fg">
            {profile.enfoqueActual.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>

      {dam && (
        <section aria-labelledby="formacion-actual" className="flex flex-col gap-2">
          <h2 id="formacion-actual" className="font-display text-title">
            {ui.educationTitle}
          </h2>
          <p className="font-semibold text-fg">{dam.titulo}</p>
          <p className="text-fg-muted">
            {dam.lugar} · {formatPeriod(dam.desde, dam.hasta, experience.presente)}
          </p>
          <button
            type="button"
            onClick={() => openFile('experience')}
            className="mt-2 w-fit rounded border border-line px-4 py-2 hover:bg-hover"
          >
            {ui.fullPath}
          </button>
        </section>
      )}
    </div>
  )
}
