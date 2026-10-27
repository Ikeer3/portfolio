import type { FileKind } from '@/content/files'
import { Icon } from './Icon'
import css from '@/assets/file-icons/css.svg'
import html from '@/assets/file-icons/html.svg'
import javascript from '@/assets/file-icons/javascript.svg'
import json from '@/assets/file-icons/json.svg'
import markdown from '@/assets/file-icons/markdown.svg'
import pdf from '@/assets/file-icons/pdf.svg'
import react from '@/assets/file-icons/react.svg'
import typescript from '@/assets/file-icons/typescript.svg'

// Icono de la tecnología de cada tipo de archivo (los .tsx usan el logotipo de React)
const ICONOS: Record<FileKind | 'pdf', string> = {
  tsx: react,
  ts: typescript,
  js: javascript,
  html,
  css,
  json,
  md: markdown,
  pdf,
}

// Decorativo: el nombre del archivo ya aparece como texto junto al icono
export function FileIcon({ tipo }: { tipo: FileKind | 'pdf' | 'preview' }) {
  // Las vistas previas llevan un globo de navegador en lugar del logotipo de una tecnología
  if (tipo === 'preview')
    return <Icon name="globe" className="size-4 shrink-0 text-accent" />
  return (
    <img src={ICONOS[tipo]} alt="" width={16} height={16} className="size-4 shrink-0" />
  )
}
