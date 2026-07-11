type PageIntroProps = {
  eyebrow?: string;
  title: string;
};

export function PageIntro({ eyebrow, title }: PageIntroProps) {
  return (
    <section className="page-intro" aria-labelledby="page-title">
      {eyebrow ? <p className="page-intro__eyebrow">{eyebrow}</p> : null}
      <h1 id="page-title">{title}</h1>
    </section>
  );
}
