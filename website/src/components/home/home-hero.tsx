import { TextLink } from "@/components/ui/text-link";

const portfolioScope = [
  "Engineering systems",
  "Compliance workflows",
  "Technical visualization",
];

export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="site-frame home-hero__grid">
        <div className="home-hero__main">
          <p className="eyebrow">Engineering Portfolio</p>
          <h1 className="home-hero__title" id="home-title">
            Structured tools for complex technical work.
          </h1>
          <p className="home-hero__description">
            Selected work in engineering systems, compliance workflows, and
            technical visualization.
          </p>
          <div className="home-hero__links" aria-label="Portfolio paths">
            <TextLink href="/projects">View selected projects</TextLink>
            <TextLink href="/about">Read the working approach</TextLink>
          </div>
        </div>
        <aside className="home-hero__register" aria-labelledby="scope-title">
          <p className="home-hero__register-label" id="scope-title">
            Portfolio scope
          </p>
          <ul>
            {portfolioScope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
