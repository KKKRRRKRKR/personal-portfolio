import type { ProjectSystemSection } from "@/content/projects";

type ProjectSystemStructureProps = {
  sections: readonly ProjectSystemSection[];
};

export function ProjectSystemStructure({
  sections,
}: ProjectSystemStructureProps) {
  return (
    <ol className="project-system-structure">
      {sections.map((section, index) => (
        <li key={section.title}>
          <span>{(index + 1).toString().padStart(2, "0")}</span>
          <div>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
