export {};

type Fbq = {
  (command: "init", pixelId: string, userData?: Record<string, unknown>): void;
  (command: "track", eventName: string, params?: Record<string, unknown>): void;
  (command: "trackCustom", eventName: string, params?: Record<string, unknown>): void;
  (...args: unknown[]): void;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}
