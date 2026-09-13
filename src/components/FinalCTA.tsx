import { LeadForm } from "./LeadForm";

export function FinalCTA() {
  return (
    <section className="bg-navy-900 py-16 text-white sm:py-20" id="get-started">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to see if you may qualify?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-200">
            Take the first step with a free consult request. We will review what you
            share and follow up to discuss whether connecting with specialists makes
            sense for your situation.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-200">
            <li className="flex gap-2">
              <span className="text-teal-300" aria-hidden="true">
                →
              </span>
              Free consult — no obligation
            </li>
            <li className="flex gap-2">
              <span className="text-teal-300" aria-hidden="true">
                →
              </span>
              See if you may qualify for specialist review
            </li>
            <li className="flex gap-2">
              <span className="text-teal-300" aria-hidden="true">
                →
              </span>
              Transparent process with clear expectations
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-xl sm:p-7">
          <h3
            id="final-form-title"
            className="text-xl font-semibold text-navy-900"
          >
            Start your free consult request
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Same form as above — pick whichever is convenient.
          </p>
          <div className="mt-5">
            <LeadForm idPrefix="final" />
          </div>
        </div>
      </div>
    </section>
  );
}
