import type { Metadata } from "next";
import Link from "next/link";
import { EduServices } from "@/components/interior/Selectors";
import { PageBanner } from "@/components/layout/PageBanner";
import { CountUp } from "@/components/motion/CountUp";
import { BANNERS } from "@/content/banners";
import { ILLUSTRATIVE } from "@/content/images";
import { ROUTES } from "@/content/routes";

export const metadata: Metadata = {
  title: "Educación para la paz",
  description: BANNERS.educacion.lead,
  alternates: { canonical: "/educacion-para-la-paz/" },
};

/** Educación para la paz, complejidad y desarrollo social — referencia: PDF aprobado pág. 14. */
export default function EducacionPage() {
  return (
    <>
      <PageBanner {...BANNERS.educacion} image={ILLUSTRATIVE.educacion} />

      <section aria-labelledby="productos" className="contenedor pt-14 md:pt-22">
        <EduServices />
      </section>

      <section aria-label="Diplomados" className="banda pt-16 md:pt-22">
        <Link
          href={ROUTES.diplomados}
          data-reveal
          className="group flex flex-col gap-5 rounded-tarjeta bg-durazno p-6 text-azul no-underline transition-shadow duration-300 hover:shadow-tarjeta md:flex-row md:items-center md:rounded-banda md:p-12"
        >
          <span className="text-[80px] leading-[.85] font-extrabold tracking-[-.06em] md:text-[110px]">
            <CountUp value={21} />
          </span>
          <span className="flex-1">
            <span className="block text-2xl font-extrabold md:text-[32px]">diplomados virtuales gratuitos</span>
            <span className="mt-1.5 block text-[15px] text-texto-cuerpo md:text-base">
              Inscripción y estudio sin costo; solo se paga el certificado.
            </span>
          </span>
          <span className="inline-flex h-13.5 items-center gap-2 self-start rounded-pildora bg-azul px-6 text-[15px] font-bold text-white md:self-auto">
            Ver catálogo
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </section>
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
