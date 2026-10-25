import { useState } from 'react'
import { useUi } from '@/content'
import {
  CV_FILE,
  filesInFolder,
  FOLDERS,
  type FolderId,
  type PortfolioFile,
} from '@/content/files'
import { useWorkspaceStore } from '@/store/workspace'
import { FileIcon } from './FileIcon'
import { Icon } from './Icon'

const FILA = 'flex w-full items-center gap-2 px-3 py-1 text-left hover:bg-hover'

export function FileTree() {
  const ui = useUi().sidebar
  const { activeId, openFile } = useWorkspaceStore()
  const [abiertas, setAbiertas] = useState<Record<FolderId, boolean>>({
    src: true,
    data: true,
  })

  const archivo = (f: PortfolioFile, sangria: string) => (
    <li key={f.id}>
      <button
        type="button"
        aria-current={activeId === f.id ? 'page' : undefined}
        onClick={() => openFile(f.id)}
        className={`${FILA} ${sangria} ${activeId === f.id ? 'bg-selection' : ''}`}
      >
        <FileIcon tipo={f.tipo} />
        <span className="truncate">{f.nombre}</span>
      </button>
    </li>
  )

  return (
    <nav aria-label={ui.foldersLabel} className="text-[13px]">
      <ul>
        {FOLDERS.map((carpeta) => (
          <li key={carpeta}>
            <button
              type="button"
              aria-expanded={abiertas[carpeta]}
              onClick={() =>
                setAbiertas((previo) => ({ ...previo, [carpeta]: !previo[carpeta] }))
              }
              className={FILA}
            >
              <Icon
                name={abiertas[carpeta] ? 'chevronDown' : 'chevronRight'}
                className="size-4 shrink-0"
              />
              <Icon name="folder" className="size-4 shrink-0" />
              <span>{carpeta}</span>
            </button>
            {abiertas[carpeta] && (
              <ul>{filesInFolder(carpeta).map((f) => archivo(f, 'pl-9'))}</ul>
            )}
          </li>
        ))}
        {filesInFolder(null).map((f) => archivo(f, 'pl-3'))}
        <li>
          <a href={CV_FILE.url} download className={`${FILA} pl-3`}>
            <FileIcon tipo="pdf" />
            <span className="truncate">{CV_FILE.nombre}</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}
