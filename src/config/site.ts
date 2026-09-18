/**
 * Central site configuration.
 * Brand and public contact details used across the site UI.
 *
 * Form submissions POST to /api/leads (see that route). For production CRM/webhook
 * integration, update formEndpoint notes and the API handler accordingly.
 */
export const siteConfig = {
  brandName: "Nevada Energy Advisors",
  tagline: "Free talks for people stuck with solar contracts",
  description:
    "Stuck with a solar contract? Ask for a free talk. We may connect you with people who can look at your case. We cannot promise any result.",
  phone: "(702) 313-3073",
  email: "team@nevadaenergyadvisors.com",
  /** Inboxes that receive each form submission (via Resend) */
  leadNotifyEmails: [
    "team@nevadaenergyadvisors.com",
    "nevadaenergyadvisors@yahoo.com",
  ] as const,
  address: "",
  /** Client form posts here; server validates and appends to data/leads.jsonl */
  formEndpoint: "/api/leads",
  /**
   * Production notes (not used at runtime):
   * - Swap /api/leads for a CRM webhook or email service if desired
   * - Keep validation on the server regardless of destination
   */
  formEndpointNotes:
    "Leads are validated server-side and appended as JSON lines to data/leads.jsonl. Replace with a CRM/webhook before going live if needed.",
  seo: {
    title: "Nevada Energy Advisors | Free solar talk",
    description:
      "Stuck with a solar contract? High bills or a sale that did not match what you were told? Ask for a free talk. We may connect you with specialists. We cannot promise any result.",
    keywords: [
      "solar contract help",
      "solar payment relief",
      "free solar consult",
      "solar lease review",
    ],
  },
  disclaimer:
    "Submitting this form is not legal advice and is not a guarantee of cancellation, relief, or any particular outcome. Information you provide may be used to contact you about a free talk and to connect you with specialists if appropriate.",
} as const;

export type SiteConfig = typeof siteConfig;
