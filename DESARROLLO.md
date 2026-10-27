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
  y el script la omite. La n.º 3 no se entregó (el WordPress la referencia en
  `/wp-content/uploads/2025/09/Oficina_Fundacion_Tejido_Humano_3.webp`: pedir el archivo).
  Se usan en Nuestras oficinas (banner + galería con visor) y en la galería de Inicio («Oficinas en Bogotá»).
- `media/imagenes-web/`: imágenes ilustrativas generadas con IA, registradas en `ILLUSTRATIVE`
  (`src/content/images.ts`, `illustrative: true`). Desde oct. 2026 no llevan rótulo visible (decisión de la
  Fundación): su carácter ilustrativo consta en el texto alternativo («Imagen ilustrativa: …») y en este
  registro. No usarlas como evidencia de proyectos ejecutados, instalaciones ni integrantes reales.
  Primera entrega: banners de los 5 servicios, proyectos solar, Alma Mater y desarrollo social, y la tarjeta
  «Centro de Conciliación» de la galería de Inicio. La imagen solar sustituye también a la foto antigua de
  baja resolución (`foto-paneles-sitio-actual.jpg`) en la galería de Inicio y en la página del proyecto.
- `media/logos/vigilado-minjusticia.png`: distintivo oficial, servido sin recomprimir (PNG original) en el
  pie de página y en Centro de Conciliación. **Validar** que la Fundación está autorizada a usar esta versión.

### Imágenes ilustrativas (segunda entrega, PNG)

Integradas en variantes WebP (el PNG original no se publica):
encabezados de Contáctenos, Proyectos, Quiénes somos, Gobierno corporativo y Diplomados; las dos imágenes
de la composición «Visión 2035» de Inicio; y el proyecto «Diplomado Fuerza Pública y Construcción de Paz»
(Proyectos, fila de Inicio y galería de Inicio).

### Espacios que siguen pendientes

| Espacio                                                                               | Motivo                                             |
| ------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Juan Miguel González Velasco: foto en mayor resolución (la entregada mide 148×194 px) | Original insuficiente para el marco completo       |
| Logo OEA, logos de aliados (8 en WordPress, `conv_N`)                                 | Archivos oficiales y permisos pendientes           |
| Proyecto solar: plano real del lote, fotos de dron                                    | Material documental: solo fotografías reales       |
| Oficinas: foto n.º 3                                                                  | Existe en WordPress, pendiente de entregar archivo |

Para integrarlas: guardar el WebP en `media/imagenes-web/`, añadirlo a `ILLUSTRATIVE` y pasarlo como
`image` (banners) o en el contenido correspondiente.

## Staff jurídico (actualizado el 27 de octubre de 2026)

Fuente: «STAFF DE LA FUNDACIÓN DFTH ACTUALIZADO JULIO 21-2025» (`docs/staff/`, documento privado: está en
`.gitignore` y no se publica). Datos en `STAFF` (`src/content/interior.ts`), en el orden del documento:

| N.º | Profesional                       | Cargo principal (documento)                                         | Fotografía (`media/staff/`)                                        |
| --- | --------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 1   | Jesús Enrique Archila Guio        | CEO y Representante Legal de la Fundación DFTH                      | `Dr. Jesús Enrique Archila .JPG`                                   |
| 2   | Leydi Yesenia Ramírez Aristizábal | Directora General                                                   | `Dra. Leydi Ramírez .JPG` (recorte vertical)                       |
| 3   | Pedro Octavio Munar Cadena        | Presidente de la Corte Suprema de Justicia de Colombia 2010         | `Dr. Pedro Munar Cadena .jpg`                                      |
| 4   | Lina María Munar Guevara          | Jurisdicción Especial para la Paz                                   | `Dra. Lina Maria Munar Guevara.jpg`                                |
| 5   | Yazmin Cadena Camargo             | Profesora, Decana Encargada de la Facultad de Medicina (Javeriana)  | `Dra. Yazmin Cadena Camargo.jpg`                                   |
| 6   | Ángela Margarita Rey Anaya        | Profesora, CEO de la Fundación United For Justice                   | `Dra. Margarita Rey Anaya .jpg`                                    |
| 7   | Juan Miguel González Velasco      | Docencia Universitaria y Consultor Internacional de Proyectos       | `Dr. Juan Miguel González Velassco.jpg` (148×194, baja resolución) |
| 8   | José Ricardo Archila Guio         | Director del Centro de Conciliación de la Fundación DFTH            | `Dr. José Ricardo Archila Guio.png`                                |
| 9   | Kelly Yojara Ramírez Aristizábal  | Directora Ejecutiva del Centro de Conciliación de la Fundación DFTH | `Dra. Kelly Yojara Ramírez .jpg`                                   |

- Salen del listado (no figuran en el documento actualizado): Carlos Gustavo Muñoz Díaz y William Armando
  Fonseca Flórez.
- Página `/equipo-juridico/`: banner con tres retratos reales (Jesús Enrique Archila, Leydi Ramírez y José
  Ricardo Archila), directorio de 9 tarjetas (3 · 2 · 1 columnas) y ficha completa en `<dialog>` con la
  biografía por apartados (`StaffDirectory.tsx`, `StaffPhoto.tsx`).
- Fotos reales también en: tarjetas del staff de Inicio, tarjeta «Staff jurídico» de la galería de Inicio
  (José Ricardo Archila) y tarjeta de Lina María Munar en Justicia para la paz. «11 profesionales» → «9».
- `scripts/optimize-images.mjs` publica los archivos con nombres sin tildes, espacios ni puntos
  (p. ej. `Dr-Jose-Ricardo-Archila-Guio`); los originales no se modifican.
- Sin cambios institucionales frente al sitio: Jesús Enrique Archila (CEO y representante legal), Leydi
  Ramírez (Directora General) y José Ricardo Archila (Director del Centro de Conciliación) coinciden.
- Pendiente: foto de Juan Miguel González en mayor resolución (se muestra reducida y enmarcada).

## Integraciones pendientes

- Avisos técnicos retirados de la interfaz (oct. 2026): rótulos «[Foto…]», «Imagen ilustrativa», aviso de
  fotografías provisionales, logos de aliados y logo OEA pendientes, horario por confirmar, notas internas
  sobre el sitio de WordPress. Se conservan los avisos que informan al usuario: documentos «Por cargar»,
  formulario sin servicio de envío, donaciones sin pasarela y política de datos (pie de página).
- Selector ES/EN retirado: el sitio se publica solo en español.

- Formulario de contacto: valida, pero no hay servicio de recepción; ofrece enviar por correo (`mailto:`).
  Para conectarlo (p. ej. Formspree/Resend/Web3Forms), cambiar `submit` en `ContactPanel.tsx`.
- Citas: enlace al calendario actual `https://fundacionderechoyformacion.org/wp-booking-calendar/`
  (dejará de existir si se retira WordPress: definir reemplazo).
- Donaciones: sin montos ni pasarela (pendiente de la Fundación).
- Gobierno corporativo: los 10 documentos se listan «Por cargar» (añadir `href` en `DOCUMENTS`).
  En WordPress tampoco tienen archivo adjunto.
- Diplomados: «Inscribirme gratis» abre el formulario de Google del sitio actual (`COURSE_SIGNUP_URL`,
  el mismo para los 21 programas, como en WordPress).
- Redes sociales, política de datos y mapa interactivo: pendientes.

## Datos pendientes de validar

- Capacidad de la planta: el sitio actual dice «15 MW»; el estudio técnico (PDF oficial) selecciona
  11,05 MWp como configuración óptima. El sitio muestra 11,05 MWp rotulado «configuración óptima».
- Estatus OEA: «2023» (diseño) frente a «CP/RES. 759 (1217/99)» (sitio actual).
- Presentación en Washington: fecha, lugar y entidad sin confirmar. La tarjeta «Presentación del proyecto»
  se retiró de la página; añadirla de nuevo (`SOLAR_WASHINGTON`) cuando haya datos verificados.
- Proyecto solar: resumen financiero y sitio del proyecto sin enlace verificado: sus tarjetas se retiraron
  de «Documentos» (datos en `SOLAR_DOCS.pending`); plano real del lote.
  - WordPress (`/proyectos/`) enlaza `…/2026/09/San-Francisco-Granja-Solar-Resumen-Financiero-1.pdf`, pero el
    PDF está marcado «Privileged and Confidential» y describe otra ubicación y capacidad (Manaure, Guajira ·
    23,652 MWp). No se enlaza hasta que la Fundación lo confirme.
  - «EcoEnergia15MW» (`https://ecoenergia15mw.org/presentation`) responde 404.
- Configuración «tracker monocristalino»: inversores y strings no informados en el documento («—»).
- Diplomados: en WordPress, «Impresión 3D», «Genera recursos con IA» y «SST» repiten los objetivos de
  otro diplomado (Design Thinking, Canva y Prompting). Se muestran como «[Objetivos por confirmar]».
  Duración y horas no figuran en el texto (solo en una imagen, `5semanasvirtual.png`): por confirmar.
- Inicio · tarjeta de proyectos: WordPress dice «Desarrollo de proyectos en educación, ambientales,
  energéticos y seguridad integral»; el diseño dice «seguridad alimentaria y construcción de paz».
- Oficinas: WordPress habla de «instalaciones … en la torre Davivienda»; la dirección publicada es
  Calle 12B # 8A-34, interior 13. Confirmar antes de publicar ese texto.
- Distintivo «Vigilado Minjusticia»: confirmar autorización y vigencia de esta versión.

## Auditoría de contenido frente a WordPress (oct. 2026)

| Página                 | Estado                  | Recuperado                                                                                    | Pendiente / para validar                                                                     |
| ---------------------- | ----------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Inicio                 | Faltan bloques de texto | Galería: foto real de oficinas e imagen ilustrativa de Conciliación                           | Intros de Servicios y Staff; bloques Soluciones/Calidad/Experiencia; Testimonios (sin datos) |
| Quiénes somos          | Recuperado              | Párrafo completo «¿Quiénes somos?», propósito, visión completa, 3 áreas más                   | 2.ª oración de la misión (texto incompleto en la extracción)                                 |
| Equipo jurídico        | Recuperado              | «Formación y trayectoria» de 10 perfiles; magistrada Lily Rueda; cargo de W. Fonseca          | Biografía de J. M. González (duplicada en WordPress)                                         |
| Nuestras oficinas      | Casi completo           | —                                                                                             | Texto «torre Davivienda»; foto n.º 3; logo OEA                                               |
| Gobierno corporativo   | Completo                | 10 documentos (Insolvencia y Resolución 0026 separados); intro completa                       | Archivos de los documentos                                                                   |
| Estudio legal          | Recuperado parcialmente | 9 acciones que faltaban; definiciones completas de civil y comercial                          | Tablas por acción (objeto, juez competente, normatividad): requieren otro componente         |
| Litigio estratégico    | Recuperado              | Intro de la línea II, alegatos, INTERPOL, diálogo comunitario                                 | Detalle por formulario de la asistencia migratoria                                           |
| Centro de Conciliación | Recuperado              | 4 asuntos conciliables, texto completo de insolvencia, distintivo Minjusticia                 | «Adjudicación de apoyos» (WordPress repite otro texto)                                       |
| Educación para la paz  | Completo                | —                                                                                             | Lead completo (más largo que el banner del diseño)                                           |
| Justicia para la paz   | Recuperado              | Textos completos de competencias, víctimas y sanciones                                        | —                                                                                            |
| Proyectos              | Completo                | —                                                                                             | Descripción larga de Alma Mater; enlaces del proyecto solar (ver arriba)                     |
| Proyecto solar         | Completo                | —                                                                                             | Ver «Datos pendientes de validar»                                                            |
| Diplomados             | Recuperado              | Descripción completa, objetivos y enlace de inscripción real de los 21 (ficha «Ver detalles») | Objetivos de 3 programas; duración                                                           |
| Contáctenos            | Completo                | —                                                                                             | Horario (WordPress no lo publica)                                                            |

## Publicación en GitHub Pages

`.github/workflows/deploy.yml` compila y publica en cada push a `main`:
https://dewys-eguis.github.io/fundacion-derecho-formacion/

El workflow define `NEXT_PUBLIC_BASE_PATH=/fundacion-derecho-formacion`: `next.config.ts` lo usa como
`basePath` y `src/lib/image-loader.ts` lo antepone a las imágenes. Sin esa variable (Render, dominio propio,
`npm run dev`) el sitio se sirve desde la raíz. Para probar el subdirectorio en local:
`NEXT_PUBLIC_BASE_PATH=/fundacion-derecho-formacion npm run build`.

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
