import type { MetadataRoute } from "next";

import { publicCaseStudyProjects } from "@/content/projects";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (siteConfig.deploymentContext === "preview") {
    return [];
  }

  const routes = ["", "/about", "/projects", "/contact"];
  const projectRoutes = publicCaseStudyProjects
    .filter((project) => project.indexability === "index")
    .map((project) => `/projects/${project.slug}`);

  return [...routes, ...projectRoutes].map((route) => ({
    url: `${siteConfig.url}${route}/`.replace(/\/$/, "/"),
    lastModified: new Date("2026-07-16"),
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.7,
  }));
}
