import type { ReactNode } from "react";

type ProjectDetailSectionProps = {
  children: ReactNode;
  id: string;
  title: string;
  variant?: "reading" | "wide" | "outcome";
};

export function ProjectDetailSection({
  children,
  id,
  title,
  variant = "reading",
}: ProjectDetailSectionProps) {
  return (
    <section
      className={`project-detail-section project-detail-section--${variant}`}
      aria-labelledby={id}
    >
      <div className="project-detail-section__heading">
        <h2 id={id}>{title}</h2>
      </div>
      <div className="project-detail-section__content">{children}</div>
    </section>
  );
}
