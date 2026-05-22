"use client";

import { useEffect, useState } from "react";
import styles from "./Header.module.scss";

export default function HeaderScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={scrolled ? styles.mobileScrolled : styles.mobileTransparent}
    >
      {children}
    </div>
  );
}
