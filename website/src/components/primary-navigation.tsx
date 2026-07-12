"use client";

import Link from "next/link";
import type { KeyboardEvent } from "react";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/technical-notes", label: "Technical Notes" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function PrimaryNavigation() {
  const pathname = usePathname();
  const normalizedPathname =
    pathname === "/" ? pathname : pathname.replace(/\/$/, "");

  const linkCurrentState = (href: string) =>
    normalizedPathname === href ||
    (href !== "/" && normalizedPathname.startsWith(`${href}/`))
      ? "page"
      : undefined;

  const navigationLinks = navigationItems.map((item) => (
    <li key={item.href}>
      <Link href={item.href} aria-current={linkCurrentState(item.href)}>
        {item.label}
      </Link>
    </li>
  ));

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDetailsElement>) => {
    if (event.key !== "Escape") {
      return;
    }

    event.preventDefault();
    event.currentTarget.open = false;
    event.currentTarget.querySelector<HTMLElement>("summary")?.focus();
  };

  return (
    <nav className="primary-nav" aria-label="Primary navigation">
      <ul className="primary-nav__desktop">{navigationLinks}</ul>
      <details className="primary-nav__mobile" onKeyDown={handleMenuKeyDown}>
        <summary>Menu</summary>
        <ul>{navigationLinks}</ul>
      </details>
    </nav>
  );
}
