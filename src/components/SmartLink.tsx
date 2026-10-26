import type { ReactNode } from 'react'
import { useUi } from '@/content'

interface SmartLinkProps {
  href: string
  externo?: boolean
  className?: string
  children: ReactNode
}

// Enlace que, si es externo, se abre en pestaña nueva con rel seguro y avisa a lectores de pantalla
export function SmartLink({
  href,
  externo = false,
  className,
  children,
}: SmartLinkProps) {
  const ui = useUi()
  if (!externo) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> {ui.common.newTab}</span>
    </a>
  )
}
