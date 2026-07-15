import type { ProjectEvidenceFigure } from "@/content/projects";

type ProjectEvidenceFiguresProps = {
  figures: readonly ProjectEvidenceFigure[];
};

export function ProjectEvidenceFigures({
  figures,
}: ProjectEvidenceFiguresProps) {
  return (
    <div className="project-evidence-figures">
      {figures.map((figure) => (
        <figure className="project-evidence-figure" key={figure.src}>
          <div className="project-evidence-figure__canvas">
            {/* Evidence sources are reviewed local assets managed by project content. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={figure.alt}
              decoding="async"
              height={figure.height}
              loading="lazy"
              src={figure.src}
              width={figure.width}
            />
          </div>
          {figure.caption || figure.disclosure ? (
            <figcaption>
              {figure.caption ? <span>{figure.caption}</span> : null}
              {figure.disclosure ? <p>{figure.disclosure}</p> : null}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
