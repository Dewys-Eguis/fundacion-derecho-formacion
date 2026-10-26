import type { Metadata } from "next";
import Link from "next/link";
import { Milestones, Pillars } from "@/components/about/Interactive";
import { PageBanner } from "@/components/layout/PageBanner";
import { CountUp } from "@/components/motion/CountUp";
import { Accent, Eyebrow } from "@/components/ui/typography";
import { ABOUT_LINKS, AREAS, MISSION, PURPOSE, VISION } from "@/content/about";
import { BANNERS } from "@/content/banners";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description: BANNERS.quienesSomos.lead,
  alternates: { canonical: "/quienes-somos/" },
};

const LINK_TONE = {
  azul: { box: "sobre-oscuro bg-azul text-white", sub: "text-sobre-oscuro" },
  bruma: { box: "bg-bruma text-azul", sub: "text-texto-2" },
  durazno: { box: "bg-durazno text-azul", sub: "text-texto-2" },
} as const;

/** Quiénes somos — referencia: PDF aprobado pág. 7 (textos de QuienesSomos.dc.html). */
export default function QuienesSomosPage() {
  return (
    <>
      <PageBanner {...BANNERS.quienesSomos} />

      {/* Propósito */}
      <section
        aria-labelledby="proposito"
        className="contenedor grid gap-4 pt-16 md:pt-26 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-14"
      >
        <Eyebrow className="xl:pt-3.5">
          <span id="proposito">{PURPOSE.label}</span>
        </Eyebrow>
        <p
          data-reveal
          className="text-[28px] leading-[1.15] font-extrabold tracking-[-.025em] md:text-[clamp(2.25rem,1.6rem+1.4vw,2.9rem)]"
        >
          {PURPOSE.before} <Accent>{PURPOSE.accent}</Accent>
          {PURPOSE.after}
        </p>
      </section>

      {/* Misión y Visión 2035 */}
      <section
        id="mision-vision"
        aria-label="Misión y visión"
        className="contenedor grid scroll-mt-28 gap-4 pt-14 md:pt-24 lg:grid-cols-2"
      >
        <article data-reveal className="tarjeta-hover rounded-tarjeta bg-bruma p-7 md:rounded-banda md:p-12">
          <span className="flex size-16 items-center justify-center rounded-[20px] bg-white">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="#1E64C8" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="5" stroke="#F4914D" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="1.5" fill="#0B2A4F" />
            </svg>
          </span>
          <h2 className="mt-7 text-[34px] font-extrabold tracking-[-.02em] md:text-[40px]">Misión</h2>
          <p className="mt-4 text-base leading-[1.7] text-texto-cuerpo md:text-lg">{MISSION}</p>
        </article>
        <article
          data-reveal
          className="sobre-oscuro tarjeta-hover rounded-tarjeta bg-azul p-7 text-white md:rounded-banda md:p-12"
        >
          <span className="flex items-center justify-between">
            <span className="flex size-16 items-center justify-center rounded-[20px] bg-white/10">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"
                  stroke="#FFFFFF"
                  strokeWidth="1.6"
                />
                <circle cx="12" cy="12" r="3" stroke="#F4914D" strokeWidth="1.6" />
              </svg>
            </span>
            <span className="text-[48px] font-extrabold tracking-[-.04em] text-naranja md:text-[56px]">
              <CountUp value={2035} group={false} duration={1.8} />
            </span>
          </span>
          <h2 className="mt-7 text-[34px] font-extrabold tracking-[-.02em] md:text-[40px]">Visión</h2>
          <p className="mt-4 text-base leading-[1.7] text-sobre-oscuro md:text-lg">{VISION}</p>
        </article>
      </section>

      {/* Pilares */}
      <section aria-labelledby="pilares" className="contenedor pt-16 md:pt-26">
        <div className="text-center">
          <Eyebrow>Nuestros pilares</Eyebrow>
          <h2 id="pilares" data-reveal className="mt-3.5 text-[32px] font-extrabold tracking-[-.03em] md:text-5xl">
            Lo que nos <Accent>define</Accent>
          </h2>
        </div>
        <Pillars />
      </section>

      {/* Trayectoria */}
      <section aria-labelledby="hitos" className="banda pt-16 md:pt-26">
        <div className="rounded-tarjeta bg-bruma p-6 md:rounded-banda md:p-16">
          <Eyebrow>Trayectoria</Eyebrow>
          <h2 id="hitos" data-reveal className="mt-3.5 text-[32px] font-extrabold tracking-[-.03em] md:text-5xl">
            Hitos institucionales
          </h2>
          <Milestones />
        </div>
      </section>

      {/* Equipo interdisciplinario */}
      <section
        aria-labelledby="equipo"
        className="contenedor grid items-center gap-10 pt-16 md:pt-26 xl:grid-cols-[minmax(0,1fr)_520px] xl:gap-14"
      >
        <div>
          <Eyebrow>Equipo interdisciplinario</Eyebrow>
          <h2
            id="equipo"
            data-reveal
            className="mt-3.5 text-[30px] leading-[1.08] font-extrabold tracking-[-.03em] md:text-[46px]"
          >
            Profesionales con trayectoria en los ámbitos <Accent>judicial, académico e investigativo.</Accent>
          </h2>
          <ul className="mt-7 flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <li
                key={a}
                data-reveal
                className="rounded-pildora bg-bruma px-4 py-2.5 text-sm font-bold transition-colors duration-300 hover:bg-cielo"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
        <ul className="flex flex-col gap-3">
          {ABOUT_LINKS.map((l) => {
            const t = LINK_TONE[l.tone];
            return (
              <li key={l.title} data-reveal>
                <Link
                  href={l.href}
                  className={`group flex tarjeta-hover items-center justify-between rounded-[26px] p-7 no-underline ${t.box}`}
                >
                  <span>
                    <span className="block text-[22px] font-extrabold">{l.title}</span>
                    <span className={`mt-1 block text-sm ${t.sub}`}>{l.sub}</span>
                  </span>
                  <span
                    aria-hidden
                    className="text-[22px] transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
