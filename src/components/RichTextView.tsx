import type { RichText } from '@/content'

// Pinta un texto con palabras clave resaltadas en el color de acento
export function RichTextView({ texto }: { texto: RichText }) {
  return (
    <>
      {texto.map((tramo, i) =>
        typeof tramo === 'string' ? (
          tramo
        ) : (
          <strong key={i} className="font-semibold text-accent">
            {tramo.resaltado}
          </strong>
        ),
      )}
    </>
  )
}
