import { useRouter } from "next/navigation";
import styles from "./CartEmpty.module.scss";
import { ShoppingCart } from "lucide-react";
import Button from "@/components/common/buttons/page";

export default function CartEmptyComponent() {
  const router = useRouter();
  return (
    <div className={styles.emptyWrapper}>
      <div className={styles.content}>
        <div className={styles.iconCircle}>
          <ShoppingCart size={48} strokeWidth={1.5} color="#ccc" />
        </div>

        <h2>장바구니가 비어 있습니다.</h2>
        <p>
          장바구니에 담긴 상품이 없습니다.
          <br />
          원하는 상품을 담아보세요.
        </p>

        <Button variant="black" onClick={() => router.push("/products/best")}>
          쇼핑 계속하기
        </Button>
      </div>
    </div>
  );
}
