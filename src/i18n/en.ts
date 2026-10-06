import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "Nevada Energy Advisors | Free solar consultation",
    description:
      "Stuck with a solar contract? Bills too high, or the sale did not match what you were told? Ask for a free consultation. We give you an honest look at your options and clear next steps. Every case is different.",
    keywords: [
      "solar contract help",
      "solar payment relief",
      "free solar consultation",
      "solar lease review",
    ],
  },
  header: {
    cta: "Free Consultation",
    langToggleLabel: "Spanish",
    langToggleAria: "Cambiar a español",
  },
  hero: {
    badge: "Free Consultation",
    title: "Stuck with a solar contract?",
    subtitle:
      "Higher bills than you were promised? A sale that didn’t match the pitch? Get straight answers about your contract and a clear plan for what comes next.",
    bullets: [
      "No cost, no pressure",
      "Straight answers about your contract",
      "A clearer path from here",
    ],
    questionsPrefix: "Questions? Call",
    orEmail: "or email",
    formTitle: "Ask for a free consultation",
    formSubtitle: "Share a few details and we’ll be in touch.",
  },
  form: {
    fullName: "Name",
    phone: "Phone",
    email: "Email",
    zip: "ZIP code",
    solarInstaller: "Solar installer",
    optional: "(optional)",
    message: "Short message",
    solarInstallerPlaceholder: "Company or installer name",
    phonePlaceholder: "(702) 313-3073",
    zipPlaceholder: "12345",
    messagePlaceholder: "Briefly describe your situation...",
    submit: "Ask for a free consultation",
    submitting: "Sending...",
    consent:
      "By submitting, you agree we may contact you about a free consultation. We won't sell your information. This isn't legal advice, and every case is different, so we can't promise cancellation, a refund, or any specific outcome.",
    successTitle: "Thank you",
    successBody:
      "We got your request. Someone may call or email you about a free consultation. If it makes sense, we may connect you with specialists for a closer look at your options.",
    submitAnother: "Submit another request",
    errors: {
      fullName: "Please enter your name.",
      phone: "Enter a valid phone number.",
      email: "Enter a valid email address.",
      zip: "Enter a valid ZIP code.",
      message: "Message must be 500 characters or fewer.",
      generic: "Something went wrong. Please try again.",
      network: "Unable to submit right now. Please try again shortly.",
    },
  },
  problem: {
    title: "Why people call us",
    subtitle:
      "Solar deals get confusing and expensive fast. You deserve straight answers about where you stand.",
    items: [
      {
        title: "Bills that keep climbing",
        body: "Your solar payment is higher than you planned for.",
      },
      {
        title: "Sold on promises that didn’t happen",
        body: "The savings, incentives, or terms you were promised don’t match what you got.",
      },
      {
        title: "Stuck in a contract you don’t understand",
        body: "Lease, loan, and PPA paperwork is hard to read.",
      },
    ],
  },
  process: {
    title: "How it works",
    subtitle:
      "Four steps. No cost. No pressure.",
    steps: [
      {
        step: "1",
        title: "Submit your info",
        body: "Fill out the short form with your contact details and solar installer.",
      },
      {
        step: "2",
        title: "Free Consultation",
        body: "We reach out, learn your situation, and answer your questions. No pressure.",
      },
      {
        step: "3",
        title: "Specialist review",
        body: "When your case calls for it, we connect you with specialists who review it in detail.",
      },
      {
        step: "4",
        title: "Clear next steps",
        body: "You get a plain-language rundown of your options and what to do next.",
      },
    ],
  },
  faq: {
    title: "Common questions",
    subtitle: "Straight answers. Not legal advice.",
    items: [
      {
        q: "What happens after I submit the form?",
        a: "We contact you, ask a few questions about your contract, and explain your next step. If your case needs a specialist, we connect you.",
      },
      {
        q: "Is the consultation really free?",
        a: "Yes. It costs nothing, and you’re under no obligation afterward.",
      },
      {
        q: "What information should I have ready?",
        a: "Your contract type (lease, loan, PPA, or owned), your monthly payment, and any paperwork you want to share. Don’t have it all? Reach out anyway.",
      },
      {
        q: "Who will contact me?",
        a: "A member of the Nevada Energy Advisors team, by phone or email, using the info you provide. When it makes sense, we connect you with specialists for a closer review.",
      },
    ],
  },
  finalCta: {
    title: "Ready for straight answers?",
    body: "Tell us about your contract. We review what you share, explain where you stand, and give you clear next steps. When it makes sense, we connect you with specialists.",
    bullets: [
      "Share a few details — we follow up",
      "We may connect you with specialists when it makes sense",
      "Every case is different",
    ],
    formTitle: "Ask for a free consultation",
    formSubtitle: "Same form as above — use whichever is easier.",
  },
  quiz: {
    skipToSite: "Skip to our site",
    badge: "Check eligibility",
    title: "Ready to escape your Solar Contract?",
    stepOf: "Step {current} of {total}",
    back: "Back",
    next: "Next",
    questions: {
      wantCancel: {
        q: "Do you have a solar system you want to cancel?",
        options: { yes: "Yes", no: "No" },
      },
      misled: {
        q: "Were you lied to or misled in any way during the solar sales process?",
        options: { yes: "Yes", no: "No" },
      },
      paymentStructure: {
        q: "How is your solar payment structured?",
        options: {
          lease: "Solar lease",
          loan: "Solar loan (financing)",
          ppa: "Power Purchase Agreement (PPA)",
        },
      },
      salesStart: {
        q: "What started the solar sales process for you?",
        options: {
          doorToDoor: "Door-to-door salesperson",
          onlineAd: "I saw an online ad",
          coldCall: "I was cold-called",
          other: "Other",
        },
      },
      company: {
        q: "Solar company",
        placeholder: "Please select an option",
        searchPlaceholder: "Search…",
        noResults: "No matches. Choose “Other” below.",
        otherOption: "Other",
        otherLabel: "Company name",
      },
      payment: {
        q: "Monthly loan payment",
        options: {
          under200: "Less than $200",
          "201to500": "$201 to $500",
          over500: "More than $500",
        },
      },
      contact: {
        q: "Almost done — where can we reach you?",
        subtitle: "We’ll follow up about your free consultation.",
        firstName: "First name",
        lastName: "Last name",
        bestTime: "What is the best time to reach you?",
        bestTimeOptions: { morning: "Morning", afternoon: "Afternoon", evening: "Evening" },
      },
    },
    submit: "Request my free consultation",
    thankYouTitle: "Thanks — we’ll be in touch about your free consultation.",
    thankYouBody:
      "Someone may call or email you soon. Every case is different.",
    learnMore: "Learn more about us",
    everyCase: "Every case is different.",
  },
  footer: {
    tagline: "Free consultations for people stuck with solar contracts",
    disclaimer:
      "After you submit, we may reach out about a free consultation. When it makes sense, we can also connect you with specialists. We won't sell your information. This isn't legal advice, and we can't promise any result, like cancellation, relief, or a refund. Nevada Energy Advisors is a private company. We're not a state or government program, and we're not affiliated with NV Energy or any utility.",
    rights: "All rights reserved.",
  },
};
