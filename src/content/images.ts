/**
 * Registro de imágenes (design/assets → public/images, ver scripts/optimize-images.mjs).
 * `render: true` = visualización 3D conceptual: debe mostrarse siempre con su rótulo.
 */
export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  render: boolean;
  /** Imagen ilustrativa generada con IA: se muestra siempre con el rótulo «Imagen ilustrativa». */
  illustrative?: boolean;
  /** Encuadre por defecto (object-position) para recortes responsive. */
  pos?: string;
};

export const IMAGES = {
  heroCiudadBolivar: {
    src: "/images/render-hero-ciudad-bolivar.jpg",
    width: 1920,
    height: 980,
    alt: "Visualización 3D: planta solar frente a la ladera iluminada de Ciudad Bolívar al anochecer",
    render: true,
  },
  vistaElevada: {
    src: "/images/render-vista-elevada.jpg",
    width: 1920,
    height: 980,
    alt: "Visualización 3D: vista elevada de la planta solar y Ciudad Bolívar al anochecer",
    render: true,
  },
  panelesReflejo: {
    src: "/images/render-paneles-reflejo.jpg",
    width: 1920,
    height: 980,
    alt: "Visualización 3D: la ciudad reflejada en los paneles solares",
    render: true,
  },
  ladera: {
    src: "/images/render-ladera.jpg",
    width: 1740,
    height: 680,
    alt: "Visualización 3D: ladera iluminada de Ciudad Bolívar al anochecer",
    render: true,
  },
  // Foto real del sitio actual, en baja resolución (486×286): pedir el original.
  panelesSitioActual: {
    src: "/images/foto-paneles-sitio-actual.jpg",
    width: 486,
    height: 286,
    alt: "Paneles solares fotovoltaicos",
    render: false,
  },
} as const satisfies Record<string, SiteImage>;

/** Distintivo oficial (media/logos): se muestra completo, sin recortes ni deformaciones. */
export const MINJUSTICIA_BADGE = {
  src: "/images/vigilado-minjusticia.png",
  width: 402,
  height: 127,
  alt: "Vigilado por el Ministerio de Justicia y del Derecho · La justicia es de todos · Minjusticia",
  render: false,
} as const satisfies SiteImage;

/** Arte de los banners interiores (prop `art` de PageBanner.dc.html). */
export const BANNER_ART = {
  tejido: [IMAGES.heroCiudadBolivar, "50% 40%"],
  justicia: [IMAGES.ladera, "30% 50%"],
  dialogo: [IMAGES.ladera, "70% 40%"],
  educacion: [IMAGES.vistaElevada, "50% 30%"],
  paz: [IMAGES.heroCiudadBolivar, "80% 30%"],
  oficina: [IMAGES.ladera, "50% 30%"],
  comunidad: [IMAGES.ladera, "50% 50%"],
  campus: [IMAGES.vistaElevada, "30% 40%"],
  cultivo: [IMAGES.panelesReflejo, "50% 60%"],
} as const satisfies Record<string, readonly [SiteImage, string]>;

export type BannerArt = keyof typeof BANNER_ART;

/**
 * Imágenes ilustrativas (media/imagenes-web, generadas con IA). No son fotografías reales de
 * proyectos ejecutados, profesionales ni instalaciones: siempre van con su rótulo.
 */
const ill = (name: string, alt: string, pos: string, w = 1672, h = 941): SiteImage => ({
  src: `/images/${name}.webp`,
  width: w,
  height: h,
  alt: `Imagen ilustrativa: ${alt}`,
  render: false,
  illustrative: true,
  pos,
});

export const ILLUSTRATIVE = {
  solar: ill("proyecto-solar-san-francisco", "paneles solares frente a montañas al atardecer", "55% 60%"),
  almaMater: ill("proyecto-alma-mater-alliance", "estudiantes universitarios conversando en un campus", "52% 50%"),
  desarrolloSocial: ill(
    "proyecto-desarrollo-social",
    "entrega de alimentos en una huerta comunitaria",
    "45% 50%",
    1536,
    775,
  ),
  estudioLegal: ill("estudio-legal-consultoria", "reunión de asesoría jurídica en una oficina", "50% 50%"),
  litigio: ill("litigio-estrategico", "equipo jurídico revisando documentos", "48% 45%"),
  conciliacion: ill("centro-conciliacion", "conversación entre tres personas en una mesa de diálogo", "42% 45%"),
  educacion: ill("educacion-para-la-paz", "jornada de formación con un grupo diverso", "55% 45%"),
  justiciaPaz: ill("justicia-para-la-paz", "diálogo comunitario al aire libre", "55% 50%"),
} as const;
