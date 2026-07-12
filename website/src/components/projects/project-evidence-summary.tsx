import type { ProjectRecord } from "@/content/projects";

type ProjectEvidenceSummaryProps = {
  mode: "decisions" | "facts";
  project: ProjectRecord;
};

export function ProjectEvidenceSummary({
  mode,
  project,
}: ProjectEvidenceSummaryProps) {
  if (mode === "facts") {
    return (
      <dl className="project-fact-snapshot">
        {project.evidence.facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <div className="project-decisions">
      {project.evidence.decisions.map((decision) => (
        <article key={decision.title}>
          <h3>{decision.title}</h3>
          <p>{decision.description}</p>
        </article>
      ))}
    </div>
  );
}
