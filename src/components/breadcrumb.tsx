import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Wrapper = styled.nav`
  ul {
    display: flex;
    justify-content: center;
    color: #888;
    align-items: center;
  }
`;

const Step = styled.li<{ $isCurrent: boolean }>`
  /* 글자 색상: 현재 페이지면 진하게(#333), 아니면 흐리게(#ccc) */
  color: ${({ $isCurrent }) => ($isCurrent ? "#333" : "#ccc")};
  font-weight: ${({ $isCurrent }) => ($isCurrent ? "700" : "400")};
  display: flex;
  align-items: center;

  &:not(:last-child)::after {
    content: "";
    display: block;
    background: url("/image/Double arrow.png") no-repeat center;
    background-size: contain;
    width: 24px;
    height: 24px;
    margin: 0 8px;

    /* 화살표 opacity: 현재 이 단계가 '활성' 상태일 때만 진하게, 아니면 흐리게 */
    /* (장바구니 페이지에선 장바구니 옆 화살표만 진함) */
    opacity: ${({ $isCurrent }) => ($isCurrent ? "1" : "0.3")};
  }
`;

export default function BreadCrumb({ steps }) {
  const pathname = usePathname();

  const currentStep =
    steps.find((step) => pathname.startsWith(step.path))?.step ?? 0;

  console.log(pathname);
  return (
    <Wrapper>
      <ul>
        {steps.map((step) => (
          <Step
            key={step.path}
            // 이제 $isPassed는 필요 없으니 $isCurrent만 넘겨줘!
            $isCurrent={step.step === currentStep}
          >
            <Link href={step.path}>{step.label}</Link>
          </Step>
        ))}
      </ul>
    </Wrapper>
  );
}
