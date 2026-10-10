import "server-only";

// Best-effort in-memory limiter (per server instance). Replace with a shared store
// (Postgres or Upstash) when the platform phase lands — docs/redesign/07 §6.
const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}
