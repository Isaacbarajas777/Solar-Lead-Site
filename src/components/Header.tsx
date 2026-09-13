import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-sm font-bold text-white">
            SR
          </span>
          <span className="text-base font-semibold tracking-tight text-navy-900 group-hover:text-teal-700 sm:text-lg">
            {siteConfig.brandName}
          </span>
        </a>
        <div className="flex items-center gap-3 text-sm">
          <a
            href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
            className="hidden font-medium text-slate-700 hover:text-teal-700 sm:inline"
          >
            {siteConfig.phone}
          </a>
          <a
            href="#lead-form"
            className="rounded-lg bg-teal-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-teal-700 sm:text-sm"
          >
            Free consult
          </a>
        </div>
      </div>
    </header>
  );
}
