import type { FileKind } from '@/content/files'

const ETIQUETAS: Record<FileKind, string> = {
  tsx: 'TSX',
  html: 'HTML',
  js: 'JS',
  json: 'JSON',
  ts: 'TS',
  css: 'CSS',
  md: 'MD',
}

// Insignia con la extensión del archivo; decorativa, el nombre ya está en el texto
export function FileIcon({
  tipo,
  activo = false,
}: {
  tipo: FileKind | 'pdf'
  activo?: boolean
}) {
  const etiqueta = tipo === 'pdf' ? 'PDF' : ETIQUETAS[tipo]
  return (
    <span
      aria-hidden="true"
      className={`inline-grid h-4 min-w-7 shrink-0 place-items-center rounded-sm border px-1 text-[9px] font-bold leading-none ${
        activo ? 'border-accent text-accent' : 'border-line text-fg-muted'
      }`}
    >
      {etiqueta}
    </span>
  )
}
