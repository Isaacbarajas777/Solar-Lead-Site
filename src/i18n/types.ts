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
  footer: {
    tagline: string;
    disclaimer: string;
    rights: string;
  };
};
