import { HtmlLang } from "@/components/HtmlLang";
import { QuizPage } from "@/components/quiz/QuizPage";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/config/metadata";

const dict = getDictionary("es");

// The questionnaire is the homepage; uses the site's normal (indexable) SEO metadata.
export const metadata = pageMetadata("es", { en: "/", es: "/es" });

export default function SpanishQuizHomePage() {
  return (
    <>
      <HtmlLang locale="es" />
      <QuizPage locale="es" dict={dict} />
    </>
  );
}
