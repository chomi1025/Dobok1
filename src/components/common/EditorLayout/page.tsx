"use client";

import React, { useRef, useState } from "react";
import styles from "./page.module.scss";

interface EditorLayoutProps {
  pageTitle: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
  children: React.ReactNode;
  isSubmitting?: boolean;
}

export default function EditorLayout({
  pageTitle,
  onSubmit,
  children,
  isSubmitting = false,
}: EditorLayoutProps) {
  const [isPending, setIsPending] = useState(false);
  const isLocked = useRef(false);

  const handleSafeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLocked.current) return;

    try {
      isLocked.current = true;
      setIsPending(true);

      await onSubmit(e);
    } catch (error) {
      isLocked.current = false;
      setIsPending(false);
    } finally {
      isLocked.current = false;
      setIsPending(false);
    }
  };

  return (
    <section className={styles.noticeWrapper}>
      <header className={styles.noticeHeader}>
        <h1>{pageTitle}</h1>
        <hr />
      </header>

      <form onSubmit={handleSafeSubmit} className={styles.editorForm}>
        <article className={styles.formContent}>{children}</article>

        <footer className={styles.buttonArea}>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={() => window.history.back()}
            disabled={isSubmitting}
          >
            취소
          </button>
          <button
            type="submit"
            className={styles.btnSubmit}
            disabled={isSubmitting}
          >
            등록
          </button>
        </footer>
      </form>
    </section>
  );
}
