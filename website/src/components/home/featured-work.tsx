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
              Project records
            </h2>
          </div>
          <TextLink href="/projects">Browse all projects</TextLink>
        </div>
        <div className="home-work__grid">
          {featuredProjects.map((project) => (
            <article className="project-record" key={project.slug}>
              <p className="project-record__label">
                Selected project / {project.index}
              </p>
              <h3 className="project-record__title">{project.title}</h3>
              <p className="project-record__description">{project.summary}</p>
              <ul
                className="metadata-list"
                aria-label={`${project.title} topics`}
              >
                {project.disciplines.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="project-record__status">{project.statusLabel}</p>
              {project.detailRouteAvailable ? (
                <TextLink href={`/projects/${project.slug}`}>
                  Open case study
                </TextLink>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
