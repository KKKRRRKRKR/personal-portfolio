import type { Metadata } from "next";

import { absoluteAssetUrl, absoluteSiteUrl, siteConfig } from "@/content/site";

type PageMetadataInput = {
  title: string;
  description: string;
  pathname: string;
  indexable?: boolean;
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description,
  pathname,
  indexable = true,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const isPreview = siteConfig.deploymentContext === "preview";
  const shouldIndex = indexable && !isPreview;
  const canonical = absoluteSiteUrl(pathname);
  const socialTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const socialImage = {
    url: absoluteAssetUrl(siteConfig.socialImage.path),
    width: siteConfig.socialImage.width,
    height: siteConfig.socialImage.height,
    alt: siteConfig.socialImage.alt,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
    robots: {
      index: shouldIndex,
      follow: isPreview ? false : indexable,
    },
  };
}
