import type { ComponentType } from 'react'
import type { FileId } from '@/content/files'
import { HomePage } from './HomePage'
import { PlaceholderPage } from './PlaceholderPage'

// Página de cada archivo del editor
export const PAGES: Record<FileId, ComponentType> = {
  home: HomePage,
  about: () => <PlaceholderPage id="about" />,
  projects: () => <PlaceholderPage id="projects" />,
  skills: () => <PlaceholderPage id="skills" />,
  experience: () => <PlaceholderPage id="experience" />,
  contact: () => <PlaceholderPage id="contact" />,
  readme: () => <PlaceholderPage id="readme" />,
}
