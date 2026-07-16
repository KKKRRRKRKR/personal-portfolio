import type { Metadata } from "next";

import { ProjectVisual } from "@/components/projects/project-visual";
import { ProjectActions } from "@/components/projects/project-actions";
import { PageIntro } from "@/components/page-intro";
import { publicProjects } from "@/content/projects";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description:
    "Selected engineering work in RF spectrum review and traceable compliance planning, with authentic evidence and explicit project boundaries.",
  pathname: "/projects",
});

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
              {publicProjects.length} selected projects
            </p>
          </div>
          <div className="projects-register__list">
            {publicProjects.map((project) => (
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
                  <ProjectActions
                    caseStudyLabel="Read project detail"
                    project={project}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
