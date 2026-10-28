import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { PlayIcon } from "@/components/ui/icons";
import { MinjusticiaBadge } from "@/components/ui/MinjusticiaBadge";
import { CTA, FOOTER_COLUMNS, PRIVACY_POLICY, SITE, SOCIAL } from "@/content/site";
import { FooterWaves } from "./FooterWaves";

/** Enlaces externos del pie (p. ej. «Donaciones» → Wompi) en pestaña nueva. */
const newTab = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

/**
 * Pie de página: bloque azul redondeado (Footer.dc.html) en tableta y escritorio;
 * versión compacta de Mobile.dc.html en móvil.
 */
export function Footer() {
  return (
    <footer className="sobre-oscuro mx-auto max-w-360 px-3 pb-3 md:px-4 md:pb-4">
      {/* ---------- Móvil (Mobile.dc.html) ---------- */}
      <div className="rounded-tarjeta bg-azul px-5.5 py-8 text-white md:hidden">
        <Logo tone="dark" size="xs" />
        <p className="mt-4 text-[13.5px] leading-[1.6] text-pie">{SITE.claim}</p>
        <div className="mt-4 flex flex-col gap-2 text-[11.5px] font-semibold text-texto-claro">
          {SITE.footerBadges.map((b) => (
            <span key={b} className="self-start rounded-pildora border border-white/18 px-3 py-1.5">
              {b}
            </span>
          ))}
        </div>
        <MinjusticiaBadge width={232} className="mt-4" />
        {/* Mismos enlaces del pie de escritorio, en dos columnas */}
        <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6 text-[13.5px]">
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[11px] font-extrabold tracking-[.12em] text-naranja uppercase">{col.title}</h2>
              <ul className="mt-2.5 flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} {...newTab(l.href)} className="text-texto-claro no-underline active:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-7 flex flex-col gap-2.5 text-sm text-texto-claro">
          <span>{SITE.address.mobile}</span>
          <a href={SITE.phone.href} className="font-extrabold text-white no-underline">
            {SITE.phone.label}
          </a>
          <a href={SITE.email.href} className="text-[13px] text-texto-claro no-underline">
            {SITE.email.label}
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <ButtonLink href={CTA.agenda.href} variant="primary" className="h-12 px-4.5 text-sm">
            {CTA.agenda.label}
          </ButtonLink>
          <ButtonLink href={CTA.donar.href} variant="ghost" className="h-12 border-white/30 px-4.5 text-sm">
            {CTA.donar.label}
          </ButtonLink>
        </div>
        <ul className="mt-5 flex gap-2" aria-label="Redes sociales (enlaces por confirmar)">
          {SOCIAL.map((s) => (
            <li key={s.name}>
              <span
                role="img"
                aria-label={`${s.name} (enlace por confirmar)`}
                title={`${s.name}: enlace por confirmar`}
                data-pending=""
                className="flex size-11 items-center justify-center rounded-pildora bg-white/10 text-[13px] font-extrabold text-white"
              >
                {s.short === "play" ? <PlayIcon /> : <span aria-hidden>{s.short}</span>}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-7 font-serif text-[46px] leading-[.95] italic">Tejido Humano</p>
        <div className="mt-4.5 flex flex-col gap-2 border-t border-white/14 pt-4 text-[11.5px] text-pie">
          <span>{SITE.copyrightShort}</span>
          <span className="flex justify-between gap-4">
            <a
              href={PRIVACY_POLICY.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pie underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              {PRIVACY_POLICY.label}
              <span className="sr-only"> (PDF, se abre en una pestaña nueva)</span>
            </a>
            <a href="#top" className="shrink-0 text-pie no-underline">
              Volver arriba ↑
            </a>
          </span>
        </div>
      </div>

      {/* ---------- Tableta y escritorio (Footer.dc.html) ---------- */}
      <div className="relative hidden overflow-hidden rounded-banda bg-azul px-8 pt-18 pb-8 text-white md:block xl:px-16">
        <FooterWaves />
        <div className="relative grid grid-cols-2 gap-10 lg:grid-cols-3 xl:grid-cols-[1.5fr_1fr_1.1fr_1fr_1.3fr]">
          <div className="col-span-2 lg:col-span-3 xl:col-span-1">
            <Logo tone="dark" size="sm" />
            <p className="mt-5 max-w-75 text-sm leading-[1.6] text-pie">{SITE.claim}</p>
            <div className="mt-5 flex flex-col gap-2 text-xs font-semibold text-texto-claro">
              {SITE.footerBadges.map((b) => (
                <span key={b} className="self-start rounded-pildora border border-white/18 px-3 py-1.75">
                  {b}
                </span>
              ))}
            </div>
            <MinjusticiaBadge width={232} className="mt-4" />
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3 text-sm">
              <h2 className="mb-1.5 text-xs font-extrabold tracking-[.12em] text-naranja uppercase">{col.title}</h2>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      {...newTab(l.href)}
                      className="group inline-flex items-center text-texto-claro no-underline transition-colors duration-200 hover:text-white"
                    >
                      <span className="w-0 overflow-hidden text-naranja transition-[width] duration-300 group-hover:w-3.5">
                        –
                      </span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col gap-3 text-sm">
            <h2 className="mb-1.5 text-xs font-extrabold tracking-[.12em] text-naranja uppercase">Contáctenos</h2>
            <address className="leading-normal text-texto-claro not-italic">
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
            </address>
            <a href={SITE.phone.href} className="font-bold text-white no-underline hover:text-durazno-claro">
              {SITE.phone.label}
            </a>
            <a
              href={SITE.email.href}
              className="text-[13px] break-all text-texto-claro no-underline hover:text-white xl:break-normal xl:whitespace-nowrap"
            >
              {SITE.email.label}
            </a>
            {/* URLs de redes por confirmar: se muestran como en el diseño pero sin enlace falso. */}
            <ul className="mt-1.5 flex gap-2" aria-label="Redes sociales (enlaces por confirmar)">
              {SOCIAL.map((s) => (
                <li key={s.name}>
                  <span
                    role="img"
                    aria-label={`${s.name} (enlace por confirmar)`}
                    title={`${s.name}: enlace por confirmar`}
                    data-pending=""
                    className="flex size-11 cursor-help items-center justify-center rounded-pildora bg-white/10 text-[13px] font-extrabold text-white"
                  >
                    {s.short === "play" ? <PlayIcon /> : <span aria-hidden>{s.short}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="relative mt-14 font-serif text-[clamp(4.5rem,8.4vw,7.5rem)] leading-[.9] tracking-[-.02em] whitespace-nowrap text-white/95 italic"
        >
          Tejido Humano
        </p>
        <div className="relative mt-7 flex flex-col justify-between gap-3 border-t border-white/14 pt-5 text-[13px] text-pie lg:flex-row">
          <span>{SITE.copyright}</span>
          <span className="flex gap-6">
            <a
              href={PRIVACY_POLICY.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pie underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              {PRIVACY_POLICY.label}
              <span className="sr-only"> (PDF, se abre en una pestaña nueva)</span>
            </a>
            <a href="#top" className="text-pie no-underline transition-colors hover:text-white">
              Volver arriba ↑
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
