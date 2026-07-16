import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";
import { createPageMetadata } from "@/content/metadata";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "The current public contact-channel status for XG's engineering portfolio; private destinations remain unpublished.",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        description="Public professional contact destinations have not yet been approved. This page records the current availability without exposing private details."
        eyebrow="Contact"
        title="Contact"
      />
      <section
        className="contact-section"
        aria-labelledby="contact-methods-title"
      >
        <div className="container--reading">
          <h2 className="contact-section__title" id="contact-methods-title">
            Public contact methods
          </h2>
          <p>
            These channels remain intentionally noninteractive until a public
            destination is approved.
          </p>
          <dl className="contact-methods">
            <div>
              <dt>Email</dt>
              <dd>
                {siteConfig.contact.email ? (
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd>
                {siteConfig.contact.linkedInUrl ? (
                  <a href={siteConfig.contact.linkedInUrl}>LinkedIn</a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                {siteConfig.contact.githubUrl ? (
                  <a href={siteConfig.contact.githubUrl}>GitHub</a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
