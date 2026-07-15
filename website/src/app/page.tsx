import { HomeClosing } from "@/components/home/home-closing";
import { FeaturedWork } from "@/components/home/featured-work";
import { FocusAreas } from "@/components/home/focus-areas";
import { HomeHero } from "@/components/home/home-hero";

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
