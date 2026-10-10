import { createHash } from "node:crypto";
import { leadSchema } from "@/lib/lead-schema";
import { LeadStoreUnavailableError, storeSubmission } from "@/lib/lead-store";
import { rateLimited } from "@/lib/rate-limit";
import { scoreLead } from "@/lib/scoring";

const MIN_FILL_MS = 2500;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many submissions. Please call us instead." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot / speed trap: answer like a success so bots learn nothing, but store nothing.
  const raw = body as { website?: unknown; startedAt?: unknown };
  if ((typeof raw.website === "string" && raw.website.length > 0) ||
      (typeof raw.startedAt === "number" && Date.now() - raw.startedAt < MIN_FILL_MS)) {
    return Response.json({ ok: true });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const lead = parsed.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- strip spam-trap fields from the stored payload
  const { attribution, pageUrl, website, startedAt, ...payload } = lead;
  const scored = lead.formType === "project" ? scoreLead(lead) : null;

  try {
    await storeSubmission({
      form_type: lead.formType,
      payload,
      attribution: attribution ?? null,
      score: scored?.score ?? null,
      band: scored?.band ?? null,
      score_breakdown: scored?.breakdown ?? null,
      rubric_version: scored?.rubricVersion ?? null,
      page_url: pageUrl,
      user_agent: (request.headers.get("user-agent") ?? "").slice(0, 300),
      ip_hash: createHash("sha256").update(`${process.env.LEAD_IP_SALT ?? ""}${ip}`).digest("hex"),
    });
  } catch (error) {
    console.error("[leads] store failed", error instanceof Error ? error.message : error);
    const status = error instanceof LeadStoreUnavailableError ? 503 : 500;
    return Response.json(
      { ok: false, error: "We couldn't save your request. Please call (385) 535-1031 or email sales@martechbuildingsystems.com." },
      { status },
    );
  }

  return Response.json({ ok: true });
}
