import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";
import { privacyEs } from "@/components/legal/content";

export const metadata = legalMetadata("es", privacyEs.title, { en: "/privacy", es: "/es/privacidad" });

export default function Page() {
  return <LegalPage locale="es" doc={privacyEs} otherHref="/privacy" />;
}
