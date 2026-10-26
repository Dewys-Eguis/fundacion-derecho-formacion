import type { Metadata } from "next";
import Link from "next/link";
import { Matters } from "@/components/interior/Selectors";
import { PageBanner } from "@/components/layout/PageBanner";
import { Accent, Eyebrow, Pending } from "@/components/ui/typography";
import { BANNERS } from "@/content/banners";
import { ILLUSTRATIVE } from "@/content/images";
import { CONCILIATION } from "@/content/interior";
import { CTA } from "@/content/site";

export const metadata: Metadata = {
  title: "Centro de Conciliación",
  description: BANNERS.conciliacion.lead,
  alternates: { canonical: "/centro-de-conciliacion/" },
};

/** Centro de Conciliación — referencia: PDF aprobado pág. 13. */
export default function ConciliacionPage() {
  const c = CONCILIATION;
  return (
    <>
      <PageBanner {...BANNERS.conciliacion} image={ILLUSTRATIVE.conciliacion} />

      <section aria-label="Datos del Centro" className="contenedor grid gap-3 pt-12 md:grid-cols-3 md:gap-4 md:pt-18">
        <div data-reveal className="sobre-oscuro rounded-[26px] bg-azul p-6 text-white md:p-7">
          <p className="text-xs font-extrabold tracking-[.1em] text-naranja uppercase">{c.resolution.label}</p>
          <p className="mt-2 text-xl font-extrabold">{c.resolution.value}</p>
          <p className="mt-1 text-[13px] text-sobre-oscuro">{c.resolution.sub}</p>
        </div>
        <div data-reveal className="rounded-[26px] bg-bruma p-6 md:p-7">
          <p className="text-xs font-extrabold tracking-[.1em] text-accion uppercase">{c.email.label}</p>
          <a
            href={c.email.href}
            className="mt-2 block text-lg font-extrabold break-all text-azul no-underline hover:underline"
          >
            {c.email.value}
          </a>
        </div>
        <Link
          href={CTA.agenda.href}
          data-reveal
          className="group flex flex-col justify-between rounded-[26px] bg-naranja p-6 text-azul no-underline transition-transform duration-300 hover:-translate-y-1 md:p-7"
        >
          <span className="text-xs font-extrabold tracking-[.1em] uppercase">Atención</span>
          <span className="mt-4 text-2xl font-extrabold">
            {CTA.agenda.label}{" "}
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </section>

      <section aria-labelledby="que-es" className="contenedor grid gap-8 pt-16 md:pt-22 lg:grid-cols-2 lg:gap-12">
        <div>
          <Eyebrow>¿Qué es la conciliación?</Eyebrow>
          <h2
            id="que-es"
            data-reveal
            className="mt-3 text-[30px] leading-[1.05] font-extrabold tracking-[-.025em] md:text-[44px]"
          >
            Un acuerdo con el diálogo como <Accent>punto de partida.</Accent>
          </h2>
          <p data-reveal className="mt-5 text-[15px] leading-[1.65] text-texto-cuerpo md:text-base">
            {c.what}
          </p>
          <p
            data-reveal
            className="mt-5 rounded-r-2xl border-l-4 border-naranja bg-durazno px-5 py-4 text-[15px] leading-[1.6] font-semibold"
          >
            {c.callout}
          </p>
        </div>
        <ul className="grid content-start gap-3 sm:grid-cols-2">
          {c.advantages.map((a, i) => (
            <li key={a} data-reveal className="tarjeta-hover rounded-[22px] bg-bruma p-5">
              <span className="block text-2xl font-extrabold text-naranja">0{i + 1}</span>
              <span className="mt-1.5 block text-base font-extrabold">{a}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="asuntos" className="banda pt-16 md:pt-22">
        <div className="rounded-tarjeta bg-bruma p-6 md:rounded-banda md:p-12">
          <Matters />
        </div>
      </section>

      <section aria-labelledby="servicios-centro" className="contenedor pt-16 md:pt-22">
        <h2 id="servicios-centro" data-reveal className="text-[30px] font-extrabold tracking-[-.025em] md:text-[44px]">
          Servicios del Centro
        </h2>
        <ul className="mt-8 grid gap-3 md:mt-10 md:grid-cols-3 md:gap-4">
          {c.services.map((s, i) => (
            <li key={s.title} data-reveal className="tarjeta-hover rounded-[26px] border border-linea p-6 md:p-7">
              <span className="text-xs font-extrabold text-naranja-texto">0{i + 1}</span>
              <h3 className="mt-2 text-xl leading-tight font-extrabold">{s.title}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.55] text-texto-2">
                {s.text} {"pending" in s && <Pending>{s.pending}</Pending>}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
