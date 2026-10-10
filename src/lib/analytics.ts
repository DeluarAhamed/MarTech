// GA4 event helper (docs/redesign/10 §4). No-ops when GA is not loaded. Never pass PII.
type Gtag = (command: "event", name: string, params?: Record<string, string | number | boolean>) => void;

export function track(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}
