"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { CloseIcon } from "@/components/ui/icons";
import { ROUTES } from "@/content/routes";
import { CTA, MOBILE_QUE, MOBILE_QUIENES } from "@/content/site";
import { LangSwitch } from "./LangSwitch";

/**
 * Menú móvil a pantalla completa (MobileMenu.dc.html). Diálogo modal:
 * bloquea el scroll, atrapa el foco, se cierra con Escape y devuelve el foco
 * al botón que lo abrió. «Qué hacemos» abierto por defecto, como en el diseño.
 */
export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const [section, setSection] = useState<"q" | "h" | null>("h");
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const uid = useId();

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => closeBtn.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const focusables = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open, onClose]);

  // Escalonado de entrada de los elementos del menú.
  const stagger = (i: number) => ({
    className: `transition-[opacity,translate] duration-500 ease-(--ease-salida) ${
      open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
    }`,
    style: { transitionDelay: open ? `${80 + i * 45}ms` : "0ms" },
  });

  const bigLink = "block rounded-2xl px-3 py-3.5 text-[22px] font-extrabold text-azul no-underline";
  const subLink = "text-texto-cuerpo no-underline hover:text-accion";
  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <div
      id="menu-movil"
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
      inert={!open}
      // Al abrir, `visibility` cambia al instante (para poder enfocar); al cerrar espera al fundido.
      className={`fixed inset-0 z-60 flex flex-col overflow-y-auto bg-white duration-300 xl:hidden ${
        open ? "visible opacity-100 transition-opacity" : "invisible opacity-0 transition-[opacity,visibility]"
      }`}
    >
      <div className="flex h-19 shrink-0 items-center justify-between border-b border-linea px-4 md:px-8">
        <Link href={ROUTES.inicio} aria-label="Inicio" onClick={onClose} className="group flex no-underline">
          <Logo tone="light" size="xs" decorative />
        </Link>
        <button
          ref={closeBtn}
          type="button"
          aria-label="Cerrar menú"
          onClick={onClose}
          className="flex size-11 cursor-pointer items-center justify-center rounded-pildora bg-bruma text-azul transition-transform duration-300 motion-safe:hover:rotate-90"
        >
          <CloseIcon />
        </button>
      </div>

      <nav aria-label="Menú" className="flex flex-col gap-1 px-4 py-3 md:px-8">
        <div {...stagger(0)}>
          <Link href={ROUTES.inicio} onClick={onClose} aria-current={current(ROUTES.inicio)} className={bigLink}>
            Inicio
          </Link>
        </div>

        {(
          [
            ["q", "Quiénes somos", MOBILE_QUIENES],
            ["h", "Qué hacemos", MOBILE_QUE],
          ] as const
        ).map(([key, label, links], i) => {
          const isOpen = section === key;
          const id = `${uid}-${key}`;
          return (
            <div key={key} {...stagger(i + 1)}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setSection(isOpen ? null : key)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-2xl px-3 py-3.5 text-left text-[22px] font-extrabold text-azul transition-colors duration-300 ${
                  isOpen ? "bg-bruma" : ""
                }`}
              >
                {label}
                <span aria-hidden className="text-naranja">
                  {isOpen ? "–" : "+"}
                </span>
              </button>
              <div
                id={id}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows] duration-400 ease-(--ease-salida) ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <ul className="flex flex-col gap-3 overflow-hidden pr-3 pl-6 text-base font-semibold">
                  {links.map((l, j) => (
                    <li key={l.href + l.label} className={j === 0 ? "pt-1" : j === links.length - 1 ? "pb-2" : ""}>
                      <Link href={l.href} onClick={onClose} aria-current={current(l.href)} className={subLink}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {(
          [
            ["Proyectos", ROUTES.proyectos],
            ["Diplomados", ROUTES.diplomados],
            ["Contáctenos", ROUTES.contacto],
          ] as const
        ).map(([label, href], i) => (
          <div key={href} {...stagger(i + 3)}>
            <Link href={href} onClick={onClose} aria-current={current(href)} className={bigLink}>
              {label}
            </Link>
          </div>
        ))}
      </nav>

      <div className={`mt-auto flex flex-col gap-2 p-4 md:px-8 ${stagger(6).className}`} style={stagger(6).style}>
        <Link
          href={ROUTES.proyectoSolar}
          onClick={onClose}
          className="group block rounded-[20px] bg-azul px-4.5 py-4 text-white no-underline"
        >
          <span className="block text-[11px] font-extrabold text-naranja uppercase">Proyecto destacado</span>
          <span className="mt-1 block text-base font-extrabold">
            Planta solar San Francisco{" "}
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
        <Link
          href={CTA.agenda.href}
          onClick={onClose}
          className="flex h-13.5 items-center justify-center rounded-pildora bg-naranja text-[15px] font-extrabold text-azul no-underline active:scale-[.98]"
        >
          {CTA.agenda.label}
        </Link>
        <span className="text-center text-[13px] font-extrabold">
          <LangSwitch activeClass="text-accion" className="font-extrabold" />
        </span>
      </div>
    </div>
  );
}
