# 12 — Risks, Missing Assets & Questions for Client Approval

## 1. Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | **No real project photography / case studies:** the premium editorial direction relies on imagery MAR doesn't have yet | High | High | Commission a factory + process shoot in P0; label renders; lead with factory/process/people until projects complete |
| R2 | **Unverified performance claims** (30%+ margins, 20–30% cost efficiency, 2x–10x scale) create legal/credibility exposure | High | High | Claims registry: nothing publishes without evidence and approval |
| R3 | Account ownership sits with an agency or individual (WP Engine, GA4, DNS) | Medium | High | P0 access audit; transfer ownership to MAR-controlled accounts |
| R4 | SEO dip after URL changes | Low–Med (young site) | Medium | Redirect map + automated tests, GSC monitoring, quick rollback |
| R5 | Custom CMS scope creep | Medium | Medium | Fixed block types; Payload fallback (Q-15); P5 can follow launch if needed |
| R6 | Lead data exposure | Low | Very high | RLS default-deny, server-only writes, MFA, policy tests, no PII in analytics/notifications, security review gate |
| R7 | Animation hurting performance/accessibility | Medium | Medium | Motion budget, reduced-motion paths, CWV budgets in CI |
| R8 | Lead volume too low for meaningful scoring/attribution early on | High | Low | Treat rubric as v1; report counts, not percentages, when n < 30 |
| R9 | Unidentified third-party script on the current site (privacy/security) | Unknown | Medium | Identify and remove/disclose before migration |
| R10 | Approval cycles stall the timeline | Medium | Medium | Approval gates per phase with named approver and turnaround (Q-21) |
| R11 | Consent/privacy non-compliance | Medium | Medium | Counsel review (Q-20), Consent Mode v2, processor list |

## 2. Missing assets (needed before or during build)

| Asset | Needed for | Phase |
|---|---|---|
| Logo in vector (SVG) + usage rules; FLEX™ logo vector; confirm ™ status | Header, favicon, OG images | P2 |
| **Professional photography:** factory exterior/interior, production line, modules in progress, QA inspection, transport, crane set, team at work | Hero, process, about, factory | P2–P3 |
| **Video:** 8–12 s hero loop (crane set or factory), optional 60–90 s factory film | Hero, factory | P3 |
| Consistent leadership portraits (same lighting/background) | About, home | P3 |
| Final (not "Not final") renders for all three models, plus Castello module count | Models | P3 |
| Floor plans as vector (DWG/PDF vector) to create SVG plan reveals | Models | P3 |
| Evidence for each statistic (see §3) | Claims | P3 |
| Named compliance details: third-party agency name(s), state modular program approvals, ICC references, any certifications | Compliance page | P3 |
| Completed or in-progress projects with client permission + facts | Projects | P3/P8 |
| Testimonials with written permission | Trust sections | P8 |
| Privacy policy / terms (counsel) | Legal | P7 |
| Brand fonts licence (if premium) | Design system | P2 |

## 3. Claims needing evidence or correction

| Current statement | Question |
|---|---|
| "30%+ increase in margins" | Based on which projects / model? Can it be documented? Otherwise remove. |
| "20–30% cost efficiency" | Compared to what baseline? Source? |
| "3–4 months from contract to delivery" | Confirm scope limits (up to 4 or 6 modules?) and wording used on all pages |
| "Traditional 8–14" vs "10–14 months" | Which is correct, with what source? |
| "75–80% of inspections in factory" vs "100% factory-controlled" | Which is accurate? |
| "Increase production 2x–10x in 60–90 days" | Evidence / conditions? |
| "1–100+ homes" | Capacity basis? Annual factory capacity (modules/month)? |
| "DAPIA-recognized third-party agencies" | Agency names and states approved? |
| "Labor availability: Guaranteed", "Weather delays: None" | Soften to defensible statements? |
| "Respond within 1 business day" | Confirm as an operational commitment (becomes the SLA) |

## 4. Questions requiring client approval

| ID | Question | Recommendation |
|---|---|---|
| **Q-01** | Approve creative direction? | A: Factory Editorial + Engineered Drawing details |
| Q-02 | Free (Inter Tight/Inter + Plex Mono) or licensed premium typeface? | Start free; upgrade if budget allows |
| Q-03 | Official brand name usage: "MAR Technology", "Mar Technology", "MarTech"? | Pick one long form + one short form |
| Q-04 | Process: 4 steps or 5 phases? | 4 public steps, checkpoints shown within |
| Q-05 | Phone lines: which number goes in header/schema? | Sales line (385) 535-1031 for CTAs; general line in footer |
| Q-06 | Who approves claims and has authority to sign them off? | Named owner (CEO or VP Sales) |
| Q-07 | Who are the top 3 competitors you lose deals to? | Needed for positioning teardown |
| Q-08 | Primary service area (states)? Nationwide vs Western U.S.? | Define for scoring and SEO pages |
| Q-09 | Approve new URL structure with 301s (vs keeping old model URLs)? | Approve 301s now while equity is small |
| Q-10 | Smooth scrolling (Lenis): yes/no after staging test? | Decide on staging |
| Q-11 | Calendar tool for priority leads? | Whatever sales already uses (Calendly / Cal.com / Bookings) |
| Q-12 | Lead assignment rules and rep visibility (own vs all)? | Round-robin by segment; reps see own + unassigned |
| Q-13 | First-response SLA? | 1 business day (matches current promise), 2 h for Priority |
| Q-14 | Transactional email provider & sending domain? | Resend or Postmark with SPF/DKIM/DMARC on the domain |
| Q-15 | Custom CMS in dashboard vs Payload CMS? | Custom (single DB for attribution); Payload as fallback |
| Q-16 | Google Workspace or Microsoft 365 for staff SSO? | SSO later; email + MFA at launch |
| Q-17 | Hosting budget: Vercel Pro + Supabase Pro (backups/PITR)? | Yes for production |
| Q-18 | Is GA4 already tracking form submissions? Who owns the GA4 property? | Verify in P0 |
| Q-19 | Google Tag Manager or direct gtag? | Direct gtag unless marketing team will manage tags |
| Q-20 | Legal review of privacy policy, consent approach, ad pixels? | Required before launch |
| Q-21 | Who is the approver at each gate, and turnaround time? | One decision-maker + 3 business days |
| Q-22 | Relationship with Sprout Media Lab: continuing, handing over, or ending? Who owns current content/design rights? | Clarify before P0 ends |
| Q-23 | What is the unidentified `s.ksrndkehqnwntyxlhgto.com` script on the current site? | Identify; remove or disclose |
| Q-24 | Separate segment page for Build-to-Rent, or inside Developers? | Inside Developers unless BTR is a major target |
| Q-25 | Careers page needed? | Only if hiring |
| Q-26 | Budget for photo/video production? | Highest-ROI asset investment in this plan |
