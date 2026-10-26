"use client";

import { useState } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { PillGroup, tabPanelProps } from "@/components/ui/PillGroup";

/** Demostraciones interactivas de la página del sistema (textos reales del diseño). */

// Mobile.dc.html · pestañas de identidad
const IDENTIDAD = [
  {
    value: "proposito",
    label: "Propósito",
    text: "Hoy nuestro propósito es lograr escenarios de convivencia vinculante, orientados a la justicia, la paz, la educación y el liderazgo comunitario.",
  },
  {
    value: "mision",
    label: "Misión",
    text: "Facilitar a la comunidad herramientas autocompositivas que permitan una solución alternativa a los conflictos que deterioran la seguridad y la convivencia.",
  },
  {
    value: "vision",
    label: "Visión",
    text: "Para 2035, ser una institución generadora de conocimiento jurídico y académico de alto impacto en la restauración del tejido humano y social.",
  },
] as const;

export function TabsDemo() {
  const [tab, setTab] = useState<(typeof IDENTIDAD)[number]["value"]>("proposito");
  const current = IDENTIDAD.find((t) => t.value === tab)!;
  return (
    <div className="max-w-140">
      <PillGroup id="identidad" label="Identidad" items={[...IDENTIDAD]} value={tab} onChange={setTab} fill />
      <p {...tabPanelProps("identidad", tab)} className="mt-4 min-h-30 text-[15px] leading-[1.65] text-texto-cuerpo">
        {current.text}
      </p>
    </div>
  );
}

// Staff.dc.html · filtros
const FILTROS = [
  { value: "all", label: "Todos" },
  { value: "dir", label: "Dirección" },
  { value: "int", label: "Equipo interdisciplinario" },
  { value: "con", label: "Conciliación" },
  { value: "cons", label: "Consultoría" },
] as const;

export function FiltersDemo() {
  const [f, setF] = useState<(typeof FILTROS)[number]["value"]>("all");
  return (
    <PillGroup
      id="filtro-demo"
      label="Filtrar staff"
      mode="filters"
      size="sm"
      items={[...FILTROS]}
      value={f}
      onChange={setF}
    />
  );
}

// Litigio.dc.html · líneas II a IV
const LINEAS = [
  {
    num: "II",
    title: "Representación judicial nacional",
    desc: "Acompañamiento jurídico especializado ante autoridades nacionales.",
    items: [
      "Litigio contencioso administrativo ante juzgados y el Consejo de Estado por daños atribuibles al Estado",
      "Procesos penales complejos con enfoque de derechos humanos y coordinación con la justicia transicional",
    ],
  },
  {
    num: "III",
    title: "Empresas y derechos humanos",
    desc: "Apoyo a empresas que adoptan prácticas responsables.",
    items: [
      "Defensa jurídica y mitigación de riesgos",
      "Auditorías jurídicas retrospectivas y remediación no judicial",
      "Evaluaciones de impacto en derechos humanos (HRIA)",
      "Diseño de políticas, sistemas de monitoreo y capacitación",
    ],
  },
  {
    num: "IV",
    title: "Consulta previa y derechos colectivos",
    desc: "Asistencia jurídica en consulta libre, previa e informada.",
    items: [
      "Comunidades indígenas, afrodescendientes y campesinas",
      "Defensa frente a megaproyectos extractivos y de infraestructura",
    ],
  },
];

export function AccordionDemo() {
  return (
    <Accordion
      items={LINEAS.map((l) => ({
        id: l.num,
        num: l.num,
        title: l.title,
        content: (
          <>
            <p className="text-base leading-[1.6] text-texto-cuerpo">{l.desc}</p>
            <ul className="mt-4 grid gap-2 md:grid-cols-2">
              {l.items.map((it) => (
                <li key={it} className="rounded-[14px] bg-white px-4 py-3.5 text-sm leading-[1.45] font-semibold">
                  {it}
                </li>
              ))}
            </ul>
          </>
        ),
      }))}
    />
  );
}

export function ArrowsDemo() {
  const [i, setI] = useState(0);
  return (
    <div className="flex items-center gap-2.5">
      <ArrowButton direction="prev" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} />
      <ArrowButton direction="next" onClick={() => setI(Math.min(3, i + 1))} disabled={i === 3} />
      <span className="ml-2 text-sm font-semibold text-texto-2" aria-live="polite">
        Posición {i + 1} de 4
      </span>
    </div>
  );
}
