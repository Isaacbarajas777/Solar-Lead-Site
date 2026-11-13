import type { Dictionary } from "@/i18n";

type Props = {
  dict: Dictionary;
};

export function FAQ({ dict }: Props) {
  const { faq } = dict;

  return (
    <section className="bg-cream-2 py-20 sm:py-24" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-4xl lg:text-5xl">
            {faq.title}
          </h2>
          <p className="mt-3 text-slate-600">{faq.subtitle}</p>
        </div>
        <div className="mt-10 space-y-3">
          {faq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-sm border border-[rgba(11,31,58,0.16)] bg-white p-5"
            >
              <summary className="cursor-pointer list-none text-left text-lg font-semibold leading-snug text-navy-900 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="mt-0.5 text-gold-600 transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
