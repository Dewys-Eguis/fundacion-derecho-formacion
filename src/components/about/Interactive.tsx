"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { MILESTONES, PILLARS } from "@/content/about";

/** Navegación con flechas entre botones de un grupo (pilares e hitos). */
function useArrowNav(count: number, onPick: (i: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const last = count - 1;
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    refs.current[next]?.focus();
    onPick(next);
  };
  return { refs, onKeyDown };
}

/**
 * «Lo que nos define» (PDF pág. 7): 4 pilares seleccionables; el activo pasa a azul
 * institucional. Seleccionar no cambia el tamaño de las tarjetas (sin saltos).
 */
export function Pillars() {
  const [sel, setSel] = useState(0);
  const { refs, onKeyDown } = useArrowNav(PILLARS.length, setSel);
  return (
    <div
      role="group"
      aria-label="Nuestros pilares"
      className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 md:gap-4 xl:grid-cols-4"
    >
      {PILLARS.map((p, i) => {
        const on = i === sel;
        return (
          <button
            key={p.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            aria-pressed={on}
            onClick={() => setSel(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            data-reveal
            className={`group flex min-h-50 cursor-pointer flex-col justify-between rounded-tarjeta border-2 p-6 text-left transition-[background-color,border-color,color,transform,box-shadow] duration-400 hover:-translate-y-1 hover:shadow-tarjeta md:min-h-60 md:p-8 ${
              on ? "sobre-oscuro border-azul bg-azul text-white" : "border-linea bg-white text-azul"
            }`}
          >
            <span className="text-[40px] leading-none font-extrabold text-naranja transition-transform duration-500 ease-(--ease-salida) group-hover:-translate-y-1 md:text-[44px]">
              0{i + 1}
            </span>
            <span className="mt-8 block">
              <span className="block text-2xl font-extrabold md:text-[26px]">{p.title}</span>
              <span className={`mt-2 block text-[15px] leading-[1.55] ${on ? "text-sobre-oscuro" : "text-texto-2"}`}>
                {p.desc}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * «Hitos institucionales» (PDF pág. 7): línea de tiempo con 4 hitos; el activo se
 * marca en naranja y su descripción aparece debajo. El progreso de la línea
 * acompaña al hito activo. En móvil, la línea es vertical.
 */
export function Milestones() {
  const [sel, setSel] = useState(2);
  const { refs, onKeyDown } = useArrowNav(MILESTONES.length, setSel);
  const progress = (sel / (MILESTONES.length - 1)) * 100;
  return (
    <>
      <div className="relative mt-8 md:mt-12">
        {/* Línea de base + progreso */}
        <span
          aria-hidden
          className="absolute top-6 bottom-6 left-5.5 w-0.5 bg-borde-boton md:top-5.5 md:right-0 md:bottom-auto md:left-0 md:h-0.5 md:w-auto"
        />
        <span
          aria-hidden
          className="absolute top-6 left-5.5 w-0.5 bg-accion transition-[height,width] duration-700 ease-(--ease-salida) max-md:h-[var(--p)] md:top-5.5 md:left-0 md:h-0.5 md:w-[var(--p)]"
          style={{ "--p": `calc(${progress}% * 0.78)` } as CSSProperties}
        />
        <div role="group" aria-label="Hitos institucionales" className="relative grid gap-6 md:grid-cols-4 md:gap-4">
          {MILESTONES.map((m, i) => {
            const on = i === sel;
            return (
              <button
                key={m.year}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                aria-pressed={on}
                aria-controls="hito-detalle"
                onClick={() => setSel(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group flex cursor-pointer items-start gap-5 text-left text-azul md:block"
              >
                <span
                  className={`block size-11 shrink-0 rounded-pildora border-4 border-bruma transition-[background-color,transform] duration-400 group-hover:scale-110 md:size-12 ${
                    on ? "scale-110 bg-naranja" : "bg-accion"
                  }`}
                />
                <span className="block">
                  <span
                    className={`block text-[32px] leading-none font-extrabold tracking-[-.03em] transition-colors duration-300 md:mt-4.5 md:text-[40px] ${on ? "text-naranja-texto" : ""}`}
                  >
                    {m.year}
                  </span>
                  <span className="mt-2 block text-[15px] leading-[1.35] font-bold md:text-base">{m.title}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div
        className="mt-8 grid rounded-3xl bg-white px-6 py-6 md:mt-9 md:px-8 md:py-7"
        id="hito-detalle"
        aria-live="polite"
      >
        {MILESTONES.map((m, i) => (
          <p
            key={m.year}
            aria-hidden={i !== sel}
            className={`text-base leading-[1.6] text-texto-cuerpo transition-[opacity,translate] duration-500 [grid-area:1/1] md:text-[17px] ${
              i === sel ? "visible translate-y-0 opacity-100" : "invisible translate-y-1.5 opacity-0"
            }`}
          >
            {m.desc}
          </p>
        ))}
      </div>
    </>
  );
}
