/** Rutas del sitio (CLAUDE.md · Pantallas → rutas). Con trailingSlash: true. */
export const ROUTES = {
  inicio: "/",
  proyectoSolar: "/proyectos/planta-solar-san-francisco/",
  proyectos: "/proyectos-y-publicaciones/",
  quienesSomos: "/quienes-somos/",
  staff: "/equipo-juridico/",
  oficinas: "/nuestras-oficinas/",
  gobierno: "/gobierno-corporativo/",
  estudioLegal: "/estudio-legal-consultoria/",
  litigio: "/litigio-estrategico/",
  conciliacion: "/centro-de-conciliacion/",
  educacion: "/educacion-para-la-paz/",
  justiciaPaz: "/justicia-para-la-paz/",
  diplomados: "/diplomados/",
  contacto: "/contactenos/",
} as const;

export type RouteKey = keyof typeof ROUTES;

/** Páginas públicas (alimenta sitemap.xml): todo el alcance del sitio actual está implementado. */
export const PUBLISHED_ROUTES: string[] = Object.values(ROUTES);

/** Sección activa del Header (prop `active` de Header.dc.html). */
export type NavSection = "inicio" | "quienes" | "que" | "proyectos" | "diplomados" | "contacto";

const SECTION_BY_ROUTE: Record<string, NavSection> = {
  [ROUTES.inicio]: "inicio",
  [ROUTES.quienesSomos]: "quienes",
  [ROUTES.staff]: "quienes",
  [ROUTES.oficinas]: "quienes",
  [ROUTES.gobierno]: "quienes",
  [ROUTES.estudioLegal]: "que",
  [ROUTES.litigio]: "que",
  [ROUTES.conciliacion]: "que",
  [ROUTES.educacion]: "que",
  [ROUTES.justiciaPaz]: "que",
  [ROUTES.proyectos]: "proyectos",
  [ROUTES.proyectoSolar]: "proyectos",
  [ROUTES.diplomados]: "diplomados",
  [ROUTES.contacto]: "contacto",
};

export function sectionForPath(pathname: string): NavSection | null {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return SECTION_BY_ROUTE[normalized] ?? null;
}
