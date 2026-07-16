import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Technical Notes",
  description:
    "Reserved unpublished route for future XG technical notes; no public writing collection is available yet.",
  pathname: "/technical-notes",
  indexable: false,
});

export default function TechnicalNotesPage() {
  return (
    <PageIntro
      description="This route is reserved for future technical writing and is not currently published."
      eyebrow="Writing"
      title="Technical Notes"
    />
  );
}
