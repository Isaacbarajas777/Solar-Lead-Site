import type { Metadata } from "next";
import { getDictionary, localePath, otherLocale, type Locale } from "@/i18n";
import { siteConfig } from "@/config/site";
import { Footer } from "../Footer";
import { SiteNav } from "../site/SiteNav";
import { HtmlLang } from "../HtmlLang";

export type LegalSection = { h: string; p?: string[]; li?: string[] };
export type LegalDoc = { title: string; effective: string; intro: string; sections: LegalSection[] };

export const LEGAL_EMAIL = "team@nevadaenergyadvisors.com";

export function legalMetadata(locale: Locale, title: string, paths: { en: string; es: string }): Metadata {
  return {
    title: `${title} | ${siteConfig.brandName}`,
    alternates: { canonical: paths[locale], languages: { en: paths.en, es: paths.es } },
  };
}

export function LegalPage({ locale, doc, otherHref }: { locale: Locale; doc: LegalDoc; otherHref: string }) {
  const dict = getDictionary(locale);
  return (
    <div className="min-h-screen bg-cream text-ink">
      <HtmlLang locale={locale} />
      <SiteNav
        locale={locale}
        dict={dict}
        toggleHref={otherHref}
        toggleLocale={otherLocale(locale)}
        links={[{ href: localePath(locale), label: dict.site.nav.home }]}
      />
      <main className="mx-auto max-w-[760px] px-6 pb-24 pt-16">
        <h1 className="font-display text-[clamp(36px,5vw,56px)] leading-[1.02]">{doc.title}</h1>
        <p className="mt-3 text-sm text-muted">{doc.effective}</p>
        <p className="mt-6 text-[17px] leading-relaxed text-brown">{doc.intro}</p>
        {doc.sections.map((s) => (
          <section key={s.h} className="mt-9">
            <h2 className="font-display text-[26px] leading-tight">{s.h}</h2>
            {s.p?.map((t) => (
              <p key={t} className="mt-3 text-[16px] leading-relaxed text-brown">{t}</p>
            ))}
            {s.li ? (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[16px] leading-relaxed text-brown">
                {s.li.map((t) => <li key={t}>{t}</li>)}
              </ul>
            ) : null}
          </section>
        ))}
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
