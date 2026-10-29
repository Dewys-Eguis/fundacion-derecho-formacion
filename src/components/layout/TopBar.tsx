import { SITE } from "@/content/site";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";

/**
 * Barra superior azul (Header.dc.html · 44 px; Mobile.dc.html · 36 px).
 * Escritorio: teléfono, correo, dirección y sello OEA (sitio solo en español).
 * En anchos intermedios se ocultan primero la dirección y luego el correo.
 * `dark`: versión transparente sobre la portada de impacto del Inicio (oculta en móvil).
 */
export function TopBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={dark ? "border-b border-white/8 text-sobre-oscuro" : "bg-azul text-texto-claro"}>
      {/* Móvil */}
      {!dark && (
        <div className="flex h-9 items-center justify-between px-4 text-[11px] font-semibold md:hidden">
          <a href={SITE.phone.href} className="no-underline hover:text-white">
            {SITE.phone.label}
          </a>
          <span className="text-sello">{SITE.oeaSealShort}</span>
        </div>
      )}

      {/* Tableta y escritorio */}
      <div className="contenedor hidden h-11 items-center justify-between text-[13px] md:flex">
        <div className={`flex items-center gap-7 ${dark ? "[&_svg]:text-mapa" : ""}`}>
          <a href={SITE.phone.href} className="flex items-center gap-2 no-underline transition-colors hover:text-white">
            <PhoneIcon />
            {SITE.phone.label}
          </a>
          <a
            href={SITE.email.href}
            className="hidden items-center gap-2 no-underline transition-colors hover:text-white lg:flex"
          >
            <MailIcon />
            {SITE.email.label}
          </a>
          <span className="hidden items-center gap-2 xl:flex">
            <PinIcon />
            {SITE.address.short}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span
            className={
              dark
                ? "flex items-center gap-2 rounded-pildora border border-naranja/60 px-3.5 py-1.5 text-[12.5px] font-bold text-durazno-claro"
                : "flex items-center gap-2 rounded-pildora bg-naranja/18 px-3 py-1.25 text-xs font-semibold text-sello"
            }
          >
            {SITE.oeaSeal}
          </span>
        </div>
      </div>
    </div>
  );
}
