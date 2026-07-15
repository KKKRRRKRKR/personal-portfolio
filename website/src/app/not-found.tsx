import { PageIntro } from "@/components/page-intro";
import { TextLink } from "@/components/ui/text-link";

export default function NotFound() {
  return (
    <PageIntro
      description="The requested page is not available."
      eyebrow="Error 404"
      title="Page not found"
    >
      <TextLink href="/">Return home</TextLink>
    </PageIntro>
  );
}
