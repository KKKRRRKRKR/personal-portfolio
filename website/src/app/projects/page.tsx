import { ProjectVisual } from "@/components/projects/project-visual";
import { PageIntro } from "@/components/page-intro";
import { TextLink } from "@/components/ui/text-link";
import { projects } from "@/content/projects";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        description="Engineering systems for spectrum review, compliance planning, and decisions that need a clear trail from input to outcome."
        eyebrow="Selected work"
        title="Projects"
      />
      <section
        className="projects-register"
        aria-labelledby="project-register-title"
      >
        <div className="site-frame">
          <div className="projects-register__header">
            <p className="eyebrow">Project index</p>
            <p className="projects-register__count" id="project-register-title">
              {projects.length} selected projects
            </p>
          </div>
          <div className="projects-register__list">
            {projects.map((project) => (
              <article className="project-entry" key={project.slug}>
                <div className="project-entry__content">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <ProjectVisual project={project} variant="index" />
                  <dl className="project-entry__details">
                    <div>
                      <dt>Type</dt>
                      <dd>{project.projectType}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{project.statusLabel}</dd>
                    </div>
                  </dl>
                  {project.detailRouteAvailable ? (
                    <TextLink href={`/projects/${project.slug}`}>
                      Read project detail
                    </TextLink>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
