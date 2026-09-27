/**
 * Solar company options for the homepage questionnaire (step 5), in display order
 * (most relevant to Las Vegas/Nevada customers first). Intentionally NOT sorted.
 * Single source of truth: swap this array to change the dropdown.
 * The UI labels this only as "Solar company" and must not describe any
 * company's business status. Keep "Other" last; it reveals an optional
 * company-name text box.
 */
export const COMPANY_OTHER = "Other" as const;

export const solarCompanies = [
  "Titan Solar Power",
  "Freedom Forever",
  "Sunnova",
  "SunPower",
  "Bell Solar",
  "Universal Solar Direct",
  "Sunworks",
  "Solcius",
  "PetersenDean",
  "Arcadia Solar",
  "Lumio",
  "ADT Solar",
  "Pink Energy (Power Home Solar)",
  "Erus Energy",
  "Empire Solar Group",
  "Infinity Energy",
  "SolarJuice American",
  "Kosmos Solar",
  "PosiGen",
  "Purelight Power (Solgen Power)",
  "Vision Solar",
  "SIGORA Solar",
  "Sungevity",
  "Real Goods Solar (RGS Energy)",
  "Sullivan Solar Power",
  COMPANY_OTHER,
] as const;

export type SolarCompany = (typeof solarCompanies)[number];
