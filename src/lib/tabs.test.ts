import { describe, expect, it } from 'vitest'
import { contentEs } from '@/content/es'
import { isPreviewTab, previewTabId, projectIdOf } from '@/content/files'
import { describeTab } from './tabs'

const { projects } = contentEs

describe('identificadores de pestaña', () => {
  it('distingue las vistas previas de los archivos', () => {
    expect(previewTabId('moodboard')).toBe('preview:moodboard')
    expect(isPreviewTab('preview:moodboard')).toBe(true)
    expect(isPreviewTab('home')).toBe(false)
    expect(projectIdOf('preview:moodboard')).toBe('moodboard')
  })
})

describe('describeTab', () => {
  it('describe un archivo con su nombre, ruta y lenguaje', () => {
    expect(describeTab('skills', projects)).toEqual({
      etiqueta: 'skills.json',
      ruta: ['data', 'skills.json'],
      icono: 'json',
      lenguaje: 'JSON con comentarios',
    })
  })

  it('describe una vista previa con su dirección localhost simulada', () => {
    expect(describeTab('preview:moodboard', projects)).toEqual({
      etiqueta: 'localhost:5173',
      ruta: ['localhost:5173'],
      icono: 'preview',
      lenguaje: null,
    })
    expect(describeTab('preview:wordpress', projects).etiqueta).toBe('localhost:8888')
  })

  it('si el proyecto no existe usa su identificador en lugar de fallar', () => {
    expect(describeTab('preview:desconocido', projects).etiqueta).toBe('desconocido')
  })
})
