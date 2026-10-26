import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/motion/CountUp";
import { Parallax } from "@/components/motion/Parallax";
import { ScrubText } from "@/components/motion/ScrubText";
import { ButtonLink } from "@/components/ui/Button";
import { CourseCard, ProjectRow, ServiceCard, TeamCard } from "@/components/ui/cards";
import { Chip } from "@/components/ui/Chip";
import { Accent, Eyebrow } from "@/components/ui/typography";
import {
  ALLIES,
  CLOSING,
  COURSES_HOME,
  FEATURED_PROJECT,
  MANIFIESTO_STATS,
  PROJECTS,
  PROJECT_KPIS,
  QUICK_LINKS,
  SERVICES,
  STAFF_HOME,
  TRUST,
} from "@/content/home";
import { ILLUSTRATIVE, type SiteImage } from "@/content/images";
import { ROUTES } from "@/content/routes";
import { CTA } from "@/content/site";
import { IdentityTabs } from "./IdentityTabs";

/*
 * Secciones de la Home según el PDF aprobado (pág. 1 escritorio · pág. 4 móvil).
 * Regla: toda la información de escritorio está también en móvil, reorganizada.
 */

/* ---------- Iconos de accesos rápidos (trazos lineales del PDF) ---------- */
function QuickIcon({ name }: { name: (typeof QUICK_LINKS)[number]["icon"] }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;
  switch (name) {
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15" rx="3" stroke="#0B2A4F" strokeWidth="1.7" />
          <path d="M3.5 10h17M8 3v4M16 3v4" stroke="#0B2A4F" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "rings":
      return (
        <svg {...common}>
          <circle cx="9.5" cy="12" r="5.5" stroke="#1E64C8" strokeWidth="1.8" />
          <circle cx="14.5" cy="12" r="5.5" stroke="#F4914D" strokeWidth="1.8" />
        </svg>
      );
    case "cap":
      return (
        <svg {...common}>
          <path d="M2.5 9.5L12 5l9.5 4.5L12 14 2.5 9.5z" stroke="#1E64C8" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M6.5 11.5V16c1.5 1.3 3.3 2 5.5 2s4-.7 5.5-2v-4.5" stroke="#F4914D" strokeWidth="1.7" />
        </svg>
      );
    case "scales":
      return (
        <svg {...common}>
          <path d="M12 4v16M7 20h10M5 7h14" stroke="#1E64C8" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M5 7l-2.5 6h5L5 7zM19 7l-2.5 6h5L19 7z" stroke="#1E64C8" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
  }
}

/* ======================= Bajo el hero ======================= */

/** Cifras del proyecto (fichas de la Home móvil, PDF pág. 4). */
export function MobileKpis() {
  return (
    <section aria-label="Cifras del proyecto solar" className="grid grid-cols-3 gap-2 px-3 pt-3.5 md:hidden">
      {PROJECT_KPIS.map((k) => (
        <div key={k.label} className="rounded-[18px] bg-bruma px-2 py-3.5 text-center">
          <div className="text-xl font-extrabold">
            <CountUp value={k.value} decimals={k.decimals} />
            {"unit" in k && ` ${k.unit}`}
          </div>
          <div className="text-[11px] font-semibold text-texto-2">{k.label}</div>
        </div>
      ))}
    </section>
  );
}

/** Accesos rápidos: 4 tarjetas con icono (escritorio) · 2 × 2 (móvil). */
export function QuickLinks() {
  return (
    <nav aria-label="Accesos rápidos" className="contenedor pt-3.5 max-md:px-3 md:pt-6">
      <ul className="grid grid-cols-2 gap-2 md:gap-4 xl:grid-cols-4">
        {QUICK_LINKS.map((q, i) => {
          const primary = i === 0;
          return (
            <li key={q.title} data-reveal className="grid">
              <Link
                href={q.href}
                className={`group flex tarjeta-hover flex-col gap-1 rounded-[20px] p-4 text-azul no-underline md:min-h-25 md:flex-row md:items-center md:gap-4 md:rounded-3xl md:px-6 ${
                  primary ? "bg-naranja" : "bg-bruma"
                }`}
              >
                <span
                  className={`mb-2 hidden size-13 shrink-0 items-center justify-center rounded-[14px] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 md:mb-0 md:flex ${
                    primary ? "bg-white/40" : "bg-white"
                  }`}
                >
                  <QuickIcon name={q.icon} />
                </span>
                <span className="block">
                  <span className="block text-[15px] leading-tight font-extrabold md:text-lg">{q.title}</span>
                  <span
                    className={`mt-0.5 block text-xs leading-snug md:text-[13px] ${primary ? "text-azul" : "text-texto-2"}`}
                  >
                    {q.sub}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Franja de confianza institucional en contenedor con borde. */
export function Trust() {
  return (
    <section aria-label="Respaldo institucional" className="contenedor pt-6 max-md:px-3 md:pt-10">
      <ul className="grid gap-5 rounded-tarjeta border border-linea/80 bg-white px-5 py-6 sm:grid-cols-2 md:px-8 md:py-7 xl:grid-cols-4">
        {TRUST.map((t) => (
          <li key={t.title} data-reveal className="flex items-center gap-3.5">
            <span
              aria-hidden
              className={`size-2.5 shrink-0 rounded-pildora ${t.dot === "naranja" ? "bg-naranja" : "bg-accion"}`}
            />
            <span className="text-sm leading-[1.4]">
              <b>{t.title}</b>
              <br />
              <span className="text-texto-2">{t.sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ======================= Quiénes somos ======================= */

/** Imagen de la composición: ocupa el marco y respeta el encuadre definido en el registro. */
function CompositionPhoto({ image, sizes }: { image: SiteImage; sizes: string }) {
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      sizes={sizes}
      className="h-full w-full object-cover"
      style={{ objectPosition: image.pos }}
    />
  );
}

/** Composición de dos imágenes ilustrativas superpuestas + tarjeta «Visión 2035». */
function PhotoComposition() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-138 xl:mx-0"
      aria-label="Imágenes ilustrativas"
      role="group"
    >
      <div className="absolute top-0 left-0 h-[87%] w-[72.5%] overflow-hidden rounded-tarjeta bg-ph">
        <Parallax amount={3}>
          <CompositionPhoto image={ILLUSTRATIVE.vision1} sizes="(min-width: 1280px) 400px, 72vw" />
        </Parallax>
      </div>
      <div className="absolute right-0 bottom-0 h-[55.8%] w-[52.2%] overflow-hidden rounded-[30px] border-8 border-white bg-white">
        <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-ph">
          <Parallax amount={6}>
            <CompositionPhoto image={ILLUSTRATIVE.vision2} sizes="(min-width: 1280px) 290px, 52vw" />
          </Parallax>
        </div>
      </div>
      <div
        data-reveal
        className="absolute top-[7.4%] left-[54.3%] rounded-[18px] bg-azul px-5 py-4 text-white shadow-[0_24px_48px_rgba(11,42,79,.22)] md:px-5 md:py-4.5"
      >
        <span className="block text-xs font-extrabold tracking-[.08em] text-naranja uppercase md:text-[13px]">
          Visión
        </span>
        <span className="block text-[28px] leading-none font-extrabold tracking-[-.02em] md:text-4xl">2035</span>
      </div>
    </div>
  );
}

export function AboutUs() {
  return (
    <section
      aria-labelledby="quienes"
      className="contenedor grid items-center gap-10 pt-16 md:pt-28 xl:grid-cols-[minmax(0,600px)_minmax(0,1fr)] xl:gap-8 xl:pt-30"
    >
      <PhotoComposition />
      <div>
        <Eyebrow>Quiénes somos</Eyebrow>
        <h2
          id="quienes"
          data-reveal
          className="mt-3 text-[30px] leading-[1.1] font-extrabold tracking-[-.025em] md:mt-4 md:text-[clamp(2.25rem,1.5rem+1.6vw,2.95rem)] md:leading-[1.08] md:tracking-[-.03em]"
        >
          Una organización de carácter legal, orientada a la <Accent>educación y la consultoría jurídica</Accent>{" "}
          especializada.
        </h2>
        <IdentityTabs />
        <div data-reveal className="mt-8 flex flex-wrap gap-3 md:mt-12">
          <ButtonLink href={ROUTES.quienesSomos} variant="dark" arrow className="h-13.5 px-6 md:h-14">
            Conózcanos
          </ButtonLink>
          <ButtonLink href={ROUTES.staff} variant="secondary" className="h-13.5 px-6 md:h-14">
            Staff jurídico
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ======================= Manifiesto ======================= */

export function Manifesto() {
  return (
    <section aria-labelledby="manifiesto" className="contenedor pt-16 md:pt-28">
      <Eyebrow>
        <span id="manifiesto">Fundación Derecho y Formación · Tejido Humano</span>
      </Eyebrow>
      <ScrubText
        className="mt-4 max-w-310 text-[28px] leading-[1.12] font-extrabold tracking-[-.03em] md:mt-5.5 md:text-manifiesto"
        segments={[
          { text: "Asesoría legal, conciliación y educación para la paz," },
          { text: "fortaleciendo el tejido social con", className: "text-atenuado" },
          { text: "ética y compromiso.", className: "font-serif font-normal tracking-[-.02em] text-accion italic" },
        ]}
      />
      <div className="mt-10 grid grid-cols-2 border-t-2 border-azul md:mt-14 xl:grid-cols-4">
        {MANIFIESTO_STATS.map((s, i) => (
          <div
            key={s.value}
            data-reveal
            className={`pt-6 pr-4 md:pt-7 md:pr-7 ${i % 2 === 1 ? "border-l border-linea pl-4 md:pl-7" : ""} ${
              i === 2 ? "xl:border-l xl:border-linea xl:pl-7" : ""
            } ${i >= 2 ? "max-xl:mt-6" : ""}`}
          >
            <div
              className={`text-[44px] leading-none font-extrabold tracking-[-.05em] md:text-cifra ${
                s.tone === "naranja" ? "text-naranja-texto" : s.tone === "accion" ? "text-accion" : ""
              }`}
            >
              {s.value === "21" ? <CountUp value={21} /> : s.value}
            </div>
            <div className="mt-3 text-sm leading-normal text-texto-cuerpo md:text-[15px]">{s.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ======================= Qué hacemos ======================= */

export function Services() {
  return (
    <section aria-labelledby="servicios" className="contenedor pt-16 md:pt-28 xl:pt-32">
      <div className="flex flex-col justify-between gap-4 md:gap-6 lg:flex-row lg:items-end">
        <div>
          <Eyebrow>Qué hacemos</Eyebrow>
          <h2
            id="servicios"
            data-reveal
            className="mt-3 text-[30px] leading-[1.05] font-extrabold tracking-[-.03em] md:mt-4 md:text-h2"
          >
            Servicios que fortalecen
            <br />
            el <Accent>tejido social.</Accent>
          </h2>
        </div>
        <p data-reveal className="max-w-105 text-[15px] leading-[1.6] text-texto-2 md:text-base">
          Asesoría, educación e investigación: consultoría jurídica, litigio estratégico, conciliación y educación para
          la paz.
        </p>
      </div>

      {/* Escritorio y tableta: tarjetas (la 3.ª en azul, como en el diseño) */}
      <div className="mt-12 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
        {SERVICES.map((s, i) => (
          <div key={s.title} data-reveal className="grid">
            <ServiceCard num={`0${i + 1}`} title={s.title} desc={s.desc} href={s.href} dark={i === 2} />
          </div>
        ))}
      </div>

      {/* Móvil: lista del PDF pág. 4, con la descripción completa */}
      <ul className="mt-5 flex flex-col gap-2 md:hidden">
        {SERVICES.map((s, i) => (
          <li key={s.title}>
            <Link
              href={s.href}
              className={`group flex items-start gap-3.5 rounded-[20px] p-4.5 no-underline active:scale-[.98] ${
                i === 2 ? "sobre-oscuro bg-azul text-white" : "bg-bruma text-azul"
              }`}
            >
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-[13px] font-extrabold text-naranja ${
                  i === 2 ? "bg-white/10" : "bg-white"
                }`}
              >
                0{i + 1}
              </span>
              <span className="flex-1">
                <span className="block text-base leading-[1.25] font-extrabold">{s.title}</span>
                <span
                  className={`mt-1 block text-[13px] leading-[1.45] ${i === 2 ? "text-sobre-oscuro" : "text-texto-2"}`}
                >
                  {s.desc}
                </span>
              </span>
              <span aria-hidden className="pt-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ======================= Proyectos ======================= */

export function Projects() {
  const p = FEATURED_PROJECT;
  return (
    <section aria-labelledby="proyectos" className="contenedor pt-16 md:pt-28">
      <div className="flex flex-col justify-between gap-4 md:gap-6 lg:flex-row lg:items-end">
        <div>
          <Eyebrow>Proyectos para la implementación de la paz</Eyebrow>
          <h2
            id="proyectos"
            data-reveal
            className="mt-3 text-[30px] leading-[1.05] font-extrabold tracking-[-.03em] md:mt-4 md:text-h2"
          >
            Proyectos que <Accent>transforman.</Accent>
          </h2>
        </div>
        <ButtonLink href={ROUTES.proyectos} variant="secondary" arrow className="self-start lg:self-auto">
          Todos los proyectos
        </ButtonLink>
      </div>
      <div className="mt-8 grid gap-4 md:mt-12 xl:grid-cols-[1.35fr_1fr]">
        <Link
          href={p.href}
          data-reveal
          className="group sobre-oscuro relative block h-105 tarjeta-hover overflow-hidden rounded-tarjeta bg-azul text-white no-underline md:h-130 md:rounded-banda xl:h-155"
        >
          {/* Imagen ilustrativa (generada con IA): su carácter consta en el texto alternativo. */}
          <Image
            src={p.image.src}
            width={p.image.width}
            height={p.image.height}
            alt={p.image.alt}
            sizes="(min-width: 1280px) 780px, 100vw"
            className="absolute inset-0 h-full w-full zoom-suave object-cover"
            style={{ objectPosition: p.image.pos }}
          />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(180deg,rgba(11,42,79,0),rgba(11,42,79,.9))]"
          />
          <Chip size="sm" className="absolute top-5 left-5 px-3.5 py-2 text-xs tracking-[.06em] md:top-6 md:left-6">
            {p.tag}
          </Chip>
          <span className="absolute right-6 bottom-6 left-6 md:right-8 md:bottom-8 md:left-8">
            <span className="block text-2xl leading-[1.1] font-extrabold tracking-[-.02em] md:text-[36px]">
              {p.title}
            </span>
            <span className="mt-3 block max-w-175 text-sm leading-[1.55] text-texto-tarjeta md:text-[15px]">
              {p.desc}
            </span>
          </span>
        </Link>
        <div className="grid gap-4 xl:grid-rows-3">
          {PROJECTS.map((pr) => (
            <div key={pr.title} data-reveal className="grid">
              <ProjectRow
                cat={pr.cat}
                title={pr.title}
                href={pr.pdf}
                action="Descargar proyecto ↓"
                image={"image" in pr ? pr.image : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================= Staff ======================= */

export function Staff() {
  return (
    <section aria-labelledby="staff" className="pt-16 md:pt-28">
      <div className="contenedor flex flex-col justify-between gap-4 md:gap-6 lg:flex-row lg:items-end">
        <div>
          <Eyebrow>Staff jurídico</Eyebrow>
          <h2
            id="staff"
            data-reveal
            className="mt-3 max-w-200 text-[30px] leading-[1.05] font-extrabold tracking-[-.03em] md:mt-4 md:text-h2"
          >
            Trayectoria judicial, académica e <Accent>investigativa.</Accent>
          </h2>
        </div>
        <ButtonLink href={ROUTES.staff} variant="dark" className="self-start lg:self-auto">
          Conózcalos
        </ButtonLink>
      </div>
      {/* Móvil: carrusel táctil con ajuste; tableta: 2 columnas; escritorio: 4. */}
      <ul className="contenedor mt-8 flex snap-x snap-mandatory scroll-px-5 [scrollbar-width:none] gap-3 overflow-x-auto pb-3 md:mt-12 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:pb-0 xl:grid-cols-4">
        {STAFF_HOME.map((m) => (
          <li key={m.name} data-reveal className="grid w-[78%] max-w-75 shrink-0 snap-start md:w-auto md:max-w-none">
            <TeamCard name={m.name} role={m.role} href={ROUTES.staff} initials={m.ini} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ======================= Diplomados ======================= */

export function Diplomados() {
  return (
    <section aria-labelledby="diplomados" className="banda pt-16 md:pt-28">
      <div className="grid items-center gap-8 rounded-tarjeta bg-durazno p-6 md:gap-12 md:rounded-banda md:p-10 xl:grid-cols-[420px_minmax(0,1fr)] xl:p-16">
        <div>
          <Eyebrow>Diplomados virtuales gratis</Eyebrow>
          <div className="mt-3 text-[96px] leading-[.85] font-extrabold tracking-[-.06em] md:mt-4 md:text-[140px]">
            <CountUp value={21} />
          </div>
          <h2 id="diplomados" className="mt-3 text-[28px] leading-[1.1] font-extrabold tracking-[-.02em] md:text-4xl">
            diplomados para educadores.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-texto-cuerpo md:text-base">
            La inscripción y el estudio son gratuitos; solo se paga el certificado.
          </p>
          <ButtonLink href={ROUTES.diplomados} variant="dark" arrow className="mt-7">
            Ver catálogo
          </ButtonLink>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:gap-3.5">
          {COURSES_HOME.map((c) => (
            <div key={c.title} data-reveal className="grid">
              <CourseCard cat={c.cat} title={c.title} href={ROUTES.diplomados} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================= Aliados ======================= */

export function Allies() {
  return (
    <section aria-labelledby="aliados" className="contenedor pt-16 text-center md:pt-28">
      <Eyebrow>Nuestros aliados</Eyebrow>
      <h2
        id="aliados"
        data-reveal
        className="mt-3 text-[28px] leading-tight font-extrabold tracking-[-.02em] md:mt-3.5 md:text-[41px]"
      >
        Instituciones que tejen con nosotros
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:gap-3.5 xl:grid-cols-4">
        {ALLIES.map((a) => (
          <li
            key={a}
            data-reveal
            className="flex min-h-24 items-center justify-center rounded-tarjeta-sm border border-linea px-3 py-4 text-sm font-extrabold transition-[border-color,background-color] duration-300 hover:border-borde-boton hover:bg-bruma md:h-35.5 md:px-4 md:text-[16.5px]"
          >
            {a}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ======================= Cierre ======================= */

export function Closing() {
  return (
    <section aria-labelledby="cierre" className="banda pt-16 md:pt-28">
      <div className="relative overflow-hidden rounded-tarjeta bg-cielo px-6 py-10 md:rounded-banda md:px-16 md:py-0 xl:h-71.5">
        {/* Círculo durazno y línea naranja del PDF (decoración con movimiento ambiental suave) */}
        <span
          aria-hidden
          data-float="8"
          className="absolute -top-24 -right-16 size-52 rounded-pildora bg-durazno-suave md:-top-26 md:right-0 md:size-77.5"
        />
        <svg
          aria-hidden
          viewBox="0 0 1408 285"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          fill="none"
        >
          <path
            data-draw=""
            d="M0 254 C 180 228, 420 236, 640 256 S 1000 220, 1080 168 S 1300 128, 1408 152"
            stroke="#F4914D"
            strokeWidth="1.6"
          />
        </svg>
        <div className="relative flex h-full flex-col justify-center gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2
              id="cierre"
              data-reveal
              className="text-[30px] leading-[1.05] font-extrabold tracking-[-.03em] md:text-[48px] md:tracking-[-.035em]"
            >
              {CLOSING.t1}
              <br />
              <Accent>{CLOSING.t2}</Accent>
            </h2>
            <p data-reveal className="mt-4 text-[15px] text-texto-cuerpo md:text-[17.5px]">
              {CLOSING.sub}
            </p>
          </div>
          <div data-reveal className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href={CTA.agenda.href} className="h-14 px-7 text-base font-extrabold md:h-15">
              {CTA.agenda.label}
            </ButtonLink>
            <ButtonLink href={CTA.donar.href} variant="dark" className="h-14 px-7 text-base font-extrabold md:h-15">
              {CTA.donar.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
