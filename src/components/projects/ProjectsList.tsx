"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { DownloadIcon } from "@/components/ui/icons";
import { PillGroup } from "@/components/ui/PillGroup";
import { PROJECT_FILTERS, PROJECTS_ALL, type ProjectKind } from "@/content/projects";

type Filter = "all" | ProjectKind;

/**
 * «Todos los proyectos» (PDF pág. 3): filtros en píldora + filas con imagen o
 * placeholder celeste, categoría/aliado, título, descripción y acciones.
 * Al filtrar, las tarjetas visibles entran con un fundido escalonado.
 */
export function ProjectsList() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = useRef<HTMLUListElement>(null);
  const items = PROJECTS_ALL.filter((p) => filter === "all" || p.kind === filter);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".proyecto-item", { y: 16, opacity: 0, duration: 0.55, stagger: 0.07, ease: "power3.out" });
      });
      return () => mm.revert();
    },
    { scope: list, dependencies: [filter], revertOnUpdate: true },
  );

  return (
    <section aria-labelledby="todos" className="contenedor pt-16 md:pt-18">
      <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
        <h2 id="todos" data-reveal className="text-[30px] font-extrabold tracking-[-.02em] md:text-[40px]">
          Todos los proyectos
        </h2>
        <div className="-mx-5 [scrollbar-width:none] overflow-x-auto px-5 md:mx-0 md:px-0">
          <PillGroup
            id="filtro-proyectos"
            label="Filtrar proyectos"
            mode="filters"
            size="sm"
            items={PROJECT_FILTERS}
            value={filter}
            onChange={setFilter}
            nowrap
          />
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {items.length === 1 ? "1 proyecto" : `${items.length} proyectos`}
      </p>
      <ul ref={list} className="mt-6 flex flex-col gap-4 md:mt-9 md:gap-5">
        {items.map((p) => (
          <li
            key={p.title}
            className="proyecto-item group grid gap-6 rounded-tarjeta border border-linea bg-white p-3.5 transition-shadow duration-300 hover:shadow-tarjeta md:p-5 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-center lg:gap-10 xl:grid-cols-[minmax(0,480px)_minmax(0,1fr)] xl:gap-12"
          >
            <div className="relative aspect-[3/2] overflow-hidden rounded-[22px] lg:aspect-[480/320]">
              {p.image ? (
                <Image
                  src={p.image.src}
                  width={p.image.width}
                  height={p.image.height}
                  alt={p.image.alt}
                  sizes="(min-width: 1280px) 480px, (min-width: 1024px) 420px, 100vw"
                  className="h-full w-full zoom-suave object-cover"
                  style={{ objectPosition: p.image.pos }}
                />
              ) : (
                <div role="img" aria-label={p.imageNote} data-pending="" className="h-full w-full marcador-foto" />
              )}
              <span className="absolute top-3.5 left-3.5 rounded-pildora bg-white px-3 py-1.5 text-xs font-bold text-accion">
                {p.cat}
              </span>
              <span
                data-pending={p.image ? undefined : ""}
                className="absolute bottom-3.5 left-3.5 rounded-lg bg-white/92 px-2.5 py-1.5 text-[11.5px] font-semibold text-texto-2"
              >
                {p.image ? p.imageNote : `[${p.imageNote}]`}
              </span>
            </div>
            <div className="px-2 pb-3 md:px-3 lg:px-0 lg:py-4 lg:pr-6">
              <p className="text-[13px] font-bold text-naranja-texto">{p.partner}</p>
              <h3 className="mt-2.5 text-[22px] leading-[1.12] font-extrabold tracking-[-.02em] md:text-[31px]">
                {p.title}
              </h3>
              <p className="mt-3.5 text-[15px] leading-[1.65] text-texto-cuerpo md:text-[16.5px]">{p.desc}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink
                  href={p.pdf}
                  variant="secondary"
                  icon={<DownloadIcon />}
                  className="h-13 border-naranja px-5.5 text-naranja-texto before:bg-durazno hover:border-naranja"
                  aria-label={`Descargar proyecto: ${p.title} (PDF, se abre en una pestaña nueva)`}
                >
                  Descargar proyecto
                </ButtonLink>
                {p.page && (
                  <ButtonLink href={p.page} variant="dark" className="h-13 px-5.5">
                    Ver página del proyecto
                  </ButtonLink>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
