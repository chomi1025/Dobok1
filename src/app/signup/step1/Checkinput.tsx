"use client";
import { useState } from "react";
import styles from "./page.module.scss";

interface CheckState {
  over14: boolean;
  service: boolean;
  privacy: boolean;
}

type Props = {
  setIsAgreed: (isAll: boolean) => void;
  setAgreedData: (data: {
    allAgreed: boolean;
    details: CheckState | null;
  }) => void;
  onOpenTerms: (type: "service" | "privacy") => void;
};

export default function CheckComponent({
  setIsAgreed,
  setAgreedData,
  onOpenTerms,
}: Props) {
  const [checks, setChecks] = useState<CheckState>({
    over14: false,
    service: false,
    privacy: false,
  });

  const updateParent = (newChecks: CheckState) => {
    const allRequiredChecked =
      newChecks.over14 && newChecks.service && newChecks.privacy;

    setIsAgreed(allRequiredChecked);
    setAgreedData({
      allAgreed: allRequiredChecked,
      details: newChecks,
    });
  };

  const handleCheck = (name: keyof typeof checks) => {
    const newChecks = { ...checks, [name]: !checks[name] };
    setChecks(newChecks);
    updateParent(newChecks);
  };

  const handleAllCheck = () => {
    const isAllChecked = Object.values(checks).every((val) => val === true);
    const newValue = !isAllChecked;
    const updated = { over14: newValue, service: newValue, privacy: newValue };
    setChecks(updated);
    updateParent(updated);
  };

  const isAllChecked = Object.values(checks).every((val) => val === true);

  return (
    <div className={styles.check_Wrapper}>
      <fieldset>
        <legend>약관 동의</legend>

        {/* 전체동의 */}
        <label className="all-check">
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={handleAllCheck}
          />
          <p>약관에 전체 동의합니다.</p>
        </label>

        {/* 나머지 동의 */}
        <label className="sub-check">
          <input
            type="checkbox"
            checked={checks.over14}
            onChange={() => handleCheck("over14")}
          />
          <p>
            <span>[필수]</span> 만 14세 이상입니다.
          </p>
        </label>

        <label className="sub-check">
          <input
            type="checkbox"
            checked={checks.service}
            onChange={() => handleCheck("service")}
          />
          <p>
            <span>[필수]</span> 이용약관 동의
          </p>
          <button type="button" onClick={() => onOpenTerms("service")}>
            전체보기 ›
          </button>
        </label>

        <label className="sub-check">
          <input
            type="checkbox"
            checked={checks.privacy}
            onChange={() => handleCheck("privacy")}
          />
          <p>
            <span>[필수]</span> 개인정보 수집 및 이용 동의
          </p>
          <button type="button" onClick={() => onOpenTerms("privacy")}>
            전체보기 ›
          </button>
        </label>
      </fieldset>
    </div>
  );
}
