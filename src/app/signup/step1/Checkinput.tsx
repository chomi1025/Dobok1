"use client";
import styled from "@emotion/styled";
import { useState } from "react";

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

export const Check_Wrapper = styled.div`
  margin-top: 20px;

  > fieldset {
    border: none;
    padding: 0;

    legend {
      display: none;
    }

    .all-check {
      padding-bottom: 15px;
      margin-bottom: 20px;
      border-bottom: 1px solid #eee;

      > p {
        font-size: 15px;
        color: #000;
      }
    }

    > label {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-bottom: 18px;
      cursor: pointer;

      > input {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        accent-color: #000;
        cursor: pointer;
      }

      > p {
        color: #666;

        span {
          color: #c1272d;
        }
      }

      > button {
        margin-left: auto;
        font-size: 12px;
        color: #999;
        text-decoration: underline;
        background: none;
        border: none;
        cursor: pointer;

        &:hover {
          color: #333;
        }
      }
    }

    .sub-check {
      padding-left: 5px;
    }
  }
`;

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
    <Check_Wrapper>
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
    </Check_Wrapper>
  );
}
