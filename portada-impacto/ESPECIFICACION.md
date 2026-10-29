# Portada de impacto · Fundación Derecho y Formación

Especificación para reemplazar **solo el primer bloque (hero) del Inicio** de fundacionderechoyformacion.org (Next.js). El resto de la página no cambia.

Referencia visual exacta: `design/HeroImpacto.dc.html` (escritorio, 1440 px) y `design/HeroImpactoMobile.dc.html` (móvil, 390 px). Son HTML de diseño: leer su estructura, estilos inline y la clase `Component` (lógica de escenas). No copiarlos tal cual al proyecto: reconstruir como componentes React/Next.

## 1. Archivos
| Archivo | Uso |
|---|---|
| `assets/hero-3d-fundacion.webp` / `.jpg` | Fondo escritorio (1920×1080). `object-fit: cover; object-position: 72% center` |
| `assets/hero-3d-fundacion-movil.webp` | Fondo móvil (recorte centrado en el símbolo) |
| `tools/render_fdf.py`, `tools/post.py` | Regenerar el render en mayor resolución (Blender `bpy`): `python -c "import sys;sys.argv=['x','--','hero','3840','2160','128','out.png'];exec(open('render_fdf.py').read())"` y luego `python post.py out.png hero.jpg 0.72 0.4` |

Usar `next/image` con `priority`, `fill`, `sizes="100vw"` y `placeholder="blur"` (color #050E1A).

## 2. Tokens
- Colores: noche `#050E1A` (fondo), azul institucional `#0B2A4F`, azul `#1E64C8`, azul mapa `#5FA3EE`, naranja `#F4914D`, naranja hover `#FFA466`, durazno `#FFC9A3`, texto sobre oscuro `#C9DAF0`, gris azulado `#8FA6C8`.
- Tipografía: Plus Jakarta Sans 500/600/700/800 (todo) + Instrument Serif *italic* (solo la palabra clave del titular). Cargar con `next/font/google`.
- Radios: píldoras 999 px · tarjetas de cristal 18–22 px.
- Cristal: `background: rgba(255,255,255,.08); box-shadow: inset 0 0 0 1px rgba(255,255,255,.18); backdrop-filter: blur(14px)`.

## 3. Estructura (escritorio)
Sección `height: 940px` (o `min-height: 100svh`, máx. 1000 px), fondo noche, `overflow: hidden`.
1. **Imagen de fondo** + 2 velos: horizontal `linear-gradient(90deg, rgba(5,14,26,.95) 0%, rgba(5,14,26,.74) 38%, transparent 70%)` y inferior de 280 px hacia `rgba(5,14,26,.92)`.
2. **Barra superior** 46 px (transparente, borde inferior rgba blanco .08): teléfono 320 903 8228 · contacto@fundacionderechoyformacion.org · Calle 12B # 8A-34, int. 13 · Bogotá D.C. · a la derecha píldora con borde naranja «Organización con estatus consultivo ante la OEA».
3. **Navegación** 90 px, cristal oscuro `rgba(5,14,26,.35)` + blur 14: logo versión blanca · Inicio (activo, color durazno) · Quiénes somos · Qué hacemos · Proyectos · Diplomados · Contáctenos — **todo en una línea** (`white-space: nowrap`) · botón cristal «Donar» (corazón naranja, Wompi) · botón naranja «Agenda tu cita» (WhatsApp). Subrayado naranja animado en hover (scaleX 0→1, 350 ms). Mantener los submenús actuales del sitio. Al hacer scroll la barra queda fija (`position: sticky`) con el mismo cristal.
4. **Contenido de la escena** (máx. 880 px de ancho, padding-top 70 px): etiquetas → titular 96 px / 0.98 / -0.045em / 800 → bajada 20 px #C9DAF0 → 2 botones (60 px de alto, flecha en círculo que gira -45° en hover).
5. **Franja inferior**: 3 pestañas de cristal (220 px c/u) con número, nombre y barra de progreso naranja · tarjeta de cristal flotante con el dato de la escena · indicador «SCROLL» (ratón con punto animado) · **sello giratorio** naranja de 168 px.
6. Etiqueta «Render 3D del símbolo de marca» arriba a la derecha (11 px).
7. **Cinta naranja** debajo del hero (fondo #F4914D, texto 24 px/800 #0B2A4F) en desplazamiento infinito.

## 4. Escenas (contenido exacto)
| # | Pestaña | Etiquetas | Titular (*cursiva serif durazno*) | Bajada | Botón 1 | Botón 2 | Tarjeta |
|---|---|---|---|---|---|---|---|
| 01 | Proyecto solar | PROYECTO SOLAR · Presentación en Washington D.C. | De Washington a *Ciudad Bolívar.* | Planta solar fotovoltaica de 11,05 MWp en el sur de Bogotá: energía limpia para Ciudad Bolívar. | Ver el proyecto → /proyectos/planta-solar | Apoyar con una donación → Wompi | PLANTA SOLAR · 11,05 MWp · 23,1 ha · Ciudad Bolívar, sur de Bogotá D.C. |
| 02 | Conciliación | CENTRO DE CONCILIACIÓN · Adscrito al Ministerio de Justicia | Resolvemos conflictos con *diálogo.* | Conciliación y mediación, insolvencia de persona natural no comerciante y adjudicación de apoyos según la Ley 1996 de 2019. | Agenda tu cita → WhatsApp | Conocer el centro → /centro-de-conciliacion | ADSCRITO AL · Ministerio de Justicia y del Derecho · Resolución 0026 del 16 de enero de 2014 |
| 03 | Diplomados | DIPLOMADOS · Educación para la paz | Formación para *transformar.* | Educación de calidad, oportunidades para todos. Conozca nuestros 21 diplomados. | Ver diplomados → /diplomados | Agenda tu cita → WhatsApp | FORMACIÓN · 21 diplomados · Formación para transformar |

Enlaces: Wompi `https://checkout.wompi.co/l/VPOS_sUGqKF` · WhatsApp: usar el enlace «Agenda tu cita» que ya tiene el sitio (`https://wa.me/573209038228?text=…`). Ajustar las rutas internas a las del proyecto.

Cinta: Justicia ✦ Formación ✦ Cultura de paz ✦ Conciliación ✦ Litigio estratégico ✦ De Washington a Ciudad Bolívar ✦ Formación para transformar ✦

## 5. Interacción y movimiento (mismos efectos)
| Efecto | Implementación |
|---|---|
| Autoplay de escenas | cada **7 s**, ciclo 0→1→2. Clic en pestaña cambia escena y reinicia el temporizador. Pausar en hover/foco del hero y con la pestaña del navegador oculta. |
| Titular palabra por palabra | dividir en palabras; cada `span` inline-block anima `opacity 0→1, translateY(60%)→0, rotate(4deg)→0, blur(6px)→0`, 1 s `cubic-bezier(.16,.84,.24,1)`, retraso `0.08s + i·0.08s`. Se repite en cada cambio de escena (re-montar con `key`). |
| Bajada, botones, tarjeta | fade-up 24 px, 1 s, retrasos 0.5 s / 0.65 s / 0.35 s. |
| Barra de progreso de pestaña | `scaleX 0→1` lineal en 7 s, origen izquierda, solo en la activa. |
| Fondo | Ken Burns `scale 1.12→1` en 14 s ease-out al cargar + parallax al hacer scroll `translateY(0→90px) scale(1→1.04)` en los primeros 900 px (CSS `animation-timeline: scroll()` con fallback a Framer Motion `useScroll`). |
| Sello | texto circular SVG (`textPath`, `textLength` para cerrar el círculo) «AGENDA TU CITA ✦ TEJIDO HUMANO ✦» girando 360° en 22 s lineal infinito; flecha fija al centro. Enlaza a WhatsApp. |
| Tarjeta de dato | flotación `translateY(0→-14px→0)` 7 s infinito. |
| Indicador scroll | punto que baja 8 px y se atenúa, 2 s infinito. |
| Cinta | `translateX(0→-50%)` 40 s lineal infinito con el contenido duplicado. |
| Botones | hover: `translateY(-2px)`, flecha `rotate(-45deg) scale(1.06)`, 400 ms. |

Sugerido: Framer Motion (`AnimatePresence` para escenas) o CSS puro; ambos valen. **Ningún contenido debe depender de una animación para ser visible** (sin `opacity: 0` permanente si falla JS).

## 6. Móvil (< 768 px)
Ver `HeroImpactoMobile.dc.html`: altura 100svh (844 px de referencia) · cabecera 72 px con logo compacto y botón de menú · etiqueta + titular 46 px arriba · imagen `hero-3d-fundacion-movil.webp` al centro con velos superior e inferior · bajada, botón naranja ancho completo «Agenda tu cita», botón contorno «Donar» · 3 barras de progreso como pestañas · sello de 96 px sobre la imagen. Barra superior de contacto oculta en móvil. Tablet: titular 72 px, pestañas en fila con scroll horizontal.

## 7. Accesibilidad y rendimiento
- `prefers-reduced-motion: reduce` → sin autoplay, sin giro, sin cinta, sin Ken Burns; escenas cambian solo con las pestañas.
- Pestañas con `role="tablist"`/`tab`, `aria-selected`, navegables con flechas; región con `aria-live="polite"` para el titular.
- Sello y botones de icono con `aria-label`. Imagen de fondo decorativa (`alt=""`).
- Contraste: texto blanco y #C9DAF0 sobre los velos ≥ 4.5:1; texto #0B2A4F sobre naranja.
- LCP < 2,5 s: imagen hero en WebP/AVIF con `priority`; fuentes con `display: swap`.

## 8. Criterios de aceptación
- [ ] Se ve igual a `design/HeroImpacto.dc.html` a 1440 px y a `HeroImpactoMobile.dc.html` a 390 px.
- [ ] Menú en una sola línea entre 1280 y 1920 px.
- [ ] Las 3 escenas rotan cada 7 s y responden a las pestañas; el titular se anima palabra por palabra en cada cambio.
- [ ] Sello, cinta, tarjeta flotante, Ken Burns y parallax funcionando.
- [ ] Enlaces de Donar, WhatsApp y rutas internas correctos.
- [ ] Reduced motion respetado; Lighthouse accesibilidad ≥ 95.
- [ ] El resto del Inicio sin cambios.
