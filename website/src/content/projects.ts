export type ProjectLifecycleStatus =
  "active-development" | "case-study-in-preparation" | "available" | "archived";

export type ProjectVisibility = "public" | "private";
export type ProjectIndexability = "index" | "noindex";

export interface ProjectSystemSection {
  title: string;
  description: string;
}

export interface ProjectEvidence {
  caption: string;
  decisions: readonly { title: string; description: string }[];
  facts: readonly { label: string; value: string }[];
}

export interface ProjectEvidenceFigure {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  disclosure?: string;
}

type DestinationPresentation = {
  label?: string;
  accessibilityDescription?: string;
  externalBehavior?: "same-tab" | "new-tab";
};

export type LiveToolDestination =
  | (DestinationPresentation & {
      availability: "unavailable" | "planned";
      url?: never;
    })
  | (DestinationPresentation & {
      availability: "preview" | "available";
      url: string;
    });

export type PublicDestination =
  | (DestinationPresentation & {
      availability: "unavailable" | "planned";
      url?: never;
    })
  | (DestinationPresentation & {
      availability: "available";
      url: string;
    });

export interface ProjectDestinations {
  liveTool: LiveToolDestination;
  repository: PublicDestination;
  documentation: PublicDestination;
}

export interface ProjectReleaseMetadata {
  publicToolVersion?: string;
  releaseDate?: string;
  datasetVersion?: string;
  datasetDate?: string;
  deploymentState: "not-deployed" | "preview" | "production" | "archived";
}

export interface ProjectContentNote {
  title?: string;
  description: string;
}

export type ProjectVisual =
  | {
      kind: "system-illustration";
      illustration: "spectrum" | "planning-flow";
    }
  | {
      kind: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
      disclosure?: string;
      source?: string;
    }
  | {
      kind: "none";
      label?: string;
      description?: string;
    };

interface ProjectCaseStudyContent {
  eyebrow: string;
  detailIntroduction: string;
  challenge: string;
  approach: string;
  evidence: ProjectEvidence;
  interfaceEvidence?: readonly ProjectEvidenceFigure[];
  systemSections: readonly ProjectSystemSection[];
  currentState: string;
  nextSteps: readonly string[];
}

export type ProjectCaseStudy =
  | { availability: "unavailable" }
  | (ProjectCaseStudyContent & {
      availability: "in-preparation" | "available";
    });

export interface ProjectRecord {
  slug: string;
  index: string;
  title: string;
  summary: string;
  description: string;
  role?: string;
  disciplines: readonly string[];
  projectType: string;
  status: ProjectLifecycleStatus;
  statusLabel: string;
  featured: boolean;
  visibility: ProjectVisibility;
  indexability: ProjectIndexability;
  order: number;
  visual: ProjectVisual;
  caseStudy: ProjectCaseStudy;
  destinations: ProjectDestinations;
  release?: ProjectReleaseMetadata;
  validationNotes?: readonly ProjectContentNote[];
  disclosureNotes?: readonly ProjectContentNote[];
}

export type ProjectWithCaseStudy = ProjectRecord & {
  caseStudy: Exclude<ProjectCaseStudy, { availability: "unavailable" }>;
};

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
    status: "active-development",
    statusLabel: "Public Light preparation",
    featured: true,
    visibility: "public",
    indexability: "index",
    order: 1,
    visual: {
      kind: "image",
      src: "/projects/rf-spectrum-dashboard/rf-dashboard-light-overview.png",
      alt: "Map-based RF spectrum dashboard with RF band, region, and country filters, a color-coded world map, country spectrum details, and public-candidate disclosure.",
      width: 1440,
      height: 900,
      caption:
        "Local public-safe release candidate. Public preview not yet available.",
      disclosure:
        "Reference data may be incomplete or outdated; verify current official requirements.",
    },
    caseStudy: {
      availability: "in-preparation",
      eyebrow: "Project record / RF systems",
      detailIntroduction:
        "RF Dashboard Light 0.1.0 is a sanitized local release candidate that brings regional spectrum ranges, country-level review, filtering, and power context into one coordinated engineering reference. The public preview is not yet available.",
      challenge:
        "Regional spectrum information is difficult to compare consistently across markets, and a public portfolio record cannot expose internal workflow material or imply official regulatory completeness. The interface must keep geography, frequency ranges, power context, data limits, and release status understandable while remaining explicit that official requirements still need independent verification.",
      approach:
        "The candidate remains a self-contained static HTML tool with no runtime external dependencies. Map selection, region and country filters, RF-band filtering, spectrum information, and the detail matrix are driven by one reviewed public dataset, while the editorial case study stays separate from the standalone tool and its future deployment path.",
      evidence: {
        caption:
          "Verified local-candidate facts recorded during Public Light preparation.",
        facts: [
          {
            label: "Public subset",
            value: "175 of 245 source records retained",
          },
          {
            label: "Withheld from candidate",
            value: "70 source records",
          },
          {
            label: "Public export",
            value: "7 reviewed fields",
          },
        ],
        decisions: [
          {
            title: "Keep the review surfaces coordinated",
            description:
              "Preserve geographic context as a review moves from the global map through filters into country spectrum information and the detail matrix.",
          },
          {
            title: "Build from one reviewed public subset",
            description:
              "Regenerate the retained interface data from a controlled sanitized structure instead of exposing duplicated source representations or internal fields.",
          },
          {
            title: "Separate evidence from release",
            description:
              "Use authentic local screenshots in the editorial case study without treating portfolio evidence as a deployed tool or a live-preview destination.",
          },
        ],
      },
      interfaceEvidence: [
        {
          src: "/projects/rf-spectrum-dashboard/rf-dashboard-light-country-state.png",
          alt: "RF Dashboard Light Home view filtered to South Korea, with RF band, region, and country controls above the world map and South Korea spectrum details.",
          width: 1440,
          height: 900,
          caption:
            "South Korea selected in the local public-safe candidate, showing a real multi-band country review state.",
          disclosure:
            "This state is evidence of the current interface, not a claim of global regulatory completeness.",
        },
        {
          src: "/projects/rf-spectrum-dashboard/rf-dashboard-light-spectrum-detail.png",
          alt: "RF Dashboard Light Spectrum Detail view filtered to South Korea, showing RF filters, Band Scope controls, matrix headings, and the current oversized flag row-layout limitation.",
          width: 1440,
          height: 900,
          caption:
            "Spectrum Detail in the current local candidate, filtered to one ordinary country group.",
          disclosure:
            "The oversized flag and incomplete row layout are retained as an unresolved candidate UI issue; the evidence has not been visually corrected.",
        },
      ],
      systemSections: [
        {
          title: "Self-contained delivery",
          description:
            "One static HTML candidate carries its reviewed data and interface assets without runtime external dependencies.",
        },
        {
          title: "Public data boundary",
          description:
            "A sanitized subset retains the fields required for public reference behavior while withholding unreviewed records and internal material.",
        },
        {
          title: "Geographic review",
          description:
            "Map-first navigation and region or country filters keep location visible throughout the review.",
        },
        {
          title: "Spectrum coordination",
          description:
            "Frequency filters, country information, and the Spectrum Detail matrix share the same reviewed public records.",
        },
        {
          title: "Disclosure and export",
          description:
            "Visible limitations remain part of both tool views, and CSV output is restricted to seven reviewed public fields.",
        },
      ],
      currentState:
        "RF Dashboard Light 0.1.0 exists as a public-safe local release candidate. It retains 175 reviewed records from 245 source records, remains desktop-first, has no runtime external dependencies, and is not deployed. The screenshots document the current candidate, including an unresolved Spectrum Detail row-layout limitation.",
      nextSteps: [
        "Resolve the recorded Spectrum Detail layout and known desktop UI issues without changing the reviewed public-data boundary.",
        "Complete the 1024 px candidate acceptance work and revalidate map, filters, disclosure, matrix, and export behavior.",
        "Establish and validate a working standalone preview in a later deployment phase.",
        "Add a live-tool destination only after a real preview URL exists and passes release validation.",
      ],
    },
    destinations: {
      liveTool: {
        availability: "planned",
        label: "Open public Light dashboard",
        accessibilityDescription:
          "Open the public-safe Global RF Spectrum Dashboard Light tool",
        externalBehavior: "new-tab",
      },
      repository: { availability: "unavailable" },
      documentation: { availability: "unavailable" },
    },
    release: {
      publicToolVersion: "RF Dashboard Light 0.1.0",
      deploymentState: "not-deployed",
    },
    disclosureNotes: [
      {
        description:
          "This personal engineering project is a public-safe local release candidate for reference and demonstration. Data may be incomplete or outdated; verify official requirements. No public preview is currently available.",
      },
    ],
    validationNotes: [
      {
        description:
          "Localhost validation covered identity, disclosure, map and filter behavior, Spectrum Detail navigation, row expansion, and the seven-field CSV export.",
      },
      {
        description:
          "The current sanitized candidate retains 175 public records, with 70 source records withheld and no runtime external dependencies.",
      },
    ],
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
    status: "active-development",
    statusLabel: "In active development",
    featured: true,
    visibility: "public",
    indexability: "index",
    order: 2,
    visual: {
      kind: "system-illustration",
      illustration: "planning-flow",
    },
    caseStudy: {
      availability: "in-preparation",
      eyebrow: "Project record / compliance systems",
      detailIntroduction:
        "The planning system converts product facts and rule applicability into a reviewable draft plan while keeping assumptions, missing inputs, and the human confirmation step visible throughout.",
      challenge:
        "Compliance planning requires structured product inputs, rule applicability, traceable outputs, assumptions, and human review. Relevant information may be distributed across documents and reviewer knowledge, so the project focuses on making the planning workflow more structured and reviewable.",
      approach:
        "The approach starts with structured Product DNA inputs and deterministic applicability logic, then groups results into requirement packages and reviewable draft outputs. Assumptions and missing inputs remain visible, with human review serving as the final confirmation step.",
      evidence: {
        caption:
          "Sanitized decision-flow model showing how product facts, deterministic logic, and human review remain traceable in the planning workflow.",
        facts: [
          {
            label: "Input scope",
            value: "Structured product and market facts",
          },
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
    },
    destinations: {
      liveTool: { availability: "unavailable" },
      repository: { availability: "unavailable" },
      documentation: { availability: "unavailable" },
    },
    disclosureNotes: [
      {
        description:
          "The project is in active development and does not currently offer a public demo.",
      },
    ],
  },
] satisfies readonly ProjectRecord[];

export const projects: readonly ProjectRecord[] = [...projectRecords].sort(
  (first, second) => first.order - second.order,
);

export const publicProjects = projects.filter(
  (project) => project.visibility === "public",
);

export const featuredProjects = publicProjects.filter(
  (project) => project.featured,
);

export function hasCaseStudy(
  project: ProjectRecord,
): project is ProjectWithCaseStudy {
  return project.caseStudy.availability !== "unavailable";
}

export const publicCaseStudyProjects: readonly ProjectWithCaseStudy[] =
  publicProjects.filter(hasCaseStudy);

export function getPublicCaseStudyBySlug(
  slug: string,
): ProjectWithCaseStudy | undefined {
  return publicCaseStudyProjects.find((project) => project.slug === slug);
}

export function getRelatedPublicCaseStudy(
  currentSlug: string,
): ProjectWithCaseStudy | undefined {
  return publicCaseStudyProjects.find(
    (candidate) => candidate.slug !== currentSlug,
  );
}
