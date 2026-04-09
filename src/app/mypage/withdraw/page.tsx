"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function WithDraw() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
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

      await signOut({ redirect: false });
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.inner}>
      <header className={styles.header}>
        <h1>회원 탈퇴</h1>
        <p>정말 탈퇴하시겠어요? 신중하게 결정해주세요.</p>
      </header>

      <div className={styles.withDraw}>
        {/* 주의사항 박스 */}
        <section className={styles.warningSection}>
          <div className={styles.warningTitle}>꼭 확인해주세요!</div>
          <ul className={styles.warningList}>
            <li>
              계정 정보는 탈퇴 즉시 삭제되며 <strong>복구가 불가능</strong>
              합니다.
            </li>
            <li>
              <strong>커뮤니티 및 게시글 안내:</strong> 탈퇴 후에도 게시판, 상품
              후기 등에 등록하신
              <strong> 게시물은 삭제되지 않고 유지</strong>됩니다. 삭제를
              원하시면 탈퇴 전 미리 삭제해 주시기 바랍니다.
            </li>
            <li>
              <strong>법적 보관 안내:</strong> 전자상거래법 등 관계법령에
              의거하여 대금결제 및 재화 등의 공급에 관한 기록, 소비자 불만 또는
              분쟁처리에 관한 기록은
              <strong> 최대 5년간 보관</strong> 후 파기됩니다.
            </li>
          </ul>
        </section>

        <form onSubmit={handleSubmit} className={styles.form}>
          <fieldset className={styles.reasonFieldset}>
            <legend>탈퇴하시는 이유가 무엇인가요?</legend>
            <div className={styles.radioGrid}>
              {[
                { value: "uncomfortable", text: "이용이 불편함" },
                { value: "no_product", text: "상품 부족" },
                { value: "delivery", text: "배송/응대 불만" },
                { value: "another", text: "타 서비스 이용" },
                { value: "other", text: "기타 사유" },
              ].map((item) => (
                <label
                  key={item.value}
                  className={`${styles.radioLabel} ${reason === item.value ? styles.active : ""}`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={item.value}
                    checked={reason === item.value}
                    onChange={() => setReason(item.value)}
                  />
                  <span className={styles.text}>{item.text}</span>
                </label>
              ))}
            </div>

            {reason === "other" && (
              <textarea
                required
                placeholder="더 나은 서비스를 위해 구체적인 사유를 알려주세요."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className={styles.otherInput}
              />
            )}
          </fieldset>

          <section className={styles.confirmSection}>
            <div className={styles.inputGroup}>
              <label htmlFor="password">비밀번호 확인</label>
              <input
                required
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <label className={styles.agreeLabel}>
              <input
                type="checkbox"
                required
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span>안내사항을 모두 확인하였으며, 이에 동의합니다.</span>
            </label>

            <button type="submit" className={styles.submitBtn}>
              회원 탈퇴 확정
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
