import type { ReactNode } from "react";

/**
 * Sello en píldora. `naranja` = «Proyecto destacado» y rótulos de banner;
 * `contorno` = sello secundario sobre imagen oscura.
 */
export function Chip({
  children,
  variant = "naranja",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  variant?: "naranja" | "contorno";
  size?: "sm" | "md";
  className?: string;
}) {
  const v =
    variant === "naranja"
      ? "bg-naranja text-azul font-extrabold uppercase tracking-[.08em]"
      : "border border-white/35 font-bold tracking-[.04em]";
  const s = size === "md" ? "px-4 py-2.25 text-xs" : "px-3 py-1.5 text-[11px]";
  return <span className={`inline-flex items-center rounded-pildora ${v} ${s} ${className}`}>{children}</span>;
}
