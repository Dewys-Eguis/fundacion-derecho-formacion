import Image from "next/image";
import { AmericasMap } from "@/components/home/AmericasMap";
import { ButtonLink } from "@/components/ui/Button";
import { Accent, Eyebrow, Pending } from "@/components/ui/typography";
import { IMAGES } from "@/content/images";
import { ROUTES } from "@/content/routes";
import {
  SOLAR_CONNECTION,
  SOLAR_DOCS,
  SOLAR_IMPACT,
  SOLAR_LOCATION,
  SOLAR_SUMMARY,
  SOLAR_TECH,
  SOLAR_WASHINGTON,
} from "@/content/solar";
import { TechConfigurator } from "./TechConfigurator";

/* Secciones de la página del proyecto (PDF pág. 2 escritorio · pág. 5 móvil). */

const h2 =
  "mt-3 text-[30px] leading-[1.05] font-extrabold tracking-[-.03em] md:mt-4 md:text-[clamp(2.5rem,1.7rem+1.8vw,3.25rem)] md:leading-[1.04]";

/* ---------- Resumen y objetivos ---------- */
export function Summary() {
  return (
    <section
      id="resumen"
      className="contenedor grid scroll-mt-40 gap-10 pt-16 md:pt-24 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] xl:gap-16 xl:pt-26"
    >
      <div>
        <Eyebrow>Resumen del proyecto</Eyebrow>
        <p
          data-reveal
          className="mt-4 text-[22px] leading-[1.3] font-bold tracking-[-.015em] md:mt-4.5 md:text-[clamp(1.75rem,1.2rem+1.1vw,2.125rem)]"
        >
          {SOLAR_SUMMARY.lead} <Accent>{SOLAR_SUMMARY.accent}</Accent>
        </p>
        <figure data-reveal className="group relative mt-8 h-60 overflow-hidden rounded-tarjeta md:mt-9 md:h-85">
          <Image
            src={IMAGES.panelesSitioActual.src}
            width={IMAGES.panelesSitioActual.width}
            height={IMAGES.panelesSitioActual.height}
            alt="Paneles solares fotovoltaicos (imagen del sitio actual)"
            sizes="(min-width: 1280px) 680px, 100vw"
            className="h-full w-full zoom-suave object-cover"
          />
          <figcaption
            data-pending=""
            className="absolute right-4 bottom-4 left-4 w-fit rounded-[10px] bg-white/92 px-3 py-2 text-xs font-semibold text-texto-cuerpo"
          >
            {SOLAR_SUMMARY.photoNote}
          </figcaption>
        </figure>
      </div>
      <div className="flex flex-col gap-3.5 xl:pt-8.5">
        <Eyebrow tone="gris">Objetivos</Eyebrow>
        <ol className="flex flex-col gap-3.5">
          {SOLAR_SUMMARY.objectives.map((o, i) => (
            <li key={o} data-reveal className="flex tarjeta-hover gap-4.5 rounded-[26px] bg-bruma p-5 md:p-7">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-white font-extrabold text-naranja">
                0{i + 1}
              </span>
              <span className="text-base leading-[1.45] font-semibold md:text-lg">{o}</span>
            </li>
          ))}
        </ol>
        <div data-reveal className="sobre-oscuro mt-2.5 rounded-[26px] bg-azul px-6 py-6 text-white md:px-7">
          <div className="text-xs font-extrabold tracking-widest text-naranja uppercase">
            {SOLAR_SUMMARY.promoter.label}
          </div>
          <div className="mt-2 text-lg leading-[1.3] font-extrabold">{SOLAR_SUMMARY.promoter.name}</div>
          <div className="mt-2 text-sm leading-[1.55] text-sobre-oscuro">{SOLAR_SUMMARY.promoter.desc}</div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Ubicación ---------- */
function LotScheme() {
  return (
    <div data-reveal className="relative h-90 overflow-hidden rounded-tarjeta bg-white md:h-155">
      <svg
        role="img"
        aria-label="Esquema ilustrativo del lote con filas de seguidores solares"
        viewBox="0 0 800 620"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <pattern id="lote-trk" width="34" height="18" patternUnits="userSpaceOnUse">
            <rect x="2" y="5" width="30" height="8" rx="2" fill="#1B4F8F" />
          </pattern>
          <pattern id="lote-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#DCE6F2" />
          </pattern>
        </defs>
        <rect width="800" height="620" fill="url(#lote-grid)" />
        <path d="M120 140 L560 90 L690 260 L640 500 L260 540 L90 380 Z" fill="#E4F1DA" />
        <path
          data-draw=""
          d="M120 140 L560 90 L690 260 L640 500 L260 540 L90 380 Z"
          fill="none"
          stroke="#7FB46A"
          strokeWidth="2"
        />
        <path
          className="lote-filas"
          d="M150 165 L545 120 L660 268 L615 478 L272 512 L118 372 Z"
          fill="url(#lote-trk)"
        />
        <rect x="560" y="520" width="70" height="44" rx="8" fill="#F4914D" />
        <path d="M595 520 V 490" stroke="#F4914D" strokeWidth="3" strokeDasharray="5 5" />
        <g transform="translate(720 80)">
          <circle r="26" fill="#FFFFFF" stroke="#DCE6F2" />
          <path d="M0 -18 L6 0 L0 -4 L-6 0Z" fill="#0B2A4F" />
          <text
            y="16"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill="#0B2A4F"
            fontFamily="var(--font-jakarta)"
          >
            N
          </text>
        </g>
      </svg>
      <div className="absolute top-4 left-4 rounded-[14px] bg-azul px-4 py-3 text-white md:top-6 md:left-6">
        <div className="text-2xl font-extrabold">23,1 ha</div>
        <div className="text-xs text-sobre-oscuro">Lote del proyecto</div>
      </div>
      <div className="absolute right-4 bottom-14 max-w-[70%] rounded-xl border border-linea bg-white px-3.5 py-2.5 text-xs font-bold shadow-[0_10px_20px_rgba(11,42,79,.08)] md:right-6 md:bottom-22.5">
        {SOLAR_LOCATION.substation}
      </div>
      <p className="absolute bottom-4 left-4 text-xs text-texto-2 md:bottom-5 md:left-6">
        {SOLAR_LOCATION.note} <Pending>{SOLAR_LOCATION.pendingNote}</Pending>
      </p>
    </div>
  );
}

export function Location() {
  return (
    <section id="ubicacion" className="banda scroll-mt-40 pt-16 md:pt-28">
      <div className="grid items-center gap-10 rounded-tarjeta bg-bruma p-5.5 md:rounded-banda md:p-12 xl:grid-cols-[460px_minmax(0,1fr)] xl:gap-14 xl:p-16">
        <div>
          <Eyebrow>Ubicación</Eyebrow>
          <h2 data-reveal className={h2}>
            Ciudad Bolívar, <Accent>Bogotá D.C.</Accent>
          </h2>
          <p data-reveal className="mt-4.5 text-base leading-[1.6] text-texto-cuerpo md:text-[17px]">
            {SOLAR_LOCATION.lead}
          </p>
          <ul className="mt-5.5 flex flex-col gap-2.5">
            {SOLAR_LOCATION.advantages.map((a) => (
              <li
                key={a}
                data-reveal
                className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-[15px] font-semibold"
              >
                <span className="flex size-6.5 shrink-0 items-center justify-center rounded-pildora bg-durazno-suave text-naranja-texto">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>
        <LotScheme />
      </div>
    </section>
  );
}

/* ---------- Tecnología ---------- */
export function Technology() {
  return (
    <section id="tecnologia" className="contenedor scroll-mt-40 pt-16 md:pt-28">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <Eyebrow>Tecnología · Configuraciones evaluadas</Eyebrow>
          <h2 data-reveal className={h2}>
            Cuatro alternativas, <Accent>una óptima.</Accent>
          </h2>
        </div>
        <p data-reveal className="max-w-100 text-[15px] leading-[1.6] text-texto-2">
          {SOLAR_TECH.intro}
        </p>
      </div>
      <TechConfigurator />
    </section>
  );
}

/* ---------- Conexión ---------- */
const FLOW_TONE = {
  bruma: { box: "bg-bruma text-azul", tag: "text-accion", desc: "text-texto-2" },
  durazno: { box: "bg-durazno text-azul", tag: "text-naranja-texto", desc: "text-texto-2" },
  azul: { box: "sobre-oscuro bg-azul text-white", tag: "text-naranja", desc: "text-sobre-oscuro" },
} as const;

function FlowArrow() {
  return (
    <span aria-hidden className="flex justify-center py-2 xl:py-0">
      <svg width="24" height="36" viewBox="0 0 24 36" fill="none" className="xl:hidden">
        <path data-draw="" d="M12 2v28M5 23l7 8 7-8" stroke="#F4914D" strokeWidth="2.5" />
      </svg>
      <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="hidden xl:block">
        <path data-draw="" d="M4 12h48M44 5l8 7-8 7" stroke="#F4914D" strokeWidth="2.5" />
      </svg>
    </span>
  );
}

export function Connection() {
  return (
    <section id="conexion" className="contenedor scroll-mt-40 pt-16 md:pt-28">
      <Eyebrow>Conexión a la red</Eyebrow>
      <h2 data-reveal className={`${h2} max-w-225`}>
        Generación distribuida, <Accent>conexión directa.</Accent>
      </h2>
      <ol className="mt-8 grid items-center md:mt-12 xl:grid-cols-[1fr_60px_1fr_60px_1fr]">
        {SOLAR_CONNECTION.flow.map((f, i) => {
          const t = FLOW_TONE[f.tone];
          return (
            <li key={f.title} className="contents">
              {i > 0 && <FlowArrow />}
              <div data-reveal className={`tarjeta-hover rounded-tarjeta p-6 md:min-h-55 md:p-8 ${t.box}`}>
                <div className={`text-xs font-extrabold tracking-[.08em] uppercase ${t.tag}`}>{f.tag}</div>
                <div className="mt-3 text-[22px] leading-tight font-extrabold md:text-[26px]">{f.title}</div>
                <div className={`mt-2 text-[15px] leading-normal ${t.desc}`}>{f.desc}</div>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div data-reveal className="rounded-[26px] border-[1.5px] border-naranja p-6 md:p-7">
          <div className="text-xl font-extrabold">{SOLAR_CONNECTION.enel.title}</div>
          <div className="mt-2 text-[15px] leading-[1.55] text-texto-cuerpo">{SOLAR_CONNECTION.enel.desc}</div>
        </div>
        {SOLAR_CONNECTION.terms.map((t) => (
          <div key={t.code} data-reveal className="tarjeta-hover rounded-[26px] bg-bruma p-6 md:p-7">
            <div className="text-3xl font-extrabold text-accion">{t.code}</div>
            <div className="mt-1.5 text-sm leading-normal text-texto-cuerpo">{t.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Impacto social ---------- */
function ImpactIcon({ name }: { name: (typeof SOLAR_IMPACT)[number]["icon"] }) {
  const p = { width: 40, height: 40, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;
  if (name === "people")
    return (
      <svg {...p}>
        <circle cx="9" cy="8" r="3.5" stroke="#1E64C8" strokeWidth="1.6" />
        <circle cx="17" cy="9" r="2.5" stroke="#F4914D" strokeWidth="1.6" />
        <path
          d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5M15 14.5c2.6 0 4.6 1.7 5.3 4.5"
          stroke="#1E64C8"
          strokeWidth="1.6"
        />
      </svg>
    );
  if (name === "work")
    return (
      <svg {...p}>
        <rect x="3" y="7" width="18" height="13" rx="2.5" stroke="#1E64C8" strokeWidth="1.6" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" stroke="#F4914D" strokeWidth="1.6" />
      </svg>
    );
  return (
    <svg {...p}>
      <path d="M3 20h18M6 16v-4M11 16V8M16 16v-6M20 5l-5 5-4-3-6 5" stroke="#1E64C8" strokeWidth="1.6" />
    </svg>
  );
}

export function Impact() {
  return (
    <section id="impacto" className="banda scroll-mt-40 pt-16 md:pt-28">
      <div className="relative isolate overflow-hidden rounded-tarjeta bg-durazno px-5.5 py-10 md:rounded-banda md:px-16 md:py-18">
        <span
          aria-hidden
          data-float="8"
          className="absolute -top-30 -right-30 -z-10 size-100 rounded-pildora bg-white/60 md:-top-20 md:-right-10 md:size-100"
        />
        <svg
          aria-hidden
          viewBox="0 0 1408 560"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
          fill="none"
        >
          <path
            data-draw=""
            d="M-20 500 C 300 420, 600 560, 900 460 S 1300 360, 1430 400"
            stroke="#F4914D"
            strokeWidth="2"
          />
        </svg>
        <Eyebrow>Impacto social</Eyebrow>
        <h2
          data-reveal
          className="mt-3 max-w-235 text-[30px] leading-[1.05] font-extrabold tracking-[-.03em] md:mt-4 md:text-[clamp(2.5rem,1.6rem+2vw,3.4rem)]"
        >
          Un proyecto de carácter social para la población vulnerable de <Accent>Ciudad Bolívar.</Accent>
        </h2>
        <ul className="mt-8 grid gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
          {SOLAR_IMPACT.map((it) => (
            <li key={it.title} data-reveal className="group tarjeta-hover rounded-[26px] bg-white p-6 md:p-8">
              <span className="block w-fit transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                <ImpactIcon name={it.icon} />
              </span>
              <div className="mt-4.5 text-xl font-extrabold md:text-[22px]">{it.title}</div>
              <div className="mt-2 text-[15px] leading-[1.55] text-texto-2">{it.desc}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Proyección internacional ---------- */
export function Washington() {
  return (
    <section aria-labelledby="washington" className="banda pt-16 md:pt-28">
      <div className="sobre-oscuro relative overflow-hidden rounded-tarjeta bg-azul text-white md:rounded-banda xl:h-175">
        <div className="grid gap-4 px-5.5 pt-8 md:px-12 md:pt-16 xl:block xl:h-full xl:p-0">
          <div className="xl:absolute xl:top-18 xl:left-16 xl:w-165">
            <span className="inline-flex rounded-pildora bg-white/12 px-3.5 py-2 text-xs font-extrabold tracking-[.06em] uppercase">
              {SOLAR_WASHINGTON.chip}
            </span>
            <h2
              id="washington"
              data-reveal
              className="mt-5 text-[32px] leading-[1.04] font-extrabold tracking-[-.03em] md:text-[clamp(2.5rem,1.7rem+1.8vw,3.25rem)]"
            >
              De Washington a <br className="hidden md:block" />
              <Accent tone="claro">Ciudad Bolívar.</Accent>
            </h2>
            <p data-reveal className="mt-5 text-[15px] leading-[1.65] text-sobre-oscuro md:text-[17px]">
              {SOLAR_WASHINGTON.body}
            </p>
            <div data-reveal className="mt-8 rounded-[20px] border border-white/14 bg-white/8 p-5.5">
              <div className="text-xs font-extrabold tracking-[.08em] text-naranja uppercase">
                {SOLAR_WASHINGTON.presentationLabel}
              </div>
              <div className="mt-2 text-base font-bold md:text-lg">
                {SOLAR_WASHINGTON.presentation} <Pending>{SOLAR_WASHINGTON.presentationPending}</Pending>
              </div>
            </div>
          </div>
          <div className="relative hidden aspect-[592/677] w-full xl:absolute xl:top-0 xl:right-20 xl:block xl:w-140">
            <AmericasMap id="mapa-solar" />
          </div>
          <div className="relative mx-auto -mb-1 aspect-square w-full max-w-80 md:max-w-110 xl:hidden">
            <AmericasMap id="mapa-solar-movil" variant="mobile" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Documentos ---------- */
export function Documents() {
  return (
    <section
      id="documentos"
      className="contenedor grid scroll-mt-40 gap-8 pt-16 md:pt-28 xl:grid-cols-[420px_minmax(0,1fr)] xl:gap-14"
    >
      <div>
        <Eyebrow>Documentos</Eyebrow>
        <h2
          data-reveal
          className="mt-3 text-[30px] leading-[1.06] font-extrabold tracking-[-.03em] md:mt-4 md:text-[46px]"
        >
          Toda la información, <Accent>disponible.</Accent>
        </h2>
        <p data-reveal className="mt-4 text-base leading-[1.6] text-texto-2">
          {SOLAR_DOCS.lead}
        </p>
      </div>
      <ul className="flex flex-col gap-3">
        <li data-reveal>
          <a
            href={SOLAR_DOCS.main.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group sobre-oscuro flex tarjeta-hover items-center gap-4 rounded-[22px] bg-azul p-5 text-white no-underline md:gap-5 md:px-7 md:py-6"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-naranja text-[13px] font-extrabold text-azul">
              PDF
            </span>
            <span className="flex-1">
              <span className="block text-base leading-tight font-extrabold md:text-[19px]">
                {SOLAR_DOCS.main.title}
              </span>
              <span className="mt-1 block text-[13px] text-sobre-oscuro">{SOLAR_DOCS.main.sub}</span>
            </span>
            <span className="hidden shrink-0 text-sm font-bold transition-transform duration-300 group-hover:translate-y-0.5 sm:block">
              Descargar ↓
            </span>
            <span className="sr-only"> (PDF, se abre en una pestaña nueva)</span>
          </a>
        </li>
        {SOLAR_DOCS.pending.map((d) => (
          <li
            key={d.title}
            data-reveal
            className="flex items-center gap-4 rounded-[22px] bg-bruma p-5 md:gap-5 md:px-7 md:py-6"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[13px] font-extrabold text-accion">
              {d.badge}
            </span>
            <span className="flex-1">
              <span className="block text-base font-extrabold md:text-[19px]">{d.title}</span>
              <span className="mt-1 block text-[13px] text-texto-2">
                Enlazado en el sitio actual · <Pending>enlace por confirmar</Pending>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- CTA ---------- */
export function SolarCta() {
  return (
    <section aria-labelledby="solar-cta" className="banda pt-16 md:pt-28">
      <div className="flex flex-col justify-between gap-7 rounded-tarjeta bg-cielo px-6 py-10 md:rounded-banda md:p-16 lg:flex-row lg:items-center">
        <h2
          id="solar-cta"
          data-reveal
          className="text-[30px] leading-[1.08] font-extrabold tracking-[-.03em] md:text-[44px]"
        >
          ¿Desea apoyar o conocer
          <br />
          más del <Accent>proyecto?</Accent>
        </h2>
        <div data-reveal className="flex flex-wrap gap-3">
          <ButtonLink href={ROUTES.contacto} className="h-15 px-7.5 text-base font-extrabold">
            Contactar a la Fundación
          </ButtonLink>
          <ButtonLink href={ROUTES.proyectos} variant="dark" className="h-15 px-7.5 text-base">
            Otros proyectos
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
