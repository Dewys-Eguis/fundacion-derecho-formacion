"use client";

import { useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { DownloadIcon } from "@/components/ui/icons";
import { Pending } from "@/components/ui/typography";
import { DOC_CATEGORY, DOC_FILTERS, DOCS_INTRO, DOCS_PENDING, DOCUMENTS, type DocKind } from "@/content/interior";

type Filter = "all" | DocKind;

/**
 * Documentos de gobierno corporativo (PDF pág. 10): filtros verticales con contador y
 * lista. Los documentos aún no tienen archivo: se muestran «Por cargar» (no hay botones falsos).
 */
export function DocumentList() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = useRef<HTMLUListElement>(null);
  const docs = DOCUMENTS.filter((d) => filter === "all" || d.kind === filter);
  const count = (v: Filter) => (v === "all" ? DOCUMENTS.length : DOCUMENTS.filter((d) => d.kind === v).length);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".doc-row", { x: -10, opacity: 0, duration: 0.45, stagger: 0.04 });
      });
      return () => mm.revert();
    },
    { scope: list, dependencies: [filter], revertOnUpdate: true },
  );

  return (
    <section
      aria-labelledby="documentos"
      className="contenedor grid gap-8 pt-12 md:pt-18 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-12"
    >
      <div className="min-w-0">
        <p id="documentos" className="text-rotulo text-naranja-texto">
          Documentos
        </p>
        <p className="mt-2.5 text-[15px] leading-[1.6] text-texto-2">{DOCS_INTRO}</p>
        <div
          role="group"
          aria-label="Filtrar documentos"
          className="-mx-5 mt-5 flex [scrollbar-width:none] gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
        >
          {DOC_FILTERS.map((f) => {
            const on = f.value === filter;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.value)}
                className={`flex shrink-0 cursor-pointer items-center justify-between gap-4 rounded-2xl px-4 py-3.5 text-left text-sm font-bold whitespace-nowrap transition-colors duration-300 lg:w-full ${
                  on ? "bg-azul text-white" : "bg-bruma text-azul hover:bg-cielo"
                }`}
              >
                {f.label}
                <span className={`text-xs ${on ? "text-durazno-claro" : "text-texto-2"}`}>{count(f.value)}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="min-w-0">
        <p className="sr-only" aria-live="polite">
          {docs.length} documentos
        </p>
        <ul ref={list} className="overflow-hidden rounded-tarjeta border border-linea">
          {docs.map((d) => {
            const cert = d.kind === "cer";
            return (
              <li
                key={d.title}
                className="doc-row flex items-center gap-4 border-b border-linea px-4 py-4 transition-colors duration-300 last:border-b-0 hover:bg-bruma md:gap-5 md:px-5"
              >
                <span
                  aria-hidden
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-[11px] font-extrabold ${
                    cert ? "bg-durazno text-naranja-texto" : "bg-cielo text-accion"
                  }`}
                >
                  PDF
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] leading-snug font-extrabold md:text-base">{d.title}</span>
                  <span className="mt-0.5 block text-[13px] text-texto-2">{DOC_CATEGORY[d.kind]}</span>
                </span>
                {d.href ? (
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 shrink-0 items-center gap-1.5 rounded-pildora border-[1.5px] border-borde-boton px-4 text-[13px] font-bold text-azul no-underline hover:border-azul/40"
                  >
                    <DownloadIcon size={14} /> Ver
                  </a>
                ) : (
                  <span
                    data-pending=""
                    title="Archivo por cargar"
                    className="shrink-0 rounded-pildora border border-dashed border-borde-boton px-3 py-2 text-xs font-semibold text-texto-2"
                  >
                    Por cargar
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-[13px] text-texto-2">
          <Pending>{DOCS_PENDING}</Pending>
        </p>
      </div>
    </section>
  );
}
