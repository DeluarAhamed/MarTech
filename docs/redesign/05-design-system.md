# 05 — Design System Specification

Direction: **Factory Editorial + Engineered Drawing details** (doc 02 §7). Premium, editorial, architectural, minimal, confident.

## 1. Colour

### Brand palette (as proposed)
| Token | Hex | Role |
|---|---|---|
| `--ivory` | `#F5F3EE` | Default page background |
| `--carbon` | `#171A19` | Primary text; dark-section background |
| `--stone` | `#80857D` | Secondary UI, borders, large secondary text |
| `--bronze` | `#B49C7B` | Accent: rules, highlights, focus details, accents on dark |
| `--white` | `#FFFFFF` | Cards/surfaces on ivory, text on carbon |

### Contrast check (WCAG 2.x, calculated)
| Pair | Ratio | Verdict |
|---|---|---|
| Carbon on Ivory | ~15.8 : 1 | ✔ AAA body text |
| Stone on Ivory | ~3.4 : 1 | ⚠ **Fails AA for body text.** OK only for text ≥ 24 px (or 18.7 px bold), icons, and borders |
| Bronze on Ivory | ~2.4 : 1 | ✖ **Fails even for large text.** Decorative use only on light backgrounds |
| Bronze on Carbon | ~6.7 : 1 | ✔ AA body text |
| Stone on Carbon | ~4.6 : 1 | ✔ AA body text (just) |
| Ivory on Carbon | ~15.8 : 1 | ✔ AAA |

### Proposed accessible extensions (need approval)
| Token | Hex | Ratio on Ivory | Use |
|---|---|---|---|
| `--stone-ink` | `#5F645D` | ~5.5 : 1 | Small secondary text, captions, metadata on light |
| `--bronze-ink` | `#7A6548` | ~5.0 : 1 | Links, small accent text on light |
| `--hairline` | `rgba(23,26,25,0.12)` | — | Grid lines, dividers |
| `--focus` | `#7A6548` (light) / `#B49C7B` (dark) | — | 2 px focus ring + 2 px offset |
| `--danger` / `--success` | to define | ≥ 4.5 | Form states and dashboard only |

Dashboard uses the same tokens with a denser surface scale (`--surface-1..3`) and a validated categorical chart palette (defined in the dashboard phase).

## 2. Typography

**Principle:** one grotesk family carries everything through scale (Désourdy). A mono face adds the engineering layer (Groth).

| Role | Default (free, self-hosted) | Premium option (licence needed) |
|---|---|---|
| Display + body | **Inter Tight** (display) / **Inter** (text) | Neue Haas Grotesk Display/Text or Söhne |
| Mono labels/specs | **IBM Plex Mono** or **JetBrains Mono** | Söhne Mono / GT America Mono |

- Load **at most two weights per family** (for example 400/500 for text, 500 for display) via `next/font` (self-hosted, `display: swap`, subset to Latin). This replaces today's 5 families × 18 weights.
- Decision Q-02: free default vs. licensed premium face. A licence typically costs roughly a few hundred to low thousands of USD for web use, depending on foundry and traffic; confirm with the foundry.

### Fluid type scale (rem, 1 rem = 16 px)
| Token | Size | Line height | Tracking | Use |
|---|---|---|---|---|
| `display-xl` | `clamp(3.5rem, 10vw, 11rem)` | 0.9 | -0.04em | Hero only, uppercase or sentence |
| `display-l` | `clamp(2.75rem, 6.5vw, 7rem)` | 0.95 | -0.03em | Section openers |
| `display-m` | `clamp(2rem, 4vw, 4rem)` | 1.0 | -0.02em | Statements |
| `h2` | `clamp(1.75rem, 2.6vw, 2.75rem)` | 1.1 | -0.015em | |
| `h3` | `clamp(1.25rem, 1.6vw, 1.625rem)` | 1.2 | -0.01em | |
| `body-l` | `1.25rem` | 1.5 | 0 | Lead paragraphs |
| `body` | `1.0625rem` | 1.6 | 0 | Default |
| `small` | `0.875rem` | 1.5 | 0 | |
| `mono-label` | `0.75rem` | 1.3 | +0.08em, uppercase | Section codes, spec labels |

- Measure: 60–72 characters for body text.
- Numerals: use tabular figures in spec tables and dashboards.

## 3. Grid, spacing & layout

- **Grid:** 12 columns ≥ 1024 px; 8 columns at 640–1023 px; 4 columns < 640 px.
- **Gutters:** 16 px mobile, 24 px tablet, 32 px desktop. **Page margins:** 16 / 32 / 56 px. **Max content width:** 1600 px. Full-bleed media can break out.
- **Spacing scale (4-pt base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192. Section padding is `clamp(96px, 14vw, 192px)` vertically.
- **Module motif:** an optional background hairline grid uses the 12 ft module ratio (12 : 40 / 12 : 48) for hero and process sections. It is subtle, and it ties the layout to the product.
- **Corners:** 0 radius for media and sections (architectural). 2 px for inputs and buttons. Pill shapes only for filter chips.

## 4. Imagery rules

- **Always label renders.** Any non-photographic image shows a small mono "RENDERING" tag. This is a trust and honesty rule (`media_assets.provenance`).
- Photography direction: overcast or soft daylight, true verticals (perspective-corrected), human scale where possible, and no heavy filters. The factory is shot as precision manufacturing (clean lines, repetition, scale).
- Formats: AVIF/WebP via `next/image`, explicit dimensions, `sizes` set, blur placeholders. No auto-advancing slideshows without a pause control.
- Floor plans are redrawn as **SVG line art** (bronze/carbon on ivory) for the plan → render reveal, with PDFs kept as downloads.

## 5. Core components (public site)

| Component | Notes |
|---|---|
| `SiteHeader` | Transparent/solid states, skip link, mobile overlay menu with focus trap |
| `Button` | primary (carbon fill / ivory text), secondary (outline), text-link with arrow. Min 44×44 target |
| `SectionCode` | mono `A-05`-style label + optional hairline |
| `StatementBlock` | display-m text + optional media |
| `MediaFull` | image/video with poster, provenance tag, caption |
| `ModelCard` | render ↔ plan reveal, spec list (mono), application chips |
| `SpecTable` | definition list, tabular numerals, footnotes |
| `CompareTray` | sticky tray, up to 3 models |
| `ClaimStat` | number + label + source footnote (renders only approved claims) |
| `ProcessSteps` | numbered 01–04, horizontal desktop / vertical mobile |
| `ParallelTimeline` | signature scroll diagram with a static fallback |
| `SegmentTiles` | 3-up router |
| `LeadForm` | multi-step, progress, autosave to session storage, accessible errors |
| `CTASection` | final conversion block |
| `Footer` | |

## 6. Voice & copy rules

- Short, declarative, specific. Facts before adjectives.
- Never state a number without an approved claim. Never use superlatives ("best", "leading") without evidence.
- Spell the brand consistently. The client must choose: "MAR Technology" or "Mar Technology Building Systems" (Q-03).
- Avoid jargon walls. Explain PMRV, BTR, and DAPIA on first use.

## 7. Implementation notes

- Tokens live once in `tailwind` theme config + CSS variables, which the dashboard shares.
- No component library for the public site (fewer dependencies). The dashboard may use **shadcn/ui** (copied source, not a runtime dependency) built on Radix primitives for accessible menus, dialogs, and tables.
- Icons: a single lightweight set (for example Lucide) imported per icon. Remove the Font Awesome kit.
