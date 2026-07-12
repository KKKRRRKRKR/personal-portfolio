import { TextLink } from "@/components/ui/text-link";

const projects = [
  {
    description:
      "An interactive, map-first interface for reviewing wireless spectrum and power information across global markets.",
    label: "Selected project / 01",
    metadata: ["Data visualization", "RF spectrum", "Interactive dashboard"],
    title: "Global RF Spectrum Dashboard",
  },
  {
    description:
      "A structured decision system that converts product inputs and rule logic into a reviewable draft compliance plan.",
    label: "Selected project / 02",
    metadata: ["Decision system", "Compliance workflow", "Rule-based planning"],
    title: "Compliance Plan Generator",
  },
];

export function FeaturedWork() {
  return (
    <section
      className="home-section home-work"
      aria-labelledby="selected-work-title"
    >
      <div className="site-frame">
        <div className="home-section__header">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="home-section__title" id="selected-work-title">
              Project records
            </h2>
          </div>
          <TextLink href="/projects">Browse all projects</TextLink>
        </div>
        <div className="home-work__grid">
          {projects.map((project) => (
            <article className="project-record" key={project.title}>
              <p className="project-record__label">{project.label}</p>
              <h3 className="project-record__title">{project.title}</h3>
              <p className="project-record__description">
                {project.description}
              </p>
              <ul
                className="metadata-list"
                aria-label={`${project.title} topics`}
              >
                {project.metadata.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="project-record__status">
                Case study in preparation
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
