import type { Project } from '../data-types'

export const projectsEs: readonly Project[] = [
  {
    id: 'formula1',
    categoria: 'Java · POO',
    titulo: 'Simulador de Carreras de Fórmula 1',
    subtitulo: 'competicionCochesDAM',
    descripcion:
      'Simulador de un campeonato de Fórmula 1 hecho en grupo con programación orientada a objetos. Gestiona la inscripción de pilotos, el calendario de circuitos, las averías de los coches y las clasificaciones por piloto y por escudería.',
    rol: 'Mi parte: la clase Competicion (los métodos anhadirCarrera e imprimirResultadoEscudería) y la maquetación de la información de la clase Simulador.',
    tecnologias: ['Java', 'POO', 'Arrays'],
    enlaces: [
      {
        tipo: 'repo',
        etiqueta: 'Ver repositorio',
        url: 'https://github.com/Ikeer3/competicionCochesDAM',
      },
    ],
  },
  {
    id: 'hundir-flota',
    categoria: 'Java',
    titulo: 'Hundir la flota',
    subtitulo: 'hundirFlota',
    descripcion:
      'Juego de hundir la flota por consola contra una CPU que dispara al azar, hecho en grupo para la primera evaluación de programación de DAM. Practica bucles, condicionales, arrays y entrada y salida por teclado.',
    rol: 'Mi parte: la clase Disparos.',
    tecnologias: ['Java', 'Arrays', 'Consola'],
    enlaces: [
      {
        tipo: 'repo',
        etiqueta: 'Ver repositorio',
        url: 'https://github.com/Ikeer3/hundirFlota',
      },
    ],
  },
  {
    id: 'moodboard',
    categoria: 'Web',
    titulo: 'Moodboard web personal',
    subtitulo: 'moodboardGrid',
    descripcion:
      'Moodboard personal con diseño modular tipo «Bento Box» y temática deportiva, totalmente responsive y con efectos 3D. Hecho solo con HTML5, CSS3, CSS Grid y Flexbox, sin librerías, para la asignatura Lenguaje de Marcas.',
    tecnologias: ['HTML5', 'CSS3', 'CSS Grid', 'Flexbox'],
    enlaces: [
      {
        tipo: 'repo',
        etiqueta: 'Ver repositorio',
        url: 'https://github.com/Ikeer3/moodboardGrid',
      },
      { tipo: 'demo', etiqueta: 'Ver demo', url: 'https://moodboardiker.pages.dev/' },
    ],
    vistaPrevia: {
      url: 'https://moodboardiker.pages.dev/',
      direccion: 'localhost:5173',
      titulo: 'Vista previa del moodboard',
    },
  },
  {
    id: 'wordpress',
    categoria: 'WordPress',
    titulo: 'Contribuciones a WordPress',
    subtitulo: 'WP Credits',
    descripcion:
      'Más de 30 fotografías originales aprobadas en el WordPress Photo Directory (licencia CC0) y canvas-ui-lab, un Blueprint para WordPress Playground que monta una demostración de design system con modo oscuro y una galería de seis componentes. Lo envié como pull request al repositorio WordPress/blueprints.',
    tecnologias: ['WordPress', 'WordPress Playground', 'JSON', 'Fotografía'],
    enlaces: [
      {
        tipo: 'blog',
        etiqueta: 'Leer mi informe final',
        url: 'https://ikersantos.blog/2026/09/08/wp-credits-final-report-my-journey-from-beginner-to-contributor/',
      },
      {
        tipo: 'otro',
        etiqueta: 'Mis fotos en WordPress',
        url: 'https://wordpress.org/photos/author/ikeer3/',
      },
      {
        tipo: 'otro',
        etiqueta: 'Pull request del Blueprint',
        url: 'https://github.com/WordPress/blueprints/pull/237',
      },
    ],
    vistaPrevia: {
      url: 'https://ikersantos.blog/',
      direccion: 'localhost:8888',
      titulo: 'Vista previa de mi blog de WordPress',
    },
  },
]
