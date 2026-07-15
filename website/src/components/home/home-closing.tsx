import { TextLink } from "@/components/ui/text-link";

export function HomeClosing() {
  return (
    <section className="home-closing" aria-labelledby="continue-title">
      <div className="site-frame home-closing__content">
        <div>
          <p className="eyebrow">Continue through the portfolio</p>
          <h2 className="home-section__title" id="continue-title">
            Explore the work in more detail.
          </h2>
        </div>
        <nav aria-label="Continue through the portfolio">
          <ul className="home-closing__links">
            <li>
              <TextLink href="/projects">Projects</TextLink>
            </li>
            <li>
              <TextLink href="/about">About</TextLink>
            </li>
            <li>
              <TextLink href="/contact">Contact</TextLink>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
