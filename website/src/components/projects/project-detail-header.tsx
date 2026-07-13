import { ProjectVisual } from "@/components/projects/project-visual";
import { TextLink } from "@/components/ui/text-link";
import type { ProjectWithCaseStudy } from "@/content/projects";

type ProjectDetailHeaderProps = {
  project: ProjectWithCaseStudy;
};

export function ProjectDetailHeader({ project }: ProjectDetailHeaderProps) {
  return (
    <header className="project-detail-header">
      <div className="site-frame project-detail-header__grid">
        <div className="project-detail-header__rail">
          <p className="eyebrow">Project</p>
          <dl className="project-detail-header__metadata">
            <div>
              <dt>Type</dt>
              <dd>{project.projectType}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{project.statusLabel}</dd>
            </div>
          </dl>
        </div>
        <div className="project-detail-header__content">
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <ProjectVisual project={project} variant="detail" />
          <TextLink href="/projects">Back to all Projects</TextLink>
        </div>
      </div>
    </header>
  );
}
