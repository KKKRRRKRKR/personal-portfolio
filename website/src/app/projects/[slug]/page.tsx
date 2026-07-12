import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailHeader } from "@/components/projects/project-detail-header";
import { ProjectEvidenceSummary } from "@/components/projects/project-evidence-summary";
import { ProjectDetailSection } from "@/components/projects/project-detail-section";
import { ProjectRelatedNavigation } from "@/components/projects/project-related-navigation";
import { ProjectSystemStructure } from "@/components/projects/project-system-structure";
import { ProjectVisual } from "@/components/projects/project-visual";
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
        <ProjectDetailSection id="project-overview" title="Project thesis">
          <p>{project.detailIntroduction}</p>
        </ProjectDetailSection>
        <ProjectDetailSection
          id="project-scale"
          title="Project scale"
          variant="wide"
        >
          <ProjectEvidenceSummary mode="facts" project={project} />
        </ProjectDetailSection>
        <ProjectDetailSection
          id="project-challenge"
          title="Context and constraints"
        >
          <p>{project.challenge}</p>
        </ProjectDetailSection>
        <ProjectDetailSection
          id="project-approach"
          title="Selected engineering decisions"
        >
          <p>{project.approach}</p>
          <ProjectEvidenceSummary mode="decisions" project={project} />
        </ProjectDetailSection>
        <ProjectDetailSection
          id="project-system-structure"
          title="System model"
          variant="wide"
        >
          <ProjectSystemStructure sections={project.systemSections} />
        </ProjectDetailSection>
        <ProjectDetailSection
          id="project-interface-evidence"
          title="Interface evidence"
          variant="wide"
        >
          <ProjectVisual project={project} variant="interface" />
        </ProjectDetailSection>
        <ProjectDetailSection
          id="project-current-state"
          title="Outcome and current boundaries"
          variant="outcome"
        >
          <p>{project.currentState}</p>
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
