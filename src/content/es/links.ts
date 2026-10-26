import type { ContactLink } from '../data-types'

// Para añadir una red (por ejemplo, otra plataforma) basta con añadir un elemento aquí
export const linksEs: readonly ContactLink[] = [
  {
    id: 'email',
    etiqueta: 'Correo',
    valor: 'ikersantosinsua@gmail.com',
    url: 'mailto:ikersantosinsua@gmail.com',
    icono: 'mail',
    externo: false,
  },
  {
    id: 'linkedin',
    etiqueta: 'LinkedIn',
    valor: 'iker-santos-insua',
    url: 'https://www.linkedin.com/in/iker-santos-insua/',
    icono: 'linkedin',
    externo: true,
  },
  {
    id: 'github',
    etiqueta: 'GitHub',
    valor: 'Ikeer3',
    url: 'https://github.com/Ikeer3',
    icono: 'github',
    externo: true,
  },
  {
    id: 'blog',
    etiqueta: 'Blog de WordPress',
    valor: 'ikersantos.blog',
    url: 'https://ikersantos.blog/',
    icono: 'wordpress',
    externo: true,
  },
]
