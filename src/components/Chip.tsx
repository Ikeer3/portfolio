import type { ReactNode } from 'react'

// Etiqueta pequeña redondeada (roles, tecnologías, categorías). El borde lleva el color de
// acento atenuado y se enciende al pasar el cursor; la transición se omite con "reducir movimiento".
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/40 px-3 py-1 text-xs text-fg-muted transition-colors duration-150 hover:border-accent hover:bg-hover hover:text-fg motion-reduce:transition-none">
      {children}
    </span>
  )
}
