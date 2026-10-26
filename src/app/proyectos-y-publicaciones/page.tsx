import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageBanner } from "@/components/layout/PageBanner";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Pending } from "@/components/ui/typography";
import { BANNERS } from "@/content/banners";
import { IllustrativeLabel } from "@/components/ui/placeholders";
import { ILLUSTRATIVE } from "@/content/images";
import { FEATURED, PUBLICATIONS } from "@/content/projects";
import { ROUTES } from "@/content/routes";

export const metadata: Metadata = {
  title: "Proyectos y publicaciones",
  description: BANNERS.proyectos.lead,
  alternates: { canonical: "/proyectos-y-publicaciones/" },
};

/** Proyectos y publicaciones — referencia: PDF aprobado pág. 3. */
export default function ProyectosPage() {
  return (
    <>
      <PageBanner {...BANNERS.proyectos} image={ILLUSTRATIVE.proyectos} />

      {/* Proyecto destacado */}
      <section aria-label="Proyecto destacado" className="contenedor pt-12 md:pt-18">
        <Link
          href={FEATURED.href}
          data-reveal
          className="group sobre-oscuro grid tarjeta-hover overflow-hidden rounded-tarjeta bg-azul text-white no-underline md:rounded-banda lg:grid-cols-[1.1fr_1fr]"
        >
          <span className="relative block h-60 overflow-hidden md:h-80 lg:h-115">
            <Image
              src={ILLUSTRATIVE.solar.src}
              width={ILLUSTRATIVE.solar.width}
              height={ILLUSTRATIVE.solar.height}
              alt={ILLUSTRATIVE.solar.alt}
              sizes="(min-width: 1024px) 740px, 100vw"
              className="h-full w-full zoom-suave object-cover"
              style={{ objectPosition: ILLUSTRATIVE.solar.pos }}
            />
            <IllustrativeLabel className="absolute bottom-4 left-4" />
          </span>
          <span className="flex flex-col justify-center gap-4.5 p-6 md:p-12">
            <span className="self-start rounded-pildora bg-naranja px-3.5 py-2 text-[11px] font-extrabold tracking-[.06em] text-azul uppercase md:text-xs">
              {FEATURED.chip}
            </span>
            <span className="text-[28px] leading-[1.08] font-extrabold tracking-[-.02em] md:text-[38px]">
              {FEATURED.title}
            </span>
            <span className="text-[15px] leading-[1.6] text-sobre-oscuro md:text-base">{FEATURED.desc}</span>
            <span className="mt-1 inline-flex h-13.5 items-center gap-2 self-start rounded-pildora bg-white px-6 text-[15px] font-extrabold text-azul transition-colors duration-300 group-hover:bg-durazno">
              {FEATURED.cta}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </span>
        </Link>
      </section>

      <ProjectsList />

      {/* Publicaciones */}
      <section aria-labelledby="publicaciones" className="contenedor pt-16 md:pt-24">
        <div className="flex flex-col justify-between gap-6 rounded-tarjeta bg-bruma p-6 md:rounded-banda md:p-12 lg:flex-row lg:items-center lg:gap-10">
          <div>
            <Eyebrow>{PUBLICATIONS.eyebrow}</Eyebrow>
            <h2
              id="publicaciones"
              data-reveal
              className="mt-3 text-[26px] leading-tight font-extrabold tracking-[-.02em] md:text-4xl"
            >
              {PUBLICATIONS.title}
            </h2>
            <p data-reveal className="mt-3 max-w-160 text-[15px] leading-[1.6] text-texto-2 md:text-base">
              {PUBLICATIONS.text} <Pending>{PUBLICATIONS.pending}</Pending>
            </p>
          </div>
          <ButtonLink href={ROUTES.contacto} variant="dark" className="shrink-0 self-start lg:self-auto">
            {PUBLICATIONS.cta}
          </ButtonLink>
        </div>
      </section>
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
