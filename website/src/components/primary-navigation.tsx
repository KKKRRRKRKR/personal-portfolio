"use client";

import Link from "next/link";
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

  return (
    <nav className="primary-nav" aria-label="Primary navigation">
      <ul>
        {navigationItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={
                normalizedPathname === item.href ? "page" : undefined
              }
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
