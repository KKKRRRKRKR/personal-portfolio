import { siteConfig } from "@/content/site";

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
  metadataDescription: string;
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

const rfDashboardUrl = `${siteConfig.url}/tools/rf-dashboard-light/`;
const publicAsset = (assetPath: string) =>
  `${siteConfig.basePath}${assetPath}` || assetPath;
const rfIsPreview = siteConfig.deploymentContext === "preview";
const rfReleaseState = rfIsPreview ? "public preview" : "public release";
const rfLiveTool: LiveToolDestination = rfIsPreview
  ? {
      availability: "preview",
      url: rfDashboardUrl,
      label: "Open Dashboard preview",
      accessibilityDescription:
        "Open the RF Dashboard Light public preview in a new tab",
      externalBehavior: "new-tab",
    }
  : {
      availability: "available",
      url: rfDashboardUrl,
      label: "Open RF Dashboard",
      accessibilityDescription:
        "Open RF Dashboard Light in a new tab; desktop-first interface",
      externalBehavior: "new-tab",
    };

const projectRecords = [
  {
    slug: "global-rf-spectrum-dashboard",
    index: "01",
    title: "Global RF Spectrum Dashboard",
    summary:
      "An interactive, map-first interface for reviewing wireless spectrum and power information across global markets.",
    metadataDescription:
      "Portfolio project record for RF Dashboard Light 0.1.1, a public-safe standalone spectrum review tool with documented data limitations.",
    description:
      "A structured visualization environment that brings regional spectrum information, country-level review, filtering, and power-limit context into one navigable interface.",
    disciplines: ["Data visualization", "RF spectrum", "Interactive dashboard"],
    projectType: "Engineering data interface",
    status: "active-development",
    statusLabel: "Public Light available",
    featured: true,
    visibility: "public",
    indexability: "index",
    order: 1,
    visual: {
      kind: "image",
      src: publicAsset(
        "/projects/rf-spectrum-dashboard/rf-dashboard-light-overview.png",
      ),
      alt: "Map-based RF spectrum dashboard with RF band, region, and country filters, a color-coded world map, country spectrum details, and public-candidate disclosure.",
      width: 1440,
      height: 900,
      caption: `Public-safe ${rfReleaseState}. Desktop-first interface.`,
      disclosure:
        "Reference data may be incomplete or outdated; verify current official requirements.",
    },
    caseStudy: {
      availability: "in-preparation",
      eyebrow: "Project record / RF systems",
      detailIntroduction: `RF Dashboard Light 0.1.1 is a sanitized ${rfReleaseState} that brings regional spectrum ranges, country-level review, filtering, and power context into one coordinated engineering reference. The standalone tool is available through the public action on this page.`,
      challenge:
        "Regional spectrum information is difficult to compare consistently across markets, and a public portfolio record cannot expose internal workflow material or imply official regulatory completeness. The interface must keep geography, frequency ranges, power context, data limits, and release status understandable while remaining explicit that official requirements still need independent verification.",
      approach:
        "The candidate remains a self-contained static HTML tool with no runtime external dependencies. Map selection, region and country filters, RF-band filtering, spectrum information, and the detail matrix are driven by one reviewed public dataset, while the editorial case study stays separate from the standalone tool and its future deployment path.",
      evidence: {
        caption:
          "Verified public-release facts established from the approved local candidate.",
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
          src: publicAsset(
            "/projects/rf-spectrum-dashboard/rf-dashboard-light-country-state.png",
          ),
          alt: "RF Dashboard Light Home view filtered to South Korea, with RF band, region, and country controls above the world map and South Korea spectrum details.",
          width: 1440,
          height: 900,
          caption:
            "South Korea selected in the local public-safe candidate, showing a real multi-band country review state.",
          disclosure:
            "This state is evidence of the current interface, not a claim of global regulatory completeness.",
        },
        {
          src: publicAsset(
            "/projects/rf-spectrum-dashboard/rf-dashboard-light-spectrum-detail.png",
          ),
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
      currentState: `RF Dashboard Light 0.1.1 is available as a public-safe ${rfReleaseState}. It retains 175 reviewed records from 245 source records, remains desktop-first, and has no runtime external dependencies. The screenshots document the reviewed interface, including an accepted Spectrum Detail row-layout limitation.`,
      nextSteps: [
        "Monitor the public artifact and preserve the reviewed data boundary in future releases.",
        "Address documented Spectrum Detail layout limitations only when they materially improve correct use.",
        "Revalidate map, filters, disclosure, matrix, export, and indexing behavior for every public version.",
      ],
    },
    destinations: {
      liveTool: rfLiveTool,
      repository: { availability: "unavailable" },
      documentation: { availability: "unavailable" },
    },
    release: {
      publicToolVersion: "RF Dashboard Light 0.1.1",
      releaseDate: "2026-07-15",
      datasetVersion: "Review candidate",
      datasetDate: "Unverified",
      deploymentState: rfIsPreview ? "preview" : "production",
    },
    disclosureNotes: [
      {
        description: `This personal engineering project is a public-safe ${rfReleaseState} for reference and demonstration. Data may be incomplete or outdated; verify official requirements. The tool is desktop-first and the Spectrum Detail matrix intentionally uses horizontal scrolling.`,
      },
    ],
    validationNotes: [
      {
        description:
          "Local HTTP validation covered identity, disclosure, map and filter behavior, Spectrum Detail navigation, row expansion, and the seven-field CSV export.",
      },
      {
        description:
          "The current sanitized candidate retains 175 public records, with 70 source records withheld and no runtime external dependencies.",
      },
      {
        description:
          "Production validation passed across the Portfolio link, primary Dashboard interactions, keyboard focus retention, and seven-field CSV export with zero failed or external runtime requests.",
      },
    ],
  },
  {
    slug: "compliance-plan-generator",
    index: "02",
    title: "Compliance Plan Generator",
    summary:
      "An in-development, rule-driven system for structuring product inputs, applicability logic, and traceable compliance-planning outputs with mandatory human review.",
    metadataDescription:
      "An in-development compliance planning architecture for traceable product inputs, deterministic applicability logic, and mandatory expert review.",
    description:
      "An in-development planning architecture connecting structured product inputs, deterministic applicability logic, missing information, draft outputs, and expert review.",
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
        "This in-development system is intended to turn structured product and market inputs into traceable draft compliance-planning outputs. Applicability remains deterministic, unresolved questions stay visible, and expert review is mandatory.",
      challenge:
        "Compliance planning requires product characteristics, target markets, regulatory domains, missing information, applicability rules, required evidence, and review decisions to remain coordinated. Those inputs can be incomplete and rules can change by market, while proprietary knowledge must stay protected and every conclusion still requires expert judgment.",
      approach:
        "The current architecture is designed to move from structured Product DNA and classification through deterministic applicability rules, requirement packages, and draft outputs. AI may support explanation or drafting, but it does not determine final applicability. Missing inputs and open questions remain explicit, with human review serving as a required system boundary.",
      evidence: {
        caption:
          "Public-safe architecture summary of the intended planning flow; it is not evidence of a finished product.",
        facts: [
          {
            label: "Development focus",
            value: "Structure, traceability, and review",
          },
          {
            label: "Decision boundary",
            value: "Deterministic applicability; AI does not decide scope",
          },
          {
            label: "Public boundary",
            value: "Architecture only; no public demonstration",
          },
        ],
        decisions: [
          {
            title: "Structure inputs before rules",
            description:
              "The design uses explicit Product DNA and classification fields so the planning context can be reviewed before any applicability path is evaluated.",
          },
          {
            title: "Separate decisions from drafting",
            description:
              "Applicability remains deterministic and traceable; AI assistance may explain or draft text but cannot establish the final compliance scope.",
          },
          {
            title: "Make expert review a system boundary",
            description:
              "Carry assumptions, missing inputs, and open questions into review instead of hiding them behind an apparently final plan.",
          },
        ],
      },
      systemSections: [
        {
          title: "Structured product inputs",
          description:
            "The current design starts with Product DNA and target-market inputs that establish the planning context.",
        },
        {
          title: "Product classification",
          description:
            "Classification is intended to organize the attributes that may affect later rule evaluation.",
        },
        {
          title: "Applicability rules",
          description:
            "Deterministic rule paths are being developed without exposing proprietary rule content.",
        },
        {
          title: "Requirement packages",
          description:
            "The architecture is intended to group related requirements without implying complete rule coverage.",
        },
        {
          title: "Structured draft output",
          description:
            "Draft output structures are intended to carry source inputs, assumptions, and planning context forward.",
        },
        {
          title: "Missing inputs and open questions",
          description:
            "Unresolved information remains visible for follow-up instead of being converted into an unsupported conclusion.",
        },
        {
          title: "Human review",
          description:
            "Expert review remains mandatory before any draft output can inform an operational decision.",
        },
      ],
      currentState:
        "The project remains in active development, with no public demonstration and no readiness for external operational use. Rule coverage, output structures, and review behavior are still being implemented and validated. This public record describes architecture and workflow only; proprietary rules, internal datasets, and company-sensitive material are excluded. Any output remains draft material requiring expert review.",
      nextSteps: [
        "Validate rule accuracy against representative product scenarios.",
        "Improve missing-input and open-question handling.",
        "Strengthen traceability from source inputs through applicability decisions and draft outputs.",
        "Verify output structures and the expert-review workflow with controlled test coverage.",
        "Determine whether any future implementation can meet the separate gate for a public-safe demonstration.",
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
          "The project remains in active development. This public page describes architecture and workflow only; no public demonstration is available. Proprietary rules and internal data are excluded, and expert review remains mandatory.",
      },
    ],
    validationNotes: [
      {
        description:
          "Architecture, rule-library boundaries, and output structures are being tested iteratively. Full regulatory coverage and production readiness have not been established.",
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
