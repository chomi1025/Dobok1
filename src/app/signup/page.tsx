"use client";
import * as S from "./style";
import { useState } from "react";

export default function Signup() {
  const [phone, setPhone] = useState({
    prefix: "010",
    middle: "",
    last: "",
  });

  const [address, setAddress] = useState({
    zipCode: "",
    address1: "",
    address2: "",
  });

  const onlyNumber = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/\D/g, "");
  };

  return (
    <>
      <S.Inner>
        <S.Title_Wrapper>
          <h2>회원가입</h2>
          <p>도복일번지에 가입하시고 다양한 혜택을 받아보세요! </p>
        </S.Title_Wrapper>

        <S.Line />

        <S.Form>
          <S.Form_Inner>
            {/* 아이디 */}
            <fieldset>
              <legend>계정 정보</legend>

              <div className="field">
                <label htmlFor="userId">아이디</label>
                <input
                  id="userId"
                  type="text"
                  name="userId"
                  placeholder="아이디를 입력해주세요"
                  autoComplete="username"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="password">비밀번호</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="8자 이상, 영문, 숫자, 특수문자 중 2가지 이상을 조합해주세요."
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="passwordConfirm">비밀번호 확인</label>
                <input
                  id="passwordConfirm"
                  type="password"
                  name="passwordConfirm"
                  required
                />
              </div>
            </fieldset>

            {/* 개인정보 */}
            <fieldset>
              <legend>개인 정보</legend>

              <div className="field">
                <label htmlFor="name">이름</label>
                <input id="name" type="text" name="name" required />
              </div>

              <S.Phone className="field">
                <label htmlFor="phone">핸드폰 번호</label>
                <div>
                  <S.Phone_Selectwrapper>
                    <select
                      value={phone.prefix}
                      onChange={(e) =>
                        setPhone({ ...phone, prefix: e.target.value })
                      }
                    >
                      <option value="010">010</option>
                      <option value="011">011</option>
                      <option value="016">016</option>
                      <option value="017">017</option>
                      <option value="018">018</option>
                      <option value="019">019</option>
                    </select>

                    <S.Arrow />
                  </S.Phone_Selectwrapper>

                  <input
                    type="text"
                    maxLength={4}
                    inputMode="numeric"
                    value={phone.middle}
                    onChange={(e) =>
                      setPhone({
                        ...phone,
                        middle: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />

                  <input
                    type="text"
                    maxLength={4}
                    inputMode="numeric"
                    value={phone.last}
                    onChange={(e) =>
                      setPhone({
                        ...phone,
                        last: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />

                  <button>본인인증</button>
                </div>
              </S.Phone>

              <S.address className="field">
                <label htmlFor="email">주소</label>

                <div>
                  <input
                    type="text"
                    placeholder="우편번호"
                    value={address.zipCode}
                    readOnly
                  />
                  <button>본인인증</button>
                </div>

                <input
                  type="text"
                  placeholder="주소"
                  value={address.address1}
                  readOnly
                />

                <input
                  type="text"
                  placeholder="상세주소"
                  value={address.address2}
                  onChange={(e) =>
                    setAddress({ ...address, address2: e.target.value })
                  }
                />
              </S.address>

              <S.Email className="field">
                <label htmlFor="email">이메일</label>

                <div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                  />

                  <S.Email_Selectwrapper>
                    <select
                      value={phone.prefix}
                      onChange={(e) =>
                        setPhone({ ...phone, prefix: e.target.value })
                      }
                    >
                      <option value="gmail.com">gmail.com</option>
                      <option value="naver.com">naver.com</option>
                      <option value="daum.net">daum.net</option>
                      <option value="hanmail.net">hanmail.net</option>
                    </select>

                    <S.Arrow />
                  </S.Email_Selectwrapper>
                </div>
              </S.Email>

              <S.Birthday className="field">
                <label htmlFor="email">생년월일</label>
                <div>
                  <span>
                    <input
                      placeholder="YYYY"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={4}
                      onInput={onlyNumber}
                    />
                  </span>

                  <span>
                    <input
                      placeholder="MM"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={2}
                      onInput={onlyNumber}
                    />
                  </span>

                  <span>
                    <input
                      placeholder="DD"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={2}
                      onInput={onlyNumber}
                    />
                  </span>
                </div>
              </S.Birthday>
            </fieldset>
          </S.Form_Inner>

          <S.Line2 />

          {/* 약관 동의 */}
          <S.Check_Wrapper>
            <fieldset>
              <legend>약관 동의</legend>

              <label>
                <input type="checkbox" required />
                <span>
                  도복일번지의 이용약관(필수), 개인정보 수집 및 이용(필수)에
                  모두 동의합니다.
                </span>
              </label>

              <label>
                <input type="checkbox" required />
                <span>[필수] 만 14세 이상입니다.</span>
              </label>

              <label>
                <input type="checkbox" required />
                <span>[필수] 이용약관</span>
              </label>

              <label>
                <input type="checkbox" />
                <span>[필수] 개인정보 수집 및 이용</span>
              </label>
            </fieldset>
          </S.Check_Wrapper>

          <S.Signup_Button type="submit">회원가입</S.Signup_Button>
        </S.Form>
      </S.Inner>
    </>
  );
}
