"use client";
import Image from "next/image";
import * as P from "./style";
import { useState } from "react";
import PagenationComponent from "@/components/pagenation/page";
import GuideSectionComponent from "@/components/product/detailpage/GuideComponent";

interface Product {
  id: number;
  name: string;
  description: string | null;
  thumbnail: string | null;
  images: string[];
  material: string | null;
  origin: string | null;
  createdAt: Date;
  categoryId: number;
  options: any[];
  category: {
    id: number;
    name: string;
    parentId: number | null;
    slug: string;
    sortOrder: number | null;
  };
}

interface Prop {
  product: Product;
}

// export const mockReviews = [
//   {
//     id: 1,
//     userId: "user_01",
//     userName: "김철수",
//     rating: 5,
//     content:
//       "도복 원단이 진짜 짱짱해요! 세탁해도 수축이 거의 없어서 놀랐습니다. 역시 초미네 가게네요. 🥋",
//     images: ["https://picsum.photos/400/400?random=1"],
//     createdAt: "2026-02-15T10:00:00Z",
//     option: "블루 / A1",
//   },
//   {
//     id: 2,
//     userId: "user_02",
//     userName: "이영희",
//     rating: 4,
//     content:
//       "배송이 조금 늦었지만 상품은 만족합니다. 가벼운 도복 찾으시는 분들께 추천해요!",
//     images: [],
//     createdAt: "2026-02-20T14:30:00Z",
//     option: "화이트 / A0",
//   },
//   {
//     id: 3,
//     userId: "user_03",
//     userName: "박지성",
//     rating: 5,
//     content:
//       "관장님이 어디서 샀냐고 물어보시네요. 핏이 예술입니다. 하나 더 사려구요.",
//     images: [
//       "https://picsum.photos/400/400?random=2",
//       "https://picsum.photos/400/400?random=3",
//     ],
//     createdAt: "2026-02-28T09:15:00Z",
//     option: "블랙 / A2",
//   },
//   {
//     id: 4,
//     userId: "user_04",
//     userName: "손흥민",
//     rating: 5,
//     content:
//       "움직임이 너무 편해요. 겨드랑이 쪽 보강 처리가 잘 되어 있어서 튼튼합니다. 🥊",
//     images: [],
//     createdAt: "2026-03-01T18:20:00Z",
//     option: "네이비 / A1",
//   },
//   {
//     id: 5,
//     userId: "user_05",
//     userName: "노새친구",
//     rating: 3,
//     content:
//       "생각보다 색감이 조금 어두워요. 그래도 가성비는 나쁘지 않은 듯합니다.",
//     images: ["https://picsum.photos/400/400?random=4"],
//     createdAt: "2026-03-02T11:40:00Z",
//     option: "그레이 / A2",
//   },
//   {
//     id: 6,
//     userId: "user_06",
//     userName: "주짓수왕",
//     rating: 5,
//     content:
//       "이 가격에 이 퀄리티 실화인가요? 패치도 깔끔하게 붙어있어서 너무 예뻐요.",
//     images: [],
//     createdAt: "2026-03-03T20:10:00Z",
//     option: "화이트 / A1",
//   },
//   {
//     id: 7,
//     userId: "user_07",
//     userName: "강백호",
//     rating: 4,
//     content:
//       "사이즈가 살짝 큰 편인 것 같아요. 한 사이즈 작게 사도 될 뻔 했네요. 교환은 귀찮아서 그냥 입습니다!",
//     images: ["https://picsum.photos/400/400?random=5"],
//     createdAt: "2026-03-04T12:05:00Z",
//     option: "블루 / A3",
//   },
//   {
//     id: 8,
//     userId: "user_08",
//     userName: "서태웅",
//     rating: 5,
//     content: "집중하기 좋은 무게감입니다. 만족.",
//     images: [],
//     createdAt: "2026-03-05T22:50:00Z",
//     option: "블랙 / A2L",
//   },
//   {
//     id: 9,
//     userId: "user_09",
//     userName: "초미팬",
//     rating: 5,
//     content:
//       "포장이 너무 정성스러워서 뜯기 아까웠어요. 사은품으로 주신 띠도 잘 쓰겠습니다!",
//     images: ["https://picsum.photos/400/400?random=6"],
//     createdAt: "2026-03-06T15:33:00Z",
//     option: "핑크 / A0",
//   },
//   {
//     id: 10,
//     userId: "user_10",
//     userName: "운동하는직장인",
//     rating: 2,
//     content:
//       "실밥 처리가 마감이 덜 된 부분이 있네요. 검수 좀 더 신경 써주세요.",
//     images: ["https://picsum.photos/400/400?random=7"],
//     createdAt: "2026-03-07T08:12:00Z",
//     option: "네이비 / A2",
//   },
// ];

export const mockReviews = [];

export const SHOPPING_POLICY = [
  {
    title: "상품 정보 고시",
    expandedHeight: "740px",
    items: [
      {
        label: "제품명",
        content: [],
      },
      {
        label: "제품소재",
        content: [],
      },
      {
        label: "색상",
        content: [],
      },
      {
        label: "치수",
        content: [],
      },
      {
        label: "제조사",
        content: [],
      },
      {
        label: "치수",
        content: [],
      },
      {
        label: "제조국",
        content: [],
      },
      {
        label: "세탁방법 및 주의사항",
        content: [],
      },
      {
        label: "품질보증기준",
        content: [],
      },
      {
        label: "A/S 책임자 전화번호",
        content: [],
      },
    ],
  },
  {
    title: "배송 안내",
    expandedHeight: "360px",
    items: [
      { label: "배송 업체", content: ["CJ 대한통운"] },
      {
        label: "배송 기간",
        content: [
          "발송 이후 1~2 영업일 (주말 및 공휴일 제외)",
          "제작 상품의 경우 제작 기간이 2~7일 추가 소요될 수 있습니다.",
        ],
      },

      {
        label: "배송비",
        content: [
          "2,500원 (5만원 이상 구매 시 무료 배송)",
          "도서산간 지역은 추가 비용(편도 +4,000원) 발생",
        ],
      },

      { label: "배송 지역", content: ["전국(일부 지역 제외)"] },
    ],
  },

  {
    title: "교환 및 반품 안내",
    expandedHeight: "670px",
    items: [
      {
        label: "신청 기간",
        content: [
          "단순 변심에 의한 교환/반품은 상품 수령 후 7일 이내 가능합니다.",
          "단, 제작 상품의 경우 단순 변심으로 인한 교환/반품이 불가합니다.(사이즈 선택, 디자인 선택 등 고객 맞춤 제작 포함)",
        ],
      },
      {
        label: "반품/교환 불가안내",
        content: [
          "1. 고객님의 책임으로 상품이 훼손되거나 사용한 흔적이 있는 경우",
          "2. 상품 택, 포장재가 훼손되었거나 분실된 경우 ",
          "3. 착용 또는 세탁 후 발생한 문제",
          "4. 향수/오염/주름 등으로 재판매가 어려운 경우",
          "5. 구성품 누락, 사은품 미반환 등",
        ],
      },
      {
        label: "제작 상품(커스텀 상품) 안내",
        content: [
          "제작이 시작된 이후에는 취소가 불가합니다.",
          "제작 기간은 2~7일 소요되며, 제작 상황에 따라 변경될 수 있습니다.",
        ],
      },
      {
        label: "반품 배송비",
        content: [
          "단순 변심: 왕복 배송비 5,000원 고객 부담",
          "상품 하자 및 오배송: 배송비 무료 (판매자 부담)",
        ],
      },

      {
        label: "상품 하자 / 오배송",
        content: [
          "오배송, 불량 등 판매자 책임의 경우 수령 후 7일 이내 고객센터로 연락 시 무료로 교환/반품 처리해드립니다.",
          "제품 상태 확인을 위해 사진 제출을 요청드릴 수 있습니다.",
        ],
      },
      {
        label: "교환/반품 절차",
        content: [
          "1. 고객센터 문의",
          "2. 확인 후 교환/반품 접수",
          "3.고객님이 받은 동일한 택배사(CJ대한통운)로 회수 진행",
          "4. 제품 확인 후 교환/환불 처리",
        ],
      },
    ],
  },
];

const totalPages = 5;

export default function ProductDetailClientPage({ product }: Prop) {
  const [addedOptions, setAddedOptions] = useState<any[]>([]);

  const addOption = (opt: any) => {
    const isAlreadyAdded = addedOptions.find((item) => item.id === opt.id);
    if (isAlreadyAdded) {
      return;
    }
    setAddedOptions((prev) => [...prev, { ...opt, quantity: 1 }]);
  };

  const updateQty = (id: number, delta: number) => {
    setAddedOptions((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeOption = (id: number) => {
    setAddedOptions((prev) => prev.filter((item) => item.id !== id));
  };

  const hasColor = product.options.some((opt) => opt.color && opt.color !== "");
  const hasSize = product.options.some((opt) => opt.size && opt.size !== "");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  console.log(product);
  console.log("선택한상품", addedOptions);

  return (
    <>
      {/* 상품 썸네일,이름,가격,옵션선택 등 */}
      <P.ProductInfoArea>
        <P.ProductSummary>
          <P.ThumbnailWrapper>
            <Image
              src={product.thumbnail || "/no-image.png"}
              alt={product.name}
              fill
              sizes="480px"
              priority
            />
          </P.ThumbnailWrapper>

          <P.InfoWrapper>
            <h2>{product.name}</h2>
            <hr />

            <P.Price>
              <div>
                <strong>
                  {/* 첫번째 상품의 가격 */}
                  <span>{product.options[0].price.toLocaleString()}</span>
                </strong>
                원
              </div>
            </P.Price>

            <P.Delevery>
              <h3>배송비</h3>
              <p>2,500원 (50,000원 이상 구매 시 무료배송)</p>
            </P.Delevery>

            {/* 옵션선택한거 */}
            <P.OptionWrapper>
              {hasColor && (
                <P.OptionGroup>
                  <label htmlFor="color-select">색상 선택</label>

                  <ul>
                    {product.options.map((opt) => (
                      <P.OptionChip
                        key={opt.id}
                        onClick={() => addOption(opt)}
                        className={
                          addedOptions.some((item) => item.id === opt.id)
                            ? "active"
                            : ""
                        }
                      >
                        {opt.color}

                        {opt.price !== product.options[0].price && (
                          <small> ({opt.price.toLocaleString()}원)</small>
                        )}
                      </P.OptionChip>
                    ))}
                  </ul>
                </P.OptionGroup>
              )}

              {hasSize && (
                <P.OptionGroup>
                  <label>사이즈 선택</label>
                </P.OptionGroup>
              )}
            </P.OptionWrapper>

            <P.SelectedListArea>
              {addedOptions.map((item) => (
                <P.SelectedItem key={item.id}>
                  <div className="item_header">
                    <span className="option_name">
                      {product.name} - {item.color || item.size}
                    </span>
                    <button
                      className="remove_btn"
                      onClick={() => removeOption(item.id)}
                    >
                      ✕
                    </button>
                  </div>

                  {/* 수량 조절*/}
                  <div className="item_bottom">
                    <P.Counter>
                      <button onClick={() => updateQty(item.id, -1)}>−</button>
                      <span className="count">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)}>+</button>
                    </P.Counter>
                    <strong className="item_price">
                      {(item.price * item.quantity).toLocaleString()}원
                    </strong>
                  </div>
                </P.SelectedItem>
              ))}

              <P.TotalAmountArea>
                <div className="total_label">총 상품 금액</div>
                <div className="total_price">
                  {addedOptions.length > 0 ? (
                    <>
                      <strong>
                        {addedOptions
                          .reduce(
                            (acc, curr) => acc + curr.price * curr.quantity,
                            0,
                          )
                          .toLocaleString()}
                      </strong>
                      <span>원</span>
                    </>
                  ) : (
                    <>
                      <strong>0</strong>
                      <span>원</span>
                    </>
                  )}
                </div>
              </P.TotalAmountArea>
            </P.SelectedListArea>

            <P.ButtonArea>
              <button>장바구니</button>
              <button>구매하기</button>
            </P.ButtonArea>
          </P.InfoWrapper>
        </P.ProductSummary>

        {/* 탭 */}
      </P.ProductInfoArea>

      <P.TabArea aria-label="상품 상세정보 네비게이션">
        <ul>
          <li onClick={() => scrollToSection("detail")}>상세정보</li>
          <li onClick={() => scrollToSection("review")}>후기</li>
          <li onClick={() => scrollToSection("info")}>구매안내</li>
        </ul>
      </P.TabArea>

      <P.DetailArea id="detail">
        <div>
          {product.images.map((img) => (
            <Image src={img} alt={"이미지"} width={1040} height={0} />
          ))}
        </div>
      </P.DetailArea>

      <P.ReviewArea id="review">
        <div>
          <P.ReviewTitleArea>
            상품후기 <span>572</span>
          </P.ReviewTitleArea>

          <P.ReviewButtonArea>
            <button>후기 작성하기</button>
            <button>모두 보기</button>
          </P.ReviewButtonArea>
        </div>

        <hr />

        {mockReviews.length >= 1 ? (
          // 리뷰 1개이상
          <P.ReviewList>
            {mockReviews.map((review) => (
              <>
                <P.ReviewRow>
                  <P.Rating>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                    ))}
                  </P.Rating>

                  <P.ReviewText>{review.content}</P.ReviewText>

                  <P.ReviewWriter>
                    <p>{review.userName}</p>
                  </P.ReviewWriter>

                  <P.ReviewDate>
                    <p>
                      {new Date(review.createdAt).toISOString().slice(0, 10)}
                    </p>
                  </P.ReviewDate>
                </P.ReviewRow>
              </>
            ))}

            {/* 페이지네이션 리뷰갯수 10개이상 부터 */}
            {mockReviews.length >= 10 && (
              <PagenationComponent totalPages={totalPages} />
            )}
          </P.ReviewList>
        ) : (
          // 리뷰없으면
          <P.NoReview>
            아직 작성된 후기가 없습니다. 첫 후기를 남겨보세요! 🥋
          </P.NoReview>
        )}
      </P.ReviewArea>

      <P.ShoppingGuide id="info">
        {SHOPPING_POLICY.map((el) => {
          return <GuideSectionComponent key={el.title} data={el} />;
        })}
      </P.ShoppingGuide>
    </>
  );
}
