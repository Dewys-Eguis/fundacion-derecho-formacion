import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "./icons";

/**
 * Botones en píldora del diseño.
 *  primary   naranja #F4914D con texto azul (acciones: Agenda, Donar, CTA principal)
 *  dark      azul institucional con texto blanco
 *  secondary borde 1,5 px #C9DBEF sobre blanco
 *  light     blanco sobre fondos oscuros
 *  ghost     borde translúcido sobre fondos oscuros
 *  glass     cristal translúcido sobre la portada oscura (portada de impacto)
 * Hover: barrido de color desde la izquierda + flecha que avanza; pulsación con leve escala.
 */
export type ButtonVariant = "primary" | "dark" | "secondary" | "light" | "ghost" | "glass";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-naranja text-azul font-extrabold before:bg-white/25",
  dark: "bg-azul text-white font-bold before:bg-accion",
  secondary: "border-[1.5px] border-borde-boton text-azul font-bold before:bg-bruma hover:border-azul/40",
  light: "bg-white text-azul font-bold before:bg-durazno",
  ghost: "border-[1.5px] border-white/40 text-white font-bold before:bg-white/10 hover:border-white/70",
  glass:
    "bg-white/8 text-white font-bold shadow-[inset_0_0_0_1px_rgba(255,255,255,.24)] backdrop-blur-md before:bg-white/10",
};

// Alturas del diseño: 46 (header) · 54 (secciones) · 58 (bandas) · 62 (hero)
const SIZE: Record<ButtonSize, string> = {
  sm: "h-11.5 px-5 gap-2 text-sm",
  md: "h-13.5 px-6 gap-2.5 text-[15px]",
  lg: "h-14.5 px-7 gap-2.5 text-[15px]",
  xl: "h-15.5 px-7.5 gap-3 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", extra = "") {
  return [
    "group/btn relative isolate inline-flex shrink-0 items-center justify-center overflow-hidden rounded-pildora whitespace-nowrap no-underline",
    "transition-[transform,border-color] duration-300 active:scale-[.98]",
    "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:rounded-[inherit] before:transition-transform before:duration-500 before:ease-(--ease-salida) hover:before:scale-x-100",
    VARIANT[variant],
    SIZE[size],
    extra,
  ].join(" ");
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Flecha final (→) que avanza en hover. */
  arrow?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

function Inner({ icon, arrow, children }: Pick<CommonProps, "icon" | "arrow" | "children">) {
  return (
    <>
      {icon}
      {children}
      {arrow && <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />}
    </>
  );
}

type ButtonLinkProps = CommonProps & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/**
 * Enlace con aspecto de botón. Rutas internas usan next/link; tel:, mailto:, externas y documentos
 * propios (/documentos/*.pdf, ya con basePath) usan <a>; externas y PDF abren en pestaña nueva.
 */
export function ButtonLink({ href, variant, size, arrow, icon, className, children, ...rest }: ButtonLinkProps) {
  const cls = buttonClasses(variant, size, className);
  const file = /\.pdf$/i.test(href);
  const internal = !file && (href.startsWith("/") || href.startsWith("#"));
  if (internal) {
    return (
      <Link href={href} className={cls} {...rest}>
        <Inner icon={icon} arrow={arrow}>
          {children}
        </Inner>
      </Link>
    );
  }
  const external = file || /^https?:/.test(href);
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      <Inner icon={icon} arrow={arrow}>
        {children}
      </Inner>
    </a>
  );
}

type ButtonProps = CommonProps & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ variant, size, arrow, icon, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, `cursor-pointer ${className ?? ""}`)} {...rest}>
      <Inner icon={icon} arrow={arrow}>
        {children}
      </Inner>
    </button>
  );
}
