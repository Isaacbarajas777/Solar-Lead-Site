"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Fires a Meta Pixel PageView on client-side (App Router) route changes.
 * Skips the first render: the initial PageView is sent by the base snippet,
 * so this avoids a duplicate on first load.
 */
export function MetaPixelRouteTracker() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
