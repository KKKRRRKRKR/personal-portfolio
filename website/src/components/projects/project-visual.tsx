import type { ProjectRecord } from "@/content/projects";

type ProjectVisualVariant =
  "detail" | "feature" | "index" | "interface" | "overview";

type ProjectVisualProps = {
  project: ProjectRecord;
  variant?: ProjectVisualVariant;
};

const spectrumCopy: Record<
  ProjectVisualVariant,
  { caption: string; title: string }
> = {
  overview: {
    title: "Global spectrum overview",
    caption:
      "A public-safe overview of regions, frequency ranges, and review paths.",
  },
  feature: {
    title: "Market comparison view",
    caption:
      "A public-safe comparison of regional range patterns across a shared review surface.",
  },
  index: {
    title: "Regional spectrum comparison",
    caption:
      "A public-safe representation of regional frequency ranges and review context.",
  },
  detail: {
    title: "Regional range evidence",
    caption:
      "A closer public-safe view of range alignment and the context carried into review.",
  },
  interface: {
    title: "Filter and comparison view",
    caption:
      "A public-safe interface view for narrowing a region while preserving comparison context.",
  },
};

const planningCopy: Record<
  ProjectVisualVariant,
  { caption: string; title: string }
> = {
  overview: {
    title: "Planning system overview",
    caption: "A public-safe overview of the structured planning path.",
  },
  feature: {
    title: "Traceable planning flow",
    caption:
      "A public-safe view of the relationship between inputs, rule logic, and review.",
  },
  index: {
    title: "Requirement planning flow",
    caption:
      "A public-safe representation of the workflow from product facts to a reviewable draft.",
  },
  detail: {
    title: "Draft-plan decision path",
    caption:
      "A closer public-safe view of the control points that keep a draft plan reviewable.",
  },
  interface: {
    title: "Review boundary view",
    caption:
      "A public-safe interface view of assumptions and human confirmation in the planning flow.",
  },
};

export function ProjectVisual({
  project,
  variant = "feature",
}: ProjectVisualProps) {
  const isSpectrum = project.evidence.kind === "spectrum";
  const copy = (isSpectrum ? spectrumCopy : planningCopy)[variant];

  return (
    <figure className={`project-visual project-visual--${variant}`}>
      <div className="project-visual__canvas">
        {isSpectrum ? (
          <SpectrumVisual variant={variant} />
        ) : (
          <PlanningVisual variant={variant} />
        )}
      </div>
      <figcaption>
        <span>{copy.title}</span>
        {copy.caption}
      </figcaption>
    </figure>
  );
}

function SpectrumVisual({ variant }: { variant: ProjectVisualVariant }) {
  if (variant === "overview") {
    return <SpectrumOverviewDiagram />;
  }

  if (variant === "detail") {
    return <SpectrumDetailDiagram />;
  }

  if (variant === "interface") {
    return <SpectrumInterfaceDiagram />;
  }

  return (
    <SpectrumComparisonDiagram
      title={
        variant === "index"
          ? "Regional spectrum comparison"
          : "Market comparison"
      }
    />
  );
}

function SpectrumOverviewDiagram() {
  return (
    <svg
      aria-label="Public-safe global spectrum overview"
      className="project-visual__svg"
      role="img"
      viewBox="0 0 720 450"
    >
      <rect fill="#111111" height="450" width="720" />
      <text fill="#F5F5F5" fontSize="19" fontWeight="600" x="42" y="55">
        Global spectrum overview
      </text>
      <text fill="#8F8F8F" fontSize="12" x="42" y="80">
        Regional review paths · public-safe example
      </text>
      <g fill="none" stroke="#4EC47C" strokeWidth="1.25">
        <path d="M120 168c31-40 104-50 144-16 31 26 26 76-14 98-43 24-100 16-132-15-28-28-24-47 2-67Z" />
        <path d="M348 159c39-27 98-13 123 23 25 37 2 81-45 91-47 11-93-11-104-45-8-26 3-51 26-69Z" />
        <path d="M514 178c39-29 98-9 120 27 20 34-7 76-54 83-45 7-88-16-98-48-7-22 7-45 32-62Z" />
      </g>
      <g fill="#D4D4D4" fontSize="12">
        <text x="108" y="304">
          North America
        </text>
        <text x="360" y="304">
          Europe
        </text>
        <text x="533" y="304">
          Japan
        </text>
      </g>
      <g fill="#4EC47C">
        <rect height="8" rx="2" width="112" x="88" y="327" />
        <rect height="8" rx="2" width="96" x="332" y="327" />
        <rect height="8" rx="2" width="80" x="516" y="327" />
      </g>
      <line stroke="#3D3D3D" x1="42" x2="678" y1="376" y2="376" />
      <g fill="#B4B4B4" fontSize="11">
        <text x="42" y="408">
          Global view
        </text>
        <text x="254" y="408">
          Region comparison
        </text>
        <text x="500" y="408">
          Country review
        </text>
      </g>
      <g fill="#4EC47C">
        <circle cx="149" cy="404" r="4" />
        <circle cx="422" cy="404" r="4" />
        <circle cx="640" cy="404" r="4" />
      </g>
    </svg>
  );
}

function SpectrumComparisonDiagram({ title }: { title: string }) {
  return (
    <svg
      aria-label="Public-safe regional spectrum comparison"
      className="project-visual__svg"
      role="img"
      viewBox="0 0 720 450"
    >
      <rect fill="#111111" height="450" width="720" />
      <text fill="#F5F5F5" fontSize="19" fontWeight="600" x="42" y="55">
        {title}
      </text>
      <text fill="#8F8F8F" fontSize="12" x="42" y="80">
        Regional frequency ranges · public-safe example
      </text>
      <line stroke="#3D3D3D" x1="42" x2="678" y1="108" y2="108" />
      <text fill="#969696" fontSize="11" x="196" y="136">
        400 MHz
      </text>
      <text fill="#969696" fontSize="11" x="325" y="136">
        900 MHz
      </text>
      <text fill="#969696" fontSize="11" x="456" y="136">
        2.4 GHz
      </text>
      <text fill="#969696" fontSize="11" x="586" y="136">
        5.2 GHz
      </text>
      <g fill="#B6B6B6" fontSize="12">
        <text x="42" y="184">
          North America
        </text>
        <text x="42" y="250">
          Europe
        </text>
        <text x="42" y="316">
          Japan
        </text>
      </g>
      <g stroke="#353535" strokeWidth="1">
        <line x1="183" x2="678" y1="179" y2="179" />
        <line x1="183" x2="678" y1="245" y2="245" />
        <line x1="183" x2="678" y1="311" y2="311" />
        <line x1="183" x2="678" y1="370" y2="370" />
      </g>
      <g fill="#4EC47C">
        <rect height="20" rx="2" width="164" x="198" y="162" />
        <rect height="20" rx="2" width="115" x="465" y="162" />
        <rect height="20" rx="2" width="126" x="254" y="228" />
        <rect height="20" rx="2" width="152" x="500" y="228" />
        <rect height="20" rx="2" width="94" x="330" y="294" />
        <rect height="20" rx="2" width="144" x="466" y="294" />
      </g>
      <g fill="#D3D3D3" fontSize="11">
        <text x="198" y="408">
          Filter by region
        </text>
        <text x="414" y="408">
          Compare frequency and power context
        </text>
      </g>
      <circle cx="389" cy="404" fill="#4EC47C" r="4" />
    </svg>
  );
}

function SpectrumDetailDiagram() {
  return (
    <svg
      aria-label="Public-safe close spectrum review view"
      className="project-visual__svg"
      role="img"
      viewBox="0 0 720 450"
    >
      <rect fill="#111111" height="450" width="720" />
      <text fill="#F5F5F5" fontSize="19" fontWeight="600" x="42" y="55">
        Regional range evidence
      </text>
      <text fill="#8F8F8F" fontSize="12" x="42" y="80">
        Europe · country review context
      </text>
      <g fill="#B6B6B6" fontSize="12">
        <text x="42" y="144">
          Range
        </text>
        <text x="226" y="144">
          Power context
        </text>
        <text x="455" y="144">
          Review state
        </text>
      </g>
      <g stroke="#353535" strokeWidth="1">
        <line x1="42" x2="678" y1="166" y2="166" />
        <line x1="42" x2="678" y1="236" y2="236" />
        <line x1="42" x2="678" y1="306" y2="306" />
      </g>
      <g fill="#E7E7E7" fontSize="15" fontWeight="600">
        <text x="42" y="204">
          863–870 MHz
        </text>
        <text x="42" y="274">
          2400–2483.5 MHz
        </text>
        <text x="42" y="344">
          5150–5350 MHz
        </text>
      </g>
      <g fill="#4EC47C">
        <rect height="18" rx="2" width="92" x="226" y="188" />
        <rect height="18" rx="2" width="142" x="226" y="258" />
        <rect height="18" rx="2" width="112" x="226" y="328" />
      </g>
      <g fill="#BABABA" fontSize="12">
        <text x="455" y="204">
          Compare
        </text>
        <text x="455" y="274">
          Filter
        </text>
        <text x="455" y="344">
          Confirm context
        </text>
      </g>
      <line stroke="#3D3D3D" x1="42" x2="678" y1="392" y2="392" />
      <text fill="#B6B6B6" fontSize="11" x="42" y="418">
        The evidence view keeps ranges, context, and review actions together.
      </text>
    </svg>
  );
}

function SpectrumInterfaceDiagram() {
  return (
    <svg
      aria-label="Public-safe filter and spectrum comparison interface"
      className="project-visual__svg"
      role="img"
      viewBox="0 0 720 450"
    >
      <rect fill="#111111" height="450" width="720" />
      <text fill="#F5F5F5" fontSize="19" fontWeight="600" x="42" y="55">
        Filter and comparison view
      </text>
      <text fill="#8F8F8F" fontSize="12" x="42" y="80">
        Region: Europe · selection retained across review
      </text>
      <g fill="#232323" stroke="#434343" strokeWidth="1">
        <rect height="52" rx="2" width="188" x="42" y="116" />
        <rect height="52" rx="2" width="188" x="250" y="116" />
        <rect height="52" rx="2" width="188" x="458" y="116" />
      </g>
      <g fill="#D0D0D0" fontSize="11">
        <text x="58" y="138">
          Region
        </text>
        <text x="266" y="138">
          Frequency band
        </text>
        <text x="474" y="138">
          Power context
        </text>
      </g>
      <g fill="#F5F5F5" fontSize="13" fontWeight="600">
        <text x="58" y="158">
          Europe
        </text>
        <text x="266" y="158">
          5 GHz
        </text>
        <text x="474" y="158">
          Visible
        </text>
      </g>
      <line stroke="#3D3D3D" x1="42" x2="678" y1="206" y2="206" />
      <g stroke="#353535" strokeWidth="1">
        <line x1="132" x2="650" y1="254" y2="254" />
        <line x1="132" x2="650" y1="315" y2="315" />
      </g>
      <g fill="#B6B6B6" fontSize="12">
        <text x="42" y="259">
          EU
        </text>
        <text x="42" y="320">
          JP
        </text>
      </g>
      <g fill="#4EC47C">
        <rect height="22" rx="2" width="174" x="232" y="243" />
        <rect height="22" rx="2" width="134" x="444" y="243" />
        <rect height="22" rx="2" width="107" x="267" y="304" />
        <rect height="22" rx="2" width="150" x="433" y="304" />
      </g>
      <text fill="#BABABA" fontSize="11" x="42" y="393">
        The selected context remains visible while the comparison narrows.
      </text>
    </svg>
  );
}

function PlanningVisual({ variant }: { variant: ProjectVisualVariant }) {
  const isDetail = variant === "detail" || variant === "interface";

  return (
    <svg
      aria-label="Public-safe compliance planning decision-flow diagram"
      className="project-visual__svg"
      role="img"
      viewBox="0 0 720 450"
    >
      <rect fill="#F4F4F4" height="450" width="720" />
      <text fill="#161616" fontSize="19" fontWeight="600" x="42" y="55">
        {isDetail ? "Review boundary view" : "Planning decision flow"}
      </text>
      <text fill="#717171" fontSize="12" x="42" y="80">
        Public-safe example · traceable draft workflow
      </text>
      <g fill="#FFFFFF" stroke="#272727" strokeWidth="1.25">
        <rect height="90" rx="3" width="175" x="42" y="150" />
        <rect height="90" rx="3" width="175" x="273" y="150" />
        <rect height="90" rx="3" width="175" x="504" y="150" />
        <rect height="82" rx="3" width="175" x="273" y="300" />
      </g>
      <g fill="#161616" fontSize="15" fontWeight="600">
        <text x="62" y="184">
          Product inputs
        </text>
        <text x="293" y="184">
          Rule logic
        </text>
        <text x="524" y="184">
          Draft plan
        </text>
        <text x="293" y="334">
          Human review
        </text>
      </g>
      <g fill="#666666" fontSize="11">
        <text x="62" y="210">
          Product DNA
        </text>
        <text x="62" y="226">
          Market context
        </text>
        <text x="293" y="210">
          Applicability
        </text>
        <text x="293" y="226">
          Requirement packages
        </text>
        <text x="524" y="210">
          Assumptions
        </text>
        <text x="524" y="226">
          Traceable output
        </text>
        <text x="293" y="360">
          Confirm and resolve
        </text>
      </g>
      <g fill="none" stroke="#4A4A4A" strokeWidth="1.5">
        <path d="M217 195H273" />
        <path d="M448 195H504" />
        <path d="M591 240V270H361V300" />
      </g>
      <g fill="#4A4A4A">
        <path d="m266 190 7 5-7 5z" />
        <path d="m497 190 7 5-7 5z" />
        <path d="m356 295 5 7 5-7z" />
      </g>
      <line stroke="#D2D2D2" x1="42" x2="678" y1="416" y2="416" />
      <text fill="#666666" fontSize="11" x="42" y="438">
        Decisions remain reviewable; automation does not replace confirmation.
      </text>
    </svg>
  );
}
