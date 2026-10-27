# PROGRESS

Seguimiento del portfolio de Iker Santos (interfaz estilo editor de código).
Permite retomar el trabajo en una conversación nueva sin perder el hilo.

## Estado actual

- **Fase actual:** 5 · Paleta de comandos, atajos, menús y ajustes (pendiente de empezar)
- **Fases completadas:** 1, 2, 3, 4
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

- Estructura (fase 3): `TitleBar`, `MenuBar`, `ActivityBar`, `Sidebar` (con `FileTree`), `EditorArea` (`TabBar`, `Breadcrumbs`, `Editor`) y `StatusBar`, montados en `App.tsx`.
- Archivos del editor y carpetas definidos en `src/content/files.ts`; los textos de la interfaz en `src/content/es/ui.ts` (tipados con `UiStrings`, listos para añadir el inglés). Los componentes los leen con `useUi()`.
- Estado de pestañas y barra lateral en `src/store/workspace.ts`. Las pestañas no se recuerdan: arranca siempre con `home.tsx`.
- Al cerrar la pestaña activa se pasa a la vecina de la derecha o, si no hay, a la de la izquierda.
- Los controles cuya función llega más adelante (menús, buscador de la barra de título, Source control, Asistente, Ajustes) están como `aria-disabled` con el texto «Próximamente».
- Accesibilidad: pestañas con patrón WAI-ARIA (flechas, Inicio y Fin), árbol como listas con `aria-expanded`, foco visible global.
- CV en `public/CV_Iker_Santos.pdf`. El repositorio es público, así que el teléfono y el correo del CV quedan visibles en GitHub.

- Ajustes visuales pedidos tras la fase 3: iconos de la barra de actividad a 24 px; botones de ventana rojo, amarillo y verde con icono al pasar el cursor; selector de tema como ventana emergente (`ThemePicker`, rol `menu` con `menuitemradio`); iconos de tecnología en los archivos.
- Los colores de los botones de ventana son fijos (no dependen del tema).
- Iconos de archivo de Devicon (MIT) copiados en `src/assets/file-icons/`; Markdown recoloreado en gris; los iconos de JSON (llaves ámbar) y PDF son propios, porque el logotipo oficial de JSON (un remolino) no se reconocía como tipo de archivo. Atribución en `THIRD_PARTY_NOTICES.md`.
- CV: se mantiene el original con teléfono y correo en `public/CV_Iker_Santos.pdf` (decisión de Iker).

- Contenido (fase 4): todos los datos viven en `src/content/es/` (perfil, enlaces, proyectos, habilidades, experiencia) con tipos en `src/content/data-types.ts`; los componentes solo los muestran (`useContent()`). El inglés se añadirá en la fase 11.
- Páginas en `src/pages/` (una por archivo) montadas desde `src/pages/index.tsx`.
- Enlaces de contacto en un único array (`src/content/es/links.ts`); home, contacto y README lo leen.
- Habilidades: nivel siempre con etiqueta de texto más icono de barras, sin porcentajes. Multimedia y marketing en sección aparte, todo con soltura. Las tecnologías del portfolio no aparecen (hay una prueba que lo vigila).
- Proyectos: moodboard y blog se previsualizan en un marco de navegador con dirección localhost simulada. El iframe no se carga hasta pulsar «Ver vista previa» y lleva `sandbox` y `referrerPolicy="no-referrer"`; siempre hay enlace para abrir aparte.
- Formulario de contacto: validación visual completa, sin envío. La lógica de envío está aislada en `src/lib/contact/send.ts` (devuelve «no configurado»).
- Home: efecto de escritura en el eslogan (`TypingText`), desactivado con `prefers-reduced-motion`.
- Token de color `danger` añadido a los tres temas (probado con contraste AA).
- Lo del enfoque actual (página «Sobre mí») se ha redactado a partir de los niveles «aprendiendo» de Iker y de su informe de WP Credits.

- Correcciones tras revisar la fase 4: los textos `sr-only` se contienen en el área de scroll (`relative` en el panel del editor) para evitar una segunda barra vertical; cada pestaña monta su propio panel (`key`) y siempre empieza arriba; contenido alineado a la izquierda con menos margen (`max-w-5xl`, `px-6 py-6`); cifras de las estadísticas alineadas arriba.
- Home: tres frases (`profile.eslogans`) que se escriben y se borran en bucle (`src/lib/typing.ts` + `TypingText`). Con `prefers-reduced-motion` se muestra la primera, sin animación. Posible mejora de accesibilidad pendiente de decidir: un control para pausar la animación.
- Las vistas previas de moodboard y blog se abren como pestañas del editor (`preview:<idProyecto>`), a pantalla completa, con dirección `localhost` simulada. `describeTab()` describe cualquier pestaña (archivo o vista previa).

## Pendientes

- [PENDIENTE] Confirmar el estado actual del pull request nº 237 de WordPress/blueprints (no se ha podido verificar; la descripción no afirma su estado).
- [PENDIENTE] Confirmar cuál es la URL de LinkedIn correcta: el prompt usa `/in/iker-santos-insua/`, el CV y el moodboard `/in/iker-santos-insua-80bbb3299/`.
- Comprobar que el blog (WordPress.com) y el moodboard (Cloudflare Pages) se muestran dentro del marco; si alguno lo bloquea, el enlace «Abrir en pestaña nueva» sigue funcionando.

## Scripts

`npm run dev` · `npm run build` · `npm run lint` · `npm run format` · `npm test`

- [PENDIENTE] Iker indicará más adelante qué hacen los botones Cerrar y Pantalla completa de la barra de título (ahora son botones no disponibles).

## Notas para la fase 5

- Los menús, el buscador de la barra de título, el engranaje de Ajustes, Source control y el Asistente siguen como `aria-disabled` con «Próximamente».
- Los botones de ventana (Cerrar, Minimizar, Pantalla completa) esperan que Iker indique su función; el menú Ver → Pantalla completa usará la Fullscreen API.
- Móvil (fase 13): la barra lateral ocupa 240 px fijos y falta el menú hamburguesa.
