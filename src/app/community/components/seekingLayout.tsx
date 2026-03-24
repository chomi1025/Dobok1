"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import styles from "./hiring.module.scss";
import Button from "@/components/common/buttons/page";
import { useRouter } from "next/navigation";
import { CITY_OPTIONS, DISTRICTS } from "@/constants/regions";
import toast from "react-hot-toast";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function SeekingLayout() {
  // 지역
  const [city, setCity] = useState(""); // 시
  const [district, setDistrict] = useState(""); //구

  //   직무
  const [jobRole, setJobRole] = useState("MASTER");
  const [customJobRole, setCustomJobRole] = useState("");
  const isOthers = jobRole === "OTHERS";

  //   모집내용
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    setDistrict("");
  };

  const handleJobRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJobRole(e.target.value);
    if (e.target.value !== "OTHERS") {
      setCustomJobRole("");
    }
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
  // 등록버튼
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;

    // 검증
    const validate = () => {
      if (!title?.trim()) return "제목을 입력해주세요!";
      if (!city || !district) return "희망 지역을 선택해주세요!";
      if (isOthers && !customJobRole)
        return "직접 입력할 종목명을 작성해주세요!";
      if (content.replace(/<[^>]*>?/gm, "").trim() === "")
        return "선생님을 멋지게 소개해 줄 내용을 작성해 주세요!";
      return null;
    };

    const errorMsg = validate();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    // 연락 방법
    const applyMethods = [];
    if (formData.get("showPhone")) applyMethods.push("PHONE");
    if (formData.get("showEmail")) applyMethods.push("EMAIL");
    applyMethods.push("MESSAGE");

    const payload = {
      title,
      city,
      district,
      jobRole: isOthers ? customJobRole : jobRole,
      experience: formData.get("experience"),
      content: content,
      applyMethod: applyMethods.join(","),
    };

    console.log("구직 등록 데이터:", payload);

    try {
      const response = await fetch("/api/seeking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "등록에 실패했습니다.");
      }

      const result = await response.json();

      toast.success("구직 이력서가 성공적으로 등록되었습니다!");
      router.refresh();
      router.push(`/community/jobs?type=${result.jobType.toLowerCase()}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "등록 중 에러 발생");
    }
  };

  return (
    <div className={styles.inner}>
      <header className={styles.header}>
        <h1>구직 글쓰기</h1>
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
              placeholder="제목을 입력해주세요."
            />
          </div>

          <div className={styles.companyWrapper}>
            <div className={styles.field}>
              <label htmlFor="city">지역</label>

              <select
                name="city"
                id="city"
                value={city}
                onChange={handleCityChange}
              >
                <option value="" disabled hidden>
                  지역을 선택해주세요.
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
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!city}
              >
                <option value="" disabled hidden>
                  지역을 선택해주세요.
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
              <select id="experience" name="experience">
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
                <option value="MASTER">태권도</option>
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
                  id="customJobRole"
                  name="customJobRole"
                  placeholder="예: 주짓수, 필라테스"
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
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className={styles.editor}
            />
          </div>

          <div className={styles.contactField}>
            <label>
              연락처 노출 설정
              <span>(회원정보에 등록된 정보가 노출됩니다)</span>
            </label>
            <div className={styles.contactOptions}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="showPhone" defaultChecked />
                휴대폰 번호 노출
              </label>

              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="showEmail" />
                이메일 노출
              </label>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="allowMessage"
                  checked={true}
                  readOnly
                  onClick={(e) => e.preventDefault()}
                />
                도복1번지 쪽지 받기 (기본)
              </label>
            </div>
          </div>
        </fieldset>

        <div className={styles.buttonWrapper}>
          <Button
            variant="edit"
            type="button"
            className={styles.submitBtn}
            onClick={(e) => handleCancel(e)}
          >
            취소하기
          </Button>

          <Button type="submit" className={styles.submitBtn}>
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}
