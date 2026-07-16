import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { siteAssetPath, siteConfig } from "@/content/site";

const isPreview = siteConfig.deploymentContext === "preview";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "XG",
    template: "%s | XG",
  },
  description: siteConfig.description,
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: [
      {
        url: siteAssetPath("/favicon.svg"),
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: siteAssetPath("/icons/apple-touch-icon.png"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: !isPreview,
    follow: !isPreview,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
