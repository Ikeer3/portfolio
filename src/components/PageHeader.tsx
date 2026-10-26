import type { ReactNode } from 'react'
import { useUi } from '@/content'
import type { FileId } from '@/content/files'
import { getFile } from '@/content/files'
import { formatComment } from '@/lib/comments'

// Comienzo de toda página: línea de comentario en verde con la sintaxis de su lenguaje
// y titular grande. `children` permite personalizar el titular (home resalta el apellido).
export function PageHeader({ id, children }: { id: FileId; children?: ReactNode }) {
  const ui = useUi()
  return (
    <header>
      <p className="text-comment">
        {formatComment(getFile(id).comentario, ui.fileComments[id])}
      </p>
      <h1 className="mt-4 font-display text-display">{children ?? ui.pageTitles[id]}</h1>
    </header>
  )
}
