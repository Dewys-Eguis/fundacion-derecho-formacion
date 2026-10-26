/**
 * Marcadores de contenido visual pendiente. Cada uno reserva el espacio exacto del
 * diseño para sustituirlo por la fotografía real sin tocar la maquetación.
 */

/** Rótulo obligatorio de los renders 3D (CLAUDE.md · regla 3). */
export function RenderLabel({
  short = false,
  className = "",
}: {
  /** Versión corta del móvil: «Visualización 3D conceptual». */
  short?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex rounded-pildora border border-white/20 bg-noche/55 font-semibold text-sobre-oscuro backdrop-blur-sm ${
        short ? "px-2.25 py-1.25 text-[9.5px]" : "px-3 py-1.75 text-[11px]"
      } ${className}`}
    >
      {short ? "Visualización 3D conceptual" : "Visualización 3D conceptual · no es una fotografía del proyecto"}
    </span>
  );
}

/** Rótulo de imagen temporal de los banners interiores (PageBanner.dc.html). */
export function TemporaryImageLabel({ photo, className = "" }: { photo: string; className?: string }) {
  return (
    <span
      className={`inline-flex rounded-pildora border border-white/20 bg-noche/60 px-2.75 py-1.5 text-[11px] font-semibold text-sobre-oscuro backdrop-blur-sm ${className}`}
    >
      Imagen temporal · reemplazar por foto real: {photo}
    </span>
  );
}

/** Silueta neutra del equipo: nunca retratos generados (CLAUDE.md · regla 4). */
export function Silhouette({ width = 190, className = "" }: { width?: number; className?: string }) {
  return (
    <svg width={width} height={(width * 230) / 190} viewBox="0 0 190 230" fill="none" aria-hidden className={className}>
      <circle cx="95" cy="80" r="46" fill="#C9D6E6" />
      <path d="M10 230 C 10 160, 50 140, 95 140 C 140 140, 180 160, 180 230 Z" fill="#C9D6E6" />
    </svg>
  );
}

export function PhotoPendingBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`rounded-pildora bg-white px-2.5 py-1.5 text-[11px] font-bold text-texto-2 ${className}`}>
      Foto pendiente
    </span>
  );
}

/**
 * Marcador rayado de imagen pendiente (`.ph` del diseño) con el nombre del
 * archivo esperado entre corchetes, p. ej. [Oficina_Fundacion_Tejido_Humano_1].
 */
export function PhotoPlaceholder({
  slot,
  className = "",
}: {
  /** Nombre del archivo o descripción de la foto esperada. */
  slot: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Imagen pendiente: ${slot}`}
      data-pending=""
      className={`flex min-w-0 items-center justify-center marcador-foto p-4 text-center text-[13px] font-bold [overflow-wrap:anywhere] text-texto-2 ${className}`}
    >
      [{slot}]
    </div>
  );
}
