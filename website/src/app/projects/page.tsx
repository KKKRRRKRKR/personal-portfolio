import { PageIntro } from "@/components/page-intro";
import { TextLink } from "@/components/ui/text-link";
import { projects } from "@/content/projects";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        description="Selected engineering tools and technical systems, presented as concise public project records."
        eyebrow="Selected work"
        title="Projects"
      />
      <section
        className="projects-register"
        aria-labelledby="project-register-title"
      >
        <div className="site-frame">
          <div className="projects-register__header">
            <p className="eyebrow">Project register</p>
            <p className="projects-register__count" id="project-register-title">
              {projects.length.toString().padStart(2, "0")} project records
            </p>
          </div>
          <div className="projects-register__list">
            {projects.map((project) => (
              <article className="project-entry" key={project.slug}>
                <div className="project-entry__rail">
                  <p className="project-entry__index">{project.index}</p>
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
                </div>
                <div className="project-entry__content">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <ul
                    className="metadata-list"
                    aria-label={`${project.title} disciplines`}
                  >
                    {project.disciplines.map((discipline) => (
                      <li key={discipline}>{discipline}</li>
                    ))}
                  </ul>
                  {project.detailRouteAvailable ? (
                    <TextLink href={`/projects/${project.slug}`}>
                      View project record
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
