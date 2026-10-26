/**
 * Logo institucional (Logo.dc.html): símbolo de 3 anillos con nodos +
 * «Fundación Derecho y Formación» y el descriptor «Tejido Humano».
 * Es la adaptación del diseño; reemplazar por el vector oficial cuando llegue.
 *
 * Microinteracción: dentro de un enlace con la clase `group`, los anillos giran
 * levemente al pasar el cursor (desactivado con prefers-reduced-motion).
 */
type LogoProps = {
  tone?: "light" | "dark";
  size?: "lg" | "md" | "sm" | "xs";
  className?: string;
  /** Si el logo va dentro de un enlace con aria-label, el SVG se oculta para no duplicar. */
  decorative?: boolean;
};

// [símbolo, nombre, descriptor, gap, separación de filas] en px (Logo.dc.html)
const SIZES = {
  xs: [36, 14, 8, 9, 4],
  sm: [34, 14, 8.5, 10, 3],
  md: [46, 18, 10, 12, 5],
  lg: [72, 30, 14, 18, 8],
} as const;

export function Logo({ tone = "light", size = "md", className = "", decorative = false }: LogoProps) {
  const dark = tone === "dark";
  const [mark, nameSize, subSize, gap, rowGap] = SIZES[size];
  const c = {
    ink: dark ? "#FFFFFF" : "#0B2A4F",
    sub: dark ? "#9CC6F2" : "#1E64C8",
    ring1: dark ? "#5FA3EE" : "#1E64C8",
    ring2: "#F4914D",
    ring3: dark ? "#FFFFFF" : "#0B2A4F",
    node: dark ? "#0B2A4F" : "#FFFFFF",
  };
  const ring = "origin-center [transform-box:view-box] transition-[rotate] duration-700 ease-(--ease-salida)";

  return (
    <span className={`inline-flex items-center leading-none ${className}`} style={{ gap, color: c.ink }}>
      <svg
        role={decorative ? undefined : "img"}
        aria-hidden={decorative || undefined}
        aria-label={decorative ? undefined : "Fundación Derecho y Formación — Tejido Humano"}
        width={mark}
        height={mark}
        viewBox="0 0 48 48"
        fill="none"
        className="shrink-0"
      >
        <g className={`${ring} motion-safe:group-hover:rotate-[24deg]`}>
          <circle
            cx="24"
            cy="24"
            r="21"
            stroke={c.ring1}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="104 28"
            transform="rotate(-120 24 24)"
          />
          <circle cx="13.5" cy="5.8" r="3.3" fill={c.node} stroke={c.ring1} strokeWidth="2" />
          <circle cx="20.4" cy="44.6" r="3" fill={c.node} stroke={c.ring1} strokeWidth="2" />
        </g>
        <g className={`${ring} motion-safe:group-hover:-rotate-[32deg]`}>
          <circle
            cx="24"
            cy="24"
            r="14"
            stroke={c.ring2}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="64 24"
            transform="rotate(-40 24 24)"
          />
          <circle cx="34.7" cy="15" r="3.1" fill={c.node} stroke={c.ring2} strokeWidth="2" />
        </g>
        <g className={`${ring} motion-safe:group-hover:rotate-[48deg]`}>
          <circle
            cx="24"
            cy="24"
            r="7"
            stroke={c.ring3}
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeDasharray="32 12"
            transform="rotate(150 24 24)"
          />
        </g>
      </svg>
      <span className="flex flex-col" style={{ gap: rowGap }}>
        <span
          className="font-extrabold"
          style={{
            fontSize: nameSize,
            letterSpacing: "-.015em",
            lineHeight: 1.12,
            whiteSpace: size === "xs" ? "normal" : "nowrap",
            maxWidth: size === "xs" ? 150 : "none",
          }}
        >
          Fundación Derecho y Formación
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-4.5 rounded-xs" style={{ background: c.ring2 }} />
          <span
            className="font-bold whitespace-nowrap uppercase"
            style={{ fontSize: subSize, letterSpacing: ".32em", color: c.sub }}
          >
            Tejido Humano
          </span>
        </span>
      </span>
    </span>
  );
}
