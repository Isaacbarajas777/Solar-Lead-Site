"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n";

/** Sets <html lang> for the current locale (root layout owns the html element). */
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
