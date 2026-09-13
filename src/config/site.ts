/**
 * Central site configuration.
 * Replace PLACEHOLDER values with real brand/contact details before publishing.
 *
 * Form submissions POST to /api/leads (see that route). For production CRM/webhook
 * integration, update formEndpoint notes and the API handler accordingly.
 */
export const siteConfig = {
  brandName: "Solar Relief Consult",
  tagline: "Free consults for homeowners stuck in solar contracts",
  description:
    "See if you may qualify for help with a solar contract. Submit your info for a free consult and connect with specialists who review your situation.",
  phone: "(555) 000-0000",
  email: "hello@example.com",
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
    title: "Solar Relief Consult | Free Solar Contract Consult",
    description:
      "Feeling stuck with high solar payments or a contract that does not match what you were told? Request a free consult and see if you may qualify to connect with specialists.",
    keywords: [
      "solar contract help",
      "solar payment relief",
      "free solar consult",
      "solar lease review",
    ],
  },
  disclaimer:
    "Submitting this form is not legal advice and is not a guarantee of cancellation, relief, or any particular outcome. Information you provide may be used to contact you about a free consult and to connect you with specialists if appropriate.",
} as const;

export type SiteConfig = typeof siteConfig;
