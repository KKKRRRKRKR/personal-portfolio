import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "site" | "reading";
};

export function Container({
  className,
  size = "site",
  ...props
}: ContainerProps) {
  const classes = [`container--${size}`, className].filter(Boolean).join(" ");

  return <div className={classes} {...props} />;
}
