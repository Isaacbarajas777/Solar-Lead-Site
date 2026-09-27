import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { siteConfig } from "@/config/site";
import { QUIZ_SOURCE, quizOptions, setupToFinanceType, type QuizAnswers } from "@/config/quiz";
import { en } from "@/i18n/en";

type LeadBody = {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  zip?: unknown;
  solarInstaller?: unknown;
  financeType?: unknown;
  message?: unknown;
  locale?: unknown;
  source?: unknown;
  quiz?: unknown;
};

type LeadRecord = {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email?: string;
  zip?: string;
  source?: string;
  quiz?: QuizAnswers;
  solarInstaller?: string;
  financeType?: string;
  message?: string;
  locale?: string;
  userAgent?: string;
};

function isNonEmptyString(value: unknown, min = 1): value is string {
  return typeof value === "string" && value.trim().length >= min;
}

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

const ALLOWED_FINANCE = new Set([
  "lease",
  "loan",
  "ppa",
  "cash",
  "unsure",
]);

const ALLOWED_LOCALE = new Set(["en", "es"]);

function pickOption<T extends readonly string[]>(
  allowed: T,
  value: unknown
): T[number] | undefined {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T[number])
    : undefined;
}

/** Whitelists quiz answers against the known option keys. */
function parseQuiz(raw: unknown): QuizAnswers {
  const q = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const issues = Array.isArray(q.issues)
    ? quizOptions.issues.filter((k) => (q.issues as unknown[]).includes(k))
    : [];
  return {
    ownHome: pickOption(quizOptions.ownHome, q.ownHome),
    setup: pickOption(quizOptions.setup, q.setup),
    payment: pickOption(quizOptions.payment, q.payment),
    billHigher: pickOption(quizOptions.billHigher, q.billHigher),
    ...(issues.length ? { issues } : {}),
    installedWhen: pickOption(quizOptions.installedWhen, q.installedWhen),
  };
}

function formatQuizBlock(quiz: QuizAnswers, installer?: string) {
  const qs = en.quiz.questions;
  const label = (map: Record<string, string>, key?: string) =>
    key ? map[key] ?? key : "(no answer)";
  return [
    "Questionnaire answers (BETA quiz):",
    `1. ${qs.ownHome.q} ${label(qs.ownHome.options, quiz.ownHome)}`,
    `2. ${qs.setup.q} ${label(qs.setup.options, quiz.setup)}`,
    `3. ${qs.payment.q} ${label(qs.payment.options, quiz.payment)}`,
    `4. ${qs.billHigher.q} ${label(qs.billHigher.options, quiz.billHigher)}`,
    `5. ${qs.issues.q} ${
      quiz.issues?.length
        ? quiz.issues.map((k) => qs.issues.options[k]).join("; ")
        : "(no answer)"
    }`,
    `6. ${qs.installer.q} ${installer || "(not provided)"}`,
    `7. ${qs.installedWhen.q} ${label(qs.installedWhen.options, quiz.installedWhen)}`,
  ];
}

function formatLeadEmail(record: LeadRecord) {
  const lines = [
    "New Nevada Energy Advisors lead",
    "",
    `Name: ${record.fullName}`,
    `Phone: ${record.phone}`,
    `Email: ${record.email || "n/a"}`,
    `ZIP: ${record.zip || "n/a"}`,
    `Solar installer: ${record.solarInstaller || "n/a"}`,
    `Locale: ${record.locale || "n/a"}`,
    `Submitted: ${record.createdAt}`,
    `Lead ID: ${record.id}`,
    `Source: ${record.source || "website-form"}`,
  ];
  if (record.financeType) lines.push(`Finance type: ${record.financeType}`);
  if (record.message) {
    lines.push("", "Message:", record.message);
  }
  if (record.quiz) {
    lines.push("", ...formatQuizBlock(record.quiz, record.solarInstaller));
  }
  lines.push("", "— Sent automatically from the website form");
  return lines.join("\n");
}

async function sendLeadEmail(record: LeadRecord): Promise<{
  ok: boolean;
  error?: string;
}> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured." };
  }

  const from =
    process.env.LEAD_FROM_EMAIL ||
    "Nevada Energy Advisors <onboarding@resend.dev>";
  const to = [...siteConfig.leadNotifyEmails];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      ...(record.email ? { reply_to: record.email } : {}),
      subject: `${record.source === QUIZ_SOURCE ? "New quiz lead (beta)" : "New lead"}: ${
        record.fullName
      } (${record.zip || "no ZIP"})`,
      text: formatLeadEmail(record),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend error:", res.status, detail);
    return {
      ok: false,
      error: `Email provider returned ${res.status}.`,
    };
  }

  return { ok: true };
}

async function persistLeadLocally(record: LeadRecord): Promise<boolean> {
  try {
    const dataDir = path.join(process.cwd(), "data");
    await mkdir(dataDir, { recursive: true });
    const filePath = path.join(dataDir, "leads.jsonl");
    await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");
    return true;
  } catch (err) {
    console.error("Failed to persist lead locally:", err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  let body: LeadBody;

  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const fullName = isNonEmptyString(body.fullName, 2)
    ? body.fullName.trim()
    : null;
  const phone = isNonEmptyString(body.phone) ? body.phone.trim() : null;
  const email = isNonEmptyString(body.email) ? body.email.trim() : null;
  const zip = isNonEmptyString(body.zip) ? body.zip.trim() : null;
  const solarInstaller =
    typeof body.solarInstaller === "string" && body.solarInstaller.trim()
      ? body.solarInstaller.trim()
      : undefined;
  const isQuiz = body.source === QUIZ_SOURCE;
  const quiz = isQuiz ? parseQuiz(body.quiz) : undefined;
  const financeType =
    typeof body.financeType === "string" && body.financeType.trim()
      ? body.financeType.trim()
      : quiz?.setup
        ? setupToFinanceType[quiz.setup]
        : undefined;
  const message =
    typeof body.message === "string" && body.message.trim()
      ? body.message.trim()
      : undefined;
  const locale =
    typeof body.locale === "string" && ALLOWED_LOCALE.has(body.locale)
      ? body.locale
      : undefined;

  if (!fullName) {
    return NextResponse.json(
      { success: false, error: "Name is required." },
      { status: 400 }
    );
  }
  if (!phone || !isValidPhone(phone)) {
    return NextResponse.json(
      { success: false, error: "A valid phone number is required." },
      { status: 400 }
    );
  }
  // Quiz (beta) only requires name + phone; email/ZIP are validated if given.
  if (isQuiz ? email !== null && !isValidEmail(email) : !email || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "A valid email is required." },
      { status: 400 }
    );
  }
  if (isQuiz ? zip !== null && !isValidZip(zip) : !zip || !isValidZip(zip)) {
    return NextResponse.json(
      { success: false, error: "A valid ZIP code is required." },
      { status: 400 }
    );
  }
  if (financeType && !ALLOWED_FINANCE.has(financeType)) {
    return NextResponse.json(
      { success: false, error: "Invalid finance type." },
      { status: 400 }
    );
  }
  if (solarInstaller && solarInstaller.length > 120) {
    return NextResponse.json(
      { success: false, error: "Solar installer must be 120 characters or fewer." },
      { status: 400 }
    );
  }
  if (message && message.length > 500) {
    return NextResponse.json(
      { success: false, error: "Message must be 500 characters or fewer." },
      { status: 400 }
    );
  }

  const record: LeadRecord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    fullName,
    phone,
    ...(email ? { email } : {}),
    ...(zip ? { zip } : {}),
    ...(isQuiz ? { source: QUIZ_SOURCE, quiz } : {}),
    ...(solarInstaller ? { solarInstaller } : {}),
    ...(financeType ? { financeType } : {}),
    ...(message ? { message } : {}),
    ...(locale ? { locale } : {}),
    userAgent: request.headers.get("user-agent") || undefined,
  };

  const emailed = await sendLeadEmail(record);
  const savedLocally = await persistLeadLocally(record);
  const requireEmail = Boolean(process.env.VERCEL || process.env.RESEND_API_KEY);

  if (requireEmail && !emailed.ok) {
    console.error("Lead email failed:", emailed.error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to save your request. Please try again.",
      },
      { status: 500 }
    );
  }

  if (!emailed.ok && !savedLocally) {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to save your request. Please try again.",
      },
      { status: 500 }
    );
  }

  if (!emailed.ok) {
    console.error("Lead saved locally but email failed:", emailed.error);
  }

  return NextResponse.json({ success: true });
}
