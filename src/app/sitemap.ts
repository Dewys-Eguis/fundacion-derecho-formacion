import type { MetadataRoute } from "next";
import { PUBLISHED_ROUTES } from "@/content/routes";
import { SITE } from "@/content/site";

export const dynamic = "force-static";

/** Solo páginas públicas terminadas (las internas, como /sistema/, nunca se listan). */
export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLISHED_ROUTES.map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
