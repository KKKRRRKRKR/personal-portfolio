import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Public contact options for XG's engineering systems portfolio.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        description="For conversations about engineering systems, compliance workflows, spectrum review, or making technical decisions easier to inspect."
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
