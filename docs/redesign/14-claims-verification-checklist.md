# 14 — Claims Verification Checklist

**Rule (client decision 2026-10-09):** no unverified statistic about construction timelines, profit margins, cost savings, manufacturing capacity or project delivery is published. Each claim lives in the claims registry — today `src/content/claims.ts`, later the dashboard CMS (`claims` table, doc 08 §4.6). A claim appears on the site only when its status is `approved`.

## How to approve a claim
1. Gather the evidence listed below and store it (contract, schedule, cost report, certification).
2. Agree final wording, including any qualifier (for example "for orders up to 4 modules").
3. Named approver signs off (Q-06). Record who and when.
4. Set `status: "approved"` and put the evidence reference in `source`. The site updates on the next deploy (or instantly, once the CMS ships).
5. Set a review date. Re-verify every claim at least annually.

## Registry

| Key | Statement (legacy site) | Status | Evidence needed | Where it appears when approved |
|---|---|---|---|---|
| `madeInUsa` | Made in USA | **Approved by client instruction** — see note | Bill of materials showing "all or virtually all" U.S. content (FTC standard, 16 CFR Part 323). If not met, use "Manufactured in Salt Lake City, Utah" instead. | Hero, drawer, contact, footer, factory section |
| `deliveryWindow` | 3–4 months from contract to delivery | Pending | 3+ completed project schedules (contract date → delivery date); agreed qualifier per model and order size | Home proof strip, model pages |
| `responseTime` | Respond within 1 business day | Pending | Operational commitment from sales lead; CRM SLA report once the dashboard is live | Contact page, drawer, thank-you page, CTA band |
| `factoryInspections` | 75–80% of inspections completed in the factory | Pending | Inspection agency documentation; resolve the conflict with "100% factory-controlled" | Home proof strip, process page |
| `productionScaling` | Production can scale 2x–10x in 60–90 days | Pending | Capacity study or documented precedent; conditions | Home proof strip, FLEX™ page |
| `marginIncrease` | 30%+ increase in margins | Pending — **recommend removal** | Project-level pro forma comparison with a disclosed baseline | — |
| `costEfficiency` | 20–30% cost efficiency | Pending — **recommend removal** unless the baseline is documented | Cost comparison vs. a named site-built baseline | — |

### Not stated as statistics (benefit-focused copy in use)
"Reduced time to market", "predictable returns", "fixed-price bids", "built in parallel", "no weather delays to factory production" — these describe the operating model, not measured outcomes, and carry no numbers.

### Also requires documentation before publishing
- Named third-party inspection / DAPIA agencies and state modular program approvals.
- Any certification badge, client logo, testimonial or completed-project case study (written permission on file).
- Origin of every image currently labelled **"Concept image"** (`provenance: "unconfirmed"` in `src/content/media.ts`) — confirm as MAR-owned photography or keep the label.
