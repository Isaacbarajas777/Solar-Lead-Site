import { COMPANY_OTHER, solarCompanies, type SolarCompany } from "@/config/installers";

/**
 * Homepage questionnaire schema (shared by the quiz UI and /api/leads).
 * Option keys are stable identifiers; labels live in src/i18n (dict.quiz).
 */
export const QUIZ_SOURCE = "quiz-beta" as const;

export const quizOptions = {
  wantCancel: ["yes", "no"],
  misled: ["yes", "no"],
  paymentStructure: ["lease", "loan", "ppa"],
  salesStart: ["doorToDoor", "onlineAd", "coldCall", "other"],
  payment: ["under200", "201to500", "over500"],
  bestTime: ["morning", "afternoon", "evening"],
} as const;

export { COMPANY_OTHER, solarCompanies };
export type { SolarCompany };

export type QuizOptions = typeof quizOptions;

export type QuizAnswers = {
  wantCancel?: QuizOptions["wantCancel"][number];
  misled?: QuizOptions["misled"][number];
  paymentStructure?: QuizOptions["paymentStructure"][number];
  salesStart?: QuizOptions["salesStart"][number];
  company?: SolarCompany;
  companyOther?: string;
  payment?: QuizOptions["payment"][number];
  bestTime?: QuizOptions["bestTime"][number];
};

/** Maps the payment structure answer to the existing lead financeType values. */
export const paymentStructureToFinanceType: Record<
  QuizOptions["paymentStructure"][number],
  string
> = {
  lease: "lease",
  loan: "loan",
  ppa: "ppa",
};
