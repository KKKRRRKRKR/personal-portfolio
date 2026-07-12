"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function PrimaryNavigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const normalizedPathname =
    pathname === "/" ? pathname : pathname.replace(/\/$/, "");

  const linkCurrentState = (href: string) =>
    normalizedPathname === href ||
    (href !== "/" && normalizedPathname.startsWith(`${href}/`))
      ? "page"
      : undefined;

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const navigationLinks = navigationItems.map((item) => (
    <li key={item.href}>
      <Link
        href={item.href}
        aria-current={linkCurrentState(item.href)}
        onClick={() => setIsMenuOpen(false)}
      >
        {item.label}
      </Link>
    </li>
  ));

  return (
    <nav className="primary-nav" aria-label="Primary navigation">
      <ul className="primary-nav__desktop">{navigationLinks}</ul>
      <div className="primary-nav__mobile">
        <button
          ref={menuButtonRef}
          type="button"
          aria-controls="mobile-navigation-list"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          Menu
        </button>
        {isMenuOpen ? (
          <ul id="mobile-navigation-list">{navigationLinks}</ul>
        ) : null}
      </div>
    </nav>
  );
}
