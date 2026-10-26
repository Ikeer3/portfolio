import type { PortfolioContent } from '../data-types'
import { experienceEs } from './experience'
import { linksEs } from './links'
import { profileEs } from './profile'
import { projectsEs } from './projects'
import { skillsEs } from './skills'

export const contentEs: PortfolioContent = {
  profile: profileEs,
  links: linksEs,
  projects: projectsEs,
  skills: skillsEs,
  experience: experienceEs,
}
