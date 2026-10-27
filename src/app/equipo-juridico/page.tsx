import type { Metadata } from "next";
import { StaffDirectory } from "@/components/interior/StaffDirectory";
import { StaffCollage } from "@/components/interior/StaffPhoto";
import { PageBanner } from "@/components/layout/PageBanner";
import { BANNERS } from "@/content/banners";

export const metadata: Metadata = {
  title: "Staff jurídico",
  description: BANNERS.staff.lead,
  alternates: { canonical: "/equipo-juridico/" },
};

/** Staff jurídico — 9 profesionales del documento oficial actualizado (julio 2025). */
export default function StaffPage() {
  return (
    <>
      <PageBanner {...BANNERS.staff} media={<StaffCollage />} />
      <StaffDirectory />
      <div aria-hidden className="h-14 md:h-28" />
    </>
  );
}
