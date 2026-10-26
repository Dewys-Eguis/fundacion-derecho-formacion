"use client";

import { ArrowLeft, ArrowRight } from "./icons";

/** Flechas circulares de galerías y carruseles (58 px escritorio · 44 px móvil). */
export function ArrowButton({
  direction,
  onClick,
  disabled,
  label,
  size = "lg",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  size?: "lg" | "sm";
}) {
  const next = direction === "next";
  return (
    <button
      type="button"
      aria-label={label ?? (next ? "Siguiente" : "Anterior")}
      onClick={onClick}
      disabled={disabled}
      className={`group flex cursor-pointer items-center justify-center rounded-pildora transition-[transform,background-color,opacity] duration-300 active:scale-95 disabled:cursor-default disabled:opacity-40 ${
        size === "lg" ? "size-14.5" : "size-11"
      } ${
        next
          ? "bg-azul text-white hover:bg-accion"
          : "border-[1.5px] border-borde-boton bg-white text-azul hover:border-azul/40"
      }`}
    >
      {next ? (
        <ArrowRight className="transition-transform duration-300 group-enabled:group-hover:translate-x-0.5" />
      ) : (
        <ArrowLeft className="transition-transform duration-300 group-enabled:group-hover:-translate-x-0.5" />
      )}
    </button>
  );
}
