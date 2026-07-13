import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailHeader } from "@/components/projects/project-detail-header";
import { ProjectEvidenceSummary } from "@/components/projects/project-evidence-summary";
import { ProjectDetailSection } from "@/components/projects/project-detail-section";
import { ProjectRelatedNavigation } from "@/components/projects/project-related-navigation";
import { ProjectSystemStructure } from "@/components/projects/project-system-structure";
import { ProjectVisual } from "@/components/projects/project-visual";
import {
  getPublicCaseStudyBySlug,
  getRelatedPublicCaseStudy,
  publicCaseStudyProjects,
} from "@/content/projects";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publicCaseStudyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublicCaseStudyBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    robots: {
      index: project.indexability === "index",
      follow: project.indexability === "index",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getPublicCaseStudyBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProject = getRelatedPublicCaseStudy(project.slug);
  const caseStudy = project.caseStudy;

  return (
    <>
      <ProjectDetailHeader project={project} />
      <div className="site-frame project-detail-content">
        <ProjectDetailSection id="project-overview" title="Project thesis">
          <p>{caseStudy.detailIntroduction}</p>
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
          <p>{caseStudy.challenge}</p>
        </ProjectDetailSection>
        <ProjectDetailSection
          id="project-approach"
          title="Selected engineering decisions"
        >
          <p>{caseStudy.approach}</p>
          <ProjectEvidenceSummary mode="decisions" project={project} />
        </ProjectDetailSection>
        <ProjectDetailSection
          id="project-system-structure"
          title="System model"
          variant="wide"
        >
          <ProjectSystemStructure sections={caseStudy.systemSections} />
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
          <p>{caseStudy.currentState}</p>
          <ul className="project-next-steps">
            {caseStudy.nextSteps.map((step) => (
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
