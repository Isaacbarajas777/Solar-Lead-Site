import type { Locale } from "@/i18n";

export function privacyPath(locale: Locale) {
  return locale === "es" ? "/es/privacidad" : "/privacy";
}
export function termsPath(locale: Locale) {
  return locale === "es" ? "/es/terminos" : "/terms";
}
