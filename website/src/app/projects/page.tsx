import { PageIntro } from "@/components/page-intro";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <PageIntro
      description="Selected engineering work will be organized here."
      eyebrow="Selected work"
      title="Projects"
    />
  );
}
