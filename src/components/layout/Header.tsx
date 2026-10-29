"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { MOTION_OK, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { ChevronDown, HeartIcon, MenuIcon } from "@/components/ui/icons";
import { ROUTES, sectionForPath, type NavSection } from "@/content/routes";
import { CTA } from "@/content/site";
import { MEGA_WIDTH, MegaMenuPanel, type MegaKey } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { TopBar } from "./TopBar";

/**
 * Encabezado global (Header.dc.html + cabecera de Mobile.dc.html).
 *  · Escritorio (≥ 1280): navegación de 84 px (Inicio, mega menús, enlaces), Donar y Agenda tu cita.
 *  · Móvil y tableta: logo, acceso al proyecto destacado y botón de menú (76 px).
 *  · Fijo: la barra superior sale de pantalla y la navegación queda anclada; al bajar
 *    se oculta y reaparece al subir (solo si se permite movimiento).
 *  · Inicio: versión de cristal oscuro sobre la portada de impacto (portada-impacto/ESPECIFICACION.md
 *    · §3); al pasar la portada el cristal se vuelve casi opaco para mantener la lectura.
 */
export function Header() {
  const pathname = usePathname();
  const active = sectionForPath(pathname);
  const dark = pathname === ROUTES.inicio;
  const [mega, setMega] = useState<MegaKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const lockRef = useRef(false);
  useEffect(() => {
    lockRef.current = mega !== null || mobileOpen;
  }, [mega, mobileOpen]);

  // Cerrar menús al cambiar de página (ajuste de estado durante el render, sin efecto).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMega(null);
    setMobileOpen(false);
  }

  // Estado del header según el scroll: sombra y ocultar/mostrar por dirección.
  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        setScrolled(y > 8);
        setPastHero(y > 640);
        if (!window.matchMedia(MOTION_OK).matches) return setHidden(false);
        if (lockRef.current || y < 240) return setHidden(false);
        if (self.direction === 1) setHidden(true);
        else if (self.direction === -1) setHidden(false);
      },
    });
    return () => {
      st.kill();
    };
  });

  // Los paneles se alinean con el inicio del grupo de mega menús (en el diseño: left 400 px a 1440).
  const [megaLeft, setMegaLeft] = useState<number | null>(null);
  useEffect(() => {
    if (!mega) return;
    const place = () => {
      const box = navRef.current?.getBoundingClientRect();
      const anchor = document.getElementById("trigger-quienes")?.getBoundingClientRect();
      if (!box || !anchor) return;
      const left = anchor.left - box.left - 8;
      setMegaLeft(Math.max(16, Math.min(left, box.width - MEGA_WIDTH[mega] - 16)));
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [mega]);

  // Estado visible/oculto del encabezado disponible para otros elementos fijos (p. ej. subnavegación).
  useEffect(() => {
    document.documentElement.dataset.header = hidden ? "oculto" : "visible";
  }, [hidden]);

  const close = useCallback(() => setMega(null), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Escape y clic fuera cierran el mega menú; el foco vuelve a su botón.
  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      document.getElementById(`trigger-${mega}`)?.focus();
      setMega(null);
    };
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMega(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [mega]);

  // Apertura por hover con intención (solo ratón); el clic sigue funcionando como en el diseño.
  const hoverOpen = (key: MegaKey) => (e: RPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMega(key), 90);
  };
  const hoverClose = (e: RPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMega(null), 180);
  };
  const keepOpen = () => window.clearTimeout(hoverTimer.current);

  return (
    <>
      <header
        ref={headerRef}
        onFocusCapture={() => setHidden(false)}
        className={`sticky z-50 transition-transform duration-500 ease-(--ease-salida) md:-top-11 ${
          dark ? "sobre-oscuro top-0" : "-top-9"
        } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <TopBar dark={dark} />
        <div
          className={
            dark
              ? `border-b border-white/8 backdrop-blur-[14px] transition-colors duration-500 ${pastHero ? "bg-noche/92" : "bg-noche/35"}`
              : `border-b border-linea bg-white transition-shadow duration-300 ${scrolled ? "shadow-header" : ""}`
          }
        >
          <div ref={navRef} className="relative mx-auto max-w-360">
            {/* ---------- Escritorio (≥ 1280) ----------
                1280–1439: escala compacta (logo sm, 14 px); ≥ 1440: medidas del diseño (logo md, 14,5 px).
                Todos los elementos en una sola línea; por debajo de 1280 se usa el menú hamburguesa. */}
            <nav
              aria-label="Principal"
              className={`hidden items-center justify-between gap-6 px-8 xl:flex 2xl:gap-8 2xl:px-12 ${dark ? "h-22.5" : "h-21"}`}
            >
              <Link
                href={ROUTES.inicio}
                aria-label="Fundación Derecho y Formación — Inicio"
                className="group flex shrink-0 items-center no-underline"
              >
                <span className="2xl:hidden">
                  <Logo tone={dark ? "dark" : "light"} size="sm" decorative />
                </span>
                <span className="hidden 2xl:block">
                  <Logo tone={dark ? "dark" : "light"} size="md" decorative />
                </span>
              </Link>

              <ul className="flex min-w-0 items-center text-sm font-semibold whitespace-nowrap 2xl:text-[14.5px]">
                <li>
                  <NavLink href={ROUTES.inicio} section="inicio" active={active} dark={dark}>
                    Inicio
                  </NavLink>
                </li>
                <li>
                  <MegaTrigger
                    which="quienes"
                    label="Quiénes somos"
                    active={active}
                    dark={dark}
                    open={mega === "quienes"}
                    onToggle={() => setMega(mega === "quienes" ? null : "quienes")}
                    onPointerEnter={hoverOpen("quienes")}
                    onPointerLeave={hoverClose}
                  />
                  {/* El panel sigue a su botón en el DOM: el Tab entra al menú abierto. */}
                  <MegaMenuPanel
                    which="quienes"
                    open={mega === "quienes"}
                    left={megaLeft}
                    pathname={pathname}
                    onNavigate={close}
                    onPointerEnter={keepOpen}
                    onPointerLeave={hoverClose}
                  />
                </li>
                <li>
                  <MegaTrigger
                    which="que"
                    label="Qué hacemos"
                    active={active}
                    dark={dark}
                    open={mega === "que"}
                    onToggle={() => setMega(mega === "que" ? null : "que")}
                    onPointerEnter={hoverOpen("que")}
                    onPointerLeave={hoverClose}
                  />
                  <MegaMenuPanel
                    which="que"
                    open={mega === "que"}
                    left={megaLeft}
                    pathname={pathname}
                    onNavigate={close}
                    onPointerEnter={keepOpen}
                    onPointerLeave={hoverClose}
                  />
                </li>
                <li>
                  <NavLink href={ROUTES.proyectos} section="proyectos" active={active} dark={dark}>
                    Proyectos
                  </NavLink>
                </li>
                <li>
                  <NavLink href={ROUTES.diplomados} section="diplomados" active={active} dark={dark}>
                    Diplomados
                  </NavLink>
                </li>
                <li>
                  <NavLink href={ROUTES.contacto} section="contacto" active={active} dark={dark}>
                    Contáctenos
                  </NavLink>
                </li>
              </ul>

              <div className="flex shrink-0 items-center gap-2 2xl:gap-2.5">
                <ButtonLink
                  href={CTA.donar.href}
                  variant={dark ? "glass" : "secondary"}
                  size="sm"
                  icon={<HeartIcon />}
                  className="px-4 2xl:px-5"
                >
                  {CTA.donar.label}
                </ButtonLink>
                <ButtonLink href={CTA.agenda.href} variant="primary" size="sm" arrow className="px-4.5 2xl:px-5.5">
                  {CTA.agenda.label}
                </ButtonLink>
              </div>
            </nav>

            {/* ---------- Móvil y tableta ---------- */}
            <nav
              aria-label="Principal"
              className={`flex items-center justify-between px-4 md:px-8 xl:hidden ${dark ? "h-18 md:h-19" : "h-19"}`}
            >
              <Link
                href={ROUTES.inicio}
                aria-label="Fundación Derecho y Formación — Inicio"
                className="group flex items-center no-underline"
              >
                <span className="md:hidden">
                  <Logo tone={dark ? "dark" : "light"} size="xs" decorative />
                </span>
                <span className="hidden md:block">
                  <Logo tone={dark ? "dark" : "light"} size="md" decorative />
                </span>
              </Link>
              <span className="flex gap-2">
                <button
                  type="button"
                  aria-label="Abrir menú"
                  aria-expanded={mobileOpen}
                  aria-controls="menu-movil"
                  onClick={() => setMobileOpen(true)}
                  className={`flex size-11 cursor-pointer items-center justify-center rounded-pildora text-white transition-[transform,background-color] duration-300 active:scale-95 ${
                    dark ? "bg-white/10 hover:bg-white/20" : "bg-azul hover:bg-accion"
                  }`}
                >
                  <MenuIcon />
                </button>
              </span>
            </nav>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={closeMobile} pathname={pathname} />
    </>
  );
}

const linkBase =
  "relative flex items-center gap-1.5 px-2 py-3 no-underline transition-colors duration-200 after:absolute after:inset-x-2 after:bottom-0 2xl:px-2.5 2xl:after:inset-x-2.5 after:h-0.5 after:origin-left after:rounded-full after:bg-naranja after:transition-transform after:duration-300";

/** Colores del enlace [activo, reposo]: encabezado claro o de cristal oscuro (Inicio). */
const linkTone = (dark: boolean) =>
  dark
    ? (["text-durazno-claro", "text-white hover:text-durazno-claro"] as const)
    : (["text-accion", "text-azul hover:text-accion"] as const);

function NavLink({
  href,
  section,
  active,
  dark,
  children,
}: {
  href: string;
  section: NavSection;
  active: NavSection | null;
  dark: boolean;
  children: ReactNode;
}) {
  const isActive = active === section;
  const [on, off] = linkTone(dark);
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`${linkBase} ${isActive ? `${on} after:scale-x-100` : `${off} after:scale-x-0 hover:after:scale-x-100`}`}
    >
      {children}
    </Link>
  );
}

function MegaTrigger({
  which,
  label,
  active,
  dark,
  open,
  onToggle,
  onPointerEnter,
  onPointerLeave,
}: {
  which: MegaKey;
  label: string;
  active: NavSection | null;
  dark: boolean;
  open: boolean;
  onToggle: () => void;
  onPointerEnter: (e: RPointerEvent) => void;
  onPointerLeave: (e: RPointerEvent) => void;
}) {
  const isActive = active === which;
  const [on, off] = linkTone(dark);
  return (
    <button
      id={`trigger-${which}`}
      type="button"
      aria-expanded={open}
      aria-controls={`mega-${which}`}
      onClick={onToggle}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`${linkBase} cursor-pointer ${
        isActive || open ? on : off
      } ${isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}
    >
      {label}
      <ChevronDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
    </button>
  );
}
