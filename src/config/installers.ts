/**
 * Solar company options for the homepage questionnaire (step 5), in display order.
 * Single source of truth: swap this array to change the dropdown.
 * The UI labels this only as "Solar company" and must not describe any
 * company's business status. Keep "Other" last; it reveals an optional
 * company-name text box.
 */
export const COMPANY_OTHER = "Other" as const;

export const solarCompanies = [
  "ADT Solar",
  "Arcadia Solar",
  "Empire Solar Group",
  "Erus Energy",
  "Freedom Forever",
  "Infinity Energy",
  "Kosmos Solar",
  "Lumio",
  "PetersenDean",
  "Pink Energy (Power Home Solar)",
  "PosiGen",
  "Purelight Power (Solgen Power)",
  "Real Goods Solar (RGS Energy)",
  "SIGORA Solar",
  "SolarJuice American",
  "Solcius",
  "Sullivan Solar Power",
  "Sungevity",
  "Sunnova",
  "SunPower",
  "Sunworks",
  "Titan Solar Power",
  "Vision Solar",
  COMPANY_OTHER,
] as const;

export type SolarCompany = (typeof solarCompanies)[number];
