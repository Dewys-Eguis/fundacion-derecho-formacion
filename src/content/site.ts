/**
 * Datos institucionales y navegación global.
 * Fuente: Header.dc.html, Footer.dc.html, MobileMenu.dc.html y Mobile.dc.html.
 * Lo que está pendiente se marca con `pending` en lugar de un enlace falso.
 */
import { ROUTES } from "./routes";

export const SITE = {
  name: "Fundación Derecho y Formación",
  descriptor: "Tejido Humano",
  legalName: "Fundación Derecho y Formación – Tejido Humano",
  url: "https://fundacionderechoyformacion.org",
  claim: "Asesoría legal, conciliación y educación para la paz, fortaleciendo el tejido social con ética y compromiso.",
  phone: { label: "320 903 8228", href: "tel:+573209038228" },
  email: {
    label: "contacto@fundacionderechoyformacion.org",
    href: "mailto:contacto@fundacionderechoyformacion.org",
  },
  address: {
    short: "Calle 12B # 8A-34, int. 13 · Bogotá D.C.",
    line1: "Calle 12B # 8A-34, interior 13",
    line2: "Bogotá D.C., Colombia",
    mobile: "Calle 12B # 8A-34, interior 13 · Bogotá D.C.",
  },
  oeaSeal: "Organización con estatus consultivo ante la OEA",
  oeaSealShort: "Estatus consultivo OEA",
  copyright: "© 2026 Fundación Derecho y Formación – Tejido Humano. Derechos reservados.",
  copyrightShort: "© 2026 Fundación Derecho y Formación – Tejido Humano",
  footerBadges: [
    "Centro de Conciliación adscrito al Ministerio de Justicia y del Derecho",
    "Estatus consultivo ante la OEA",
  ],
} as const;

/**
 * Política de tratamiento de datos (PDF en public/documentos). Es un archivo estático, no una ruta:
 * se antepone el basePath de GitHub Pages a mano (next/link no aplica a archivos).
 */
export const PRIVACY_POLICY = {
  label: "Política de tratamiento de datos",
  href: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/documentos/politica-tratamiento-datos-fundacion.pdf`,
} as const;

/** WhatsApp de la Fundación (mismo número de contacto, +57 320 903 8228) con mensaje predefinido. */
const WHATSAPP_MESSAGE =
  "Hola, Fundación Derecho y Formación. Deseo agendar una cita de asesoría o conciliación. ¿Me pueden indicar la disponibilidad?";
export const WHATSAPP_AGENDA = `https://wa.me/573209038228?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/** Acciones principales del Header: Donar lleva a Contáctenos; Agenda tu cita abre WhatsApp. */
export const CTA = {
  donar: { label: "Donar", href: `${ROUTES.contacto}#donaciones` },
  agenda: { label: "Agenda tu cita", href: WHATSAPP_AGENDA },
} as const;

export type MenuLink = { label: string; desc: string; href: string };

export const MEGA_QUIENES: MenuLink[] = [
  { label: "Quiénes somos", desc: "Propósito, misión y visión 2035", href: ROUTES.quienesSomos },
  { label: "Staff jurídico", desc: "Equipo interdisciplinario", href: ROUTES.staff },
  { label: "Nuestras oficinas", desc: "Sede en Bogotá D.C.", href: ROUTES.oficinas },
  { label: "Gobierno corporativo", desc: "Transparencia y documentos", href: ROUTES.gobierno },
];

/** Orden del diseño: grid 1fr 1fr 280px, el destacado ocupa 3 filas en la 3.ª columna. */
export const MEGA_QUE: MenuLink[] = [
  {
    label: "Estudio legal y consultoría",
    desc: "Penal, civil, comercial, constitucional, administrativo",
    href: ROUTES.estudioLegal,
  },
  {
    label: "Litigio estratégico",
    desc: "Derechos humanos con CECOLI · Washington D.C.",
    href: ROUTES.litigio,
  },
  {
    label: "Centro de Conciliación",
    desc: "Adscrito al Ministerio de Justicia y del Derecho",
    href: ROUTES.conciliacion,
  },
  { label: "Educación para la paz", desc: "Complejidad y desarrollo social", href: ROUTES.educacion },
  {
    label: "Justicia especial para la paz",
    desc: "Acceso a la justicia transicional",
    href: ROUTES.justiciaPaz,
  },
  {
    label: "Proyectos y publicaciones",
    desc: "Proyectos para la implementación de la paz",
    href: ROUTES.proyectos,
  },
];

export const MEGA_DESTACADO = {
  tag: "Proyecto destacado",
  title: "Planta solar fotovoltaica San Francisco",
  meta: "11,05 MWp · Ciudad Bolívar →",
  href: ROUTES.proyectoSolar,
} as const;

/** Menú móvil (MobileMenu.dc.html): sus submenús difieren ligeramente del escritorio. */
export const MOBILE_QUIENES = [
  { label: "Misión y visión", href: `${ROUTES.quienesSomos}#mision-vision` },
  { label: "Staff jurídico", href: ROUTES.staff },
  { label: "Nuestras oficinas", href: ROUTES.oficinas },
  { label: "Gobierno corporativo", href: ROUTES.gobierno },
];
export const MOBILE_QUE = [
  { label: "Estudio legal y consultoría", href: ROUTES.estudioLegal },
  { label: "Litigio estratégico", href: ROUTES.litigio },
  { label: "Centro de Conciliación", href: ROUTES.conciliacion },
  { label: "Educación para la paz", href: ROUTES.educacion },
  { label: "Justicia especial para la paz", href: ROUTES.justiciaPaz },
];

export const FOOTER_COLUMNS = [
  {
    title: "Nuestra compañía",
    links: [
      { label: "Quiénes somos", href: ROUTES.quienesSomos },
      { label: "Staff jurídico", href: ROUTES.staff },
      { label: "Misión y visión", href: `${ROUTES.quienesSomos}#mision-vision` },
      { label: "Nuestras oficinas", href: ROUTES.oficinas },
      { label: "Gobierno corporativo", href: ROUTES.gobierno },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "Estudio legal y consultoría", href: ROUTES.estudioLegal },
      { label: "Litigio estratégico", href: ROUTES.litigio },
      { label: "Centro de Conciliación", href: ROUTES.conciliacion },
      { label: "Educación para la paz", href: ROUTES.educacion },
      { label: "Justicia especial para la paz", href: ROUTES.justiciaPaz },
    ],
  },
  {
    title: "Proyectos",
    links: [
      { label: "Planta solar San Francisco", href: ROUTES.proyectoSolar },
      { label: "Proyectos y publicaciones", href: ROUTES.proyectos },
      { label: "Diplomados", href: ROUTES.diplomados },
      { label: "Donaciones", href: `${ROUTES.contacto}#donaciones` },
    ],
  },
] as const;

/** Redes sociales: las URLs no están confirmadas (docs/handoff.md · pendientes). */
export const SOCIAL = [
  { name: "Facebook", short: "f", href: null },
  { name: "LinkedIn", short: "in", href: null },
  { name: "YouTube", short: "play", href: null },
] as const;
