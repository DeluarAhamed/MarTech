import { floorPlanPdfs, media, type Media } from "./media";

export type ApplicationKey = "housing" | "education" | "workforce" | "office" | "custom";

export type Model = {
  slug: "bohemian" | "solterra" | "castello";
  code: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  description: string[];
  applications: ApplicationKey[];
  specs: { label: string; value: string }[];
  configurations: string[];
  hero: Media;
  gallery: Media[];
  plans: Media[];
  planPdfs: readonly { label: string; href: string }[];
  /** Short spec line for cards. */
  cardSpecs: string[];
};

export const applicationLabels: Record<ApplicationKey, string> = {
  housing: "Housing",
  education: "Education",
  workforce: "Workforce",
  office: "Office & flex",
  custom: "Custom",
};

// Specifications as published on the legacy model pages (client-supplied product data).
export const models: Model[] = [
  {
    slug: "bohemian",
    code: "M-01",
    name: "Bohemian",
    category: "Single module",
    tagline: "One module. Many uses.",
    summary:
      "A single steel-framed module in two lengths, configured as an ADU, classroom, office, employee housing or a relocatable PMRV.",
    description: [
      "Bohemian is available in two sizes and several configurations. Its structural design supports combining modules to create larger spaces or multiplexes.",
      "The plan shown is the ADU / employee-housing layout. Classrooms, offices and PMRVs are designed to your interior specification. A PMRV (park model RV) is an expandable, more temporary solution that can be redeployed as needs change.",
    ],
    applications: ["housing", "education", "workforce", "office", "custom"],
    specs: [
      { label: "Size", value: "480–576 sqft" },
      { label: "Footprint", value: "12′ × 40′ or 12′ × 48′" },
      { label: "Modules", value: "1 (combinable)" },
      { label: "Layout", value: "1 bed / 1 bath; 2 bed / 1 bath (larger module)" },
      { label: "Structure", value: "Steel frame" },
    ],
    configurations: [
      "ADU / tiny home",
      "Classroom — temporary or permanent",
      "Employee housing — temporary or permanent",
      "Office — temporary or permanent",
      "PMRV — max 480 sqft, relocatable",
      "Custom multi-module arrangements",
    ],
    hero: media.bohemianExterior,
    gallery: [media.bohemianExterior, media.bohemianFront, media.bohemianBedroom],
    plans: [media.bohemianPlan],
    planPdfs: floorPlanPdfs.bohemian,
    cardSpecs: ["480–576 sqft", "1 module", "12′ × 40′ / 48′"],
  },
  {
    slug: "solterra",
    code: "M-02",
    name: "Solterra",
    category: "Single-family",
    tagline: "A starter home, engineered for communities.",
    summary:
      "A three-module ranch home designed for for-sale and build-to-rent communities, delivered with standard finishes, appliances and fixtures.",
    description: [
      "Solterra is designed as a starter home for sale or build-to-rent. The three-module configuration comes with standard finishes, appliances, fixtures, flooring, lighting, windows, doors and exterior siding.",
      "Customised finishes are available based on order size.",
    ],
    applications: ["housing"],
    specs: [
      { label: "Livable area", value: "1,440–1,474 sqft" },
      { label: "Footprint", value: "36′ × 40′ or 36′ × 48′" },
      { label: "Modules", value: "3" },
      { label: "Layout", value: "2 bed / 2.5 bath standard; 3 bed / 2.5 bath on request" },
      { label: "Style", value: "Ranch; one-car garage standard, optional" },
    ],
    configurations: ["2 bed / 2.5 bath with one-car garage (standard)", "3 bed / 2.5 bath (on request)", "Garage optional"],
    hero: media.solterraPerspective,
    gallery: [media.solterraPerspective, media.solterraFront, media.solterraLiving, media.solterraKitchen, media.solterraBedroom],
    plans: [media.solterraPlan],
    planPdfs: floorPlanPdfs.solterra,
    cardSpecs: ["1,440–1,474 sqft", "3 modules", "2–3 bed"],
  },
  {
    slug: "castello",
    code: "M-03",
    name: "Castello",
    category: "Townhome & multifamily",
    tagline: "Density without compromise.",
    summary:
      "A split-level townhome for duplex or residential-row layouts, designed for build-to-rent communities that need efficient, high-density inventory.",
    description: [
      "Castello is designed to meet demand for build-to-rent. The multi-module configuration delivers a high-density solution on a reduced footprint for growing communities that need attainable inventory.",
      "It comes with standard finishes, appliances, fixtures, flooring, lighting, windows, doors and exterior siding. Customised finishes are available based on order size.",
    ],
    applications: ["housing"],
    specs: [
      { label: "Size", value: "1,368 sqft" },
      { label: "Footprint", value: "18′ × 40′" },
      { label: "Modules", value: "Multi-module" },
      { label: "Layout", value: "2 bed / 2.5 bath, split-level" },
      { label: "Features", value: "Interior staircase, recessed entry, second-floor balcony" },
    ],
    configurations: ["Split-level duplex", "Split-level multiplex (residential row)"],
    hero: media.castelloThreeQuarter,
    gallery: [media.castelloThreeQuarter, media.castelloEntry, media.castelloLiving, media.castelloKitchen, media.castelloBedroom],
    plans: [media.castelloPlanDown, media.castelloPlanUp],
    planPdfs: floorPlanPdfs.castello,
    cardSpecs: ["1,368 sqft", "Duplex or row", "2 bed / 2.5 bath"],
  },
];

export function getModel(slug: string) {
  return models.find((model) => model.slug === slug);
}
