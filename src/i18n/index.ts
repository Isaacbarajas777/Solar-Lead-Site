import { en } from "./en";
import { es } from "./es";
import type { Dictionary, Locale } from "./types";

export type { Dictionary, Locale };

const dictionaries: Record<Locale, Dictionary> = {
  en,
  es,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

/** Path for a given locale (English stays at `/`). */
export function localePath(locale: Locale): string {
  return locale === "es" ? "/es" : "/";
}
