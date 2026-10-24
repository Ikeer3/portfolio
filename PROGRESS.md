# PROGRESS

Seguimiento del portfolio de Iker Santos (interfaz estilo editor de código).
Permite retomar el trabajo en una conversación nueva sin perder el hilo.

## Estado actual

- **Fase actual:** 3 · Estructura de la interfaz (pendiente de empezar)
- **Fases completadas:** 1, 2
- **Producción:** https://portfolio-iker-santos.vercel.app
- **Repositorio:** https://github.com/Ikeer3/portfolio

## Fases

| Fase                                           | Estado     |
| ---------------------------------------------- | ---------- |
| 1. Plan y configuración del proyecto           | Completada |
| 2. Sistema de diseño y temas                   | Pendiente  |
| 3. Estructura de la interfaz                   | Pendiente  |
| 4. Contenido y páginas                         | Pendiente  |
| 5. Paleta de comandos, atajos, menús y ajustes | Pendiente  |
| 6. Búsqueda real                               | Pendiente  |
| 7. Source control con la API de GitHub         | Pendiente  |
| 8. Terminal y comandos                         | Pendiente  |
| 9. Iker's Assistant                            | Pendiente  |
| 10. Juego, easter egg y cursor                 | Pendiente  |
| 11. Internacionalización (es/en)               | Pendiente  |
| 12. Vista simple                               | Pendiente  |
| 13. Adaptación móvil                           | Pendiente  |
| 14. Accesibilidad, rendimiento y pulido        | Pendiente  |
| 15. Despliegue en Vercel y README              | Pendiente  |

## Decisiones tomadas

- Plan inicial aprobado el 23-oct-2026.
- Stack: Vite + React + TypeScript estricto (SPA), Tailwind con variables CSS, Zustand, Fontsource, ESLint, Prettier y Vitest, despliegue en Vercel.
- ESLint fijado en la versión 9: `eslint-plugin-jsx-a11y` aún no admite la 10.
- Alias `@` apunta a `src/` (en TypeScript y en Vite).
- LinkedIn: se usa el enlace del prompt (`linkedin.com/in/iker-santos-insua/`), no el del CV.
- Paletas ajustadas respecto a los valores orientativos: barra de estado `#005fa3` y acento claro `#0b62b8`, para cumplir contraste ≥ 4.5:1.
- Repositorio del portfolio: `Ikeer3/portfolio`; ese valor va en `VITE_GITHUB_REPO` (formato propietario/repositorio), también configurado en Vercel.
- Los temas tienen una única fuente de verdad en `src/themes/`; `applyTheme()` vuelca los tokens como variables CSS y Tailwind las lee (`bg-bg`, `text-fg`, `text-accent`...).
- El tema se guarda en `localStorage` (clave `iker-portfolio:tema`) con `try/catch`; sin preferencia guardada se respeta el esquema del sistema.
- Fuentes autoalojadas con Fontsource: JetBrains Mono (cuerpo y código) y Bricolage Grotesque (titulares).
- Tamaños fluidos `text-display` y `text-title` con `clamp()`.
- Las pruebas exigen contraste WCAG AA (4.5:1) en 14 pares de color por tema.

## Pendientes

- [PENDIENTE] Descripciones de los 3 proyectos de GitHub y contribuciones a WordPress.
- [PENDIENTE] Nivel de cada tecnología (Uso a diario / Con soltura / Aprendiendo).
- React Native y TypeScript aparecen en el prompt pero no en el CV.

## Scripts

`npm run dev` · `npm run build` · `npm run lint` · `npm run format` · `npm test`

## Notas para la fase 3

- `App.tsx` tiene un selector de tema provisional que se sustituirá por la interfaz tipo editor.
- Escala de espaciado de 4 px y zonas táctiles de 44 px mínimo en móvil, aún sin aplicar.
