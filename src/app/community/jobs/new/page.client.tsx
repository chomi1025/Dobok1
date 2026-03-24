"use client";
import { useSearchParams } from "next/navigation";
import HiringLayout from "../../components/hiringLayout";
import SeekingLayout from "../../components/seekingLayout";
import styles from "./page.module.scss";

export default function JobsNewClientPage() {
  const searchParams = useSearchParams();
  const jobType = searchParams.get("type")?.toUpperCase() || "HIRING";

  return (
    <div className={styles.inner}>
      {jobType === "HIRING" ? <HiringLayout /> : <SeekingLayout />}
    </div>
  );
}
