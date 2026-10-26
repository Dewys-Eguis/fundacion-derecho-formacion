"use client";

import { useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { PillGroup } from "@/components/ui/PillGroup";
import { CONCILIATION, EDU_CATEGORY, EDU_ITEMS, JEP_TOPICS, LEGAL_AREAS, type EduKind } from "@/content/interior";
import { CTA } from "@/content/site";

/** Pestañas con flechas del teclado (patrón WAI-ARIA tabs). */
function useTabs(count: number, initial = 0) {
  const [sel, setSel] = useState(initial);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const last = count - 1;
    const keys: Record<string, number> = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowDown: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      ArrowUp: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    refs.current[next]?.focus();
    setSel(next);
  };
  return { sel, setSel, refs, onKeyDown };
}

/** Entrada suave del panel al cambiar de pestaña. */
function usePanelIn(scope: RefObject<HTMLElement | null>, dep: unknown) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".panel-in", { y: 12, opacity: 0, duration: 0.5, stagger: 0.03 });
      });
      return () => mm.revert();
    },
    { scope, dependencies: [dep], revertOnUpdate: true },
  );
}

/* ---------- Estudio legal: portafolio jurídico (PDF pág. 11) ---------- */
export function PracticeAreas() {
  const { sel, refs, onKeyDown, setSel } = useTabs(LEGAL_AREAS.length);
  const panel = useRef<HTMLDivElement>(null);
  usePanelIn(panel, sel);
  const cur = LEGAL_AREAS[sel];
  return (
    <>
      <div
        role="tablist"
        aria-label="Áreas de práctica"
        className="mt-8 grid grid-cols-2 gap-2.5 md:mt-10 md:grid-cols-3 xl:grid-cols-5 xl:gap-3"
      >
        {LEGAL_AREAS.map((a, i) => {
          const on = i === sel;
          return (
            <button
              key={a.label}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`area-tab-${i}`}
              aria-selected={on}
              aria-controls="area-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setSel(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`cursor-pointer rounded-[20px] border-2 p-4 text-left transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 md:p-5 ${
                on ? "border-azul bg-azul text-white" : "border-linea bg-white text-azul hover:border-borde-boton"
              } ${i === LEGAL_AREAS.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
            >
              <span className={`block text-xs font-extrabold ${on ? "text-naranja" : "text-naranja-texto"}`}>
                0{i + 1}
              </span>
              <span className="mt-1.5 block text-base leading-tight font-extrabold md:text-lg">{a.label}</span>
            </button>
          );
        })}
      </div>
      <div
        ref={panel}
        id="area-panel"
        role="tabpanel"
        aria-labelledby={`area-tab-${sel}`}
        className="mt-3 grid gap-7 rounded-tarjeta bg-bruma p-6 md:rounded-banda md:p-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-10"
      >
        <div>
          <h3 className="panel-in text-[28px] font-extrabold tracking-[-.02em] md:text-4xl">{cur.label}</h3>
          <p className="panel-in mt-4 text-[15px] leading-[1.65] text-texto-cuerpo md:text-base">{cur.def}</p>
          <ButtonLink href={CTA.agenda.href} arrow className="panel-in mt-6 h-12.5 px-5.5 text-sm font-extrabold">
            Solicitar asesoría
          </ButtonLink>
        </div>
        <ul className="grid content-start gap-2 sm:grid-cols-2">
          {cur.actions.map((a) => (
            <li
              key={a}
              className="panel-in flex items-center gap-3 rounded-[14px] bg-white px-4 py-3 text-sm font-bold"
            >
              <span aria-hidden className="size-1.5 shrink-0 rounded-pildora bg-accion" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ---------- Conciliación: asuntos conciliables (PDF pág. 13) ---------- */
type MatterTab = "all" | "civ" | "fam";
export function Matters() {
  const [tab, setTab] = useState<MatterTab>("all");
  const list = useRef<HTMLUListElement>(null);
  usePanelIn(list, tab);
  const items = tab === "all" ? [...CONCILIATION.matters.civ, ...CONCILIATION.matters.fam] : CONCILIATION.matters[tab];
  return (
    <>
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-rotulo text-naranja-texto">Asuntos conciliables</p>
          <h2 id="asuntos" className="mt-3 text-[28px] font-extrabold tracking-[-.02em] md:text-[40px]">
            ¿Qué se puede conciliar?
          </h2>
        </div>
        <PillGroup
          id="asuntos-tabs"
          label="Tipo de asunto"
          size="sm"
          surface="white"
          items={[
            { value: "all", label: "Todos" },
            { value: "civ", label: "Civil y comercial" },
            { value: "fam", label: "Familia" },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>
      <ul
        ref={list}
        role="tabpanel"
        id={`asuntos-tabs-panel-${tab}`}
        aria-labelledby={`asuntos-tabs-tab-${tab}`}
        className="mt-7 flex flex-wrap gap-2"
      >
        {items.map((m) => (
          <li
            key={m}
            className="panel-in rounded-pildora bg-white px-4 py-2.5 text-sm font-bold transition-transform duration-300 hover:-translate-y-0.5"
          >
            {m}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[13px] text-texto-2">Entre otros asuntos.</p>
    </>
  );
}

/* ---------- Educación para la paz: productos y servicios (PDF pág. 14) ---------- */
type EduTab = "all" | EduKind;
export function EduServices() {
  const [tab, setTab] = useState<EduTab>("all");
  const list = useRef<HTMLUListElement>(null);
  usePanelIn(list, tab);
  const items = EDU_ITEMS.filter((i) => tab === "all" || i.kind === tab);
  return (
    <>
      <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <p className="text-rotulo text-naranja-texto">Productos y servicios</p>
          <h2
            id="productos"
            className="mt-3 text-[28px] leading-tight font-extrabold tracking-[-.025em] md:text-[44px]"
          >
            Construimos paz{" "}
            <em className="font-serif font-normal tracking-[-.02em] text-accion italic">desde la educación.</em>
          </h2>
        </div>
        <div className="-mx-5 [scrollbar-width:none] overflow-x-auto px-5 md:mx-0 md:px-0">
          <PillGroup
            id="edu-tabs"
            label="Tipo de servicio"
            size="sm"
            nowrap
            items={[
              { value: "all", label: "Todos" },
              { value: "for", label: "Formación" },
              { value: "pro", label: "Proyectos y políticas" },
              { value: "inv", label: "Investigación" },
            ]}
            value={tab}
            onChange={setTab}
          />
        </div>
      </div>
      <ul
        ref={list}
        role="tabpanel"
        id={`edu-tabs-panel-${tab}`}
        aria-labelledby={`edu-tabs-tab-${tab}`}
        className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-10 md:gap-4 xl:grid-cols-3"
      >
        {items.map((it) => {
          const pro = it.kind === "pro";
          return (
            <li
              key={it.text}
              className={`panel-in flex min-h-40 tarjeta-hover flex-col justify-between gap-5 rounded-3xl p-6 ${pro ? "bg-durazno" : "bg-bruma"}`}
            >
              <span
                className={`text-[11px] font-extrabold tracking-[.08em] uppercase ${pro ? "text-naranja-texto" : "text-accion"}`}
              >
                {EDU_CATEGORY[it.kind]}
              </span>
              <span className="text-base leading-[1.4] font-bold">{it.text}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/* ---------- Justicia especial para la paz: pestañas verticales (PDF pág. 15) ---------- */
export function JepTopics() {
  const { sel, refs, onKeyDown, setSel } = useTabs(JEP_TOPICS.length);
  const panel = useRef<HTMLDivElement>(null);
  usePanelIn(panel, sel);
  const cur = JEP_TOPICS[sel];
  return (
    <div className="grid gap-4 lg:grid-cols-[420px_minmax(0,1fr)]">
      <div role="tablist" aria-label="Temas" aria-orientation="vertical" className="flex flex-col gap-2.5">
        {JEP_TOPICS.map((t, i) => {
          const on = i === sel;
          return (
            <button
              key={t.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`jep-tab-${i}`}
              aria-selected={on}
              aria-controls="jep-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setSel(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`flex cursor-pointer items-center gap-4 rounded-[20px] border-2 px-5 py-4 text-left text-base font-extrabold transition-[background-color,border-color,transform] duration-300 hover:translate-x-1 md:text-[17px] ${
                on ? "border-azul bg-azul text-white" : "border-linea bg-white text-azul hover:border-borde-boton"
              }`}
            >
              <span className={`text-xs ${on ? "text-naranja" : "text-naranja-texto"}`}>0{i + 1}</span>
              {t.title}
            </button>
          );
        })}
      </div>
      <div
        ref={panel}
        id="jep-panel"
        role="tabpanel"
        aria-labelledby={`jep-tab-${sel}`}
        className="relative isolate min-h-75 overflow-hidden rounded-tarjeta bg-bruma p-7 md:rounded-banda md:p-14"
      >
        <span
          aria-hidden
          data-float="8"
          className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-pildora bg-white"
        />
        <svg
          aria-hidden
          viewBox="0 0 900 200"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 w-full"
          fill="none"
        >
          <path
            data-draw=""
            d="M110 190 C 300 150, 520 200, 700 170 S 860 120, 900 112"
            stroke="#F4914D"
            strokeWidth="2"
          />
        </svg>
        <div className="panel-in text-[44px] leading-none font-extrabold text-naranja md:text-5xl">0{sel + 1}</div>
        <h3 className="panel-in mt-3 text-[26px] leading-tight font-extrabold tracking-[-.02em] md:text-[34px]">
          {cur.title}
        </h3>
        <p className="panel-in mt-4 max-w-170 text-[15px] leading-[1.65] text-texto-cuerpo md:text-[17px]">
          {cur.text}
        </p>
      </div>
    </div>
  );
}
