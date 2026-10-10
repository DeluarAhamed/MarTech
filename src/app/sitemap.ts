import type { MetadataRoute } from "next";
import { models } from "@/content/models";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/solutions/",
    ...solutions.map((s) => `/solutions/${s.slug}/`),
    "/models/",
    ...models.map((m) => `/models/${m.slug}/`),
    "/process/",
    "/about/",
    "/contact/",
    "/factory-tour/",
  ];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
