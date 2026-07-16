import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Resume",
  description:
    "Reserved unpublished route for a future XG professional summary; no public resume is available.",
  pathname: "/resume",
  indexable: false,
});

export default function ResumePage() {
  return (
    <PageIntro
      description="This route is reserved for a future professional summary and is not currently published."
      eyebrow="Professional summary"
      title="Resume"
    />
  );
}
