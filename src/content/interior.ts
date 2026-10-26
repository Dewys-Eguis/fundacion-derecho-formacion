/**
 * Contenido de las páginas interiores (Staff, Oficinas, Gobierno, Qué hacemos, Diplomados, Contacto).
 * Alcance: páginas y apartados del sitio actual (fundacionderechoyformacion.org).
 * Textos: los de las pantallas del diseño (design/screens/*.dc.html), contrastados con el PDF aprobado.
 * Lo no confirmado va entre [corchetes] y se muestra con <Pending>.
 */
import type { SiteImage } from "./images";
import { ROUTES } from "./routes";

/* ======================= Staff jurídico ======================= */
export type StaffGroup = "dir" | "aca" | "con" | "cons";
export type StaffMember = {
  group: StaffGroup;
  groupLabel: string;
  ini: string;
  name: string;
  role: string;
  bio: string;
  /** Parte de la biografía pendiente de confirmar. */
  bioPending?: string;
};

export const STAFF_FILTERS: { value: "all" | StaffGroup; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "dir", label: "Dirección" },
  { value: "aca", label: "Equipo interdisciplinario" },
  { value: "con", label: "Conciliación" },
  { value: "cons", label: "Consultoría" },
];

export const STAFF: StaffMember[] = [
  {
    group: "dir",
    groupLabel: "Dirección",
    ini: "JA",
    name: "Jesús Enrique Archila Guio",
    role: "CEO y Representante Legal de la Fundación DFTH",
    bio: "Abogado penalista enfocado en la resolución pacífica de conflictos, la política criminal y las ciencias forenses. Docente de derecho penal y doctor en educación; se desempeñó como fiscal. Lideró la obtención del estatus consultivo de la Fundación ante la OEA en 2023.",
  },
  {
    group: "dir",
    groupLabel: "Dirección",
    ini: "LR",
    name: "Leydi Yesenia Ramírez Aristizabal",
    role: "Directora General · Conciliadora y Atención a Víctimas en Derecho (2025)",
    bio: "Abogada conciliadora con experiencia en atención a víctimas, derecho comercial y gerencia de proyectos. Fue directora ejecutiva de la Fundación entre 2023 y 2025 y es coautora de un texto de derecho penal.",
  },
  {
    group: "aca",
    groupLabel: "Equipo interdisciplinario",
    ini: "PM",
    name: "Pedro Octavio Munar Cadena",
    role: "Presidente de la Corte Suprema de Justicia de Colombia (2010)",
    bio: "Magistrado de la Corte Suprema de Justicia entre 2003 y 2011, de la que fue presidente, y magistrado del Consejo Superior de la Judicatura. Árbitro, docente universitario y conferencista internacional.",
  },
  {
    group: "aca",
    groupLabel: "Equipo interdisciplinario",
    ini: "LM",
    name: "Lina María Munar Guevara",
    role: "Jurisdicción Especial para la Paz",
    bio: "Abogada con experiencia editorial e investigativa en derecho y periodismo. En 2019 apoyó a un magistrado de la Sala de Amnistía o Indulto de la JEP en asuntos de justicia transicional.",
  },
  {
    group: "aca",
    groupLabel: "Equipo interdisciplinario",
    ini: "YC",
    name: "Yazmin Cadena Camargo",
    role: "Profesora · Decana encargada de la Facultad de Medicina, Universidad Javeriana (2025)",
    bio: "Médica con formación doctoral en salud global y antropología médica, y formación en salud pública en Israel. Trabaja en promoción de la salud y ha acompañado a familias desplazadas en un proyecto interdisciplinario.",
  },
  {
    group: "aca",
    groupLabel: "Equipo interdisciplinario",
    ini: "AR",
    name: "Ángela Margarita Rey Anaya",
    role: "Profesora · CEO de la Fundación United For Justice",
    bio: "Abogada en derechos humanos con dos maestrías y exdiplomática colombiana que lideró delegaciones ante instancias internacionales de derechos humanos y la Corte Penal Internacional. Fundó y dirige United for Justice, ONG de litigio estratégico para víctimas.",
  },
  {
    group: "con",
    groupLabel: "Conciliación",
    ini: "JR",
    name: "José Ricardo Archila Guio",
    role: "Director del Centro de Conciliación de la Fundación D.F.T.H.",
    bio: "Abogado y conciliador especializado en mecanismos alternativos de solución de conflictos, insolvencia y derechos humanos, con experiencia en litigio laboral, penal, civil y de familia. Fue representante legal de la Fundación.",
  },
  {
    group: "con",
    groupLabel: "Conciliación",
    ini: "KR",
    name: "Kelly Yojara Ramírez Aristizabal",
    role: "Directora Ejecutiva del Centro de Conciliación de la Fundación DFTH",
    bio: "Abogada con experiencia en mecanismos alternativos de justicia. Asesora en derecho civil y comercial y consultora en litigios inmobiliarios.",
  },
  {
    group: "cons",
    groupLabel: "Consultoría y docencia",
    ini: "CM",
    name: "Carlos Gustavo Muñoz Díaz",
    role: "Consultoría y Estudio Legal en Derecho Penal, Lavado de Activos y Extinción de Dominio",
    bio: "Abogado penalista con experiencia en lavado de activos, extinción del derecho de dominio y acciones constitucionales. Especializado en derecho procesal y en derecho penal y ciencias forenses.",
  },
  {
    group: "cons",
    groupLabel: "Consultoría y docencia",
    ini: "WF",
    name: "William Armando Fonseca Flórez",
    role: "Docencia Universitaria y Gerencia de Proyectos · Asesor de la Alta Consejería para la Reintegración",
    bio: "Administrador policial con 18 años en la Policía Nacional, donde alcanzó el grado de Mayor. Trabajó en seguridad privada y durante 14 años asesoró a las agencias presidenciales de reintegración.",
  },
  {
    group: "cons",
    groupLabel: "Consultoría y docencia",
    ini: "JG",
    name: "Juan Miguel González Velasco",
    role: "Docencia Universitaria y Consultor Internacional de Proyectos",
    bio: "Doctor en educación (Universidad Mayor de San Andrés y Universidad de Bremen).",
    bioPending: "Biografía por confirmar: en el sitio actual aparece duplicada con otro perfil",
  },
];

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
    note: "Mapa ilustrativo · integrar mapa interactivo en desarrollo.",
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
  {
    kind: "act",
    title:
      "Insolvencia económica de persona natural no comerciante · Resolución No. 0026 del 16 de enero de 2014 del Centro de Conciliación",
  },
  { kind: "cer", title: "Certificación de cumplimiento de los requisitos (2025)" },
  { kind: "cer", title: "Certificado Representante Legal – Antecedentes judiciales" },
  { kind: "cer", title: "Certificado OEA" },
  { kind: "fin", title: "Estados financieros a diciembre 31 de 2024-2023" },
  { kind: "fin", title: "Informe de gestión a diciembre 31 de 2024" },
  { kind: "tri", title: "RUT" },
];
export const DOCS_INTRO = "Esta sección reúne la información clave sobre nuestra estructura y lineamientos.";
export const DOCS_PENDING = "Enlaces de descarga por cargar: el sitio actual lista los documentos sin archivo adjunto";

/* ======================= Estudio legal ======================= */
export const LEGAL_AREAS = [
  {
    label: "Derecho penal",
    def: "Regula el poder punitivo del Estado: qué conductas son delito, qué penas se aplican y cómo se adelantan los procesos, con garantías para el procesado y para las víctimas.",
    actions: [
      "Denuncia penal",
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
    def: "Rige las relaciones entre personas en materia de estado civil, bienes y familia.",
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
    ],
  },
  {
    label: "Derecho comercial",
    def: "Regula la actividad empresarial, a los comerciantes y las operaciones mercantiles.",
    actions: [
      "Contratos mercantiles",
      "Ejecución de títulos valores",
      "Insolvencia empresarial",
      "Liquidación",
      "Responsabilidad de administradores",
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
    ],
  },
  {
    title: "Representación judicial nacional",
    desc: "Acompañamiento jurídico especializado ante autoridades nacionales.",
    items: [
      "Litigio contencioso administrativo ante juzgados y el Consejo de Estado por daños atribuibles al Estado",
      "Procesos penales complejos con enfoque de derechos humanos y coordinación con la justicia transicional",
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
    ],
    fam: [
      "Alimentos",
      "Regulación de visitas",
      "Custodia",
      "Liquidación y división de bienes",
      "Declaración de unión marital de hecho",
    ],
  },
  services: [
    {
      title: "Conciliación y mediación",
      text: "Solución alternativa de conflictos civiles, de familia y comerciales.",
    },
    {
      title: "Insolvencia de persona natural no comerciante",
      text: "Busca restablecer el equilibrio financiero del deudor y proteger a los acreedores con acuerdos de pago que eviten la liquidación forzosa.",
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
    text: "La JEP investiga, juzga y sanciona conductas vinculadas al conflicto armado, incluidas graves violaciones a los derechos humanos. Su alcance comprende a excombatientes, agentes del Estado y terceros.",
  },
  {
    title: "Enfoque en las víctimas",
    text: "Las víctimas están en el centro de los procesos, con derecho a la verdad, a la reparación integral y a la participación.",
  },
  {
    title: "Sanciones y mecanismos restaurativos",
    text: "El sistema combina justicia restaurativa y retributiva, según el nivel de verdad aportada y la responsabilidad asumida.",
  },
] as const;

export const JEP_MEMBER = {
  ini: "LM",
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
export const COURSES: { kind: CourseKind; title: string; desc: string }[] = [
  {
    kind: "ped",
    title: "Storytelling aplicado a la educación",
    desc: "Narrativas para conectar con los estudiantes y hacer memorable el contenido.",
  },
  {
    kind: "ped",
    title: "Diseño instruccional: crea experiencias de aprendizaje que dejan huella",
    desc: "Fundamentos para crear cursos virtuales efectivos.",
  },
  { kind: "tec", title: "Innova en el aula con H5P", desc: "Recursos digitales interactivos y accesibles con H5P." },
  {
    kind: "ped",
    title: "Diseña para impactar: Design Thinking para docentes",
    desc: "Pensamiento de diseño para resolver necesidades reales del aula.",
  },
  {
    kind: "tec",
    title: "Canva para educadores",
    desc: "Materiales visuales, presentaciones e infografías para las clases.",
  },
  {
    kind: "ia",
    title: "Domina el lenguaje de los bots: Prompting para educadores",
    desc: "Redactar prompts para generar recursos y actividades con IA.",
  },
  {
    kind: "tec",
    title: "Dale forma a tus ideas: impresión 3D y prototipado",
    desc: "Prototipos educativos con impresión 3D y enfoque STEAM.",
  },
  {
    kind: "ia",
    title: "Genera recursos de aprendizaje con IA",
    desc: "Herramientas de IA para crear contenidos educativos personalizados.",
  },
  {
    kind: "sst",
    title: "Seguridad y Salud en el Trabajo SST",
    desc: "Prevención de riesgos laborales y cultura de seguridad.",
  },
  { kind: "tec", title: "Programación por Bloques", desc: "Juegos, animaciones e historias interactivas con Scratch." },
  {
    kind: "tec",
    title: "Principios de la Robótica Educativa",
    desc: "Mecánica, electrónica y programación para proyectos robóticos en clase.",
  },
  {
    kind: "ped",
    title: "Palabras que Enseñan: Copywriting en la Educación",
    desc: "Escritura persuasiva para mensajes y materiales de aprendizaje.",
  },
  {
    kind: "ped",
    title: "Metodologías Colaborativas y Creativas para la Educación",
    desc: "Metodologías activas, cocreación y trabajo en equipo.",
  },
  {
    kind: "ped",
    title: "Jugamos y Aprendemos: Educación Basada en Juegos",
    desc: "Mecánicas de juego para motivar y desarrollar competencias.",
  },
  {
    kind: "inc",
    title: "Habilidades Digitales para Docentes",
    desc: "Competencias TIC para planificar, desarrollar y evaluar el aprendizaje.",
  },
  {
    kind: "tec",
    title: "Edugamer: Crea Videojuegos Educativos",
    desc: "Videojuegos educativos centrados en competencias.",
  },
  {
    kind: "ia",
    title: "Diseño de un GPT Personalizado en Educación",
    desc: "Un asistente educativo basado en GPT para tutoría y enseñanza.",
  },
  {
    kind: "inc",
    title: "Diseño Universal para el Aprendizaje DUA: Abriendo Puertas para la Inclusión",
    desc: "DUA y accesibilidad digital para una enseñanza inclusiva.",
  },
  {
    kind: "ia",
    title: "IA en la educación",
    desc: "Inteligencia artificial en personalización, evaluación e innovación.",
  },
  {
    kind: "ia",
    title: "Ciberciudadanía e Inteligencia Artificial: Formando Educadores Críticos",
    desc: "Mirada ética y crítica sobre la IA y la ciudadanía digital.",
  },
  {
    kind: "ped",
    title: "Aprendizaje Basado en Proyectos",
    desc: "Proyectos interdisciplinarios centrados en problemas reales.",
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
