# 02 — Reference & Competitor Design Analysis

**Rule:** we extract *principles*, never layouts, copy, imagery, animation timelines, fonts, or branding. Each reference below is summarised as "what it does well → how MAR adapts it".

Observed on 2026-10-09:

| Site | Stack observed | Type system | Base colour |
|---|---|---|---|
| Construction Désourdy | Astro 5 + Storyblok CMS + Lenis smooth scroll | One grotesk (GT America) | White |
| HUTS | Custom | Grotesk + display serif | Warm off-white |
| Photoncycle | Custom | Single grotesk (Diatype) | White |
| Elevate Homescriptions | Custom | Helvetica Neue + display serif | Warm cream |
| Groth Studio | Custom | Neue Montreal + mono | White |

**Takeaway on tech:** none of them relies on heavy WebGL. The premium feel comes from **typography, photography, spacing, and pacing**, with one or two signature interactions. That supports a restrained GSAP plan (doc 06).

---

## 1. Construction Désourdy — primary direction

**What it does well**
- **Radical navigation restraint:** four items plus language. Contact is a modal, not a page hunt.
- **Photography carries the brand.** Large, full-bleed, consistent architectural images with almost no decoration.
- **Editorial pacing:** short statement → big image → project gallery → services trio → history/trust. Every section has one job.
- **A projects gallery as the core proof.** Projects are named like products ("Brill 02", "MaisonArt 01"), which gives a portfolio feel.
- **Single typeface, many sizes.** Hierarchy comes from scale and weight, not from mixing fonts.
- **Quiet motion:** smooth scroll, rotating images, inline video. Nothing competes with the photo.

**MAR adaptation**
- Keep the global nav to five items plus a persistent **"Start a project"** button. Put a phone number in the header on desktop.
- Name and number things like an engineering firm: models as products (*Bohemian*, *Solterra*, *Castello*) and future projects as `MT-P-001 · Location · Year`.
- Lead each section with a statement-size line of copy. Body copy stays short.
- **Hard dependency:** Désourdy's look depends on real project photography. MAR has renders only. Until real photos exist, the editorial look must be carried by **factory and process imagery** (doc 12, asset list).

## 2. HUTS — model exploration and product discovery

**What it does well**
- **Two parallel ways in:** by *intent* (Starter Home, ADU, Investment Property, Multi-Gen…) and by *product* ("Standards": Small L, Big Bar, Dogtrot…).
- "It all starts with our Standards… and we work with you to make it yours." This frames a catalog plus customisation without overwhelming buyers.
- Portfolio entries are named places, which gives a sense of lived outcomes.
- Social proof appears just before the final CTA.

**MAR adaptation**
- **Model catalog with dual entry:** *By application* (Housing · Education · Workforce & Flex · Commercial/Custom) and *By model* (Bohemian · Solterra · Castello · Custom/your plans).
- Model cards show **verified specs only**: sqft, footprint, module count, bed/bath, applications.
- Each model page carries a "Standard → Configure → Your project" framing: base spec, documented options, then "bring your own plans".
- **Comparison view** (2–3 models side by side) for developers evaluating density and footprint.

## 3. Photoncycle — technical storytelling

**What it does well**
- It explains a complex system in **numbered steps (01–04)**, one idea per step, with visuals tied to each.
- It opens with the problem it solves, then the mechanism, then outcomes (autonomy, predictable spend).
- A **self-serve estimator** ("Estimate savings") converts curiosity into intent.
- FAQ and press logos handle objections and credibility.

**MAR adaptation**
- **"Built in parallel" explainer:** a pinned, scroll-driven timeline in which site work and factory production run side by side and converge at set day. This is MAR's core value mechanism and suits this format exactly.
- **FLEX™ explainer** in 4 numbered steps (Demand → Deploy → Produce → Deliver, which already exist in site copy) on an abstract map.
- **Project scoping tool** (not a price calculator). It turns type + units + location + timeline into a recommended model, module count, and "talk to us" path. It shows **no invented prices or savings**. Any numbers it displays must come from approved claims (doc 08, `claims`).
- An objection-handling FAQ for financing and lender acceptance, codes and approvals, transport radius, customisation limits, and warranty. Answers must be supplied by the client.

## 4. Elevate Homescriptions — customer journey & conversion architecture

**What it does well**
- **Audience-segmented navigation** (Homeowners / Realtors / Service Pros), so each visitor self-identifies immediately.
- One primary CTA ("Get a quote") repeated at natural decision points with consistent wording.
- Plain-language problem framing ("More Living. Less Fixing.") plus a clear comparison with the old way.
- Testimonials framed as "Real homeowners. Real experiences."

**MAR adaptation**
- **Segment paths:** *Developers & builders*, *Education & public sector*, *Workforce & commercial*. Each has a landing page with tailored proof and form presets (doc 03).
- One primary CTA everywhere: **"Start a project"**. One secondary CTA: **"Book a factory tour"**. Use no other CTA vocabulary.
- Keep "Modular vs. traditional" comparisons, but rebuild them **only from verified claims** with stated assumptions.

## 5. Groth Studio — typographic precision

**What it does well**
- An extremely minimal grid, generous whitespace, and a **monospace secondary face** for metadata, which reads as precise and studio-grade.
- Projects lead and text follows.

**MAR adaptation**
- Use **mono for specifications and labels** (dimensions, module counts, drawing-style section codes). This is the bridge between "architectural editorial" and "industrial engineering", and the most natural way to make the brand feel specific to MAR.

---

## 6. Competitive context (category, not a copy target)

Modular manufacturers serving developers tend to show the same pattern: stock-feeling imagery, heavy "faster/cheaper/greener" claims, and long feature lists. **The opening for MAR:** be the most *precise and credible* voice in the category, with real specs, real factory, named people, and documented process, delivered with the polish of a high-end architecture studio.

A competitor teardown of named modular manufacturers is **out of scope** for this pass. It needs client input on who they actually lose deals to (see doc 12, Q-07).

## 7. Three creative directions to choose from

| | A. **Factory Editorial** *(recommended)* | B. Engineered Drawing | C. Industrial Cinematic |
|---|---|---|---|
| Lead | Désourdy-style ivory pages, oversized grotesk, full-bleed imagery | Blueprint linework, mono labels, plan-to-render reveals | Dark carbon UI, factory video, high contrast |
| Feel | Premium, calm, architectural | Technical, precise | Bold, industrial, energetic |
| Risk | Needs strong photography | Can feel cold or "SaaS" | Video production cost; heavier pages |
| Fit with MAR assets today | Medium (renders + factory shoot) | **High** (floor plans and specs exist) | Low (no footage yet) |

**Recommendation:** use **A as the base, with B as the detail layer.** Ivory editorial pages with oversized type, plus mono spec labels, drawing-sheet section codes, and floor-plan line reveals. Use C sparingly in one dark "Factory" chapter once real footage exists.

**Decision required:** client to approve direction (doc 12, Q-01).
