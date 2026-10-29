"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { HERO_SCENES, IMPACT_CARDS, IMPACT_RIBBON, type HeroScene } from "@/content/home";
import { CTA } from "@/content/site";

/**
 * Portada de impacto del Inicio (portada-impacto/ESPECIFICACION.md · HeroImpacto.dc.html y
 * HeroImpactoMobile.dc.html). Render 3D del símbolo con Ken Burns y parallax, titular palabra por
 * palabra, 3 escenas con autoplay de 7 s y pestañas con barra de progreso, tarjeta de cristal
 * flotante, sello giratorio «Agenda tu cita» e indicador de scroll; la cinta naranja va debajo.
 *
 * Textos, botones y enlaces: los del hero vigente (HERO_SCENES). El encabezado de cristal oscuro
 * es el Header global en su variante del Inicio; la portada sube bajo él con un margen negativo.
 *
 * Autoplay: cambia cada 7 s, se pausa con hover/foco o con la pestaña del navegador oculta; elegir
 * una pestaña cambia de escena y reinicia el tiempo. Con prefers-reduced-motion no hay autoplay.
 */
const DURATION = 7;
const IMG_DESKTOP = { src: "/images/hero-3d-fundacion.jpg", width: 1920, height: 1080 };
const IMG_MOBILE = { src: "/images/hero-3d-fundacion-movil.webp", width: 900, height: 973 };

export function HeroImpacto() {
  const [index, setIndex] = useState(0);
  // Cuenta cada elección de pestaña: reinicia el temporizador aunque se pulse la escena activa.
  const [round, setRound] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLElement>(null);
  const timer = useRef<gsap.core.Tween | null>(null);
  const tabsId = useId();
  const count = HERO_SCENES.length;
  const scene = HERO_SCENES[index];

  useEffect(() => {
    const mq = window.matchMedia(MOTION_OK);
    const sync = () => setReduced(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      mq.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const hold = paused || hidden;

  // Temporizador de 7 s por escena; se reinicia en cada cambio de escena.
  useGSAP(
    () => {
      if (reduced) return;
      timer.current = gsap.delayedCall(DURATION, next);
    },
    { dependencies: [index, round, reduced], revertOnUpdate: true },
  );
  useEffect(() => {
    if (hold) timer.current?.pause();
    else timer.current?.resume();
  }, [hold, index, round, reduced]);

  // Parallax del fondo en los primeros 900 px de scroll (el Ken Burns es CSS, en la imagen).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to("[data-parallax]", {
          y: 90,
          scale: 1.04,
          ease: "none",
          scrollTrigger: { start: 0, end: 900, scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const choose = (i: number) => {
    setIndex(((i % count) + count) % count);
    setRound((r) => r + 1);
  };
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const tabs = [...(e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("[role=tab]") ?? [])];
    const to = (tabs.indexOf(e.currentTarget) + step + count) % count;
    choose(to);
    tabs[to]?.focus();
  };

  const card = IMPACT_CARDS[scene.id];
  const panelId = `${tabsId}-panel`;
  const playState = { animationPlayState: hold ? "paused" : "running" } as const;

  return (
    <>
      <section
        ref={root}
        aria-roledescription="carrusel"
        aria-label="Portada"
        className="sobre-oscuro relative isolate -mt-18 flex min-h-[max(100svh,680px)] flex-col overflow-hidden bg-noche text-white md:-mt-30 md:h-235 md:min-h-0 xl:-mt-33.5"
        onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
      >
        {/* Fondo: render 3D (escritorio y tableta) */}
        <div aria-hidden className="absolute inset-0 -z-10 hidden overflow-hidden md:block">
          <div data-parallax className="absolute inset-0">
            <Image
              {...IMG_DESKTOP}
              alt=""
              priority
              sizes="100vw"
              className="absolute inset-0 h-full w-full pi-kenburns object-cover object-[72%_20%]"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,14,26,.95)_0%,rgba(5,14,26,.8)_50%,rgba(5,14,26,.25)_90%)] xl:bg-[linear-gradient(90deg,rgba(5,14,26,.95)_0%,rgba(5,14,26,.74)_38%,rgba(5,14,26,0)_70%)]" />
          <div className="absolute inset-x-0 bottom-0 h-70 bg-[linear-gradient(0deg,rgba(5,14,26,.92),rgba(5,14,26,0))]" />
        </div>
        {/* Fondo: recorte móvil centrado en el símbolo, con velos superior e inferior */}
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden md:hidden">
          <div data-parallax className="absolute inset-x-0 top-[24%] h-[48%]">
            <Image
              {...IMG_MOBILE}
              alt=""
              priority
              sizes="100vw"
              className="h-full w-full pi-kenburns object-cover object-[50%_45%]"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,14,26,.96)_0%,rgba(5,14,26,.55)_30%,rgba(5,14,26,0)_45%,rgba(5,14,26,.85)_70%,rgba(5,14,26,1)_100%)]" />
        </div>

        <span className="absolute top-34 right-6 z-10 hidden rounded-pildora bg-noche/50 px-2.75 py-1.5 text-[11px] text-tab-inactiva md:block xl:top-38">
          Render 3D del símbolo de marca
        </span>

        <div className="relative contenedor flex w-full flex-1 flex-col pt-24.5 md:pt-44 xl:pt-51">
          {/* Escena activa: se vuelve a montar en cada cambio para repetir la entrada */}
          <div
            key={scene.id}
            id={panelId}
            role="tabpanel"
            aria-labelledby={`${tabsId}-tab-${index}`}
            aria-live={hold || reduced ? "polite" : "off"}
            className="flex max-w-220 flex-col gap-4 md:gap-7.5"
          >
            <div className="flex pi-sube flex-wrap gap-2.5">
              <span className="rounded-pildora bg-naranja px-3 py-1.5 text-[11px] font-extrabold tracking-[.1em] text-azul uppercase md:px-3.5 md:py-1.75 md:text-xs">
                {scene.chips[0]}
              </span>
              {scene.chips[1] && (
                <span className="hidden rounded-pildora bg-white/8 px-3.5 py-1.75 text-[12.5px] font-semibold text-sobre-oscuro shadow-[inset_0_0_0_1px_rgba(255,255,255,.18)] md:inline-flex">
                  {scene.chips[1]}
                </span>
              )}
            </div>
            <h1 className="m-0 text-[46px] leading-none font-extrabold tracking-[-.04em] md:text-[72px] md:leading-[.98] md:tracking-[-.045em] xl:text-[96px]">
              <Words scene={scene} />
            </h1>
            <div className="max-md:absolute max-md:inset-x-5 max-md:bottom-[calc(26px+44px+16px)] max-md:flex max-md:flex-col max-md:gap-4">
              <p className="m-0 max-w-155 pi-sube text-[15.5px] leading-[1.55] text-sobre-oscuro [animation-delay:.5s] md:text-xl md:leading-[1.6]">
                {scene.body}
              </p>
              <div className="mt-0 flex pi-sube flex-col gap-3 [animation-delay:.65s] md:mt-7.5 md:flex-row md:flex-wrap md:gap-3.5">
                <HeroCta href={scene.cta1.href} tone="primary">
                  {scene.cta1.label}
                </HeroCta>
                {scene.cta2 && (
                  <HeroCta href={scene.cta2.href} tone="glass">
                    {scene.cta2.label}
                  </HeroCta>
                )}
              </div>
            </div>
          </div>

          {/* Franja inferior: pestañas · tarjeta flotante · indicador de scroll · sello.
              En escritorio el sello va anclado a la derecha para no sumar altura a la franja. */}
          <div className="relative mt-auto flex flex-wrap items-end justify-between gap-6 pt-8 pb-6.5 md:pb-8.5 xl:flex-nowrap xl:pr-70">
            <div
              role="tablist"
              aria-label="Destacados"
              className="flex w-full gap-2 max-md:mt-auto md:grid md:grid-cols-3 md:gap-2.5 xl:w-auto xl:max-w-170 xl:min-w-0 xl:flex-1 xl:grid-cols-[repeat(3,minmax(0,220px))]"
            >
              {HERO_SCENES.map((s, i) => {
                const on = i === index;
                return (
                  <button
                    key={s.id}
                    id={`${tabsId}-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls={panelId}
                    tabIndex={on ? 0 : -1}
                    onClick={() => choose(i)}
                    onKeyDown={onTabKey}
                    className={`relative flex h-11 flex-1 cursor-pointer flex-col justify-center text-left md:h-auto md:gap-1.5 md:rounded-[18px] md:px-4.5 md:pt-4 md:pb-5 md:backdrop-blur-[14px] md:transition-[background-color,box-shadow] md:duration-300 md:hover:bg-white/12 ${
                      on
                        ? "md:bg-white/14 md:shadow-[inset_0_0_0_1px_rgba(255,255,255,.3)]"
                        : "md:bg-white/4 md:shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]"
                    }`}
                  >
                    <span className="sr-only md:not-sr-only">
                      <span
                        className={`block text-xs font-bold tracking-[.12em] ${on ? "text-naranja" : "text-tab-inactiva"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-1.5 block text-[15.5px] font-bold text-white">{s.tab}</span>
                    </span>
                    <span
                      aria-hidden
                      className="block h-0.75 overflow-hidden rounded-[3px] bg-white/18 md:absolute md:inset-x-4.5 md:bottom-2.25 md:h-0.5 md:bg-white/14"
                    >
                      {on && <span key={round} className="block h-full pi-progreso bg-naranja" style={playState} />}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="hidden max-w-82.5 pi-flota md:block xl:shrink-0" style={playState}>
              <div
                key={scene.id}
                className="flex pi-sube flex-col gap-1.5 rounded-[22px] bg-white/8 px-5.5 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,.18)] backdrop-blur-[16px] [animation-delay:.35s]"
              >
                <span className="text-[11.5px] font-extrabold tracking-[.14em] text-naranja uppercase">
                  {card.kicker}
                </span>
                <b className="text-[19px] leading-[1.25]">{card.title}</b>
                {card.detail && <span className="text-[13.5px] text-sobre-oscuro">{card.detail}</span>}
              </div>
            </div>

            <div className="hidden shrink-0 items-center gap-7 md:flex xl:absolute xl:right-0 xl:bottom-8.5">
              <span
                aria-hidden
                className="hidden flex-col items-center gap-2.5 text-[10.5px] font-bold tracking-[.2em] text-tab-inactiva xl:inline-flex"
              >
                SCROLL
                <span className="flex h-10.5 w-6.5 justify-center rounded-[14px] pt-2 shadow-[inset_0_0_0_1.5px_rgba(255,255,255,.35)]">
                  <span className="h-2 w-1 pi-raton rounded-xs bg-white" />
                </span>
              </span>
              <Seal size={168} />
            </div>
          </div>
        </div>

        {/* Sello móvil sobre la imagen */}
        <div className="absolute top-[52%] right-4.5 z-10 md:hidden">
          <Seal size={96} />
        </div>
      </section>
      <ImpactRibbon />
    </>
  );
}

/** Titular palabra por palabra; la segunda parte (t2) va en serif cursiva durazno. */
function Words({ scene }: { scene: HeroScene }) {
  const words = [
    ...scene.t1.split(" ").map((t) => ({ t, accent: false })),
    ...scene.t2.split(" ").map((t) => ({ t, accent: true })),
  ];
  return words.map((w, i) => (
    <span key={`${scene.id}-${i}`}>
      <span
        className={`pi-palabra ${w.accent ? "font-serif font-normal tracking-[-.01em] text-durazno-claro italic" : ""}`}
        style={{ animationDelay: `${(0.08 + i * 0.08).toFixed(2)}s` }}
      >
        {w.t}
      </span>{" "}
    </span>
  ));
}

const CTA_TONE = {
  primary: [
    "bg-naranja text-azul font-extrabold shadow-[0_18px_44px_-16px_rgba(244,145,77,.75)] hover:bg-[#FFA466]",
    "bg-azul text-white",
  ],
  glass: [
    "bg-white/8 text-white font-bold shadow-[inset_0_0_0_1px_rgba(255,255,255,.24)] backdrop-blur-md hover:bg-white/16",
    "bg-white/14 text-white",
  ],
} as const;

/**
 * Botón de la portada: píldora de 60 px con flecha en círculo que gira -45° en hover.
 * Mismo criterio de enlaces que ButtonLink: rutas internas con next/link; WhatsApp, Wompi y PDF
 * en pestaña nueva.
 */
function HeroCta({ href, tone, children }: { href: string; tone: keyof typeof CTA_TONE; children: string }) {
  const [box, circle] = CTA_TONE[tone];
  const cls = `group flex h-14 items-center justify-between gap-3.5 rounded-pildora pr-2 pl-6 text-[15px] whitespace-nowrap no-underline transition-[transform,background-color] duration-400 ease-(--ease-galeria) hover:-translate-y-0.5 md:inline-flex md:h-15 md:pl-7 md:text-[15.5px] ${box}`;
  const inner = (
    <>
      {children}
      <span
        aria-hidden
        className={`flex size-10 items-center justify-center rounded-full transition-transform duration-400 ease-(--ease-galeria) group-hover:scale-106 group-hover:-rotate-45 md:size-11 ${circle}`}
      >
        <ArrowRight size={18} />
      </span>
    </>
  );
  const file = /\.pdf$/i.test(href);
  if (!file && href.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  );
}

/** Sello naranja con texto circular giratorio; enlaza a «Agenda tu cita» (WhatsApp). */
function Seal({ size }: { size: number }) {
  const id = useId();
  const big = size > 120;
  return (
    <a
      href={CTA.agenda.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agenda tu cita por WhatsApp (se abre en una pestaña nueva)"
      className="relative flex items-center justify-center rounded-full bg-naranja text-azul shadow-[0_30px_70px_-20px_rgba(244,145,77,.8)] transition-transform duration-300 hover:scale-105"
      style={{ width: size, height: size }}
    >
      <svg aria-hidden viewBox="0 0 200 200" width={size} height={size} className="absolute inset-0 pi-gira">
        <defs>
          <path
            id={id}
            d={
              big
                ? "M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
                : "M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0"
            }
          />
        </defs>
        <text fill="#0B2A4F" fontSize={big ? 14 : 17} fontWeight={800} letterSpacing={big ? 1 : 0}>
          <textPath href={`#${id}`} textLength={big ? 460 : 436} lengthAdjust="spacing">
            AGENDA TU CITA ✦ TEJIDO HUMANO ✦{" "}
          </textPath>
        </text>
      </svg>
      <ArrowUpRight size={big ? 34 : 22} />
    </a>
  );
}

/** Cinta naranja en desplazamiento infinito (contenido duplicado; la copia se oculta a lectores). */
function ImpactRibbon() {
  const row = (copy: boolean) => (
    <span
      aria-hidden={copy || undefined}
      className="flex items-center gap-7 pr-7 text-lg font-extrabold whitespace-nowrap text-azul md:gap-10.5 md:pr-10.5 md:text-2xl"
    >
      {IMPACT_RIBBON.map((t) => (
        <span key={t} className="flex items-center gap-7 md:gap-10.5">
          {t}
          <span aria-hidden className="opacity-50">
            ✦
          </span>
        </span>
      ))}
    </span>
  );
  return (
    <div className="overflow-hidden bg-naranja py-4 md:py-5">
      <div className="flex w-max pi-cinta">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
