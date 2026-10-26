"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

type CountUpProps = {
  /** Cifra verificada (fuente: diseño / PDF oficial). */
  value: number;
  decimals?: number;
  /** Separador de miles «.» (16.744). Desactivar en años (2014, 2035). */
  group?: boolean;
  duration?: number;
  className?: string;
};

/** Formato es-CO determinista (igual en servidor y cliente): 16.744 · 11,05 · 23,1 */
export function formatEsCo(n: number, decimals = 0, group = true) {
  const [int, dec] = n.toFixed(decimals).split(".");
  const intPart = group ? int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : int;
  return dec ? `${intPart},${dec}` : intPart;
}

/**
 * Contador animado. El HTML estático ya contiene la cifra final (sin JS o con
 * movimiento reducido se ve directamente); la animación corre una sola vez al
 * entrar en pantalla. Los lectores de pantalla solo leen el valor final.
 */
export function CountUp({ value, decimals = 0, group = true, duration = 1.6, className }: CountUpProps) {
  const el = useRef<HTMLSpanElement>(null);
  const final = formatEsCo(value, decimals, group);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const node = el.current;
        if (!node) return;
        const state = { n: 0 };
        node.textContent = formatEsCo(0, decimals, group);
        gsap.to(state, {
          n: value,
          duration,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 92%", once: true },
          onUpdate: () => {
            node.textContent = formatEsCo(state.n, decimals, group);
          },
          onComplete: () => {
            node.textContent = final;
          },
        });
        return () => {
          node.textContent = final;
        };
      });
      return () => mm.revert();
    },
    { scope: el },
  );

  return (
    <span className={`relative ${className ?? ""}`}>
      <span ref={el} aria-hidden="true">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
