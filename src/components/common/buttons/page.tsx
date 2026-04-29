import React from "react";
import styles from "./page.module.scss";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "edit" | "delete" | "list" | "black" | "outline";
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  isPending?: boolean;
}

export default function Button({
  variant = "primary",
  href,
  onClick,
  children,
  className,
  type = "button",
  isPending = false,
  ...rest
}: ButtonProps) {
  const combinedClass = `${styles.btn} ${styles[variant]} ${className || ""}`;

  if (href) {
    return (
      <Link
        href={isPending ? "#" : href}
        className={combinedClass}
        prefetch={false}
        onClick={onClick as any}
      >
        {isPending && <span className={styles.spinner}></span>}
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={combinedClass}
      onClick={onClick}
      disabled={isPending || rest.disabled}
      {...rest}
    >
      {isPending && <span className={styles.spinner}></span>}
      {children}
    </button>
  );
}
