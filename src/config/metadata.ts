import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/i18n";
import { siteConfig } from "@/config/site";

/** Standard indexable SEO metadata for a page, with EN/ES alternates. */
export function pageMetadata(
  locale: Locale,
  paths: { en: string; es: string }
): Metadata {
  const dict = getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: [...dict.meta.keywords],
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: siteConfig.brandName,
      type: "website",
      locale: locale === "es" ? "es_US" : "en_US",
      url: paths[locale],
      images: [
        { url: "/og.jpg", width: 1200, height: 630, alt: siteConfig.brandName },
      ],
    },
    alternates: {
      canonical: paths[locale],
      languages: { en: paths.en, es: paths.es },
    },
  };
}
