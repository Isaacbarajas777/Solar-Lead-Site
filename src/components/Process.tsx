import type { Dictionary } from "@/i18n";

type Props = {
  dict: Dictionary;
};

export function Process({ dict }: Props) {
  const { process } = dict;

  return (
    <section className="bg-white py-16 sm:py-20" id="how-it-works">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
            {process.title}
          </h2>
          <p className="mt-3 text-slate-600">{process.subtitle}</p>
        </div>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((item) => (
            <li
              key={item.step}
              className="relative rounded-xl border border-slate-200 bg-slate-50 p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
