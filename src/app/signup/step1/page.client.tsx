"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import CheckComponent from "./Checkinput";
import toast from "react-hot-toast";
import styles from "./page.module.scss";
import TermsModal from "./component/TermsModal";

interface PortOneCertificationResponse {
  success: boolean;
  imp_uid: string;
  merchant_uid: string;
  error_msg?: string;
}

interface CertData {
  name: string;
  phone: string;
  birthday: string;
  ci: string | null;
}

interface VerifyCertResponse {
  success: boolean;
  isAlreadyRegistered?: boolean;
  data?: CertData;
  message?: string;
}

interface AgreedData {
  allAgreed: boolean;
  details: {
    service: boolean;
    privacy: boolean;
    marketing?: boolean;
  } | null;
}

export default function SignupStep1ClientPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCerted, setIsCerted] = useState<boolean>(false);
  const [certData, setCertData] = useState<CertData | null>(null);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [agreedData, setAgreedData] = useState<AgreedData>({
    allAgreed: false,
    details: null,
  });

  const handleCertification = () => {
    const { IMP } = window as any;

    if (!IMP) {
      toast.error("인증 라이브러리가 아직 로드되지 않았습니다.");
      return;
    }

    setIsLoading(true);

    IMP.init(process.env.NEXT_PUBLIC_IMP_CODE);

    IMP.certification(
      {
        pg: "inicis_unified.MIIiasTest",
        merchant_uid: `cert_${new Date().getTime()}`,
      },
      async (rsp: PortOneCertificationResponse) => {
        if (rsp.success) {
          try {
            const res = await fetch("/api/auth/verify-cert", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ imp_uid: rsp.imp_uid }),
            });

            const result: VerifyCertResponse = await res.json();

            if (result.success) {
              if (result.isAlreadyRegistered) {
                toast.error("이미 가입된 정보가 있습니다.");
                return;
              }

              if (result.data) {
                setCertData(result.data);
                setIsCerted(true);

                sessionStorage.setItem(
                  "temp_cert_data",
                  JSON.stringify(result.data),
                );

                toast.success("본인인증 완료!");
              }
            }
          } finally {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
          toast.error("인증 실패");
        }
      },
    );
  };

  const onNextStep = () => {
    if (!isCerted) return toast.error("본인인증을 먼저 진행해주세요.");
    if (!isAgreed) return toast.error("필수 약관에 모두 동의해주세요.");

    const storageData = {
      ...certData,
      agreeTerms: agreedData.details,
    };

    sessionStorage.setItem("signup_step1", JSON.stringify(storageData));
    router.push("/signup/step2");
  };

  const [modal, setModal] = useState<{ title: string; content: string } | null>(
    null,
  );

  const handleOpenTerms = (type: "service" | "privacy") => {
    if (type === "service") {
      setModal({
        title: "이용약관",
        content:
          "제 1조... 도복일번지 서비스 이용에 관한 내용입니다.\n\n내용이 아주 길어도 걱정 마세요! 스크롤이 생깁니다.",
      });
    } else {
      setModal({
        title: "개인정보 처리방침",
        content:
          "개인정보 수집 및 활용에 관한 안내입니다.\n\n수집항목: 이름, 전화번호 등...",
      });
    }
  };

  return (
    <div className={styles.inner}>
      <Script
        src="https://cdn.iamport.kr/v1/iamport.js"
        strategy="lazyOnload"
      />
      ;
      <div className={styles.titleArea}>
        <h2>도복일번지 가입을 환영합니다!</h2>
        <p>안전한 거래를 위해 본인인증이 필요합니다.</p>
      </div>
      <div className={styles.stepArea}>
        <div className={`${styles.step} ${isCerted && styles.active}`}>
          1. 본인인증
        </div>

        <div className={styles.stepLine} />

        <div className={styles.step}>2. 정보입력</div>
      </div>
      <div className={styles.certArea}>
        <p className={styles.certStatus}>
          {isCerted ? "✅ 인증이 완료되었습니다." : "🔒 본인인증이 필요합니다."}
        </p>
        {!isCerted && (
          <button
            type="button"
            onClick={handleCertification}
            disabled={isLoading}
          >
            {isLoading ? "인증 진행 중..." : "본인인증 하기"}
          </button>
        )}
      </div>
      {/* 약관 동의 */}
      <CheckComponent
        setIsAgreed={setIsAgreed}
        setAgreedData={setAgreedData}
        onOpenTerms={handleOpenTerms}
      />
      {/* 모달 상태가 있을 때만 렌더링 */}
      {modal && (
        <TermsModal
          title={modal.title}
          content={modal.content}
          onClose={() => setModal(null)}
        />
      )}
      <button
        className={`${styles.NextButton} ${!isCerted || !isAgreed ? styles.disabled : ""}`}
        type="button"
        onClick={onNextStep}
        disabled={!isCerted || !isAgreed}
      >
        다음 단계로
      </button>
    </div>
  );
}
