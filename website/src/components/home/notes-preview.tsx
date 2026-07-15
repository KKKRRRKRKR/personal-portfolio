import { TextLink } from "@/components/ui/text-link";

export function NotesPreview() {
  return (
    <section
      className="home-section home-notes"
      aria-labelledby="technical-notes-title"
    >
      <div className="site-frame">
        <div className="notes-row">
          <div>
            <p className="eyebrow">Technical notes</p>
            <h2 className="home-section__title" id="technical-notes-title">
              Notes in development
            </h2>
          </div>
          <div className="notes-row__content">
            <p>
              Working notes on system architecture, regulatory logic,
              implementation decisions, and technical visualization.
            </p>
            <TextLink href="/technical-notes">Explore technical notes</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
