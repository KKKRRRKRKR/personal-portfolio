import type { ReactNode } from "react";

type ProjectDetailSectionProps = {
  children: ReactNode;
  id: string;
  label: string;
  title: string;
};

export function ProjectDetailSection({
  children,
  id,
  label,
  title,
}: ProjectDetailSectionProps) {
  return (
    <section className="project-detail-section" aria-labelledby={id}>
      <div className="project-detail-section__heading">
        <p className="project-detail-section__label">{label}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <div className="project-detail-section__content">{children}</div>
    </section>
  );
}
