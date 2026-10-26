import type { Metadata } from "next";
import { SectionNav } from "@/components/solar/SectionNav";
import { SolarHero } from "@/components/solar/SolarHero";
import {
  Connection,
  Documents,
  Impact,
  Location,
  SolarCta,
  Summary,
  Technology,
  Washington,
} from "@/components/solar/sections";
import { SOLAR_HERO, SOLAR_SECTIONS } from "@/content/solar";

export const metadata: Metadata = {
  title: "Planta solar fotovoltaica San Francisco",
  description: SOLAR_HERO.lead,
  alternates: { canonical: "/proyectos/planta-solar-san-francisco/" },
  openGraph: { title: "Planta solar fotovoltaica San Francisco", description: SOLAR_HERO.lead },
};

/**
 * Proyecto destacado — referencia: PDF aprobado pág. 2 (escritorio) y pág. 5 (móvil).
 * Orden: hero · subnavegación · resumen · ubicación · tecnología · conexión · impacto ·
 * Washington → Ciudad Bolívar · documentos · CTA.
 */
export default function PlantaSolarPage() {
  return (
    <>
      <SolarHero />
      <SectionNav sections={SOLAR_SECTIONS} />
      <Summary />
      <Location />
      <Technology />
      <Connection />
      <Impact />
      <Washington />
      <Documents />
      <SolarCta />
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
