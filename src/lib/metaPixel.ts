import { hasConsent } from "@/lib/consent";

/**
 * Fire a Meta Pixel "Lead" event after a successful lead submit.
 * Only fires if the visitor accepted cookies AND the pixel is loaded.
 * No personal data (name / email / phone) is ever sent here.
 */
export function trackMetaLead(contentName: "quiz" | "home_quiz", language: string) {
  if (typeof window === "undefined" || !hasConsent() || typeof window.fbq !== "function") return;
  try {
    window.fbq("track", "Lead", { content_name: contentName, language });
  } catch {
    // never let tracking break the form
  }
}
