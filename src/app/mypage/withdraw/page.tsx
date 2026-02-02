"use client";
import * as M from "../style";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function WithDraw() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState(""); // <- 여기 정의
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agree) {
      alert("동의 체크가 필요합니다.");
      return;
    }

    try {
      const res = await fetch("/api/user/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, reason, reasonText: otherReason }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "회원 탈퇴 실패");
        return;
      }

      alert("회원 탈퇴가 완료되었습니다.");
      // 로그아웃 후 메인으로
      await signOut({ redirect: false });
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <M.Contents withDraw>
      <h2>회원 탈퇴</h2>

      <M.WithDraw>
        <section>
          <p>회원 탈퇴 전 아래 내용을 반드시 확인해주세요.</p>
          <ul>
            <li>회원 탈퇴 시 계정 정보는 즉시 삭제됩니다.</li>
            <li>주문 내역,1:1 문의 내역은 복구할 수 없습니다.</li>
            <li>탈퇴 후 동일한 아이디로 재가입이 제한될 수 있습니다.</li>
          </ul>
        </section>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>탈퇴 사유 (선택)</legend>
            <ul>
              {[
                { value: "uncomfortable", text: "이용이 불편해서" },
                { value: "no_product", text: "원하는 상품이 없어서" },
                {
                  value: "delivery",
                  text: "배송 또는 고객 응대에 불만이 있어서",
                },
                { value: "another", text: "다른 서비스를 이용하게 되어서" },
                { value: "other", text: "기타" },
              ].map((item) => (
                <li key={item.value}>
                  <label className="radio">
                    <input
                      type="radio"
                      name="reason"
                      value={item.value}
                      checked={reason === item.value}
                      onChange={() => setReason(item.value)}
                    />
                    <span className="box" />
                    <span className="text">{item.text}</span>
                  </label>

                  {/* 기타 선택 시 입력창 */}
                  {item.value === "other" && reason === "other" && (
                    <input
                      required // ⭐ 이거 추가
                      type="text"
                      placeholder="탈퇴 사유를 작성해주세요"
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      style={{
                        marginTop: "8px",
                        padding: "10px",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </fieldset>

          <section>
            <label htmlFor="password">비밀번호 확인</label>
            <input
              required
              id="password"
              type="password"
              placeholder="본인 확인을 위해 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>
              <input
                type="checkbox"
                required
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              위 안내사항을 모두 확인하였으며, 회원 탈퇴에 동의합니다.
            </label>

            <button type="submit">회원 탈퇴</button>
          </section>
        </form>
      </M.WithDraw>
    </M.Contents>
  );
}
