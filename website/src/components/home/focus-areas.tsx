const workingApproach = [
  {
    description:
      "Start with the product, market, and engineering constraints that actually shape the decision.",
    label: "01",
    title: "Establish the context",
  },
  {
    description:
      "Turn distributed inputs, rules, and assumptions into a model that can be inspected and maintained.",
    label: "02",
    title: "Structure the logic",
  },
  {
    description:
      "Make the path from input to outcome visible, so automation supports review instead of obscuring judgment.",
    label: "03",
    title: "Keep review in view",
  },
];

export function FocusAreas() {
  return (
    <section
      className="home-section home-focus"
      aria-labelledby="working-approach-title"
    >
      <div className="site-frame">
        <div className="home-section__header">
          <div>
            <p className="eyebrow">Working approach</p>
            <h2 className="home-section__title" id="working-approach-title">
              Complex systems need a clear trail.
            </h2>
          </div>
        </div>
        <div className="home-focus__grid">
          {workingApproach.map((area) => (
            <article className="focus-area" key={area.title}>
              <p className="focus-area__label">{area.label}</p>
              <h3 className="focus-area__title">{area.title}</h3>
              <p className="focus-area__description">{area.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
