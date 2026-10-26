import type { Metadata } from "next";
import { CourseCatalog } from "@/components/interior/CourseCatalog";
import { PageBanner } from "@/components/layout/PageBanner";
import { BANNERS } from "@/content/banners";
import { ILLUSTRATIVE } from "@/content/images";

export const metadata: Metadata = {
  title: "Diplomados",
  description: BANNERS.diplomados.lead,
  alternates: { canonical: "/diplomados/" },
};

/** Diplomados virtuales gratuitos — referencia: PDF aprobado pág. 16 (21 programas del sitio actual). */
export default function DiplomadosPage() {
  return (
    <>
      <PageBanner {...BANNERS.diplomados} image={ILLUSTRATIVE.diplomados} />
      <CourseCatalog />
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
