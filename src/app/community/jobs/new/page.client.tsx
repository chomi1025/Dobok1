"use client";
import { useSearchParams } from "next/navigation";
import HiringLayout from "../../components/hiringLayout";
import SeekingLayout from "../../components/seekingLayout";

export default function JobsNewClientPage() {
  const searchParams = useSearchParams();
  const jobType = searchParams.get("type")?.toUpperCase() || "HIRING";

  return (
    <div>{jobType === "HIRING" ? <HiringLayout /> : <SeekingLayout />}</div>
  );
}
