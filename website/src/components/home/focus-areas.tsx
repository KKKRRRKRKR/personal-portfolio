const focusAreas = [
  {
    description:
      "Purpose-built interfaces and utilities for structured technical work.",
    label: "Focus area / 01",
    title: "Engineering Tools",
  },
  {
    description:
      "Traceable workflows that connect product inputs, decision logic, and review outputs.",
    label: "Focus area / 02",
    title: "Compliance Systems",
  },
  {
    description:
      "Clear visual models for complex regional, regulatory, or engineering data.",
    label: "Focus area / 03",
    title: "Technical Visualization",
  },
];

export function FocusAreas() {
  return (
    <section
      className="home-section home-focus"
      aria-labelledby="focus-areas-title"
    >
      <div className="site-frame">
        <div className="home-section__header">
          <div>
            <p className="eyebrow">Areas of focus</p>
            <h2 className="home-section__title" id="focus-areas-title">
              Technical practice
            </h2>
          </div>
        </div>
        <div className="home-focus__grid">
          {focusAreas.map((area) => (
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
