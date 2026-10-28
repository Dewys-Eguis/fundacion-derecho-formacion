"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { HERO_SCENES, SCENE_CARDS, type HeroScene, type SceneCard } from "@/content/home";
import { SOLAR_SCENE_SVG, SOLAR_SCENE_VIEWBOX } from "@/content/solar-illustration";

/**
 * Hero claro del diseño aprobado (PDF pág. 1 escritorio · pág. 4 móvil).
 * Banda redondeada con 3 escenas: Proyecto solar (ilustración de ProyectoSolar),
 * Conciliación (durazno, círculos y tarjeta del Ministerio de Justicia) y
 * Diplomados (cielo). Pestañas en píldora con flecha, como en la referencia.
 *
 * Movimiento: fundido entre escenas, entrada escalonada del texto, círculos y
 * línea que se dibujan al entrar y flotan muy levemente (solo decoración).
 * Autoplay 7 s; se pausa con hover/foco/pestaña oculta y se detiene al elegir
 * una escena. Con prefers-reduced-motion no hay autoplay ni movimiento.
 */
const START = 1; // La referencia de escritorio muestra «Conciliación» activa.
const BG: Record<HeroScene["bg"], string> = {
  durazno: "bg-durazno",
  cielo: "bg-cielo",
  ilustracion: "bg-cielo",
};

export function HeroSlider() {
  const [index, setIndex] = useState(START);
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLElement>(null);
  const timer = useRef<gsap.core.Tween | null>(null);
  const count = HERO_SCENES.length;

  useEffect(() => {
    const mq = window.matchMedia(MOTION_OK);
    const sync = () => setReduced(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const playing = !stopped && !reduced;
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  // Temporizador de autoplay (7 s por escena).
  useGSAP(
    () => {
      if (!playing) return;
      timer.current = gsap.delayedCall(7, next);
    },
    { dependencies: [index, playing], revertOnUpdate: true },
  );
  useEffect(() => {
    if (hovered) timer.current?.pause();
    else timer.current?.resume();
  }, [hovered, index, playing]);
  useEffect(() => {
    const onVis = () => (document.hidden ? timer.current?.pause() : !hovered && timer.current?.resume());
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [hovered]);

  // Entrada de la escena activa: texto escalonado, círculos, tarjeta y línea.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const s = `[data-scene="${index}"]`;
        gsap.from(`[data-scene-text="${index}"] [data-hero-in]`, {
          y: 24,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          delay: 0.1,
        });
        gsap.from(`${s} .hero-circle`, {
          scale: 0.9,
          opacity: 0,
          transformOrigin: "50% 50%",
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
        });
        gsap.from(`${s} .hero-card`, { y: 18, opacity: 0, duration: 0.9, delay: 0.45 });
        gsap.fromTo(
          `${s} .hero-wave`,
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", delay: 0.2 },
        );
        // Movimiento ambiental muy leve, solo en la decoración (vuelve siempre a su sitio).
        gsap.to(`${s} .hero-float-a`, { y: -6, duration: 4.5, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(`${s} .hero-float-b`, { y: 6, duration: 5.2, ease: "sine.inOut", repeat: -1, yoyo: true });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [index], revertOnUpdate: true },
  );

  const choose = (i: number) => {
    setIndex(((i % count) + count) % count);
    setStopped(true);
  };

  return (
    <section
      ref={root}
      aria-roledescription="carrusel"
      aria-label="Destacados de la Fundación"
      className="banda pt-3 md:pt-4"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHovered(false)}
    >
      <div className="relative isolate flex min-h-155 flex-col overflow-hidden rounded-tarjeta md:min-h-160 md:rounded-banda xl:block xl:h-180">
        {/* Fondos y decoración de cada escena (montadas para un fundido limpio) */}
        {HERO_SCENES.map((s, i) => (
          <div
            key={s.id}
            data-scene={i}
            aria-hidden
            className={`absolute inset-0 -z-10 transition-opacity duration-900 ease-in-out ${BG[s.bg]} ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {s.bg === "ilustracion" && <SolarIllustration />}
            {s.bg !== "ilustracion" && <HeroWave />}
          </div>
        ))}

        {/* Texto de las escenas, apiladas en la misma celda: la altura del hero no cambia
            al rotar (sin saltos de diseño). Solo la escena activa es visible y accesible. */}
        <div
          aria-live={playing ? "off" : "polite"}
          className="relative grid px-5.5 pt-6 md:px-12 md:pt-14 xl:absolute xl:top-16 xl:left-16 xl:w-175 xl:p-0"
        >
          {HERO_SCENES.map((s, i) => {
            const active = i === index;
            const Title = active ? "h1" : "p";
            return (
              <div
                key={s.id}
                data-scene-text={i}
                aria-hidden={!active}
                inert={!active}
                className={`transition-[opacity,visibility] duration-500 [grid-area:1/1] ${
                  active ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <div data-hero-in className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex rounded-pildora px-3 py-1.5 text-[11px] font-extrabold tracking-[.06em] uppercase md:px-3.5 md:py-1.75 md:text-[12.5px] ${
                      s.chipTone === "naranja" ? "bg-naranja text-azul" : "bg-white text-azul"
                    }`}
                  >
                    {s.chips[0]}
                  </span>
                  {s.chips[1] && (
                    <span className="inline-flex rounded-pildora bg-white px-3 py-1.5 text-[11px] font-bold text-azul md:px-3.5 md:py-1.75 md:text-[12.5px]">
                      {s.chips[1]}
                    </span>
                  )}
                </div>
                <Title
                  data-hero-in
                  className="mt-4 max-w-175 text-[36px] leading-[1.02] font-extrabold tracking-[-.035em] text-azul md:mt-6 md:text-[clamp(3rem,1.6rem+3.6vw,4.5rem)] md:leading-[.97] md:tracking-[-.04em]"
                >
                  {s.t1} <em className="font-serif font-normal tracking-[-.02em] text-accion italic">{s.t2}</em>
                </Title>
                <p
                  data-hero-in
                  className="mt-3 max-w-140 text-[15.5px] leading-[1.55] text-texto-cuerpo md:mt-6 md:text-lg md:leading-[1.6]"
                >
                  {s.body}
                </p>
                <div data-hero-in className="mt-5 flex flex-wrap gap-2 md:mt-9 md:gap-3">
                  <ButtonLink
                    href={s.cta1.href}
                    variant="dark"
                    arrow
                    className="h-12 px-4 text-[13.5px] md:h-14 md:px-6.5 md:text-[15.5px]"
                  >
                    {s.cta1.label}
                  </ButtonLink>
                  {s.cta2 && (
                    <ButtonLink
                      href={s.cta2.href}
                      variant="light"
                      className="h-12 px-4 text-[13.5px] before:bg-bruma md:h-14 md:px-6.5 md:text-[15.5px]"
                    >
                      {s.cta2.label}
                    </ButtonLink>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Arte de la escena (círculos + tarjeta del Ministerio). Escritorio: a la derecha; móvil/tableta: debajo. */}
        <div className="relative mx-auto mt-auto grid w-full max-w-90 px-4 pt-4 pb-22 md:max-w-140 md:px-5.5 md:pt-6 md:pb-28 xl:absolute xl:top-1/2 xl:right-5 xl:m-0 xl:block xl:aspect-[640/460] xl:w-[min(640px,calc(100%-810px))] xl:max-w-none xl:-translate-y-1/2 xl:p-0 2xl:right-0">
          {HERO_SCENES.map((s, i) =>
            s.bg === "ilustracion" ? null : (
              <div
                key={s.id}
                data-scene={i}
                aria-hidden={i !== index}
                className={`transition-opacity duration-900 [grid-area:1/1] xl:absolute xl:inset-0 ${
                  i === index ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <SceneArt tone={s.bg === "durazno" ? "calido" : "frio"} card={SCENE_CARDS[s.id]} />
              </div>
            ),
          )}
        </div>

        {/* Pestañas en píldora + flecha (PDF) */}
        <div className="absolute inset-x-4 bottom-4 md:inset-x-auto md:right-8 md:bottom-8">
          <div className="flex items-center gap-1 rounded-pildora bg-white p-1.5 shadow-[0_16px_40px_rgba(11,42,79,.12)]">
            <div role="group" aria-label="Escenas" className="flex flex-1 gap-1">
              {HERO_SCENES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={i === index}
                  aria-label={`Escena ${i + 1}: ${s.tab}`}
                  onClick={() => choose(i)}
                  className={`h-11 flex-1 cursor-pointer rounded-pildora px-3 text-xs font-extrabold whitespace-nowrap transition-colors duration-300 md:h-11.5 md:flex-none md:px-4 md:text-sm md:font-bold ${
                    i === index ? "bg-azul text-white" : "text-azul hover:bg-bruma"
                  }`}
                >
                  <span className="md:hidden">{s.tabMobile}</span>
                  <span className="hidden md:inline">{s.tab}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Siguiente escena"
              onClick={() => choose(index + 1)}
              className="group ml-1 hidden size-11 shrink-0 cursor-pointer items-center justify-center rounded-pildora bg-naranja text-azul transition-transform duration-300 hover:scale-105 active:scale-95 md:flex"
            >
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Línea ondulada azul suave que cruza la banda (PDF). */
function HeroWave() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1408 720"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full xl:block"
      fill="none"
    >
      <path
        className="hero-wave"
        d="M0 593 C 260 566, 430 628, 710 604 S 1140 444, 1408 462"
        stroke="#9FC2E6"
        strokeWidth="1.5"
        pathLength={1}
        strokeDasharray="1 1"
        strokeDashoffset={0}
      />
    </svg>
  );
}

/**
 * Círculos superpuestos (+ tarjeta en Conciliación y Diplomados). La tarjeta se centra en la
 * intersección de los círculos: x = (228 + 411) / 2 = 319,5 de 640 (49,92 %), y = 229 de 460 (49,78 %).
 * Como la caja mantiene la proporción 640/460, el centrado se conserva en cualquier ancho.
 */
function SceneArt({ tone, card }: { tone: "calido" | "frio"; card?: SceneCard }) {
  const warm = tone === "calido";
  return (
    <div className="relative aspect-[640/460] w-full">
      <svg aria-hidden viewBox="0 0 640 460" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <g className="hero-float-a">
          <circle className="hero-circle" cx="228" cy="229" r="208" fill="#FFFFFF" stroke="#0B2A4F" strokeWidth="2" />
        </g>
        <g className="hero-float-b">
          <circle
            className="hero-circle"
            cx="411"
            cy="229"
            r="208"
            fill={warm ? "#F4914D" : "#1E64C8"}
            fillOpacity={warm ? 0.22 : 0.12}
            stroke={warm ? "#F4914D" : "#1E64C8"}
            strokeWidth="2"
          />
        </g>
      </svg>
      {card && (
        // Envoltorio posicionado aparte: GSAP anima el transform de .hero-card sin romper el centrado.
        <div className="absolute top-[49.78%] left-[49.92%] w-[min(343px,86%)] -translate-x-1/2 -translate-y-1/2 xl:w-[min(343px,62%)]">
          <div className="hero-card rounded-[18px] bg-white px-5.5 py-5 shadow-[0_24px_48px_rgba(11,42,79,.12)]">
            <p className="text-xs font-extrabold tracking-[.1em] text-naranja-texto uppercase">{card.kicker}</p>
            <p className="mt-1.5 text-lg leading-[1.15] font-extrabold text-azul md:text-[21px]">{card.title}</p>
            {card.detail && <p className="mt-2.5 text-[13px] text-texto-2">{card.detail}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

/** Ilustración aprobada de la planta solar (copiada de ProyectoSolar.dc.html). */
function SolarIllustration() {
  return (
    <svg
      aria-hidden
      viewBox={SOLAR_SCENE_VIEWBOX}
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      dangerouslySetInnerHTML={{ __html: SOLAR_SCENE_SVG }}
    />
  );
}
