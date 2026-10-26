import type { Metadata } from "next";
import { DocumentList } from "@/components/interior/DocumentList";
import { PageBanner } from "@/components/layout/PageBanner";
import { BANNERS } from "@/content/banners";

export const metadata: Metadata = {
  title: "Gobierno corporativo",
  description: BANNERS.gobierno.lead,
  alternates: { canonical: "/gobierno-corporativo/" },
};

/** Gobierno corporativo — referencia: PDF aprobado pág. 10 (documentos listados en el sitio actual). */
export default function GobiernoPage() {
  return (
    <>
      <PageBanner {...BANNERS.gobierno} parents={[{ label: "Quiénes somos", href: "/quienes-somos/" }]} />
      <DocumentList />
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
