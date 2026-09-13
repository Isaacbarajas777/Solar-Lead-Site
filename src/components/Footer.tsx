import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-semibold text-navy-900">{siteConfig.brandName}</p>
            <p className="mt-1 max-w-md text-sm text-slate-600">{siteConfig.tagline}</p>
          </div>
          <div className="text-sm text-slate-700">
            <p>
              <a
                href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                className="hover:text-teal-700"
              >
                {siteConfig.phone}
              </a>
            </p>
            <p className="mt-1">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-teal-700">
                {siteConfig.email}
              </a>
            </p>
            {siteConfig.address ? (
              <p className="mt-1 text-slate-600">{siteConfig.address}</p>
            ) : null}
          </div>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-slate-500">
          {siteConfig.disclaimer}
        </p>

        <p className="mt-4 text-xs text-slate-400">
          © {year} {siteConfig.brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
