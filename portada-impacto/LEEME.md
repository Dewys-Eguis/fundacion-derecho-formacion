# Portada de impacto · paquete para Claude Code

1. Copie la carpeta `portada-impacto` dentro de la carpeta del proyecto de la web (la raíz del proyecto Next.js, al lado de `package.json`).
2. Abra una terminal en la raíz del proyecto y ejecute `claude`.
3. Pegue este mensaje:

```
Lee portada-impacto/ESPECIFICACION.md y revisa los diseños portada-impacto/design/HeroImpacto.dc.html (escritorio) y portada-impacto/design/HeroImpactoMobile.dc.html (móvil).

Quiero que reemplaces SOLO el primer bloque (hero) de la página de Inicio por esta portada de impacto, con los mismos efectos e interacciones: render 3D de fondo con Ken Burns y parallax, titular que aparece palabra por palabra, 3 escenas con autoplay de 7 s y pestañas con barra de progreso, tarjeta de cristal flotante, sello giratorio "Agenda tu cita", menú de cristal oscuro en una sola línea e indicador de scroll, y la cinta naranja en movimiento debajo. No cambies nada más del sitio.

Antes de escribir código: revisa cómo está construido el Inicio actual (componentes, estilos, fuentes, rutas, enlaces de Donar y WhatsApp) y dime tu plan en pocos pasos. Usa las imágenes de portada-impacto/assets (cópialas a /public/images). Respeta prefers-reduced-motion y la accesibilidad de la especificación. Al terminar, levanta el servidor de desarrollo, revisa el resultado a 1440 px y a 390 px contra los diseños, y verifica los criterios de aceptación de la sección 8.
```

4. Revise el plan que le propone, apruébelo y deje que lo implemente. Al final pídale: «Haz commit en una rama nueva llamada portada-impacto».

Contenido de la carpeta:
- `ESPECIFICACION.md`: tokens, textos exactos, animaciones con tiempos, móvil, accesibilidad y criterios de aceptación.
- `design/`: los dos tableros del lienzo en HTML (referencia visual exacta).
- `assets/`: render 3D del símbolo (escritorio y móvil, WebP y JPG).
- `tools/`: scripts de Blender para regenerar el render en 4K si se necesita.
