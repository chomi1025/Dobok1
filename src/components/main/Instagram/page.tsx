import styles from "./page.module.scss";
import InstagramClientComponent from "./page.client";
("./page.client");

export default function InstagramComponent() {
  return (
    <section className={styles.inner}>
      <header className={styles.title}>
        <h2>도복일번지 인스타그램</h2>
        <p>@Dobok_1st</p>
      </header>

      <InstagramClientComponent />
    </section>
  );
}
