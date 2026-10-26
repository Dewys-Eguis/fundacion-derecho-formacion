import type { Metadata } from "next";
import Link from "next/link";
import { ContactPanel } from "@/components/interior/ContactPanel";
import { PageBanner } from "@/components/layout/PageBanner";
import { BANNERS } from "@/content/banners";
import { CONCILIATION } from "@/content/interior";
import { ROUTES } from "@/content/routes";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Contáctenos",
  description: BANNERS.contacto.lead,
  alternates: { canonical: "/contactenos/" },
};

const card =
  "group block rounded-[22px] p-5 no-underline transition-transform duration-300 hover:-translate-y-0.5 md:p-6";

/** Contáctenos · Agenda · Donaciones — referencia: PDF aprobado pág. 17. */
export default function ContactoPage() {
  return (
    <>
      <PageBanner {...BANNERS.contacto} />

      <section
        aria-label="Canales de contacto"
        className="contenedor grid gap-4 pt-12 md:pt-18 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-5"
      >
        <ul className="flex flex-col gap-3">
          <li data-reveal>
            <a href={SITE.phone.href} className={`${card} bg-bruma text-azul`}>
              <span className="block text-xs font-extrabold tracking-[.1em] text-accion uppercase">Teléfono</span>
              <span className="mt-1.5 block text-2xl font-extrabold">{SITE.phone.label}</span>
            </a>
          </li>
          <li data-reveal>
            <a href={SITE.email.href} className={`${card} bg-bruma text-azul`}>
              <span className="block text-xs font-extrabold tracking-[.1em] text-accion uppercase">Correo</span>
              <span className="mt-1.5 block text-[15px] font-extrabold break-all">{SITE.email.label}</span>
            </a>
          </li>
          <li data-reveal>
            <Link href={ROUTES.oficinas} className={`${card} bg-bruma text-azul`}>
              <span className="block text-xs font-extrabold tracking-[.1em] text-accion uppercase">Dirección</span>
              <span className="mt-1.5 block text-lg font-extrabold">{SITE.address.mobile}</span>
            </Link>
          </li>
          <li data-reveal>
            <a href={CONCILIATION.email.href} className={`${card} bg-durazno text-azul`}>
              <span className="block text-xs font-extrabold tracking-[.1em] text-naranja-texto uppercase">
                Centro de Conciliación
              </span>
              <span className="mt-1.5 block font-extrabold break-all">{CONCILIATION.email.value}</span>
            </a>
          </li>
        </ul>
        <div data-reveal>
          <ContactPanel />
        </div>
      </section>
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
