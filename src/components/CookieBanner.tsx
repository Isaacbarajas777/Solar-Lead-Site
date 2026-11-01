"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDictionary, type Locale } from "@/i18n";
import { getConsent, onOpenCookieSettings, setConsent } from "@/lib/consent";
import { privacyPath } from "@/lib/legalPaths";

/** Small bottom cookie banner with equal-weight Accept / Reject (EN/ES by path). */
export function CookieBanner() {
  const pathname = usePathname() ?? "/";
  const locale: Locale = pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
  const t = getDictionary(locale).legal;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (getConsent() === null) setOpen(true);
    return onOpenCookieSettings(() => setOpen(true));
  }, []);

  if (!open) return null;

  function choose(value: "accepted" | "rejected") {
    const before = getConsent();
    setConsent(value);
    setOpen(false);
    // A pixel that already loaded can't be unloaded; reload so it's gone.
    if (before === "accepted" && value === "rejected") window.location.reload();
  }

  const btn =
    "min-h-[32px] rounded-full border-[1.5px] border-ink bg-white px-3.5 text-[12.5px] font-semibold text-ink hover:bg-cream";

  return (
    <div
      role="region"
      aria-label={t.banner.aria}
      className="fixed inset-x-2 bottom-[calc(78px+env(safe-area-inset-bottom))] z-[60] mx-auto flex max-w-[520px] items-center gap-2 rounded-full border-[1.5px] border-ink bg-white/95 py-1.5 pl-4 pr-1.5 text-ink shadow-[0_6px_20px_-10px_rgba(0,0,0,0.4)] md:bottom-4"
    >
      <p className="min-w-0 flex-1 text-[12px] leading-tight text-brown sm:text-[13px]">
        {t.banner.text}{" "}
        <Link href={privacyPath(locale)} className="whitespace-nowrap underline underline-offset-2">
          {t.banner.privacy}
        </Link>
      </p>
      <button type="button" onClick={() => choose("rejected")} className={btn}>
        {t.banner.reject}
      </button>
      <button type="button" onClick={() => choose("accepted")} className={btn}>
        {t.banner.accept}
      </button>
    </div>
  );
}
