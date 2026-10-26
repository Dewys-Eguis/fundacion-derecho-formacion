import Image from "next/image";
import Link from "next/link";
import type { SiteImage } from "@/content/images";
import type { ReactNode } from "react";
import { ArrowUpRight } from "./icons";
import { PhotoPendingBadge, Silhouette } from "./placeholders";

/**
 * Tarjetas reutilizables (medidas de Main.dc.html). Todas usan `tarjeta-hover`:
 * translateY(-6px) + sombra en 300 ms.
 */

/** Superficie simple (Sistema.dc.html · «Tarjeta · radio 26–32 px»). */
export function Card({
  tone = "bruma",
  className = "",
  children,
}: {
  tone?: "bruma" | "azul" | "durazno" | "blanco";
  className?: string;
  children: ReactNode;
}) {
  const t = {
    bruma: "bg-bruma text-azul",
    azul: "bg-azul text-white sobre-oscuro",
    durazno: "bg-durazno text-azul",
    blanco: "bg-white text-azul border border-linea",
  }[tone];
  return <div className={`rounded-[26px] p-7 ${t} ${className}`}>{children}</div>;
}

/** Servicio de «Qué hacemos»: número naranja, flecha en círculo, título y descripción. */
export function ServiceCard({
  num,
  title,
  desc,
  href,
  dark = false,
}: {
  num: string;
  title: string;
  desc: string;
  href: string;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group flex min-h-70 tarjeta-hover flex-col justify-between rounded-tarjeta border border-linea p-7 no-underline md:p-8 ${
        dark ? "sobre-oscuro bg-azul text-white" : "bg-white text-azul"
      }`}
    >
      <span className="flex items-center justify-between">
        <span
          className={`flex size-14 items-center justify-center rounded-2xl text-xl font-extrabold text-naranja transition-transform duration-300 group-hover:-rotate-6 ${
            dark ? "bg-white/10" : "bg-durazno"
          }`}
        >
          {num}
        </span>
        <span
          className={`flex size-11 items-center justify-center rounded-pildora border-[1.5px] transition-colors duration-300 group-hover:border-naranja group-hover:bg-naranja group-hover:text-azul ${
            dark ? "border-white/30" : "border-borde-boton"
          }`}
        >
          <ArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </span>
      <span className="mt-10 block">
        <span className="block text-[25px] leading-[1.15] font-extrabold tracking-[-.01em]">{title}</span>
        <span className={`mt-2.5 block text-[15px] leading-[1.55] ${dark ? "text-sobre-oscuro" : "text-texto-2"}`}>
          {desc}
        </span>
      </span>
    </Link>
  );
}

const PROJECT_TONES = {
  azul: { bg: "bg-azul text-white sobre-oscuro", tag: "text-durazno-claro", ghost: "text-white/[.07]" },
  cielo: { bg: "bg-cielo text-azul", tag: "text-accion", ghost: "text-accion/10" },
  durazno: { bg: "bg-durazno text-azul", tag: "text-naranja-texto", ghost: "text-naranja-texto/10" },
} as const;

/** Proyecto con número fantasma de 120 px (columna derecha del bloque Proyectos). */
export function ProjectCard({
  num,
  cat,
  title,
  href,
  action,
  tone = "azul",
  className = "",
}: {
  num: string;
  cat: string;
  title: string;
  href: string;
  action: string;
  tone?: keyof typeof PROJECT_TONES;
  className?: string;
}) {
  const t = PROJECT_TONES[tone];
  const external = /^https?:/.test(href);
  const cls = `group relative flex min-h-50 tarjeta-hover flex-col justify-between gap-4 overflow-hidden rounded-tarjeta px-7.5 py-7 no-underline ${t.bg} ${className}`;
  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute top-1.5 right-5.5 text-[120px] leading-none font-extrabold tracking-[-.06em] transition-transform duration-700 ease-(--ease-salida) group-hover:-translate-y-1.5 ${t.ghost}`}
      >
        {num}
      </span>
      <span className={`relative text-xs font-extrabold tracking-[.08em] uppercase ${t.tag}`}>{cat}</span>
      <span className="relative max-w-95 text-[22px] leading-[1.2] font-extrabold">{title}</span>
      <span className={`relative text-[13px] font-extrabold ${t.tag}`}>
        {action}
        {external && <span className="sr-only"> (PDF, se abre en una pestaña nueva)</span>}
      </span>
    </>
  );
  // Los documentos de proyecto (PDF externos) se abren en una pestaña nueva.
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Diplomado: categoría, título y «Inscribirme gratis →». */
export function CourseCard({ cat, title, href }: { cat: string; title: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex min-h-42.5 tarjeta-hover flex-col justify-between gap-3.5 rounded-3xl bg-white p-6 text-azul no-underline"
    >
      <span className="text-xs font-extrabold tracking-[.06em] text-accion uppercase">{cat}</span>
      <span className="text-[21px] leading-[1.2] font-extrabold">{title}</span>
      <span className="text-[13px] font-bold text-naranja-texto">
        Inscribirme gratis{" "}
        <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

/**
 * Integrante del staff. Nunca retratos generados: sin `initials` muestra la silueta
 * neutra «Foto pendiente»; con `initials` usa el placeholder celeste de la Home del
 * diseño aprobado (iniciales sobre fondo celeste hasta tener la foto real).
 */
export function TeamCard({
  name,
  role,
  href,
  initials,
}: {
  name: string;
  role: string;
  href: string;
  initials?: string;
}) {
  if (initials) {
    return (
      <Link
        href={href}
        className="group block tarjeta-hover overflow-hidden rounded-tarjeta bg-bruma text-azul no-underline"
      >
        <span className="relative flex h-75 items-center justify-center overflow-hidden marcador-foto">
          <span
            aria-hidden
            className="flex size-24 items-center justify-center rounded-pildora bg-white text-[30px] font-extrabold tracking-[-.02em] text-accion shadow-[0_10px_30px_rgba(11,42,79,.08)] transition-transform duration-500 ease-(--ease-salida) group-hover:scale-105"
          >
            {initials}
          </span>
        </span>
        <span className="block p-5">
          <span className="block text-lg leading-[1.2] font-extrabold">{name}</span>
          <span className="mt-2 block text-[13px] leading-[1.45] text-texto-2">{role}</span>
        </span>
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className="group block tarjeta-hover overflow-hidden rounded-tarjeta bg-bruma text-azul no-underline"
    >
      <span className="relative flex h-75 items-end justify-center overflow-hidden bg-foto">
        <Silhouette className="origin-bottom zoom-suave" />
        <PhotoPendingBadge className="absolute top-3.5 left-3.5" />
      </span>
      <span className="block p-5">
        <span className="block text-lg leading-[1.2] font-extrabold">{name}</span>
        <span className="mt-2 block text-[13px] leading-[1.45] text-texto-2">{role}</span>
      </span>
    </Link>
  );
}

/** Proyecto en fila (Home del PDF): miniatura celeste pendiente + categoría, título y descarga. */
export function ProjectRow({
  cat,
  title,
  href,
  action,
  image,
}: {
  cat: string;
  title: string;
  href: string;
  action: string;
  /** Imagen (ilustrativa o real); sin ella se muestra el placeholder celeste. */
  image?: SiteImage;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex tarjeta-hover items-center gap-5 rounded-tarjeta bg-bruma p-3.5 text-azul no-underline"
    >
      {image ? (
        <span className="relative block aspect-square w-28 shrink-0 overflow-hidden rounded-[18px] sm:w-[170px]">
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            sizes="170px"
            className="h-full w-full zoom-suave object-cover"
            style={{ objectPosition: image.pos }}
          />
        </span>
      ) : (
        <span
          role="img"
          aria-label={`Fotografía pendiente: ${title}`}
          data-pending=""
          className="block aspect-square w-28 shrink-0 overflow-hidden rounded-[18px] marcador-foto sm:w-[170px]"
        />
      )}
      <span className="block py-2 pr-3">
        <span className="block text-xs font-extrabold tracking-[.08em] text-accion uppercase">{cat}</span>
        <span className="mt-1.5 block text-lg leading-[1.2] font-extrabold md:text-xl">{title}</span>
        <span className="mt-2 block text-[13.5px] font-bold text-naranja-texto">
          {action}
          <span className="sr-only"> (PDF, se abre en una pestaña nueva)</span>
        </span>
      </span>
    </a>
  );
}
