// Compilación para HostGator (cPanel → public_html, dominio propio servido desde la raíz).
// Igual que `npm run build` pero sin el prefijo de GitHub Pages; añade un .htaccess para Apache,
// verifica que no queden rutas con el prefijo y empaqueta el contenido de out/ (sin carpeta out/
// como nivel superior) en fundacion-derecho-formacion-HOSTGATOR.zip.
import { spawnSync } from "node:child_process";
import { readdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = "out";
const ZIP = "fundacion-derecho-formacion-HOSTGATOR.zip";
const GH_PREFIX = "/fundacion-derecho-formacion/";

const env = { ...process.env };
delete env.NEXT_PUBLIC_BASE_PATH;
delete env.INCLUDE_INTERNAL;

const run = (cmd, args = []) => {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: args.length === 0, env });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

run("npm run images");
run("npx next build");

// En Windows, Next escribe algunos datos de precarga como carpetas («__next.ruta/__PAGE__.txt»)
// aunque el navegador los pide como archivo plano («__next.ruta.__PAGE__.txt»), que es lo que
// produce la compilación en Linux (GitHub Pages). Se aplanan para que Apache los sirva.
const flatten = async (dir) => {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name);
    if (!e.name.startsWith("__next.")) {
      await flatten(p);
      continue;
    }
    const inner = [];
    const collect = async (d, prefix) => {
      for (const x of await readdir(d, { withFileTypes: true })) {
        if (x.isDirectory()) await collect(path.join(d, x.name), `${prefix}.${x.name}`);
        else inner.push([path.join(d, x.name), path.join(dir, `${prefix}.${x.name}`)]);
      }
    };
    await collect(p, e.name);
    for (const [from, to] of inner) await rename(from, to);
    await rm(p, { recursive: true });
  }
};
await flatten(OUT);

// Apache (HostGator): página 404 propia, sin listado de carpetas y caché larga para los
// archivos con hash de _next/static. No fuerza HTTPS para no depender del certificado.
await writeFile(
  path.join(OUT, ".htaccess"),
  `DirectoryIndex index.html
Options -Indexes
ErrorDocument 404 /404.html

<IfModule mod_mime.c>
  AddType image/webp .webp
  AddType image/svg+xml .svg
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(js|css|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(webp|png|jpg|jpeg|svg|ico)$">
    Header set Cache-Control "public, max-age=604800"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>
`,
);

// Verificación: ningún archivo de texto debe contener el prefijo de GitHub Pages.
const files = [];
const walk = async (dir) => {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else files.push(p);
  }
};
await walk(OUT);
const offenders = [];
for (const f of files.filter((f) => /\.(html|js|css|txt|json|xml|webmanifest)$/.test(f))) {
  if ((await readFile(f, "utf8")).includes(GH_PREFIX)) offenders.push(f);
}
if (offenders.length) {
  console.error(`\n[hostgator] Rutas con el prefijo de GitHub Pages en:\n  ${offenders.join("\n  ")}`);
  process.exit(1);
}
for (const required of ["index.html", "404.html", "_next", "images", "documentos"]) {
  await stat(path.join(OUT, required));
}

// ZIP con el contenido de out/ en la raíz. bsdtar (tar.exe de Windows 10+, macOS) escribe
// rutas con «/», compatibles con el extractor de cPanel.
await rm(ZIP, { force: true });
const entries = await readdir(OUT);
run("tar", ["-a", "-c", "-f", path.resolve(ZIP), "-C", OUT, ...entries]);

const mb = ((await stat(ZIP)).size / 1024 / 1024).toFixed(1);
console.log(`\n[hostgator] ${files.length + 1} archivos · ${ZIP} (${mb} MB) listo para public_html.`);
