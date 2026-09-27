import { HtmlLang } from "@/components/HtmlLang";
import { QuizPage } from "@/components/quiz/QuizPage";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/config/metadata";

const dict = getDictionary("en");

// The questionnaire is the homepage; uses the site's normal (indexable) SEO metadata.
export const metadata = pageMetadata("en", { en: "/", es: "/es" });

export default function QuizHomePage() {
  return (
    <>
      <HtmlLang locale="en" />
      <QuizPage locale="en" dict={dict} />
    </>
  );
}
