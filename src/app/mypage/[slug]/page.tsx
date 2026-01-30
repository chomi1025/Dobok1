import Orders from "../components/Order";
import Claims from "../components/Clames";
import Reviews from "../components/Reviews";
import ProfileEdit from "../components/ProfileEdit";
import ProductQna from "../components/ProductQna";
import Inquiry from "../components/Inquiry";
import WithDraw from "../components/Withdraw";

export default function MypageSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  switch (params.slug) {
    case "orders":
      return <Orders />;
    case "claims":
      return <Claims />;
    case "reviews":
      return <Reviews />;
    case "product-qna":
      return <ProductQna />;
    case "inquiry":
      return <Inquiry />;
    case "profile-edit":
      return <ProfileEdit />;
    case "withdraw":
      return <WithDraw />;
    default:
      return <div>존재하지 않는 페이지</div>;
  }
}
