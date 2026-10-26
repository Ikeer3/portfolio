import { describe, expect, it } from 'vitest'
import { contentEs } from './es'

const { profile, links, projects, skills, experience } = contentEs
const todasLasHabilidades = [...skills.principales, ...skills.complementarias].flatMap(
  (categoria) => categoria.habilidades,
)

describe('integridad de los datos de contenido', () => {
  it('los enlaces tienen id único y URL válida', () => {
    const ids = links.map((enlace) => enlace.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const enlace of links) {
      expect(enlace.url).toMatch(/^(https:\/\/|mailto:)/)
    }
  })

  it('los proyectos tienen id único, descripción y al menos un enlace https', () => {
    const ids = projects.map((proyecto) => proyecto.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const proyecto of projects) {
      expect(proyecto.descripcion.length).toBeGreaterThan(40)
      expect(proyecto.enlaces.length).toBeGreaterThan(0)
      for (const enlace of proyecto.enlaces) expect(enlace.url).toMatch(/^https:\/\//)
    }
  })

  it('los tres proyectos de GitHub enlazan a un repositorio de Ikeer3', () => {
    const repos = projects.flatMap((proyecto) =>
      proyecto.enlaces
        .filter((enlace) => enlace.tipo === 'repo')
        .map((enlace) => enlace.url),
    )
    expect(repos).toHaveLength(3)
    for (const url of repos) expect(url).toContain('github.com/Ikeer3/')
  })

  it('las vistas previas apuntan a https y usan una dirección localhost simulada', () => {
    const conVista = projects.filter((proyecto) => proyecto.vistaPrevia)
    expect(conVista).toHaveLength(2)
    for (const proyecto of conVista) {
      expect(proyecto.vistaPrevia?.url).toMatch(/^https:\/\//)
      expect(proyecto.vistaPrevia?.direccion).toMatch(/^localhost:\d+/)
    }
  })

  it('cada habilidad tiene un nivel válido con etiqueta de texto', () => {
    expect(todasLasHabilidades.length).toBeGreaterThan(30)
    for (const habilidad of todasLasHabilidades) {
      expect(skills.niveles[habilidad.nivel]).toBeTruthy()
    }
  })

  it('no hay habilidades repetidas', () => {
    const nombres = todasLasHabilidades.map((habilidad) => habilidad.nombre)
    expect(new Set(nombres).size).toBe(nombres.length)
  })

  it('las tecnologías del propio portfolio no aparecen en habilidades', () => {
    const nombres = todasLasHabilidades.map((habilidad) => habilidad.nombre.toLowerCase())
    for (const excluida of ['react', 'vite', 'tailwind', 'zustand', 'vitest']) {
      expect(nombres).not.toContain(excluida)
    }
  })

  it('los hitos tienen id único y fechas con formato AAAA o AAAA-MM', () => {
    const ids = experience.hitos.map((hito) => hito.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const hito of experience.hitos) {
      expect(hito.desde).toMatch(/^\d{4}(-\d{2})?$/)
      if (hito.hasta) expect(hito.hasta).toMatch(/^\d{4}(-\d{2})?$/)
    }
  })

  it('las estadísticas del perfil son las cuatro cifras reales', () => {
    expect(profile.estadisticas.map((dato) => dato.valor)).toEqual(['3', '30+', '2', '3'])
  })
})
