import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";
import { privacyEn } from "@/components/legal/content";

export const metadata = legalMetadata("en", privacyEn.title, { en: "/privacy", es: "/es/privacidad" });

export default function Page() {
  return <LegalPage locale="en" doc={privacyEn} otherHref="/es/privacidad" />;
}
