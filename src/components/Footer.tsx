import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { telHref } from "./site/SiteNav";

type Props = {
  dict: Dictionary;
  /** Optional link to the other page (e.g. the full /home page). */
  moreLink?: { href: string; label: string };
};

export function Footer({ dict, moreLink }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-deep pb-28 pt-14 text-sm text-[#cdbfae] md:pb-14">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="flex flex-wrap items-start justify-between gap-8 border-b border-[#2f251d] pb-7">
          <div>
            <span className="inline-block rounded-[14px] bg-white px-3 py-2">
              <Image src="/logo.png" alt={siteConfig.brandName} width={400} height={182} className="h-11 w-auto" />
            </span>
            <p className="mt-3 max-w-[340px]">{dict.footer.tagline}</p>
            {moreLink ? (
              <Link href={moreLink.href} className="mt-3 inline-block font-semibold text-[#f7a531] hover:text-[#ffc04d]">
                {moreLink.label} →
              </Link>
            ) : null}
          </div>
          <div className="leading-[1.9] sm:text-right">
            <a href={telHref} className="font-semibold text-white hover:text-[#ffc04d]">
              {siteConfig.phone}
            </a>
            <br />
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
              {siteConfig.email}
            </a>
            <br />
            {dict.site.areas}
          </div>
        </div>
        <p className="mt-6 max-w-[980px] text-[13px] leading-[1.7] text-[#a8998a]">{dict.footer.disclaimer}</p>
        <p className="mt-4 text-xs text-[#7d6f62]">
          © {year} {siteConfig.brandName}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
