import React from "react";
import styles from "./page.module.scss";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "edit" | "delete" | "list" | "black";
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  href,
  children,
  className,
  ...rest
}: ButtonProps) {
  const combinedClass = `${styles.btn} ${styles[variant]} ${className || ""}`;

  if (href) {
    return (
      <Link href={href} className={combinedClass} prefetch={false}>
        {children}
      </Link>
    );
  }
  return (
    <button className={combinedClass} {...rest}>
      {children}
    </button>
  );
}
