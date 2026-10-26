import type { ComponentType } from 'react'
import type { FileId } from '@/content/files'
import { AboutPage } from './AboutPage'
import { ExperiencePage } from './ExperiencePage'
import { HomePage } from './HomePage'
import { PlaceholderPage } from './PlaceholderPage'
import { ProjectsPage } from './ProjectsPage'
import { SkillsPage } from './SkillsPage'

// Página de cada archivo del editor
export const PAGES: Record<FileId, ComponentType> = {
  home: HomePage,
  about: AboutPage,
  projects: ProjectsPage,
  skills: SkillsPage,
  experience: ExperiencePage,
  contact: () => <PlaceholderPage id="contact" />,
  readme: () => <PlaceholderPage id="readme" />,
}
