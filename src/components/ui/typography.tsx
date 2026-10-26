import type { ReactNode } from "react";

/** Rótulo de sección: 13 px · 800 · mayúsculas · 0,12em · naranja texto (AA). */
export function Eyebrow({
  children,
  className = "",
  tone = "naranja",
}: {
  children: ReactNode;
  className?: string;
  tone?: "naranja" | "gris";
}) {
  return (
    <p className={`text-rotulo ${tone === "naranja" ? "text-naranja-texto" : "text-texto-2"} ${className}`}>
      {children}
    </p>
  );
}

/**
 * Palabra clave del titular en Instrument Serif itálica (regla del sistema visual:
 * solo una por titular). `tone="claro"` para fondos oscuros (#FFC9A3).
 */
export function Accent({ children, tone = "accion" }: { children: ReactNode; tone?: "accion" | "claro" }) {
  return (
    <em
      className={`font-serif font-normal tracking-[-0.02em] italic ${
        tone === "claro" ? "text-durazno-claro" : "text-accion"
      }`}
    >
      {children}
    </em>
  );
}

/**
 * Texto pendiente de la Fundación: se muestra entre [corchetes] tal como en el
 * diseño. El atributo data-pending permite listarlos todos (buscar «data-pending»).
 */
export function Pending({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span data-pending="" className={className}>
      [{children}]
    </span>
  );
}
