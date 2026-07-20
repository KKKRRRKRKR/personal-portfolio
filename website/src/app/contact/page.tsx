import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";
import { createPageMetadata } from "@/content/metadata";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact XG about spectrum, compliance, and engineering-tool work by email or through the approved GitHub profile.",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        description="For professional inquiries about spectrum, compliance, and engineering tools, use one of the public destinations below."
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
            Email is the direct channel for inquiries. GitHub provides the
            public profile for repository and project context.
          </p>
          <dl className="contact-methods">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={siteConfig.contact.emailUrl}>
                  {siteConfig.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a
                  aria-label="GitHub profile for XG (opens in a new tab)"
                  href={siteConfig.contact.githubUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  github.com/KKKRRRKRKR
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
