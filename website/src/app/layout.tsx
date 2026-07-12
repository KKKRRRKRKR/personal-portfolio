import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "Personal Portfolio",
    template: "%s | Personal Portfolio",
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
