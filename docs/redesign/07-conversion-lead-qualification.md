# 07 — Conversion & Lead Qualification Flow

## 1. Conversion hierarchy

| Priority | Conversion | Where | Stored as |
|---|---|---|---|
| **Primary** | "Start a project" submission | `/contact/`, inline starts on home, segment, and model pages | `form_submissions` → `leads` |
| Secondary | Factory tour request | `/factory-tour/`, process, about | `form_submissions(type=tour)` |
| Secondary | FLEX™ qualification | FLEX section/page | `form_submissions(type=flex)` |
| Micro | Phone click, email click | header/footer/contact | GA4 event only (no PII) |
| Micro | Floor-plan / spec download | model pages | GA4 event; optional email capture for "spec pack" |
| Micro | Model compare used, model filter used | catalog | GA4 event |

**Floor plans stay ungated** (they are public today; gating hurts trust and SEO). A richer **"Developer spec pack"** (specs + process + documentation checklist) can be gated later, once it exists.

## 2. "Start a project" multi-step form

Progressive: each step is short, shows a progress bar, and saves to session storage so a refresh doesn't lose data.

| Step | Fields | Notes |
|---|---|---|
| 1 · What | Project type: *Housing community · Single-family · Townhome/multifamily · ADU · Classroom/education · Office/flex · Workforce/employee housing · PMRV · Other* | Preselected from the segment or model the visitor came from |
| 2 · Scale | Units **or** modules (number input + "not sure"); model interest (multi-select from CMS) | Replaces the current 5–49 / 50–99 ranges, which don't fit classrooms or ADUs |
| 3 · Where & when | Project location (city, state, ZIP); target delivery quarter; **project stage**: *exploring · land secured · entitlements in progress · entitled/permitted · financing secured* | Stage is the strongest intent signal |
| 4 · Plans | *Have stamped plans · Have schematic plans · Need design services* · optional file upload (PDF ≤ 20 MB, virus-scanned, private bucket) | |
| 5 · You | First and last name, company, role (*Developer · GC · Architect · School/district · Government · Investor · Other*), email, phone (optional), message (optional), **consent checkbox** for follow-up | Required minimum: name, company, email |

- **Short alternative:** a "Just talk to sales" link collapses the form to name, email, phone, and message, for impatient high-intent visitors.
- **After submit:** the `/thank-you/` page shows what happens next (who replies, the response window **only once the client confirms it**, what to prepare). If the lead scores as **priority**, it shows an embedded calendar (Q-11: Cal.com, Calendly, or Microsoft Bookings).

## 3. Hidden fields (captured automatically, never shown)

`anonymous_id`, first-touch and last-touch `utm_source/medium/campaign/term/content`, `gclid`/`gbraid`/`wbraid`, `fbclid`, `msclkid`, `li_fat_id`, `referrer`, `landing_page`, `entry_timestamp`, `page_of_conversion`, `form_variant`, GA4 `client_id` and `session_id` (for joining to GA4 data, consent-dependent). See doc 10 §3.

## 4. Lead scoring (initial rubric, tune after 60–90 days of data)

The score is **transparent and versioned** (`lead_scores.rubric_version`). It is shown in the dashboard with its per-factor breakdown. **Weights are starting assumptions, not data.**

| Factor | Points |
|---|---|
| Stage: financing secured / entitled | +25 / +20 |
| Stage: land secured / entitlements in progress | +12 / +15 |
| Stage: exploring | +0 |
| Scale ≥ 50 units (or ≥ 20 classrooms) | +20 |
| Scale 10–49 | +12 |
| Scale 2–9 | +6 |
| Location in primary service area (client-defined, Q-08) | +15 |
| Outside service area but FLEX™-eligible scale | +10 |
| Timeline ≤ 6 months / 6–12 months | +10 / +6 |
| Role: developer / GC / school district | +8 |
| Has plans (stamped / schematic) | +6 / +3 |
| Business email domain | +4 |
| Free-mail domain | 0 (no penalty, just no bonus) |

**Bands:** ≥ 60 = **Priority** (immediate alert to sales, calendar offered), 35–59 = **Qualified** (respond within the SLA), < 35 = **Nurture** (helpful resources, periodic check-in).

**Disqualification is a human decision, never automatic.** Spam is filtered separately (below).

## 5. Routing & SLA

1. Submission is validated server-side (Zod) and stored immutably in `form_submissions`.
2. A transaction creates or updates the `organization` and `contact` (deduped by email and company domain), creates a `lead`, and computes a `lead_score`.
3. Assignment follows client rules (Q-12): round-robin, by segment, or by territory. An unassigned lead lands in a shared queue.
4. Notification: email to the assigned rep and sales@, plus optional Slack/Teams, **containing a dashboard link only, not the full lead PII**.
5. Auto-acknowledgement email to the prospect, with the copy approved by the client.
6. A task is created automatically: "First response" due within the SLA (Q-13). Overdue tasks escalate to the sales manager.

## 6. Spam & abuse protection

- Honeypot field + minimum time-to-submit check.
- **Cloudflare Turnstile** (privacy-friendly, invisible in most cases), verified server-side.
- Rate limit per IP + per email (for example 5/hour), implemented with a Postgres table or Upstash. Decide in Phase 1.
- Uploads: MIME + magic-byte check, size cap, private storage bucket, malware scan before staff can download.

## 7. Conversion-rate principles applied site-wide

- **One** primary CTA label ("Start a project") everywhere.
- Every page ends in a conversion block. Model pages preselect the model.
- Phone is visible on desktop headers. The mobile sticky bar offers call + start.
- Trust is placed next to forms: response promise (if confirmed), privacy line, named sales contact with photo (Derek Clegg, VP Sales, if approved).
- Remove friction: no CAPTCHAs puzzles, no required phone, no account creation.
- Test later (after baseline): hero headline variants, form step order, and the calendar offer threshold.
