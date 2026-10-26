/**
 * Planta solar fotovoltaica San Francisco.
 * Textos y cifras: ProyectoSolar.dc.html / MobileSolar.dc.html y el PDF oficial del
 * proyecto (docs/fuentes-contenido.md). Composición: PDF aprobado, págs. 2 (escritorio) y 5 (móvil).
 *
 * Discrepancia documentada (docs/handoff.md): el sitio actual comunica «15 MW»; el estudio
 * técnico selecciona 11,05 MWp como configuración óptima. Se muestra la cifra del documento
 * oficial, siempre rotulada como «configuración óptima»; la capacidad a comunicar está por confirmar.
 */
import { PDF_PLANTA_SOLAR } from "./home";
import { ROUTES } from "./routes";

export { PDF_PLANTA_SOLAR };

export const SOLAR_HERO = {
  crumbs: [
    { label: "Inicio", href: ROUTES.inicio },
    { label: "Proyectos", href: ROUTES.proyectos },
    { label: "Planta solar" },
  ],
  chips: ["Proyecto destacado", "Presentación en Washington D.C."],
  t1: "Planta solar fotovoltaica",
  t2: "San Francisco",
  lead: "Propuesta para el desarrollo de una planta solar fotovoltaica en la zona sur de Bogotá D.C., localidad de Ciudad Bolívar, con carácter social para población vulnerable.",
} as const;

export const SOLAR_KPIS = [
  {
    value: 11.05,
    decimals: 2,
    unit: "MWp",
    label: "Capacidad DC · configuración óptima",
    mobile: "MWp · configuración óptima",
  },
  { value: 16744, decimals: 0, label: "Módulos bifaciales", mobile: "módulos bifaciales" },
  { value: 66, decimals: 0, label: "Inversores", mobile: "inversores" },
  { value: 23.1, decimals: 1, unit: "ha", label: "Área del lote", mobile: "área del lote" },
  { value: 3, decimals: 0, label: "Subproyectos de menos de 5 MW", mobile: "subproyectos < 5 MW", accent: true },
] as const;

export const SOLAR_SECTIONS = [
  { id: "resumen", label: "Resumen" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "tecnologia", label: "Tecnología" },
  { id: "conexion", label: "Conexión" },
  { id: "impacto", label: "Impacto social" },
  { id: "documentos", label: "Documentos" },
] as const;

export const SOLAR_SUMMARY = {
  lead: "En el marco de la iniciativa de desarrollo de fuentes de energía renovables no convencionales en Colombia, se tiene previsto el desarrollo del proyecto de generación solar FV denominado",
  accent: "«Planta solar fotovoltaica San Francisco».",
  objectives: [
    "Desarrollar una fuente de energía renovable no convencional en Colombia.",
    "Atender la demanda de energías alternativas.",
    "Generar impacto social y ambiental de forma más ágil.",
  ],
  promoter: {
    label: "Promotor",
    name: "Fundación Derecho y Formación Tejido Humano",
    desc: "Organización consultiva de la OEA, CP/RES. 759 (1217/99). Cuenta con un Centro de Conciliación y promueve proyectos socioambientales.",
  },
} as const;

export const SOLAR_LOCATION = {
  lead: "Un lote de 23,1 hectáreas en la zona sur de la ciudad. Ventajas que señala el documento del proyecto:",
  advantages: [
    "Ubicación y tamaño del lote",
    "Posibilidad de conexión directa a la red",
    "Sin impactos socioambientales",
    "Buen acceso al sitio",
    "Menor tiempo y costo frente a proyectos mayores",
  ],
  substation: "Subestación de pequeña escala · ENEL Bogotá",
  note: "Esquema ilustrativo, no a escala.",
  pendingNote: "Plano real por confirmar",
} as const;

export type SolarConfig = {
  struct: string;
  structShort: string;
  module: string;
  mwp: number;
  panels: string;
  inv: string;
  strings: string;
  model: string;
  optimal: boolean;
};

/** Cuatro configuraciones evaluadas en el documento (PVsyst V7.4.8). «—» = dato no informado. */
export const SOLAR_CONFIGS: SolarConfig[] = [
  {
    struct: "Seguidor (tracker)",
    structShort: "Tracker",
    module: "Bifacial",
    mwp: 11.05,
    panels: "16.744",
    inv: "66",
    strings: "644",
    model: "Monocristalino bifacial",
    optimal: true,
  },
  {
    struct: "Seguidor (tracker)",
    structShort: "Tracker",
    module: "Monocristalino",
    mwp: 11.22,
    panels: "16.744",
    inv: "—",
    strings: "—",
    model: "CS7N-670MS · 670 W",
    optimal: false,
  },
  {
    struct: "Estructura fija",
    structShort: "Fija",
    module: "Bifacial",
    mwp: 14.72,
    panels: "22.308",
    inv: "77",
    strings: "858",
    model: "CS7N-660MB-AG · 660 W",
    optimal: false,
  },
  {
    struct: "Estructura fija",
    structShort: "Fija",
    module: "Monocristalino",
    mwp: 15.0,
    panels: "22.386",
    inv: "77",
    strings: "861",
    model: "Monocristalino",
    optimal: false,
  },
];

export const SOLAR_TECH = {
  intro:
    "Simulaciones realizadas con PVsyst V7.4.8 a partir de datos de IRENA, NASA e IDEAM. Seleccione una configuración para compararla.",
  note: "El documento selecciona como óptima la configuración de seguidores (tracker) con módulos monocristalinos bifaciales: 11,05 MWp, 16.744 módulos, 66 inversores y 644 strings.",
} as const;

export const SOLAR_CONNECTION = {
  flow: [
    { tag: "Planta", title: "Planta San Francisco", desc: "11,05 MWp en configuración óptima.", tone: "bruma" },
    {
      tag: "División",
      title: "3 subproyectos independientes",
      desc: "Cada uno con capacidad inferior a 5 MW.",
      tone: "durazno",
    },
    {
      tag: "Red",
      title: "Red de distribución",
      desc: "Conexión directa al operador de red. No se conecta al STN ni al STR.",
      tone: "azul",
    },
  ],
  enel: {
    title: "ENEL Bogotá",
    desc: "Confirmó la viabilidad de conexión a la red mediante una subestación de pequeña escala.",
  },
  terms: [
    { code: "GD", desc: "Generación Distribuida hasta 5 MW" },
    { code: "AGPE", desc: "Autogeneración a pequeña escala hasta 1 MW" },
    { code: "UPME", desc: "Interviene solo en proyectos de generación mayores a 5 MW" },
  ],
} as const;

export const SOLAR_IMPACT = [
  { icon: "people", title: "Población vulnerable", desc: "Enfoque en los habitantes de Ciudad Bolívar." },
  { icon: "work", title: "Creación de empleo", desc: "Generación de empleo en la ciudad." },
  {
    icon: "growth",
    title: "Desarrollo socioeconómico",
    desc: "Fortalecimiento de la situación socioeconómica de la localidad.",
  },
] as const;

export const SOLAR_WASHINGTON = {
  chip: "Proyección internacional",
  body: "El proyecto se presenta en Washington D.C., sede de la Organización de los Estados Americanos —ante la cual la Fundación tiene estatus consultivo— y del Centro de Consultoría y Litigio Internacional (CECOLI), aliado de la Fundación. Su destino es Ciudad Bolívar, donde la energía solar se convierte en oportunidad para la población vulnerable.",
} as const;

export const SOLAR_DOCS = {
  lead: "El documento incluye estudio de alternativas, simulaciones energéticas, CAPEX y OPEX conceptuales y la proyección de la propuesta económica.",
  main: {
    title: "Propuesta para el desarrollo de una planta solar fotovoltaica en la zona sur de Bogotá D.C.",
    sub: "Documento oficial del proyecto",
    href: PDF_PLANTA_SOLAR,
  },
  pending: [
    { badge: "$", title: "Resumen financiero" },
    { badge: "WEB", title: "Sitio del proyecto" },
  ],
} as const;
