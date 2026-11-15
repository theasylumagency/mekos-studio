import type { MetadataRoute } from "next";
import { locales, pageAlternates, sections, type StudioPage } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: StudioPage[] = ["home", ...sections];
  return pages.flatMap((page) => {
    const languages = pageAlternates(page);
    return locales.map((locale) => ({ url: languages[locale], alternates: { languages } }));
  });
}
