"use client";

import { useRef, type KeyboardEvent } from "react";

/**
 * Píldoras sobre contenedor Bruma; la activa en azul institucional (Tabs / Filters del handoff).
 *  mode="tabs"    role="tablist" + role="tab", flechas/Inicio/Fin con foco itinerante.
 *                 El panel debe usar tabPanelProps(id, value).
 *  mode="filters" grupo de botones con aria-pressed (los filtros no son pestañas).
 */
export type PillItem<T extends string> = { value: T; label: string; count?: number };

type PillGroupProps<T extends string> = {
  id: string;
  label: string;
  items: PillItem<T>[];
  value: T;
  onChange: (value: T) => void;
  mode?: "tabs" | "filters";
  /** fill = reparte el ancho (tabs del móvil); size md = 44 px, sm = 40 px. */
  fill?: boolean;
  /** Mantener en una sola fila (el contenedor padre se encarga del desplazamiento). */
  nowrap?: boolean;
  /** Fondo del contenedor (blanco cuando va sobre una banda bruma). */
  surface?: "bruma" | "white";
  size?: "sm" | "md";
  className?: string;
};

export const tabId = (id: string, value: string) => `${id}-tab-${value}`;
export const panelId = (id: string, value: string) => `${id}-panel-${value}`;
export const tabPanelProps = (id: string, value: string) => ({
  role: "tabpanel" as const,
  id: panelId(id, value),
  "aria-labelledby": tabId(id, value),
  tabIndex: 0,
});

export function PillGroup<T extends string>({
  id,
  label,
  items,
  value,
  onChange,
  mode = "tabs",
  fill = false,
  nowrap = false,
  surface = "bruma",
  size = "md",
  className = "",
}: PillGroupProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabs = mode === "tabs";

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    if (!tabs) return;
    const last = items.length - 1;
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    refs.current[next]?.focus();
    onChange(items[next].value);
  };

  return (
    <div
      role={tabs ? "tablist" : "group"}
      aria-label={label}
      className={`${fill ? "grid w-full auto-cols-fr grid-flow-col" : `inline-flex ${nowrap ? "flex-nowrap" : "flex-wrap"}`} gap-1 rounded-pildora ${surface === "white" ? "bg-white" : "bg-bruma"} p-1 ${className}`}
    >
      {items.map((item, i) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            {...(tabs
              ? {
                  role: "tab",
                  id: tabId(id, item.value),
                  "aria-selected": active,
                  "aria-controls": panelId(id, item.value),
                  tabIndex: active ? 0 : -1,
                }
              : { "aria-pressed": active })}
            onClick={() => onChange(item.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-pildora px-4 font-bold whitespace-nowrap transition-colors duration-300 ${
              size === "md" ? "h-11 text-[13px] font-extrabold md:text-sm" : "h-10 text-sm"
            } ${active ? "bg-azul text-white" : `text-azul ${surface === "white" ? "hover:bg-bruma" : "hover:bg-white"}`}`}
          >
            {item.label}
            {item.count !== undefined && (
              <span className={`text-xs font-extrabold ${active ? "text-durazno-claro" : "text-texto-2"}`}>
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
