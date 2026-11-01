"use client";

import { useEffect, useState } from "react";

/**
 * Cookie / tracking consent helper.
 *
 * RULE: no third-party pixel, tag, or analytics script that sets cookies may load
 * until getConsent() === "accepted". Use `useConsent()` in client components or
 * `hasConsent()` before firing any event (e.g. a Meta "Lead" event).
 *
 * Vercel Web Analytics is first-party (/_vercel/insights) and cookieless, so it is
 * NOT gated; it is disclosed in the Privacy Policy instead.
 */
export type Consent = "accepted" | "rejected" | null;

const KEY = "nea-cookie-consent";
const CHANGE_EVENT = "nea:consent-change";
const OPEN_EVENT = "nea:open-cookie-settings";

export function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function hasConsent(): boolean {
  return getConsent() === "accepted";
}

export function setConsent(value: "accepted" | "rejected") {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // storage blocked: choice lasts for this page view only
  }
  window.dispatchEvent(new CustomEvent<Consent>(CHANGE_EVENT, { detail: value }));
}

/** Re-open the cookie banner (footer "Cookie settings" link). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookieSettings(cb: () => void) {
  window.addEventListener(OPEN_EVENT, cb);
  return () => window.removeEventListener(OPEN_EVENT, cb);
}

/** Current consent, updated live when the visitor changes it. `undefined` until mounted. */
export function useConsent(): Consent | undefined {
  const [consent, setState] = useState<Consent | undefined>(undefined);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(getConsent());
    const onChange = (e: Event) => setState((e as CustomEvent<Consent>).detail ?? getConsent());
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, []);
  return consent;
}
