import { CountUp } from "@/components/motion/CountUp";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { DownloadIcon } from "@/components/ui/icons";
import { Accent } from "@/components/ui/typography";
import { FOCUS, PDF_PLANTA_SOLAR } from "@/content/home";
import { ROUTES } from "@/content/routes";
import { AmericasMap } from "./AmericasMap";

/**
 * Proyecto destacado «De Washington a Ciudad Bolívar» (presentación → impacto).
 * Banda azul institucional redondeada y limpia, sin fotografía (PDF pág. 1).
 * Escritorio: texto a la izquierda y mapa a la derecha. Tableta y móvil: texto, cifras y
 * botones; el mapa con sus etiquetas debajo (PDF pág. 4).
 */
export function FocusBand() {
  return (
    <section aria-labelledby="foco-titulo" className="banda pt-20 md:pt-28">
      <div className="sobre-oscuro relative overflow-hidden rounded-tarjeta bg-azul text-white md:rounded-banda xl:h-170">
        <div className="relative grid gap-4 px-5.5 pt-7 md:gap-8 md:px-12 md:pt-16 md:pb-16 xl:block xl:h-full xl:p-0">
          <div className="xl:absolute xl:top-18 xl:left-16 xl:w-170">
            <div data-reveal>
              <Chip className="max-md:px-3 max-md:py-1.5 max-md:text-[11px]">{FOCUS.chip}</Chip>
            </div>
            <h2
              id="foco-titulo"
              data-reveal
              className="mt-4 text-[32px] leading-[1.05] font-extrabold tracking-[-.025em] md:mt-6 md:text-[clamp(2.5rem,1.4rem+2.6vw,3.4rem)] md:leading-[1.04] md:tracking-[-.035em]"
            >
              De Washington a <br className="hidden md:block" />
              <Accent tone="claro">Ciudad Bolívar.</Accent>
            </h2>
            <p
              data-reveal
              className="mt-3 max-w-152.5 text-[14.5px] leading-[1.6] text-sobre-oscuro md:mt-6 md:text-[17.5px] md:leading-[1.62]"
            >
              {FOCUS.body}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2 md:mt-9 md:gap-3 xl:w-170">
              {FOCUS.stats.map((s) => (
                <div
                  key={s.text}
                  data-reveal
                  className="rounded-2xl border border-white/12 bg-white/8 p-3 transition-colors duration-300 hover:border-white/30 hover:bg-white/12 md:px-4.5 md:py-4"
                >
                  <div className="text-[22px] leading-none font-extrabold md:text-[28px]">
                    {"label" in s ? s.label : <CountUp value={s.value} decimals={s.decimals} />}
                  </div>
                  <div className="mt-1.5 text-[11px] leading-[1.3] text-sobre-oscuro md:text-[12.5px]">{s.text}</div>
                </div>
              ))}
            </div>
            <div data-reveal className="mt-6 flex flex-wrap gap-3 md:mt-9">
              <ButtonLink
                href={ROUTES.proyectoSolar}
                arrow
                className="h-13 px-5.5 text-sm font-extrabold md:h-14 md:px-6.5 md:text-[15.5px]"
              >
                Ver el proyecto completo
              </ButtonLink>
              <ButtonLink
                href={PDF_PLANTA_SOLAR}
                variant="ghost"
                icon={<DownloadIcon />}
                className="h-13 px-5.5 text-sm md:h-14 md:px-6.5 md:text-[15.5px]"
              >
                Descargar documento
              </ButtonLink>
            </div>
          </div>

          {/* Mapa: caja de 592 × 677 px en escritorio (posición del PDF) */}
          <div className="relative hidden aspect-[592/677] w-full self-center xl:absolute xl:top-px xl:right-18.5 xl:block xl:w-148">
            <AmericasMap id="mapa-escritorio" />
          </div>
          <div className="relative mx-auto -mb-1 aspect-square w-full max-w-80 md:max-w-110 xl:hidden">
            <AmericasMap id="mapa-movil" variant="mobile" />
          </div>
        </div>
      </div>
    </section>
  );
}
