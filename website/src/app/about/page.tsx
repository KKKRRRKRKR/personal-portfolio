import { PageIntro } from "@/components/page-intro";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PageIntro
      description="Professional background and working approach will be introduced here."
      eyebrow="Profile"
      title="About"
    />
  );
}
