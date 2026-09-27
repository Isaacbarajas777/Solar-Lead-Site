import { LandingPage } from "@/components/LandingPage";
import { HtmlLang } from "@/components/HtmlLang";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/config/metadata";

const dict = getDictionary("en");

export const metadata = pageMetadata("en", { en: "/home", es: "/es/home" });

export default function HomePage() {
  return (
    <>
      <HtmlLang locale="en" />
      <LandingPage locale="en" dict={dict} />
    </>
  );
}
