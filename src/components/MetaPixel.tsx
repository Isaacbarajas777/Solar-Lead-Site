"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "@/lib/consent";

/**
 * Meta (Facebook) Pixel, loaded ONLY after the visitor clicks Accept.
 * Rendered from the root layout only when NEXT_PUBLIC_META_PIXEL_ID is set.
 * Nothing is requested from facebook.net / facebook.com before consent.
 * (No <noscript> image: it would fire without consent.)
 */
export function MetaPixel({ pixelId }: { pixelId: string }) {
  const consent = useConsent();
  const pathname = usePathname();
  const loaded = useRef(false);

  useEffect(() => {
    if (consent !== "accepted") return;
    if (!loaded.current) {
      loaded.current = true;
      /* eslint-disable */
      // Official Meta base code, injected on consent.
      (function (f: any, b: Document, e: string, v: string) {
        if (f.fbq) return;
        const n: any = (f.fbq = function (...args: unknown[]) {
          n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
        });
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = "2.0";
        n.queue = [];
        const t = b.createElement(e) as HTMLScriptElement;
        t.async = true;
        t.src = v;
        const s = b.getElementsByTagName(e)[0];
        s.parentNode!.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      /* eslint-enable */
      window.fbq?.("init", pixelId);
    }
    window.fbq?.("track", "PageView");
  }, [consent, pixelId, pathname]);

  return null;
}
