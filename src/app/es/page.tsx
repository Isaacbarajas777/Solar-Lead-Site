import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { HtmlLang } from "@/components/HtmlLang";
import { getDictionary } from "@/i18n";
import { siteConfig } from "@/config/site";

const dict = getDictionary("es");

export const metadata: Metadata = {
  title: dict.meta.title,
  description: dict.meta.description,
  keywords: [...dict.meta.keywords],
  openGraph: {
    title: dict.meta.title,
    description: dict.meta.description,
    siteName: siteConfig.brandName,
    type: "website",
    locale: "es_US",
  },
  alternates: {
    languages: {
      en: "/",
      es: "/es",
    },
  },
};

export default function SpanishHomePage() {
  return (
    <>
      <HtmlLang locale="es" />
      <LandingPage locale="es" dict={dict} />
    </>
  );
}
