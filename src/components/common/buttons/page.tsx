import React from "react";
import styles from "./page.module.scss";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "edit" | "delete" | "list";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  href,
  onClick,
  children,
  className,
}: ButtonProps) {
  const combinedClass = `${styles.btn} ${styles[variant]} ${className || ""}`;

  if (href) {
    return (
      <Link href={href} className={combinedClass}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={combinedClass}>
      {children}
    </button>
  );
}
