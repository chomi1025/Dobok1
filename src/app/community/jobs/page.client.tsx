"use client";
import { Table } from "@/components/Table/page";
import Link from "next/link";
import styles from "./page.module.scss";
import PagenationComponent from "@/components/pagenation/page";
import CategoryTabs from "@/components/CategoryTabs/page";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/common/buttons/page";
import { EXPERIENCE_MAP, JOB_ROLE_MAP } from "@/constants/jobs";
import { CITY_OPTIONS } from "@/constants/regions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface JobsRow {
  id: number;
  jobRole: string;
  title: string;
  companyName: string;
  experience: string;
  city: string;
  district: string;
  createdAt: Date;
}

interface Props {
  jobs: JobsRow[];
  total: number;
  pageSize: number;
  currentPage: number;
  initialType: "HIRING" | "SEEKING";
}

const categories = [
  { id: "HIRING", name: "구인" },
  { id: "SEEKING", name: "구직" },
];

export default function JobsClientPage({
  jobs,
  total,
  pageSize,
  currentPage,
  initialType,
}: Props) {
  const { data: session, status } = useSession();

  const isMember =
    session?.user &&
    (session.user.role === "ADMIN" || session.user.role === "USER");

  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(initialType);

  useEffect(() => {
    const typeFromUrl = searchParams.get("type")?.toUpperCase();
    if (
      typeFromUrl &&
      (typeFromUrl === "HIRING" || typeFromUrl === "SEEKING")
    ) {
      setActiveTab(typeFromUrl as "HIRING" | "SEEKING");
    }
  }, [searchParams]);

  const handleTabChange = (id: number | string) => {
    const nextType = id.toString().toLowerCase();

    setActiveTab(id.toString().toUpperCase() as any);

    router.push(`/community/jobs?type=${nextType}&page=1`);
  };

  const currentJobs = jobs;

  const getColumns = () => {
    const commonStart = [
      {
        key: "jobRole",
        label: "직무",
        flex: 0.6,
        render: (row: JobsRow) => <span>{JOB_ROLE_MAP[row.jobRole]}</span>,
      },
      {
        key: "title",
        label: "제목",
        flex: 2,
        render: (row: JobsRow) => (
          <Link href={`/community/jobs/${row.id}`} className={styles.title}>
            <span className={styles.titleText}>{row.title}</span>
          </Link>
        ),
      },
    ];

    const commonEnd = [
      {
        key: "location",
        label: "지역",
        flex: 0.6,
        render: (row: JobsRow) => {
          const cityLabel =
            CITY_OPTIONS.find((opt) => opt.value === row.city)?.label ||
            row.city;
          return (
            <span>
              {cityLabel} {row.district}
            </span>
          );
        },
      },
      {
        key: "date",
        label: "등록일",
        flex: 0.6,
        render: (row: JobsRow) => (
          <span>{new Date(row.createdAt).toLocaleDateString()}</span>
        ),
      },
    ];

    if (activeTab === "HIRING") {
      return [
        ...commonStart,
        {
          key: "companyName",
          label: "회사명",
          flex: 0.8,
          render: (row: JobsRow) => <span>{row.companyName}</span>,
        },
        ...commonEnd,
      ];
    }

    return [
      ...commonStart,
      {
        key: "experience",
        label: "경력",
        flex: 0.6,
        render: (row: JobsRow) => <span>{EXPERIENCE_MAP[row.experience]}</span>,
      },
      ...commonEnd,
    ];
  };

  const handleWriteClick = (e: React.MouseEvent) => {
    if (status === "loading") {
      e.preventDefault();
      return;
    }

    // 비로그인상태면
    if (!session) {
      e.preventDefault();
      e.stopPropagation();
      toast.error("로그인이 필요한 서비스입니다.");
      return;
    }
  };

  return (
    <div className={styles.inner}>
      <section>
        <h1>구인·구직게시판</h1>
        <p>채용 정보와 지원 정보를 한눈에 확인하세요</p>
      </section>

      <CategoryTabs
        categories={categories}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        showAll={false}
      />

      <section className={styles.tableWrapper}>
        <Button
          onClick={handleWriteClick}
          href={`/community/jobs/new?type=${activeTab.toLowerCase()}`}
        >
          작성하기
        </Button>

        <Table columns={getColumns()} data={currentJobs} />
      </section>

      <PagenationComponent
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
}
