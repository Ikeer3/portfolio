import { useState } from 'react'
import { FileIcon } from '@/components/FileIcon'
import { Icon } from '@/components/Icon'
import { SmartLink } from '@/components/SmartLink'
import { useContent, useUi } from '@/content'
import { certificateIdOf, type CertificateTabId } from '@/content/files'
import { formatDate } from '@/lib/period'

const BOTON =
  'inline-flex items-center gap-1.5 rounded border border-line px-3 py-1.5 text-[13px] hover:border-accent hover:bg-hover'

// Visor de un certificado: la imagen ocupa el área del editor, con descarga del PDF original,
// enlace de verificación (si existe) y alternancia entre ajustar al ancho y tamaño real.
export function CertificateViewer({ id }: { id: CertificateTabId }) {
  const ui = useUi().pages
  const { experience } = useContent()
  const [tamanoReal, setTamanoReal] = useState(false)
  const certificacion = experience.certificaciones.find(
    (c) => c.id === certificateIdOf(id),
  )
  if (!certificacion) return null

  const nombrePdf = certificacion.pdf.split('/').pop() ?? certificacion.pdf

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        role="group"
        aria-label={ui.certificate.toolbarLabel}
        className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-sidebar px-4 py-2"
      >
        <p className="flex min-w-0 items-center gap-2 text-[13px]">
          <FileIcon tipo="pdf" />
          <span className="truncate font-semibold">{certificacion.nombre}</span>
          <span className="text-fg-muted">
            · {certificacion.entidad} · {ui.experience.issuedOn}{' '}
            {formatDate(certificacion.emision)}
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-pressed={tamanoReal}
            onClick={() => setTamanoReal((previo) => !previo)}
            className={BOTON}
          >
            {tamanoReal ? ui.certificate.zoomOut : ui.certificate.zoomIn}
          </button>
          <a href={certificacion.pdf} download={nombrePdf} className={BOTON}>
            <Icon name="download" className="size-4" />
            {ui.certificate.download}
          </a>
          <SmartLink href={certificacion.pdf} externo className={BOTON}>
            {ui.certificate.openPdf}
            <Icon name="external" className="size-3.5" />
          </SmartLink>
          {certificacion.verificacion && (
            <SmartLink href={certificacion.verificacion.url} externo className={BOTON}>
              {ui.certificate.verify}
              <span className="text-fg-muted">
                ({ui.certificate.code}: {certificacion.verificacion.codigo})
              </span>
            </SmartLink>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto bg-bg p-4">
        <img
          src={certificacion.imagen}
          alt={certificacion.descripcion}
          width={certificacion.ancho}
          height={certificacion.alto}
          className={`h-auto rounded border border-line ${
            tamanoReal ? 'max-w-none' : 'mx-auto w-full max-w-5xl'
          }`}
          style={tamanoReal ? { width: certificacion.ancho } : undefined}
        />
      </div>
    </div>
  )
}
