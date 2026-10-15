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

/** Pill-shaped site navigation shared by the quiz homepage and /home. */
export function SiteNav({ locale, dict, links, toggleHref, toggleLocale, overlay }: Props) {
  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-3 z-20 px-3 sm:top-[18px] sm:px-6"
          : "relative z-20 bg-cream px-3 pb-2 pt-3 sm:px-6 sm:pt-[18px]"
      }
    >
      <div className="mx-auto flex max-w-[1100px] items-center justify-between rounded-full border-2 border-ink bg-white py-[5px] pl-3 pr-1.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] sm:py-1.5 sm:pl-[18px] sm:pr-2">
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
        <nav aria-label={dict.site.nav.menuAria} className="hidden gap-1.5 text-[15px] font-medium text-brown lg:flex">
          {links.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              aria-current={l.active ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 transition hover:bg-cream-2 ${l.active ? "bg-cream-2" : ""}`}
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
            className="rounded-full px-2 py-1.5 text-[13px] font-semibold text-muted transition hover:bg-cream-2 hover:text-ink sm:px-2.5 sm:py-2 sm:text-sm"
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
