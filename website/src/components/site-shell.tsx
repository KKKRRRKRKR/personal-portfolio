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
        <div className="site-header__content">
          <Link className="site-brand" href="/">
            PERSONAL PORTFOLIO
          </Link>
          <PrimaryNavigation />
        </div>
      </header>
      <main className="site-main" id="main-content">
        {children}
      </main>
      <footer className="site-footer">
        <div className="site-footer__content">
          <p>Personal engineering portfolio</p>
        </div>
      </footer>
    </div>
  );
}
