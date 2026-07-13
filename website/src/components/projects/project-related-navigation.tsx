import { TextLink } from "@/components/ui/text-link";
import type { ProjectWithCaseStudy } from "@/content/projects";

type ProjectRelatedNavigationProps = {
  relatedProject: ProjectWithCaseStudy;
};

export function ProjectRelatedNavigation({
  relatedProject,
}: ProjectRelatedNavigationProps) {
  return (
    <nav className="project-related-navigation" aria-label="Related pages">
      <p className="project-related-navigation__label">Continue reading</p>
      <div>
        <TextLink href="/projects">Back to all Projects</TextLink>
        <TextLink href={`/projects/${relatedProject.slug}`}>
          View {relatedProject.title}
        </TextLink>
        <TextLink href="/technical-notes">Technical Notes</TextLink>
      </div>
    </nav>
  );
}
