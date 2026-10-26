# Fundacion_Derecho_Formacion

Paquete de transferencia del diseño del sitio web de la Fundación Derecho y Formación — Tejido Humano a Claude Code.

## Contenido
```
Fundacion_Derecho_Formacion/
├─ CLAUDE.md                 ← contexto que Claude Code lee automáticamente
├─ README.md
├─ design/
│  ├─ screens/               ← 23 pantallas y componentes del lienzo (.dc.html)
│  ├─ assets/                ← 4 visualizaciones 3D + 1 foto real
│  ├─ screenshots/           ← aquí van las capturas exportadas del lienzo
│  ├─ tokens.json            ← colores, tipografía, radios, sombras, movimiento
│  └─ canvas.json            ← mapa del lienzo
├─ docs/
│  ├─ handoff.md             ← componentes, interacciones, accesibilidad, pendientes
│  └─ fuentes-contenido.md   ← origen de cada dato e imagen
└─ tools/blender/            ← scripts para regenerar los renders 3D
```

## Inicio rápido (Windows)
1. Descomprima este archivo en el Escritorio de modo que quede `Escritorio\Fundacion_Derecho_Formacion\CLAUDE.md`.
2. Abra PowerShell en esa carpeta y ejecute `claude`.
3. Primer mensaje sugerido: «Lee CLAUDE.md, design/tokens.json y docs/handoff.md, revisa design/screens y design/screenshots, y confirma que tienes acceso a todo el diseño. No escribas código todavía.»
