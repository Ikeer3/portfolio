import type { ComponentType } from 'react'
import type { FileId } from '@/content/files'
import { AboutPage } from './AboutPage'
import { HomePage } from './HomePage'
import { PlaceholderPage } from './PlaceholderPage'
import { ProjectsPage } from './ProjectsPage'

// Página de cada archivo del editor
export const PAGES: Record<FileId, ComponentType> = {
  home: HomePage,
  about: AboutPage,
  projects: ProjectsPage,
  skills: () => <PlaceholderPage id="skills" />,
  experience: () => <PlaceholderPage id="experience" />,
  contact: () => <PlaceholderPage id="contact" />,
  readme: () => <PlaceholderPage id="readme" />,
}
