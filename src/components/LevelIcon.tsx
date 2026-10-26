import type { SkillLevel } from '@/content'

// Barras de nivel: 3 = uso a diario, 2 = con soltura, 1 = aprendiendo.
// Complementa a la etiqueta de texto; el nivel nunca se comunica solo con el icono ni el color.
const BARRAS: Record<SkillLevel, number> = { diario: 3, soltura: 2, aprendiendo: 1 }

export function LevelIcon({
  nivel,
  className = 'size-4',
}: {
  nivel: SkillLevel
  className?: string
}) {
  const llenas = BARRAS[nivel]
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="currentColor">
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={1.5 + i * 5}
          y={10 - i * 4}
          width="3.5"
          height={4 + i * 4}
          rx="1"
          opacity={i < llenas ? 1 : 0.25}
        />
      ))}
    </svg>
  )
}
