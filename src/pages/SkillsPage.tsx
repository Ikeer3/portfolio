import { LevelIcon } from '@/components/LevelIcon'
import { PageHeader } from '@/components/PageHeader'
import { useContent, useUi, type SkillCategory, type SkillLevel } from '@/content'

const NIVELES: readonly SkillLevel[] = ['diario', 'soltura', 'aprendiendo']

function CategoryCard({ categoria }: { categoria: SkillCategory }) {
  const { skills } = useContent()
  const idTitulo = `categoria-${categoria.id}`
  return (
    <section
      aria-labelledby={idTitulo}
      className="rounded-md border border-line bg-sidebar p-5"
    >
      <h3 id={idTitulo} className="font-display text-lg font-semibold">
        {categoria.titulo}
      </h3>
      <ul className="mt-3 flex flex-col divide-y divide-line">
        {categoria.habilidades.map((habilidad) => (
          <li
            key={habilidad.nombre}
            className="flex items-center justify-between gap-3 py-2 text-[13px]"
          >
            <span className="text-fg">{habilidad.nombre}</span>
            <span className="inline-flex items-center gap-1.5 text-fg-muted">
              <LevelIcon nivel={habilidad.nivel} />
              {skills.niveles[habilidad.nivel]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function SkillsPage() {
  const ui = useUi().pages.skills
  const { skills } = useContent()

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <PageHeader id="skills" />
      <p className="text-fg-muted">{ui.intro}</p>

      <ul
        aria-label={ui.levelsLabel}
        className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-fg-muted"
      >
        {NIVELES.map((nivel) => (
          <li key={nivel} className="inline-flex items-center gap-1.5">
            <LevelIcon nivel={nivel} />
            {skills.niveles[nivel]}
          </li>
        ))}
      </ul>

      <div className="grid gap-4 md:grid-cols-2">
        {skills.principales.map((categoria) => (
          <CategoryCard key={categoria.id} categoria={categoria} />
        ))}
      </div>

      <section aria-labelledby="complementarias" className="flex flex-col gap-4">
        <h2 id="complementarias" className="font-display text-title">
          {skills.complementariasTitulo}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {skills.complementarias.map((categoria) => (
            <CategoryCard key={categoria.id} categoria={categoria} />
          ))}
        </div>
      </section>
    </div>
  )
}
