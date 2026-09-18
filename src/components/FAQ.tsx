import type { Dictionary } from "@/i18n";

type Props = {
  dict: Dictionary;
};

export function FAQ({ dict }: Props) {
  const { faq } = dict;

  return (
    <section className="bg-slate-50 py-16 sm:py-20" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
            {faq.title}
          </h2>
          <p className="mt-3 text-slate-600">{faq.subtitle}</p>
        </div>
        <div className="mt-10 space-y-3">
          {faq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm open:shadow-md"
            >
              <summary className="cursor-pointer list-none text-left text-base font-semibold text-navy-900 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="mt-0.5 text-teal-600 transition group-open:rotate-45">
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
