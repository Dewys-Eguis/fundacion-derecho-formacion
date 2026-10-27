"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CloseIcon } from "@/components/ui/icons";
import { STAFF, type StaffMember } from "@/content/interior";
import { StaffPhoto } from "./StaffPhoto";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Staff jurídico: directorio de 9 tarjetas en el orden del documento oficial (3 · 2 · 1 columnas)
 * y ficha completa en un <dialog> nativo («Ver perfil completo»). La entrada de las tarjetas usa el
 * reveal global (`data-reveal`, respeta prefers-reduced-motion).
 */
export function StaffDirectory() {
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const show = (i: number, el: HTMLElement) => {
    opener.current = el;
    setOpen(i);
  };

  return (
    <section aria-labelledby="conozcalos" className="contenedor pt-12 md:pt-18">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <h2 id="conozcalos" data-reveal className="text-[30px] font-extrabold tracking-[-.02em] md:text-[40px]">
          Conózcalos
        </h2>
        <p data-reveal className="text-[15px] text-texto-2">
          {STAFF.length} profesionales · Pulse una tarjeta para ver el perfil completo.
        </p>
      </div>

      <ul className="mt-7 grid gap-4 sm:grid-cols-2 md:mt-9 md:gap-5 lg:grid-cols-3">
        {STAFF.map((m, i) => (
          <li key={m.id} data-reveal className="grid">
            <article className="group relative flex tarjeta-hover flex-col overflow-hidden rounded-tarjeta border border-linea bg-white text-azul">
              <div className="relative aspect-[4/5] overflow-hidden bg-foto">
                <StaffPhoto
                  member={m}
                  zoom
                  sizes="(min-width: 1440px) 440px, (min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,rgba(11,42,79,0),rgba(11,42,79,.28))] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="absolute top-4 left-4 rounded-pildora bg-white/92 px-2.5 py-1 text-[11px] font-extrabold text-accion backdrop-blur-sm">
                  {pad(i + 1)}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="text-[20px] leading-[1.15] font-extrabold tracking-[-.015em] md:text-[22px]">
                  {m.name}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.45] font-bold text-naranja-texto">{m.role}</p>
                <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-[1.5] text-texto-2">{m.tagline}</p>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`Ver perfil completo de ${m.name}`}
                  onClick={(e) => show(i, e.currentTarget)}
                  className="mt-auto flex cursor-pointer items-center justify-between gap-3 border-t border-linea pt-4 text-left text-[14px] font-extrabold text-accion after:absolute after:inset-0 after:rounded-tarjeta after:content-['']"
                >
                  <span className="mt-1">Ver perfil completo</span>
                  <span
                    aria-hidden
                    className="mt-1 flex size-9 items-center justify-center rounded-pildora bg-bruma transition-[background-color,color,transform] duration-300 group-hover:bg-azul group-hover:text-white motion-safe:group-hover:translate-x-0.5"
                  >
                    <ArrowRight size={15} />
                  </span>
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <StaffDialog
        index={open}
        onNavigate={setOpen}
        onClose={() => {
          setOpen(null);
          opener.current?.focus();
        }}
      />
    </section>
  );
}

/**
 * Ficha completa: foto al lado (escritorio) o arriba (móvil), nombre, cargo y biografía por
 * apartados. Cierra con X, Escape o clic fuera; bloquea el scroll de fondo y devuelve el foco.
 */
function StaffDialog({
  index,
  onNavigate,
  onClose,
}: {
  index: number | null;
  onNavigate: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const m: StaffMember | null = index === null ? null : STAFF[index];
  const isOpen = index !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d || !isOpen) return;
    if (!d.open) d.showModal();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [isOpen]);

  // Al cambiar de perfil, volver al inicio de la ficha.
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
    body.current?.scrollTo({ top: 0 });
  }, [index]);

  const close = () => ref.current?.close();
  const total = STAFF.length;

  return (
    <dialog
      ref={ref}
      aria-labelledby="perfil-nombre"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto max-h-[calc(100dvh-24px)] w-[min(1080px,calc(100%-24px))] overflow-hidden rounded-tarjeta bg-white p-0 text-azul shadow-tarjeta backdrop:bg-noche/70 backdrop:backdrop-blur-sm open:animate-[aparecer_.3s_ease-out] md:rounded-banda"
    >
      {m && index !== null && (
        <div
          ref={scroller}
          className="grid max-h-[calc(100dvh-24px)] overflow-y-auto overscroll-contain md:h-[min(780px,calc(100dvh-24px))] md:grid-cols-[minmax(0,340px)_minmax(0,1fr)] md:overflow-hidden"
        >
          {/* Foto: arriba en móvil, columna lateral en escritorio */}
          <div className="relative aspect-[4/3] bg-foto sm:aspect-[16/10] md:aspect-auto md:h-full">
            <StaffPhoto member={m} sizes="(min-width: 768px) 340px, 100vw" />
          </div>

          <div ref={body} className="relative md:h-full md:overflow-y-auto md:overscroll-contain">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white/95 px-6 pt-5 pb-3 backdrop-blur-sm md:px-10 md:pt-7">
              <span className="text-xs font-extrabold tracking-[.1em] text-naranja-texto uppercase">
                Staff jurídico · {pad(index + 1)} de {pad(total)}
              </span>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={close}
                className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-pildora bg-bruma text-azul transition-transform duration-300 motion-safe:hover:rotate-90"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="px-6 pb-8 md:px-10 md:pb-10">
              <h2
                id="perfil-nombre"
                className="text-[28px] leading-[1.08] font-extrabold tracking-[-.025em] md:text-[38px]"
              >
                {m.name}
              </h2>
              <p className="mt-3 text-[16px] leading-[1.45] font-bold text-naranja-texto md:text-[17px]">{m.role}</p>
              <p className="mt-1.5 text-[14.5px] leading-[1.5] text-texto-2">{m.tagline}</p>

              <div className="mt-7 grid gap-7 border-t border-linea pt-7">
                {m.sections.map((s) => (
                  <section key={s.title}>
                    <h3 className="text-xs font-extrabold tracking-[.12em] text-accion uppercase">{s.title}</h3>
                    {s.paragraphs?.map((t) => (
                      <p key={t} className="mt-3 text-[15.5px] leading-[1.7] text-texto-cuerpo">
                        {t}
                      </p>
                    ))}
                    {s.items && (
                      <ul className="mt-3 grid gap-2.5">
                        {s.items.map((t) => (
                          <li key={t} className="flex gap-3 text-[15px] leading-[1.6] text-texto-cuerpo">
                            <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-pildora bg-naranja" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              <nav
                aria-label="Otros perfiles"
                className="mt-9 flex items-center justify-between gap-3 border-t border-linea pt-5"
              >
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => onNavigate(index - 1)}
                  className="cursor-pointer text-[14px] font-bold text-accion disabled:cursor-default disabled:opacity-35"
                >
                  ← Anterior
                </button>
                <button
                  type="button"
                  disabled={index === total - 1}
                  onClick={() => onNavigate(index + 1)}
                  className="cursor-pointer text-[14px] font-bold text-accion disabled:cursor-default disabled:opacity-35"
                >
                  Siguiente →
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
