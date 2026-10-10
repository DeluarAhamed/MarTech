import { media, type Media } from "./media";
import type { Model } from "./models";

export type Solution = {
  slug: "developers" | "education" | "workforce-flex" | "flex-manufacturing";
  code: string;
  name: string;
  navLabel: string;
  headline: string;
  intro: string;
  image: Media;
  /** Project type preselected in the lead form. */
  formPreset: string;
  points: { title: string; body: string }[];
  models: Model["slug"][];
  metaTitle: string;
  metaDescription: string;
};

export const solutions: Solution[] = [
  {
    slug: "developers",
    code: "S-01",
    name: "Housing developers",
    navLabel: "Developers & builders",
    headline: "Built for developers, not one-off projects.",
    intro:
      "Single-family communities, townhomes, build-to-rent and multifamily. From take-offs to lender packages, our process is aligned with the realities of delivering communities.",
    image: media.townhomeCommunity,
    formPreset: "housing-community",
    points: [
      {
        title: "Community-grade engineering",
        body: "Structural systems, MEP and envelope assemblies designed for repetition, value engineering and lender due diligence, without compromising curb appeal.",
      },
      {
        title: "Predictable pro formas",
        body: "Fixed factory pricing, short construction windows and compressed carry costs translate into clearer underwriting and faster capital recycling.",
      },
      {
        title: "Indistinguishable from site-built",
        body: "Street-facing elevations, rooflines and material palettes designed to meet HOA and municipal expectations for traditional construction.",
      },
      {
        title: "Your plans or ours",
        body: "We manufacture from your existing plan set, or provide design services from schematic design through stamped construction documents.",
      },
    ],
    models: ["solterra", "castello", "bohemian"],
    metaTitle: "Modular Construction for Housing Developers",
    metaDescription:
      "Factory-built single-family, townhome and multifamily modules for developers building for-sale and build-to-rent communities.",
  },
  {
    slug: "education",
    code: "S-02",
    name: "Education",
    navLabel: "Education & public sector",
    headline: "Classroom space, built while the site is prepared.",
    intro:
      "Temporary and permanent modular classrooms for schools, campuses and growing communities. Designed to your interior specification and manufactured off-site.",
    image: media.classroom,
    formPreset: "classroom",
    points: [
      {
        title: "Temporary or permanent",
        body: "Configure single modules or combine them into larger classroom buildings, for interim capacity or long-term use.",
      },
      {
        title: "Designed to your program",
        body: "Interior layouts are designed around your requirements, with plans submitted for your approval before production begins.",
      },
      {
        title: "Built in parallel",
        body: "Modules are manufactured in a climate-controlled facility while site work progresses, reducing disruption on campus.",
      },
    ],
    models: ["bohemian"],
    metaTitle: "Modular Classrooms for Schools & Campuses",
    metaDescription:
      "Temporary and permanent modular classrooms, manufactured off-site in Salt Lake City and designed to your interior specification.",
  },
  {
    slug: "workforce-flex",
    code: "S-03",
    name: "Workforce & flex space",
    navLabel: "Workforce & flex space",
    headline: "Adaptable space where it's needed.",
    intro:
      "Employee housing, temporary offices, workforce facilities and relocatable PMRVs. Flexible modular structures ready for your build-out.",
    image: media.office,
    formPreset: "office-flex",
    points: [
      {
        title: "Employee housing",
        body: "Single-module units configured as 1- or 2-bedroom living space, temporary or permanent.",
      },
      {
        title: "Offices & facilities",
        body: "Temporary and permanent office space and workforce facilities designed to your interior specification.",
      },
      {
        title: "Relocatable PMRVs",
        body: "Park model RVs up to 480 sqft that can be redeployed as needs change.",
      },
    ],
    models: ["bohemian"],
    metaTitle: "Modular Workforce Housing, Offices & Flex Space",
    metaDescription:
      "Modular employee housing, temporary and permanent offices, workforce facilities and relocatable PMRV units.",
  },
  {
    slug: "flex-manufacturing",
    code: "S-04",
    name: "FLEX™ manufacturing",
    navLabel: "FLEX™ localized manufacturing",
    headline: "We bring the factory to the project.",
    intro:
      "FLEX™, Flexible Localized Expansion & Execution, establishes manufacturing capacity closer to large developments, reducing freight distance and aligning production with your schedule.",
    image: media.moduleCommunity,
    formPreset: "flex",
    points: [
      { title: "Lower transportation costs", body: "Manufacture closer to your project site." },
      { title: "Simplified logistics", body: "Reduce long-distance delivery challenges and transit risk." },
      { title: "Scalable production", body: "Build capacity around your project's demand." },
      { title: "Project-driven scheduling", body: "Align production with your development timeline." },
    ],
    models: ["solterra", "castello", "bohemian"],
    metaTitle: "FLEX™ Localized Modular Manufacturing",
    metaDescription:
      "For qualifying large projects, MAR Technology can establish modular manufacturing capacity closer to your development site.",
  },
];

export const flexSteps = [
  { n: "01", title: "Demand", body: "Your project creates the need for scalable modular production." },
  { n: "02", title: "Deploy", body: "We establish manufacturing capacity closer to your site or high-demand market." },
  { n: "03", title: "Produce", body: "Production scales around your unit requirements and schedule." },
  { n: "04", title: "Deliver", body: "Shorter transport distances streamline logistics and delivery." },
];

export const processSteps = [
  {
    n: "01",
    title: "Design & engineering",
    body: "Site study, structural engineering and modelling, plan-set review or creation, and alignment with state and local requirements. All drawings are submitted for your approval before production.",
  },
  {
    n: "02",
    title: "Factory build",
    body: "Modules are built in a climate-controlled facility with production checkpoints while your sitework progresses in parallel. Track milestones online through Buildertrend.",
  },
  {
    n: "03",
    title: "Delivery & set",
    body: "After a factory walk-through and sign-off, modules are transported, crane-set on foundations and assembled, followed by on-site inspections.",
  },
  {
    n: "04",
    title: "Finish & handover",
    body: "Exterior detailing, interior finishes, punch list and coordinated inspections toward certificate of occupancy.",
  },
];

/** Canonical URL for a solution. The developers solution lives on its legacy URL to keep its search equity. */
export function solutionHref(slug: string) {
  return slug === "developers" ? "/modular-for-developers/" : `/solutions/${slug}/`;
}

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
