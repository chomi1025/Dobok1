import styles from "./ReviewSection.module.scss";

export default function ReviewSection({ mockReviews }) {
  return (
    <>
      <section className={styles.reviewArea} id="review">
        <div>
          <h3 className={styles.reviewTitleArea}>
            상품후기 <span>572</span>
          </h3>

          <div className={styles.reviewButtonArea}>
            <button>후기 작성하기</button>
            <button>모두 보기</button>
          </div>
        </div>

        <hr />

        {mockReviews.length >= 1 ? (
          <ul className={styles.reviewList}>
            {mockReviews.map((review) => (
              <>
                <li className={styles.reviewRow}>
                  <div className={styles.rating}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                    ))}
                  </div>

                  <div className={styles.reviewText}>{review.content}</div>

                  <div className={styles.reviewWriter}>
                    <p>{review.userName}</p>
                  </div>

                  <div className={styles.reviewDate}>
                    <p>
                      {new Date(review.createdAt).toISOString().slice(0, 10)}
                    </p>
                  </div>
                </li>
              </>
            ))}
          </ul>
        ) : (
          <div className={styles.noReview}>
            아직 작성된 후기가 없습니다. 첫 후기를 남겨보세요!
          </div>
        )}
      </section>
    </>
  );
}
