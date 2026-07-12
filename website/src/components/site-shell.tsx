import Link from "next/link";
import type { ReactNode } from "react";

import { PrimaryNavigation } from "@/components/primary-navigation";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-frame site-header__content">
          <Link className="site-brand" href="/" aria-label="XG home">
            XG
          </Link>
          <PrimaryNavigation />
        </div>
      </header>
      <main className="site-main" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="site-frame site-footer__content">
          <p>XG — engineering portfolio</p>
          <p className="site-footer__label">
            Engineering systems and selected work
          </p>
          <nav
            className="site-footer__navigation"
            aria-label="Footer navigation"
          >
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
