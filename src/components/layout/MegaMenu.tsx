"use client";

import Link from "next/link";
import type { PointerEvent, ReactNode } from "react";
import { MEGA_DESTACADO, MEGA_QUE, MEGA_QUIENES, type MenuLink } from "@/content/site";

export type MegaKey = "quienes" | "que";

/** Anchos del diseño: 640 px (2 columnas) y 880 px (1fr 1fr 280px). */
export const MEGA_WIDTH: Record<MegaKey, number> = { quienes: 640, que: 880 };

/**
 * Paneles de los mega menús (Header.dc.html). Aparición de 200 ms con
 * desplazamiento de 8 px; los enlaces entran escalonados. Cerrados quedan `inert`.
 */
export function MegaMenuPanel({
  which,
  open,
  left,
  pathname,
  onNavigate,
  onPointerEnter,
  onPointerLeave,
}: {
  which: MegaKey;
  open: boolean;
  /** Posición calculada por el Header; sin ella se usa la del lienzo (400 px). */
  left: number | null;
  pathname: string;
  onNavigate: () => void;
  onPointerEnter: () => void;
  onPointerLeave: (e: PointerEvent<HTMLDivElement>) => void;
}) {
  const quienes = which === "quienes";
  const width = MEGA_WIDTH[which];

  return (
    <div
      id={`mega-${which}`}
      inert={!open}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`absolute top-[calc(100%+8px)] z-50 text-base font-normal whitespace-normal transition-[opacity,translate,visibility] duration-200 ease-out ${
        open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
      }`}
      style={{ width, left: left ?? `min(400px, calc(100% - ${width}px - 48px))` }}
    >
      <div
        className={`grid gap-2 rounded-3xl border border-linea bg-white p-6 shadow-megamenu ${
          quienes ? "grid-cols-2" : "grid-cols-[1fr_1fr_280px]"
        }`}
      >
        {(quienes ? MEGA_QUIENES : MEGA_QUE).map((item, i) => (
          <MegaLink key={item.href} item={item} index={i} open={open} pathname={pathname} onNavigate={onNavigate}>
            {!quienes && i === 1 && <Destacado open={open} onNavigate={onNavigate} />}
          </MegaLink>
        ))}
      </div>
    </div>
  );
}

function MegaLink({
  item,
  index,
  open,
  pathname,
  onNavigate,
  children,
}: {
  item: MenuLink;
  index: number;
  open: boolean;
  pathname: string;
  onNavigate: () => void;
  children?: ReactNode;
}) {
  const current = pathname === item.href;
  return (
    <>
      <Link
        href={item.href}
        onClick={onNavigate}
        aria-current={current ? "page" : undefined}
        className={`group rounded-2xl p-4 text-azul no-underline transition-[background-color,opacity,translate] duration-300 hover:bg-bruma ${
          current ? "bg-bruma" : ""
        } ${open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
        style={{ transitionDelay: open ? `${60 + index * 30}ms` : "0ms" }}
      >
        <span className="flex items-center justify-between font-bold">
          {item.label}
          <span
            aria-hidden
            className="text-naranja opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
          >
            →
          </span>
        </span>
        <span className="mt-1 block text-[13px] text-texto-2">{item.desc}</span>
      </Link>
      {children}
    </>
  );
}

function Destacado({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <Link
      href={MEGA_DESTACADO.href}
      onClick={onNavigate}
      className={`group sobre-oscuro row-span-3 flex flex-col justify-between gap-4 rounded-[18px] bg-azul p-5 text-white no-underline transition-[opacity,translate,box-shadow] duration-300 hover:shadow-tarjeta ${
        open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
      }`}
      style={{ transitionDelay: open ? "120ms" : "0ms" }}
    >
      <span className="self-start rounded-pildora bg-naranja px-2.5 py-1.25 text-[11px] font-extrabold tracking-[.06em] text-azul uppercase">
        {MEGA_DESTACADO.tag}
      </span>
      <span className="text-[22px] leading-[1.15] font-extrabold">{MEGA_DESTACADO.title}</span>
      <span className="text-[13px] text-texto-megamenu transition-colors group-hover:text-white">
        {MEGA_DESTACADO.meta}
      </span>
    </Link>
  );
}
