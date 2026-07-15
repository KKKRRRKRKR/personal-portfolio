import { PageIntro } from "@/components/page-intro";

export const metadata = {
  title: "Technical Notes",
  robots: { index: false, follow: true },
};

export default function TechnicalNotesPage() {
  return (
    <PageIntro
      description="Technical writing and working notes will appear here."
      eyebrow="Writing"
      title="Technical Notes"
    />
  );
}
