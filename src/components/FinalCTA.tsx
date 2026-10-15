import type { Dictionary, Locale } from "@/i18n";
import { LeadForm } from "./LeadForm";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function FinalCTA({ locale, dict }: Props) {
  const { finalCta } = dict;

  return (
    <section className="bg-navy-900 py-16 text-white sm:py-20" id="get-started">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {finalCta.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-200">
            {finalCta.body}
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-200">
            {finalCta.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="text-teal-300" aria-hidden="true">
                  →
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-outline rounded-[28px] bg-white p-5 text-ink sm:p-7">
          <h3
            id="final-form-title"
            className="text-xl font-semibold text-navy-900"
          >
            {finalCta.formTitle}
          </h3>
          <p className="mt-1 text-sm text-slate-600">{finalCta.formSubtitle}</p>
          <div className="mt-5">
            <LeadForm idPrefix="final" locale={locale} dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
}
