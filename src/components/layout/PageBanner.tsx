import Image from "next/image";
import Link from "next/link";
import { IllustrativeLabel } from "@/components/ui/placeholders";
import type { SiteImage } from "@/content/images";
import { ROUTES } from "@/content/routes";

/**
 * Banner interior claro del diseño aprobado (PDF págs. 3 y 7–17): banda cielo
 * redondeada, migas, rótulo en píldora blanca, H1, entradilla, tarjeta de
 * fotografía pendiente (placeholder celeste) sobre un círculo blanco con
 * acento durazno, y ondas naranja/azul que se dibujan al entrar.
 */
export type Crumb = { label: string; href?: string };

export type PageBannerProps = {
  /** Última miga (página actual). */
  crumb: string;
  /** Migas intermedias opcionales (entre «Inicio» y la página actual). */
  parents?: Crumb[];
  eyebrow: string;
  heading: string;
  lead: string;
  /** Descripción de la fotografía pendiente, p. ej. «proyecto en territorio». */
  photo: string;
  /** Compatibilidad con el banner anterior (ya no se usan imágenes de relleno). */
  art?: string;
  /** Fotografía real (si existe) en lugar del placeholder. */
  image?: SiteImage;
};

export function PageBanner({ crumb, parents = [], eyebrow, heading, lead, photo, image }: PageBannerProps) {
  const trail: Crumb[] = [{ label: "Inicio", href: ROUTES.inicio }, ...parents, { label: crumb }];
  return (
    <section className="banda pt-3 md:pt-4">
      <div className="relative isolate overflow-hidden rounded-tarjeta bg-cielo md:rounded-banda xl:h-120">
        {/* Círculo blanco y acento durazno (detrás de la tarjeta de foto) */}
        <span
          aria-hidden
          data-float="6"
          className="absolute top-[52%] -right-40 -z-10 size-110 rounded-pildora bg-white/70 md:top-auto md:-right-30 md:-bottom-40 md:size-150 xl:-top-12 xl:right-[-1%] xl:bottom-auto xl:size-178"
        />
        <span
          aria-hidden
          className="absolute -z-10 hidden size-36 rounded-pildora bg-durazno-suave xl:top-8 xl:right-[7%] xl:block"
        />
        {/* Ondas */}
        <svg
          aria-hidden
          viewBox="0 0 1408 480"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full md:block"
          fill="none"
        >
          <path
            data-draw=""
            d="M0 390 C 260 352, 520 402, 760 398 S 1100 300, 1408 272"
            stroke="#F4914D"
            strokeWidth="1.6"
          />
          <path
            data-draw=""
            d="M0 425 C 300 400, 560 448, 860 430 S 1200 312, 1408 318"
            stroke="#9FC2E6"
            strokeWidth="1.4"
          />
          <path
            data-draw=""
            d="M0 455 C 340 438, 640 470, 940 446 S 1260 350, 1408 352"
            stroke="#C9DBEF"
            strokeWidth="1.2"
          />
        </svg>

        <div className="grid gap-8 px-5.5 pt-7 pb-6 md:px-12 md:pt-12 md:pb-12 xl:h-full xl:grid-cols-[minmax(0,1fr)_460px] xl:items-center xl:gap-16 xl:px-16 xl:py-0">
          <div>
            <nav aria-label="Ruta de navegación" data-reveal>
              <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] font-semibold text-texto-cuerpo">
                {trail.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-2.5">
                    {i > 0 && <span aria-hidden>/</span>}
                    {c.href ? (
                      <Link href={c.href} className="text-accion no-underline hover:underline">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <p
              data-reveal
              className="mt-5 inline-flex rounded-pildora bg-white px-3.5 py-1.75 text-[11.5px] font-extrabold tracking-[.06em] text-naranja-texto uppercase md:mt-7 md:text-[12.5px]"
            >
              {eyebrow}
            </p>
            <h1
              data-reveal
              className="mt-4 max-w-170 text-[34px] leading-[1.04] font-extrabold tracking-[-.035em] md:mt-5 md:text-[clamp(2.75rem,1.8rem+2.4vw,4.1rem)] md:leading-none md:tracking-[-.04em]"
            >
              {heading}
            </h1>
            <p data-reveal className="mt-4 max-w-152 text-[15.5px] leading-[1.6] text-texto-cuerpo md:mt-5 md:text-lg">
              {lead}
            </p>
          </div>
          <div data-reveal className="relative">
            {image ? (
              <div className="group relative aspect-[460/360] w-full overflow-hidden rounded-tarjeta shadow-[0_30px_60px_rgba(11,42,79,.12)]">
                <Image
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  preload
                  sizes="(min-width: 1280px) 460px, 100vw"
                  className="h-full w-full zoom-suave object-cover"
                  style={{ objectPosition: image.pos }}
                />
                {image.illustrative && <IllustrativeLabel className="absolute right-3 bottom-3" />}
              </div>
            ) : (
              <div
                role="img"
                aria-label={`Fotografía pendiente: ${photo}`}
                data-pending=""
                className="relative aspect-[460/360] w-full overflow-hidden rounded-tarjeta marcador-foto shadow-[0_30px_60px_rgba(11,42,79,.12)]"
              >
                <span className="absolute inset-x-5 bottom-4 rounded-xl bg-white/95 px-3.5 py-2.5 text-[12.5px] font-semibold text-texto-cuerpo">
                  [Fotografía: {photo}]
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
