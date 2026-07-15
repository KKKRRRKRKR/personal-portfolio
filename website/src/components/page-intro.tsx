import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { SectionHeading } from "@/components/ui/section-heading";

type PageIntroProps = {
  children?: ReactNode;
  description?: string;
  eyebrow?: string;
  title: string;
};

export function PageIntro({
  children,
  description,
  eyebrow,
  title,
}: PageIntroProps) {
  return (
    <header className="page-intro" aria-labelledby="page-title">
      <Container>
        <div className="page-intro__frame">
          <SectionHeading
            as="h1"
            description={description}
            eyebrow={eyebrow}
            id="page-title"
            title={title}
          />
          <Divider className="page-intro__divider" />
          {children ? (
            <div className="page-intro__action">{children}</div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
