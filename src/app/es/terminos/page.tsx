import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";
import { termsEs } from "@/components/legal/content";

export const metadata = legalMetadata("es", termsEs.title, { en: "/terms", es: "/es/terminos" });

export default function Page() {
  return <LegalPage locale="es" doc={termsEs} otherHref="/terms" />;
}
