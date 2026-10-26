"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CurvedGallery } from "@/components/home/CurvedGallery";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CloseIcon } from "@/components/ui/icons";
import { Accent } from "@/components/ui/typography";
import { OFFICE_PHOTOS } from "@/content/interior";

/**
 * «Nuestros espacios» (PDF pág. 9): galería curva con las fotografías reales de la sede
 * y visor ampliado (clic o Enter). El visor se cierra con Escape, cambia con flechas
 * del teclado o deslizando, y devuelve el foco a la foto de origen.
 */
export function OfficeGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const count = OFFICE_PHOTOS.length;

  const show = useCallback((i: number) => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpen(i);
  }, []);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + count) % count)), [count]);

  useEffect(() => {
    if (open === null) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab" && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open === null, close, step]); // eslint-disable-line react-hooks/exhaustive-deps

  // Al cerrar, el foco vuelve a la foto que abrió el visor.
  useEffect(() => {
    if (open === null) opener.current?.focus();
  }, [open]);

  const cur = open === null ? null : OFFICE_PHOTOS[open];

  return (
    <>
      <CurvedGallery
        id="espacios"
        eyebrow={null}
        title={
          <>
            Nuestros <Accent>espacios</Accent>
          </>
        }
        note="Fotografías de la sede de la Fundación en Bogotá D.C. Pulse una imagen para ampliarla."
        shape="landscape"
        items={OFFICE_PHOTOS.map((p) => ({ image: p.image, alt: p.image.alt, caption: p.caption, pos: "50% 50%" }))}
        onOpen={show}
      />

      {cur && open !== null && (
        <div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={`Fotografía ${open + 1} de ${count}: ${cur.caption}`}
          className="fixed inset-0 z-70 flex animate-[aparecer_.3s_ease-out] flex-col items-center justify-center bg-noche/92 p-4 backdrop-blur-sm md:p-10"
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button
            ref={closeBtn}
            type="button"
            aria-label="Cerrar"
            onClick={close}
            className="absolute top-4 right-4 flex size-11 cursor-pointer items-center justify-center rounded-pildora bg-white text-azul transition-transform duration-300 hover:rotate-90 md:top-6 md:right-6"
          >
            <CloseIcon />
          </button>
          <figure className="m-0 w-full max-w-270">
            <Image
              key={cur.image.src}
              src={cur.image.src}
              width={cur.image.width}
              height={cur.image.height}
              alt={cur.image.alt}
              sizes="(min-width: 1080px) 1080px, 100vw"
              className="max-h-[78vh] w-full animate-[aparecer_.35s_ease-out] rounded-tarjeta object-contain"
            />
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-white">
              <span className="text-sm font-bold md:text-base">{cur.caption}</span>
              <span className="text-xs text-sobre-oscuro">
                {open + 1} / {count}
              </span>
            </figcaption>
          </figure>
          <div className="mt-4 flex gap-2.5">
            <ArrowButton direction="prev" onClick={() => step(-1)} label="Fotografía anterior" />
            <ArrowButton direction="next" onClick={() => step(1)} label="Fotografía siguiente" />
          </div>
        </div>
      )}
    </>
  );
}
