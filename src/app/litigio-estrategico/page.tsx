import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Accent, Eyebrow } from "@/components/ui/typography";
import { BANNERS } from "@/content/banners";
import { ILLUSTRATIVE } from "@/content/images";
import { CECOLI, LITIGATION_LINES } from "@/content/interior";
import { ROUTES } from "@/content/routes";

export const metadata: Metadata = {
  title: "Litigio estratégico",
  description: BANNERS.litigio.lead,
  alternates: { canonical: "/litigio-estrategico/" },
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

/** Litigio estratégico en derechos humanos — referencia: PDF aprobado pág. 12. */
export default function LitigioPage() {
  return (
    <>
      <PageBanner {...BANNERS.litigio} image={ILLUSTRATIVE.litigio} />

      <section aria-label="Aliado internacional" className="contenedor pt-12 md:pt-18">
        <div
          data-reveal
          className="sobre-oscuro flex flex-col gap-5 rounded-tarjeta bg-azul p-6 text-white md:flex-row md:items-center md:rounded-banda md:px-10 md:py-8"
        >
          <span
            aria-hidden
            className="flex size-16 shrink-0 items-center justify-center rounded-[18px] bg-naranja text-sm font-extrabold text-azul"
          >
            DC
          </span>
          <span className="flex-1">
            <span className="block text-xl leading-tight font-extrabold md:text-2xl">{CECOLI.name}</span>
            <span className="mt-1 block text-[15px] text-sobre-oscuro">{CECOLI.sub}</span>
          </span>
          <ButtonLink href={ROUTES.contacto} variant="light" className="self-start md:self-auto">
            Consultar un caso
          </ButtonLink>
        </div>
      </section>

      <section
        aria-labelledby="lineas"
        className="contenedor grid gap-8 pt-14 md:pt-20 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14"
      >
        <div>
          <Eyebrow>Líneas de trabajo</Eyebrow>
          <h2
            id="lineas"
            data-reveal
            className="mt-3 text-[30px] leading-[1.05] font-extrabold tracking-[-.025em] md:text-[44px]"
          >
            Seis frentes de <Accent>defensa.</Accent>
          </h2>
        </div>
        <Accordion
          items={LITIGATION_LINES.map((l, i) => ({
            id: ROMAN[i],
            num: ROMAN[i],
            title: l.title,
            content: (
              <>
                <p className="text-[15px] leading-[1.6] text-texto-cuerpo md:text-base">{l.desc}</p>
                <ul className="mt-4 grid gap-2 md:grid-cols-2">
                  {l.items.map((it) => (
                    <li key={it} className="rounded-[14px] bg-white px-4 py-3.5 text-sm leading-[1.45] font-semibold">
                      {it}
                    </li>
                  ))}
                </ul>
              </>
            ),
          }))}
        />
      </section>
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
