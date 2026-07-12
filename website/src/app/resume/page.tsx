import { PageIntro } from "@/components/page-intro";

export const metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <PageIntro
      description="A structured professional summary will be available here."
      eyebrow="Professional summary"
      title="Resume"
    />
  );
}
