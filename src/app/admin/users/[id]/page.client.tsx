"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import Button from "@/components/common/buttons/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { customConfirm } from "@/lib/swal";

type TabType = "orders" | "posts" | "comments";

export default function UserDetailClientPage({ user }: { user: any }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("orders");

  const handleStatusChange = async (targetStatus: "BANNED" | "ACTIVE") => {
    const result = await customConfirm({
      title: targetStatus === "BANNED" ? "계정 정지" : "정지 해제",
      text:
        targetStatus === "BANNED"
          ? "이 계정을 정지하시겠습니까? \n정지 시 서비스 이용이 제한됩니다."
          : "이 계정의 정지를 해제하시겠습니까?",
      confirmText: targetStatus === "BANNED" ? "정지하기" : "해제하기",
      cancelText: "닫기",
      isDanger: targetStatus === "BANNED",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/admin/users/${user.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: targetStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        router.refresh();
      } else {
        toast.error(data.message || "변경 실패");
      }
    } catch (error) {
      toast.error("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>회원 상세 정보</h1>
        <div className={styles.actions}>
          <Button variant="edit">정보 수정</Button>
          <Button
            variant="delete"
            onClick={() =>
              handleStatusChange(user.status === "BANNED" ? "ACTIVE" : "BANNED")
            }
          >
            {user.status === "BANNED" ? "정지 해제" : "계정 정지"}
          </Button>
        </div>
      </header>

      {/* 1. 프로필 섹션 (상단 카드) */}
      <section className={styles.profileCard}>
        <div className={styles.grid}>
          <div className={styles.item}>
            <label>아이디 / 로그인</label>
            <span>{user.email || user.username}</span>
          </div>
          <div className={styles.item}>
            <label>회원명 / 닉네임</label>
            <span>
              {user.name} / {user.nickname || "-"}
            </span>
          </div>
          <div className={styles.item}>
            <label>전화번호</label>
            <span>{user.phone || "미등록"}</span>
          </div>
          <div className={styles.item}>
            <label>상태</label>
            <span className={styles.statusTag} data-status={user.status}>
              {user.status}
            </span>
          </div>
          <div className={styles.item}>
            <label>가입 일시</label>
            <span>{new Date(user.createdAt).toLocaleString()}</span>
          </div>
        </div>
      </section>

      {/* 2. 활동 내역 탭 섹션 */}
      <section className={styles.activitySection}>
        <ul className={styles.tabMenu}>
          <li
            className={activeTab === "orders" ? styles.active : ""}
            onClick={() => setActiveTab("orders")}
          >
            주문 내역 <em>{user._count.orders}</em>
          </li>
          <li
            className={activeTab === "posts" ? styles.active : ""}
            onClick={() => setActiveTab("posts")}
          >
            작성 게시글 <em>{user._count.posts}</em>
          </li>
          <li
            className={activeTab === "comments" ? styles.active : ""}
            onClick={() => setActiveTab("comments")}
          >
            작성 댓글 <em>{user._count.comments}</em>
          </li>
        </ul>

        <div className={styles.tabContent}>
          {activeTab === "orders" && (
            <div className={styles.tablePlaceholder}>
              {/* 여기에 UnifiedTable 또는 주문 리스트 컴포넌트 삽입 */}
              <p>최근 주문 내역이 표시됩니다.</p>
            </div>
          )}
          {activeTab === "posts" && (
            <p>해당 유저가 작성한 전체 게시글 목록입니다.</p>
          )}
          {activeTab === "comments" && <p>해당 유저가 남긴 댓글 목록입니다.</p>}
        </div>
      </section>
    </div>
  );
}
