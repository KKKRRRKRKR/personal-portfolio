import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";
import { TextLink } from "@/components/ui/text-link";

export const metadata: Metadata = {
  title: "About",
  description:
    "XG builds inspectable engineering systems for spectrum, compliance, and product decisions.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        description="XG builds engineering systems that make complex technical context easier to inspect, review, and use."
        eyebrow="About"
        title="About"
      >
        <p className="page-intro__note">
          The portfolio focuses on the systems, decisions, and working methods
          behind complex technical projects.
        </p>
      </PageIntro>
      <div className="profile-content">
        <section
          className="profile-section"
          aria-labelledby="professional-focus"
        >
          <div className="site-frame profile-section__grid">
            <p className="profile-section__label">Professional focus</p>
            <div className="profile-section__content">
              <h2 id="professional-focus">
                Technical systems that connect engineering context to reviewable
                decisions.
              </h2>
              <p>
                The work sits at the intersection of electronic product
                compliance, wireless spectrum and regional requirements,
                engineering data, and product-development workflows. It uses
                structured information and technical visualization to make a
                difficult system more usable without flattening the detail that
                matters.
              </p>
            </div>
          </div>
        </section>
        <section
          className="profile-section"
          aria-labelledby="working-perspective"
        >
          <div className="site-frame profile-section__grid">
            <p className="profile-section__label">Working perspective</p>
            <div className="profile-section__content">
              <h2 id="working-perspective">
                Automation should strengthen expert review, not hide it.
              </h2>
              <p>
                Complex technical work often starts with fragmented information.
                Rules, assumptions, and inputs need to remain visible as they
                move through a system. The aim is deterministic, maintainable
                tooling with interfaces that clarify decisions and keep the path
                to an outcome traceable.
              </p>
            </div>
          </div>
        </section>
        <section
          className="profile-section"
          aria-labelledby="portfolio-direction"
        >
          <div className="site-frame profile-section__grid">
            <p className="profile-section__label">
              Current portfolio direction
            </p>
            <div className="profile-section__content">
              <h2 id="portfolio-direction">
                Two projects, one systems approach.
              </h2>
              <p>
                The Global RF Spectrum Dashboard explores how regional spectrum
                information can be compared in one navigable working surface.
                The Compliance Plan Generator focuses on turning product facts
                and rule logic into a reviewable draft plan.
              </p>
              <div className="profile-section__links">
                <TextLink href="/projects/global-rf-spectrum-dashboard">
                  View the RF Spectrum Dashboard
                </TextLink>
                <TextLink href="/projects/compliance-plan-generator">
                  View the Compliance Plan Generator
                </TextLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
