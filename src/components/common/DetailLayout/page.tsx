"use client";

import React from "react";
import Link from "next/link";
import styles from "./page.module.scss";
import Button from "../buttons/page";

interface DetailLayoutProps {
  pageTitle: string;
  title: string;
  date: string;
  backLink: string;
  editLink?: string;
  children: React.ReactNode;
  isAdmin: boolean;
  isAuthor?: boolean;
  onDelete?: () => void;
}

export default function DetailLayout({
  isAdmin,
  isAuthor = false,
  pageTitle,
  title,
  date,
  backLink,
  editLink,
  children,
  onDelete,
}: DetailLayoutProps) {
  return (
    <section className={styles.inner}>
      <header className={styles.header}>
        <h1>{pageTitle}</h1>
      </header>

      <article className={styles.noticeContent}>
        <div className={styles.contentTitle}>
          <div className={styles.titleFlex}>
            <strong>{title}</strong>

            <p className={styles.date}>{date}</p>

            <div className={styles.adminBtns}>
              {isAuthor && editLink && (
                <Button variant="edit" href={editLink}>
                  수정
                </Button>
              )}

              {(isAuthor || isAdmin) && onDelete && (
                <Button variant="delete" onClick={onDelete}>
                  삭제
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.content}>{children}</div>
      </article>

      <div className={styles.back}>
        <Link href={backLink}>목록으로</Link>
      </div>
    </section>
  );
}
