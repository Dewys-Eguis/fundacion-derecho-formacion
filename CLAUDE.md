# Fundación Derecho y Formación — Tejido Humano · Sitio web

Contexto permanente para Claude Code en este repositorio.

## Qué es este proyecto
Rediseño completo de https://fundacionderechoyformacion.org/ (hoy en WordPress) como sitio desarrollado en código.
El diseño aprobado está en `design/`. **La fidelidad visual al diseño es obligatoria**: no reinterpretar colores, tipografías, espaciados, jerarquías ni textos.

El sitio acompañará la presentación del proyecto **Planta solar fotovoltaica San Francisco** en Washington D.C.; la narrativa es siempre **«De Washington a Ciudad Bolívar»** (presentación → impacto), nunca al revés.

## Fuente de verdad del diseño
| Recurso | Ruta | Uso |
|---|---|---|
| Pantallas (código fuente del diseño) | `design/screens/*.dc.html` | Marcado, estilos en línea exactos, textos y datos de cada pantalla. Formato «Design Component»: `{{variable}}` sale de `renderVals()` en el `<script type="text/x-dc">` del final; `<sc-for>` = repetición, `<sc-if>` = condicional, `<dc-import name="X">` = incluye `X.dc.html`. No se ejecutan fuera del lienzo: se leen como especificación. |
| Capturas de referencia | `design/screenshots/` | Exportadas desde el lienzo. Comparar visualmente contra ellas. |
| Tokens | `design/tokens.json` | Colores, tipografía, radios, sombras, overlays, movimiento, breakpoints. |
| Mapa del lienzo | `design/canvas.json` | Lista de pantallas, tamaños y notas. |
| Imágenes | `design/assets/` | Renders 3D y foto real (ver abajo). |
| Especificación de desarrollo | `docs/handoff.md` | Rutas, componentes, interacciones, accesibilidad y pendientes. |
| Fuentes de contenido | `docs/fuentes-contenido.md` | Origen de cada dato. |

## Reglas de contenido (estrictas)
1. **No inventar** estadísticas, alianzas, logros, nombres, fechas ni textos. Todo el contenido sale del diseño, del sitio actual o del PDF oficial del proyecto solar.
2. Lo pendiente va entre `[corchetes]` tal como está en el diseño; no rellenarlo.
3. Las imágenes `render-*.jpg` son **visualizaciones 3D conceptuales**: conservar siempre su rótulo «Visualización 3D conceptual · no es una fotografía del proyecto».
4. **Nunca** generar retratos del equipo: usar la silueta neutra «Foto pendiente» hasta tener fotos reales.
5. Español (Colombia) por defecto; la versión EN está prevista pero sin traducir.

## Pantallas → rutas
| Pantalla (archivo) | Ruta |
|---|---|
| Main.dc.html (+ Mobile.dc.html) | `/` |
| ProyectoSolar.dc.html (+ MobileSolar.dc.html) | `/proyectos/planta-solar-san-francisco` |
| Proyectos.dc.html | `/proyectos-y-publicaciones` |
| QuienesSomos.dc.html | `/quienes-somos` |
| Staff.dc.html | `/equipo-juridico` |
| Oficinas.dc.html | `/nuestras-oficinas` |
| Gobierno.dc.html | `/gobierno-corporativo` |
| EstudioLegal.dc.html | `/estudio-legal-consultoria` |
| Litigio.dc.html | `/litigio-estrategico` |
| Conciliacion.dc.html | `/centro-de-conciliacion` |
| Educacion.dc.html | `/educacion-para-la-paz` |
| JusticiaPaz.dc.html | `/justicia-para-la-paz` |
| Diplomados.dc.html | `/diplomados` |
| Contacto.dc.html | `/contactenos` |

Componentes compartidos: `Header`, `Footer`, `PageBanner`, `Logo` (+ `MobileMenu` para móvil). `Sistema.dc.html` y `Handoff.dc.html` son láminas de documentación, no páginas.

## Responsive
Solo existen diseños móviles para Inicio, Proyecto solar y Menú. Las demás páginas deben adaptarse siguiendo los mismos patrones del móvil (gutter 12–20 px, grids a una columna, carruseles horizontales, acordeones) y los breakpoints de `tokens.json`.

## Antes de programar
No empezar a escribir código hasta que el usuario lo indique explícitamente. El primer paso será proponer el stack y la estructura del proyecto para su aprobación.
