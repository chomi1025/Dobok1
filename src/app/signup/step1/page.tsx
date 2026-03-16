"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import Script from "next/script";
import CheckComponent from "./Checkinput";
import toast from "react-hot-toast";

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

export default function SignupStep1() {
  const router = useRouter();
  const [isCerted, setIsCerted] = useState<boolean>(false);
  const [certData, setCertData] = useState<CertData | null>(null);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [agreedData, setAgreedData] = useState<AgreedData>({
    allAgreed: false,
    details: null,
  });

  const handleCertification = () => {
    const { IMP } = window as any;
    IMP.init(process.env.NEXT_PUBLIC_IMP_CODE);
    console.log("포트원 코드:", process.env.NEXT_PUBLIC_IMP_CODE);
    IMP.certification(
      {
        pg: "inicis_unified.MIIiasTest",
        merchant_uid: `cert_${new Date().getTime()}`,
      },

      async (rsp: PortOneCertificationResponse) => {
        if (rsp.success) {
          const res = await fetch("/api/auth/verify-cert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imp_uid: rsp.imp_uid }),
          });

          const result: VerifyCertResponse = await res.json();
          console.log("최종 서버 데이터:", result);

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
              document.cookie = "cert_verified=true; path=/; max-age=600";

              toast.success("본인인증이 완료되었습니다!");
            }
          }
        } else {
          toast.error("인증 데이터 처리 중 오류가 발생했습니다.");
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
    <Inner>
      <TitleArea>
        <h2>도복일번지 가입을 환영합니다!</h2>
        <p>안전한 거래를 위해 본인인증이 필요합니다.</p>
      </TitleArea>

      <StepArea>
        <Step active>1. 본인인증</Step>
        <StepLine />
        <Step>2. 정보입력</Step>
      </StepArea>

      <form onSubmit={(e) => e.preventDefault()}>
        <CertArea>
          <CertStatus isCerted={isCerted}>
            {isCerted
              ? "✅ 인증이 완료되었습니다."
              : "🔒 본인인증이 필요합니다."}
          </CertStatus>
          {!isCerted && (
            <button type="button" onClick={handleCertification}>
              본인인증 하기
            </button>
          )}
        </CertArea>

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

        <NextButton
          type="button"
          disabled={!isCerted || !isAgreed}
          onClick={onNextStep}
        >
          다음 단계로
        </NextButton>
      </form>

      <Script src="https://cdn.iamport.kr/v1/iamport.js" />
    </Inner>
  );
}

const Inner = styled.div`
  max-width: 450px;
  margin: 0 auto;
  padding: 120px 0 300px;
`;

const TitleArea = styled.div`
  text-align: center;
  margin-bottom: 40px;
  h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  p {
    color: #666;
    font-size: 15px;
  }
`;

const StepArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const Step = styled.div<{ active?: boolean }>`
  font-size: 14px;
  font-weight: ${(props) => (props.active ? "700" : "400")};
  color: ${(props) => (props.active ? "#000" : "#ccc")};
`;

const StepLine = styled.div`
  width: 40px;
  height: 1px;
  background: #eee;
  margin: 0 15px;
`;

const CertArea = styled.div`
  background: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 30px;
  border: 1px solid #eee;

  button {
    margin-top: 15px;
    padding: 10px 25px;
    background: #000;
    color: #fff;
    border-radius: 6px;
    font-weight: 600;
  }
`;

const CertStatus = styled.p<{ isCerted: boolean }>`
  font-weight: 600;
  color: ${(props) => (props.isCerted ? "#333" : "#333")};
`;

const NextButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${(props) => (props.disabled ? "#ccc" : "#000")};
  color: #fff;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  margin-top: 30px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

type ModalProps = {
  title: string;
  content: string;
  onClose: () => void;
};

function TermsModal({ title, content, onClose }: ModalProps) {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>{title}</h3>
          <button onClick={onClose}>&times;</button>
        </ModalHeader>
        <ModalBody>
          <pre>{content}</pre>
        </ModalBody>
        <ModalFooter>
          <button onClick={onClose}>확인</button>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(2px);
`;

const ModalContainer = styled.div`
  width: 90%;
  max-width: 500px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 18px;
    font-weight: 700;
  }
  button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  pre {
    white-space: pre-wrap;
    font-family: inherit;
  }
`;

const ModalFooter = styled.div`
  padding: 15px 20px;
  border-top: 1px solid #eee;
  button {
    width: 100%;
    padding: 14px;
    background: #000;
    color: #fff;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }
`;
