import type { Metadata } from "next";
import Link from "next/link";
import { PracticeAreas } from "@/components/interior/Selectors";
import { PageBanner } from "@/components/layout/PageBanner";
import { Accent, Eyebrow } from "@/components/ui/typography";
import { BANNERS } from "@/content/banners";
import { ILLUSTRATIVE } from "@/content/images";
import { LEGAL_INTERNATIONAL } from "@/content/interior";

export const metadata: Metadata = {
  title: "Estudio legal y consultoría",
  description: BANNERS.estudioLegal.lead,
  alternates: { canonical: "/estudio-legal-consultoria/" },
};

/** Estudio legal, consultoría y portafolio jurídico — referencia: PDF aprobado pág. 11. */
export default function EstudioLegalPage() {
  return (
    <>
      <PageBanner {...BANNERS.estudioLegal} image={ILLUSTRATIVE.estudioLegal} />

      <section aria-labelledby="portafolio" className="contenedor pt-14 md:pt-22">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Áreas de práctica</Eyebrow>
            <h2
              id="portafolio"
              data-reveal
              className="mt-3 text-[30px] font-extrabold tracking-[-.025em] md:text-[46px]"
            >
              Portafolio <Accent>jurídico</Accent>
            </h2>
          </div>
          <p data-reveal className="max-w-95 text-[15px] leading-[1.6] text-texto-2">
            Seleccione un área para ver las acciones y procesos que acompañamos.
          </p>
        </div>
        <PracticeAreas />
      </section>

      <section aria-labelledby="internacional" className="banda pt-16 md:pt-26">
        <div className="sobre-oscuro rounded-tarjeta bg-azul p-6 text-white md:rounded-banda md:p-16">
          <p className="text-rotulo text-naranja">En alianza con CECOLI · Washington D.C.</p>
          <h2
            id="internacional"
            data-reveal
            className="mt-3 text-[30px] font-extrabold tracking-[-.025em] md:text-[46px]"
          >
            Alcance internacional
          </h2>
          <div className="mt-8 grid gap-4 md:mt-10 lg:grid-cols-2">
            {LEGAL_INTERNATIONAL.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                data-reveal
                className="group rounded-[26px] border border-white/14 bg-white/6 p-6 text-white no-underline transition-colors duration-300 hover:border-white/35 hover:bg-white/10 md:p-8"
              >
                <span className="block text-xl font-extrabold md:text-2xl">{c.title}</span>
                <span className="mt-3 block text-[15px] leading-[1.6] text-sobre-oscuro">{c.text}</span>
                <span className="mt-5 inline-block text-sm font-extrabold text-naranja">
                  Ver más{" "}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
