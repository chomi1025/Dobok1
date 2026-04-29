"use client";

import { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import styles from "./hiring.module.scss";
import Button from "@/components/common/buttons/page";
import { useRouter } from "next/navigation";
import { CITY_OPTIONS, DISTRICTS } from "@/constants/regions";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Editor from "@/components/common/editor/page";
import { Post } from "@prisma/client";

interface Props {
  post?: Post;
}

export default function SeekingLayout({ post }: Props) {
  const isEdit = !!post;
  const router = useRouter();
  const queryClient = useQueryClient();
  const isSubmitting = useRef(false); // 광클 막기

  const [city, setCity] = useState(post?.city || "");
  const [district, setDistrict] = useState(post?.district || "");
  const [jobRole, setJobRole] = useState(post?.jobRole || "TAEKWONDO");
  const [customJobRole, setCustomJobRole] = useState(post?.jobRole || "");
  const [content, setContent] = useState(post?.content || "");

  const PREDEFINED_ROLES = [
    "MASTER",
    "JUDO",
    "HAPKIDO",
    "KENDO",
    "JUMPROPE",
    "GYM",
    "SWIMMING",
    "TAEKWONDO",
  ];
  const isOthers = !PREDEFINED_ROLES.includes(jobRole) || jobRole === "OTHERS";

  useEffect(() => {
    if (isEdit && isOthers && post) {
      setJobRole("OTHERS");

      setCustomJobRole(post.jobRole || "");
    }
  }, [isEdit, isOthers, post]);

  const { mutate: submitSeeking, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const url = isEdit ? `/api/community/jobs/${post.id}` : "/api/seeking";
      const method = isEdit ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "처리에 실패했습니다.");
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast.success(
        isEdit ? "이력서가 수정되었습니다!" : "이력서가 등록되었습니다!",
      );
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      router.push(`/community/jobs/${isEdit ? post.id : ""}`);
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message);
      isSubmitting.current = false;
    },
  });

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    setDistrict("");
  };

  const handleJobRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJobRole(e.target.value);
    if (e.target.value !== "OTHERS") setCustomJobRole("");
  };

  // 취소버튼
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      confirm("작성 중인 내용이 저장되지 않을 수 있습니다. 취소하시겠습니까?")
    ) {
      router.back();
    }
  };

  // 등록버튼
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting.current) return;

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;

    if (!title?.trim()) return toast.error("제목을 입력해주세요!");
    if (!city || !district) return toast.error("희망 지역을 선택해주세요!");
    if (isOthers && !customJobRole)
      return toast.error("직접 입력할 종목명을 작성해주세요!");
    if (content.replace(/<[^>]*>?/gm, "").trim() === "")
      return toast.error("소개 내용을 작성해 주세요!");

    isSubmitting.current = true;

    const applyMethods = ["MESSAGE"];
    if (formData.get("showPhone")) applyMethods.push("PHONE");
    if (formData.get("showEmail")) applyMethods.push("EMAIL");

    const payload = {
      title,
      city,
      district,
      jobRole: isOthers ? customJobRole : jobRole,
      experience: formData.get("experience"),
      content: content,
      applyMethod: applyMethods.join(","),
    };

    submitSeeking(payload);
  };

  return (
    <div className={styles.inner}>
      <header className={styles.header}>
        <h1>{isEdit ? "구직 이력서 수정" : "구직 글쓰기"}</h1>
      </header>

      <form className={styles.form} onSubmit={onSubmit}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>기본 정보</legend>

          <div className={styles.field}>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={post?.title || ""}
              placeholder="제목을 입력해주세요."
            />
          </div>

          <div className={styles.companyWrapper}>
            <div className={styles.field}>
              <label htmlFor="city">지역</label>
              <select name="city" value={city} onChange={handleCityChange}>
                <option value="" disabled hidden>
                  지역 선택
                </option>
                {CITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <select
                name="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!city}
              >
                <option value="" disabled hidden>
                  상세 지역 선택
                </option>
                {city &&
                  DISTRICTS[city].map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="experience">경력</label>
              <select
                id="experience"
                name="experience"
                defaultValue={post?.experience || "NEWBIE"}
              >
                <option value="NEWBIE">신입(1년 미만 ~ 2년)</option>
                <option value="JUNIOR">주니어(3~4년)</option>
                <option value="MID_LEVEL">중급(5~6년)</option>
                <option value="SENIOR">7년 이상</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>지원 자격 및 직무</legend>
          <div className={styles.jobRow}>
            <div className={styles.field}>
              <label htmlFor="jobRole">종목</label>
              <select
                id="jobRole"
                name="jobRole"
                value={jobRole}
                onChange={handleJobRoleChange}
              >
                <option value="TAEKWONDO">태권도</option>
                <option value="JUDO">유도</option>
                <option value="HAPKIDO">합기도</option>
                <option value="KENDO">검도</option>
                <option value="JUMPROPE">줄넘기</option>
                <option value="GYM">헬스/PT</option>
                <option value="SWIMMING">수영</option>
                <option value="OTHERS">기타 (직접 입력)</option>
              </select>
            </div>

            {isOthers && (
              <div className={styles.field}>
                <label htmlFor="customJobRole">기타 종목</label>
                <input
                  type="text"
                  name="customJobRole"
                  value={customJobRole}
                  onChange={(e) => setCustomJobRole(e.target.value)}
                  autoFocus
                />
              </div>
            )}
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>모집내용 및 지원방법</legend>

          <div className={styles.editorField}>
            <label>
              자기소개 및 희망 근무조건
              <span>
                보유 단수, 지도 가능 종목은 물론
                <strong>출퇴근 가능한 지역 범위</strong>를 자세히 적을수록 딱
                맞는 도장과 연결될 확률이 높아집니다!
              </span>
            </label>

            <Editor value={content} onChange={setContent} />
          </div>

          <div className={styles.contactField}>
            <label>
              연락처 노출 설정
              <span>(회원정보에 등록된 정보가 노출됩니다)</span>
            </label>
            <div className={styles.contactOptions}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="showPhone"
                  defaultChecked={
                    isEdit ? (post?.applyMethod || "").includes("PHONE") : true
                  }
                />
                휴대폰 번호 노출
              </label>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="showEmail"
                  defaultChecked={
                    isEdit ? (post?.applyMethod || "").includes("EMAIL") : false
                  }
                />
                이메일 노출
              </label>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="allowMessage"
                  checked={true}
                  onClick={(e) => e.preventDefault()}
                />
                도복1번지 쪽지 받기
              </label>
            </div>
          </div>
        </fieldset>

        <div className={styles.buttonWrapper}>
          <Button variant="edit" type="button" onClick={(e) => handleCancel(e)}>
            취소하기
          </Button>

          <Button type="submit" isPending={isPending}>
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}
