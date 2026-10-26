import type { ExperienceData } from '../data-types'

// De más reciente a más antiguo. Fuente: CV de Iker y su informe final de WP Credits.
export const experienceEs: ExperienceData = {
  presente: 'Presente',
  grupos: {
    formacion: 'Formación',
    experiencia: 'Experiencia laboral',
    colaboracion: 'Colaboraciones',
  },
  hitos: [
    {
      id: 'dam',
      tipo: 'formacion',
      titulo: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)',
      lugar: 'Liceo La Paz, A Coruña',
      desde: '2025-09',
      detalles: [],
    },
    {
      id: 'wp-credits',
      tipo: 'colaboracion',
      titulo: 'WP Credits · equipos Photos y Playground',
      lugar: 'Comunidad WordPress',
      desde: '2026',
      hasta: '2026',
      detalles: [
        'Más de 30 fotografías originales aprobadas en el WordPress Photo Directory.',
        'Blueprint canvas-ui-lab para WordPress Playground, enviado como pull request a WordPress/blueprints.',
      ],
    },
    {
      id: 'pum',
      tipo: 'experiencia',
      titulo: 'Repartidor de última milla',
      lugar: 'Pum Mensaxeiros, A Coruña',
      desde: '2026-10',
      detalles: [
        'Gestión y ejecución de recogidas y entregas inmediatas garantizando tiempos óptimos de distribución.',
        'Operación técnica de la aplicación corporativa para recepción, seguimiento y control de pedidos en tiempo real.',
        'Atención directa al usuario y resolución proactiva de incidencias logísticas.',
      ],
    },
    {
      id: 'vaca-films',
      tipo: 'experiencia',
      titulo: 'Auxiliar de producción',
      lugar: 'Vaca Films, A Coruña',
      desde: '2026-07',
      hasta: '2026-08',
      detalles: [
        'Coordinación logística de traslados de equipamiento técnico, atrezzo y personal durante 10 días de rodaje.',
        'Control de gastos diarios, pagos y gestión del servicio de catering para el equipo.',
        'Conducción de vehículos carrozados para el transporte seguro de material.',
      ],
    },
    {
      id: 'amazon',
      tipo: 'experiencia',
      titulo: 'Mozo de almacén y logística',
      lugar: 'Amazon, A Coruña',
      desde: '2024-09',
      hasta: '2025-09',
      detalles: [
        'Carga, descarga y clasificación de mercancía mediante transpaleta manual en un centro logístico.',
        'Recepción de paquetería, registro informático de datos y control de calidad en inventario.',
        'Identificación y resolución de incidencias en el flujo de la cadena de distribución.',
      ],
    },
    {
      id: 'cbs-cambre',
      tipo: 'experiencia',
      titulo: 'Community manager',
      lugar: 'Club Béisbol y Sófbol Cambre, A Coruña',
      desde: '2024-01',
      hasta: '2025-04',
      detalles: [
        'Planificación, grabación, edición y publicación de contenido digital en redes sociales (Instagram, X y Facebook).',
        'Análisis de métricas y crecimiento de audiencia mediante herramientas de gestión digital.',
      ],
    },
    {
      id: 'grado',
      tipo: 'formacion',
      titulo: 'Grado en Comunicación Audiovisual',
      lugar: 'Universidade da Coruña',
      desde: '2020-09',
      hasta: '2024-09',
      detalles: [],
    },
    {
      id: 'erasmus',
      tipo: 'formacion',
      titulo:
        'Programa Erasmus+ (Faculty of Electrical Engineering and Computer Science)',
      lugar: 'University of Maribor, Eslovenia',
      desde: '2022-09',
      hasta: '2023-06',
      detalles: [],
    },
    {
      id: 'ctv',
      tipo: 'experiencia',
      titulo: 'Auxiliar de producción',
      lugar: 'CTV, S.A., Santiago de Compostela',
      desde: '2019-09',
      hasta: '2020-02',
      detalles: [
        'Organización y distribución de documentación de preproducción y escaletas de rodaje.',
        'Montaje de sets y logística de desplazamiento de equipos técnicos y artísticos.',
      ],
    },
    {
      id: 'tecnico-audiovisual',
      tipo: 'formacion',
      titulo: 'Técnico Superior en Producción de Audiovisuales y Espectáculos',
      lugar: 'Escuela de Imagen y Sonido, A Coruña',
      desde: '2017-09',
      hasta: '2019-12',
      detalles: [],
    },
  ],
  certificacionesTitulo: 'Certificaciones',
  certificaciones: [
    { nombre: 'Generative AI Foundations', entidad: 'Pearson' },
    { nombre: 'WordPress Credits Certificate', entidad: 'WordPress' },
  ],
}
