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
    questions: {
      wantCancel: { q: string; options: { yes: string; no: string } };
      misled: { q: string; options: { yes: string; no: string } };
      paymentStructure: { q: string; options: { lease: string; loan: string; ppa: string } };
      salesStart: {
        q: string;
        options: { doorToDoor: string; onlineAd: string; coldCall: string; other: string };
      };
      company: {
        q: string;
        placeholder: string;
        searchPlaceholder: string;
        noResults: string;
        otherOption: string;
        otherLabel: string;
      };
      payment: {
        q: string;
        options: { under200: string; "201to500": string; over500: string };
      };
      contact: {
        q: string;
        subtitle: string;
        firstName: string;
        lastName: string;
        bestTime: string;
        bestTimeOptions: { morning: string; afternoon: string; evening: string };
      };
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
