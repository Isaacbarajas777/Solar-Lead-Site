/**
 * BETA questionnaire schema (shared by the /quiz UI and /api/leads).
 * Option keys are stable identifiers; labels live in src/i18n (dict.quiz).
 */
export const QUIZ_SOURCE = "quiz-beta" as const;

export const quizOptions = {
  ownHome: ["yes", "no"],
  setup: ["lease", "loan", "ppa", "paid", "unsure"],
  payment: ["under100", "100to200", "200to300", "over300", "unsure"],
  billHigher: ["yes", "no", "unsure"],
  issues: ["savings", "outOfBusiness", "notWorking", "fees", "pressured", "other"],
  installedWhen: ["lt1", "1to3", "3to5", "5plus"],
} as const;

export type QuizOptions = typeof quizOptions;

export type QuizAnswers = {
  ownHome?: QuizOptions["ownHome"][number];
  setup?: QuizOptions["setup"][number];
  payment?: QuizOptions["payment"][number];
  billHigher?: QuizOptions["billHigher"][number];
  issues?: QuizOptions["issues"][number][];
  installedWhen?: QuizOptions["installedWhen"][number];
};

/** Maps the quiz "setup" answer to the existing lead financeType values. */
export const setupToFinanceType: Record<QuizOptions["setup"][number], string> = {
  lease: "lease",
  loan: "loan",
  ppa: "ppa",
  paid: "cash",
  unsure: "unsure",
};
