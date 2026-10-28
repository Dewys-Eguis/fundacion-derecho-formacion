"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Accent, Eyebrow } from "@/components/ui/typography";
import { GALLERY, type GalleryItem } from "@/content/home";
import type { ReactNode } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(Draggable, InertiaPlugin);

/**
 * «El tejido en imágenes» (PDF pág. 1 / pág. 4): franja cielo con curvas blancas
 * suaves arriba y abajo, tarjetas redondeadas con la foto disponible y
 * placeholders celestes para las fotos pendientes. Flechas + arrastre con inercia
 * y ajuste a cada tarjeta. Los rótulos quedan siempre por encima de la curva.
 * Si la tarjeta tiene `href`, pulsarla (sin arrastrar) lleva a su página.
 */
const PORTRAIT = {
  desktop: { cardW: 320, cardH: 400, gap: 14, offset: 48, height: 420, top: 10, depth: 45 },
  mobile: { cardW: 240, cardH: 300, gap: 10, offset: 20, height: 320, top: 10, depth: 24 },
};
/** Proporción 4:3 para fotografías horizontales (oficinas). */
const LANDSCAPE = {
  desktop: { cardW: 440, cardH: 330, gap: 14, offset: 48, height: 350, top: 10, depth: 40 },
  mobile: { cardW: 290, cardH: 218, gap: 10, offset: 20, height: 238, top: 10, depth: 20 },
};

type CurvedGalleryProps = {
  items?: GalleryItem[];
  id?: string;
  eyebrow?: string | null;
  title?: ReactNode;
  note?: ReactNode;
  shape?: "portrait" | "landscape";
  /** Al pulsar una tarjeta con foto (sin arrastrar). */
  onOpen?: (index: number) => void;
};

export function CurvedGallery({
  items = GALLERY,
  id = "galeria",
  eyebrow = "Galería",
  title = (
    <>
      El tejido en <Accent>imágenes.</Accent>
    </>
  ),
  note,
  shape = "portrait",
  onOpen,
}: CurvedGalleryProps = {}) {
  const GALLERY_ITEMS = items;
  const SIZES = shape === "landscape" ? LANDSCAPE : PORTRAIT;
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [mobile, setMobile] = useState(false);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(GALLERY_ITEMS.length - 4);
  const v = SIZES[mobile ? "mobile" : "desktop"];
  // Distingue un clic de un arrastre (para abrir la foto solo con clic).
  const moved = useRef(false);
  const step = v.cardW + v.gap;
  const xFor = useCallback((i: number) => v.offset - i * step, [v.offset, step]);
  const nearest = useCallback(
    (x: number, max: number) => Math.max(0, Math.min(max, Math.round((v.offset - x) / step))),
    [v.offset, step],
  );

  // Tamaño según el ancho; cuántas posiciones hacen falta para ver todas las tarjetas.
  useEffect(() => {
    const measure = () => {
      const isMobile = window.innerWidth < 768;
      setMobile(isMobile);
      const s = SIZES[isMobile ? "mobile" : "desktop"];
      const vw = viewport.current?.clientWidth ?? window.innerWidth;
      const trackW = GALLERY_ITEMS.length * s.cardW + (GALLERY_ITEMS.length - 1) * s.gap;
      const max = Math.max(0, Math.ceil((trackW + 2 * s.offset - vw) / (s.cardW + s.gap) - 0.05));
      setMaxIndex(Math.min(GALLERY_ITEMS.length - 1, max));
      setIndex((i) => Math.min(i, max));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [GALLERY_ITEMS.length, SIZES]);

  const goTo = useCallback(
    (i: number) => {
      const target = Math.max(0, Math.min(maxIndex, i));
      setIndex(target);
      const reduced = !window.matchMedia(MOTION_OK).matches;
      gsap.to(track.current, { x: xFor(target), duration: reduced ? 0 : 0.6, ease: "power3.out", overwrite: true });
    },
    [maxIndex, xFor],
  );

  useGSAP(
    () => {
      const reduced = !window.matchMedia(MOTION_OK).matches;
      gsap.set(track.current, { x: xFor(Math.min(index, maxIndex)) });
      const [drag] = Draggable.create(track.current, {
        type: "x",
        inertia: !reduced,
        bounds: { minX: xFor(maxIndex), maxX: v.offset },
        edgeResistance: 0.85,
        dragClickables: true,
        onPress() {
          moved.current = false;
        },
        onDragStart() {
          moved.current = true;
        },
        snap: (x: number) => xFor(nearest(x, maxIndex)),
        onDragEnd() {
          if (reduced) goTo(nearest(this.x, maxIndex));
        },
        onThrowComplete() {
          setIndex(nearest(this.x, maxIndex));
        },
        onRelease() {
          if (!this.isThrowing) setIndex(nearest(this.endX ?? this.x, maxIndex));
        },
      });
      return () => drag.kill();
    },
    { dependencies: [maxIndex, mobile], revertOnUpdate: true },
  );

  const d = v.depth;
  return (
    <section aria-roledescription="carrusel" aria-labelledby={id} className="pt-20 md:pt-28">
      <div className="contenedor flex items-end justify-between gap-6">
        <div>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2
            id={id}
            data-reveal
            className="mt-3 text-[28px] leading-[1.05] font-extrabold tracking-[-.025em] md:mt-4 md:text-h2"
          >
            {title}
          </h2>
        </div>
        <span className="flex gap-2 md:gap-2.5">
          <ArrowButton
            direction="prev"
            size={mobile ? "sm" : "lg"}
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
          />
          <ArrowButton
            direction="next"
            size={mobile ? "sm" : "lg"}
            onClick={() => goTo(index + 1)}
            disabled={index >= maxIndex}
          />
        </span>
      </div>

      <div ref={viewport} className="relative mt-6 overflow-hidden bg-cielo md:mt-12" style={{ height: v.height }}>
        <div
          ref={track}
          className="absolute left-0 flex cursor-grab touch-pan-y active:cursor-grabbing"
          style={{ top: v.top, gap: v.gap, transform: `translateX(${v.offset}px)` }}
        >
          {GALLERY_ITEMS.map((g, i) => (
            <figure
              key={g.caption}
              className="group relative m-0 shrink-0 overflow-hidden rounded-[20px] bg-ph"
              style={{ width: v.cardW, height: v.cardH }}
              aria-label={`${i + 1} de ${GALLERY_ITEMS.length}`}
            >
              {g.image ? (
                <Image
                  src={g.image.src}
                  width={g.image.width}
                  height={g.image.height}
                  alt={g.alt ?? ""}
                  draggable={false}
                  sizes={`${v.cardW}px`}
                  className="pointer-events-none h-full w-full zoom-suave object-cover select-none"
                  style={{ objectPosition: g.pos }}
                />
              ) : (
                <div
                  role="img"
                  aria-label={`Fotografía pendiente: ${g.caption}`}
                  data-pending=""
                  className="h-full w-full marcador-foto"
                />
              )}
              {g.href && (
                <Link
                  href={g.href}
                  draggable={false}
                  aria-label={`${g.caption}: ir a la página`}
                  onClick={(e) => moved.current && e.preventDefault()}
                  className="absolute inset-0 rounded-[20px] focus-visible:outline-offset-[-4px]"
                />
              )}
              {onOpen && g.image && (
                <button
                  type="button"
                  aria-label={`Ampliar fotografía: ${g.caption}`}
                  onClick={() => !moved.current && onOpen(i)}
                  className="absolute inset-0 cursor-zoom-in rounded-[20px] focus-visible:outline-offset-[-4px]"
                />
              )}
              <figcaption className="pointer-events-none absolute right-3 bottom-12 left-3 rounded-xl bg-white/95 px-3.5 py-2.5 text-xs font-bold text-azul shadow-[0_6px_16px_rgba(11,42,79,.08)] transition-transform duration-500 ease-(--ease-salida) group-hover:-translate-y-1 md:right-4 md:bottom-14 md:left-4 md:text-[13px]">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <svg
          aria-hidden
          viewBox={`0 0 1440 ${v.height}`}
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <path d={`M0 0 H1440 Q720 ${d * 2} 0 0 Z`} fill="#FFFFFF" />
          <path d={`M0 ${v.height} Q720 ${v.height - d * 2} 1440 ${v.height} Z`} fill="#FFFFFF" />
        </svg>
        <p className="sr-only" aria-live="polite">
          Posición {index + 1} de {maxIndex + 1}
        </p>
      </div>
      {note && <p className="contenedor mt-3 text-[13px] text-texto-2">{note}</p>}
    </section>
  );
}
