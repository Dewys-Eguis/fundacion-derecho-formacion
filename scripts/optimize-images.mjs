// Genera las imágenes del sitio (las fuentes solo se leen, nunca se modifican):
//   design/assets/  renders 3D y foto del paquete de diseño
//   media/          fotografías reales que entregue la Fundación (ver media/LEEME.md)
// Salida (carpeta generada, ignorada por git):
//   public/images/<nombre>.jpg            copia del original (fallback / OG)
//   public/images/_opt/<nombre>-<w>.webp  variantes por ancho para next/image
// Se ejecuta antes de `dev` y `build`. Omite archivos ya generados y más nuevos que su fuente.
import { readdir, mkdir, copyFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCES = [path.join(ROOT, "design", "assets"), path.join(ROOT, "media")];
const OUT = path.join(ROOT, "public", "images");
const OPT = path.join(OUT, "_opt");
// Mantener sincronizado con src/lib/image-widths.ts
const WIDTHS = [390, 640, 828, 1080, 1440, 1920];
// Recortes aplicados solo a las copias de producción (el original no se modifica).
// proyecto-desarrollo-social.webp trae un marco blanco con esquinas redondeadas incrustado.
// Dra-Leydi-Ramirez: foto horizontal (1920×1280) con la persona pequeña: recorte vertical centrado en ella.
const CROPS = {
  "proyecto-desarrollo-social": { left: 67, top: 82, width: 1536, height: 775 },
  "Dra-Leydi-Ramirez": { left: 880, top: 230, width: 840, height: 1050 },
};

// Nombre publicable: sin tildes, espacios ni puntos («Dr. José Ricardo Archila Guio» → «Dr-Jose-Ricardo-Archila-Guio»).
// Los nombres que ya eran válidos no cambian.
const slug = (name) =>
  name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[.\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const isFresh = async (target, srcMtime) => {
  try {
    return (await stat(target)).mtimeMs >= srcMtime;
  } catch {
    return false;
  }
};

await mkdir(OPT, { recursive: true });
const files = [];
// Logotipos oficiales (aliados y distintivos): se publican tal cual en public/images/logos/, con
// compresión sin pérdida y sin variantes WebP. Aquí sí se aceptan los archivos «-300x225» de WordPress
// (los aliados solo existen en ese tamaño) y el sufijo se quita del nombre publicado.
const LOGO_DIRS = [path.join(ROOT, "media", "logos"), path.join(ROOT, "media", "Aliados")];
const LOGOS = path.join(OUT, "logos");
const isLogo = (dir) => LOGO_DIRS.includes(dir);
await mkdir(LOGOS, { recursive: true });
// Recorre subcarpetas (p. ej. media/Oficinas). Fuera de los logotipos se omiten las miniaturas de
// WordPress («nombre-300x225.webp»): son copias reducidas de un original que ya está en la carpeta.
const walk = async (dir) => {
  for (const entry of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
    if (entry.isDirectory()) await walk(path.join(dir, entry.name));
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name) && (isLogo(dir) || !/-\d+x\d+\.[a-z]+$/i.test(entry.name)))
      files.push([dir, entry.name]);
  }
};
for (const dir of SOURCES) await walk(dir);
let generated = 0;

for (const [dir, file] of files) {
  const src = path.join(dir, file);
  const { mtimeMs } = await stat(src);
  const ext = path.extname(file).toLowerCase();
  if (isLogo(dir)) {
    const target = path.join(LOGOS, slug(file.slice(0, -ext.length)).replace(/-\d+x\d+$/, "") + ext);
    if (!(await isFresh(target, mtimeMs))) {
      const img = sharp(src);
      await (
        ext === ".png" ? img.png({ compressionLevel: 9, effort: 10 }) : img.jpeg({ quality: 90, mozjpeg: true })
      ).toFile(target);
      generated++;
    }
    continue;
  }
  const base = slug(file.slice(0, -ext.length));
  const copy = path.join(OUT, base + ext);
  const crop = CROPS[base];
  const load = () => (crop ? sharp(src).extract(crop) : sharp(src));
  // Fotografías PNG (> 1 MB): sin copia del original en public/; se usan solo las variantes WebP.
  const heavyPng = /\.png$/i.test(file) && (await stat(src)).size > 1024 * 1024;
  if (!heavyPng && !(await isFresh(copy, mtimeMs))) {
    if (crop) await load().toFile(copy);
    else await copyFile(src, copy);
  }

  const original = crop ? crop.width : (await sharp(src).metadata()).width;
  for (const w of WIDTHS) {
    const target = path.join(OPT, `${base}-${w}.webp`);
    if (await isFresh(target, mtimeMs)) continue;
    // Nunca se amplía: si el original es más estrecho, la variante usa su ancho real.
    await load()
      .resize({ width: Math.min(w, original), withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(target);
    generated++;
  }
}

console.log(`[images] ${files.length} originales, ${generated} variantes nuevas`);
