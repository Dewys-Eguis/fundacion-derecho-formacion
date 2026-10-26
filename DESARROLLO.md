# Desarrollo — sitio Fundación Derecho y Formación

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP 3 + ScrollTrigger.
Exportación estática (`output: 'export'`) para **Render Static Site**: sin servidor Node.

## Referencia visual

La referencia principal es `design/screenshots/Tejido Humano — Sitio completo.pdf` (21 páginas:
pág. 1 Home escritorio, pág. 4 Home móvil, pág. 18 sistema visual). Si difiere de `design/screens/*.dc.html`,
manda el PDF. Excepciones deliberadas:

- Narrativa del proyecto: siempre «De Washington a Ciudad Bolívar» (CLAUDE.md), aunque el PDF diga lo contrario.
- Logo: se conserva el de `Logo.dc.html` (aprobado en la fase 1); el PDF muestra una versión anterior.
- En móvil se muestra toda la información de escritorio, aunque el prototipo móvil la omita.

Para revisarlo como imágenes: renderizar las páginas a PNG en una carpeta temporal (no dentro de `design/`).

## Estado de las páginas

Alcance = páginas del sitio actual (fundacionderechoyformacion.org). Todas implementadas.

| Página (URL original)                                                           | Ruta nueva                                                         | PDF   |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----- |
| Inicio `/`                                                                      | `/`                                                                | 1 y 4 |
| Planta solar (autorizada aparte)                                                | `/proyectos/planta-solar-san-francisco/`                           | 2 y 5 |
| Proyectos y publicaciones `/proyectos-y-publicaciones/`, `/proyectos/`          | `/proyectos-y-publicaciones/`                                      | 3     |
| Quiénes somos `/quienes-somos/`                                                 | `/quienes-somos/`                                                  | 7     |
| Misión y visión `/misio-y-vison-new/`                                           | `/quienes-somos/#mision-vision` (ancla)                            | 7     |
| Staff jurídico `/equipo-juridico/`                                              | `/equipo-juridico/`                                                | 8     |
| Nuestras oficinas `/nuestras-oficinas/`                                         | `/nuestras-oficinas/`                                              | 9     |
| Gobierno corporativo `/gobierno-corporativo-new/`                               | `/gobierno-corporativo/`                                           | 10    |
| Estudio legal `/estudio-legal-consultoria-y-portafolio-juridico-new/`           | `/estudio-legal-consultoria/`                                      | 11    |
| Litigio estratégico `/litigio-estrategico-new/`                                 | `/litigio-estrategico/`                                            | 12    |
| Centro de Conciliación `/centro-de-conciliacion-new/`                           | `/centro-de-conciliacion/`                                         | 13    |
| Educación para la paz `/educacion-para-la-paz-…-new/`                           | `/educacion-para-la-paz/`                                          | 14    |
| Justicia para la paz `/justicia-para-la-paz`                                    | `/justicia-para-la-paz/`                                           | 15    |
| Diplomados `/diplomados/`                                                       | `/diplomados/`                                                     | 16    |
| Contáctenos `/contactenos/` + Agenda `/wp-booking-calendar/` + Donaciones (`#`) | `/contactenos/` (pestañas `#escribanos`, `#agenda`, `#donaciones`) | 17    |

`PUBLISHED_ROUTES` (`src/content/routes.ts`) alimenta `sitemap.xml`.
El banner interior (`PageBanner`) sigue el PDF: banda cielo con tarjeta de foto (placeholder o foto real con `image`).

### Al publicar (Render)

Las URL antiguas de WordPress (`/misio-y-vison-new/`, `/gobierno-corporativo-new/`, etc.) cambian. Con
exportación estática no hay redirecciones en Next: configurarlas en Render (Redirects/Rewrites) cuando se
apunte el dominio.

## Fotografías

- `media/Oficinas/`: 4 fotos reales (1, 2, 4 y 5 · 1080×810). `…_4-300x225.webp` es una miniatura duplicada
  y el script la omite. No hay foto n.º 3. Se usan solo en Nuestras oficinas (banner + galería con visor).
- Resto: placeholders celestes con el archivo esperado, hasta recibir fotos oficiales.

## Integraciones pendientes

- Formulario de contacto: valida, pero no hay servicio de recepción; ofrece enviar por correo (`mailto:`).
  Para conectarlo (p. ej. Formspree/Resend/Web3Forms), cambiar `submit` en `ContactPanel.tsx`.
- Citas: enlace al calendario actual `https://fundacionderechoyformacion.org/wp-booking-calendar/`
  (dejará de existir si se retira WordPress: definir reemplazo).
- Donaciones: sin montos ni pasarela (pendiente de la Fundación).
- Gobierno corporativo: los 9 documentos se listan «Por cargar» (añadir `href` en `DOCUMENTS`).
- Redes sociales, política de datos y mapa interactivo: pendientes.

## Datos pendientes de validar

- Capacidad de la planta: el sitio actual dice «15 MW»; el estudio técnico (PDF oficial) selecciona
  11,05 MWp como configuración óptima. El sitio muestra 11,05 MWp rotulado «configuración óptima».
- Estatus OEA: «2023» (diseño) frente a «CP/RES. 759 (1217/99)» (sitio actual).
- Presentación en Washington: fecha, lugar y entidad `[por confirmar]`.
- Proyecto solar: resumen financiero y sitio del proyecto `[enlace por confirmar]`; plano real del lote.
- Configuración «tracker monocristalino»: inversores y strings no informados en el documento («—»).

## Requisitos

Node.js 20.9 o superior (probado con Node 24) y npm.

## Comandos

| Comando                 | Qué hace                                                                        |
| ----------------------- | ------------------------------------------------------------------------------- |
| `npm install`           | Instala dependencias (solo la primera vez).                                     |
| `npm run dev`           | Servidor de desarrollo con recarga en caliente → http://localhost:3000          |
| `npm run build`         | Genera las imágenes optimizadas y exporta el sitio estático en `out/`.          |
| `npm run preview`       | Sirve `out/` tal como lo hará Render → http://localhost:4173                    |
| `npm run check`         | Tipos (tsc) + ESLint + formato (Prettier).                                      |
| `npm run format`        | Formatea el código con Prettier.                                                |
| `npm run images`        | Regenera las variantes WebP de `design/assets/` y `media/`.                     |
| `npm run build:interno` | Igual que `build` pero incluye las páginas internas (`/sistema/`). No publicar. |

## Páginas internas

`/sistema/` (componentes y sistema visual) es una herramienta de revisión, no parte del sitio público:
su archivo es `src/app/sistema/page.dev.tsx` y solo existe en `npm run dev` (http://localhost:3000/sistema/)
o con `npm run build:interno`. `npm run build` —el que usa Render— la excluye; no está enlazada ni en el
sitemap. Eliminar la carpeta `src/app/sistema/` cuando terminen las pruebas visuales.

## Estructura

```
src/
  app/            rutas (App Router). layout.tsx = Header + Footer + transiciones
  components/
    brand/        Logo
    layout/       TopBar, Header, MegaMenu, MobileMenu, Footer, PageBanner
    ui/           Button, Chip, cards, PillGroup (tabs/filtros), Accordion, Breadcrumbs,
                  ArrowButton, placeholders (rótulos 3D, silueta, foto pendiente), icons
    motion/       gsap.ts (registro), MotionProvider (data-reveal), Parallax, CountUp
  content/        textos y datos copiados literalmente del diseño (site, routes, banners, images)
  lib/            loader de imágenes para la exportación estática
  styles/         globals.css = tokens de design/tokens.json en @theme de Tailwind
scripts/          optimize-images.mjs, preview.mjs
media/            fotografías reales que entregue la Fundación (ver media/LEEME.md)
render.yaml       configuración de Render (Static Site) para cuando se publique
```

## Reglas

- `design/`, `docs/`, `tools/`, `CLAUDE.md` y `README.md` son material original: solo lectura.
- Contenido: solo lo del diseño, la documentación o el sitio actual. Lo pendiente va entre `[corchetes]`
  con `<Pending>` o `data-pending` (buscar `data-pending` para listarlos).
- Renders 3D siempre con `<RenderLabel />`. Equipo con silueta neutra hasta tener fotos reales.
- Animaciones: añadir `data-reveal` a un elemento para el fade-up global; todo movimiento opcional
  va bajo `prefers-reduced-motion: no-preference`.

## Imágenes

`next/image` no tiene optimizador en una exportación estática. `scripts/optimize-images.mjs` genera
variantes WebP (390–1920 px) en `public/images/_opt/` antes de `dev` y `build`, y `src/lib/image-loader.ts`
elige la adecuada. Referenciar siempre como `/images/<archivo>.jpg` con `width` y `height`.

## Publicación en Render (cuando se autorice)

1. Subir el repositorio a GitHub.
2. En Render: New → Blueprint (usa `render.yaml`) o Static Site con
   build `npm ci && npm run build` y carpeta de publicación `out`.
3. Cada push a la rama principal despliega automáticamente.

## Publicación (GitHub + Render)

Estado: listo para conectar. `render.yaml` define el Static Site (build `npm ci && npm run build`,
publica `out/`, Node 22, cabeceras de caché) y 20 redirecciones 301 de las URL antiguas de WordPress.
`/sistema/` no entra en la exportación de producción (solo `npm run dev` o `npm run build:interno`).
El PDF de referencia (34 MB) está excluido del repositorio en `.gitignore`.

1. En github.com: «New repository» → nombre `fundacion-derecho-formacion`, privado, sin README ni .gitignore.
2. En la carpeta del proyecto:
   ```
   git init -b main
   git add .
   git commit -m "Sitio Fundación Derecho y Formación"
   git remote add origin https://github.com/<usuario>/fundacion-derecho-formacion.git
   git push -u origin main
   ```
3. En render.com: «New» → «Blueprint» → conectar GitHub → elegir el repositorio → «Apply».
   Render construye y publica en `https://fundacion-derecho-formacion.onrender.com`.
4. Revisar el sitio en esa URL. Después, en Render → «Settings» → «Custom Domains», añadir el dominio y
   actualizar el DNS. Las redirecciones solo actúan cuando el dominio apunta a Render.

Antes de mover el dominio: resolver el calendario de citas (hoy vive en WordPress, en el mismo dominio).
