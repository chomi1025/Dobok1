　
# 🛒 도복일번지

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-13-black?style=flat-square&logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-336791?style=flat-square&logo=postgresql&logoColor=white)
![Emotion](https://img.shields.io/badge/Emotion-CSS--in--JS-DB7093?style=flat-square)
![SCSS](https://img.shields.io/badge/SCSS-Stylesheet-CC6699?style=flat-square&logo=sass&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-Design-F24E1E?style=flat-square&logo=figma&logoColor=white)

　
# 🚀 프로젝트 소개

> 20년 넘게 이어온 부모님의 도복 판매 사업을 지켜보며,
> Naver Band와 같은 폐쇄적인 판매 환경으로 인해
> 신규 고객 유입에 한계가 있다는 문제를 느꼈습니다.
>
> 이를 해결하기 위해 접근성을 개선한 온라인 쇼핑몰을 구축하고,
> 복잡한 주문 과정을 자동화하여 비즈니스 효율을 높이고자 했습니다.
>
> 또한 단순 쇼핑몰을 넘어 무도 업계 종사자들이 정보를 교류할 수 있도록
> 커뮤니티 기능을 확장했습니다.
> 구인구직, 대회·행사 정보, 도장 운영 자료실 등
> 실제 사용자 니즈를 반영한 카테고리로 구성했습니다.
>
> 사용자 흐름을 고려해 Figma로 와이어프레임 및 UI를 설계한 후,
> 이를 실제 서비스로 구현했습니다.
> 또한 Next.js 기반 SSG를 활용해 주요 페이지를 정적으로 생성함으로써
> 초기 로딩 성능을 개선했습니다.
>
> PostgreSQL 기반 데이터 모델링을 통해
> 사용자 및 주문 데이터를 효율적으로 관리했습니다.
>
> 기획부터 디자인, DB 설계, 배포까지 전 과정을 1인 개발로 진행한 프로젝트입니다.

　
## 🔗 프로젝트 링크

| 구분 | 링크 |
| --- | --- |
| **🚀 서비스** | [dobok1.vercel.app](https://dobok1.vercel.app/) |
| **🎨 Figma** | [기획 및 UI/UX 설계서](https://www.figma.com/design/YA8drigR4Mz9cpIh5Ijwuv/%EB%8F%84%EB%B3%B5%EC%9D%BC%EB%B2%88%EC%A7%80?node-id=2028-6171&t=RbvOdwRdW4UGSE1b-0) |
| **🧪 테스트 계정** | **ID:** `test123` / **PW:** `1234` |

　　
## ✨ 주요 기능

#### 🛍️ 상품 리스트 및 상세 페이지
  - SSG 기반 상품/카테고리 사전 렌더링
  - CSR을 통한 동적 데이터 처리
  - 👉 [구현 상세 보기](https://github.com/chomi1025/Dobok1/wiki/%EC%83%81%ED%92%88%EB%A6%AC%EC%8A%A4%ED%8A%B8)
<table align="center">
  <tr>
    <td align="center">
      <img width="800"  alt="image" src="https://github.com/user-attachments/assets/72c6d01b-7c03-4277-b29b-fa5ffa0ae663" />
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <em>상품 리스트</em>
    </td>
  </tr>
</table>

　
#### 🛒 장바구니 기능
  - 상품 추가 / 수량 변경
  - 사용자 상태에 따른 장바구니 관리
  - 상품 목록에서 바로 담을 수 있는 퀵 애드 기능 구현
  - 👉 [구현 상세 보기](https://github.com/chomi1025/Dobok1/wiki/%EC%9E%A5%EB%B0%94%EA%B5%AC%EB%8B%88)

<table align="center">
  <tr>
    <td align="center">
      <img width="567" alt="상세페이지: 장바구니" src="https://github.com/user-attachments/assets/e9c65d47-b0fe-4aca-accc-c072146a5325" />
    </td>
    <td align="center">
      <img width="567" alt="상품 목록: 장바구니(퀵애드)" src="https://github.com/user-attachments/assets/643f4fce-5286-4a48-841f-5bdab81965ea" />
    </td>
  </tr>

  <tr>
    <td align="center">
      <em>상세페이지: 장바구니</em>
    </td>
    <td align="center">
      <em>상품 목록: 장바구니(퀵애드)</em>
    </td>
  </tr>

  <tr>
    <td colspan="2" align="center">
      <img width="700" alt="장바구니 페이지: 담긴 상품 확인" src="https://github.com/user-attachments/assets/5aa63406-da3d-4eb2-8413-b5a1bb162d4c" />
    </td>
  </tr>
  
  <tr>
    <td colspan="2" align="center">
      <em>장바구니 페이지: 담긴 상품 확인</em>
    </td>
  </tr>
</table>

　
#### 🔐 로그인 기능
  - NextAuth 기반 세션 인증 처리
  - useSession을 활용한 CSR 상태 분기
  - 로그인 여부에 따른 UI 및 기능 처리
  - 👉 [구현 상세 보기](https://github.com/chomi1025/Dobok1/wiki/%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B8%B0%EB%8A%A5)

<table align="center" style="margin: auto; width: 100%;">
  <tr>
    <td align="center" style="padding: 10px; vertical-align: top;">
      <div>
        <img width="152" height="60" alt="로그아웃 헤더 UI" src="https://github.com/user-attachments/assets/9e49b97d-dea4-48ea-a1dc-b5bd7e8fe35f" />
      </div>
    </td>
    <td align="center" style="padding: 10px; vertical-align: top;">
      <div>
        <img width="151" height="58" alt="로그인 헤더 UI" src="https://github.com/user-attachments/assets/a9021f31-a79b-424c-a473-e7d63586ce0d" />
      </div>
    </td>
  </tr>

  <tr>
    <td align="center" style="padding-top: 10px;">
      <em>로그아웃 헤더 UI</em>
    </td>
    <td align="center" style="padding-top: 10px;">
      <em>로그인 헤더 UI</em>
    </td>
  </tr>

  <tr>
    <td colspan="2" align="center" style="padding-top: 10px;">
      <em>세션을 감지해서 로그인 UI를 다르게 보여줍니다.</em>
    </td>
  </tr>

  <tr>
    <td colspan="2" align="center" style="padding-top: 20px;">
      <div>
        <img width="600" alt="로그인 화면 예시" src="https://github.com/user-attachments/assets/f9c019b2-9d87-4a2b-a705-d2ac44354a68" />
      </div>
      <div style="padding-top: 5px;">
        <em>로그인 화면</em>
      </div>
    </td>
  </tr>
</table>

　
#### 📦 주문 기능
  - 장바구니 → 주문 흐름 구현
  - 실제 구매 프로세스를 고려한 구조 설계
  - 👉 [구현 상세 보기](링크)


<table align="center" style="margin: auto; width: 100%;">
  <tr>
    <td align="center" style="padding: 10px; vertical-align: top;">
      <div>
        <img width="800" alt="image" src="https://github.com/user-attachments/assets/d840e847-83d5-4e95-a66f-a53741dd68dc" />
      </div>
    </td>
  </tr>

  <tr>
    <td align="center" style="padding-top: 10px;">
      <em>주문페이지 UI</em>
    </td>
  </tr>
</table>

　
#### 💳 결제 기능
  - 결제 API 연동 및 결제 처리
  - 결제 상태에 따른 주문 상태 관리
  - 결제 성공/실패에 따른 사용자 흐름 처리
  - 👉 [구현 상세 보기](링크)

<table align="center" style="margin: auto; width: 100%;">
  <tr>
    <td align="center" style="padding: 10px;">
      <img width="800" alt="image" src="https://github.com/user-attachments/assets/47f888e9-9169-4f38-9883-162d7e3b62fd" />
    </td>
  </tr>
  <tr>
    <td align="center" style="padding-top: 10px;">
      <em>결제선택 UI</em>
    </td>
  </tr>

  <tr>
    <td align="center">
      <table style="width: 100%;">
        <tr>
          <td align="center" style="padding: 10px;">
            <img width="400" alt="image" src="https://github.com/user-attachments/assets/76cb49ea-9f78-4a1a-96f2-971c30bc98c4" />
          </td>
          <td align="center" style="padding: 10px;">
            <img width="400" alt="image" src="https://github.com/user-attachments/assets/d513df26-699c-4002-9854-46177fd60967" />
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-top: 10px;"><em>결제 : 계좌이체 UI</em></td>
          <td align="center" style="padding-top: 10px;"><em>결제 : 신용카드,카카오페이 UI</em></td>
        </tr>
      </table>
    </td>
  </tr>
</table>

　
## 🚀 서비스 확장 기능

#### 🧑‍🤝‍🧑 커뮤니티 기능<br>
  - 구인구직, 자유게시판, 대회·행사 정보, 도장 운영 자료실<br>
  - 카테고리 기반 게시글 CRUD 구현

<details>
<summary>자세히 보기</summary>
<br>
  <table align="center" style="margin: auto; width: 100%;">
  <tr>
    <td align="center" style="padding: 10px;">
      <img width="700"  alt="image" src="https://github.com/user-attachments/assets/31098629-878a-471d-8b26-7587ce5c62c8" />
    </td>
    <td align="center" style="padding-top: 10px;">
      <img width="700"  alt="image" src="https://github.com/user-attachments/assets/ff63828a-ddba-4b9e-ba94-4e4534edea67" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <em>커뮤니티 : 구인구직 게시판</em>
    </td>
     <td align="center">
      <em>커뮤니티 : 구인구직 글쓰기 </em>
    </td>
  </tr>
</table>
</details>

　
#### 🛠️ 관리자 페이지<br>
  - 상품 등록 및 관리 기능<br>
  - 관리자 권한 기반 접근 제어

<details>
<summary>자세히 보기</summary>
<br>
    <table align="center" style="margin: auto; width: 100%;">
      <tr>
        <td align="center" style="padding: 10px;">
          <img width="800"  alt="image" src="https://github.com/user-attachments/assets/cfcd1488-0833-4826-987f-e1207a2e8d8c" />
        </td>
        <td align="center" style="padding-top: 10px;">
          <img width="800" alt="image" src="https://github.com/user-attachments/assets/e5a0cdfd-ec47-4547-9474-4bb1ee042fab" />
        </td>
      </tr>
      <tr>
        <td align="center">
          <em>관리자 페이지 : 상품관리</em>
        </td>
         <td align="center">
          <em>관리자 페이지 : 상품추가</em>
        </td>
      </tr>
    </table>
</details>

　　
## 📊 데이터베이스 설계 (ERD)

효율적인 데이터 관리와 확장성을 고려하여 **PostgreSQL(Neon)** 기반의 관계형 데이터 모델링을 설계했습니다. 
전체 구조를 기능별 도메인으로 분리하여 데이터 무결성을 확보했습니다.

<details>
<summary><b>🛒 주문 및 이커머스 핵심 로직 (자세히 보기)</b></summary>
<br>

- 사용자 상태에 따른 장바구니(Cart) 처리 및 주문(Order) 이력 관리
- 비회원/회원 간의 장바구니 데이터 일관성을 고려한 설계

<p align="center">
  <img width="800"  alt="image" src="https://github.com/user-attachments/assets/cd833dd5-4c98-478a-8f15-647b9c594e62" />
</p>
</details>

<details>
<summary><b>🧑‍🤝‍🧑 커뮤니티 및 관리 기능 (자세히 보기)</b></summary>
<br>
- 카테고리별 게시글(Post) CRUD 및 댓글(Comment) 시스템
- 다대일(1:N) 관계를 활용한 효율적인 데이터 참조 구조
<p align="center">
  <img width="536" height="562" alt="image" src="https://github.com/user-attachments/assets/c9801b97-f952-466e-afdb-2e938921e528" />
</p>
</details>

　
## 🧠 기술적 고민 & 해결

### 1. SEO 최적화를 위한 데이터 fetching 전략
- 상품 및 카테고리 데이터는 자주 변경되지 않는다는 점을 고려해 SSG를 활용했습니다.
- 이를 통해 초기 렌더링 속도와 SEO를 동시에 개선했습니다.

### 2. 상태 관리 전략
- 프로젝트 규모를 고려했을 때 복잡한 전역 상태 관리가 필요하지 않다고 판단했습니다.
- React의 상태와 props를 활용해 데이터 흐름을 단순하게 유지했습니다.


### 3. 서버/클라이언트 컴포넌트 분리
- Next.js 13 환경에서 서버 컴포넌트와 클라이언트 컴포넌트를 구분하여 불필요한 렌더링을 줄이고 성능을 개선했습니다.

### 4. 시맨틱 태그 활용
- 웹 접근성과 구조적 의미를 고려해 시맨틱 태그를 적극적으로 활용했습니다.
  - `header`, `footer`, `main`, `section` 등 레이아웃 구조에 맞는 태그 적용
  - 폼 요소에는 `label`과 `fieldset`을 활용하여 접근성과 UX 개선
- 이를 통해:
  - HTML 구조가 명확해지고, SEO에도 긍정적인 영향
  - 스크린 리더 사용자를 고려한 접근성 강화

　
## 🔥 트러블슈팅

### 1. 초기 로딩 성능 개선 (SSR → SSG 전환)

**[문제 현상]**
- 초기 로딩 속도 지연(약 6초) 및 서버 사이드 렌더링(SSR) 시 매 요청마다 발생하는 세션 체크로 인해 TTFB(Time to First Byte) 상승.

**[원인]**
   1. 모든 데이터를 SSR로 처리하여 서버 연산이 완료될 때까지 브라우저 렌더링이 차단됨.
   2. 서버 측 세션 확인(getServerSession) 과정이 정적 최적화를 방해하고 응답 속도를 늦춤.
   3. 불필요한 Link 태그의 prefetch가 활성화되어 초기 로딩 시 과도한 네트워크 요청 발생.
   4. 물리적 거리로 인한 Latency: Vercel 기본 리전 설정(Washington, D.C.)으로 인해 한국 사용자의 요청이 미국을 거쳐 도쿄 DB(Supabase)에 닿는 비효율적인 네트워크 경로 발생.

**[해결 방안]**
  1. 하이브리드 렌더링 도입 (SSG + CSR): 변경 빈도가 낮은 상품 데이터는 빌드 시점에 SSG로 미리 생성하고, 실시간 정보는 클라이언트에서 CSR로 보완하여 즉각적인 화면 렌더링 구현.
  2. 인증 로직 최적화: 서버 부하를 유발하는 getServerSession 대신, 클라이언트 훅인 **useSession**을 활용하여 세션 상태에 따른 UI 분기를 처리함으로써 페이지의 정적 특성을 유지.
  3. 리소스 로딩 최적화: 초기 뷰포트 외의 불필요한 네트워크 부하를 줄이기 위해 Link 컴포넌트의 prefetch={false} 옵션 적용.
 4. Global Latency 최적화: Vercel 배포 리전을 **Seoul(hnd1)**로 변경하여 데이터 통신 경로를 단축하고, NextAuth의 JWT 전략을 결합하여 DB 호출 없이 서버 리전 내에서 즉시 인증 처리가 가능하도록 개선.

**[결과]**
  - 초기 로딩 속도 약 6초 → 33ms로 개선

<table align="center" style="margin: auto; width: 100%;">
  <tr>
    <td align="center" style="padding: 10px; vertical-align: top;">
      <div>
        <img width="400" alt="SSR 적용 시 Network 탭 (느린 로딩)" src="https://github.com/user-attachments/assets/5b4b1737-5578-471a-a080-179373f0d158" />
      </div>
    </td>
    <td align="center" style="padding: 10px;">
      <div>
        <img width="400" alt="SSG 전환 후 Network 탭 (빠른 로딩)" src="https://github.com/user-attachments/assets/ee798c0a-b530-4aba-aa93-ce41342ef99e" />
      </div>
    </td>
  </tr>

 <tr>
    <td align="center" style="padding-top: 10px;">
         <div style="font-weight:bold">[BEFORE] SSR 방식</div>
        <div style="font-size: 0.9em; color: #666; margin-top: 5px;">
          모든 데이터를 서버에서 가져와 초기 로딩 속도가 매우 느림 (약 6초)
        </div>
    </td>
   <td align="center" style="padding-top: 10px;">
      <div style="font-weight:bold">[AFTER] SSG 전환 후</div>
        <div style="font-size: 0.9em; color: #666; margin-top: 5px;">
          정적 페이지 생성(SSG)으로 전환하여 초기 로딩 속도 개선 (33ms)
        </div>
    </td>
  </tr>
</table>

- Session API 응답: 224ms → 54ms로 개선

　
### 2. 배포 자동화 (CI/CD 구축)

**[문제 현상]**
  1. main 브랜치에 직접 Push 시, 배포 환경(Vercel)에서 예상치 못한 빌드 에러나 런타임 오류가 발생하여 서비스 안정성 저하.
<table align="center">
  <tr>
    <td>
      <img width="678" height="127" alt="image" src="https://github.com/user-attachments/assets/14e27eda-364e-438d-892f-0c8cd98a913c" />
    </td>
  </tr>
    <tr>
    <td align="center">
      <div>
          사전 검증 없이 main에 push했을 때 노출되는 에러 화면
      </div>
    </td>
  </tr>
</table>


  2. 로컬 환경과 배포 환경의 차이로 인해 배포 전 단계에서의 사전 검증이 불가능한 구조.


**[해결 방안]**
  - 브랜치 전략 : main 브랜치 직접 Push를 지양하고, 기능 단위의 feature 브랜치에서 작업 후 **Pull Request(PR)**를 통해 병합하는 프로세스 도입.
   - GitHub Actions 기반 CI 구축: PR 생성 및 main 병합 시 GitHub Actions가 자동으로 Build 테스트를 수행하여, 코드 결함이 있는 경우 병합되지 않도록 차단.

**[결과]**
  - 배포 전 단계에서 오류를 90% 이상 사전 차단하여 서비스 운영의 안정성 확보.
  - 코드 리뷰 및 테스트가 완료된 코드만 메인 서비스에 반영되는 체계적인 개발 워크플로우 정착.

　
### 3. 스타일링 방식 최적화 (Emotion → SCSS 혼합 전략)

**[문제 현상]**
- 모든 스타일을 CSS-in-JS(Emotion)로 관리하면서, 정적 페이지(SSG)임에도 불구하고 클라이언트 사이드에서 스타일 계산을 위한 자바스크립트 실행 비용이 지속적으로 발생.

**[원인 분석]**
- **런타임 오버헤드**: Emotion은 브라우저에서 스타일 시트를 동적으로 생성하므로, HTML이 로드된 후 JS가 스타일을 다시 계산하고 주입하는 과정에서 CPU 자원을 소모함.
- **번들 크기 증가**: 상태 변화가 없는 단순한 레이아웃 스타일까지 자바스크립트 번들에 포함되어 초기 로딩 효율을 떨어뜨림.

**[해결 방안]**
- **SCSS 중심의 구조 재설계**: 프로젝트의 전체적인 레이아웃과 공통 컴포넌트 등 대부분의 스타일을 SCSS로 전환하여 빌드 시점에 최적화된 CSS로 추출.
- **Emotion의 전략적 활용**: 데이터 시각화가 중요하거나 조건부 스타일링이 복잡한 테이블(Table) 등 특정 동적 컴포넌트에만 Emotion을 제한적으로 사용하여 런타임 성능 저하 최소화.

**[결과]**
  - 초기 렌더링 성능 최적화: 대부분의 스타일이 빌드 타임에 확정되어 브라우저의 스타일 계산 부하 급감.
  - 유지보수성 향상: 정적 스타일과 동적 로직의 경계를 명확히 분리하여 코드 가독성 및 재사용성 확보.
　

　
## 🛠️ 기술 스택

| 분류            | 기술 스택                          | 역할 |
| --------------- | ---------------------------------- | --------------- |
| Language        | TypeScript                  | 정적 타입 체크를 통한 코드 안정성 확보 |
| Frontend        | Next.js 13, React                  | 프레임워크 및 UI 라이브러리 |
| Styling	      | SCSS, Emotion	      | 정적/동적 스타일링 하이브리드 적용|
| Backend         | NextAuth, Prisma                   | 인증 및 ORM (Database 관리) |
| Database        | PostgreSQL                         | 서버리스 클라우드 DB 호스팅 |
| Security        | bcrypt                             | 비밀번호 단방향 암호화 및 보안 인증 |
| Infra/Deploy    | Vercel, GitHub Actions     | 인프라 배포 및 CI/CD 자동화 구축 |

　

## 🚀 개선 예정

- [ ] **인증 보안 강화:** 서버 측 토큰 무효화(Blacklist) 로직을 도입하여 강제 로그아웃 기능 구현.
- [ ] **장바구니 고도화:** 비회원 상태에서 담은 상품을 로그인 시 회원 DB와 병합(Merge)하는 로직 추가.
- [ ] **모바일 확장:** React Native를 활용한 크로스 플랫폼 앱 버전 개발 및 웹-앱 인증 동기화.

　
## ✨ 회고 및 앞으로의 계획

부모님의 사업을 돕기 위해 시작한 이 프로젝트는 저에게 **사용자 관점의 성능 최적화**가 얼마나 중요한지 깨닫게 해준 전환점이었습니다.

단순히 화면을 그려내는 것에 그치지 않고, 6초에 달하던 로딩 시간을 33ms까지 단축하기 위해 **렌더링 전략(SSG, SSR, CSR)** 을 깊이 고민하고 적용했던 과정은 기술로 문제를 해결하는 즐거움을 알게 해주었습니다. 또한, 정적 스타일과 동적 스타일의 균형을 맞추기 위해 SCSS와 Emotion을 혼합 사용하는 등 상황에 맞는 최적의 도구를 선택하는 판단력을 기를 수 있었습니다.

현재에 안주하지 않고, 커뮤니티 기능을 활성화하여 무도인들이 실제로 소통할 수 있는 플랫폼으로 성장시킬 계획입니다.
더 나아가 React Native를 활용한 크로스 플랫폼 앱 개발을 학습하여, 웹에서의 사용자 경험을 모바일 환경에서도 끊김 없이 이어가는 풀스택 프론트엔드 개발자로 거듭나고자 합니다.

　
