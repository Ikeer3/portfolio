import type { Profile } from '../data-types'

export const profileEs: Profile = {
  nombre: 'Iker',
  apellido: 'Santos',
  ubicacion: 'A Coruña, España',
  roles: [
    'Desarrollador multiplataforma',
    'Estudiante de DAM',
    'Colaborador de WordPress',
    'Perfil audiovisual',
  ],
  eslogan: 'Innovación, trabajo en equipo y compromiso en cada proyecto.',
  introduccion: [
    'Vengo del mundo ',
    { resaltado: 'audiovisual' },
    ' y hoy estudio ',
    { resaltado: 'Desarrollo de Aplicaciones Multiplataforma' },
    '. Trabajo sobre todo con ',
    { resaltado: 'Java' },
    ' y ',
    { resaltado: 'bases de datos' },
    ', construyo páginas web y contribuyo a ',
    { resaltado: 'WordPress' },
    ' con fotografía y un Blueprint propio.',
  ],
  estadisticas: [
    { valor: '3', etiqueta: 'Proyectos en GitHub' },
    { valor: '30+', etiqueta: 'Fotos aprobadas en WordPress' },
    { valor: '2', etiqueta: 'Certificaciones' },
    { valor: '3', etiqueta: 'Idiomas' },
  ],
  presentacion: [
    'Empecé mi camino en el mundo audiovisual, formándome en la Escuela de Imagen y Sonido y en la UDC. Allí consolidé mi experiencia como Asistente de Producción en CTV y como Community Manager del Club Béisbol y Sófbol Cambre, donde desarrollé mis capacidades organizativas, de trabajo en equipo y de comunicación.',
    'Con el tiempo descubrí mi pasión por el desarrollo informático y decidí dar el salto hacia el desarrollo de software y aplicaciones, un cambio que afronto con alta dedicación, capacidad de adaptación y enfoque en la resolución de problemas.',
    'Fuera de clase contribuyo a la comunidad de WordPress: tengo más de 30 fotografías aprobadas en su Photo Directory y un Blueprint para WordPress Playground.',
  ],
  enfoqueActual: {
    titulo: 'Enfoque actual',
    items: [
      'Aprender TypeScript, JavaScript y React Native.',
      'Profundizar en Python y PostgreSQL.',
      'Seguir contribuyendo a WordPress y llevar mi Blueprint a la galería oficial.',
    ],
  },
  titularReadme: 'Desarrollador multiplataforma en formación y colaborador de WordPress',
}
