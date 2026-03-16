"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "@emotion/styled";

export default function FindLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Inner>
      <h2>계정 찾기</h2>

      <TabMenu>
        <TabLink href="/find/id" active={pathname === "/find/id"}>
          아이디 찾기
        </TabLink>

        <TabLink href="/find/password" active={pathname === "/find/password"}>
          비밀번호 찾기
        </TabLink>
      </TabMenu>

      <div className="content">{children}</div>
    </Inner>
  );
}

const Inner = styled.div`
  max-width: 450px;
  margin: 0 auto;
  padding: 80px 0 200px;

  h2 {
    color: #222;
    font-size: 32px;
    margin-bottom: 20px;
  }
`;

const TabMenu = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
`;

const TabLink = styled(Link)<{ active: boolean }>`
  flex: 1;
  text-align: center;
  padding: 15px;
  text-decoration: none;
  color: ${(props) => (props.active ? "#333" : "#999")};
  border-bottom: ${(props) => (props.active ? "2px solid #222" : "none")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;
