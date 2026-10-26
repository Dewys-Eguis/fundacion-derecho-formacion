/** Iconos SVG del diseño (trazos copiados de las pantallas). Siempre decorativos. */
type IconProps = { size?: number; className?: string };

const base = (size: number, className = "") => ({
  width: size,
  height: size,
  fill: "none" as const,
  "aria-hidden": true as const,
  className,
});

export const ArrowRight = ({ size = 18, className }: IconProps) => (
  <svg {...base(size, className)} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const ArrowLeft = ({ size = 18, className }: IconProps) => (
  <svg {...base(size, className)} viewBox="0 0 16 16">
    <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const ArrowUpRight = ({ size = 16, className }: IconProps) => (
  <svg {...base(size, className)} viewBox="0 0 16 16">
    <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const DownloadIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size, className)} viewBox="0 0 16 16">
    <path d="M8 2v8M4.5 6.5L8 10l3.5-3.5M3 13h10" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const ChevronDown = ({ size = 10, className }: IconProps) => (
  <svg {...base(size, className)} viewBox="0 0 10 10">
    <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const PhoneIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size, className)} viewBox="0 0 16 16">
    <path
      d="M4 2h2.5l1.2 3-1.6 1a8 8 0 0 0 3.9 3.9l1-1.6 3 1.2V12a2 2 0 0 1-2 2A10.5 10.5 0 0 1 2 4a2 2 0 0 1 2-2z"
      stroke="currentColor"
      strokeWidth="1.3"
    />
  </svg>
);

export const MailIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size, className)} viewBox="0 0 16 16">
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2.5 4.5L8 9l5.5-4.5" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

export const PinIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size, className)} viewBox="0 0 16 16">
    <path d="M8 14s5-4.2 5-8A5 5 0 0 0 3 6c0 3.8 5 8 5 8z" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="8" cy="6" r="1.8" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

export const HeartIcon = ({ size = 15, className }: IconProps) => (
  <svg {...base(size, className)} viewBox="0 0 16 16">
    <path
      d="M8 13.5S2 10 2 5.8A3 3 0 0 1 8 4.3a3 3 0 0 1 6 1.5C14 10 8 13.5 8 13.5z"
      stroke="#F4914D"
      strokeWidth="1.6"
    />
  </svg>
);

export const SunIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size, className)} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="4" stroke="#B5531A" strokeWidth="2" />
    <path
      d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"
      stroke="#B5531A"
      strokeWidth="2"
    />
  </svg>
);

export const MenuIcon = ({ className }: IconProps) => (
  <svg width={18} height={12} viewBox="0 0 18 12" fill="none" aria-hidden className={className}>
    <path d="M0 1h18M6 11h12" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const CloseIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size, className)} viewBox="0 0 14 14">
    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const PlayIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size, className)} viewBox="0 0 16 16">
    <path d="M6 5v6l5-3z" fill="currentColor" />
  </svg>
);
