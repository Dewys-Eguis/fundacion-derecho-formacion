/**
 * Contenido de la Home.
 * Referencia visual principal: design/screenshots/«Tejido Humano — Sitio completo.pdf»
 * (pág. 1 escritorio, pág. 4 móvil). Textos: los del PDF y de los .dc.html aprobados.
 * Narrativa del proyecto: siempre «De Washington a Ciudad Bolívar» (CLAUDE.md).
 */
import { ILLUSTRATIVE, IMAGES, type SiteImage } from "./images";
import { OFFICE_PHOTOS } from "./interior";
import { ROUTES } from "./routes";

export const PDF_PLANTA_SOLAR =
  "https://allianceedu.co/wp-content/uploads/2026/04/2.2-PROYECTO-PLANTA-SOLAR-FOTOVOLTAICA-CIUDAD-BOLIVAR-BOGOTA-.pdf";

/* ---------- Hero: 3 escenas (pestañas del PDF: Proyecto solar · Conciliación · Diplomados) ---------- */
export type HeroScene = {
  id: "solar" | "conciliacion" | "diplomados";
  tab: string;
  tabMobile: string;
  chips: [string, string?];
  /** Primera chip en naranja (escena del proyecto destacado) o blanca. */
  chipTone: "naranja" | "blanco";
  t1: string;
  t2: string;
  body: string;
  cta1: { label: string; href: string };
  cta2?: { label: string; href: string };
  /** Fondo de la banda */
  bg: "durazno" | "cielo" | "ilustracion";
};

export const HERO_SCENES: HeroScene[] = [
  {
    // Ilustración de ProyectoSolar.dc.html (PDF pág. 2) + textos del proyecto destacado.
    id: "solar",
    tab: "Proyecto solar",
    tabMobile: "Solar",
    chips: ["Proyecto destacado", "Presentación en Washington D.C."],
    chipTone: "naranja",
    t1: "De Washington a",
    t2: "Ciudad Bolívar.",
    body: "Planta solar fotovoltaica San Francisco: energía renovable con carácter social para la población vulnerable de la localidad.",
    cta1: { label: "Conocer el proyecto", href: ROUTES.proyectoSolar },
    cta2: { label: "Descargar documento", href: PDF_PLANTA_SOLAR },
    bg: "ilustracion",
  },
  {
    // PDF pág. 1 (escena activa en la referencia de escritorio).
    id: "conciliacion",
    tab: "Conciliación",
    tabMobile: "Conciliación",
    chips: ["Centro de Conciliación", "Adscrito al Ministerio de Justicia"],
    chipTone: "blanco",
    t1: "Resolvemos conflictos con",
    t2: "diálogo.",
    body: "Conciliación y mediación, insolvencia de persona natural no comerciante y adjudicación de apoyos según la Ley 1996 de 2019.",
    cta1: { label: "Agenda tu cita", href: `${ROUTES.contacto}#agenda` },
    cta2: { label: "Conocer el centro", href: ROUTES.conciliacion },
    bg: "durazno",
  },
  {
    // PDF pág. 4 (escena activa en la referencia móvil).
    id: "diplomados",
    tab: "Diplomados",
    tabMobile: "Diplomados",
    chips: ["Inscripción gratuita"],
    chipTone: "blanco",
    t1: "21 diplomados virtuales",
    t2: "gratuitos.",
    body: "Solo se paga el certificado. IA, pedagogía, inclusión y tecnología.",
    cta1: { label: "Ver diplomados", href: ROUTES.diplomados },
    bg: "cielo",
  },
];

/** Tarjeta institucional flotante de la escena Conciliación (obligatoria). */
export const MINISTRY_CARD = {
  kicker: "Adscrito al",
  title: "Ministerio de Justicia y del Derecho",
  detail: "Resolución 0026 del 16 de enero de 2014",
} as const;

/* ---------- Accesos rápidos (bajo el hero) ---------- */
export const QUICK_LINKS = [
  { title: "Agenda tu cita", sub: "Asesoría y conciliación", href: `${ROUTES.contacto}#agenda`, icon: "calendar" },
  { title: "Centro de Conciliación", sub: "Diálogo sin juicio", href: ROUTES.conciliacion, icon: "rings" },
  { title: "Diplomados gratuitos", sub: "21 programas virtuales", href: ROUTES.diplomados, icon: "cap" },
  { title: "Litigio estratégico", sub: "Derechos humanos · CECOLI", href: ROUTES.litigio, icon: "scales" },
] as const;

/** Cifras del proyecto (fichas de la Home móvil, PDF pág. 4). */
export const PROJECT_KPIS = [
  { value: 11.05, decimals: 2, label: "MWp" },
  { value: 16744, decimals: 0, label: "módulos" },
  { value: 23.1, decimals: 1, unit: "ha", label: "lote" },
] as const;

/* ---------- Confianza ---------- */
export const TRUST = [
  { title: "Estatus consultivo ante la OEA", sub: "CP/RES. 759 (1217/99)", dot: "naranja" },
  { title: "Adscrito al Ministerio de Justicia", sub: "Centro de Conciliación · Res. 0026/2014", dot: "accion" },
  { title: "Alianza con CECOLI", sub: "Sede en Washington D.C.", dot: "naranja" },
  { title: "Corporación Universitaria Alliance", sub: "Proyecto Alma Mater", dot: "accion" },
] as const;

/* ---------- Quiénes somos (PDF pág. 1) ---------- */
// Textos completos de Misión y Visión: QuienesSomos.dc.html.
export const IDENTITY = [
  {
    value: "proposito",
    label: "Propósito",
    text: "Hoy nuestro propósito es lograr escenarios de convivencia vinculante, orientados a la justicia, la paz, la educación y el liderazgo comunitario.",
  },
  {
    value: "mision",
    label: "Misión",
    text: "Facilitar a la comunidad herramientas autocompositivas que permitan una solución alternativa a los conflictos que deterioran la seguridad y la convivencia, permitiendo establecer relaciones comunitarias estructuradas sobre la base de principios y valores.",
  },
  {
    value: "vision",
    label: "Visión 2035",
    text: "Para el 2035 seremos una institución generadora y productora de conocimiento jurídico y académico de alto impacto en el desarrollo y restauración de tejido humano y social de la región, el país y el mundo, con liderazgo en un proceso de formación soportado en el diálogo sistémico, complejo, interdisciplinar, transdisciplinar y ecoformativo, garantes de la cultura de paz.",
  },
] as const;

/* ---------- Manifiesto (Main.dc.html) ---------- */
// «2023» y «CP/RES. 759 (1217/99)» deben verificarse con la Fundación (docs/handoff.md).
export const MANIFIESTO_STATS = [
  { value: "2014", text: "Centro de Conciliación adscrito al Ministerio de Justicia y del Derecho.", tone: "azul" },
  { value: "2023", text: "Estatus consultivo ante la Organización de los Estados Americanos.", tone: "azul" },
  { value: "21", text: "Diplomados virtuales con inscripción y estudio gratuitos.", tone: "naranja" },
  { value: "2035", text: "Visión: conocimiento jurídico y académico de alto impacto.", tone: "accion" },
] as const;

/* ---------- Qué hacemos ---------- */
export const SERVICES = [
  {
    title: "Estudio legal y consultoría",
    desc: "Consultoría en procesos penales, civiles, laborales, comerciales, constitucionales y administrativos.",
    href: ROUTES.estudioLegal,
  },
  {
    title: "Litigio estratégico",
    desc: "Litigio internacional en derechos humanos con CECOLI, con sede en Washington D.C.",
    href: ROUTES.litigio,
  },
  {
    title: "Centro de Conciliación",
    desc: "Conciliación, mediación e insolvencia. Adscrito al Ministerio de Justicia y del Derecho.",
    href: ROUTES.conciliacion,
  },
  {
    title: "Educación para la paz",
    desc: "Gestión del conocimiento, capacidades ciudadanas y cultura de paz.",
    href: ROUTES.educacion,
  },
  {
    title: "Proyectos para la paz",
    desc: "Educación, energía, seguridad alimentaria y construcción de paz.",
    href: ROUTES.proyectos,
  },
  {
    title: "Justicia especial para la paz",
    desc: "Acceso a la justicia transicional de los actores del conflicto armado.",
    href: ROUTES.justiciaPaz,
  },
] as const;

/* ---------- Proyecto destacado: Washington → Ciudad Bolívar ---------- */
export const FOCUS = {
  chip: "Proyecto destacado",
  // Texto de Main.dc.html (narrativa corregida presentación → impacto).
  body: "En Washington D.C. —sede de la OEA, ante la cual la Fundación tiene estatus consultivo, y de su aliado CECOLI— se presenta la Planta solar fotovoltaica San Francisco. Su destino es Ciudad Bolívar: energía renovable con carácter social para la población vulnerable de la localidad.",
  // Cifras del PDF (pág. 1).
  stats: [
    { value: 11.05, decimals: 2, text: "MWp en configuración óptima" },
    { value: 3, decimals: 0, text: "subproyectos independientes" },
    { text: "confirmó viabilidad de conexión", label: "ENEL" },
  ],
  labels: {
    origin: { title: "Washington D.C.", sub: "OEA · CECOLI" },
    destination: { title: "Bogotá D.C.", sub: "Ciudad Bolívar" },
  },
} as const;

/* ---------- Galería «El tejido en imágenes» (PDF pág. 1) ---------- */
export type GalleryItem = { caption: string; image?: SiteImage; pos?: string; alt?: string };

export const GALLERY: GalleryItem[] = [
  {
    caption: "Planta solar · energía renovable",
    image: IMAGES.panelesSitioActual,
    pos: "50% 50%",
    alt: "Paneles solares fotovoltaicos (imagen del sitio actual)",
  },
  {
    caption: "Centro de Conciliación",
    image: ILLUSTRATIVE.conciliacion,
    pos: ILLUSTRATIVE.conciliacion.pos,
    alt: ILLUSTRATIVE.conciliacion.alt,
  },
  { caption: "[Foto] Diplomado Fuerza Pública y Construcción de Paz" },
  { caption: "[Foto] Staff jurídico" },
  // Fotografía real de la sede (media/Oficinas)
  { caption: "Oficinas en Bogotá", image: OFFICE_PHOTOS[0].image, pos: "50% 50%", alt: OFFICE_PHOTOS[0].image.alt },
];

export const GALLERY_NOTE =
  "Fotografías provisionales: la Fundación debe entregar imágenes en alta resolución de su trabajo.";

/* ---------- Proyectos ---------- */
export const FEATURED_PROJECT = {
  tag: "Energía · Destacado",
  title: "Desarrollo de una planta solar fotovoltaica en la zona sur de Bogotá D.C.",
  desc: "Planta solar fotovoltaica San Francisco, en el marco del desarrollo de fuentes de energía renovables no convencionales en Colombia.",
  href: ROUTES.proyectoSolar,
  image: ILLUSTRATIVE.solar,
} as const;

// «Descargar proyecto ↓» abre el PDF oficial de cada proyecto (docs/fuentes-contenido.md).
export const PROJECTS = [
  {
    cat: "Educación",
    title: "Alma Mater en escenarios de convivencia y paz",
    image: ILLUSTRATIVE.almaMater,
    pdf: "https://allianceedu.co/wp-content/uploads/2026/04/1.1-PROYECTO-CORPORACION-UNIVERSITARIA-ALLIANCE-2016-2026.docx.pdf",
  },
  {
    cat: "Desarrollo social",
    title: "Rescate de la población vulnerable mediante seguridad alimentaria",
    image: ILLUSTRATIVE.desarrolloSocial,
    pdf: "https://allianceedu.co/wp-content/uploads/2026/04/3.3-Alliance-Edu-Pre-2-2-1.pdf",
  },
  {
    cat: "Construcción de paz",
    title: "Diplomado «Fuerza Pública y Construcción de Paz»",
    pdf: "https://allianceedu.co/wp-content/uploads/2026/04/4.4-DIPLOMADO-FUERZA-PUBLICA-Y-CONSTRUCCION-DE-PAZ-1.pdf",
  },
] as const;

/* ---------- Staff ---------- */
export const STAFF_HOME = [
  { ini: "JA", name: "Jesús Enrique Archila Guio", role: "CEO y Representante Legal de la Fundación" },
  {
    ini: "LR",
    name: "Leydi Yesenia Ramírez Aristizabal",
    role: "Directora General · Conciliadora y Atención a Víctimas",
  },
  {
    ini: "PM",
    name: "Pedro Octavio Munar Cadena",
    role: "Presidente de la Corte Suprema de Justicia de Colombia (2010)",
  },
  { ini: "AR", name: "Ángela Margarita Rey Anaya", role: "Profesora · CEO de la Fundación United For Justice" },
] as const;

/* ---------- Diplomados ---------- */
export const COURSES_HOME = [
  { cat: "IA y educación", title: "IA en la educación" },
  { cat: "Inclusión", title: "Diseño Universal para el Aprendizaje" },
  { cat: "Pedagogía", title: "Aprendizaje Basado en Proyectos" },
  { cat: "Tecnología", title: "Principios de la Robótica Educativa" },
] as const;

/* ---------- Aliados ---------- */
export const ALLIES = [
  "Corporación Universitaria Alliance",
  "CECOLI · Washington D.C.",
  "Ministerio de Justicia y del Derecho",
  "Organización de los Estados Americanos",
] as const;

/* ---------- Cierre ---------- */
export const CLOSING = {
  t1: "Estamos del lado de la",
  t2: "ciudadanía colombiana.",
  sub: "Confianza, transparencia, calidad y ética en cada proceso.",
} as const;
