import Link from "next/link";
import type { ReactNode } from "react";

type TextLinkProps = {
  children: ReactNode;
  href: string;
};

export function TextLink({ children, href }: TextLinkProps) {
  return (
    <Link className="text-link" href={href}>
      {children}
    </Link>
  );
}
