import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";
import { localePath } from "@/i18n";

export const telHref = `tel:+1${siteConfig.phone.replace(/\D/g, "")}`;

type NavLink = { href: string; label: string; active?: boolean };

type Props = {
  locale: Locale;
  dict: Dictionary;
  links: NavLink[];
  /** Where the language switch points (same page in the other language). */
  toggleHref: string;
  toggleLocale: Locale;
  /** Float over a photo hero (homepage) instead of sitting in its own band. */
  overlay?: boolean;
};

/** Formal site navigation shared by the quiz homepage and /home. */
export function SiteNav({ locale, dict, links, toggleHref, toggleLocale, overlay }: Props) {
  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-20 border-b border-[rgba(11,31,58,0.12)] border-t-[3px] border-t-gold-400 bg-cream/95 px-4 py-3 sm:px-8 sm:py-4"
          : "relative z-20 border-b border-[rgba(11,31,58,0.12)] border-t-[3px] border-t-gold-400 bg-cream px-4 py-3 sm:px-8 sm:py-4"
      }
    >
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4">
        <Link href={localePath(locale)} className="flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt={siteConfig.brandName}
            width={400}
            height={182}
            className="h-9 w-auto sm:h-[50px]"
            priority
          />
        </Link>
        <nav aria-label={dict.site.nav.menuAria} className="hidden gap-6 text-[15px] font-medium text-ink lg:flex">
          {links.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              aria-current={l.active ? "page" : undefined}
              className={`border-b py-1 transition ${
                l.active ? "border-gold-600" : "border-transparent hover:border-gold-400/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <Link
            href={toggleHref}
            hrefLang={toggleLocale}
            aria-label={dict.header.langToggleAria}
            className="px-2 py-1.5 text-[13px] font-medium text-muted transition hover:text-ink sm:px-2.5 sm:py-2 sm:text-sm"
          >
            {dict.site.nav.langShort}
          </Link>
          <a href={telHref} className="btn btn-dark !px-3.5 !py-[9px] !text-[13px] sm:!px-5 sm:!py-[11px] sm:!text-[15px]">
            {dict.site.nav.call} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
