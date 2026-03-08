// // app/components/header/Header.server.tsx
// import { getCategories } from "@/lib/category";
// import HeaderClient from "./Header.client";

// export const revalidate = 3600;

// export default async function HeaderServer() {
//   // 1. getCategories가 주는 진짜 모양대로 타입을 잡아줘
//   const { grouped } = (await getCategories()) as {
//     grouped: any[] // 일단 흐름을 보기 위해 any로 잡고, 나중에 GroupedCategory[]로 정교하게 바꿔보자!
//   };

//   // 2. 이미 다 합쳐져서 왔으니까 그냥 바로 보내면 끝!
//   return <HeaderClient categories={grouped} />;
// }
