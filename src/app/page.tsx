import type { Metadata } from "next";
import { CurvedGallery } from "@/components/home/CurvedGallery";
import { FocusBand } from "@/components/home/FocusBand";
import { HeroImpacto } from "@/components/home/HeroImpacto";
import {
  AboutUs,
  Allies,
  Closing,
  Diplomados,
  Manifesto,
  MobileKpis,
  Projects,
  QuickLinks,
  Services,
  Staff,
  Trust,
} from "@/components/home/sections";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — ${SITE.descriptor}` },
  description: SITE.claim,
  alternates: { canonical: "/" },
  openGraph: { title: `${SITE.name} — ${SITE.descriptor}`, description: SITE.claim },
};

/**
 * Inicio — referencia: «Tejido Humano — Sitio completo.pdf» (pág. 1 escritorio, pág. 4 móvil).
 * Orden: portada de impacto + cinta (portada-impacto/) · (cifras, solo móvil) · accesos rápidos · confianza · quiénes somos · manifiesto ·
 * servicios · Washington → Ciudad Bolívar · galería · proyectos · staff · diplomados · aliados ·
 * cierre. Las mismas secciones existen en móvil, reorganizadas para pantallas pequeñas.
 */
export default function Home() {
  return (
    <>
      <HeroImpacto />
      <MobileKpis />
      <QuickLinks />
      <Trust />
      <AboutUs />
      <Manifesto />
      <Services />
      <FocusBand />
      <CurvedGallery />
      <Projects />
      <Staff />
      <Diplomados />
      <Allies />
      <Closing />
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
