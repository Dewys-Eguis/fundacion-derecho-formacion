import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { IMAGE_WIDTHS } from "./src/lib/image-widths";

/**
 * Exportación estática para Render Static Site:
 * `npm run build` genera la carpeta `out/` (HTML/CSS/JS), sin servidor Node.
 *
 * Páginas internas (`page.dev.tsx`, p. ej. /sistema/): solo existen en `npm run dev`
 * o con `npm run build:interno`; nunca entran en la exportación de producción.
 *
 * GitHub Pages sirve el sitio en un subdirectorio: el workflow define
 * NEXT_PUBLIC_BASE_PATH=/fundacion-derecho-formacion. Sin esa variable (Render, dominio
 * propio, desarrollo local) el sitio se sirve desde la raíz, como hasta ahora.
 */
export default function config(phase: string): NextConfig {
  const internal = phase === PHASE_DEVELOPMENT_SERVER || process.env.INCLUDE_INTERNAL === "1";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

  return {
    output: "export",
    basePath,
    pageExtensions: internal ? ["dev.tsx", "tsx", "ts"] : ["tsx", "ts"],
    // /quienes-somos → out/quienes-somos/index.html (servido tal cual por hosts estáticos)
    trailingSlash: true,
    images: {
      // Sin servidor no hay optimizador en tiempo real: las variantes WebP se generan
      // antes del build con scripts/optimize-images.mjs y este loader las selecciona.
      loader: "custom",
      loaderFile: "./src/lib/image-loader.ts",
      deviceSizes: [...IMAGE_WIDTHS],
      imageSizes: [],
    },
    turbopack: {
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },
  };
}
