"use client";
import * as M from "../style";

export default function WithDraw() {
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

        <fieldset>
          <legend>탈퇴 사유 (선택)</legend>

          <ul>
            <li>
              <label className="radio">
                <input type="radio" name="reason" value="uncomfortable" />
                <span className="box" />
                <span className="text">이용이 불편해서</span>
              </label>
            </li>

            <li>
              <label className="radio">
                <input type="radio" name="reason" value="no_product" />
                <span className="box" />
                <span className="text">원하는 상품이 없어서</span>
              </label>
            </li>

            <li>
              <label className="radio">
                <input type="radio" name="reason" value="delivery" />
                <span className="box" />
                <span className="text">
                  배송 또는 고객 응대에 불만이 있어서
                </span>
              </label>
            </li>

            <li>
              <label className="radio">
                <input type="radio" name="reason" value="other" />
                <span className="box" />
                <span className="text">기타</span>
              </label>
            </li>
          </ul>
        </fieldset>

        <section>
          <label htmlFor="password">비밀번호 확인</label>
          <input
            required
            id="password"
            type="password"
            placeholder="본인 확인을 위해 입력해주세요"
          />

          <label>
            <input type="checkbox" required />위 안내사항을 모두 확인하였으며,
            회원 탈퇴에 동의합니다.
          </label>

          <button type="submit">회원 탈퇴</button>
        </section>
      </M.WithDraw>
    </M.Contents>
  );
}
