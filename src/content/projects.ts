/**
 * Proyectos y publicaciones — textos de Proyectos.dc.html; composición del PDF aprobado (pág. 3).
 * Solo los 4 proyectos documentados en las fuentes oficiales (docs/fuentes-contenido.md).
 * Imágenes: ilustrativas (IA, media/imagenes-web) con su rótulo.
 */
import { PDF_PLANTA_SOLAR } from "./home";
import { ILLUSTRATIVE, type SiteImage } from "./images";
import { ROUTES } from "./routes";

export type ProjectKind = "ene" | "edu" | "soc" | "paz";

export type Project = {
  kind: ProjectKind;
  cat: string;
  partner: string;
  title: string;
  desc: string;
  pdf: string;
  page?: string;
  image?: SiteImage;
  imageNote: string;
};

export const PROJECT_FILTERS: { value: "all" | ProjectKind; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "ene", label: "Energía" },
  { value: "edu", label: "Educación" },
  { value: "soc", label: "Desarrollo social" },
  { value: "paz", label: "Construcción de paz" },
];

export const PROJECTS_ALL: Project[] = [
  {
    kind: "ene",
    cat: "Energía",
    partner: "Zona sur de Bogotá D.C. · Ciudad Bolívar",
    title: "Desarrollo de una planta solar fotovoltaica en la zona sur de la ciudad de Bogotá D.C.",
    desc: "En el marco de la iniciativa de desarrollo de fuentes de energía renovables no convencionales en Colombia, se tiene previsto el proyecto de generación solar FV «Planta solar fotovoltaica San Francisco».",
    pdf: PDF_PLANTA_SOLAR,
    page: ROUTES.proyectoSolar,
    image: ILLUSTRATIVE.solar,
    imageNote: "Imagen ilustrativa",
  },
  {
    kind: "edu",
    cat: "Educación",
    partner: "Corporación Universitaria Alliance",
    title: "Alma Mater en escenarios de convivencia y paz",
    desc: "A través de principios y valores humanos, busca formar profesionales integrales comprometidos con el desarrollo social, mediante procesos académicos e investigativos con énfasis en un tejido social incluyente.",
    pdf: "https://allianceedu.co/wp-content/uploads/2026/04/1.1-PROYECTO-CORPORACION-UNIVERSITARIA-ALLIANCE-2016-2026.docx.pdf",
    image: ILLUSTRATIVE.almaMater,
    imageNote: "Imagen ilustrativa",
  },
  {
    kind: "soc",
    cat: "Desarrollo social",
    partner: "Regiones de Colombia",
    title:
      "Rescate de la población vulnerable y en pobreza extrema mediante proyectos que generan seguridad alimentaria y prosperidad real a las regiones",
    desc: "Apoyo a comunidades vulnerables y en pobreza extrema mediante proyectos de seguridad alimentaria y desarrollo económico en las regiones del país.",
    pdf: "https://allianceedu.co/wp-content/uploads/2026/04/3.3-Alliance-Edu-Pre-2-2-1.pdf",
    image: ILLUSTRATIVE.desarrolloSocial,
    imageNote: "Imagen ilustrativa",
  },
  {
    kind: "paz",
    cat: "Construcción de paz",
    partner: "Diplomado",
    title: "Diplomado «Fuerza Pública y Construcción de Paz»",
    desc: "Aportamos al desarrollo de las comunidades a partir de la gestión del conocimiento, el fortalecimiento de capacidades ciudadanas, la promoción de los derechos humanos, la convivencia pacífica y la cultura de la legalidad.",
    pdf: "https://allianceedu.co/wp-content/uploads/2026/04/4.4-DIPLOMADO-FUERZA-PUBLICA-Y-CONSTRUCCION-DE-PAZ-1.pdf",
    image: ILLUSTRATIVE.fuerzaPublica,
    imageNote: "Imagen ilustrativa",
  },
];

export const FEATURED = {
  chip: "Proyecto destacado · Washington D.C.",
  title: "Planta solar fotovoltaica San Francisco",
  desc: "11,05 MWp en 23,1 hectáreas de Ciudad Bolívar, con carácter social para población vulnerable.",
  cta: "Ver la página del proyecto",
  href: ROUTES.proyectoSolar,
} as const;

export const PUBLICATIONS = {
  eyebrow: "Publicaciones",
  title: "Investigación y producción académica",
  text: "Espacio preparado para los libros, artículos e informes de la Fundación.",
  pending: "El sitio actual no lista publicaciones: contenido por cargar",
  cta: "Solicitar información",
} as const;
