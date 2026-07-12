import type { ProjectSystemSection } from "@/content/projects";

type ProjectSystemStructureProps = {
  sections: readonly ProjectSystemSection[];
};

export function ProjectSystemStructure({
  sections,
}: ProjectSystemStructureProps) {
  return (
    <ul className="project-system-structure">
      {sections.map((section) => (
        <li key={section.title}>
          <div>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
