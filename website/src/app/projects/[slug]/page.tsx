import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailHeader } from "@/components/projects/project-detail-header";
import { ProjectDetailSection } from "@/components/projects/project-detail-section";
import { ProjectRelatedNavigation } from "@/components/projects/project-related-navigation";
import { ProjectSystemStructure } from "@/components/projects/project-system-structure";
import { getProjectBySlug, projects } from "@/content/projects";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects
    .filter((project) => project.detailRouteAvailable)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.detailRouteAvailable) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.detailRouteAvailable) {
    notFound();
  }

  const relatedProject = projects.find(
    (candidate) =>
      candidate.slug !== project.slug && candidate.detailRouteAvailable,
  );

  return (
    <>
      <ProjectDetailHeader project={project} />
      <div className="site-frame project-detail-content">
        <ProjectDetailSection
          id="project-overview"
          label="01 / Overview"
          title="Project overview"
        >
          <p>{project.detailIntroduction}</p>
        </ProjectDetailSection>
        <ProjectDetailSection
          id="project-challenge"
          label="02 / Challenge"
          title="Challenge"
        >
          <p>{project.challenge}</p>
        </ProjectDetailSection>
        <ProjectDetailSection
          id="project-approach"
          label="03 / Approach"
          title="Approach"
        >
          <p>{project.approach}</p>
        </ProjectDetailSection>
        <ProjectDetailSection
          id="project-system-structure"
          label="04 / System structure"
          title="System structure"
        >
          <ProjectSystemStructure sections={project.systemSections} />
        </ProjectDetailSection>
        <ProjectDetailSection
          id="project-current-state"
          label="05 / Current state"
          title="Current state"
        >
          <p>{project.currentState}</p>
        </ProjectDetailSection>
        <ProjectDetailSection
          id="project-next-steps"
          label="06 / Next development steps"
          title="Next development steps"
        >
          <ul className="project-next-steps">
            {project.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </ProjectDetailSection>
        {relatedProject ? (
          <ProjectRelatedNavigation relatedProject={relatedProject} />
        ) : null}
      </div>
    </>
  );
}
