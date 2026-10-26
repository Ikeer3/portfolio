import { PageHeader } from '@/components/PageHeader'
import { useUi } from '@/content'
import type { FileId } from '@/content/files'

// Provisional: se elimina cuando todas las páginas tengan su contenido real
export function PlaceholderPage({ id }: { id: FileId }) {
  const ui = useUi()
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader id={id} />
      <p className="mt-6 text-fg-muted">{ui.editor.building}</p>
    </div>
  )
}
