# 13 — Build Status

**Updated:** 2026-10-10 · **Phase:** design foundation + homepage + catalog + lead capture (staging-ready, not deployed)

## Client decisions applied (2026-10-09)

| Decision | Implementation |
|---|---|
| Premium architectural editorial (Désourdy-led) | Ivory/carbon editorial system, oversized type, cinematic hero, GSAP-pinned timeline, page crossfades, model card → model page morph |
| Brand: always "MAR Technology" | `src/content/site.ts`; wordmark, metadata, footer (`MAR Technology Building Systems, Inc.`) |
| No unverified statistics | Claims registry `src/content/claims.ts` + checklist [14-claims-verification-checklist.md](14-claims-verification-checklist.md). All statistics pending → hidden. |
| Coverage: nationwide, subject to feasibility; SLC hub; Western U.S. focus; FLEX™ | `site.coverage` copy on home, about, FLEX, contact, form; all 50 states + DC in the form; lead score gives Western states +15, FLEX-scale elsewhere +10 (rubric v2) |
| Do not touch WordPress / WP Engine / DNS / analytics | Nothing outside this repo was modified |
| No photo/video budget yet; label concept images | Renders → "Rendering"; unconfirmed-origin images → "Concept image"; hero accepts video (`src/content/home.ts`) with poster, pause control, reduced-motion and Save-Data fallbacks |
| Made in USA tag | `MadeInUsaTag` (claim-controlled) in hero, drawer, contact, factory section, footer |
| Step-by-step form from the right | `LeadDrawer`: every "Start a project" link opens a right-side drawer (lazy-loaded form, presets from the link, Esc/backdrop close, scroll lock); `/contact/` remains the no-JS / SEO fallback |
| Current-site content direction | Hero ("Engineered for developers. Designed for rapid returns. Built to scale."), "Your vision. Built to suit." capabilities, pillars (Developer focused · Precision engineering · Elegance · Versatility) |

## Performance work & results

Changes: all pages static (only `/api/leads` is dynamic); reveals moved from 40+ ScrollTriggers to one IntersectionObserver + CSS; GSAP downloaded only on desktop when the pinned timeline approaches; hero parallax is a single rAF transform; hero headline has a fixed line count (font swap can't shift layout); variable fonts (3 files); CSS inlined; form JS lazy-loaded; images via `next/image` (AVIF/WebP, responsive sizes, eager + high priority only for LCP).

Lighthouse mobile (simulated slow 4G + 4× CPU, local production build, median of 3):

| Page | Perf | A11y | Best practices | SEO | CLS |
|---|---|---|---|---|---|
| Home | 68 (was 42) | 100 | 100 | 100 | 0 (was 0.26) |
| Models | 72 | 100 | 100 | 100 | 0 |
| Model detail | 74 | 100 | 100 | 100 | 0 |
| Solutions / Process / About | 69–72 | 100 | 100 | 100 | 0 |
| Contact | 70 | 100* | 100 | 100 | 0 |

\* contact link target size fixed after this run.

**Reading these numbers:** a near-empty control page (`/thank-you/`) scores the same ~70 on this machine, so the remaining gap is the Next/React baseline plus local headless-Chrome conditions, not page weight. Re-measure with PageSpeed Insights on the Vercel staging URL (CDN, HTTP/3, edge image cache) before drawing conclusions.

## Next

1. **Staging:** git init → GitHub repo → Vercel project (preview = staging) owned by MAR.
2. **Supabase project** (owned by MAR) → run `supabase/migrations/0001_form_submissions.sql` → env vars. Production refuses leads until configured.
3. **CRM & dashboard (priority 4):** auth (invite-only + MFA), leads inbox, contacts/orgs, pipeline, tasks, claims/content editing — per docs 08–09.
4. Lead alert emails (provider decision Q-14), consent banner + privacy policy, GA4 events.
5. Assets: vector logo, real photography/video, higher-res headshots; move images off the WordPress uploads library before decommissioning WP.
