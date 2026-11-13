import type { Dictionary, Locale } from "@/i18n";
import { PhoneIcon } from "./site/icons";
import { telHref } from "./site/SiteNav";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function FinalCTA({ dict }: Props) {
  const { finalCta } = dict;

  return (
    <section className="bg-navy-900 py-20 text-cream sm:py-24" id="get-started">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-4xl lg:text-5xl">
            {finalCta.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-200">
            {finalCta.body}
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-200">
            {finalCta.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="text-gold-400" aria-hidden="true">
                  →
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3.5 sm:flex-row lg:justify-end lg:self-center">
          <a href="#lead-form" className="btn btn-primary">
            {dict.site.hero.ctaCheck} <span aria-hidden="true">→</span>
          </a>
          <a href={telHref} className="btn btn-ghost">
            <PhoneIcon />
            {dict.site.hero.ctaCall}
          </a>
        </div>
      </div>
    </section>
  );
}
