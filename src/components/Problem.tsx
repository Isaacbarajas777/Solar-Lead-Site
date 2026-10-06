import type { Dictionary } from "@/i18n";

type Props = {
  dict: Dictionary;
};

export function Problem({ dict }: Props) {
  const { problem } = dict;

  return (
    <section className="bg-slate-50 py-16 sm:py-20" id="problems">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
            {problem.title}
          </h2>
          <p className="mt-3 text-slate-600">{problem.subtitle}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {problem.items.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
                  />
                  <line x1="4" x2="4" y1="22" y2="15" fill="none" strokeLinecap="round" strokeWidth={2} />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold leading-snug text-navy-900">{item.title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
