import type { Dictionary } from "@/i18n";
import { PhoneIcon } from "./icons";
import { telHref } from "./SiteNav";

/** Sticky bottom bar on phones: tap-to-call + check eligibility. */
export function CallBar({ dict, checkHref }: { dict: Dictionary; checkHref: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2.5 border-t-2 border-black bg-[rgba(31,23,18,0.96)] px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 md:hidden">
      <a href={telHref} className="btn btn-primary flex-1 !gap-2 !px-2 !py-3.5 !text-[14px] whitespace-nowrap min-[380px]:!text-[15px]">
        <PhoneIcon className="h-4 w-4" />
        {dict.site.callbar.call}
      </a>
      <a href={checkHref} className="btn btn-ghost flex-1 !gap-2 !px-2 !py-3.5 !text-[14px] whitespace-nowrap min-[380px]:!text-[15px]">
        {dict.site.callbar.check}
      </a>
    </div>
  );
}
