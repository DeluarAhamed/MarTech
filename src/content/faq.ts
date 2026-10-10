import { site } from "./site";

// Every answer restates information already published by MAR Technology (legacy site) or approved
// in the 2026-10-09 decisions. No timelines, prices or performance figures until claims are verified.
export const faqs: { q: string; a: string }[] = [
  {
    q: "Can you build from our existing plans?",
    a: "Yes. We can manufacture from your existing plan set, or provide a full range of design services, from schematic design through stamped construction documents.",
  },
  {
    q: "Where do you deliver?",
    a: site.coverage.long,
  },
  {
    q: "What can MAR Technology build?",
    a: "Single-family homes, townhomes and multifamily, build-to-rent communities, ADUs, temporary and permanent classrooms, offices, workforce and employee housing, PMRVs and custom multi-module configurations.",
  },
  {
    q: "How is the building structured?",
    a: "Our base units are steel-framed. Structural systems, MEP and envelope assemblies are designed for repetition, value engineering and lender due diligence.",
  },
  {
    q: "Can we follow progress during production?",
    a: "Yes. Modules are built in a climate-controlled facility with production checkpoints, and you can track key milestones online through Buildertrend, our construction project management software.",
  },
  {
    q: "What is FLEX™?",
    a: "FLEX™, Flexible Localized Expansion & Execution, establishes manufacturing capacity closer to qualifying larger developments, reducing freight distance and aligning production with your schedule.",
  },
  {
    q: "Can we visit the factory?",
    a: "Yes. Tours of our Salt Lake City manufacturing hub can be requested online; we'll confirm a time with you.",
  },
  {
    q: "How are lead times and pricing set?",
    a: "Both are quoted per project, based on configuration, finish level, quantity and site. Share your project details and our consultants will follow up.",
  },
];
