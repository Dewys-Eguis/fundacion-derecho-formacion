"use client";

import { useDeferredValue, useEffect, useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { CloseIcon } from "@/components/ui/icons";
import {
  COURSE_CATEGORY,
  COURSE_FILTERS,
  COURSE_SIGNUP_URL,
  COURSES,
  type Course,
  type CourseKind,
} from "@/content/interior";

type Filter = "all" | CourseKind;

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

function CategoryChip({ kind }: { kind: CourseKind }) {
  return (
    <span
      className={`rounded-pildora px-2.5 py-1 text-[11px] font-extrabold ${
        kind === "ia" ? "bg-durazno text-naranja-texto" : "bg-cielo text-accion"
      }`}
    >
      {COURSE_CATEGORY[kind]}
    </span>
  );
}

/**
 * Catálogo de 21 diplomados (PDF pág. 16): buscador (título y descripción, sin
 * distinguir tildes) + filtros por categoría + contador. Cada tarjeta abre su ficha
 * completa («Ver detalles») e «Inscribirme gratis» lleva al formulario de inscripción
 * del sitio actual (Google Forms, pestaña nueva).
 */
export function CourseCatalog() {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Course | null>(null);
  const query = useDeferredValue(q);
  const grid = useRef<HTMLUListElement>(null);
  const items = COURSES.filter(
    (c) =>
      (filter === "all" || c.kind === filter) &&
      (!query || norm(`${c.title} ${c.desc} ${c.intro}`).includes(norm(query))),
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
        {items.map((c) => (
          <li key={c.title} className="curso grid">
            {/* La tarjeta entera abre la ficha (botón extendido); «Inscribirme» queda por encima. */}
            <article className="group relative flex tarjeta-hover flex-col rounded-3xl border border-linea bg-white p-6 text-azul">
              <span className="flex items-center justify-between gap-3">
                <CategoryChip kind={c.kind} />
                <span className="text-[11px] font-bold text-texto-2">Virtual · Gratis</span>
              </span>
              <h2 className="mt-4 block text-[19px] leading-tight font-extrabold">{c.title}</h2>
              <p className="mt-2 block flex-1 text-[13.5px] leading-normal text-texto-2">{c.desc}</p>
              <span className="mt-5 flex items-center justify-between gap-3 border-t border-linea pt-4 text-[13px] font-extrabold">
                <button
                  type="button"
                  onClick={() => setOpen(c)}
                  aria-haspopup="dialog"
                  aria-label={`Ver detalles: ${c.title}`}
                  className="cursor-pointer text-accion after:absolute after:inset-0 after:rounded-3xl after:content-[''] hover:underline"
                >
                  Ver detalles
                </button>
                <a
                  href={COURSE_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Inscribirme gratis en ${c.title} (formulario externo, se abre en una pestaña nueva)`}
                  className="group/ins relative z-10 inline-flex items-center gap-2 text-naranja-texto no-underline hover:underline"
                >
                  Inscribirme gratis
                  <span aria-hidden className="transition-transform duration-300 group-hover/ins:translate-x-1">
                    →
                  </span>
                </a>
              </span>
            </article>
          </li>
        ))}
      </ul>
      {items.length === 0 && (
        <p className="mt-6 rounded-3xl bg-bruma p-6 text-[15px] text-texto-cuerpo">
          No hay diplomados que coincidan con «{q}». Pruebe con otra palabra o elija «Todos».
        </p>
      )}
      <CourseDialog course={open} onClose={() => setOpen(null)} />
    </section>
  );
}

/**
 * Ficha completa de un diplomado en un <dialog> nativo: atrapa el foco, se cierra con
 * Escape, con el botón o con clic fuera, y devuelve el foco a la tarjeta.
 */
function CourseDialog({ course, onClose }: { course: Course | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d || !course) return;
    if (!d.open) d.showModal();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [course]);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="curso-titulo"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto max-h-[calc(100dvh-24px)] w-[min(680px,calc(100%-24px))] overflow-y-auto overscroll-contain rounded-tarjeta bg-white p-0 text-azul shadow-tarjeta backdrop:bg-noche/70 backdrop:backdrop-blur-sm open:animate-[aparecer_.3s_ease-out] md:rounded-banda"
    >
      {course && (
        <div className="p-6 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <span className="flex flex-wrap items-center gap-2.5 pt-2">
              <CategoryChip kind={course.kind} />
              <span className="text-[11px] font-bold text-texto-2">Virtual · Gratis</span>
            </span>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={close}
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-pildora bg-bruma text-azul transition-transform duration-300 hover:rotate-90"
            >
              <CloseIcon />
            </button>
          </div>
          <h2
            id="curso-titulo"
            className="mt-4 text-[26px] leading-[1.1] font-extrabold tracking-[-.02em] md:text-[32px]"
          >
            {course.title}
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-texto-cuerpo md:text-base">{course.intro}</p>

          <h3 className="mt-7 text-[13px] font-extrabold tracking-[.08em] text-naranja-texto uppercase">
            Con este diplomado serás capaz de
          </h3>
          {course.goals ? (
            <ul className="mt-3 grid gap-2.5">
              {course.goals.map((g) => (
                <li key={g} className="flex gap-3 text-[15px] leading-normal text-texto-cuerpo">
                  <span aria-hidden className="mt-2 size-2 shrink-0 rounded-pildora bg-naranja" />
                  {g}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 rounded-3xl bg-bruma p-4 text-[14px] text-texto-2">
              [Objetivos por confirmar con la Fundación]
            </p>
          )}

          <p className="mt-7 rounded-3xl bg-durazno p-4 text-[14px] leading-normal text-azul">
            La inscripción y el estudio son gratuitos; solo se paga el certificado.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ButtonLink href={COURSE_SIGNUP_URL} arrow>
              Inscribirme gratis
            </ButtonLink>
            <span className="text-[12.5px] text-texto-2">Formulario de inscripción · se abre en una pestaña nueva</span>
          </div>
        </div>
      )}
    </dialog>
  );
}
