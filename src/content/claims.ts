// Claims registry (docs/redesign/08 §4.6). A claim renders publicly ONLY when status is "approved".
// Every current entry is a statement already published on the WordPress site but not yet backed by
// evidence on file, so all start as "pending". The client flips one to "approved" once it is
// confirmed and sourced; until then the UI that depends on it is simply omitted.
export type ClaimStatus = "approved" | "pending" | "retired";

export type Claim = {
  statement: string;
  value?: string;
  label?: string;
  source: string;
  status: ClaimStatus;
};

export const claims = {
  madeInUsa: {
    statement: "Made in USA",
    label: "Manufactured in Salt Lake City, Utah",
    source: "Client instruction 2026-10-09 and existing site badge. Confirm the FTC 'all or virtually all' standard is met for materials and components (see claims checklist).",
    status: "approved",
  },
  deliveryWindow: {
    statement: "Typical delivery 3–4 months from contract",
    value: "3–4 mo",
    label: "Typical contract-to-delivery window",
    source: "Published on legacy site; caveats differ per model (up to 4 vs 6 modules). Needs one confirmed wording.",
    status: "pending",
  },
  responseTime: {
    statement: "We typically respond within 1 business day",
    source: "Legacy contact form copy. Confirm as an operational SLA (docs/redesign/12 Q-13).",
    status: "pending",
  },
  factoryInspections: {
    statement: "75–80% of inspections completed in the factory",
    value: "75–80%",
    label: "Of inspections completed in the factory",
    source: "About page; conflicts with '100% factory-controlled' on process page.",
    status: "pending",
  },
  productionScaling: {
    statement: "Production can scale 2x–10x in 60–90 days",
    value: "2x–10x",
    label: "Production scaling in 60–90 days",
    source: "About page. No evidence on file.",
    status: "pending",
  },
  marginIncrease: {
    statement: "30%+ increase in margins",
    source: "Homepage. No evidence on file. Recommend removal unless documented.",
    status: "pending",
  },
  costEfficiency: {
    statement: "20–30% cost efficiency",
    source: "What We Do page. Baseline unknown.",
    status: "pending",
  },
} satisfies Record<string, Claim>;

export type ClaimKey = keyof typeof claims;

export function approvedClaim(key: ClaimKey): Claim | null {
  const claim: Claim = claims[key];
  return claim.status === "approved" ? claim : null;
}
