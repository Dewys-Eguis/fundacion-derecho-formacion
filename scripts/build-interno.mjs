// Compilación interna: igual que `npm run build` pero incluye las páginas `page.dev.tsx`
// (por ejemplo /sistema/) para revisarlas con `npm run preview`. No usar para publicar.
import { spawnSync } from "node:child_process";

const run = (cmd) => {
  const r = spawnSync(cmd, { stdio: "inherit", shell: true, env: { ...process.env, INCLUDE_INTERNAL: "1" } });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

run("npm run images");
run("npx next build");
console.log(
  "\n[interno] Exportación con páginas internas en out/. Vuelva a ejecutar `npm run build` antes de publicar.",
);
