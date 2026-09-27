export type Locale = "en" | "es";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  header: {
    cta: string;
    langToggleLabel: string;
    langToggleAria: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    bullets: [string, string, string];
    questionsPrefix: string;
    orEmail: string;
    formTitle: string;
    formSubtitle: string;
  };
  form: {
    fullName: string;
    phone: string;
    email: string;
    zip: string;
    solarInstaller: string;
    optional: string;
    message: string;
    phonePlaceholder: string;
    zipPlaceholder: string;
    solarInstallerPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    consent: string;
    successTitle: string;
    successBody: string;
    submitAnother: string;
    errors: {
      fullName: string;
      phone: string;
      email: string;
      zip: string;
      message: string;
      generic: string;
      network: string;
    };
  };
  problem: {
    title: string;
    subtitle: string;
    items: { title: string; body: string }[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: { step: string; title: string; body: string }[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    title: string;
    body: string;
    bullets: [string, string, string];
    formTitle: string;
    formSubtitle: string;
  };
  quiz: {
    skipToSite: string;
    badge: string;
    title: string;
    subtitle: string;
    stepOf: string; // e.g. "Step {current} of {total}"
    back: string;
    next: string;
    skip: string;
    selectAll: string;
    questions: {
      ownHome: { q: string; options: { yes: string; no: string } };
      setup: {
        q: string;
        options: { lease: string; loan: string; ppa: string; paid: string; unsure: string };
      };
      payment: {
        q: string;
        options: {
          under100: string;
          "100to200": string;
          "200to300": string;
          over300: string;
          unsure: string;
        };
      };
      billHigher: { q: string; options: { yes: string; no: string; unsure: string } };
      issues: {
        q: string;
        options: {
          savings: string;
          outOfBusiness: string;
          notWorking: string;
          fees: string;
          pressured: string;
          other: string;
        };
      };
      installer: { q: string; placeholder: string };
      installedWhen: {
        q: string;
        options: { lt1: string; "1to3": string; "3to5": string; "5plus": string };
      };
      contact: { q: string; subtitle: string };
    };
    submit: string;
    thankYouTitle: string;
    thankYouBody: string;
    learnMore: string;
    everyCase: string;
  };
  footer: {
    tagline: string;
    disclaimer: string;
    rights: string;
  };
};
