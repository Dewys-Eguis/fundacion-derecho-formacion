"use client";

import { useRef, type ReactNode } from "react";
import { DESKTOP, gsap, MOTION_OK, useGSAP } from "./gsap";

type ParallaxProps = {
  children: ReactNode;
  /** Desplazamiento máximo en % de la altura (±). Se reduce a la mitad en móvil. */
  amount?: number;
  /** Zoom de entrada suave (1,08 → 1) al cargar: para banners e imágenes de portada. */
  zoomIn?: boolean;
  className?: string;
};

/**
 * Capa de fondo con parallax ligado al scroll. La capa interior se agranda
 * lo justo para que el desplazamiento nunca deje bordes vacíos.
 * Sin movimiento si el usuario pide prefers-reduced-motion.
 */
export function Parallax({ children, amount = 8, zoomIn = false, className = "" }: ParallaxProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ ok: MOTION_OK, desktop: DESKTOP }, (ctx) => {
        const { ok, desktop } = ctx.conditions as { ok: boolean; desktop: boolean };
        if (!ok) return;
        const a = desktop ? amount : amount / 2;
        if (zoomIn) gsap.from(inner.current, { scale: 1.08, duration: 1.8, ease: "power2.out" });
        gsap.fromTo(
          inner.current,
          { yPercent: -a },
          {
            yPercent: a,
            ease: "none",
            scrollTrigger: { trigger: outer.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: outer },
  );

  return (
    <div ref={outer} className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        ref={inner}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${amount}%`, bottom: `-${amount}%` }}
      >
        {children}
      </div>
    </div>
  );
}
