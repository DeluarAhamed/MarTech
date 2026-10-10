# 04 — Homepage Wireframe (section by section)

Copy shown in *italics* is **placeholder direction for approval**, not final copy. Bracketed `[CLAIM]` items render only if an approved claim exists in the `claims` table.

Section codes (`A-01`, `A-02`…) are displayed in small mono type like drawing-sheet numbers. This is a signature detail of the design system.

---

### A-00 · Header
```
┌───────────────────────────────────────────────────────────────────────────┐
│ MAR▢  Solutions  Models  Process  Projects  About  Insights   ☎  [Start a project →] │
└───────────────────────────────────────────────────────────────────────────┘
```
- Transparent over the hero, then switches to an ivory background with a hairline border after 80 px of scroll. It hides on scroll-down and returns on scroll-up.
- **Goal:** constant access to the primary CTA. **Event:** `cta_click {location:'header'}`.

### A-01 · Hero
```
┌───────────────────────────────────────────────────────────────────────────┐
│  [full-bleed image/video: module being crane-set OR factory line]          │
│                                                                           │
│  A-01                                                                     │
│  BUILT IN                                                                  │
│  PARALLEL.                     ← oversized display, 2–3 lines max          │
│                                                                           │
│  Modular buildings engineered for developers — manufactured in our        │
│  Salt Lake City facility while your site is prepared.                     │
│                                                                           │
│  [Start a project →]   [Explore models]                                   │
│ ───────────────────────────────────────────────────────────────────────── │
│  STEEL-FRAMED MODULES · 12'×40'–48' · SINGLE-FAMILY · TOWNHOME · CLASSROOM │ ← mono spec ticker (static)
└───────────────────────────────────────────────────────────────────────────┘
```
- Headline options for approval: *"Built in parallel."* / *"Engineered off-site. Delivered on schedule."* / *"The factory behind your next community."*
- **Asset need:** real factory or crane-set footage (8–12 s loop, muted, poster frame). Fallback: the best existing exterior render, **labelled "Rendering"**.
- **Goal:** state what MAR is, for whom, and where in under 5 seconds.

### A-02 · Positioning statement
```
│  A-02                                                                     │
│  We manufacture for developers — not one-off buyers.     ← statement size│
│  Fixed factory pricing, engineered plan sets and lender-ready             │
│  documentation, from 1 module to whole communities.                       │
│                                                [image: plan → render]     │
```
- Reuses existing approved positioning. One paragraph, max 45 words.

### A-03 · Who we build for (segment router)
```
│  [Housing developers]   [Education & public sector]   [Workforce & flex]  │
│   image + 1 line          image + 1 line                image + 1 line     │
```
- Three large tiles route to the `/solutions/*` pages and set a `segment` hint used to preset the form.
- **Event:** `segment_select`.

### A-04 · Proof strip (claims-driven)
```
│  [CLAIM: delivery window]  [CLAIM: production scaling]  [CLAIM: ...]       │
│  each: big number · short label · footnote "Source/assumptions ↗"          │
```
- **Renders only approved claims.** If fewer than 2 are approved, the section collapses into a single factual line ("Steel-framed modules · built to ICC, state & local codes · Salt Lake City manufacturing hub"), provided those facts are confirmed.

### A-05 · Model explorer (HUTS-inspired)
```
│  A-05  THE STANDARDS                                       [All][Housing][Education][Flex] │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │ Bohemian     │ │ Solterra     │ │ Castello     │ │ Your plans   │       │
│  │ 480–576 sqft │ │ 1,440 sqft   │ │ 1,368 sqft   │ │ We build from│       │
│  │ 1 module     │ │ 3 modules    │ │ multi-module │ │ your set     │       │
│  │ ADU·Class·Office│ 2bd/2.5ba   │ │ 2bd/2.5ba    │ │              │       │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘       │
│                                             [Compare models]  [All models →]│
```
- Hover/focus reveals the floor-plan line drawing over the render (plan → render). Specs are pulled from the CMS. Castello's module count is TBC by client.

### A-06 · "Built in parallel" explainer (signature interaction)
```
│  A-06                                                                     │
│  SITE   ████ permits ████ foundations ████ utilities ───────┐             │
│  FACTORY        ████ design ████ build ████ inspect ─────────┤→ SET DAY   │
│  TRADITIONAL ███████████████████████████████████████████████████████→     │
│  (scroll scrubs the timeline; labels appear in sequence)                  │
```
- Pinned section, scrubbed by scroll on desktop. On mobile and with reduced motion it becomes a static stacked diagram.
- Durations display **only from approved claims, with assumptions**. Otherwise it shows relative bars with no numbers.

### A-07 · Process in four steps
```
│  01 Design & engineering   02 Factory build   03 Delivery & set   04 Finish & handover │
```
- The step count must be unified (4 vs. 5, client decision Q-04). Links to `/process/`.
- Mentions client visibility via Buildertrend (existing fact).

### A-08 · FLEX™ manufacturing
```
│  [dark carbon section]                                                     │
│  A-08  FLEX™ — Flexible Localized Expansion & Execution                    │
│  We bring the factory to the project.                                     │
│  01 Demand  02 Deploy  03 Produce  04 Deliver   + abstract US map with hub │
│  [See if your project qualifies →]                                        │
```
- The one dark chapter on the page. The CTA opens the form with the FLEX path preselected.

### A-09 · Engineering & compliance
```
│  Engineered by engineers.  Steel structure · Third-party plan review &    │
│  inspection · ICC / state / local code compliance · Lender-ready docs     │
│  [named agencies/logos ONLY if verified]           [Engineering details →] │
```

### A-10 · Projects (conditional) / Factory (fallback)
- **If verified projects exist:** an editorial gallery of 2–3 projects (Désourdy-style), each with a mono facts strip.
- **Else:** "Inside the factory" with real facility photography and a **Book a factory tour** CTA.

### A-11 · Leadership teaser
```
│  The team behind every project.   [5–6 portraits, name, role]  [About →]  │
```
- Builds credibility with real people, which matters especially without case studies. Portraits need consistent photography (doc 12).

### A-12 · Insights (conditional, ≥3 published articles)
- Three latest articles. Hidden until content exists.

### A-13 · Final conversion block
```
│  Start a project.                                                          │
│  What are you building?                                                    │
│  ( Housing community ) ( Classrooms ) ( Workforce / flex ) ( Something else ) │
│  → selecting opens /contact with step 1 completed                         │
│  Prefer to talk?  (385) 535-1031 · sales@…    We respond within 1 business day [CLAIM-like: confirm] │
```

### A-14 · Footer
- Sitemap, both locations, separately labelled phone lines, LinkedIn, privacy/terms/accessibility, © line. No agency credit, or a small one if contractually required.

---

## Mobile notes
- Hero headline ≤ 3 lines at 360 px. CTAs stack full-width.
- The model explorer becomes a horizontal snap carousel with a visible next-card peek, and the filter becomes a select.
- The parallel explainer becomes static stacked bars.
- A sticky bottom bar on scroll offers "Start a project" and a call icon.

## Section performance budget
- The hero media is the LCP element. Use a poster image ≤ 180 KB AVIF, preloaded, and lazy-start the video after LCP.
- Everything below the fold is lazy-loaded. GSAP loads only on routes that use it.
