/**
 * Fire a Meta Pixel "Lead" event. Call ONLY after a successful lead submit.
 * No personal data (name / email / phone) is ever sent here.
 * No-op if the pixel isn't loaded (e.g. NEXT_PUBLIC_META_PIXEL_ID unset).
 */
export function trackMetaLead(contentName: "quiz" | "home_form", language: string) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  try {
    window.fbq("track", "Lead", { content_name: contentName, language });
  } catch {
    // never let tracking break the form
  }
}
