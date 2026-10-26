import type { LinkIcon } from '@/content'
import { BrandIcon } from './BrandIcon'
import { Icon } from './Icon'

// Icono de un enlace de contacto: propio para el correo y logotipo de marca para el resto
export function ContactIcon({
  icono,
  className = 'size-5',
}: {
  icono: LinkIcon
  className?: string
}) {
  return icono === 'mail' ? (
    <Icon name="mail" className={className} />
  ) : (
    <BrandIcon name={icono} className={className} />
  )
}
