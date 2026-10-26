"use client";

import { useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { PillGroup } from "@/components/ui/PillGroup";
import { STAFF, STAFF_FILTERS, type StaffGroup } from "@/content/interior";

type Filter = "all" | StaffGroup;

/** Placeholder celeste con iniciales (nunca retratos generados). */
function Portrait({ ini, big = false }: { ini: string; big?: boolean }) {
  return (
    <span className="relative flex h-full w-full items-center justify-center marcador-foto">
      <span
        aria-hidden
        className={`flex items-center justify-center rounded-pildora bg-white font-extrabold tracking-[-.02em] text-accion shadow-[0_10px_30px_rgba(11,42,79,.08)] ${
          big ? "size-28 text-4xl" : "size-20 text-[26px]"
        }`}
      >
        {ini}
      </span>
    </span>
  );
}

/**
 * Staff jurídico (PDF pág. 8): perfil destacado arriba y tarjetas filtrables.
 * Elegir una tarjeta muestra su perfil (biografía completa); en móvil se desplaza hasta él.
 */
export function StaffDirectory() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sel, setSel] = useState(0);
  const profile = useRef<HTMLElement>(null);
  const grid = useRef<HTMLUListElement>(null);
  const p = STAFF[sel];
  const people = STAFF.map((m, i) => ({ ...m, i })).filter((m) => filter === "all" || m.group === filter);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".perfil-in", { y: 14, opacity: 0, duration: 0.55, stagger: 0.06 });
      });
      return () => mm.revert();
    },
    { scope: profile, dependencies: [sel], revertOnUpdate: true },
  );
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".staff-card", { y: 16, opacity: 0, duration: 0.5, stagger: 0.05 });
      });
      return () => mm.revert();
    },
    { scope: grid, dependencies: [filter], revertOnUpdate: true },
  );

  const choose = (i: number) => {
    setSel(i);
    if (window.innerWidth < 1024) profile.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section
        ref={profile}
        aria-live="polite"
        aria-label={`Perfil: ${p.name}`}
        className="contenedor scroll-mt-28 pt-12 md:pt-18"
      >
        <div className="grid overflow-hidden rounded-tarjeta bg-azul md:rounded-banda lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="h-64 lg:h-auto lg:min-h-105">
            <Portrait ini={p.ini} big />
          </div>
          <div className="sobre-oscuro flex flex-col justify-center p-6 text-white md:p-12">
            <span className="perfil-in self-start rounded-pildora bg-naranja px-3 py-1.5 text-[11px] font-extrabold tracking-[.06em] text-azul uppercase">
              {p.groupLabel}
            </span>
            <h2 className="perfil-in mt-4 text-[28px] leading-tight font-extrabold tracking-[-.025em] md:text-[40px]">
              {p.name}
            </h2>
            <p className="perfil-in mt-2 text-base font-bold text-durazno-claro md:text-[17px]">{p.role}</p>
            <p className="perfil-in mt-4 max-w-190 text-[15px] leading-[1.65] text-sobre-oscuro md:text-base">
              {p.bio}
            </p>
            {p.record && (
              <div className="perfil-in mt-6 border-t border-white/14 pt-5">
                <h3 className="text-xs font-extrabold tracking-[.12em] text-naranja uppercase">
                  Formación y trayectoria
                </h3>
                <ul className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2">
                  {p.record.map((r) => (
                    <li key={r} className="flex gap-2.5 text-[13.5px] leading-normal text-sobre-oscuro">
                      <span aria-hidden className="mt-1.75 size-1.5 shrink-0 rounded-pildora bg-naranja" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="conozcalos" className="contenedor pt-14 md:pt-18">
        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <h2 id="conozcalos" data-reveal className="text-[30px] font-extrabold tracking-[-.02em] md:text-[40px]">
            Conózcalos
          </h2>
          <div className="-mx-5 [scrollbar-width:none] overflow-x-auto px-5 md:mx-0 md:px-0">
            <PillGroup
              id="filtro-staff"
              label="Filtrar staff"
              mode="filters"
              size="sm"
              nowrap
              items={STAFF_FILTERS}
              value={filter}
              onChange={setFilter}
            />
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {people.length} profesionales
        </p>
        <ul ref={grid} className="mt-7 grid gap-3 sm:grid-cols-2 md:mt-9 md:gap-4 xl:grid-cols-4">
          {people.map((m) => {
            const on = m.i === sel;
            return (
              <li key={m.name} className="staff-card grid">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(m.i)}
                  className={`group flex tarjeta-hover cursor-pointer flex-col overflow-hidden rounded-tarjeta border-2 bg-bruma text-left text-azul transition-colors duration-300 ${
                    on ? "border-naranja" : "border-transparent hover:border-borde-boton"
                  }`}
                >
                  <span className="block h-46 overflow-hidden">
                    <span className="block h-full transition-transform duration-700 ease-(--ease-salida) group-hover:scale-[1.03]">
                      <Portrait ini={m.ini} />
                    </span>
                  </span>
                  <span className="block p-5">
                    <span className="block text-[11px] font-extrabold tracking-[.08em] text-naranja-texto uppercase">
                      {m.groupLabel}
                    </span>
                    <span className="mt-1.5 block text-[17px] leading-tight font-extrabold">{m.name}</span>
                    <span className="mt-1.5 block text-[13px] leading-[1.45] text-texto-2">{m.role}</span>
                    <span className="sr-only"> · Ver perfil</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
