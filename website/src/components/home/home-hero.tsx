import { ProjectVisual } from "@/components/projects/project-visual";
import { TextLink } from "@/components/ui/text-link";
import { getProjectBySlug } from "@/content/projects";

const spectrumProject = getProjectBySlug("global-rf-spectrum-dashboard");

export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="site-frame home-hero__grid">
        <div className="home-hero__main">
          <p className="eyebrow">Engineering portfolio</p>
          <h1 className="home-hero__title" id="home-title">
            Engineering systems for spectrum, compliance, and product decisions.
          </h1>
          <p className="home-hero__description">
            I design structured tools that turn technical context, rule logic,
            and engineering constraints into decisions that are easier to
            inspect and review.
          </p>
          <div className="home-hero__links" aria-label="Portfolio paths">
            <TextLink href="/projects">View selected projects</TextLink>
            <TextLink href="/about">Read the working approach</TextLink>
          </div>
        </div>
        {spectrumProject ? (
          <ProjectVisual project={spectrumProject} variant="overview" />
        ) : null}
      </div>
    </section>
  );
}
