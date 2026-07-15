import { ProjectActions } from "@/components/projects/project-actions";
import { ProjectVisual } from "@/components/projects/project-visual";
import { TextLink } from "@/components/ui/text-link";
import { featuredProjects } from "@/content/projects";

export function FeaturedWork() {
  return (
    <section
      className="home-section home-work"
      aria-labelledby="selected-work-title"
    >
      <div className="site-frame">
        <div className="home-section__header">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="home-section__title" id="selected-work-title">
              Selected projects
            </h2>
          </div>
          <TextLink href="/projects">Browse all projects</TextLink>
        </div>
        <div className="home-work__grid">
          {featuredProjects.map((project) => (
            <article className="project-presentation" key={project.slug}>
              <ProjectVisual project={project} variant="feature" />
              <div className="project-presentation__content">
                <p className="project-record__label">Selected project</p>
                <h3 className="project-record__title">{project.title}</h3>
                <p className="project-record__description">{project.summary}</p>
                <p className="project-record__facts">
                  {project.projectType} · {project.statusLabel}
                </p>
                <ProjectActions project={project} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
