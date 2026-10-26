import type { ComponentType } from 'react'
import type { FileId } from '@/content/files'
import { AboutPage } from './AboutPage'
import { ContactPage } from './ContactPage'
import { ExperiencePage } from './ExperiencePage'
import { HomePage } from './HomePage'
import { ProjectsPage } from './ProjectsPage'
import { ReadmePage } from './ReadmePage'
import { SkillsPage } from './SkillsPage'

// Página de cada archivo del editor
export const PAGES: Record<FileId, ComponentType> = {
  home: HomePage,
  about: AboutPage,
  projects: ProjectsPage,
  skills: SkillsPage,
  experience: ExperiencePage,
  contact: ContactPage,
  readme: ReadmePage,
}
