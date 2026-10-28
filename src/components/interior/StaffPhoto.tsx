import Image from "next/image";
import { staffById, type StaffMember } from "@/content/interior";

/** Por debajo de este ancho la foto original no admite ocupar todo el marco sin pixelarse. */
const LOW_RES = 400;

/**
 * Retrato real de un integrante: ocupa el marco con su encuadre (`photo.pos`). Si el original es
 * de baja resolución se muestra a menor tamaño, centrado sobre fondo celeste, en lugar de ampliarlo.
 */
export function StaffPhoto({
  member,
  sizes,
  className = "",
  zoom = false,
}: {
  member: StaffMember;
  sizes: string;
  className?: string;
  /** Leve acercamiento al pasar el cursor por la tarjeta (`group`). */
  zoom?: boolean;
}) {
  const p = member.photo;
  const motion = zoom
    ? "transition-transform duration-700 ease-(--ease-salida) motion-safe:group-hover:scale-[1.04]"
    : "";
  if (p.width < LOW_RES) {
    return (
      <span className={`flex h-full w-full items-center justify-center bg-cielo ${className}`}>
        <Image
          src={p.src}
          width={p.width}
          height={p.height}
          alt={p.alt}
          sizes={`${p.width}px`}
          className={`h-[58%] max-h-65 w-auto rounded-2xl object-cover shadow-[0_14px_30px_rgba(11,42,79,.16)] ${motion}`}
        />
      </span>
    );
  }
  return (
    <Image
      src={p.src}
      width={p.width}
      height={p.height}
      alt={p.alt}
      sizes={sizes}
      className={`h-full w-full object-cover ${motion} ${className}`}
      style={{ objectPosition: p.pos }}
    />
  );
}

/**
 * Encuadre del collage: la foto de Jesús Enrique es de primer plano; las otras dos se acercan
 * desde arriba para que las tres cabezas queden a la misma altura.
 */
const COLLAGE: { id: string; x: string; zoom?: number }[] = [
  { id: "jesus-enrique-archila-guio", x: "37%" },
  { id: "leydi-yesenia-ramirez-aristizabal", x: "47%", zoom: 1.3 },
  { id: "jose-ricardo-archila-guio", x: "46%", zoom: 1.3 },
];

/** Composición editorial del banner: tres retratos reales (dirección de la Fundación y del Centro). */
export function StaffCollage() {
  return (
    <span className="grid h-full grid-cols-3 gap-1.5 bg-white">
      {COLLAGE.map(({ id, x, zoom = 1 }) => {
        const p = staffById(id).photo;
        return (
          <span key={id} className="relative block h-full overflow-hidden">
            <Image
              src={p.src}
              width={p.width}
              height={p.height}
              alt={p.alt}
              sizes="(min-width: 1280px) 200px, 45vw"
              className="h-full w-full object-cover"
              style={{ objectPosition: `${x} 0%`, transform: `scale(${zoom})`, transformOrigin: `${x} 0%` }}
            />
          </span>
        );
      })}
    </span>
  );
}
