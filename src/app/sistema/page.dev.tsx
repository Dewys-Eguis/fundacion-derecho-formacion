import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { PageBanner } from "@/components/layout/PageBanner";
import { CountUp } from "@/components/motion/CountUp";
import { Parallax } from "@/components/motion/Parallax";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CourseCard, ProjectCard, ServiceCard, TeamCard } from "@/components/ui/cards";
import { Chip } from "@/components/ui/Chip";
import { PhotoPlaceholder, RenderLabel, Silhouette, TemporaryImageLabel } from "@/components/ui/placeholders";
import { Accent, Eyebrow, Pending } from "@/components/ui/typography";
import { BANNERS } from "@/content/banners";
import { IMAGES } from "@/content/images";
import { ROUTES } from "@/content/routes";
import { AccordionDemo, ArrowsDemo, FiltersDemo, TabsDemo } from "./Demos";

/**
 * Página interna de revisión del sistema visual (fase 1). Reproduce la lámina
 * Sistema.dc.html y muestra cada componente global con textos reales del diseño.
 * No se indexa.
 */
export const metadata: Metadata = {
  title: "Sistema visual",
  robots: { index: false, follow: false },
};

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mt-12 grid gap-6 border-t border-linea pt-10 md:mt-14 md:pt-12 xl:grid-cols-[200px_minmax(0,1fr)] xl:gap-10">
      <h2 className="text-[13px] font-extrabold tracking-widest text-texto-2 uppercase">{label}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

const SWATCHES = [
  ["Azul institucional", "#0B2A4F · textos, bandas", "bg-azul"],
  ["Azul acción", "#1E64C8 · énfasis, enlaces", "bg-accion"],
  ["Cielo", "#EAF3FD · banners", "bg-cielo"],
  ["Bruma", "#F3F8FE · tarjetas", "bg-bruma border border-linea"],
  ["Naranja suave", "#F4914D · botones", "bg-naranja"],
  ["Durazno", "#FFF1E6 · fondos cálidos", "bg-durazno"],
  ["Naranja texto", "#B5531A · rótulos (AA)", "bg-naranja-texto"],
] as const;

// Resto de tokens.json + tonos secundarios presentes en las pantallas.
const TOKENS = [
  ["noche", "#050E1A", "bg-noche"],
  ["azul-mapa", "#5FA3EE", "bg-mapa"],
  ["durazno-claro", "#FFC9A3", "bg-durazno-claro"],
  ["linea", "#DCE6F2", "bg-linea"],
  ["borde-boton", "#C9DBEF", "bg-borde-boton"],
  ["texto-secundario", "#51617A", "bg-texto-2"],
  ["texto-cuerpo", "#34465F", "bg-texto-cuerpo"],
  ["texto-sobre-oscuro", "#C9DAF0", "bg-sobre-oscuro"],
  ["placeholder-foto", "#E9EFF6", "bg-foto"],
  ["silueta", "#C9D6E6", "bg-silueta"],
  ["atenuado*", "#9AAFC8", "bg-atenuado"],
  ["texto-claro*", "#DCE8F7", "bg-texto-claro"],
  ["sello*", "#FFD3B3", "bg-sello"],
  ["pie*", "#BFD2EA", "bg-pie"],
  ["punto-mapa*", "#7DB6F5", "bg-punto"],
  ["marcador*", "#D3E3F5", "bg-ph"],
] as const;

export default function SistemaPage() {
  return (
    <>
      <div className="contenedor pt-12 pb-8 md:pt-20 xl:px-16">
        {/* Cabecera de la lámina */}
        <div className="grid items-end gap-8 border-b border-linea pb-12 xl:grid-cols-[minmax(0,1fr)_520px] xl:gap-16">
          <div data-reveal>
            <Eyebrow>Sistema visual · Propuesta 03</Eyebrow>
            <h1 className="mt-4 text-[clamp(2.75rem,1.6rem+4.6vw,5.25rem)] leading-[.95] font-extrabold tracking-[-.04em]">
              Claro, cercano y <Accent>confiable.</Accent>
            </h1>
          </div>
          <p data-reveal className="text-[17px] leading-[1.65] text-texto-cuerpo">
            Base blanca y azul cielo para transmitir transparencia; azul institucional para la autoridad; naranja suave
            para la calidez humana y las acciones. Una banda azul profundo por página da contraste y foco.
          </p>
        </div>

        <Row label="Logo">
          <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col gap-4.5 overflow-hidden rounded-[26px] bg-bruma p-6 md:p-10">
              <span className="group w-fit max-w-full">
                <span className="hidden md:block">
                  <Logo tone="light" size="lg" />
                </span>
                <span className="md:hidden">
                  <Logo tone="light" size="xs" />
                </span>
              </span>
              <span className="text-[13px] leading-[1.55] text-texto-2">
                Nombre principal «Fundación Derecho y Formación»; «Tejido Humano» como descriptor. Anillos del símbolo
                original en azul acción, naranja y azul institucional.
              </span>
            </div>
            <div className="flex flex-col justify-between gap-6 overflow-hidden rounded-[26px] bg-azul p-6 md:p-10">
              <span className="group hidden w-fit md:block">
                <Logo tone="dark" size="md" />
              </span>
              <span className="group hidden w-fit md:block">
                <Logo tone="dark" size="sm" />
              </span>
              <span className="group w-fit">
                <Logo tone="dark" size="xs" />
              </span>
            </div>
          </div>
          <p className="mt-3 text-[13px] text-texto-2">
            Pase el cursor sobre un logo para ver la microinteracción de los anillos. Logo oficial en vector:{" "}
            <Pending>pendiente de la Fundación</Pending>.
          </p>
        </Row>

        <Row label="Color">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
            {SWATCHES.map(([name, desc, cls]) => (
              <div key={name}>
                <div className={`h-28 rounded-[20px] md:h-35 ${cls}`} />
                <div className="mt-2.5 font-extrabold">{name}</div>
                <div className="text-[13px] text-texto-2">{desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {TOKENS.map(([name, hex, cls]) => (
              <div key={name} className="text-[12px]">
                <div className={`h-12 rounded-xl border border-linea ${cls}`} />
                <div className="mt-1.5 font-bold">{name}</div>
                <div className="text-texto-2">{hex}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[13px] text-texto-2">
            * Tonos usados en las pantallas que no figuran en tokens.json; se registran como tokens secundarios.
          </p>
        </Row>

        <Row label="Tipografía">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="text-[120px] leading-[.9] font-extrabold tracking-[-.04em]">Aa</div>
              <div className="mt-4 text-xl font-extrabold">Plus Jakarta Sans</div>
              <div className="mt-1.5 text-[15px] leading-[1.55] text-texto-2">
                Titulares en 800 con tracking negativo; texto en 400–600. Moderna, legible y cálida.
              </div>
            </div>
            <div>
              <div className="font-serif text-[120px] leading-[.9] text-accion italic">Aa</div>
              <div className="mt-4 text-xl font-extrabold">Instrument Serif itálica</div>
              <div className="mt-1.5 text-[15px] leading-[1.55] text-texto-2">
                Solo para la palabra clave de cada titular: aporta la voz editorial e institucional.
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-8">
            <Sample token="text-hero · 96 px">
              <p className="text-hero">
                De Washington a <Accent>Ciudad Bolívar.</Accent>
              </p>
            </Sample>
            <Sample token="text-h2 · 56 px">
              <p className="text-h2">
                Servicios que fortalecen el <Accent>tejido social.</Accent>
              </p>
            </Sample>
            <Sample token="text-manifiesto · 64 px">
              <p className="text-manifiesto">
                Asesoría legal, conciliación y educación para la paz,{" "}
                <span className="text-atenuado">fortaleciendo el tejido social con</span>{" "}
                <Accent>ética y compromiso.</Accent>
              </p>
            </Sample>
            <Sample token="text-lead · 18–20 px">
              <p className="max-w-150 text-lead text-texto-cuerpo">
                Asesoría, educación e investigación: consultoría jurídica, litigio estratégico, conciliación y educación
                para la paz.
              </p>
            </Sample>
            <Sample token="text-rotulo · 13 px">
              <Eyebrow>Proyectos para la implementación de la paz</Eyebrow>
            </Sample>
          </div>
        </Row>

        <Row label="Botones">
          <div className="flex flex-wrap items-center gap-3.5">
            <ButtonLink href={`${ROUTES.contacto}#agenda`} size="md">
              Agenda tu cita
            </ButtonLink>
            <ButtonLink href={ROUTES.proyectoSolar} variant="dark" size="md" arrow>
              Conocer el proyecto
            </ButtonLink>
            <ButtonLink href={ROUTES.staff} variant="secondary" size="md">
              Staff jurídico
            </ButtonLink>
            <Chip>Proyecto destacado</Chip>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-[26px] bg-noche p-6">
            <ButtonLink href={ROUTES.proyectoSolar} variant="primary" size="xl" arrow>
              Conocer el proyecto
            </ButtonLink>
            <ButtonLink
              href="https://allianceedu.co/wp-content/uploads/2026/04/2.2-PROYECTO-PLANTA-SOLAR-FOTOVOLTAICA-CIUDAD-BOLIVAR-BOGOTA-.pdf"
              variant="light"
              size="xl"
            >
              Descargar documento
            </ButtonLink>
            <ButtonLink href={ROUTES.proyectos} variant="ghost" size="lg">
              Todos los proyectos
            </ButtonLink>
            <Chip variant="contorno" className="text-white">
              Presentación en Washington D.C.
            </Chip>
          </div>
          <p className="mt-3 text-[13px] text-texto-2">
            Tamaños: sm 46 px (encabezado) · md 54 px (secciones) · lg 58 px (bandas) · xl 62 px (hero).
          </p>
        </Row>

        <Row label="Navegación">
          <div className="flex flex-col gap-10">
            <Demo title="Pestañas (role=tab, flechas del teclado)">
              <TabsDemo />
            </Demo>
            <Demo title="Filtros (aria-pressed)">
              <FiltersDemo />
            </Demo>
            <Demo title="Migas de pan">
              <div className="w-fit rounded-2xl bg-azul px-5 py-4">
                <Breadcrumbs current="Quiénes somos" />
              </div>
            </Demo>
            <Demo title="Flechas de galería">
              <ArrowsDemo />
            </Demo>
            <Demo title="Acordeón (Litigio estratégico)">
              <AccordionDemo />
            </Demo>
          </div>
        </Row>

        <Row label="Tarjetas">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ServiceCard
              num="01"
              title="Estudio legal y consultoría"
              desc="Consultoría en procesos penales, civiles, laborales, comerciales, constitucionales y administrativos."
              href={ROUTES.estudioLegal}
            />
            <ServiceCard
              num="03"
              title="Centro de Conciliación"
              desc="Conciliación, mediación e insolvencia. Adscrito al Ministerio de Justicia y del Derecho."
              href={ROUTES.conciliacion}
              dark
            />
            <ServiceCard
              num="02"
              title="Litigio estratégico"
              desc="Litigio internacional en derechos humanos con CECOLI, con sede en Washington D.C."
              href={ROUTES.litigio}
            />
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <ProjectCard
              num="01"
              cat="Educación · Alliance"
              title="Alma Mater en escenarios de convivencia y paz"
              href={ROUTES.proyectos}
              action="Descargar proyecto ↓"
            />
            <ProjectCard
              num="02"
              cat="Desarrollo social"
              title="Rescate de la población vulnerable mediante seguridad alimentaria"
              href={ROUTES.proyectos}
              action="Descargar proyecto ↓"
              tone="cielo"
            />
            <ProjectCard
              num="03"
              cat="Construcción de paz"
              title="Diplomado «Fuerza Pública y Construcción de Paz»"
              href={ROUTES.proyectos}
              action="Descargar proyecto ↓"
              tone="durazno"
            />
          </div>
          <div className="mt-4 grid gap-3.5 rounded-banda bg-durazno p-4 sm:grid-cols-2 md:p-8">
            <CourseCard cat="IA y educación" title="IA en la educación" href={ROUTES.diplomados} />
            <CourseCard cat="Inclusión" title="Diseño Universal para el Aprendizaje" href={ROUTES.diplomados} />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <TeamCard
              name="Jesús Enrique Archila Guio"
              role="CEO y Representante Legal de la Fundación"
              href={ROUTES.staff}
            />
            <TeamCard
              name="Leydi Yesenia Ramírez Aristizabal"
              role="Directora General · Conciliadora y Atención a Víctimas"
              href={ROUTES.staff}
            />
            <TeamCard
              name="Pedro Octavio Munar Cadena"
              role="Presidente de la Corte Suprema de Justicia de Colombia (2010)"
              href={ROUTES.staff}
            />
            <TeamCard
              name="Ángela Margarita Rey Anaya"
              role="Profesora · CEO de la Fundación United For Justice"
              href={ROUTES.staff}
            />
          </div>
          <div className="mt-4 grid gap-3.5 md:grid-cols-3">
            <Card>
              <div className="text-xl font-extrabold">Sitio claro</div>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-texto-cuerpo">
                Las fundaciones e instituciones de referencia usan bases claras: transmiten transparencia, se leen mejor
                y funcionan en proyector y en móvil al sol.
              </p>
            </Card>
            <Card tone="azul">
              <div className="text-xl font-extrabold">Una banda oscura</div>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-sobre-oscuro">
                Reservada para el foco: el proyecto destacado, el mapa Bogotá–Washington y el pie de página.
              </p>
            </Card>
            <Card tone="durazno">
              <div className="text-xl font-extrabold">Naranja con medida</div>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-texto-cuerpo">
                Solo en acciones (Agenda, Donar) y en el sello de proyecto destacado, para que guíe la mirada.
              </p>
            </Card>
          </div>
        </Row>

        <Row label="Marcadores e imágenes">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="group relative h-80 overflow-hidden rounded-banda bg-noche md:h-105">
              <Parallax amount={8}>
                <Image
                  src={IMAGES.ladera.src}
                  width={IMAGES.ladera.width}
                  height={IMAGES.ladera.height}
                  alt={IMAGES.ladera.alt}
                  sizes="(min-width: 1280px) 760px, 100vw"
                  className="h-full w-full zoom-suave object-cover"
                />
              </Parallax>
              <RenderLabel className="absolute top-4 right-4" />
              <RenderLabel short className="absolute bottom-4 left-4" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex h-full min-h-50 items-end justify-center overflow-hidden rounded-tarjeta bg-foto">
                <Silhouette width={140} />
              </div>
              <PhotoPlaceholder slot="Oficina_Fundacion_Tejido_Humano_1" className="min-h-50 rounded-tarjeta" />
              <div className="col-span-2 flex items-center rounded-tarjeta bg-noche p-5">
                <TemporaryImageLabel photo="equipo de la Fundación" />
              </div>
            </div>
          </div>
          <p className="mt-3 text-[13px] text-texto-2">
            Los renders 3D llevan siempre su rótulo. El equipo usa silueta neutra hasta tener fotografías reales; las
            fotos pendientes conservan el nombre del archivo esperado entre corchetes.
          </p>
        </Row>

        <Row label="Cifras animadas">
          <div className="grid grid-cols-2 border-t-2 border-azul lg:grid-cols-4">
            <Stat value={<CountUp value={11.05} decimals={2} />} unit="MWp" text="Capacidad · configuración óptima" />
            <Stat value={<CountUp value={16744} />} text="Módulos bifaciales" />
            <Stat value={<CountUp value={23.1} decimals={1} />} unit="ha" text="Lote en Ciudad Bolívar" />
            <Stat
              value={<CountUp value={21} className="text-naranja-texto" />}
              text="Diplomados virtuales con inscripción y estudio gratuitos."
            />
          </div>
          <p className="mt-3 text-[13px] text-texto-2">
            Solo cifras verificadas (diseño y PDF oficial del proyecto). Formato es-CO; con movimiento reducido se
            muestran directamente.
          </p>
        </Row>

        <Row label="Banner interior">
          <p className="text-[15px] text-texto-2">Componente PageBanner con los datos de «Quiénes somos» (debajo).</p>
        </Row>
      </div>

      <PageBanner {...BANNERS.quienesSomos} />
      <div className="h-16 md:h-28" />
    </>
  );
}

function Sample({ token, children }: { token: string; children: ReactNode }) {
  return (
    <div data-reveal className="grid gap-2 xl:grid-cols-[180px_minmax(0,1fr)] xl:items-baseline">
      <code className="text-xs font-semibold text-texto-2">{token}</code>
      {children}
    </div>
  );
}

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold text-texto-2">{title}</h3>
      {children}
    </div>
  );
}

function Stat({ value, unit, text }: { value: ReactNode; unit?: string; text: string }) {
  return (
    <div className="border-linea py-6 pr-6 even:border-l even:pl-6 lg:border-l lg:pl-7 lg:first:border-l-0 lg:first:pl-0">
      <div className="text-cifra">
        {value}
        {unit && <span className="ml-1 text-[0.3em] tracking-normal">{unit}</span>}
      </div>
      <div className="mt-3 text-[15px] leading-normal text-texto-cuerpo">{text}</div>
    </div>
  );
}
