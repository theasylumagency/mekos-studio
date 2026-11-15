import type { Metadata } from "next";

export const siteUrl = "https://mekos.studio";
export const studioEmail = "hello@mekos.studio";
export const rollsEmail = "hello@almostanother.com";
export const whatsapp = "https://wa.me/995557471554";
export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/mmekomeko/" },
  { label: "TikTok", href: "https://www.tiktok.com/@mekoshandmade" },
  { label: "WhatsApp", href: whatsapp },
];

export const locales = ["ka", "en"] as const;
export type Locale = (typeof locales)[number];
export const sections = ["art", "formation", "isolon", "about"] as const;
export type Section = (typeof sections)[number];
export type StudioPage = "home" | Section;

export function isSection(section: string): section is Section {
  return sections.some((item) => item === section);
}

export function pagePath(locale: Locale, page: StudioPage = "home") {
  const prefix = locale === "en" ? "/en" : "";
  return page === "home" ? prefix || "/" : `${prefix}/${page}`;
}

export function pageAlternates(page: StudioPage) {
  const ka = `${siteUrl}${pagePath("ka", page)}`;
  const en = `${siteUrl}${pagePath("en", page)}`;
  return { ka, en, "x-default": ka };
}

export function whatsAppLink(message: string) {
  return `${whatsapp}?text=${encodeURIComponent(message)}`;
}

export function emailLink(address: string, subject: string, message: string) {
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

export function studioMetadata(
  locale: Locale,
  page: StudioPage,
  title: string,
  description: string,
  image: string,
): Metadata {
  const studio = locale === "ka" ? "მეკოს სტუდია" : "Meko’s Studio";
  const fullTitle = page === "home" ? `${studio} | ${title}` : `${title} | ${studio}`;
  const languages = pageAlternates(page);

  return {
    title: fullTitle,
    description,
    alternates: { canonical: languages[locale], languages },
    openGraph: {
      title: fullTitle,
      description,
      url: languages[locale],
      siteName: studio,
      locale: locale === "ka" ? "ka_GE" : "en_US",
      type: "website",
      images: [{ url: `${siteUrl}${image}` }],
    },
  };
}
