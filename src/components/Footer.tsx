import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";
import { telHref } from "./site/SiteNav";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { privacyPath, termsPath } from "@/lib/legalPaths";

type Props = {
  dict: Dictionary;
  locale: Locale;
  /** Optional link to the other page (e.g. the full /home page). */
  moreLink?: { href: string; label: string };
};

export function Footer({ dict, locale, moreLink }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold-400/40 bg-ink-deep pb-28 pt-16 text-sm text-[#c9c4b8] md:pb-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="flex flex-wrap items-start justify-between gap-8 border-b border-white/10 pb-8">
          <div>
            <span className="inline-block rounded-sm bg-white px-3 py-2">
              <Image src="/logo.png" alt={siteConfig.brandName} width={400} height={182} className="h-11 w-auto" />
            </span>
            <p className="mt-3 max-w-[340px]">{dict.footer.tagline}</p>
            {moreLink ? (
              <Link href={moreLink.href} className="mt-3 inline-block font-medium text-gold-400 hover:text-[#e0c98a]">
                {moreLink.label} →
              </Link>
            ) : null}
          </div>
          <div className="leading-[1.9] sm:text-right">
            <a href={telHref} className="font-medium text-cream hover:text-gold-400">
              {siteConfig.phone}
            </a>
            <br />
            <a href={`mailto:${siteConfig.email}`} className="hover:text-cream">
              {siteConfig.email}
            </a>
            <br />
            {dict.site.areas}
          </div>
        </div>
        <p className="mt-6 max-w-[980px] text-[13px] leading-[1.7] text-[#b7b1a5]">{dict.footer.disclaimer}</p>
        <nav aria-label={dict.legal.privacy} className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium">
          <Link href={privacyPath(locale)} className="text-[#e8e4d8] underline-offset-4 hover:text-gold-400 hover:underline">
            {dict.legal.privacy}
          </Link>
          <Link href={termsPath(locale)} className="text-[#e8e4d8] underline-offset-4 hover:text-gold-400 hover:underline">
            {dict.legal.terms}
          </Link>
          <CookieSettingsButton
            label={dict.legal.cookieSettings}
            className="text-[#e8e4d8] underline-offset-4 hover:text-gold-400 hover:underline"
          />
        </nav>
        <p className="mt-4 text-xs text-[#b7b1a5]">
          © {year} {siteConfig.brandName}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
