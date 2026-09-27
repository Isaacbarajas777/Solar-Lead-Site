import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";
import { landingPath, localePath, otherLocale } from "@/i18n";
import { Quiz } from "./Quiz";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/** Questionnaire homepage (`/` and `/es`). The full landing page lives at /home. */
export function QuizPage({ locale, dict }: Props) {
  const toggleLocale = otherLocale(locale);
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
          <Link href={localePath(locale)} className="flex items-center">
            <Image
              src="/logo.png"
              alt={siteConfig.brandName}
              width={360}
              height={164}
              className="h-12 w-auto sm:h-14"
              priority
            />
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
              className="hidden text-sm font-medium text-slate-700 hover:text-navy-900 sm:inline"
            >
              {siteConfig.phone}
            </a>
            <Link
              href={localePath(toggleLocale)}
              hrefLang={toggleLocale}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-gold-500 hover:text-navy-900"
              aria-label={dict.header.langToggleAria}
            >
              {dict.header.langToggleLabel}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-navy-900 text-white">
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-5 text-center sm:pt-8">
            <p className="inline-flex rounded-full border border-gold-400/50 bg-gold-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold-200">
              {dict.quiz.badge}
            </p>
            <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {dict.quiz.title}
            </h1>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">{dict.quiz.subtitle}</p>
            <Link
              href={landingPath(locale)}
              className="mt-3 inline-block text-xs font-medium text-slate-300 underline decoration-slate-500 underline-offset-2 hover:text-white"
            >
              {dict.quiz.skipToSite} →
            </Link>
          </div>
        </section>
        <div className="mx-auto -mt-10 max-w-2xl px-3 pb-10 sm:px-4">
          <Quiz locale={locale} dict={dict} />
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-2xl px-4 py-6">
          <p className="text-xs leading-relaxed text-slate-500">{dict.footer.disclaimer}</p>
          <p className="mt-3 text-xs text-slate-400">
            © {year} {siteConfig.brandName}. {dict.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}
