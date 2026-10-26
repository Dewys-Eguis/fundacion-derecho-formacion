import type { Metadata } from "next";
import { OfficeGallery } from "@/components/interior/OfficeGallery";
import { PageBanner } from "@/components/layout/PageBanner";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/typography";
import { BANNERS } from "@/content/banners";
import { OFFICE, OFFICE_PHOTOS } from "@/content/interior";
import { ROUTES } from "@/content/routes";
import { CTA, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Nuestras oficinas",
  description: BANNERS.oficinas.lead,
  alternates: { canonical: "/nuestras-oficinas/" },
};

/** Mapa ilustrativo de manzanas (PDF pág. 9); el mapa interactivo real queda pendiente. */
function IllustrativeMap() {
  return (
    <div className="relative h-full min-h-80 overflow-hidden rounded-tarjeta bg-bruma md:rounded-banda">
      <svg
        aria-hidden
        viewBox="0 0 800 520"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern id="manzanas" width="64" height="58" patternUnits="userSpaceOnUse">
            <rect x="6" y="6" width="52" height="46" rx="6" fill="#FFFFFF" />
          </pattern>
        </defs>
        <rect width="800" height="520" fill="#EAF2FD" />
        <rect width="800" height="520" fill="url(#manzanas)" />
        <path d="M0 120 C 240 112, 520 132, 800 118" stroke="#FFE1CC" strokeWidth="16" fill="none" />
        <path data-draw="" d="M0 260 L800 228" stroke="#C9DBEF" strokeWidth="18" fill="none" />
        <path data-draw="" d="M455 0 L470 520" stroke="#C9DBEF" strokeWidth="16" fill="none" />
      </svg>
      <div className="absolute top-[30%] left-1/2 flex -translate-x-1/2 flex-col items-center">
        <span className="rounded-xl bg-white px-4 py-2.5 text-[13px] font-extrabold whitespace-nowrap shadow-flotante">
          {OFFICE.map.label}
        </span>
        <svg
          width="30"
          height="38"
          viewBox="0 0 24 30"
          aria-hidden
          className="mt-2 animate-bounce motion-reduce:animate-none"
        >
          <path d="M12 29s9-9.3 9-16.2A9 9 0 0 0 3 12.8C3 19.7 12 29 12 29z" fill="#F4914D" />
          <circle cx="12" cy="12.5" r="3.5" fill="#FFFFFF" />
        </svg>
      </div>
      <p className="absolute inset-x-4 bottom-4 rounded-xl bg-white/95 px-4 py-2.5 text-xs text-texto-cuerpo">
        {OFFICE.map.note} <Pending>{OFFICE.map.pending}</Pending>{" "}
        <a
          href={OFFICE.map.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-accion underline-offset-2 hover:underline"
        >
          Ver en Google Maps
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      </p>
    </div>
  );
}

/** Nuestras oficinas — referencia: PDF aprobado pág. 9. */
export default function OficinasPage() {
  const rows = [
    {
      label: "Dirección",
      value: (
        <>
          {SITE.address.line1}
          <br />
          {SITE.address.line2}
        </>
      ),
      big: true,
    },
    {
      label: "Teléfono",
      value: (
        <a href={SITE.phone.href} className="text-white no-underline hover:underline">
          {SITE.phone.label}
        </a>
      ),
      big: true,
    },
    {
      label: "Correo",
      value: (
        <a href={SITE.email.href} className="break-all text-white no-underline hover:underline">
          {SITE.email.label}
        </a>
      ),
    },
    { label: "Horario", value: <Pending className="font-normal text-sobre-oscuro">{OFFICE.hoursPending}</Pending> },
  ];
  return (
    <>
      <PageBanner {...BANNERS.oficinas} image={OFFICE_PHOTOS[0].image} />

      <section
        aria-label="Datos de contacto y ubicación"
        className="contenedor grid gap-4 pt-12 md:pt-18 lg:grid-cols-[480px_minmax(0,1fr)]"
      >
        <address
          data-reveal
          className="sobre-oscuro flex flex-col rounded-tarjeta bg-azul p-6 text-white not-italic md:rounded-banda md:p-11"
        >
          <dl className="flex flex-col gap-6">
            {rows.map((r) => (
              <div key={r.label}>
                <dt className="text-xs font-extrabold tracking-[.1em] text-naranja uppercase">{r.label}</dt>
                <dd className={`mt-1.5 font-extrabold ${r.big ? "text-xl md:text-[23px]" : "text-base"}`}>{r.value}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink
            href={CTA.agenda.href}
            arrow
            className="mt-9 h-13.5 justify-between px-6 text-[15px] font-extrabold lg:mt-auto"
          >
            {CTA.agenda.label}
          </ButtonLink>
        </address>
        <div data-reveal className="h-full">
          <IllustrativeMap />
        </div>
      </section>

      <OfficeGallery />

      <section aria-labelledby="oea" className="contenedor pt-16 md:pt-24">
        <div className="flex flex-col gap-6 rounded-tarjeta border border-linea p-6 md:flex-row md:items-center md:rounded-banda md:p-9">
          <div
            role="img"
            aria-label="Logo OEA pendiente"
            data-pending=""
            className="flex size-22 shrink-0 items-center justify-center rounded-2xl marcador-foto text-xs font-semibold text-texto-2"
          >
            [{OFFICE.oea.logoPending}]
          </div>
          <div className="flex-1">
            <h2 id="oea" data-reveal className="text-xl font-extrabold tracking-[-.01em] md:text-[26px]">
              {OFFICE.oea.title}
            </h2>
            <p data-reveal className="mt-1.5 text-[15px] text-texto-2">
              {OFFICE.oea.text}
            </p>
          </div>
          <ButtonLink href={ROUTES.gobierno} variant="secondary" className="self-start md:self-auto">
            Ver documentos
          </ButtonLink>
        </div>
      </section>
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
