// Modelo de los datos de contenido del portfolio. Los componentes solo muestran estos
// datos; los textos viven en src/content/<idioma>/ y nunca dentro de los componentes.

// Texto con palabras clave resaltadas: cada tramo es texto normal u {resaltado}
export type RichText = ReadonlyArray<string | { resaltado: string }>

export interface Stat {
  valor: string
  etiqueta: string
}

export interface Profile {
  nombre: string
  apellido: string
  ubicacion: string
  roles: readonly string[]
  // Frases que se escriben y se borran en bucle en la home
  eslogans: readonly string[]
  introduccion: RichText
  estadisticas: readonly Stat[]
  // Párrafos de la página «sobre mí»
  presentacion: readonly string[]
  enfoqueActual: { titulo: string; items: readonly string[] }
  // Titular de la vista README
  titularReadme: string
}

export type LinkIcon = 'mail' | 'linkedin' | 'github' | 'wordpress'

// Único array de enlaces de contacto: añadir una red aquí la muestra en home, contacto y README
export interface ContactLink {
  id: string
  etiqueta: string
  valor: string // texto visible (usuario o correo)
  url: string
  icono: LinkIcon
  externo: boolean // true = se abre en pestaña nueva
}

export type ProjectLinkKind = 'repo' | 'demo' | 'blog' | 'otro'

export interface ProjectLink {
  tipo: ProjectLinkKind
  etiqueta: string
  url: string
}

export interface Project {
  id: string
  categoria: string
  titulo: string
  subtitulo?: string
  descripcion: string
  rol?: string // qué parte hizo Iker en proyectos de grupo
  tecnologias: readonly string[]
  enlaces: readonly ProjectLink[]
  // Si existe, la tarjeta ofrece una vista previa dentro de un marco de navegador
  vistaPrevia?: { url: string; direccion: string; titulo: string }
}

export type SkillLevel = 'diario' | 'soltura' | 'aprendiendo'

export interface Skill {
  nombre: string
  nivel: SkillLevel
}

export interface SkillCategory {
  id: string
  titulo: string
  habilidades: readonly Skill[]
}

export interface SkillsData {
  niveles: Record<SkillLevel, string> // etiqueta de texto de cada nivel
  principales: readonly SkillCategory[]
  complementariasTitulo: string
  complementarias: readonly SkillCategory[]
}

export type MilestoneKind = 'formacion' | 'experiencia' | 'colaboracion'

export interface Milestone {
  id: string
  tipo: MilestoneKind
  titulo: string
  lugar: string
  desde: string // "AAAA-MM" o "AAAA"
  hasta?: string // sin valor = en curso
  detalles: readonly string[]
}

export interface ExperienceData {
  presente: string
  grupos: Record<MilestoneKind, string>
  hitos: readonly Milestone[] // de más reciente a más antiguo
  certificacionesTitulo: string
  certificaciones: ReadonlyArray<{ nombre: string; entidad: string }>
}

export interface PortfolioContent {
  profile: Profile
  links: readonly ContactLink[]
  projects: readonly Project[]
  skills: SkillsData
  experience: ExperienceData
}
