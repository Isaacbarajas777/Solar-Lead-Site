import type { Dictionary, Locale } from "@/i18n";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Problem } from "./Problem";
import { Process } from "./Process";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function LandingPage({ locale, dict }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} dict={dict} />
      <main>
        <Hero locale={locale} dict={dict} />
        <Problem dict={dict} />
        <Process dict={dict} />
        <FAQ dict={dict} />
        <FinalCTA locale={locale} dict={dict} />
      </main>
      <Footer dict={dict} />
    </div>
  );
}
