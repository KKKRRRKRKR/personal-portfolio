const deploymentContext =
  process.env.NEXT_PUBLIC_DEPLOYMENT_CONTEXT === "preview"
    ? "preview"
    : "production";

export const siteConfig = {
  name: "XG",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://kkkrrrkrkr.github.io/personal-portfolio",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  deploymentContext,
  contact: {
    email: null,
    githubUrl: null,
    linkedInUrl: null,
  },
} as const;
