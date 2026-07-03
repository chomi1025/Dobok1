"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/common/buttons/page";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("삭제하시겠습니까?")) return;

    const res = await fetch(`/api/inquiry/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.message);
      return;
    }

    router.push("/mypage/inquiry");
    router.refresh();
  };

  return (
    <Button variant="delete" onClick={handleDelete}>
      삭제
    </Button>
  );
}
