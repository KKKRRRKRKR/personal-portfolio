export type ProjectStatus = "case-study-in-preparation" | "available";

export interface ProjectSystemSection {
  title: string;
  description: string;
}

export interface ProjectEvidence {
  caption: string;
  decisions: readonly { title: string; description: string }[];
  facts: readonly { label: string; value: string }[];
  kind: "spectrum" | "planning-flow";
}

export interface ProjectRecord {
  slug: string;
  index: string;
  title: string;
  summary: string;
  description: string;
  eyebrow: string;
  detailIntroduction: string;
  challenge: string;
  approach: string;
  evidence: ProjectEvidence;
  systemSections: readonly ProjectSystemSection[];
  currentState: string;
  nextSteps: readonly string[];
  disciplines: readonly string[];
  projectType: string;
  status: ProjectStatus;
  statusLabel: string;
  detailRouteAvailable: boolean;
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
    eyebrow: "Project record / RF systems",
    detailIntroduction:
      "The dashboard turns region-specific spectrum allocation and power information into one comparison surface, so an engineer can move from a global view to a country-level review without losing the context behind a decision.",
    challenge:
      "Regional spectrum information can be difficult to review consistently across markets. Frequency ranges, power context, and regional differences need a structured visual interface so that comparison and navigation remain clear without treating the information as a single flat list.",
    approach:
      "The approach combines map-first navigation with structured spectrum representation, region and country filtering, and frequency and power context. It keeps data separate from interface behavior so that public example content, import and export paths, and later implementation detail can evolve independently.",
    evidence: {
      kind: "spectrum",
      caption:
        "Sanitized spectrum-review model showing how regional ranges and review context can remain comparable in one working surface.",
      facts: [
        { label: "Review unit", value: "Region, country, and frequency band" },
        {
          label: "System scope",
          value: "5 connected interface and data areas",
        },
        { label: "Decision boundary", value: "Public-safe example data only" },
      ],
      decisions: [
        {
          title: "Make geography the entry point",
          description:
            "Start from a market or region, then preserve that context as the review moves into individual frequency ranges.",
        },
        {
          title: "Keep comparison visible",
          description:
            "Represent ranges and power context together instead of distributing the review across disconnected tables.",
        },
        {
          title: "Separate data from interaction",
          description:
            "Keep public examples, import paths, and interface behavior independent so the portfolio view can remain safe and maintainable.",
        },
      ],
    },
    systemSections: [
      {
        title: "Data model",
        description:
          "A structured representation for regional spectrum information and its review context.",
      },
      {
        title: "Geographic navigation",
        description:
          "Map-first entry points for moving between regional and country-level views.",
      },
      {
        title: "Spectrum visualization",
        description:
          "A visual layer for comparing frequency ranges and associated power context.",
      },
      {
        title: "Filtering and review",
        description:
          "Controls that narrow the view while preserving a clear comparison path.",
      },
      {
        title: "Import and export",
        description:
          "Prepared boundaries for bringing in and sharing structured example data.",
      },
    ],
    currentState:
      "A working interactive dashboard exists. The project is being prepared for migration into the portfolio architecture, where the public case study will use sanitized example content.",
    nextSteps: [
      "Adapt the standalone dashboard to the portfolio route architecture.",
      "Separate public example data from internal datasets.",
      "Add selected interface views and implementation notes.",
      "Validate online deployment behavior.",
    ],
    disciplines: ["Data visualization", "RF spectrum", "Interactive dashboard"],
    projectType: "Engineering data interface",
    status: "case-study-in-preparation",
    statusLabel: "Case study in preparation",
    detailRouteAvailable: true,
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
    eyebrow: "Project record / compliance systems",
    detailIntroduction:
      "The planning system converts product facts and rule applicability into a reviewable draft plan while keeping assumptions, missing inputs, and the human confirmation step visible throughout.",
    challenge:
      "Compliance planning requires structured product inputs, rule applicability, traceable outputs, assumptions, and human review. Relevant information may be distributed across documents and reviewer knowledge, so the project focuses on making the planning workflow more structured and reviewable.",
    approach:
      "The approach starts with structured Product DNA inputs and deterministic applicability logic, then groups results into requirement packages and reviewable draft outputs. Assumptions and missing inputs remain visible, with human review serving as the final confirmation step.",
    evidence: {
      kind: "planning-flow",
      caption:
        "Sanitized decision-flow model showing how product facts, deterministic logic, and human review remain traceable in the planning workflow.",
      facts: [
        { label: "Input scope", value: "Structured product and market facts" },
        {
          label: "System scope",
          value: "6 connected planning and review areas",
        },
        {
          label: "Decision boundary",
          value: "Draft output requires human confirmation",
        },
      ],
      decisions: [
        {
          title: "Structure inputs before rules",
          description:
            "Use explicit Product DNA fields so the planning context is visible before a rule path is evaluated.",
        },
        {
          title: "Keep assumptions in the output",
          description:
            "Carry uncertainty and incomplete information forward rather than hiding it behind an apparently final plan.",
        },
        {
          title: "Make review a system boundary",
          description:
            "Treat human confirmation as a required control, not a postscript to an automated recommendation.",
        },
      ],
    },
    systemSections: [
      {
        title: "Product inputs",
        description:
          "Structured Product DNA fields that establish the planning context.",
      },
      {
        title: "Product classification",
        description:
          "A clear representation of the product attributes used for planning.",
      },
      {
        title: "Rule logic",
        description:
          "A deterministic path for evaluating applicability without exposing rule content.",
      },
      {
        title: "Requirement packages",
        description:
          "Grouped planning material that keeps related requirements reviewable.",
      },
      {
        title: "Draft plan output",
        description:
          "A traceable draft that carries inputs, assumptions, and planning context forward.",
      },
      {
        title: "Human review",
        description:
          "A final confirmation point for reviewing draft outputs and unresolved inputs.",
      },
    ],
    currentState:
      "The system architecture and data models are under active development. A lightweight rule-based implementation path is being validated, and outputs remain draft material requiring human review.",
    nextSteps: [
      "Continue aligning inputs, rule logic, requirement packages, and output fields.",
      "Validate the deterministic rule path with a smaller implementation.",
      "Prepare sanitized interface views and workflow documentation.",
      "Preserve traceability and human-review controls.",
    ],
    disciplines: [
      "Decision system",
      "Compliance workflow",
      "Rule-based planning",
    ],
    projectType: "Rule-based planning system",
    status: "case-study-in-preparation",
    statusLabel: "Case study in preparation",
    detailRouteAvailable: true,
    featured: true,
    order: 2,
  },
] satisfies readonly ProjectRecord[];

export const projects: readonly ProjectRecord[] = [...projectRecords].sort(
  (first, second) => first.order - second.order,
);

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  return projects.find((project) => project.slug === slug);
}
