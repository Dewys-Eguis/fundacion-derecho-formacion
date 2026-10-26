import type { Metadata } from "next";
import Link from "next/link";
import { JepTopics } from "@/components/interior/Selectors";
import { PageBanner } from "@/components/layout/PageBanner";
import { BANNERS } from "@/content/banners";
import { ILLUSTRATIVE } from "@/content/images";
import { JEP_MEMBER } from "@/content/interior";
import { ROUTES } from "@/content/routes";

export const metadata: Metadata = {
  title: "Justicia especial para la paz",
  description: BANNERS.justiciaPaz.lead,
  alternates: { canonical: "/justicia-para-la-paz/" },
};

/** Justicia especial para la paz — referencia: PDF aprobado pág. 15. */
export default function JusticiaPazPage() {
  return (
    <>
      <PageBanner {...BANNERS.justiciaPaz} image={ILLUSTRATIVE.justiciaPaz} />

      <section aria-label="Temas de justicia transicional" className="contenedor pt-12 md:pt-18">
        <JepTopics />
      </section>

      <section aria-label="Equipo" className="contenedor pt-4">
        <Link
          href={ROUTES.staff}
          data-reveal
          className="group flex tarjeta-hover flex-col gap-5 rounded-tarjeta border border-linea p-5 text-azul no-underline sm:flex-row sm:items-center md:p-7"
        >
          <span className="relative flex size-20 shrink-0 items-center justify-center rounded-pildora marcador-foto">
            <span aria-hidden className="text-2xl font-extrabold text-accion">
              {JEP_MEMBER.ini}
            </span>
            <span className="sr-only">Fotografía pendiente</span>
          </span>
          <span className="flex-1">
            <span className="block text-[11px] font-extrabold tracking-[.08em] text-naranja-texto uppercase">
              {JEP_MEMBER.label}
            </span>
            <span className="mt-1 block text-xl font-extrabold">{JEP_MEMBER.name}</span>
            <span className="mt-1 block text-[15px] text-texto-2">{JEP_MEMBER.text}</span>
          </span>
          <span className="text-sm font-extrabold text-accion">
            Ver staff{" "}
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </section>
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
