// Servidor estático mínimo para revisar la carpeta out/ tal como la servirá Render.
// Uso: npm run preview  →  http://localhost:4173
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "out");
const PORT = Number(process.env.PORT) || 4173;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

const resolve = async (urlPath) => {
  const clean = path.normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  let file = path.join(ROOT, clean);
  if (!file.startsWith(ROOT)) return null;
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    await stat(file);
    return file;
  } catch {
    return null;
  }
};

createServer(async (req, res) => {
  const file = await resolve(req.url ?? "/");
  if (!file) {
    res.writeHead(404, { "content-type": TYPES[".html"] });
    res.end(await readFile(path.join(ROOT, "404.html")).catch(() => "404"));
    return;
  }
  res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" });
  res.end(await readFile(file));
}).listen(PORT, () => console.log(`Vista previa de out/ en http://localhost:${PORT}`));
