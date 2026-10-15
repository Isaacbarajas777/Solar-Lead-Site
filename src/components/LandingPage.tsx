import type { Dictionary, Locale } from "@/i18n";
import { landingPath, localePath, otherLocale } from "@/i18n";
import { Hero } from "./Hero";
import { Problem } from "./Problem";
import { Process } from "./Process";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";
import { SiteNav } from "./site/SiteNav";
import { CallBar } from "./site/CallBar";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function LandingPage({ locale, dict }: Props) {
  const toggleLocale = otherLocale(locale);
  const quizHome = localePath(locale);
  const quizAnchor = `${quizHome}#quiz`;
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SiteNav
        locale={locale}
        dict={dict}
        toggleHref={landingPath(toggleLocale)}
        toggleLocale={toggleLocale}
        links={[
          { href: quizHome, label: dict.site.nav.home },
          { href: "#how-it-works", label: dict.site.nav.how },
          { href: "#problems", label: dict.site.nav.who },
          { href: quizAnchor, label: dict.site.nav.check },
        ]}
      />
      <main>
        <Hero locale={locale} dict={dict} />
        <Problem dict={dict} />
        <Process dict={dict} />
        <FAQ dict={dict} />
        <FinalCTA locale={locale} dict={dict} />
      </main>
      <Footer dict={dict} moreLink={{ href: quizAnchor, label: dict.site.nav.check }} />
      <CallBar dict={dict} checkHref={quizAnchor} />
    </div>
  );
}
