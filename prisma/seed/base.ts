import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      name: "도복·띠",
      slug: "ttibok",
      sortOrder: 1,
      imageUrl:
        "https://rchecuchaugxhqoxcuki.supabase.co/storage/v1/object/public/category/ttibok.jpg",
      subMenu: [
        { name: "태권도복", slug: "taekwondo", sortOrder: 1 },
        { name: "합기도복", slug: "hapkido", sortOrder: 2 },
        { name: "유도복", slug: "judo", sortOrder: 3 },
        { name: "검도복", slug: "kendo", sortOrder: 4 },
        { name: "띠", slug: "belt", sortOrder: 5 },
      ],
    },
    {
      name: "보호장비",
      slug: "protection",
      imageUrl:
        "https://rchecuchaugxhqoxcuki.supabase.co/storage/v1/object/public/category/protection.jpg",
      sortOrder: 2,
      subMenu: [
        { name: "머리 보호대", slug: "headgear", sortOrder: 1 },
        { name: "몸통 보호대", slug: "body", sortOrder: 2 },
        { name: "팔·다리 보호대", slug: "limbs", sortOrder: 3 },
        { name: "글러브", slug: "gloves", sortOrder: 4 },
        { name: "아대", slug: "band", sortOrder: 5 },
        { name: "마우스피스", slug: "mouthpiece", sortOrder: 6 },
      ],
    },
    {
      name: "훈련·격파용품",
      slug: "training",
      imageUrl:
        "https://rchecuchaugxhqoxcuki.supabase.co/storage/v1/object/public/category/training.jpg",
      sortOrder: 3,
      subMenu: [
        { name: "미트·쉴드", slug: "mit-shield", sortOrder: 1 },
        { name: "샌드백·사각백", slug: "sandbag-square", sortOrder: 2 },
        { name: "송판류", slug: "wood-board", sortOrder: 3 },
        { name: "쌍절곤", slug: "nunchaku", sortOrder: 4 },
        { name: "줄넘기", slug: "jump-rope", sortOrder: 5 },
      ],
    },
    {
      name: "도장설비",
      slug: "studio",
      imageUrl:
        "https://rchecuchaugxhqoxcuki.supabase.co/storage/v1/object/public/category/mattress-pit.jpg",
      sortOrder: 4,
      subMenu: [
        { name: "매트리스·뜀틀", slug: "mattress-pit", sortOrder: 1 },
        { name: "에어매트", slug: "air-mat", sortOrder: 2 },
        { name: "퍼즐매트·롤매트", slug: "puzzle-roll-mat", sortOrder: 3 },
      ],
    },
    {
      name: "부가용품",
      slug: "accessories",
      imageUrl:
        "https://rchecuchaugxhqoxcuki.supabase.co/storage/v1/object/public/category/accessories.jpg",
      sortOrder: 5,
      subMenu: [
        { name: "신발·실내화", slug: "shoes", sortOrder: 1 },
        { name: "상장·트로피", slug: "trophy", sortOrder: 2 },
        { name: "도장 문구류·소모품", slug: "stationery", sortOrder: 3 },
      ],
    },
  ];

  for (const cat of categories) {
    const parent = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        sortOrder: cat.sortOrder,
        imageUrl: cat.imageUrl,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        sortOrder: cat.sortOrder,
        imageUrl: cat.imageUrl,
        parentId: null,
      },
    });

    console.log(`1차 카테고리 완료: ${parent.name}`);

    if (cat.subMenu) {
      for (const sub of cat.subMenu) {
        await prisma.category.upsert({
          where: { slug: sub.slug },
          update: {
            name: sub.name,
            sortOrder: sub.sortOrder,
            parentId: parent.id,
          },
          create: {
            name: sub.name,
            slug: sub.slug,
            sortOrder: sub.sortOrder,
            parentId: parent.id,
          },
        });
      }
      console.log(` 2차 메뉴 완료`);
    }
  }
}

main()
  .catch((e) => {
    console.error("시딩 중 에러 발생:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
