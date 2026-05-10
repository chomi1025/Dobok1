"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./page.module.scss";

interface FormState {
  companyName: string;
  businessNumber: string;
  representative: string;
  taxEmail: string;
}

interface BusinessAuthFormProps {
  initialStatus: string;
}

export default function BusinessAuthForm({
  initialStatus,
}: BusinessAuthFormProps) {
  if (initialStatus === "PENDING") {
    return (
      <div className={styles.container}>
        <div className={styles.statusBox}>
          <span className={styles.statusIcon}>⏳</span>
          <h2>사업자 신청 검토 중</h2>
          <p>
            현재 사업자 등록증 서류를 검토하고 있습니다.
            <br />
            승인 완료 시 자동으로 도매 혜택이 적용됩니다.
          </p>
        </div>
      </div>
    );
  }

  if (initialStatus === "APPROVED") {
    return (
      <div className={styles.container}>
        <div className={styles.statusBox}>
          <span className={styles.statusIcon}>🎉</span>
          <h2>이미 인증된 사업자 회원입니다</h2>
          <p>도복일번지의 모든 사업자 전용 도매 혜택을 이용하실 수 있습니다.</p>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState<FormState>({
    companyName: "",
    businessNumber: "",
    representative: "",
    taxEmail: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 인풋 변경 핸들러
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "businessNumber") {
      const raw = value.replace(/[^0-9]/g, "");
      let formatted = raw;
      if (raw.length > 3 && raw.length <= 5) {
        formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
      } else if (raw.length > 5) {
        formatted = `${raw.slice(0, 3)}-${raw.slice(3, 5)}-${raw.slice(5, 10)}`;
      }
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 파일 업로드
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      setFile(selectedFile);

      if (selectedFile.type !== "application/pdf") {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewUrl(fileReader.result as string);
        };
        fileReader.readAsDataURL(selectedFile);
      } else {
        setPreviewUrl(null);
      }
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  // 제출
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("사업자등록증 파일을 첨부해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", "business");

      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/dxak1ux7x/image/upload",
        {
          method: "POST",
          body: uploadData,
        },
      );

      if (!cloudinaryRes.ok) {
        throw new Error("Cloudinary 업로드 실패");
      }

      const cloudinaryData = await cloudinaryRes.json();
      const uploadedFileUrl = cloudinaryData.secure_url;

      const dbRes = await fetch("/api/business/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          paperUrl: uploadedFileUrl,
        }),
      });

      const dbResult = await dbRes.json();

      if (!dbRes.ok) {
        throw new Error(dbResult.error || "DB 저장 실패");
      }

      alert("사업자 신청이 정상 접수되었습니다! 관리자 검토 후 승인됩니다.");

      // 필요하다면 신청 완료 후 메인페이지나 마이페이지로 라우팅 처리 추가!
    } catch (error: any) {
      console.error(error);
      alert(error.message || "인증 신청 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>사업자 회원 인증 신청</h2>
        <p>
          체육관 및 도장 사업자 회원으로 전환하시면 도매가 혜택을 받으실 수
          있습니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 상호명 */}
        <div className={styles.formGroup}>
          <label htmlFor="companyName">상호명 *</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            required
            placeholder="사업자등록증에 기재된 상호명을 입력하세요"
            value={formData.companyName}
            onChange={handleInputChange}
          />
        </div>

        {/* 대표자명 */}
        <div className={styles.formGroup}>
          <label htmlFor="representative">대표자 성명 *</label>
          <input
            type="text"
            id="representative"
            name="representative"
            required
            placeholder="대표자명을 입력하세요"
            value={formData.representative}
            onChange={handleInputChange}
          />
        </div>

        {/* 사업자 등록 번호 */}
        <div className={styles.formGroup}>
          <label htmlFor="businessNumber">사업자 등록 번호 *</label>
          <input
            type="text"
            id="businessNumber"
            name="businessNumber"
            required
            maxLength={12} // 하이픈 포함 12자
            placeholder="000-00-00000"
            value={formData.businessNumber}
            onChange={handleInputChange}
          />
        </div>

        {/* 세금계산서용 이메일 */}
        <div className={styles.formGroup}>
          <label htmlFor="taxEmail">세금계산서 수령 이메일 *</label>
          <input
            type="email"
            id="taxEmail"
            name="taxEmail"
            required
            placeholder="example@email.com"
            value={formData.taxEmail}
            onChange={handleInputChange}
          />
        </div>

        {/* 파일 업로드 구역 */}
        <div className={styles.formGroup}>
          <label>사업자등록증 첨부 *</label>
          <div className={styles.uploadArea}>
            <input
              type="file"
              id="fileUpload"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            <label htmlFor="fileUpload" className={styles.uploadLabel}>
              <span className={styles.uploadIcon}>📄</span>
              <span className={styles.uploadText}>
                {file
                  ? file.name
                  : "클릭하여 사업자등록증 등록 (이미지 또는 PDF)"}
              </span>
            </label>

            {/* 이미지 미리보기 구역 */}
            {previewUrl && (
              <div className={styles.previewContainer}>
                <img src={previewUrl} alt="사업자등록증 미리보기" />
              </div>
            )}
            {file && file.type === "application/pdf" && (
              <div className={styles.pdfBadge}>
                <span>PDF 파일이 선택되었습니다.</span>
              </div>
            )}
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "신청 처리 중..." : "사업자 회원 신청하기"}
        </button>
      </form>
    </div>
  );
}
