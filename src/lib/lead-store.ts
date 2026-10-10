import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type StoredSubmission = {
  form_type: string;
  payload: Record<string, unknown>;
  attribution: Record<string, unknown> | null;
  score: number | null;
  band: string | null;
  score_breakdown: Record<string, number> | null;
  rubric_version: string | null;
  page_url: string;
  user_agent: string;
  ip_hash: string;
};

export class LeadStoreUnavailableError extends Error {}

/**
 * Persists an immutable form submission.
 * - Production: Supabase `form_submissions` via PostgREST with the server-only service key
 *   (table has RLS enabled and no anon policies; see supabase/migrations).
 * - Development without Supabase env: appends to .data/leads.ndjson (gitignored).
 * Never silently drops a lead: misconfiguration in production throws.
 */
export async function storeSubmission(row: StoredSubmission) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key) {
    const res = await fetch(`${url}/rest/v1/form_submissions`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Supabase insert failed: ${res.status} ${await res.text()}`);
    }
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new LeadStoreUnavailableError("Lead storage is not configured.");
  }

  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "leads.ndjson"), JSON.stringify({ ...row, received_at: new Date().toISOString() }) + "\n");
}
