import type { ElementType, ReactNode } from "react";

type SectionHeadingProps = {
  as?: ElementType;
  description?: string;
  eyebrow?: string;
  id?: string;
  title: ReactNode;
};

export function SectionHeading({
  as: Heading = "h2",
  description,
  eyebrow,
  id,
  title,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading className="section-heading__title" id={id}>
        {title}
      </Heading>
      {description ? (
        <p className="section-heading__description">{description}</p>
      ) : null}
    </div>
  );
}
