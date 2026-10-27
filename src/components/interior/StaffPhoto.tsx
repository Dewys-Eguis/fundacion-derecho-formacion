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

/** Composición editorial del banner: tres retratos reales (dirección de la Fundación y del Centro). */
export function StaffCollage() {
  const ids = ["jesus-enrique-archila-guio", "leydi-yesenia-ramirez-aristizabal", "jose-ricardo-archila-guio"];
  return (
    <span className="grid h-full grid-cols-3 gap-1.5 bg-white">
      {ids.map((id) => (
        <span key={id} className="relative block h-full overflow-hidden">
          <StaffPhoto member={staffById(id)} sizes="(min-width: 1280px) 160px, 33vw" />
        </span>
      ))}
    </span>
  );
}
