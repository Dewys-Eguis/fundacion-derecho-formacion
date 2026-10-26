# Especificación de desarrollo (handoff)

Equivale a la lámina `design/screens/Handoff.dc.html`.

## Componentes
| Componente | Descripción | Fuente |
|---|---|---|
| Logo | Símbolo de 3 anillos (azul acción, naranja, azul institucional) con nodos; nombre «Fundación Derecho y Formación» + descriptor «Tejido Humano». Tonos `light` / `dark`; tamaños `lg`, `md`, `sm`, `xs` (xs = nombre en dos líneas, móvil). | Logo.dc.html |
| Header | Barra superior azul (teléfono, correo, dirección, sello OEA, ES/EN) + navegación blanca 84 px con mega menús «Quiénes somos» y «Qué hacemos», botones Donar y Agenda tu cita. Sticky al hacer scroll. | Header.dc.html |
| Footer | Bloque azul redondeado, columnas, sellos institucionales, redes, wordmark «Derecho y Formación». | Footer.dc.html |
| PageBanner | Banner interior 480 px con imagen, overlay, migas, rótulo, título, entradilla y rótulo de imagen temporal. Props: crumb, eyebrow, heading, lead, photo, art. | PageBanner.dc.html |
| HeroSlider | 3 escenas a pantalla completa (900 px), crossfade 900 ms, autoplay 7 s, pestañas con barra de progreso, barra blanca de KPIs. | Main.dc.html |
| FocusBand | «De Washington a Ciudad Bolívar»: imagen + mapa de puntos de las Américas con arco punteado y flecha de Washington (01 · Presentación) a Ciudad Bolívar (02 · Impacto). | Main / ProyectoSolar |
| CurvedGallery | Carrusel horizontal con máscara curva superior e inferior (estilo CIREC), flechas. | Main / Oficinas / Mobile |
| TechConfigurator | 4 configuraciones del PDF con barras comparativas. | ProyectoSolar / MobileSolar |
| Tabs / Filters | Píldoras sobre contenedor Bruma; activa azul institucional. | varias |
| Accordion | Litigio, preguntas, líneas de servicio (móvil), menú móvil. | Litigio / Mobile / MobileMenu |
| Calendar | Agenda; conectar al sistema de reservas actual (`/wp-booking-calendar/`) o su reemplazo. | Contacto |
| Forms | Contacto (Nombre, Correo, Mensaje, Enviar), donación (COP/USD, montos por definir), voluntariado. | Contacto |
| TeamCard | Silueta neutra «Foto pendiente» + nombre + cargo. | Main / Staff |

## Interacciones y movimiento
- Hero: crossfade 900 ms, autoplay 7 s (pausar en hover y con prefers-reduced-motion).
- Arco del mapa: se dibuja al entrar en pantalla (stroke-dashoffset).
- Secciones: fade-up 24 px con stagger 80 ms.
- Tarjetas: translateY(-6px) en hover, 300 ms.
- Galería: arrastre con inercia y snap.
- Mega menú: aparición 200 ms con desplazamiento 8 px.

## Accesibilidad
- Contraste AA: naranja #B5531A para texto pequeño; #F4914D solo como fondo con texto #0B2A4F.
- Foco visible: anillo 3 px #1E64C8.
- Objetivos táctiles mínimos 44 × 44 px.
- Pestañas con `role="tab"`, acordeones con `aria-expanded`.
- Imágenes con `alt` descriptivo; decorativas con `alt=""`.

## Imágenes
| Archivo | Uso | Nota |
|---|---|---|
| render-hero-ciudad-bolivar.jpg | Hero 1, banner del proyecto, banners interiores | Visualización 3D (Blender Cycles), 1920×980 |
| render-vista-elevada.jpg | Hero 2, proyecto destacado | Visualización 3D |
| render-paneles-reflejo.jpg | Hero 3, banda Washington | Visualización 3D |
| render-ladera.jpg | Cierre del Home, impacto social | Recorte del render 1 |
| foto-paneles-sitio-actual.jpg | Galería, resumen del proyecto | Foto real del sitio actual (baja resolución: pedir original) |

Los renders pueden regenerarse con `tools/blender/render_solar.py` (modos `hero`, `drone`, `close`) y `post.py`.

## Pendientes de contenido (confirmar con la Fundación)
- Logo oficial en vector (SVG/AI); el del diseño es una adaptación.
- Fotos reales del staff (11 personas) y de oficinas (5 en el sitio actual).
- Fotos de los proyectos: logo Alliance, proyecto_3_3.jpg, proyecto_4.jpg (sitio actual).
- Fotografías reales del lote / drone del proyecto solar.
- Capacidad a comunicar: el sitio dice 15 MW; el estudio indica 11,05 MWp óptimos.
- Fecha, lugar y entidad de la presentación en Washington D.C.
- Horarios de atención.
- Enlaces de documentos de gobierno corporativo.
- Pasarela y montos de donación.
- Identidad y permisos de los 8 logos de aliados (conv_*).
- URLs de Facebook, LinkedIn y YouTube.
- Biografía de Juan Miguel González (duplicada en el sitio actual).
- Texto de «Adjudicación de apoyos» (el sitio muestra otro contenido).
- Política de tratamiento de datos.
- Traducción al inglés.
