import Link from "next/link";
import { ROUTES } from "@/content/routes";

/** Migas del banner interior: «Inicio / {página}» (PageBanner.dc.html). */
export function Breadcrumbs({ current, className = "" }: { current: string; className?: string }) {
  return (
    <nav aria-label="Ruta de navegación" className={className}>
      <ol className="flex items-center gap-2.5 text-[13px] font-semibold text-sobre-oscuro">
        <li>
          <Link href={ROUTES.inicio} className="text-white no-underline hover:underline">
            Inicio
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
