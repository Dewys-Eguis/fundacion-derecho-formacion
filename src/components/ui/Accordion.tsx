"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Acordeón de Litigio.dc.html: número en cuadro blanco, título 22 px y botón
 * circular azul con +/–. Un solo panel abierto a la vez; pulsarlo de nuevo lo cierra.
 * La apertura anima la altura con grid-template-rows (sin medir el DOM).
 */
export type AccordionItem = { id: string; num?: string; title: string; content: ReactNode };

export function Accordion({
  items,
  defaultOpen = 0,
  className = "",
}: {
  items: AccordionItem[];
  /** Índice abierto inicialmente; -1 = todos cerrados. */
  defaultOpen?: number;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${uid}-btn-${item.id}`;
        const panel = `${uid}-panel-${item.id}`;
        return (
          <div
            key={item.id}
            className={`rounded-3xl border border-linea transition-colors duration-300 ${isOpen ? "bg-bruma" : "bg-white"}`}
          >
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left text-azul md:gap-5 md:px-7 md:py-6"
              >
                {item.num && (
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-linea bg-white text-[15px] font-extrabold text-naranja md:size-13">
                    {item.num}
                  </span>
                )}
                <span className="flex-1 text-lg font-extrabold md:text-[22px]">{item.title}</span>
                <span
                  aria-hidden
                  className="relative flex size-11 shrink-0 items-center justify-center rounded-pildora bg-azul text-white transition-colors duration-300 group-hover:bg-accion"
                >
                  <span className="absolute h-0.5 w-3.5 bg-current" />
                  <span
                    className={`absolute h-3.5 w-0.5 bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-500 ease-(--ease-salida) ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className={`px-5 pb-6 md:px-7 md:pb-7 ${item.num ? "md:pl-25" : ""}`}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
