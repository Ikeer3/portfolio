import { Chip } from '@/components/Chip'
import { ContactIcon } from '@/components/ContactIcon'
import { PageHeader } from '@/components/PageHeader'
import { SmartLink } from '@/components/SmartLink'
import { useContent, useUi } from '@/content'

// Vista tipo README de GitHub, construida con los mismos datos que el resto de páginas
export function ReadmePage() {
  const ui = useUi().pages.readme
  const { profile, links, skills } = useContent()
  const categorias = [...skills.principales, ...skills.complementarias]

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <PageHeader id="readme">
        {profile.nombre} <span className="text-surname">{profile.apellido}</span>
      </PageHeader>

      <div className="overflow-hidden rounded-md border border-line">
        <p className="border-b border-line bg-sidebar px-4 py-2 text-xs text-fg-muted">
          {ui.fileLabel}
        </p>
        <article className="flex flex-col gap-6 p-6 sm:p-8">
          <p className="text-lg text-fg">{profile.titularReadme}</p>

          <ul className="flex flex-wrap gap-2">
            {[...profile.roles, profile.ubicacion].map((etiqueta) => (
              <li key={etiqueta}>
                <Chip>{etiqueta}</Chip>
              </li>
            ))}
          </ul>

          <section aria-labelledby="readme-sobre-mi" className="flex flex-col gap-3">
            <h2
              id="readme-sobre-mi"
              className="border-b border-line pb-2 font-display text-title"
            >
              {ui.about}
            </h2>
            {profile.presentacion.map((parrafo) => (
              <p key={parrafo} className="text-fg">
                {parrafo}
              </p>
            ))}
          </section>

          <section aria-labelledby="readme-stack" className="flex flex-col gap-3">
            <h2
              id="readme-stack"
              className="border-b border-line pb-2 font-display text-title"
            >
              {ui.stack}
            </h2>
            <ul className="flex flex-col gap-3">
              {categorias.map((categoria) => (
                <li key={categoria.id} className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold">{categoria.titulo}</span>
                  <span className="flex flex-wrap gap-1.5">
                    {categoria.habilidades.map((habilidad) => (
                      <code
                        key={habilidad.nombre}
                        className="rounded bg-sidebar px-1.5 py-0.5 text-xs text-fg"
                      >
                        {habilidad.nombre}
                      </code>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="readme-contacto" className="flex flex-col gap-3">
            <h2
              id="readme-contacto"
              className="border-b border-line pb-2 font-display text-title"
            >
              {ui.contact}
            </h2>
            <ul className="flex flex-col gap-2">
              {links.map((enlace) => (
                <li key={enlace.id}>
                  <SmartLink
                    href={enlace.url}
                    externo={enlace.externo}
                    className="inline-flex items-center gap-2 text-accent hover:underline"
                  >
                    <ContactIcon icono={enlace.icono} className="size-4" />
                    {enlace.etiqueta}: {enlace.valor}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </div>
  )
}
