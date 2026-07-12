import { TextLink } from "@/components/ui/text-link";
import type { ProjectRecord } from "@/content/projects";

type ProjectDetailHeaderProps = {
  project: ProjectRecord;
};

export function ProjectDetailHeader({ project }: ProjectDetailHeaderProps) {
  return (
    <header className="project-detail-header">
      <div className="site-frame project-detail-header__grid">
        <div className="project-detail-header__rail">
          <p className="eyebrow">{project.eyebrow}</p>
          <p className="project-detail-header__index">{project.index}</p>
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
          <ul
            className="metadata-list"
            aria-label={`${project.title} disciplines`}
          >
            {project.disciplines.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </ul>
          <TextLink href="/projects">Back to all Projects</TextLink>
        </div>
      </div>
    </header>
  );
}
