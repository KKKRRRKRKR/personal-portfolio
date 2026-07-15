import { ProjectVisual } from "@/components/projects/project-visual";
import { TextLink } from "@/components/ui/text-link";
import { featuredProjects } from "@/content/projects";

const primaryFeaturedProject = featuredProjects[0];

export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="site-frame home-hero__grid">
        <div className="home-hero__main">
          <p className="eyebrow">XG</p>
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
        {primaryFeaturedProject ? (
          <ProjectVisual project={primaryFeaturedProject} variant="overview" />
        ) : null}
      </div>
    </section>
  );
}
