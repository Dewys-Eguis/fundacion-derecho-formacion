"use client";

import Link from "next/link";
import { useDeferredValue, useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { COURSE_CATEGORY, COURSE_FILTERS, COURSES, type CourseKind } from "@/content/interior";
import { ROUTES } from "@/content/routes";

type Filter = "all" | CourseKind;

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

/**
 * Catálogo de 21 diplomados (PDF pág. 16): buscador (título y descripción, sin
 * distinguir tildes) + filtros por categoría + contador. «Inscribirme gratis» lleva a
 * Contáctenos: el sitio actual no tiene un formulario de inscripción propio.
 */
export function CourseCatalog() {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");
  const query = useDeferredValue(q);
  const grid = useRef<HTMLUListElement>(null);
  const items = COURSES.filter(
    (c) => (filter === "all" || c.kind === filter) && (!query || norm(`${c.title} ${c.desc}`).includes(norm(query))),
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".curso", { y: 14, opacity: 0, duration: 0.45, stagger: 0.025 });
      });
      return () => mm.revert();
    },
    { scope: grid, dependencies: [filter, query], revertOnUpdate: true },
  );

  return (
    <section aria-label="Catálogo de diplomados" className="contenedor pt-12 md:pt-18">
      <div className="flex flex-col gap-3 rounded-tarjeta bg-bruma p-3 md:rounded-pildora lg:flex-row lg:items-center">
        <label className="relative flex flex-1 items-center">
          <span className="sr-only">Buscar diplomado</span>
          <svg
            aria-hidden
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="absolute left-4 text-texto-2"
          >
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar diplomado…"
            className="h-12 w-full rounded-pildora border border-linea bg-white pr-4 pl-11 text-[15px] text-azul placeholder:text-texto-2 focus:border-accion"
          />
        </label>
        <div
          role="group"
          aria-label="Filtrar por categoría"
          className="-mx-3 flex [scrollbar-width:none] gap-1.5 overflow-x-auto px-3 lg:mx-0 lg:px-0"
        >
          {COURSE_FILTERS.map((f) => {
            const on = f.value === filter;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.value)}
                className={`h-12 shrink-0 cursor-pointer rounded-pildora px-4.5 text-sm font-bold transition-colors duration-300 ${
                  on ? "bg-azul text-white" : "bg-white text-azul hover:bg-cielo"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-4 text-[13px] text-texto-2" aria-live="polite">
        Mostrando {items.length} de {COURSES.length} diplomados
      </p>
      <ul ref={grid} className="mt-5 grid gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {items.map((c) => {
          const ia = c.kind === "ia";
          return (
            <li key={c.title} className="curso grid">
              <Link
                href={`${ROUTES.contacto}#escribanos`}
                className="group flex tarjeta-hover flex-col rounded-3xl border border-linea bg-white p-6 text-azul no-underline"
              >
                <span className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-pildora px-2.5 py-1 text-[11px] font-extrabold ${
                      ia ? "bg-durazno text-naranja-texto" : "bg-cielo text-accion"
                    }`}
                  >
                    {COURSE_CATEGORY[c.kind]}
                  </span>
                  <span className="text-[11px] font-bold text-texto-2">Virtual · Gratis</span>
                </span>
                <span className="mt-4 block text-[19px] leading-tight font-extrabold">{c.title}</span>
                <span className="mt-2 block flex-1 text-[13.5px] leading-normal text-texto-2">{c.desc}</span>
                <span className="mt-5 flex items-center justify-between border-t border-linea pt-4 text-[13px] font-extrabold text-naranja-texto">
                  Inscribirme gratis
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {items.length === 0 && (
        <p className="mt-6 rounded-3xl bg-bruma p-6 text-[15px] text-texto-cuerpo">
          No hay diplomados que coincidan con «{q}». Pruebe con otra palabra o elija «Todos».
        </p>
      )}
    </section>
  );
}
