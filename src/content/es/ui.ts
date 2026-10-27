import type { UiStrings } from '../types'

export const uiEs: UiStrings = {
  soon: 'Próximamente',
  common: { newTab: '(se abre en una pestaña nueva)' },
  titleBar: {
    searchLabel: 'Buscar archivos y comandos (Ctrl+P)',
    windowLabel: 'Controles de ventana',
    close: 'Cerrar',
    minimize: 'Minimizar',
    fullscreen: 'Pantalla completa',
  },
  menuBar: {
    label: 'Menús',
    items: [
      'Archivo',
      'Editar',
      'Ver',
      'Ir',
      'Ejecutar',
      'Terminal',
      'Ayuda',
      'Asistente',
    ],
  },
  activityBar: {
    label: 'Barra de actividad',
    explorer: 'Explorador',
    search: 'Búsqueda',
    sourceControl: 'Control de código fuente',
    downloadCv: 'Descargar CV',
    assistant: "Iker's Assistant",
    settings: 'Ajustes',
  },
  sidebar: {
    explorerTitle: 'PORTFOLIO',
    searchTitle: 'BÚSQUEDA',
    assistantButton: "Iker's Assistant",
    branchLabel: 'Rama actual',
    foldersLabel: 'Archivos del portfolio',
  },
  tabs: { listLabel: 'Archivos abiertos', close: (nombre) => `Cerrar ${nombre}` },
  breadcrumbs: { label: 'Ruta del archivo' },
  editor: {
    emptyTitle: 'Ningún archivo abierto',
    emptyHint: 'Elige un archivo en el explorador para empezar.',
  },
  statusBar: {
    warnings: (cantidad) => (cantidad === 1 ? '1 aviso' : `${cantidad} avisos`),
    changeTheme: (actual) => `Elegir tema de color (actual: ${actual})`,
    themePickerTitle: 'TEMA DE COLOR',
    language: 'Idioma: español',
    previewLanguage: 'Vista previa',
  },
  pages: {
    home: {
      rolesLabel: 'Roles',
      statsLabel: 'Datos destacados',
      linksLabel: 'Enlaces',
      projects: 'Proyectos',
      about: 'Sobre mí',
      contact: 'Contacto',
    },
    about: {
      educationTitle: 'Formación actual',
      fullPath: 'Ver mi trayectoria completa',
    },
    skills: {
      intro: 'Sin porcentajes: cada tecnología indica mi nivel con una etiqueta.',
      levelsLabel: 'Niveles',
    },
    experience: {
      intro:
        'Formación, experiencia y colaboraciones, de lo más reciente a lo más antiguo.',
    },
    contact: {
      intro: 'Escríbeme por donde te resulte más cómodo.',
      cardsLabel: 'Formas de contacto',
      formTitle: 'Envíame un mensaje',
      labels: {
        nombre: 'Nombre',
        correo: 'Correo electrónico',
        asunto: 'Asunto',
        mensaje: 'Mensaje',
      },
      submit: 'Enviar mensaje',
      errors: {
        required: 'Este campo es obligatorio.',
        email: 'Escribe un correo válido, por ejemplo nombre@dominio.com.',
        tooShort: 'El mensaje debe tener al menos 10 caracteres.',
      },
      soon: (correo) =>
        `Próximamente: el envío del formulario todavía no está activo. Mientras tanto, escríbeme a ${correo}.`,
    },
    readme: {
      fileLabel: 'README.md',
      about: 'Sobre mí',
      stack: 'Stack',
      contact: 'Contacto',
    },
    projects: {
      intro: 'Lo que he construido en clase y fuera de ella.',
      role: 'Mi parte',
      technologies: 'Tecnologías',
      showPreview: 'Abrir vista previa',
      openInNewTab: 'Abrir en pestaña nueva',
      previewNote: 'Si la vista previa no se muestra, ábrela en una pestaña nueva.',
      browserLabel: 'Ventana de navegador simulada',
    },
  },
  fileComments: {
    home: 'Hola, mundo. Esto es lo primero que ves.',
    about: 'Quién soy y por qué programo',
    projects: 'Lo que he construido hasta ahora',
    skills: 'Con qué tecnologías trabajo',
    experience: 'De dónde vengo y hacia dónde voy',
    contact: 'Hablemos',
    readme: 'Léeme primero',
  },
  pageTitles: {
    home: 'Iker Santos',
    about: 'Sobre mí',
    projects: 'Proyectos',
    skills: 'Habilidades',
    experience: 'Experiencia',
    contact: 'Contacto',
    readme: 'README',
  },
}
