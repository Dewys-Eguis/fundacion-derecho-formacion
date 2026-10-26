"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { formatEsCo } from "@/components/motion/CountUp";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { SOLAR_CONFIGS, SOLAR_TECH } from "@/content/solar";

/**
 * Configurador técnico (PDF pág. 2): 4 configuraciones del documento oficial.
 * Al elegir una, la cifra grande cuenta hasta su valor y las barras se resaltan.
 * Las barras crecen al entrar en pantalla. Pestañas accesibles con flechas.
 */
const MAX = 15;

export function TechConfigurator() {
  const [sel, setSel] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const big = useRef<HTMLSpanElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = SOLAR_CONFIGS[sel];

  // Barras: crecen desde 0 al entrar en pantalla.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".cfg-bar", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cfg-bars", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Cifra grande: anima del valor anterior al nuevo.
  const prev = useRef(cur.mwp);
  useGSAP(
    () => {
      const node = big.current;
      if (!node) return;
      const from = prev.current;
      prev.current = cur.mwp;
      if (!window.matchMedia(MOTION_OK).matches || from === cur.mwp) {
        node.textContent = formatEsCo(cur.mwp, 2);
        return;
      }
      const s = { n: from };
      gsap.to(s, {
        n: cur.mwp,
        duration: 0.7,
        ease: "power2.out",
        onUpdate: () => {
          node.textContent = formatEsCo(s.n, 2);
        },
      });
      gsap.from(".cfg-detail", { y: 8, opacity: 0, duration: 0.5, stagger: 0.05 });
    },
    { scope: root, dependencies: [sel] },
  );

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = SOLAR_CONFIGS.length - 1;
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    tabs.current[next]?.focus();
    setSel(next);
  };

  return (
    <div ref={root}>
      <div
        role="tablist"
        aria-label="Configuraciones evaluadas"
        className="mt-8 grid grid-cols-2 gap-2.5 md:mt-10 xl:grid-cols-4 xl:gap-3"
      >
        {SOLAR_CONFIGS.map((c, i) => {
          const on = i === sel;
          return (
            <button
              key={c.struct + c.module}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`cfg-tab-${i}`}
              aria-selected={on}
              aria-controls="cfg-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setSel(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group cursor-pointer rounded-[18px] border-2 p-3.5 text-left transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 md:rounded-[22px] md:p-5.5 ${
                on ? "border-azul bg-azul text-white" : "border-linea bg-white text-azul hover:border-borde-boton"
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span
                  className={`text-[11px] font-extrabold tracking-[.06em] uppercase md:text-xs ${on ? "text-durazno-claro" : "text-accion"}`}
                >
                  <span className="md:hidden">{c.structShort}</span>
                  <span className="hidden md:inline">{c.struct}</span>
                </span>
                {c.optimal && (
                  <span className="rounded-pildora bg-naranja px-2 py-1 text-[10px] font-extrabold text-azul md:text-[11px]">
                    Óptima
                  </span>
                )}
              </span>
              <span className="mt-2 block text-base font-extrabold md:mt-2.5 md:text-xl">{c.module}</span>
              <span
                className={`mt-1 block text-[13px] font-semibold md:text-sm ${on ? "text-durazno-claro" : "text-accion"}`}
              >
                {formatEsCo(c.mwp, 2)} MWp
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="cfg-panel"
        role="tabpanel"
        aria-labelledby={`cfg-tab-${sel}`}
        className="sobre-oscuro mt-3 grid gap-8 rounded-tarjeta bg-azul p-5.5 text-white md:mt-4 md:rounded-banda md:p-10 xl:grid-cols-[420px_minmax(0,1fr)] xl:gap-12"
      >
        <div>
          <div className="cfg-detail text-[13px] font-bold text-sobre-oscuro">
            {cur.struct} · {cur.module}
          </div>
          <div className="mt-2.5 text-[80px] leading-[.9] font-extrabold tracking-[-.05em] md:text-[110px]">
            <span ref={big} aria-hidden>
              {formatEsCo(cur.mwp, 2)}
            </span>
            <span className="sr-only">{formatEsCo(cur.mwp, 2)}</span>
          </div>
          <div className="mt-1.5 text-base font-bold text-naranja md:text-lg">
            MWp de capacidad DC{cur.optimal && <span className="md:hidden"> · óptima</span>}
          </div>
          <div className="mt-7 grid grid-cols-2 gap-2.5">
            {[
              [cur.panels, "Módulos"],
              [cur.inv, "Inversores"],
              [cur.strings, "Strings"],
            ].map(([v, l]) => (
              <div key={l} className="cfg-detail rounded-2xl bg-white/8 p-4">
                <div className="text-2xl font-extrabold">{v}</div>
                <div className="text-xs text-sobre-oscuro">{l}</div>
              </div>
            ))}
            <div className="cfg-detail rounded-2xl bg-white/8 p-4">
              <div className="text-base leading-tight font-extrabold">{cur.model}</div>
              <div className="text-xs text-sobre-oscuro">Referencia del módulo</div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-[13px] font-extrabold tracking-widest text-sobre-oscuro uppercase">
            Capacidad por configuración (MWp)
          </div>
          <ul className="cfg-bars mt-5.5 flex flex-col gap-4.5">
            {SOLAR_CONFIGS.map((c, i) => (
              <li key={c.struct + c.module}>
                <button
                  type="button"
                  onClick={() => setSel(i)}
                  className="block w-full cursor-pointer text-left"
                  aria-label={`Ver ${c.struct} · ${c.module}: ${formatEsCo(c.mwp, 2)} MWp`}
                >
                  <span className="flex justify-between gap-4 text-sm font-bold">
                    <span>
                      {c.struct} · {c.module}
                    </span>
                    <span>{formatEsCo(c.mwp, 2)}</span>
                  </span>
                  <span className="mt-2 block h-3.5 rounded-pildora bg-white/8">
                    <span
                      className={`cfg-bar block h-3.5 rounded-pildora transition-colors duration-500 ${
                        i === sel ? "bg-naranja" : "bg-white/35"
                      }`}
                      style={{ width: `${(c.mwp / MAX) * 100}%` }}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-7 rounded-2xl bg-naranja/14 px-5 py-4.5 text-sm leading-[1.6] text-durazno-suave">
            {SOLAR_TECH.note}
          </p>
        </div>
      </div>
    </div>
  );
}
