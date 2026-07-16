import type { Metadata } from "next";

import { HomeClosing } from "@/components/home/home-closing";
import { FeaturedWork } from "@/components/home/featured-work";
import { FocusAreas } from "@/components/home/focus-areas";
import { HomeHero } from "@/components/home/home-hero";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "XG - Engineering systems and selected work",
  description:
    "Engineering projects and technical systems for spectrum review, compliance planning, and decisions that need a clear trail from input to outcome.",
  pathname: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedWork />
      <FocusAreas />
      <HomeClosing />
    </>
  );
}
