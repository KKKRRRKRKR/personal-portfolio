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
            Selected work and technical notes
          </p>
        </div>
      </footer>
    </div>
  );
}
