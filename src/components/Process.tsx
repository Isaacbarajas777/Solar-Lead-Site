import type { Dictionary } from "@/i18n";

type Props = {
  dict: Dictionary;
};

export function Process({ dict }: Props) {
  const { process } = dict;

  return (
    <section className="bg-cream py-20 sm:py-24" id="how-it-works">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-4xl lg:text-5xl">
            {process.title}
          </h2>
          <p className="mt-3 text-slate-600">{process.subtitle}</p>
        </div>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((item) => (
            <li
              key={item.step}
              className="relative card-outline rounded-sm bg-white p-6"
            >
              <span className="font-display flex h-12 w-12 items-center justify-center rounded-sm border border-gold-400 text-xl text-ink">
                {item.step}
              </span>
              <h3 className="mt-4 text-xl font-semibold leading-snug text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
