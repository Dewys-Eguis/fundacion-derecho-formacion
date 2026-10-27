/**
 * Contenido de las páginas interiores (Staff, Oficinas, Gobierno, Qué hacemos, Diplomados, Contacto).
 * Alcance: páginas y apartados del sitio actual (fundacionderechoyformacion.org).
 * Textos: los de las pantallas del diseño (design/screens/*.dc.html), contrastados con el PDF aprobado.
 * Lo no confirmado va entre [corchetes] y se muestra con <Pending>.
 */
import type { SiteImage } from "./images";
import { ROUTES } from "./routes";

/* ======================= Staff jurídico ======================= */
/**
 * Fuente: «STAFF DE LA FUNDACIÓN DFTH ACTUALIZADO JULIO 21-2025» (docs/staff, documento privado, no se
 * publica). Orden, nombres, cargos y textos del documento; solo se corrigieron tildes y puntuación.
 * Fotografías reales entregadas por la Fundación (media/staff).
 */
export type StaffSection = { title: string; paragraphs?: string[]; items?: string[] };
export type StaffMember = {
  /** Identificador para anclas y para el foco al cerrar la ficha. */
  id: string;
  name: string;
  /** Cargo institucional principal (tarjeta). */
  role: string;
  /** Línea secundaria del encabezado del documento. */
  tagline: string;
  photo: SiteImage;
  sections: StaffSection[];
};

const portrait = (file: string, name: string, w: number, h: number, pos: string): SiteImage => ({
  src: `/images/${file}`,
  width: w,
  height: h,
  alt: `Fotografía de ${name}`,
  render: false,
  pos,
});

export const STAFF: StaffMember[] = [
  {
    id: "jesus-enrique-archila-guio",
    name: "Jesús Enrique Archila Guio",
    role: "CEO y Representante Legal de la Fundación DFTH",
    tagline: "Docencia Universitaria · Implementación de la Paz en Colombia",
    photo: portrait("Dr-Jesus-Enrique-Archila.jpg", "Jesús Enrique Archila Guio", 1032, 1037, "62% 30%"),
    sections: [
      {
        title: "Presentación profesional",
        paragraphs: [
          "CEO de la Fundación DFTH, abogado penalista experto en resolución pacífica de conflictos, política criminal y ciencias forenses. Ocupa el cargo de Profesor en el área de Derecho Penal en las Universidades Católica de Colombia y Colegio Mayor de Cundinamarca.",
        ],
      },
      {
        title: "Formación académica",
        paragraphs: [
          "Es Doctor en Educación de la Universidad Simón Bolívar de Barranquilla, Magíster en Ciencias Penales y Criminológicas de la Universidad Externado de Colombia, Abogado de la Universidad Católica de Colombia, experto en Derecho Penal y Derecho Probatorio de la Universidad Católica de Colombia.",
        ],
      },
      {
        title: "Experiencia profesional",
        paragraphs: [
          "Ocupó el cargo de Tutor en Consultorio Jurídico de la Universidad Nacional 2017 y en la actualidad es Investigador de Colciencias.",
          "Cuenta con amplia experiencia en Consultoría y Litigio Penal, Derechos Humanos y Derecho Internacional Humanitario, Proceso de Paz en Colombia y Justicia Transicional, Mecanismos Alternativos de Justicia y Extinción del Derecho de Dominio. Abogado Fundador de las Firmas: Fundación Derecho y Formación Tejido Humano, Alliance EDU y Alliance AR.",
        ],
      },
      {
        title: "Cargos relevantes",
        paragraphs: [
          "Ocupó cargos públicos como Servidor del Estado en la Fiscalía General de la Nación 2000-2005, fue Fiscal Delegado ante la Corte Suprema de Justicia 2004.",
        ],
      },
      {
        title: "Publicaciones",
        paragraphs: ["Autor de diferentes obras jurídicas y cultura de paz, entre otras:"],
        items: [
          "La Prueba en el Delito de Lavado de Activos",
          "Victimología y Valores Humanos Alternativas contra la Violencia",
          "Derecho Penal y Derechos Humanos",
          "Principio de Oportunidad",
        ],
      },
      {
        title: "Trayectoria institucional",
        paragraphs: [
          "Profesional con gran habilidad técnica que llevó a la Fundación DFTH a ser una Entidad Consultiva de la Organización de Estados Americanos OEA en abril de 2023.",
        ],
      },
    ],
  },
  {
    id: "leydi-yesenia-ramirez-aristizabal",
    name: "Leydi Yesenia Ramírez Aristizábal",
    role: "Directora General",
    tagline: "Conciliadora y Atención a Víctimas en Derecho de la Fundación DFTH 2025 · Docencia Universitaria",
    photo: portrait("Dra-Leydi-Ramirez.jpg", "Leydi Yesenia Ramírez Aristizábal", 840, 1050, "50% 20%"),
    sections: [
      {
        title: "Presentación profesional",
        paragraphs: [
          "Abogada Conciliadora en Derecho y Atención a Víctimas de la Fundación DFTH, experta en Gerencia de Proyectos y Derecho Comercial que regula las actividades mercantiles, los actos de comercio, los empresarios y las relaciones jurídicas derivadas del tráfico económico en el derecho comercial e inmobiliario.",
        ],
      },
      {
        title: "Formación y experiencia",
        paragraphs: [
          "Profesional de la Universidad Católica de Colombia, con experiencia en Resolución Pacífica de Conflictos, Conciliadora del Centro de Conciliación de la Fundación DFTH, acciones en Derecho Penal y Derechos Humanos, Atención a Víctimas y Mediación.",
        ],
      },
      {
        title: "Trayectoria institucional",
        paragraphs: [
          "Se desempeña como Asesora Jurídica y Directora Ejecutiva de las firmas Alliance EDU y Alliance AR, Directora Ejecutiva de la Fundación Derecho y Formación Tejido Humano 2023-2025; Consultora en litigio Estratégico de la Fundación United For Justice con sede en Washington EE. UU.",
          "Experiencia en Secretaría de Procesos por más de 10 años y Estudio Legal de acciones Penales en la Oficina Servicios Profesionales de la Calle 100 No. 18-36, Oficina 701.",
        ],
      },
      {
        title: "Publicaciones",
        items: ["Delitos contra el Orden Económico y Social. Derecho Penal Especial. ISBN: 978-958-791-911-0"],
      },
    ],
  },
  {
    id: "pedro-octavio-munar-cadena",
    name: "Pedro Octavio Munar Cadena",
    role: "Presidente de la Corte Suprema de Justicia de Colombia 2010",
    tagline: "Docencia Universitaria, Consultoría y Estudio Legal",
    photo: portrait("Dr-Pedro-Munar-Cadena.jpg", "Pedro Octavio Munar Cadena", 574, 596, "68% 30%"),
    sections: [
      {
        title: "Cargos relevantes",
        items: [
          "Presidente Sala Administrativa del Consejo Superior de la Judicatura. 2014.",
          "Presidente Corte Suprema de Justicia, diciembre 2010 - enero 2011.",
          "Presidente Sala de Casación Civil Corte Suprema de Justicia 2004.",
          "Magistrado Corte Suprema de Justicia, 1° de noviembre de 2003 a 31 de octubre de 2011.",
          "Magistrado del Consejo Superior de la Judicatura, 7 de febrero de 2013 al 27 de noviembre de 2014.",
          "Exmagistrado Sala de Casación Civil.",
          "Árbitro de la Lista A de la Cámara de Comercio de Bogotá.",
        ],
      },
      {
        title: "Distinciones y reconocimientos",
        items: [
          "Botón de Oro – Universidad Santo Tomás 2004.",
          "Gobernación de Boyacá – Medalla orden de los lanceros grado Encomendador 2004.",
          "Universidad La Gran Colombia – Medalla Honor al Mérito Gran Colombiano 2003 y 2011.",
        ],
      },
      {
        title: "Docencia",
        paragraphs: [
          "Docente Universitario de las Universidades: Javeriana, Bolivariana de Medellín, Santo Tomás, Universidad de la Sabana, Universidad Libre y Autónoma de Colombia. Conferencista Internacional.",
        ],
      },
    ],
  },
  {
    id: "lina-maria-munar-guevara",
    name: "Lina María Munar Guevara",
    role: "Jurisdicción Especial para la Paz",
    tagline: "Docencia Universitaria",
    photo: portrait("Dra-Lina-Maria-Munar-Guevara.jpg", "Lina María Munar Guevara", 1536, 2048, "50% 22%"),
    sections: [
      {
        title: "Jurisdicción Especial para la Paz",
        paragraphs: [
          "Sala de Amnistía o Indulto | Práctica profesional agosto 2019 - diciembre 2019. Apoyo al despacho de la magistrada Lily Rueda.",
        ],
        items: [
          "Proyecciones de resoluciones.",
          "Emisión de permisos de salida del país para excombatientes.",
          "Investigación en Justicia Transicional, Derecho Internacional Humanitario, y régimen de amnistías.",
          "Funciones administrativas.",
        ],
      },
      {
        title: "Trayectoria académica y editorial",
        paragraphs: ["Abogada."],
        items: [
          "Miembro del equipo editorial de 070 | Revista digital del Departamento de periodismo | 2018-2019.",
          "Miembro del equipo editorial de UNA | Revista digital de la Facultad de Derecho | 2018-2019.",
          "Miembro del grupo Justicia para mujeres del Consultorio Jurídico | Primer semestre 2019.",
          "Miembro del semillero de investigación Sustracción internacional de menores y violencia doméstica | Primer semestre 2019.",
          "Monitora de la clase Crónicas y otros relatos periodísticos | Segundo semestre 2018 y primer semestre 2019.",
          "Monitora de la clase Obligaciones II | Segundo semestre 2017 y primer semestre 2018.",
        ],
      },
    ],
  },
  {
    id: "yazmin-cadena-camargo",
    name: "Yazmin Cadena Camargo",
    role: "Profesora, Decana Encargada de la Facultad de Medicina de la Universidad Javeriana 2025",
    tagline: "Docencia Universitaria y Salud e Investigación Científica",
    photo: portrait("Dra-Yazmin-Cadena-Camargo.jpg", "Yazmin Cadena Camargo", 1280, 960, "52% 20%"),
    sections: [
      {
        title: "Formación académica",
        paragraphs: [
          "Médica cirujano de la Pontificia Universidad Javeriana, doctora en Salud Global y Antropología de la Salud de la Universidad de Maastricht en los Países Bajos, Salubrista pública de la Universidad Hebrea de Jerusalén, Israel.",
        ],
      },
      {
        title: "Perfil profesional",
        paragraphs: [
          "Con habilidades clínicas y en salud pública, con gran destreza para relacionarse en comunidad, trabajar en grupo y capacidad de liderazgo. Gran experiencia en el desarrollo de temas y proyectos relacionados con la promoción de la salud, prevención de la enfermedad, y acercamiento a fenómenos sociales relevantes de la realidad nacional y del bienestar de la familia.",
        ],
      },
      {
        title: "Docencia",
        paragraphs: [
          "Docente de la Pontificia Universidad Javeriana en la Facultad de Medicina en pregrado y postgrado, de educación continua, y de la Maestría en Salud Pública, programa Interfacultades. Docente de educación continua en la Universidad de Gerona, España. Tutora de tesis de Maestría en Salud Global de la Universidad de Maastricht, Países Bajos.",
        ],
      },
      {
        title: "Responsabilidad social",
        paragraphs: [
          "Gran experiencia en proyectos de responsabilidad social, en especial acompañamiento y atención a familias en situación de desplazamiento como parte del equipo interdisciplinar del proyecto Vidas Móviles.",
        ],
      },
    ],
  },
  {
    id: "angela-margarita-rey-anaya",
    name: "Ángela Margarita Rey Anaya",
    role: "Profesora, CEO de la Fundación United For Justice",
    tagline: "Docencia Universitaria, Litigio Estratégico y Consultora Internacional",
    photo: portrait("Dra-Margarita-Rey-Anaya.jpg", "Ángela Margarita Rey Anaya", 790, 1024, "50% 22%"),
    sections: [
      {
        title: "Formación académica",
        paragraphs: [
          "Abogada egresada de la Universidad Externado de Colombia. Cuenta con maestrías en International Human Rights and Humanitarian Law de American University, y Derecho Penal Internacional de la Universidad Granada, España. En la actualidad es candidata al Máster de Derecho, con énfasis en derecho y el sistema de inmigración de los Estados Unidos de la University of Maryland, School of Law (2024).",
        ],
      },
      {
        title: "Trayectoria actual",
        paragraphs: [
          "Actualmente es la experta independiente por Colombia ante el Comité del Mecanismo de Seguimiento de la Implementación de la Convención Interamericana para Prevenir, Sancionar y Erradicar la Violencia contra la Mujer (MESECVI-OEA, Convención de Belém do Pará). Es profesora y consultora en Derechos Humanos y Relacionamiento Comunitario, e instructora de entrenamiento estratégico en el fortalecimiento institucional de organizaciones de la sociedad civil, experta en gerencia de proyectos.",
          "Es miembro de la Academia Colombiana de Derecho Internacional. Fundadora y directora ejecutiva de la Fundación United for Justice/Unidos por la Justicia, organización no gubernamental que busca contribuir a la realización de los derechos a la verdad, justicia y reparación de las víctimas de graves violaciones de derechos humanos a través, entre otros, del diseño de litigio estratégico nacional e internacional.",
          "Como Directora, representa judicialmente a víctimas de graves violaciones de Derechos Humanos en México, Guatemala, Colombia y Costa Rica.",
        ],
      },
      {
        title: "Experiencia diplomática",
        paragraphs: [
          "Fue diplomática del Ministerio de Relaciones Exteriores de Colombia, y se desempeñó como jefe de delegación ante la Comisión Interamericana de Derechos Humanos (Washington, D.C.), el Consejo de Derechos Humanos y órganos convencionales de las Naciones Unidas (Ginebra y New York), la Conferencia de Revisión y las Asambleas de los Estados Parte del Estatuto de la Corte Penal Internacional (Kampala y La Haya).",
          "Adicionalmente fue agente ante la Corte Interamericana de Derechos Humanos (San José de Costa Rica) en los procedimientos de supervisión de sentencias.",
        ],
      },
      {
        title: "Publicaciones",
        paragraphs: [
          "Autora de publicaciones relacionadas con la protección internacional de los derechos humanos en coautoría con su padre, Ernesto Rey Cantor.",
        ],
      },
    ],
  },
  {
    id: "juan-miguel-gonzalez-velasco",
    name: "Juan Miguel González Velasco",
    role: "Docencia Universitaria y Consultor Internacional de Proyectos",
    tagline: "Doctor en Educación Universidad Mayor de San Andrés - Universidad de Bremen, Alemania",
    // Original de 148×194 px: pedir una versión de mayor resolución.
    photo: portrait("Dr-Juan-Miguel-Gonzalez-Velassco.jpg", "Juan Miguel González Velasco", 148, 194, "50% 30%"),
    sections: [
      {
        title: "Formación académica",
        items: [
          "Doctor y Post Ph.D., Farmacéutico clínico, Universidad Autónoma del Estado de Hidalgo, México.",
          "Doctor en Educación, Universidad Mayor de San Andrés - Universidad de Bremen, Alemania.",
          "Postdoctorado en Educación, Universidad Católica de Brasilia.",
          "Post Doctor en Filosofía, Ciencia y Tecnología, UMSA, Bolivia.",
          "Post Doctor en Andragogía Hospitalaria, Universidad de Barcelona, España.",
        ],
      },
      {
        title: "Distinciones y reconocimientos",
        items: [
          "Doctor Honoris Causa, Universidad Simón Bolívar, Barranquilla, Colombia.",
          "Doctor Honoris Causa por aportes a la Educación, Escuela Militar de Ingeniería.",
          "Investigador A1 Colciencias, Colombia.",
        ],
      },
      {
        title: "Docencia",
        paragraphs: [
          "Profesor invitado y conferencista internacional en diversas universidades latinoamericanas: Brasil, Colombia, México, España, Perú, Bolivia, entre otros.",
        ],
      },
      {
        title: "Publicaciones",
        paragraphs: [
          "Autor de 27 libros y varias obras en temas de Educación y Complejidad: Teoría Educativa Transcompleja, Aula Mente Social, Religaje Educativo, Estrategias de Indagación Científica, entre otras. Autor de 45 artículos originales en temas de Educación, Complejidad y Transdisciplinariedad.",
        ],
      },
    ],
  },
  {
    id: "jose-ricardo-archila-guio",
    name: "José Ricardo Archila Guio",
    role: "Director del Centro de Conciliación de la Fundación DFTH",
    tagline: "Docencia Universitaria · Abogado Experto en Mecanismos Alternativos de Solución Pacífica de Conflictos",
    photo: portrait("Dr-Jose-Ricardo-Archila-Guio.png", "José Ricardo Archila Guio", 1122, 1402, "50% 12%"),
    sections: [
      {
        title: "Presentación profesional",
        paragraphs: [
          "Abogado Director del Centro de Conciliación de la Fundación DFTH, con amplia experiencia y experto en Resolución Pacífica de Conflictos, Conciliación y Mediación e Insolvencia de Personas Jurídicas y Naturales y Derechos Humanos de la Fundación DFTH.",
        ],
      },
      {
        title: "Formación y docencia",
        paragraphs: [
          "Abogado de la Universidad Católica de Colombia especializado en Derecho Procesal Constitucional, Doctor Honoris Causa en Victimología, Docente Universitario en las áreas de Derecho Probatorio y Sucesiones; Docente Monitor Universitario en las áreas de Derecho Procesal y Derecho Procesal Constitucional; Abogado Conciliador ©.",
        ],
      },
      {
        title: "Experiencia profesional",
        paragraphs: [
          "Abogado con amplia experiencia en Litigio y Consultoría Jurídica, Asesor Jurídico de Empresas Privadas, Asesor y Asistente en Conciliación. Destacada experiencia en el ámbito del litigio en las áreas Laboral, Penal, Civil, Familia; miembro de número y Docente de UNIVIRTUAL de la ciudad de México D.F.",
          "Se desempeñó por varios años como Representante legal de la Fundación Derecho y Formación Tejido Humano.",
        ],
      },
    ],
  },
  {
    id: "kelly-yojara-ramirez-aristizabal",
    name: "Kelly Yojara Ramírez Aristizábal",
    role: "Directora Ejecutiva del Centro de Conciliación de la Fundación DFTH",
    tagline: "Experta en Resolución Pacífica de Conflictos",
    photo: portrait("Dra-Kelly-Yojara-Ramirez.jpg", "Kelly Yojara Ramírez Aristizábal", 652, 1560, "50% 10%"),
    sections: [
      {
        title: "Presentación profesional",
        paragraphs: [
          "Abogada de la Universidad Católica de Colombia, con amplia experiencia en Actuaciones Judiciales sobre Resolución Pacífica de Conflictos y aplicación de Mecanismos alternativos de Justicia en diferentes áreas del Derecho.",
        ],
      },
      {
        title: "Experiencia profesional",
        paragraphs: [
          "Asesora Jurídica en derecho Civil y Comercial de las firmas Alliance EDU y Alliance AR, Fundación Derecho y Formación Tejido Humano.",
          "Consultora en Litigio Inmobiliario y Estudio Legal de Procesos en Derecho Civil, como rama del derecho privado que regula las relaciones jurídicas entre personas, sean naturales o jurídicas, en cuanto a su estado civil, patrimonio y relaciones familiares.",
        ],
      },
    ],
  },
];

/** Busca un integrante por su identificador (para Inicio, galería y Justicia para la paz). */
export const staffById = (id: string) => {
  const m = STAFF.find((s) => s.id === id);
  if (!m) throw new Error(`Staff no encontrado: ${id}`);
  return m;
};

/* ======================= Nuestras oficinas ======================= */
const office = (n: number, alt: string): SiteImage => ({
  src: `/images/Oficina_Fundacion_Tejido_Humano_${n}.webp`,
  width: 1080,
  height: 810,
  alt,
  render: false,
});

/** Fotografías reales entregadas (media/Oficinas). La n.º 3 no existe; la 4-300x225 es una copia reducida. */
export const OFFICE_PHOTOS = [
  { image: office(1, "Sala de reuniones con mesa de madera y sillas tapizadas"), caption: "Sala de reuniones" },
  { image: office(2, "Recepción y sala de espera con acceso a la calle"), caption: "Recepción y sala de espera" },
  { image: office(4, "Despacho con escritorio, biblioteca jurídica y archivo"), caption: "Despacho jurídico" },
  { image: office(5, "Despacho con escritorio y ventana hacia la ciudad"), caption: "Despacho con vista a la ciudad" },
];

export const OFFICE = {
  map: {
    label: "Fundación Derecho y Formación",
    note: "Mapa ilustrativo.",
    pending: "El sitio menciona «Torre Davivienda»: confirmar",
    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=Calle%2012B%20%23%208A-34%2C%20Bogot%C3%A1%2C%20Colombia",
  },
  hoursPending: "Horario de atención por confirmar",
  oea: {
    title: "Organización con estatus consultivo ante la OEA",
    text: "CP/RES. 759 (1217/99) · Certificado OEA disponible en Gobierno corporativo.",
    logoPending: "oea.webp",
  },
} as const;

/* ======================= Gobierno corporativo ======================= */
export type DocKind = "act" | "cer" | "fin" | "tri";
export const DOC_CATEGORY: Record<DocKind, string> = {
  act: "Actas y resoluciones",
  cer: "Certificados",
  fin: "Información financiera y de gestión",
  tri: "Información tributaria",
};
export const DOC_FILTERS: { value: "all" | DocKind; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "act", label: "Actas y resoluciones" },
  { value: "cer", label: "Certificados" },
  { value: "fin", label: "Financiera y gestión" },
  { value: "tri", label: "Tributaria" },
];
/** Documentos listados en el sitio actual (sin archivo adjunto: enlaces por cargar). */
export const DOCUMENTS: { kind: DocKind; title: string; href?: string }[] = [
  { kind: "act", title: "Acta Ordinaria 01 – 2025" },
  { kind: "act", title: "Resolución No. 0748 del 21 de junio de 2021" },
  { kind: "act", title: "Insolvencia Económica de Persona Natural No Comerciante" },
  { kind: "act", title: "Resolución No. 0026 del 16 de enero de 2014 del Centro de Conciliación" },
  { kind: "cer", title: "Certificación de cumplimiento de los requisitos (2025)" },
  { kind: "cer", title: "Certificado Representante Legal – Antecedentes judiciales" },
  { kind: "cer", title: "Certificado OEA" },
  { kind: "fin", title: "Estados financieros a diciembre 31 de 2024-2023" },
  { kind: "fin", title: "Informe de gestión a diciembre 31 de 2024" },
  { kind: "tri", title: "RUT" },
];
export const DOCS_INTRO =
  "Esta sección reúne la información clave sobre nuestra estructura y lineamientos empresariales.";
export const DOCS_PENDING = "Enlaces de descarga por cargar: el sitio actual lista los documentos sin archivo adjunto";

/* ======================= Estudio legal ======================= */
export const LEGAL_AREAS = [
  {
    label: "Derecho penal",
    def: "Regula el poder punitivo del Estado: qué conductas son delito, qué penas se aplican y cómo se adelantan los procesos, con garantías para el procesado y para las víctimas.",
    actions: [
      "Denuncia penal",
      "Juicio penal (proceso penal ordinario)",
      "Querella",
      "Investigación formal",
      "Imputación de cargos",
      "Acusación",
      "Preacuerdos",
      "Principio de oportunidad",
      "Incidente de reparación integral",
      "Revisión de sentencias",
      "Tutela en materia penal",
    ],
  },
  {
    label: "Derecho civil",
    def: "Rige las relaciones entre personas en materia de estado civil, bienes y familia. Es el fundamento del derecho privado y se aplica de forma supletoria a otras ramas del derecho.",
    actions: [
      "Cumplimiento de contrato",
      "Proceso ejecutivo",
      "Resolución de contrato",
      "Nulidad",
      "Reivindicación",
      "Acciones posesorias",
      "Pertenencia",
      "Responsabilidad civil",
      "División y partición",
      "Simulación",
      "Sucesión",
      "Impugnación de actos jurídicos",
      "Acción de tutela de derechos reales",
    ],
  },
  {
    label: "Derecho comercial",
    def: "Regula la actividad empresarial, a los comerciantes y las operaciones mercantiles. En Colombia, su base normativa es el Código de Comercio y normas complementarias.",
    actions: [
      "Contratos mercantiles",
      "Acción de nulidad de contrato comercial",
      "Ejecución de títulos valores",
      "Insolvencia empresarial",
      "Liquidación",
      "Acción social de responsabilidad",
      "Acción individual de responsabilidad",
      "Procesos derivados de títulos valores",
      "Impugnación de decisiones societarias",
      "Competencia desleal",
      "Propiedad intelectual",
    ],
  },
  {
    label: "Derecho constitucional",
    def: "Comprende la organización del Estado, la distribución del poder público y los derechos fundamentales.",
    actions: [
      "Acción de tutela",
      "Hábeas corpus",
      "Acción de cumplimiento",
      "Acción popular",
      "Acción de grupo",
      "Acción de inconstitucionalidad",
      "Acción de nulidad por inconstitucionalidad",
      "Excepción de inconstitucionalidad",
      "Incidente de desacato",
    ],
  },
  {
    label: "Derecho administrativo",
    def: "Abarca la administración pública y las relaciones entre la ciudadanía y el Estado.",
    actions: [
      "Nulidad simple",
      "Nulidad y restablecimiento del derecho",
      "Reparación directa",
      "Controversias contractuales",
      "Acción de repetición",
      "Nulidad electoral",
      "Acción de cumplimiento (jurisdicción contenciosa)",
      "Acciones populares (con efectos administrativos)",
      "Medidas cautelares",
      "Desacato contra entidades públicas",
    ],
  },
] as const;

export const LEGAL_INTERNATIONAL = [
  {
    title: "Litigio estratégico",
    text: "Representación ante tribunales en casos emblemáticos de derechos humanos, en particular represión política, criminalización de la protesta y violencia estructural.",
    href: ROUTES.litigio,
  },
  {
    title: "Derecho internacional y derechos humanos",
    text: "Representación ante tribunales internacionales junto con el Centro de Consultoría y Litigio Internacional (CECOLI).",
    href: ROUTES.litigio,
  },
] as const;

/* ======================= Litigio estratégico ======================= */
export const CECOLI = {
  name: "Centro de Consultoría y Litigio Internacional (CECOLI)",
  sub: "Aliado de la Fundación con sede en Washington D.C.",
} as const;

export const LITIGATION_LINES = [
  {
    title: "Litigio internacional en derechos humanos",
    desc: "Representación directa ante tribunales internacionales en casos emblemáticos.",
    items: [
      "Sistema Interamericano: peticiones individuales, medidas cautelares y provisionales, audiencias temáticas y casos ante la CIDH y la Corte IDH",
      "Sistema ONU: litigio ante los comités de tratados (CCPR, CEDAW, CAT, CRC, CERD), informes alternativos y exámenes periódicos",
      "Áreas especializadas: derechos políticos, libertad de expresión, derechos de las mujeres y debido proceso",
      "INTERPOL: solicitudes de eliminación de notificaciones rojas en casos de persecución política",
      "INTERPOL: presentación de evidencia, alegaciones de violación al debido proceso y afectaciones a derechos civiles y políticos",
    ],
  },
  {
    title: "Representación judicial nacional",
    desc: "Garantiza que cada persona cuente con respaldo legal especializado para la defensa de sus libertades, dignidad e igualdad ante las autoridades nacionales.",
    items: [
      "Litigio contencioso administrativo ante juzgados y el Consejo de Estado por daños atribuibles al Estado",
      "Procesos penales complejos con enfoque de derechos humanos y coordinación con la justicia transicional",
      "Participación directa en audiencias, análisis probatorio y formulación de alegatos con enfoque internacional",
    ],
  },
  {
    title: "Empresas y derechos humanos",
    desc: "Apoyo a empresas que adoptan prácticas responsables.",
    items: [
      "Defensa jurídica y mitigación de riesgos",
      "Auditorías jurídicas retrospectivas y remediación no judicial",
      "Evaluaciones de impacto en derechos humanos (HRIA)",
      "Diseño de políticas, sistemas de monitoreo y capacitación",
    ],
  },
  {
    title: "Consulta previa y derechos colectivos",
    desc: "Asistencia jurídica en consulta libre, previa e informada.",
    items: [
      "Comunidades indígenas, afrodescendientes y campesinas",
      "Defensa frente a megaproyectos extractivos y de infraestructura",
      "Acompañamiento en procesos judiciales, administrativos y escenarios de diálogo comunitario",
    ],
  },
  {
    title: "Formación, investigación y asesoría estratégica",
    desc: "Cursos, diplomados, seminarios y capacitaciones.",
    items: [
      "Litigio internacional",
      "Derechos de las mujeres",
      "Justicia ambiental y mecanismos de protección",
      "Informes jurídicos y materiales de incidencia",
    ],
  },
  {
    title: "Asistencia migratoria integral en Estados Unidos",
    desc: "Asistencia técnica no legal para trámites migratorios.",
    items: [
      "Peticiones familiares (I-130)",
      "Visas U y VAWA (I-918, I-360)",
      "Asilo (I-589)",
      "Ajuste de estatus y naturalización (I-485, N-400)",
      "Permisos de trabajo (I-765)",
      "Visas de no inmigrante y de estudiante (DS-160, F-1)",
      "Solicitudes FOIA y antecedentes (FBI Identity History Summary)",
    ],
  },
] as const;

/* ======================= Centro de Conciliación ======================= */
export const CONCILIATION = {
  resolution: {
    label: "Resolución",
    value: "0026 del 16 de enero de 2014",
    sub: "Ministerio de Justicia y del Derecho",
  },
  email: {
    label: "Correo del Centro",
    value: "centroconciliacionth@gmail.com",
    href: "mailto:centroconciliacionth@gmail.com",
  },
  what: "Es un mecanismo de solución de conflictos civiles, de familia y comerciales, en el que un conciliador facilita el diálogo entre las partes para llegar a un acuerdo definitivo sin acudir a un proceso judicial.",
  callout:
    "Los acuerdos son definitivos y vinculantes: hacen tránsito a cosa juzgada y pueden exigirse ante la autoridad competente.",
  advantages: [
    "Resolución más rápida",
    "Menor costo que un litigio",
    "Ahorro de tiempo",
    "Acuerdos voluntarios y definitivos",
    "Flexibilidad",
    "Confidencialidad",
  ],
  matters: {
    civ: [
      "Restitución de inmueble arrendado",
      "Obligaciones contractuales",
      "Pago de cánones de arrendamiento",
      "Deudas",
      "Indemnizaciones",
      "Incumplimiento de contratos",
      "Rectificación de linderos",
      "Ofertas de pago",
      "Otorgamiento de escritura pública",
      "Resolución y rescisión de contratos",
    ],
    fam: [
      "Alimentos",
      "Regulación de visitas",
      "Custodia",
      "Liquidación y división de bienes",
      "Declaración de unión marital de hecho",
      "Liquidación de sociedades de gananciales",
      "Otras que deriven de una relación familiar",
    ],
  },
  services: [
    {
      title: "Conciliación y mediación",
      text: "Solución alternativa de conflictos civiles, de familia y comerciales.",
    },
    {
      title: "Insolvencia de persona natural no comerciante",
      text: "Busca restablecer el equilibrio financiero del deudor y proteger a los acreedores con acuerdos de pago que eviten la liquidación forzosa. Estos procesos ofrecen una alternativa para evitar la liquidación forzosa, brindando plazos y condiciones más favorables. Además, fomentan la transparencia y la reorganización responsable de las finanzas.",
    },
    {
      title: "Adjudicación de apoyos",
      text: "Procesos según la Ley 1996 de 2019.",
      pending: "Descripción por confirmar: el texto actual del sitio corresponde a otra sección",
    },
  ],
} as const;

/* ======================= Educación para la paz ======================= */
export type EduKind = "for" | "pro" | "inv";
export const EDU_CATEGORY: Record<EduKind, string> = {
  for: "Formación",
  pro: "Proyectos y políticas",
  inv: "Investigación",
};
export const EDU_ITEMS: { kind: EduKind; text: string }[] = [
  {
    kind: "for",
    text: "Cursos, seminarios y diplomados en métodos alternativos de solución de conflictos, derecho penal, lavado de activos, extinción de dominio y financiación del terrorismo",
  },
  {
    kind: "pro",
    text: "Diseño, acompañamiento y evaluación de planes y proyectos para organizaciones públicas, privadas e internacionales",
  },
  { kind: "inv", text: "Diagnósticos, mapeos y análisis de problemáticas comunitarias" },
  { kind: "pro", text: "Modelos pedagógicos y académicos para políticas públicas y privadas" },
  { kind: "for", text: "Formación de líderes, familias y comunidades" },
  { kind: "pro", text: "Metodologías de tejido social, construcción de paz y convivencia ciudadana" },
  { kind: "for", text: "Capacitación presencial y virtual a equipos de trabajo en temas multidisciplinarios" },
  { kind: "pro", text: "Plataformas especializadas y apoyo a población vulnerable" },
  { kind: "for", text: "Capacitación en mejora continua de procesos, proyectos y políticas" },
  { kind: "inv", text: "Modelos estadísticos de seguimiento a programas sociales" },
  { kind: "inv", text: "Investigación y estudios técnicos" },
  { kind: "for", text: "Organización de seminarios, talleres, congresos y espacios de aprendizaje colaborativo" },
];

/* ======================= Justicia especial para la paz ======================= */
export const JEP_TOPICS = [
  {
    title: "Litigio de procesos ante la JEP",
    text: "Representación y defensa de las partes en los casos ante la Jurisdicción Especial para la Paz, con énfasis en el debido proceso, la verdad y la reparación.",
  },
  {
    title: "Competencias y jurisdicción",
    text: "La JEP investiga, juzga y sanciona conductas vinculadas al conflicto armado, incluidas graves violaciones a los derechos humanos. Su alcance comprende a excombatientes, agentes del Estado y terceros. Este tribunal busca esclarecer responsabilidades individuales y colectivas de manera transparente. Además, se rige por principios de imparcialidad, independencia y enfoque en las víctimas. Así, se convierte en un instrumento clave dentro del Sistema Integral de Verdad, Justicia, Reparación y No Repetición.",
  },
  {
    title: "Enfoque en las víctimas",
    text: "Las víctimas están en el centro de los procesos, con derecho a la verdad, a la reparación integral y a la participación. De esta forma, la JEP prioriza la justicia restaurativa sobre la retributiva, poniendo a las víctimas como protagonistas.",
  },
  {
    title: "Sanciones y mecanismos restaurativos",
    text: "El sistema combina justicia restaurativa y retributiva, según el nivel de verdad aportada y la responsabilidad asumida. Quienes reconozcan de manera temprana sus crímenes pueden acceder a sanciones alternativas que incluyen reparación a las víctimas y trabajos comunitarios. En casos de negación o incumplimiento, se aplican penas privativas de la libertad más severas. Así, se promueve una justicia transformadora orientada a la no repetición del conflicto armado.",
  },
] as const;

export const JEP_MEMBER = {
  photo: staffById("lina-maria-munar-guevara").photo,
  label: "Equipo · Jurisdicción Especial para la Paz",
  name: "Lina María Munar Guevara",
  text: "Experiencia de apoyo en la Sala de Amnistía o Indulto de la JEP (2019).",
} as const;

/* ======================= Diplomados ======================= */
export type CourseKind = "ia" | "ped" | "tec" | "inc" | "sst";
export const COURSE_CATEGORY: Record<CourseKind, string> = {
  ia: "IA",
  ped: "Pedagogía",
  tec: "Tecnología",
  inc: "Inclusión",
  sst: "SST",
};
export const COURSE_FILTERS: { value: "all" | CourseKind; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "ia", label: "IA" },
  { value: "ped", label: "Pedagogía" },
  { value: "tec", label: "Tecnología" },
  { value: "inc", label: "Inclusión" },
  { value: "sst", label: "SST" },
];
/**
 * Formulario de inscripción del sitio actual (Google Forms): el mismo para los 21 diplomados.
 */
export const COURSE_SIGNUP_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScL1VjYbArta6BEcPh5YhJ1ECZb9-Og6bl_kvveFDyzV_rbNQ/viewform?usp=send_form";

export type Course = {
  kind: CourseKind;
  title: string;
  /** Resumen de la tarjeta (diseño aprobado). */
  desc: string;
  /** Descripción completa del sitio actual. */
  intro: string;
  /** «Con este diplomado serás capaz de:». `null` = en el sitio actual repite la lista de otro diplomado. */
  goals: string[] | null;
};

/** Textos de https://fundacionderechoyformacion.org/diplomados/ (detalle de cada programa). */
export const COURSES: Course[] = [
  {
    kind: "ped",
    title: "Storytelling aplicado a la educación",
    desc: "Narrativas para conectar con los estudiantes y hacer memorable el contenido.",
    intro:
      "Conecta con tus estudiantes desde la emoción. Aprende a transformar contenidos en relatos que inspiran, enseñan y permanecen en la memoria.",
    goals: [
      "Integrar historias en la estructura de tus cursos de manera efectiva.",
      "Crear un curso completo basado en storytelling, listo para ser implementado.",
      "Comprender qué es el storytelling y su importancia en la educación.",
      "Diseñar historias creativas que conecten con los objetivos educativos.",
      "Aplicar técnicas avanzadas para hacer narrativas atractivas y memorables.",
    ],
  },
  {
    kind: "ped",
    title: "Diseño instruccional: crea experiencias de aprendizaje que dejan huella",
    desc: "Fundamentos para crear cursos virtuales efectivos.",
    intro:
      "Domina los fundamentos del diseño instruccional para crear experiencias de aprendizaje efectivas, estructuradas y alineadas con tus objetivos educativos.",
    goals: [
      "Comprender los fundamentos del diseño instruccional en entornos virtuales.",
      "Analizar objetivos y competencias para estructurar experiencias de aprendizaje efectivas.",
      "Diseñar secuencias didácticas alineadas con modelos pedagógicos.",
      "Aplicar metodologías y herramientas digitales en la creación de cursos.",
      "Evaluar la eficacia de materiales y estrategias instruccionales.",
    ],
  },
  {
    kind: "tec",
    title: "Innova en el aula con H5P",
    desc: "Recursos digitales interactivos y accesibles con H5P.",
    intro:
      "Crea recursos digitales interactivos y accesibles con H5P, potenciando la participación, la autonomía y el aprendizaje activo en entornos virtuales.",
    goals: [
      "Conocer las principales funcionalidades de H5P para la creación de contenidos interactivos.",
      "Diseñar actividades digitales dinámicas integradas en plataformas LMS.",
      "Crear recursos educativos multimedia accesibles y atractivos.",
      "Fomentar el aprendizaje activo mediante la interactividad y la autoevaluación.",
      "Implementar estrategias didácticas innovadoras en entornos virtuales.",
    ],
  },
  {
    kind: "ped",
    title: "Diseña para impactar: Design Thinking para docentes",
    desc: "Pensamiento de diseño para resolver necesidades reales del aula.",
    intro:
      "Aplica el Design Thinking en educación para diseñar soluciones creativas, empáticas e innovadoras centradas en las necesidades reales de tus estudiantes.",
    goals: [
      "Comprender el enfoque del Design Thinking aplicado a la educación.",
      "Analizar necesidades reales para diseñar soluciones pedagógicas creativas.",
      "Desarrollar proyectos educativos centrados en el estudiante.",
      "Fomentar la empatía, la innovación y la resolución de problemas.",
      "Implementar estrategias de pensamiento de diseño en el aula.",
    ],
  },
  {
    kind: "tec",
    title: "Canva para educadores",
    desc: "Materiales visuales, presentaciones e infografías para las clases.",
    intro:
      "Domina Canva para crear materiales visuales profesionales y accesibles, mejorando la comunicación y el impacto de tus clases.",
    goals: [
      "Dominar las herramientas básicas y avanzadas de Canva aplicadas a la educación.",
      "Diseñar materiales visuales atractivos y accesibles para tus clases.",
      "Crear presentaciones, infografías y recursos multimedia de alto impacto.",
      "Fomentar la creatividad y el aprendizaje visual en tus estudiantes.",
      "Optimizar tu comunicación educativa con contenidos gráficos profesionales.",
    ],
  },
  {
    kind: "ia",
    title: "Domina el lenguaje de los bots: Prompting para educadores",
    desc: "Redactar prompts para generar recursos y actividades con IA.",
    intro:
      "Aprende a generar prompts efectivos para crear recursos y actividades educativas con IA conversacional, optimizando tus procesos de enseñanza.",
    goals: [
      "Comprender los fundamentos del prompting y su rol en la interacción con IA.",
      "Redactar prompts efectivos para generar contenidos educativos de calidad.",
      "Diseñar secuencias didácticas apoyadas en chatbots y asistentes virtuales.",
      "Aplicar técnicas de prompting para la creación de evaluaciones, guías y actividades.",
      "Optimizar el uso ético y pedagógico de la IA conversacional.",
    ],
  },
  {
    kind: "tec",
    title: "Dale forma a tus ideas: impresión 3D y prototipado",
    desc: "Prototipos educativos con impresión 3D y enfoque STEAM.",
    intro:
      "Aprende a diseñar y crear prototipos educativos con herramientas de impresión 3D, fomentando la innovación, la creatividad y el pensamiento STEAM.",
    goals: null, // el sitio actual repite la lista de «Design Thinking para docentes»
  },
  {
    kind: "ia",
    title: "Genera recursos de aprendizaje con IA",
    desc: "Herramientas de IA para crear contenidos educativos personalizados.",
    intro:
      "Explora herramientas de inteligencia artificial para crear contenidos educativos innovadores, personalizados y alineados con tus objetivos pedagógicos.",
    goals: null, // el sitio actual repite la lista de «Canva para educadores»
  },
  {
    kind: "sst",
    title: "Seguridad y Salud en el Trabajo SST",
    desc: "Prevención de riesgos laborales y cultura de seguridad.",
    intro:
      "Aprende a prevenir riesgos, cuidar la salud laboral y promover una cultura de seguridad en cualquier entorno de trabajo.",
    goals: null, // el sitio actual repite la lista de «Prompting para educadores»
  },
  {
    kind: "tec",
    title: "Programación por Bloques",
    desc: "Juegos, animaciones e historias interactivas con Scratch.",
    intro:
      "Aprende a crear proyectos, juegos y recursos educativos con programación por bloques, fortaleciendo la creatividad y el aprendizaje activo en el aula.",
    goals: [
      "Desarrollar el pensamiento computacional y habilidades de resolución de conflictos mediante estrategias de programación lúdicas e intuitivas.",
      "Aplicar la programación como una herramienta educativa para potenciar la enseñanza de diferentes disciplinas y fortalecer el aprendizaje activo.",
      "Diseñar y programar juegos, animaciones e historias interactivas utilizando Scratch, fomentando la creatividad y el aprendizaje basado en proyectos.",
      "Comprender los fundamentos de la programación por bloques y su aplicación en la enseñanza y el desarrollo de proyectos interactivos.",
      "Personalizar y adaptar proyectos en Scratch para diferentes niveles de complejidad, permitiendo la exploración y el desarrollo de ideas innovadoras.",
    ],
  },
  {
    kind: "tec",
    title: "Principios de la Robótica Educativa",
    desc: "Mecánica, electrónica y programación para proyectos robóticos en clase.",
    intro:
      "Aprende los fundamentos de la robótica educativa y crea proyectos con herramientas de mecánica, electrónica y programación, para dinamizar tus clases y potenciar el aprendizaje activo.",
    goals: [
      "Comprender los principios básicos de la robótica educativa y su papel en la innovación pedagógica.",
      "Aplicar conceptos de mecánica, electrónica y programación en el desarrollo de proyectos robóticos.",
      "Diseñar plataformas robóticas básicas para fortalecer el aprendizaje activo y experimental.",
      "Fomentar el pensamiento computacional y la resolución de problemas en entornos educativos.",
      "Implementar estrategias didácticas basadas en robótica móvil para dinamizar tus clases y potenciar la creatividad.",
    ],
  },
  {
    kind: "ped",
    title: "Palabras que Enseñan: Copywriting en la Educación",
    desc: "Escritura persuasiva para mensajes y materiales de aprendizaje.",
    intro:
      "Aprende a comunicar con propósito aplicando técnicas de copywriting educativo para crear mensajes persuasivos, claros y motivadores en tus recursos de aprendizaje.",
    goals: [
      "Comprender los principios del copywriting educativo y su impacto en la comunicación pedagógica.",
      "Aplicar técnicas de escritura persuasiva para diseñar mensajes claros, atractivos y motivadores.",
      "Redactar textos enfocados en la acción, emoción y comprensión del estudiante.",
      "Crear piezas comunicativas efectivas para entornos virtuales y materiales de aprendizaje.",
      "Fortalecer tu capacidad para conectar con los estudiantes a través del lenguaje.",
    ],
  },
  {
    kind: "ped",
    title: "Metodologías Colaborativas y Creativas para la Educación",
    desc: "Metodologías activas, cocreación y trabajo en equipo.",
    intro:
      "Diseña experiencias educativas innovadoras aplicando metodologías activas y colaborativas que promueven la creatividad, la co-creación y el trabajo en equipo.",
    goals: [
      "Comprender los fundamentos de las metodologías activas y colaborativas en el aula.",
      "Diseñar estrategias de aprendizaje basadas en co-creación, gamificación y trabajo en equipo.",
      "Aplicar herramientas digitales que potencien la participación activa de los estudiantes.",
      "Fomentar la creatividad, la empatía y la resolución conjunta de problemas.",
      "Implementar proyectos educativos innovadores centrados en la colaboración.",
    ],
  },
  {
    kind: "ped",
    title: "Jugamos y Aprendemos: Educación Basada en Juegos",
    desc: "Mecánicas de juego para motivar y desarrollar competencias.",
    intro:
      "Incorpora el aprendizaje basado en juegos (ABJ) en tus clases para fomentar la motivación, la participación activa y el desarrollo de competencias significativas.",
    goals: [
      "Comprender los principios del aprendizaje basado en juegos (ABJ) y su potencial pedagógico.",
      "Diseñar experiencias educativas lúdicas orientadas al desarrollo de competencias.",
      "Aplicar mecánicas de juego para fomentar la motivación y el aprendizaje significativo.",
      "Crear dinámicas de aula centradas en la participación activa y la diversión educativa.",
      "Evaluar el impacto de la gamificación en los resultados de aprendizaje.",
    ],
  },
  {
    kind: "inc",
    title: "Habilidades Digitales para Docentes",
    desc: "Competencias TIC para planificar, desarrollar y evaluar el aprendizaje.",
    intro:
      "Fortalece tus competencias digitales y transforma tu práctica docente integrando tecnologías y recursos TIC en la planificación y evaluación del aprendizaje.",
    goals: [
      "Identificar las competencias digitales docentes clave en la educación actual.",
      "Utilizar herramientas TIC para la planificación, desarrollo y evaluación del aprendizaje.",
      "Integrar tecnologías educativas de forma crítica y pedagógica.",
      "Fomentar la alfabetización digital y la innovación en el aula.",
      "Aplicar buenas prácticas para el trabajo colaborativo y la gestión digital educativa.",
    ],
  },
  {
    kind: "tec",
    title: "Edugamer: Crea Videojuegos Educativos",
    desc: "Videojuegos educativos centrados en competencias.",
    intro:
      "Diseña videojuegos educativos que integren aprendizaje, diversión y creatividad, desarrollando experiencias interactivas centradas en el estudiante.",
    goals: [
      "Comprender la estructura y mecánica de los videojuegos aplicados al aprendizaje.",
      "Diseñar videojuegos educativos enfocados en competencias y objetivos pedagógicos.",
      "Aplicar herramientas digitales accesibles para la creación de juegos interactivos.",
      "Fomentar la motivación y el pensamiento crítico a través del juego.",
      "Integrar videojuegos como estrategia de aprendizaje activo y creativo.",
    ],
  },
  {
    kind: "ia",
    title: "Diseño de un GPT Personalizado en Educación",
    desc: "Un asistente educativo basado en GPT para tutoría y enseñanza.",
    intro:
      "Crea tu propio asistente educativo basado en GPT, configurado para apoyar la enseñanza, la tutoría y la personalización del aprendizaje.",
    goals: [
      "Comprender cómo funcionan los modelos GPT aplicados a la educación.",
      "Configurar un asistente educativo personalizado según tus objetivos pedagógicos.",
      "Diseñar flujos de conversación alineados con competencias y resultados de aprendizaje.",
      "Integrar tu GPT en entornos de enseñanza virtual.",
      "Evaluar su impacto en la personalización del aprendizaje y tutoría digital.",
    ],
  },
  {
    kind: "inc",
    title: "Diseño Universal para el Aprendizaje DUA: Abriendo Puertas para la Inclusión",
    desc: "DUA y accesibilidad digital para una enseñanza inclusiva.",
    intro:
      "Diseña experiencias flexibles e inclusivas aplicando los principios del Diseño Universal para el Aprendizaje (DUA) y la accesibilidad digital.",
    goals: [
      "Comprender los principios del Diseño Universal para el Aprendizaje (DUA).",
      "Identificar barreras y oportunidades para la educación inclusiva.",
      "Diseñar experiencias flexibles que atiendan la diversidad estudiantil.",
      "Aplicar estrategias de accesibilidad y adaptabilidad en contenidos digitales.",
      "Fomentar una enseñanza equitativa e inclusiva centrada en el estudiante.",
    ],
  },
  {
    kind: "ia",
    title: "IA en la educación",
    desc: "Inteligencia artificial en personalización, evaluación e innovación.",
    intro:
      "Explora las aplicaciones de la inteligencia artificial en la educación, potenciando la personalización, la evaluación y la innovación pedagógica.",
    goals: [
      "Comprender los fundamentos y aplicaciones de la inteligencia artificial en la educación.",
      "Identificar oportunidades para la personalización y automatización del aprendizaje.",
      "Aplicar herramientas de IA para el diseño y evaluación educativa.",
      "Desarrollar pensamiento crítico sobre el uso ético y responsable de la IA.",
      "Implementar estrategias pedagógicas apoyadas en IA para innovar la enseñanza.",
    ],
  },
  {
    kind: "ia",
    title: "Ciberciudadanía e Inteligencia Artificial: Formando Educadores Críticos",
    desc: "Mirada ética y crítica sobre la IA y la ciudadanía digital.",
    intro:
      "Desarrolla una mirada ética y crítica sobre la IA y la ciudadanía digital, promoviendo un uso responsable y consciente de la tecnología en el aula.",
    goals: [
      "Comprender los principios de la ciberciudadanía y la ética digital.",
      "Analizar el impacto de la IA en la sociedad y la educación.",
      "Promover el uso responsable, crítico y consciente de las tecnologías emergentes.",
      "Diseñar actividades educativas que fortalezcan la ciudadanía digital.",
      "Fomentar competencias éticas y reflexivas frente a la IA en el aula.",
    ],
  },
  {
    kind: "ped",
    title: "Aprendizaje Basado en Proyectos",
    desc: "Proyectos interdisciplinarios centrados en problemas reales.",
    intro:
      "Diseña experiencias educativas con ABP, integrando la resolución de problemas reales y el trabajo colaborativo en procesos de aprendizaje activo.",
    goals: [
      "Comprender los fundamentos del Aprendizaje Basado en Proyectos (ABP).",
      "Diseñar proyectos interdisciplinarios orientados a la resolución de problemas reales.",
      "Aplicar estrategias activas que promuevan la autonomía y el trabajo colaborativo.",
      "Evaluar competencias mediante evidencias y productos finales.",
      "Implementar el ABP como metodología para el desarrollo integral del estudiante.",
    ],
  },
];

/* ======================= Contáctenos ======================= */
/** Sistema de reservas que usa hoy el sitio (docs/handoff.md). */
export const BOOKING_URL = "https://fundacionderechoyformacion.org/wp-booking-calendar/";
export const CONTACT_PENDING = {
  form: "Envío en línea por habilitar: falta conectar el servicio de recepción de mensajes",
  donations: "Montos y pasarela de pago por definir: el sitio actual no tiene enlace de donación",
  hours: "Horarios por confirmar",
} as const;
