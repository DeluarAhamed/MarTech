// Session-scoped attribution capture (docs/redesign/10 §3).
// No consent banner exists yet, so nothing persists beyond the browser session and no cookies are set.
// Cross-session first-touch will be enabled once consent mode is implemented.

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid", "msclkid", "li_fat_id"];
const STORE = "mar_attr";

type Touch = Record<string, string>;
type Attribution = { first?: Touch; last?: Touch; pages?: string[] };

function read(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(STORE) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}

function write(value: Attribution) {
  try {
    sessionStorage.setItem(STORE, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) — attribution is best-effort */
  }
}

export function recordPageView(url: URL) {
  const state = read();
  const touch: Touch = {};
  for (const key of KEYS) {
    const v = url.searchParams.get(key);
    if (v) touch[key] = v.slice(0, 200);
  }
  const externalReferrer = document.referrer && !document.referrer.startsWith(url.origin) ? document.referrer : "";
  const hasSource = Object.keys(touch).length > 0 || externalReferrer;

  if (hasSource || !state.first) {
    const enriched: Touch = { ...touch, landing_page: url.pathname, touched_at: new Date().toISOString() };
    if (externalReferrer) enriched.referrer = externalReferrer.slice(0, 300);
    if (!state.first) state.first = enriched;
    // Last non-direct touch: direct visits don't overwrite a known source.
    if (hasSource || !state.last) state.last = enriched;
  }

  const pages = state.pages ?? [];
  if (pages[pages.length - 1] !== url.pathname) pages.push(url.pathname);
  state.pages = pages.slice(-20);
  write(state);
}

export function getAttribution(): Attribution {
  return typeof window === "undefined" ? {} : read();
}
