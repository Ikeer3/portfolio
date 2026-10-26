import type { SkillsData } from '../data-types'

export const skillsEs: SkillsData = {
  niveles: {
    diario: 'Uso a diario',
    soltura: 'Con soltura',
    aprendiendo: 'Aprendiendo',
  },
  principales: [
    {
      id: 'lenguajes',
      titulo: 'Lenguajes',
      habilidades: [
        { nombre: 'Java', nivel: 'diario' },
        { nombre: 'Python', nivel: 'aprendiendo' },
        { nombre: 'JavaScript', nivel: 'aprendiendo' },
        { nombre: 'TypeScript', nivel: 'aprendiendo' },
      ],
    },
    {
      id: 'multiplataforma',
      titulo: 'Móvil y multiplataforma',
      habilidades: [
        { nombre: 'React Native', nivel: 'aprendiendo' },
        { nombre: 'JavaFX', nivel: 'aprendiendo' },
      ],
    },
    {
      id: 'web',
      titulo: 'Web',
      habilidades: [
        { nombre: 'HTML5', nivel: 'soltura' },
        { nombre: 'CSS3', nivel: 'soltura' },
        { nombre: 'XML', nivel: 'soltura' },
        { nombre: 'JSON', nivel: 'soltura' },
        { nombre: 'WordPress', nivel: 'soltura' },
        { nombre: 'WordPress Playground', nivel: 'soltura' },
      ],
    },
    {
      id: 'datos',
      titulo: 'Bases de datos',
      habilidades: [
        { nombre: 'MySQL', nivel: 'diario' },
        { nombre: 'PostgreSQL', nivel: 'aprendiendo' },
      ],
    },
    {
      id: 'herramientas',
      titulo: 'Herramientas de desarrollo',
      habilidades: [
        { nombre: 'Git', nivel: 'soltura' },
        { nombre: 'GitHub', nivel: 'soltura' },
        { nombre: 'VS Code', nivel: 'soltura' },
        { nombre: 'IntelliJ IDEA', nivel: 'soltura' },
        { nombre: 'Eclipse', nivel: 'soltura' },
      ],
    },
    {
      id: 'sistemas',
      titulo: 'Redes y sistemas',
      habilidades: [
        { nombre: 'Windows Server', nivel: 'soltura' },
        { nombre: 'Cisco Packet Tracer', nivel: 'aprendiendo' },
      ],
    },
  ],
  complementariasTitulo: 'Multimedia y marketing',
  complementarias: [
    {
      id: 'multimedia',
      titulo: 'Edición y creación multimedia',
      habilidades: [
        { nombre: 'Adobe Photoshop', nivel: 'soltura' },
        { nombre: 'Adobe Premiere Pro', nivel: 'soltura' },
        { nombre: 'DaVinci Resolve', nivel: 'soltura' },
        { nombre: 'GIMP', nivel: 'soltura' },
        { nombre: 'CapCut', nivel: 'soltura' },
        { nombre: 'Office 365', nivel: 'soltura' },
      ],
    },
    {
      id: 'marketing',
      titulo: 'Marketing digital',
      habilidades: [
        { nombre: 'Gestión de redes sociales', nivel: 'soltura' },
        { nombre: 'Metricool', nivel: 'soltura' },
        { nombre: 'Google Analytics', nivel: 'soltura' },
        { nombre: 'Google Business', nivel: 'soltura' },
        { nombre: 'Google Ads', nivel: 'soltura' },
      ],
    },
  ],
}
