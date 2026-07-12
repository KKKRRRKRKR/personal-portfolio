import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "XG",
    template: "%s | XG",
  },
  description:
    "Engineering projects, technical systems, compliance tools, and selected technical writing.",
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
