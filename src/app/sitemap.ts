import type { MetadataRoute } from "next";
import { models } from "@/content/models";
import { site } from "@/content/site";
import { posts, topics, topicSlug } from "@/content/insights";
import { westernStates } from "@/content/locations";
import { solutionHref, solutions } from "@/content/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/solutions/",
    ...solutions.map((s) => solutionHref(s.slug)),
    "/models/",
    ...models.map((m) => `/models/${m.slug}/`),
    "/process/",
    "/locations/",
    ...westernStates.map((w) => `/locations/${w.slug}/`),
    "/blog/",
    ...posts.map((p) => `/blog/${p.slug}/`),
    ...topics.filter((t) => posts.some((p) => p.topic === t)).map((t) => `/blog/category/${topicSlug(t)}/`),
    "/about/",
    "/contact/",
    "/factory-tour/",
  ];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
