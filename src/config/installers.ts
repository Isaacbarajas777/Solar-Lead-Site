/**
 * Solar company options for the homepage questionnaire (step 5), in display order.
 * Single source of truth: swap this array to change the dropdown.
 * INTERIM list: final verified list pending. The UI labels this only as
 * "Solar company" and must not describe any company's business status.
 * Keep "Other" last; it reveals an optional company-name text box.
 */
export const COMPANY_OTHER = "Other" as const;

export const solarCompanies = [
  "SunPower",
  "Sunnova",
  "Titan Solar Power",
  "Lumio",
  "Pink Energy (Power Home Solar)",
  "Solcius",
  "Sunworks (Solcius parent)",
  "ADT Solar",
  COMPANY_OTHER,
] as const;

export type SolarCompany = (typeof solarCompanies)[number];
