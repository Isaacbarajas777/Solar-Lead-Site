"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { QUIZ_SOURCE, quizOptions, type QuizAnswers } from "@/config/quiz";
import type { Dictionary, Locale } from "@/i18n";
import { landingPath } from "@/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

type SingleKey = "ownHome" | "setup" | "payment" | "billHigher" | "installedWhen";

type Step =
  | { kind: "single"; key: SingleKey }
  | { kind: "multi"; key: "issues" }
  | { kind: "installer" }
  | { kind: "contact" };

const STEPS: Step[] = [
  { kind: "single", key: "ownHome" },
  { kind: "single", key: "setup" },
  { kind: "single", key: "payment" },
  { kind: "single", key: "billHigher" },
  { kind: "multi", key: "issues" },
  { kind: "installer" },
  { kind: "single", key: "installedWhen" },
  { kind: "contact" },
];

type FieldErrors = Partial<Record<"fullName" | "phone" | "email" | "zip", string>>;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function isValidZip(zip: string) {
  return /^\d{5}(-\d{4})?$/.test(zip.trim());
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
  const [installer, setInstaller] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
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

  function toggleIssue(value: (typeof quizOptions.issues)[number]) {
    setAnswers((a) => {
      const set = new Set(a.issues ?? []);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return { ...a, issues: quizOptions.issues.filter((k) => set.has(k)) };
    });
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!fullName.trim() || fullName.trim().length < 2) next.fullName = form.errors.fullName;
    if (!phone.trim() || !isValidPhone(phone)) next.phone = form.errors.phone;
    if (email.trim() && !isValidEmail(email.trim())) next.email = form.errors.email;
    if (zip.trim() && !isValidZip(zip)) next.zip = form.errors.zip;
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
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          zip: zip.trim() || undefined,
          solarInstaller: installer.trim() || undefined,
          locale,
          quiz: answers,
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

          {current.kind === "multi" && (
            <div>
              <h2 data-step-heading tabIndex={-1} className={headingClass}>
                {q.questions.issues.q}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{q.selectAll}</p>
              <div className="mt-5 space-y-3">
                {quizOptions.issues.map((opt) => {
                  const selected = answers.issues?.includes(opt) ?? false;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="checkbox"
                      aria-checked={selected}
                      onClick={() => toggleIssue(opt)}
                      className={`${optionBase} ${selected ? optionActive : optionIdle}`}
                    >
                      <span>{q.questions.issues.options[opt]}</span>
                      <span
                        aria-hidden="true"
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${
                          selected ? "border-gold-400 bg-gold-400 text-navy-900" : "border-slate-300"
                        }`}
                      >
                        {selected && (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={goNext}
                disabled={!answers.issues || answers.issues.length === 0}
                className="mt-5 w-full rounded-xl bg-gold-500 px-5 py-4 text-base font-bold text-navy-900 shadow-md transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {q.next}
              </button>
            </div>
          )}

          {current.kind === "installer" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                goNext();
              }}
            >
              <h2 data-step-heading tabIndex={-1} className={headingClass}>
                <label htmlFor="quiz-installer">{q.questions.installer.q}</label>
              </h2>
              <p className="mt-1 text-sm text-slate-500">{form.optional}</p>
              <input
                id="quiz-installer"
                type="text"
                value={installer}
                onChange={(e) => setInstaller(e.target.value)}
                maxLength={120}
                placeholder={q.questions.installer.placeholder}
                className={`${fieldClass} mt-4`}
              />
              <button
                type="submit"
                className="mt-5 w-full rounded-xl bg-gold-500 px-5 py-4 text-base font-bold text-navy-900 shadow-md transition hover:bg-gold-400"
              >
                {installer.trim() ? q.next : q.skip}
              </button>
            </form>
          )}

          {current.kind === "contact" && (
            <form onSubmit={handleSubmit} noValidate>
              <h2 data-step-heading tabIndex={-1} className={headingClass}>
                {q.questions.contact.q}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{q.questions.contact.subtitle}</p>
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="quiz-fullName" className={labelClass}>
                    {form.fullName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quiz-fullName"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={fieldClass}
                    required
                  />
                  {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={form.phonePlaceholder}
                    className={fieldClass}
                    required
                  />
                  {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="quiz-email" className={labelClass}>
                    {form.email} <span className="font-normal text-slate-500">{form.optional}</span>
                  </label>
                  <input
                    id="quiz-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldClass}
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="quiz-zip" className={labelClass}>
                    {form.zip} <span className="font-normal text-slate-500">{form.optional}</span>
                  </label>
                  <input
                    id="quiz-zip"
                    type="text"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder={form.zipPlaceholder}
                    className={fieldClass}
                  />
                  {errors.zip && <p className={errorClass}>{errors.zip}</p>}
                </div>
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
