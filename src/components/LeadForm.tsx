"use client";

import { useState, FormEvent } from "react";
import { siteConfig } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";

type FormState = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<
  Record<"fullName" | "phone" | "email" | "zip" | "message" | "financeType", string>
>;

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

type Props = {
  idPrefix?: string;
  locale: Locale;
  dict: Dictionary;
};

export function LeadForm({ idPrefix = "lead", locale, dict }: Props) {
  const copy = dict.form;
  const financeOptions = [
    { value: "", label: copy.financeOptions.preferNot },
    { value: "lease", label: copy.financeOptions.lease },
    { value: "loan", label: copy.financeOptions.loan },
    { value: "ppa", label: copy.financeOptions.ppa },
    { value: "cash", label: copy.financeOptions.cash },
    { value: "unsure", label: copy.financeOptions.unsure },
  ] as const;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [financeType, setFinanceType] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<FormState>("idle");
  const [serverMessage, setServerMessage] = useState("");

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      next.fullName = copy.errors.fullName;
    }
    if (!phone.trim() || !isValidPhone(phone)) {
      next.phone = copy.errors.phone;
    }
    if (!email.trim() || !isValidEmail(email)) {
      next.email = copy.errors.email;
    }
    if (!zip.trim() || !isValidZip(zip)) {
      next.zip = copy.errors.zip;
    }
    if (message.length > 500) {
      next.message = copy.errors.message;
    }
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setState("idle");
      return;
    }

    setState("submitting");
    setServerMessage("");

    try {
      const res = await fetch(siteConfig.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          zip: zip.trim(),
          financeType: financeType || undefined,
          message: message.trim() || undefined,
          locale,
        }),
      });

      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || !data.success) {
        setState("error");
        setServerMessage(data.error || copy.errors.generic);
        return;
      }

      setState("success");
      setFullName("");
      setPhone("");
      setEmail("");
      setZip("");
      setFinanceType("");
      setMessage("");
      setErrors({});
    } catch {
      setState("error");
      setServerMessage(copy.errors.network);
    }
  }

  if (state === "success") {
    return (
      <div
        className="rounded-xl border border-teal-200 bg-teal-50 p-6 text-center shadow-sm"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-navy-900">{copy.successTitle}</h3>
        <p className="mt-2 text-sm text-slate-700">{copy.successBody}</p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-4 text-sm font-medium text-teal-700 underline-offset-2 hover:underline"
        >
          {copy.submitAnother}
        </button>
      </div>
    );
  }

  const fieldClass =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30";
  const labelClass = "block text-sm font-medium text-slate-700";
  const errorClass = "mt-1 text-xs text-red-600";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      noValidate
      aria-labelledby={`${idPrefix}-form-title`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${idPrefix}-fullName`} className={labelClass}>
            {copy.fullName} <span className="text-red-500">*</span>
          </label>
          <input
            id={`${idPrefix}-fullName`}
            name="fullName"
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
          <label htmlFor={`${idPrefix}-phone`} className={labelClass}>
            {copy.phone} <span className="text-red-500">*</span>
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClass}
            placeholder={copy.phonePlaceholder}
            required
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor={`${idPrefix}-email`} className={labelClass}>
            {copy.email} <span className="text-red-500">*</span>
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            required
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor={`${idPrefix}-zip`} className={labelClass}>
            {copy.zip} <span className="text-red-500">*</span>
          </label>
          <input
            id={`${idPrefix}-zip`}
            name="zip"
            type="text"
            autoComplete="postal-code"
            inputMode="numeric"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className={fieldClass}
            placeholder={copy.zipPlaceholder}
            required
          />
          {errors.zip && <p className={errorClass}>{errors.zip}</p>}
        </div>

        <div>
          <label htmlFor={`${idPrefix}-financeType`} className={labelClass}>
            {copy.financeType}{" "}
            <span className="font-normal text-slate-500">{copy.optional}</span>
          </label>
          <select
            id={`${idPrefix}-financeType`}
            name="financeType"
            value={financeType}
            onChange={(e) => setFinanceType(e.target.value)}
            className={fieldClass}
          >
            {financeOptions.map((opt) => (
              <option key={opt.value || "none"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${idPrefix}-message`} className={labelClass}>
            {copy.message}{" "}
            <span className="font-normal text-slate-500">{copy.optional}</span>
          </label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={fieldClass}
            placeholder={copy.messagePlaceholder}
            maxLength={500}
          />
          {errors.message && <p className={errorClass}>{errors.message}</p>}
        </div>
      </div>

      {state === "error" && serverMessage && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "submitting" ? copy.submitting : copy.submit}
      </button>

      <p className="text-xs leading-relaxed text-slate-500">{copy.consent}</p>
    </form>
  );
}
