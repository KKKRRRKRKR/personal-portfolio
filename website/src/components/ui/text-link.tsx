import Link from "next/link";
import type { ReactNode } from "react";

type TextLinkProps = {
  ariaLabel?: string;
  children: ReactNode;
  external?: boolean;
  href: string;
  openInNewTab?: boolean;
};

export function TextLink({
  ariaLabel,
  children,
  external = false,
  href,
  openInNewTab = false,
}: TextLinkProps) {
  if (external) {
    return (
      <a
        aria-label={ariaLabel}
        className="text-link"
        href={href}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        target={openInNewTab ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link aria-label={ariaLabel} className="text-link" href={href}>
      {children}
    </Link>
  );
}
