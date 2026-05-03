"use client";

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
import { UnifiedTable } from "@/components/common/DataTable";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  CellContext,
} from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface JobsRow {
  id: number;
  type: "HIRING" | "SEEKING";
  jobRole: string;
  title: string;
  companyName: string;
  authorNickname?: string;
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
  initialType: "HIRING" | "SEEKING" | "ALL";
}

const categories = [
  { id: "ALL", name: "전체" },
  { id: "HIRING", name: "구인" },
  { id: "SEEKING", name: "구직" },
];

export default function JobsClientPage({
  pageSize,
  currentPage,
  initialType,
}: Omit<Props, "jobs" | "total">) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(initialType);

  const { data } = useQuery({
    queryKey: ["jobs", activeTab, currentPage],
    queryFn: async () => {
      const typeParam =
        activeTab === "ALL" ? "" : `&type=${activeTab.toLowerCase()}`;
      const res = await fetch(
        `/api/community/jobs?page=${currentPage}${typeParam}`,
      );
      if (!res.ok) throw new Error("데이터 로드 실패");
      return res.json();
    },
    staleTime: 60 * 1000,
  });

  console.log(data);
  const jobs = data?.jobs || [];
  const total = data?.total || 0;

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

  const getColumns = (): ColumnDef<JobsRow, any>[] => {
    const commonStart = [
      {
        id: "type",
        header: "구분",
        size: 80,
        cell: ({ row }: CellContext<JobsRow, any>) => {
          const data = row.original;
          const isHiring = data.type === "HIRING";

          return (
            <span
              className={isHiring ? styles.hiringBadge : styles.seekingBadge}
            >
              {isHiring ? "구인" : "구직"}
            </span>
          );
        },
      },
      {
        accessorKey: "jobRole",
        header: "직무",
        size: 90,
        cell: ({ row }: CellContext<JobsRow, any>) => {
          const role = row.original.jobRole;
          return (
            <span className={styles.roleBadge}>
              {role ? JOB_ROLE_MAP[role] : "-"}
            </span>
          );
        },
      },
      {
        accessorKey: "title",
        header: "제목",
        size: 388,
        cell: ({ row }: CellContext<JobsRow, any>) => {
          const data = row.original;
          return (
            <Link href={`/community/jobs/${data.id}`} className={styles.title}>
              <span className={styles.titleText}>{data.title}</span>

              <span className={styles.experienceTag}>
                {EXPERIENCE_MAP[data.experience]}
              </span>
            </Link>
          );
        },
      },
    ];

    const middleColumn = {
      id: "author",
      header: "작성자",
      size: 130,
      cell: ({ row }: CellContext<JobsRow, any>) => {
        const data = row.original;
        console.log("데이터", data);
        return (
          <span>
            {data.type === "HIRING"
              ? data.companyName
              : data.authorNickname || "개인"}
          </span>
        );
      },
    };

    const commonEnd = [
      {
        id: "location",
        header: "지역",
        size: 110,
        cell: ({ row }: any) => {
          const data = row.original;
          const cityLabel =
            CITY_OPTIONS.find((opt) => opt.value === data.city)?.label ||
            data.city;
          return (
            <span>
              {cityLabel} {data.district}
            </span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "등록일",
        size: 110,
        cell: ({ row }: any) => {
          const date = new Date(row.original.createdAt);
          return <span>{format(date, "yy.MM.dd")}</span>;
        },
      },
    ];

    return [...commonStart, middleColumn, ...commonEnd];
  };

  const columns = getColumns();

  const table = useReactTable({
    data: jobs,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  const handleWriteClick = (e: React.MouseEvent) => {
    if (status === "loading") {
      e.preventDefault();
      return;
    }

    // 비로그인상태
    if (!session) {
      e.preventDefault();
      e.stopPropagation();
      toast.error("로그인이 필요한 서비스입니다.");
      return;
    }
  };

  return (
    <div className={styles.inner}>
      <header>
        <h1>구인·구직게시판</h1>
        <p>채용 정보와 지원 정보를 한눈에 확인하세요</p>
      </header>

      <CategoryTabs
        categories={categories}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        showAll={false}
      />

      <section className={styles.tableWrapper}>
        <div className={styles.buttonGroup}>
          <Button
            onClick={handleWriteClick}
            href="/community/jobs/new?type=hiring"
            className={styles.hiringWriteBtn}
          >
            구인 작성
          </Button>

          <Button
            onClick={handleWriteClick}
            href="/community/jobs/new?type=seeking"
            className={styles.seekingWriteBtn}
          >
            구직 작성
          </Button>
        </div>

        <UnifiedTable table={table} className={styles.noticeTable} />
      </section>

      <PagenationComponent
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
}
