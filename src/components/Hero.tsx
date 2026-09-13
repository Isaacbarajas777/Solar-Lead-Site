import { siteConfig } from "@/config/site";
import { LeadForm } from "./LeadForm";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(45, 212, 191, 0.25), transparent 40%), radial-gradient(circle at 80% 0%, rgba(14, 165, 233, 0.2), transparent 35%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-20">
        <div>
          <p className="mb-3 inline-flex rounded-full border border-teal-400/40 bg-teal-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-teal-200">
            Free consult · Lead-gen only
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Stuck in a solar contract that does not feel right?
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
            High payments, confusing paperwork, or a sales pitch that does not match
            reality — you are not alone. Request a free consult to see if you may
            qualify to connect with specialists who can review your situation.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-slate-200 sm:text-base">
            <li className="flex gap-2">
              <span className="mt-1 text-teal-300" aria-hidden="true">
                ✓
              </span>
              No-cost consult request — no obligation
            </li>
            <li className="flex gap-2">
              <span className="mt-1 text-teal-300" aria-hidden="true">
                ✓
              </span>
              Clear next steps after a specialist review
            </li>
            <li className="flex gap-2">
              <span className="mt-1 text-teal-300" aria-hidden="true">
                ✓
              </span>
              Compliant, transparent process — no outcome guarantees
            </li>
          </ul>
          <p className="mt-6 text-sm text-slate-300">
            Questions? Call{" "}
            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
              className="font-semibold text-teal-300 hover:text-teal-200"
            >
              {siteConfig.phone}
            </a>{" "}
            or email{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-teal-300 hover:text-teal-200"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>

        <div
          id="lead-form"
          className="rounded-2xl border border-white/10 bg-white p-5 text-slate-900 shadow-2xl sm:p-7"
        >
          <h2
            id="hero-form-title"
            className="text-xl font-semibold text-navy-900"
          >
            Request your free consult
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Share a few details and we will follow up to see if you may qualify.
          </p>
          <div className="mt-5">
            <LeadForm idPrefix="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
