import createMDX from "@next/mdx";

import { applyDeploymentProfile } from "./config/deployment-profiles.mjs";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const deploymentProfile = applyDeploymentProfile(
  process.env.DEPLOYMENT_PROFILE,
  process.env.NEXT_PUBLIC_DEPLOYMENT_CONTEXT,
);
const { basePath } = deploymentProfile;

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default withMDX(nextConfig);
