import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

type LeadBody = {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  zip?: unknown;
  financeType?: unknown;
  message?: unknown;
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
  const financeType =
    typeof body.financeType === "string" && body.financeType.trim()
      ? body.financeType.trim()
      : undefined;
  const message =
    typeof body.message === "string" && body.message.trim()
      ? body.message.trim()
      : undefined;

  if (!fullName) {
    return NextResponse.json(
      { success: false, error: "Full name is required." },
      { status: 400 }
    );
  }
  if (!phone || !isValidPhone(phone)) {
    return NextResponse.json(
      { success: false, error: "A valid phone number is required." },
      { status: 400 }
    );
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "A valid email is required." },
      { status: 400 }
    );
  }
  if (!zip || !isValidZip(zip)) {
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
  if (message && message.length > 500) {
    return NextResponse.json(
      { success: false, error: "Message must be 500 characters or fewer." },
      { status: 400 }
    );
  }

  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    fullName,
    phone,
    email,
    zip,
    ...(financeType ? { financeType } : {}),
    ...(message ? { message } : {}),
    userAgent: request.headers.get("user-agent") || undefined,
  };

  try {
    const dataDir = path.join(process.cwd(), "data");
    await mkdir(dataDir, { recursive: true });
    const filePath = path.join(dataDir, "leads.jsonl");
    await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");
  } catch (err) {
    console.error("Failed to persist lead:", err);
    return NextResponse.json(
      { success: false, error: "Unable to save your request. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
