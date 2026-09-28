"use client";

import { useEffect, useMemo, useRef, useState, FormEvent } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  COMPANY_OTHER,
  QUIZ_SOURCE,
  quizOptions,
  solarCompanies,
  type QuizAnswers,
  type SolarCompany,
} from "@/config/quiz";
import type { Dictionary, Locale } from "@/i18n";
import { landingPath } from "@/i18n";
import { trackMetaLead } from "@/lib/metaPixel";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

type SingleKey = "wantCancel" | "misled" | "paymentStructure" | "salesStart" | "payment";

type Step = { kind: "single"; key: SingleKey } | { kind: "company" } | { kind: "contact" };

const STEPS: Step[] = [
  { kind: "single", key: "wantCancel" },
  { kind: "single", key: "misled" },
  { kind: "single", key: "paymentStructure" },
  { kind: "single", key: "salesStart" },
  { kind: "company" },
  { kind: "single", key: "payment" },
  { kind: "contact" },
];

type FieldErrors = Partial<Record<"firstName" | "lastName" | "phone" | "email", string>>;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

const optionBase =
  "flex w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-4 text-left text-base font-semibold shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 min-h-[60px]";
const optionIdle = "border-slate-200 bg-white text-navy-900 hover:border-gold-400 hover:bg-gold-50";
const optionActive = "border-navy-900 bg-navy-900 text-white";

export function Quiz({ locale, dict }: Props) {
  const q = dict.quiz;
  const form = dict.form;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [companyOther, setCompanyOther] = useState("");
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companySearch, setCompanySearch] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bestTime, setBestTime] = useState<QuizAnswers["bestTime"]>();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const companyLabel = (c: SolarCompany) =>
    c === COMPANY_OTHER ? q.questions.company.otherOption : c;

  const filteredCompanies = useMemo(() => {
    const term = companySearch.trim().toLowerCase();
    if (!term) return solarCompanies;
    return solarCompanies.filter(
      (c) => c === COMPANY_OTHER || companyLabel(c).toLowerCase().includes(term)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companySearch, q.questions.company.otherOption]);

  useEffect(() => {
    if (companyOpen) searchRef.current?.focus();
  }, [companyOpen]);
  const firstRender = useRef(true);

  const total = STEPS.length;
  const current = STEPS[step];
  const progress = status === "success" ? 100 : Math.round(((step + 1) / total) * 100);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 12;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
    const heading = el.querySelector<HTMLElement>("[data-step-heading]");
    heading?.focus({ preventScroll: true });
  }, [step, status]);

  function goNext() {
    setStep((s) => Math.min(s + 1, total - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function chooseSingle(key: SingleKey, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
    // Small delay so the tap feedback is visible before advancing.
    window.setTimeout(goNext, 180);
  }

  function chooseCompany(value: SolarCompany) {
    setAnswers((a) => ({ ...a, company: value }));
    setCompanyOpen(false);
    setCompanySearch("");
    if (value !== COMPANY_OTHER) window.setTimeout(goNext, 180);
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!firstName.trim()) next.firstName = form.errors.fullName;
    if (!lastName.trim()) next.lastName = form.errors.fullName;
    if (!phone.trim() || !isValidPhone(phone)) next.phone = form.errors.phone;
    if (!email.trim() || !isValidEmail(email.trim())) next.email = form.errors.email;
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch(siteConfig.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: QUIZ_SOURCE,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          fullName: `${firstName.trim()} ${lastName.trim()}`,
          phone: phone.trim(),
          email: email.trim(),
          solarInstaller:
            answers.company === COMPANY_OTHER
              ? companyOther.trim() || undefined
              : answers.company,
          locale,
          quiz: {
            ...answers,
            companyOther:
              answers.company === COMPANY_OTHER && companyOther.trim()
                ? companyOther.trim()
                : undefined,
            bestTime,
          },
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };
      if (!res.ok || !data.success) {
        setStatus("error");
        setServerMessage(data.error || form.errors.generic);
        return;
      }
      setStatus("success");
      trackMetaLead("quiz", locale);
    } catch {
      setStatus("error");
      setServerMessage(form.errors.network);
    }
  }

  const stepLabel = q.stepOf
    .replace("{current}", String(Math.min(step + 1, total)))
    .replace("{total}", String(total));

  const fieldClass =
    "mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-navy-800 focus:ring-2 focus:ring-gold-400/50";
  const labelClass = "block text-sm font-medium text-slate-700";
  const errorClass = "mt-1 text-sm text-red-600";
  const headingClass = "text-xl font-bold leading-snug text-navy-900 outline-none sm:text-2xl";

  return (
    <div ref={cardRef} className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200 sm:p-7">
      {/* Progress */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
          {status === "success" ? <span /> : <span>{stepLabel}</span>}
          <span>{progress}%</span>
        </div>
        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label={stepLabel}
        >
          <div
            className="h-full rounded-full bg-gold-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {status === "success" ? (
        <div className="py-6 text-center" role="status" aria-live="polite">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-gold-400">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 data-step-heading tabIndex={-1} className={headingClass}>
            {q.thankYouTitle}
          </h2>
          <p className="mt-3 text-base text-slate-600">{q.thankYouBody}</p>
          <p className="mt-4 text-sm text-slate-600">
            {dict.hero.questionsPrefix}{" "}
            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
              className="font-semibold text-navy-900 underline decoration-gold-400 underline-offset-2"
            >
              {siteConfig.phone}
            </a>
          </p>
          <Link
            href={landingPath(locale)}
            className="mt-6 inline-block rounded-xl bg-navy-900 px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-navy-800"
          >
            {q.learnMore}
          </Link>
        </div>
      ) : (
        <>
          {current.kind === "single" && (
            <div>
              <h2 data-step-heading tabIndex={-1} className={headingClass}>
                {q.questions[current.key].q}
              </h2>
              <div className="mt-5 space-y-3">
                {quizOptions[current.key].map((opt) => {
                  const selected = answers[current.key] === opt;
                  const label = (q.questions[current.key].options as Record<string, string>)[opt];
                  return (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => chooseSingle(current.key, opt)}
                      className={`${optionBase} ${selected ? optionActive : optionIdle}`}
                    >
                      <span>{label}</span>
                      <span
                        aria-hidden="true"
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                          selected ? "border-gold-400 bg-gold-400" : "border-slate-300"
                        }`}
                      >
                        {selected && <span className="h-2 w-2 rounded-full bg-navy-900" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {current.kind === "company" && (
            <div>
              <h2 data-step-heading tabIndex={-1} className={headingClass}>
                <label id="quiz-company-label">{q.questions.company.q}</label>
              </h2>
              <div className="relative mt-5">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={companyOpen}
                  aria-labelledby="quiz-company-label"
                  onClick={() => setCompanyOpen((o) => !o)}
                  className={`${optionBase} ${optionIdle} font-medium`}
                >
                  <span className={answers.company ? "text-navy-900" : "text-slate-500"}>
                    {answers.company ? companyLabel(answers.company) : q.questions.company.placeholder}
                  </span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-slate-500 transition ${companyOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {companyOpen && (
                  <div className="mt-2 overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-lg">
                    <div className="border-b border-slate-200 p-2">
                      <input
                        ref={searchRef}
                        type="search"
                        value={companySearch}
                        onChange={(e) => setCompanySearch(e.target.value)}
                        placeholder={q.questions.company.searchPlaceholder}
                        aria-label={q.questions.company.searchPlaceholder}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base outline-none focus:border-navy-800 focus:ring-2 focus:ring-gold-400/50"
                      />
                    </div>
                    <ul role="listbox" aria-labelledby="quiz-company-label" className="max-h-72 overflow-y-auto py-1">
                      {filteredCompanies.length === 1 && companySearch.trim() && (
                        <li className="px-4 py-2 text-sm text-slate-500">{q.questions.company.noResults}</li>
                      )}
                      {filteredCompanies.map((c) => {
                        const selected = answers.company === c;
                        return (
                          <li key={c} role="option" aria-selected={selected}>
                            <button
                              type="button"
                              onClick={() => chooseCompany(c)}
                              className={`flex min-h-[48px] w-full items-center justify-between px-4 py-3 text-left text-base ${
                                selected ? "bg-navy-900 font-semibold text-white" : "text-navy-900 hover:bg-gold-50"
                              }`}
                            >
                              {companyLabel(c)}
                              {selected && <span aria-hidden="true">✓</span>}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
              {answers.company === COMPANY_OTHER && !companyOpen && (
                <div className="mt-4">
                  <label htmlFor="quiz-companyOther" className={labelClass}>
                    {q.questions.company.otherLabel}{" "}
                    <span className="font-normal text-slate-500">{form.optional}</span>
                  </label>
                  <input
                    id="quiz-companyOther"
                    type="text"
                    value={companyOther}
                    onChange={(e) => setCompanyOther(e.target.value)}
                    maxLength={120}
                    className={fieldClass}
                  />
                </div>
              )}
              {answers.company && !companyOpen && (
                <button
                  type="button"
                  onClick={goNext}
                  className="mt-5 w-full rounded-xl bg-gold-500 px-5 py-4 text-base font-bold text-navy-900 shadow-md transition hover:bg-gold-400"
                >
                  {q.next}
                </button>
              )}
            </div>
          )}

          {current.kind === "contact" && (
            <form onSubmit={handleSubmit} noValidate>
              <h2 data-step-heading tabIndex={-1} className={headingClass}>
                {q.questions.contact.q}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{q.questions.contact.subtitle}</p>
              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="quiz-firstName" className={labelClass}>
                    {q.questions.contact.firstName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quiz-firstName"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={fieldClass}
                    required
                  />
                  {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="quiz-lastName" className={labelClass}>
                    {q.questions.contact.lastName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quiz-lastName"
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={fieldClass}
                    required
                  />
                  {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
                </div>
                </div>
                <div>
                  <label htmlFor="quiz-phone" className={labelClass}>
                    {form.phone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quiz-phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder={form.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={fieldClass}
                    required
                  />
                  {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="quiz-email" className={labelClass}>
                    {form.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quiz-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldClass}
                    required
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>
                <fieldset>
                  <legend className={labelClass}>
                    {q.questions.contact.bestTime}{" "}
                    <span className="font-normal text-slate-500">{form.optional}</span>
                  </legend>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {quizOptions.bestTime.map((t) => {
                      const selected = bestTime === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setBestTime(selected ? undefined : t)}
                          className={`min-h-[48px] rounded-xl border-2 px-2 py-2.5 text-sm font-semibold transition ${
                            selected ? optionActive : optionIdle
                          }`}
                        >
                          {q.questions.contact.bestTimeOptions[t]}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </div>

              {status === "error" && serverMessage && (
                <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                  {serverMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-5 w-full rounded-xl bg-gold-500 px-5 py-4 text-base font-bold text-navy-900 shadow-md transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? form.submitting : q.submit}
              </button>

              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                {q.everyCase} {dict.footer.disclaimer}
              </p>
            </form>
          )}

          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="mt-5 inline-flex min-h-[44px] items-center gap-1 rounded-lg px-2 text-sm font-semibold text-navy-800 hover:bg-slate-100"
            >
              <span aria-hidden="true">←</span> {q.back}
            </button>
          )}
        </>
      )}
    </div>
  );
}
