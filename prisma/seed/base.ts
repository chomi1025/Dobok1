import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      name: "도복·띠",
      slug: "ttibok",
      sortOrder: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1609516629191-4e4668d29759?q=80&w=400&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1599863266223-5e933a25d2bd?q=80&w=400&auto=format&fit=crop",
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
      imageUrl: "https://placehold.co/400x300/e0e0e0/333333?text=Training+Gear",
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
        "https://placehold.co/400x300/e0e0e0/333333?text=Studio+Equipment",
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
      imageUrl: "https://placehold.co/400x300/e0e0e0/333333?text=Accessories",
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
      console.log(`  ㄴ ${parent.name} 하위 메뉴 완료`);
    }
  }

  await seedProducts(prisma);
}

async function seedProducts(prisma: PrismaClient) {
  const subCategories = [
    "taekwondo",
    "hapkido",
    "judo",
    "kendo",
    "belt",
    "headgear",
    "body",
    "limbs",
    "gloves",
    "band",
    "mouthpiece",
    "mit-shield",
    "sandbag-square",
    "wood-board",
    "nunchaku",
    "jump-rope",
    "mattress-pit",
    "air-mat",
    "puzzle-roll-mat",
    "shoes",
    "trophy",
    "stationery",
  ];

  const products = [];

  for (let i = 1; i <= 100; i++) {
    const slug = subCategories[i % subCategories.length];
    const isBest = i % 10 === 0;
    const isNew = i % 5 === 0;

    products.push({
      name: `[도복일번지] ${slug.toUpperCase()} 추천 상품 ${i}호`,
      slug: slug,
      isBest: isBest,
      isNew: isNew,

      thumbnail: `https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=500&auto=format&fit=crop&sig=${i}`,
      description: `전문가들이 추천하는 최고의 ${slug} 전용 용품입니다. 내구성과 성능을 모두 잡았습니다.`,
      material: i % 2 === 0 ? "최고급 면 100%" : "기능성 혼방 소재",
      origin: i % 3 === 0 ? "대한민국" : "해외 OEM",
      options: [
        { size: "S", color: "Basic", price: 20000 + i * 500, stock: 50 },
        { size: "L", color: "Premium", price: 35000 + i * 500, stock: 30 },
      ],
    });
  }

  for (const item of products) {
    const category = await prisma.category.findUnique({
      where: { slug: item.slug },
    });
    if (category) {
      await prisma.product.create({
        data: {
          name: item.name,
          description: item.description,
          thumbnail: item.thumbnail,
          isBest: item.isBest,
          isNew: item.isNew,
          material: item.material,
          origin: item.origin,
          categoryId: category.id,
          options: {
            create: item.options,
          },
        },
      });
    }
  }
  console.log("🔥 100개 상품 데이터 생성 완료!");
}

main()
  .catch((e) => {
    console.error("❌ 추가 에러:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
