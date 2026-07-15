import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/content/site";

const isPreview = siteConfig.deploymentContext === "preview";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "XG",
    template: "%s | XG",
  },
  description:
    "Engineering projects, technical systems, compliance tools, and selected technical writing.",
  referrer: "strict-origin-when-cross-origin",
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
