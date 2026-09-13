const problems = [
  {
    title: "Payments that strain your budget",
    body: "Monthly solar payments can climb higher than expected, leaving homeowners searching for options and clearer answers.",
  },
  {
    title: "A sales pitch that does not match reality",
    body: "If savings estimates, incentives, or contract terms feel different from what you were told, it is reasonable to seek a second look.",
  },
  {
    title: "Feeling trapped with few clear next steps",
    body: "Lease, loan, and PPA paperwork can be dense. A free consult can help you understand what paths may be available — without promising any outcome.",
  },
];

export function Problem() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20" id="problems">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
            Why homeowners reach out
          </h2>
          <p className="mt-3 text-slate-600">
            Many people contact us because their solar agreement is more stressful than
            expected. We help you start with a free consult — not guarantees.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {problems.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
