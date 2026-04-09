"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import styles from "./hiring.module.scss";
import Button from "@/components/common/buttons/page";
import { useRouter } from "next/navigation";
import { CITY_OPTIONS, DISTRICTS } from "@/constants/regions";
import toast from "react-hot-toast";
import { JOB_ROLE_MAP } from "@/constants/jobs";
import Editor from "@/components/common/editor/page";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function HiringLayout() {
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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const companyName = formData.get("companyName") as string;

    // 검증
    const validate = () => {
      if (!title?.trim()) return "공고 제목을 입력해주세요!";
      if (!companyName?.trim()) return "도장명(회사명)을 입력해주세요!";
      if (!city || !district) return "지역을 선택해주세요!";
      if (isOthers && !customJobRole)
        return "직접 입력할 종목명을 작성해주세요!";
      if (content.replace(/<[^>]*>?/gm, "").trim() === "")
        return "모집 내용을 입력해주세요!";
      return null;
    };

    const errorMsg = validate();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    const applyMethods = [];
    if (formData.get("showPhone")) applyMethods.push("PHONE");
    if (formData.get("showEmail")) applyMethods.push("EMAIL");
    applyMethods.push("MESSAGE");

    const payload = {
      title: formData.get("title"),
      companyName: formData.get("companyName"),
      city: city,
      district: district,
      jobRole: isOthers ? customJobRole : jobRole,
      experience: formData.get("experience"),
      content: content,
      applyMethod: applyMethods.join(","),
    };

    console.log(payload);
    try {
      const response = await fetch("/api/hiring", {
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

      toast.success("구인 공고가 성공적으로 등록되었습니다!");
      router.refresh();
      router.push(`/community/jobs?type=${result.jobType.toLowerCase()}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "등록 중 에러 발생");
    }
  };

  return (
    <div className={styles.inner}>
      <header className={styles.header}>
        <h1>구인 글쓰기</h1>
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
              placeholder="공고 제목을 입력해주세요."
            />
          </div>

          <div className={styles.companyWrapper}>
            <div className={styles.field}>
              <label htmlFor="companyName">회사명</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder="도장명"
              />
            </div>

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
                {Object.entries(JOB_ROLE_MAP).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
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

            <div className={styles.field}>
              <label htmlFor="experience">경력</label>
              <select id="experience" name="experience">
                <option value="IRRELEVANT">경력무관</option>
                <option value="NEWBIE">신입(1년 미만 ~ 2년)</option>
                <option value="JUNIOR">주니어(3~4년)</option>
                <option value="MID_LEVEL">중급(5~6년)</option>
                <option value="SENIOR">7년 이상</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>모집내용 및 지원방법</legend>

          <div className={styles.editorField}>
            <label>
              모집내용 및 근무조건
              <span>
                자세히 작성할수록 우리 도장에 꼭 맞는 사범님을 찾을 확률이
                높아집니다
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
              {/* 휴대폰 공개 여부 */}
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="showPhone" defaultChecked />
                휴대폰 번호 노출
              </label>

              {/* 이메일 공개 여부 */}
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="showEmail" />
                이메일 노출
              </label>

              {/* 쪽지 허용 (기본값) */}
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
