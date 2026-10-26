import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/motion/CountUp";
import { ButtonLink } from "@/components/ui/Button";
import { DownloadIcon } from "@/components/ui/icons";
import { ILLUSTRATIVE } from "@/content/images";
import { PDF_PLANTA_SOLAR, SOLAR_HERO, SOLAR_KPIS } from "@/content/solar";
import { SOLAR_SCENE_SVG, SOLAR_SCENE_VIEWBOX } from "@/content/solar-illustration";

/**
 * Hero del proyecto (PDF pág. 2 escritorio · pág. 5 móvil).
 * Escritorio/tableta: banda con la ilustración aprobada (cielo, sol, colinas, paneles),
 * título azul con «San Francisco» en serif y barra blanca de 5 cifras.
 * Móvil: tarjeta con la foto de paneles del sitio actual, texto blanco y cifras debajo.
 */
export function SolarHero() {
  const crumbs = (
    <nav aria-label="Ruta de navegación">
      <ol className="flex flex-wrap items-center gap-x-2.5 text-[13px] font-semibold">
        {SOLAR_HERO.crumbs.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2.5">
            {i > 0 && <span aria-hidden>/</span>}
            {"href" in c ? (
              <Link href={c.href} className="no-underline hover:underline max-md:text-white md:text-accion">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );

  return (
    <section className="banda pt-3 md:pt-4" aria-label="Planta solar fotovoltaica San Francisco">
      {/* ---------- Tableta y escritorio ---------- */}
      <div className="relative isolate hidden overflow-hidden rounded-banda bg-cielo md:block md:h-205">
        <svg
          aria-hidden
          viewBox={SOLAR_SCENE_VIEWBOX}
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 -z-10 h-full w-full"
          dangerouslySetInnerHTML={{ __html: SOLAR_SCENE_SVG }}
        />
        <div className="px-12 pt-14 text-texto-cuerpo xl:px-16">
          <div data-reveal>{crumbs}</div>
          <div data-reveal className="mt-7 flex flex-wrap gap-2">
            <span className="rounded-pildora bg-naranja px-3.5 py-2 text-xs font-extrabold tracking-[.06em] text-azul uppercase">
              {SOLAR_HERO.chips[0]}
            </span>
            <span className="rounded-pildora bg-white px-3.5 py-2 text-xs font-bold text-azul">
              {SOLAR_HERO.chips[1]}
            </span>
          </div>
          <h1
            data-reveal
            className="mt-6 max-w-160 text-[clamp(3.5rem,2rem+3.4vw,5.125rem)] leading-[.96] font-extrabold tracking-[-.04em] text-azul"
          >
            {SOLAR_HERO.t1}{" "}
            <em className="font-serif font-normal tracking-[-.02em] text-accion italic">{SOLAR_HERO.t2}</em>
          </h1>
          <p data-reveal className="mt-6 max-w-150 text-lg leading-[1.55] xl:text-[19px]">
            {SOLAR_HERO.lead}
          </p>
          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={PDF_PLANTA_SOLAR} variant="dark" size="lg" icon={<DownloadIcon />}>
              Descargar proyecto
            </ButtonLink>
            <ButtonLink href="#tecnologia" variant="light" size="lg" className="before:bg-bruma">
              Ver ficha técnica
            </ButtonLink>
          </div>
        </div>
        <ul
          aria-label="Cifras del proyecto"
          className="absolute inset-x-8 bottom-8 grid grid-cols-3 gap-y-5 rounded-[26px] bg-white/95 px-8 py-6.5 shadow-tarjeta backdrop-blur-sm xl:grid-cols-5"
        >
          {SOLAR_KPIS.map((k, i) => (
            <li
              key={k.label}
              className={`${i % 3 !== 0 ? "border-l border-linea pl-5" : ""} xl:pl-5 xl:first:pl-0 ${i > 0 ? "xl:border-l xl:border-linea" : ""}`}
            >
              <div
                className={`text-[32px] font-extrabold tracking-[-.03em] xl:text-[38px] ${"accent" in k ? "text-naranja-texto" : ""}`}
              >
                <CountUp value={k.value} decimals={k.decimals} />
                {"unit" in k && <span className="text-lg"> {k.unit}</span>}
              </div>
              <div className="text-[13px] font-semibold text-texto-2">{k.label}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Móvil (PDF pág. 5) ---------- */}
      <div className="md:hidden">
        <div className="sobre-oscuro relative isolate flex min-h-140 flex-col justify-end overflow-hidden rounded-tarjeta bg-azul p-5.5 text-white">
          <Image
            src={ILLUSTRATIVE.solar.src}
            width={ILLUSTRATIVE.solar.width}
            height={ILLUSTRATIVE.solar.height}
            alt=""
            preload
            sizes="100vw"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ objectPosition: ILLUSTRATIVE.solar.pos }}
          />
          <span
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,42,79,.05)_20%,rgba(11,42,79,.92)_78%)]"
          />
          <div className="absolute top-5 left-5.5">{crumbs}</div>
          <span className="self-start rounded-pildora bg-naranja px-3 py-1.5 text-[11px] font-extrabold tracking-[.04em] text-azul uppercase">
            {SOLAR_HERO.chips[1]}
          </span>
          <h1 className="mt-3.5 text-[36px] leading-[1.02] font-extrabold tracking-[-.03em]">
            {SOLAR_HERO.t1}{" "}
            <em className="font-serif font-normal tracking-[-.02em] text-durazno-claro italic">{SOLAR_HERO.t2}</em>
          </h1>
          <p className="mt-3 text-[14.5px] leading-[1.55] text-texto-claro">{SOLAR_HERO.lead}</p>
        </div>
        <ul aria-label="Cifras del proyecto" className="mt-2.5 grid grid-cols-2 gap-2.5">
          {SOLAR_KPIS.map((k, i) => (
            <li
              key={k.label}
              className={`rounded-[20px] px-4.5 py-4 ${
                i === 0 ? "sobre-oscuro col-span-2 bg-azul text-white" : "accent" in k ? "bg-durazno" : "bg-bruma"
              }`}
            >
              <div className="text-[28px] leading-tight font-extrabold tracking-[-.02em]">
                <CountUp value={k.value} decimals={k.decimals} />
                {"unit" in k && i > 0 && ` ${k.unit}`}
              </div>
              <div className={`text-xs ${i === 0 ? "text-sobre-oscuro" : "text-texto-2"}`}>{k.mobile}</div>
            </li>
          ))}
        </ul>
        <ButtonLink
          href={PDF_PLANTA_SOLAR}
          icon={<DownloadIcon />}
          className="mt-2.5 h-14 w-full text-[15px] font-extrabold"
        >
          Descargar documento del proyecto
        </ButtonLink>
      </div>
    </section>
  );
}
