"use client";

import { useState } from "react";
import { PillGroup, panelId, tabId } from "@/components/ui/PillGroup";
import { IDENTITY } from "@/content/home";

type Key = (typeof IDENTITY)[number]["value"];

/**
 * Pestañas Propósito / Misión / Visión 2035 (PDF pág. 1 y 4). Los tres paneles
 * ocupan la misma celda: la altura es la del texto más largo y nada se desplaza
 * al cambiar de pestaña. El panel activo entra con un fundido suave.
 */
export function IdentityTabs() {
  const [tab, setTab] = useState<Key>("proposito");
  return (
    <>
      <PillGroup
        id="identidad"
        label="Identidad institucional"
        items={[...IDENTITY]}
        value={tab}
        onChange={setTab}
        fill
        className="mt-6 md:mt-8 md:inline-grid md:w-auto md:auto-cols-auto"
      />
      <div className="mt-5 grid md:mt-7">
        {IDENTITY.map((t) => {
          const active = t.value === tab;
          return (
            <p
              key={t.value}
              role="tabpanel"
              id={panelId("identidad", t.value)}
              aria-labelledby={tabId("identidad", t.value)}
              tabIndex={active ? 0 : -1}
              className={`max-w-180 text-base leading-[1.65] text-texto-cuerpo transition-[opacity,translate] duration-500 ease-(--ease-salida) [grid-area:1/1] md:text-lg ${
                active ? "visible translate-y-0 opacity-100" : "invisible translate-y-1.5 opacity-0"
              }`}
            >
              {t.text}
            </p>
          );
        })}
      </div>
    </>
  );
}
