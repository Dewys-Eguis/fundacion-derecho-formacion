import Image from "next/image";
import { MINJUSTICIA_BADGE } from "@/content/images";

/**
 * Distintivo «Vigilado Minjusticia» sobre fondo blanco (el del propio archivo), con sus
 * proporciones originales. `width` = ancho mostrado en px.
 */
export function MinjusticiaBadge({ width = 220, className = "" }: { width?: number; className?: string }) {
  const b = MINJUSTICIA_BADGE;
  return (
    <span className={`inline-flex rounded-2xl bg-white p-2 ${className}`}>
      <Image
        src={b.src}
        width={b.width}
        height={b.height}
        alt={b.alt}
        sizes={`${width}px`}
        style={{ width, height: "auto" }}
        className="block"
      />
    </span>
  );
}
