import type { Dictionary } from "@/i18n";

type Props = {
  dict: Dictionary;
};

export function FAQ({ dict }: Props) {
  const { faq } = dict;

  return (
    <section className="bg-cream-2 py-16 sm:py-20" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {faq.title}
          </h2>
          <p className="mt-3 text-slate-600">{faq.subtitle}</p>
        </div>
        <div className="mt-10 space-y-3">
          {faq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border-[2.5px] border-ink bg-white p-5 shadow-[5px_5px_0_#1f1712]"
            >
              <summary className="cursor-pointer list-none text-left text-lg font-semibold leading-snug text-navy-900 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="mt-0.5 text-rust transition group-open:rotate-45">
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
