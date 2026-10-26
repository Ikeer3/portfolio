import type { ReactNode } from 'react'

// Etiqueta pequeña redondeada (roles, tecnologías, categorías)
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-3 py-1 text-xs text-fg-muted">
      {children}
    </span>
  )
}
