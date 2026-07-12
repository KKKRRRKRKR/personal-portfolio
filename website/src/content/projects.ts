export type ProjectStatus = "case-study-in-preparation" | "available";

export interface ProjectRecord {
  slug: string;
  index: string;
  title: string;
  summary: string;
  description: string;
  disciplines: readonly string[];
  projectType: string;
  status: ProjectStatus;
  statusLabel: string;
  featured: boolean;
  order: number;
}

const projectRecords = [
  {
    slug: "global-rf-spectrum-dashboard",
    index: "01",
    title: "Global RF Spectrum Dashboard",
    summary:
      "An interactive, map-first interface for reviewing wireless spectrum and power information across global markets.",
    description:
      "A structured visualization environment that brings regional spectrum information, country-level review, filtering, and power-limit context into one navigable interface.",
    disciplines: ["Data visualization", "RF spectrum", "Interactive dashboard"],
    projectType: "Engineering data interface",
    status: "case-study-in-preparation",
    statusLabel: "Case study in preparation",
    featured: true,
    order: 1,
  },
  {
    slug: "compliance-plan-generator",
    index: "02",
    title: "Compliance Plan Generator",
    summary:
      "A structured decision system that converts product inputs and rule logic into a reviewable draft compliance plan.",
    description:
      "A traceable planning workflow that connects structured product inputs, deterministic requirement logic, review outputs, assumptions, and human confirmation.",
    disciplines: [
      "Decision system",
      "Compliance workflow",
      "Rule-based planning",
    ],
    projectType: "Rule-based planning system",
    status: "case-study-in-preparation",
    statusLabel: "Case study in preparation",
    featured: true,
    order: 2,
  },
] satisfies readonly ProjectRecord[];

export const projects: readonly ProjectRecord[] = [...projectRecords].sort(
  (first, second) => first.order - second.order,
);

export const featuredProjects = projects.filter((project) => project.featured);
