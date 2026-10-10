import { media, type Media } from "./media";

export type HeroVideo = { src: string; type: "video/mp4" | "video/webm"; provenance: "footage" | "render" };

// Homepage hero. Drop real footage in `video` later (8–12 s, muted loop, ≤ 6 MB MP4/WebM);
// the image stays as poster + LCP and as the fallback for reduced motion / data saver.
export const hero: { image: Media; video: HeroVideo | null } = {
  image: media.townhomeCommunity,
  video: null,
};

// Messaging carried over from the current site's content direction (benefit-focused, no statistics).
export const heroCopy = {
  eyebrow: ["Reduced time to market", "Predictable returns", "Precision engineering"],
  lines: ["Engineered", "for developers."],
  sub: "Designed for rapid returns. Built to scale.",
  body: "Temporary housing, classrooms, office space, single-family communities, ADUs and multifamily — manufactured off-site in our Salt Lake City facility while your site is prepared.",
};

export const pillars = [
  { title: "Developer focused", body: "We align to your vision, your pro forma and your lender milestones." },
  { title: "Precision engineering", body: "No shortcuts — engineered by engineers, from structure to MEP." },
  { title: "Elegance", body: "Modular doesn't mean boxes. Elevations designed to read as site-built." },
  { title: "Versatility", body: "Single- and multifamily, ADUs, townhomes, PMRVs, classrooms and office space." },
];

// "Your vision. Built to suit." — the four capability lines from the current site.
export const capabilities = [
  { code: "C-01", title: "Modular units", body: "Flexible modular structures ready for your custom build-out.", image: media.modularShell, href: "/models/bohemian/" },
  { code: "C-02", title: "Modular classrooms", body: "Scalable space for schools, campuses and growing communities.", image: media.classroom, href: "/solutions/education/" },
  { code: "C-03", title: "Temporary & flex space", body: "Offices, workforce facilities and adaptable space where it's needed.", image: media.office, href: "/solutions/workforce-flex/" },
  { code: "C-04", title: "Modular housing", body: "Single-family, townhomes, multifamily and build-to-rent communities.", image: media.housing, href: "/solutions/developers/" },
];
