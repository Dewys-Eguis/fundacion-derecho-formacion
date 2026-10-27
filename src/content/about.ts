/**
 * Quiénes somos — textos de QuienesSomos.dc.html; composición del PDF aprobado (pág. 7).
 * «2023» (estatus OEA) figura en el diseño; pendiente de verificar frente a CP/RES. 759 (1217/99).
 */
import { ROUTES } from "./routes";

export const PURPOSE = {
  label: "Nuestro propósito",
  before: "Hoy nuestro propósito es lograr",
  accent: "escenarios de convivencia vinculante",
  after:
    " que permitan el bienestar de la sociedad, orientados a la justicia, la paz, la educación y el liderazgo comunitario.",
} as const;

export const MISSION =
  "Facilitar a la comunidad herramientas autocompositivas que permitan una solución alternativa a los conflictos que deterioran la seguridad y la convivencia, permitiendo establecer relaciones comunitarias estructuradas sobre la base de principios y valores.";

export const VISION =
  "Para el 2035 seremos una institución generadora y productora de conocimiento jurídico y académico de alto impacto en el desarrollo y restauración de tejido humano y social de la región, el país y el mundo, con liderazgo en un proceso de formación soportado en el diálogo sistémico, complejo, interdisciplinar, transdisciplinar y ecoformativo, de cara a la participación en la sostenibilidad y sustentabilidad mundial, garantes de la cultura de paz.";

export const PILLARS = [
  { title: "Confianza", desc: "Estamos del lado de la ciudadanía colombiana." },
  { title: "Transparencia", desc: "Prácticas que garantizan confianza, sostenibilidad y eficiencia." },
  { title: "Calidad", desc: "Profesionales altamente cualificados en cada proceso." },
  { title: "Ética", desc: "Compromiso con la dignidad, la inclusión y los valores." },
] as const;

export const MILESTONES = [
  {
    year: "2014",
    title: "Centro de Conciliación",
    desc: "El Centro de Conciliación queda adscrito al Ministerio de Justicia y del Derecho mediante la Resolución 0026 del 16 de enero de 2014.",
  },
  {
    year: "2021",
    title: "Resolución No. 0748",
    desc: "Resolución No. 0748 del 21 de junio de 2021, documento publicado en el gobierno corporativo de la Fundación.",
  },
  {
    year: "2023",
    title: "Estatus consultivo ante la OEA",
    desc: "La Fundación obtiene el estatus de organización consultiva ante la Organización de los Estados Americanos.",
  },
  {
    year: "2035",
    title: "Visión institucional",
    desc: "Ser una institución generadora y productora de conocimiento jurídico y académico de alto impacto en la región, el país y el mundo.",
  },
] as const;

/** Párrafo «¿Quiénes somos?» del sitio actual (texto completo). */
export const ABOUT_INTRO =
  "Una Organización de carácter legal, orientada a la educación y consultoría jurídica especializada ante los diversos escenarios judiciales, asesoría del tejido humano en términos de dignidad, inclusión y prospectiva e investigación científica, conformada por profesionales interdisciplinarios, expertos en estudio legal de procesos penales, civiles y laborales, comerciales, derecho constitucional y administrativo, litigio estratégico, Derecho Internacional y Derechos Humanos, mecanismos alternativos de resolución pacífica de conflictos y educación para la paz.";

export const AREAS = [
  "Derecho penal",
  "Derecho civil",
  "Derecho laboral",
  "Derecho comercial",
  "Derecho constitucional",
  "Derecho administrativo",
  "Derecho internacional",
  "Derechos humanos",
  "Resolución de conflictos",
  "Litigio estratégico",
  "Educación para la paz",
] as const;

export const ABOUT_LINKS = [
  { title: "Staff jurídico", sub: "9 profesionales", href: ROUTES.staff, tone: "azul" },
  { title: "Nuestras oficinas", sub: "Sede en Bogotá D.C.", href: ROUTES.oficinas, tone: "bruma" },
  {
    title: "Gobierno corporativo",
    sub: "Transparencia, ética y responsabilidad",
    href: ROUTES.gobierno,
    tone: "durazno",
  },
] as const;
