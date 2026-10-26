"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subnavegación de anclas del proyecto (PDF pág. 2): píldoras sobre contenedor bruma.
 * Queda fija bajo el encabezado al hacer scroll y resalta la sección visible.
 * En móvil se desplaza horizontalmente y centra la pestaña activa.
 */
export function SectionNav({ sections }: { sections: readonly { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0].id);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [sections]);

  // Mantener visible la pestaña activa dentro de la fila desplazable (móvil).
  useEffect(() => {
    const el = list.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const box = list.current;
    if (!el || !box || box.scrollWidth <= box.clientWidth) return;
    box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Secciones del proyecto"
      className="sticky top-21 z-30 mt-5 px-3 transition-[top] duration-500 ease-(--ease-salida) md:top-24 md:mt-7 [html[data-header=oculto]_&]:top-3"
    >
      <ul
        ref={list}
        className="mx-auto flex w-max max-w-full [scrollbar-width:none] gap-1 overflow-x-auto rounded-pildora bg-bruma/95 p-1.5 shadow-[0_10px_30px_rgba(11,42,79,.08)] backdrop-blur-md"
      >
        {sections.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id} data-id={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                onClick={() => setActive(s.id)}
                className={`flex h-11 items-center rounded-pildora px-4 text-sm font-bold no-underline transition-colors duration-300 md:px-5 ${
                  on ? "bg-azul text-white" : "text-azul hover:bg-white"
                }`}
              >
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
