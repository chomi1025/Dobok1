"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import styles from "../[id]/page.module.scss";

export default function EstimateActionButtons({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/estimate/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast(data.message || "삭제 실패");
        return;
      }

      toast("삭제되었습니다.");
      router.push("/estimate");
      router.refresh();
    } catch (err) {
      toast("삭제 중 오류 발생");
    }
  };

  return (
    <button onClick={handleDelete} className={styles.deleteButton}>
      삭제
    </button>
  );
}
