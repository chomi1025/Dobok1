import styled from "@emotion/styled";
import { usePathname } from "next/navigation";

interface StepItem {
  label: string;
  step: number;
  path: string;
}

interface BreadCrumbProps {
  steps: StepItem[];
  currentStep?: number;
}

const Wrapper = styled.nav`
  ul {
    display: flex;
    justify-content: center;
    color: #888;
    align-items: center;
  }
`;

const Step = styled.li<{ $isCurrent: boolean }>`
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
    opacity: ${({ $isCurrent }) => ($isCurrent ? "1" : "0.3")};
  }
`;

export default function BreadCrumb({ steps }: BreadCrumbProps) {
  const pathname = usePathname();

  const currentStep =
    steps.find((step) => pathname.startsWith(step.path))?.step ?? 0;

  return (
    <Wrapper>
      <ul>
        {steps.map((step) => (
          <Step key={step.path} $isCurrent={step.step === currentStep}>
            {step.label}
          </Step>
        ))}
      </ul>
    </Wrapper>
  );
}
