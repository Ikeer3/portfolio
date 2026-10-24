import type { CommentStyle } from '@/content/files'

// Da formato de comentario al texto según el lenguaje del archivo
export function formatComment(estilo: CommentStyle, texto: string): string {
  switch (estilo) {
    case 'line':
      return `// ${texto}`
    case 'block':
      return `/* ${texto} */`
    case 'html':
      return `<!-- ${texto} -->`
  }
}
