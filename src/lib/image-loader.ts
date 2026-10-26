import { IMAGE_WIDTHS } from "./image-widths";

/**
 * Loader de next/image para la exportación estática.
 * `/images/render-ladera.jpg` + 1080 → `/images/_opt/render-ladera-1080.webp`.
 * Las variantes existen en public/images/_opt (scripts/optimize-images.mjs);
 * si la imagen original es más estrecha que el ancho pedido, el script copia
 * la variante mayor disponible con ese nombre, así que la URL siempre existe.
 * Los logotipos oficiales (ORIGINALS) se sirven tal cual, sin recomprimir.
 * Un loader propio no recibe el basePath de Next: se antepone aquí (GitHub Pages).
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ORIGINALS = new Set(["/images/vigilado-minjusticia.png"]);

export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("/")) return src;
  if (!src.startsWith("/images/") || src.endsWith(".svg") || ORIGINALS.has(src)) return `${BASE}${src}`;
  const w = IMAGE_WIDTHS.find((x) => x >= width) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
  const file = src.slice("/images/".length).replace(/\.[a-z0-9]+$/i, "");
  return `${BASE}/images/_opt/${file}-${w}.webp`;
}
