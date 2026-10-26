import { useUi } from '@/content'
import { SmartLink } from './SmartLink'
import { Icon } from './Icon'

interface BrowserFrameProps {
  url: string // página real que se muestra dentro
  direccion: string // dirección simulada de la barra (por ejemplo, localhost:5173)
  titulo: string
}

// Marco de navegador con una dirección localhost simulada que muestra una web real.
// Algunas webs impiden mostrarse dentro de otra: por eso siempre se ofrece abrirla aparte.
export function BrowserFrame({ url, direccion, titulo }: BrowserFrameProps) {
  const ui = useUi().pages.projects
  return (
    <figure className="overflow-hidden rounded-md border border-line bg-bg">
      <div
        role="img"
        aria-label={ui.browserLabel}
        className="flex items-center gap-3 border-b border-line bg-sidebar px-3 py-2"
      >
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span
          aria-hidden="true"
          className="flex-1 truncate rounded bg-bg px-3 py-0.5 text-xs text-fg-muted"
        >
          http://{direccion}/
        </span>
      </div>
      <iframe
        src={url}
        title={titulo}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups"
        referrerPolicy="no-referrer"
        className="block h-[26rem] w-full bg-white"
      />
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-3 py-2 text-xs text-fg-muted">
        <span>{ui.previewNote}</span>
        <SmartLink
          href={url}
          externo
          className="inline-flex items-center gap-1 text-accent hover:underline"
        >
          {ui.openInNewTab}
          <Icon name="external" className="size-3.5" />
        </SmartLink>
      </figcaption>
    </figure>
  )
}
