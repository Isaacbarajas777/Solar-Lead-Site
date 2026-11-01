import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";
import { termsEn } from "@/components/legal/content";

export const metadata = legalMetadata("en", termsEn.title, { en: "/terms", es: "/es/terminos" });

export default function Page() {
  return <LegalPage locale="en" doc={termsEn} otherHref="/es/terminos" />;
}
