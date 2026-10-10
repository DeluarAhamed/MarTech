// Media registry. `provenance` drives the public "Rendering" label (docs/redesign/05 §4).
// "unconfirmed" = origin not confirmed by the client (could be stock/AI). Labelled "Concept image" so it is
// never presented as an actual MAR project or factory operation (client decision 2026-10-09).
export type Provenance = "photo" | "render" | "drawing" | "unconfirmed";

export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
  provenance: Provenance;
};

const WP = "https://www.martechbuildingsystems.com/wp-content/uploads";

function m(path: string, alt: string, width: number, height: number, provenance: Provenance): Media {
  return { src: `${WP}/${path}`, alt, width, height, provenance };
}

export const media = {
  // Bohemian — single module
  bohemianExterior: m("2026/08/MT_ADU-ExtreriorV9-APPROVED-scaled.png", "Bohemian single-module building, exterior three-quarter view", 2560, 1920, "render"),
  bohemianFront: m("2026/08/MT_ADU-Extrerior_FrontViewV9-scaled.png", "Bohemian single-module building, front elevation", 2560, 1920, "render"),
  bohemianBedroom: m("2026/08/MT_ADU-BedroomV9-scaled.png", "Bohemian interior, bedroom", 2560, 1920, "render"),
  bohemianPlan: m("2026/08/ADU-Final-Floor-Plan-scaled.jpg", "Bohemian floor plan, ADU configuration", 2560, 2331, "drawing"),

  // Solterra — single-family
  solterraFront: m("2026/08/MT-Single-Familly-EXT-Front-View_V6-scaled.png", "Solterra single-family home, front elevation", 2560, 1920, "render"),
  solterraPerspective: m("2026/08/MT-Single-Familly-EXT-Perspective_V6-scaled.png", "Solterra single-family home, street perspective", 2560, 1920, "render"),
  solterraLiving: m("2026/08/MT-Single-Familly-Living-Room_V7-APPROVED-scaled.png", "Solterra interior, living room", 2560, 1920, "render"),
  solterraKitchen: m("2026/08/MT-Single-Familly-Kitchen_V7-scaled.png", "Solterra interior, kitchen", 2560, 1920, "render"),
  solterraBedroom: m("2026/08/MT-Single-Familly-Bedroom_V7-APPROVED-scaled.png", "Solterra interior, bedroom", 2560, 1920, "render"),
  solterraPlan: m("2026/08/Single-Family-Final-Floor-Plan-cropped-scaled.jpg", "Solterra floor plan", 2560, 2560, "drawing"),

  // Castello — townhome & multifamily
  castelloEntry: m("2026/08/MT-Townhome-Front-Entry.jpg", "Castello townhome, front entry", 1448, 1086, "render"),
  castelloThreeQuarter: m("2026/08/MT-Townhome-EXT-3_4-1.png", "Castello townhome, exterior three-quarter view", 1448, 1086, "render"),
  castelloLiving: m("2026/08/MT-Townhome-INT-Living-Room_V12-scaled.png", "Castello interior, living room", 2560, 1920, "render"),
  castelloKitchen: m("2026/08/MT-Townhome-INT-Kitchen_V12-APPROVED-scaled.png", "Castello interior, kitchen", 2560, 1920, "render"),
  castelloBedroom: m("2026/08/MT-Townhome-INT-Bedroom_V12-APPROVED-scaled.png", "Castello interior, bedroom", 2560, 1920, "render"),
  castelloPlanDown: m("2026/08/Townhome-Downstairs-Final-Floor-Plan.jpg", "Castello floor plan, lower level", 2296, 1520, "drawing"),
  castelloPlanUp: m("2026/08/Townhome-Upstairs-Final-Floor-Plan.jpg", "Castello floor plan, upper level", 2360, 1544, "drawing"),

  // Applications & context
  townhomeCommunity: m("2026/09/Townhome-Community.png", "Street of modular townhomes in a residential community", 1928, 815, "render"),
  desertHome: m("2026/10/Modern-Modular-Home-in-Mountainous-Desert-1.png", "Single-module home set against desert mountains", 1254, 1254, "render"),
  moduleCommunity: m("2026/09/Single-Module-Units-in-Community-e1789484955740.png", "Single-module units arranged in a community", 1672, 941, "render"),
  modularShell: m("2026/09/Single-Modular-Shell-1.png", "Steel-framed modular shell ready for custom build-out", 1536, 1024, "render"),
  classroom: m("2026/09/Modular-Classroom.png", "Modular classroom building", 1536, 1024, "render"),
  office: m("2026/09/Temporary-Office-Module.png", "Temporary modular office building", 1774, 887, "render"),
  housing: m("2026/09/Modular-Housing.png", "Modular housing", 1536, 1024, "render"),
  factoryShowcase: m("2026/07/Factory-ShowCase.jpg", "Modular production inside the factory", 1120, 720, "unconfirmed"),
  craneSet: m("2026/09/02_crane_lifting_modular_unit-e1789498341915.png", "Crane setting a modular unit onto its foundation", 636, 440, "unconfirmed"),
  factory: m("2026/07/factory-1.jpg", "Manufacturing facility exterior", 720, 542, "unconfirmed"),
  factoryTour: m("2026/07/Factory-Tour.jpg", "Inside the manufacturing facility", 600, 640, "unconfirmed"),
  blueprint: m("2026/07/blueprint.jpg", "Architectural drawings on a design desk", 1000, 665, "unconfirmed"),
  saltLake: m("2026/09/Footer-Background-Image.png", "Salt Lake City skyline with the Wasatch Range", 2172, 724, "unconfirmed"),
  usMap: m("2026/09/US-Map.png", "Map of the United States", 1536, 1024, "drawing"),
} satisfies Record<string, Media>;

export const floorPlanPdfs = {
  bohemian: [{ label: "Floor plan (PDF)", href: `${WP}/2026/08/ADU-Final-Floor-Plan.pdf` }],
  solterra: [{ label: "Floor plan (PDF)", href: `${WP}/2026/08/Single-Family-Final-Floor-Plan.pdf` }],
  castello: [
    { label: "Lower level plan (PDF)", href: `${WP}/2026/08/Townhome-Downstairs-Final-Floor-Plan.pdf` },
    { label: "Upper level plan (PDF)", href: `${WP}/2026/08/Townhome-Upstairs-Final-Floor-Plan.pdf` },
  ],
} as const;
