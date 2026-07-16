const deploymentContext =
  process.env.NEXT_PUBLIC_DEPLOYMENT_CONTEXT === "preview"
    ? "preview"
    : "production";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://kkkrrrkrkr.github.io/personal-portfolio"
).replace(/\/+$/, "");

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

export const siteConfig = {
  name: "XG",
  description:
    "Engineering projects, technical systems, and selected technical work for spectrum, compliance, and product decisions.",
  url: siteUrl,
  basePath,
  deploymentContext,
  socialImage: {
    path: "/social/xg-social-preview.png",
    width: 1200,
    height: 630,
    alt: "XG engineering portfolio social preview with editorial typography and technical reference rules.",
  },
  contact: {
    email: null,
    githubUrl: null,
    linkedInUrl: null,
  },
} as const;

function normalizedPath(pathname: string) {
  const path = pathname === "/" ? "" : `/${pathname.replace(/^\/+|\/+$/g, "")}`;
  return `${path}/`;
}

export function absoluteSiteUrl(pathname = "/") {
  return `${siteConfig.url}${normalizedPath(pathname)}`;
}

export function absoluteAssetUrl(assetPath: string) {
  return `${siteConfig.url}/${assetPath.replace(/^\/+/, "")}`;
}

export function siteAssetPath(assetPath: string) {
  return `${siteConfig.basePath}/${assetPath.replace(/^\/+/, "")}`;
}
