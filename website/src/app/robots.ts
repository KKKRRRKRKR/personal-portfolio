import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const isPreview = siteConfig.deploymentContext === "preview";

  return {
    rules: {
      userAgent: "*",
      ...(isPreview ? { disallow: "/" } : { allow: "/" }),
    },
    sitemap: isPreview ? undefined : `${siteConfig.url}/sitemap.xml`,
  };
}
