import type { Metadata } from "next";
import { StaffDirectory } from "@/components/interior/StaffDirectory";
import { PageBanner } from "@/components/layout/PageBanner";
import { BANNERS } from "@/content/banners";

export const metadata: Metadata = {
  title: "Staff jurídico",
  description: BANNERS.staff.lead,
  alternates: { canonical: "/equipo-juridico/" },
};

/** Staff jurídico — referencia: PDF aprobado pág. 8 (11 profesionales del sitio actual). */
export default function StaffPage() {
  return (
    <>
      <PageBanner {...BANNERS.staff} />
      <StaffDirectory />
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
