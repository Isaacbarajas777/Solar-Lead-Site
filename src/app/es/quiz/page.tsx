import type { Metadata } from "next";
import { HtmlLang } from "@/components/HtmlLang";
import { QuizPage } from "@/components/quiz/QuizPage";
import { getDictionary } from "@/i18n";
import { siteConfig } from "@/config/site";

const dict = getDictionary("es");

export const metadata: Metadata = {
  title: dict.quiz.metaTitle,
  description: dict.quiz.metaDescription,
  openGraph: {
    title: dict.quiz.metaTitle,
    description: dict.quiz.metaDescription,
    siteName: siteConfig.brandName,
    type: "website",
    locale: "es_US",
  },
  // BETA page: keep out of search engines.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { languages: { en: "/quiz", es: "/es/quiz" } },
};

export default function SpanishQuizRoute() {
  return (
    <>
      <HtmlLang locale="es" />
      <QuizPage locale="es" dict={dict} />
    </>
  );
}
