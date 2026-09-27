import { LandingPage } from "@/components/LandingPage";
import { HtmlLang } from "@/components/HtmlLang";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/config/metadata";

const dict = getDictionary("es");

export const metadata = pageMetadata("es", { en: "/home", es: "/es/home" });

export default function SpanishHomePage() {
  return (
    <>
      <HtmlLang locale="es" />
      <LandingPage locale="es" dict={dict} />
    </>
  );
}
