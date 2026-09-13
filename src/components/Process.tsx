const steps = [
  {
    step: "1",
    title: "Submit your info",
    body: "Fill out the short form with your name, contact details, ZIP code, and optional notes about your finance type.",
  },
  {
    step: "2",
    title: "Free consult",
    body: "We follow up to learn more about your contract and situation — at no cost and with no obligation.",
  },
  {
    step: "3",
    title: "Specialist review",
    body: "If appropriate, we help connect you with specialists who can review your documents and circumstances.",
  },
  {
    step: "4",
    title: "Clear next steps",
    body: "You receive practical guidance on possible next steps. Outcomes vary; nothing here guarantees cancellation or relief.",
  },
];

export function Process() {
  return (
    <section className="bg-white py-16 sm:py-20" id="how-it-works">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
            How it works
          </h2>
          <p className="mt-3 text-slate-600">
            A simple, transparent process focused on a free consult and connecting you
            with the right specialists when it makes sense.
          </p>
        </div>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
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
