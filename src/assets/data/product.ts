export interface Product {
  id: string;
  name: string;
  price: number;
  saleRate?: number; // optional
  thumbnail: string;
  mainSlug: string;
  subSlug: string;
  originalPrice?: number; // optional
  isBest?: boolean; // optional
  stock: number;
  isNew?: boolean; // optional
  rating?: number; // optional
  reviewCount?: number; // optional
}

export const PRODUCTS: Product[] = [
  {
    id: "p-001",
    name: "태권도 머리 보호대",
    mainSlug: "protection",
    subSlug: "headgear",
    price: 29000,
    originalPrice: 35000,
    saleRate: 10,
    thumbnail:
      "https://ybzfvjcmeedwjrpbdmgd.supabase.co/storage/v1/object/sign/Dobok/c90bd112a0ad1aa11cfdd29b20f8c963.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NTA4MjBkYi00ZDg1LTRiNzgtYWNmYS1hY2MyZjM4Yzg4YjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEb2Jvay9jOTBiZDExMmEwYWQxYWExMWNmZGQyOWIyMGY4Yzk2My5qcGciLCJpYXQiOjE3NjgyNDU4NzcsImV4cCI6MTc5OTc4MTg3N30.YBgnCOsgERS9qhp6eyZRg1Xd0gJ4bw2lzn1lsHzC_48",
    isBest: true,
    stock: 12,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "p-002",
    name: "합기도 팔 보호대",
    mainSlug: "protection",
    subSlug: "limbs",
    price: 18000,
    thumbnail:
      "https://ybzfvjcmeedwjrpbdmgd.supabase.co/storage/v1/object/sign/Dobok/c90bd112a0ad1aa11cfdd29b20f8c963.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NTA4MjBkYi00ZDg1LTRiNzgtYWNmYS1hY2MyZjM4Yzg4YjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEb2Jvay9jOTBiZDExMmEwYWQxYWExMWNmZGQyOWIyMGY4Yzk2My5qcGciLCJpYXQiOjE3NjgyNDU4NzcsImV4cCI6MTc5OTc4MTg3N30.YBgnCOsgERS9qhp6eyZRg1Xd0gJ4bw2lzn1lsHzC_48",
    isNew: true,
    stock: 30,
  },
  {
    id: "p-003",
    name: "도복 세트 (성인용)",
    mainSlug: "ttibok",
    subSlug: "taekwondo",
    price: 52000,
    stock: 5,
    thumbnail:
      "https://ybzfvjcmeedwjrpbdmgd.supabase.co/storage/v1/object/sign/Dobok/c90bd112a0ad1aa11cfdd29b20f8c963.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NTA4MjBkYi00ZDg1LTRiNzgtYWNmYS1hY2MyZjM4Yzg4YjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEb2Jvay9jOTBiZDExMmEwYWQxYWExMWNmZGQyOWIyMGY4Yzk2My5qcGciLCJpYXQiOjE3NjgyNDU4NzcsImV4cCI6MTc5OTc4MTg3N30.YBgnCOsgERS9qhp6eyZRg1Xd0gJ4bw2lzn1lsHzC_48",
  },
  {
    id: "p-004",
    name: "도복 세트 (아동용)",
    mainSlug: "ttibok",
    subSlug: "taekwondo",
    price: 42000,
    stock: 15,
    thumbnail:
      "https://ybzfvjcmeedwjrpbdmgd.supabase.co/storage/v1/object/sign/Dobok/c90bd112a0ad1aa11cfdd29b20f8c963.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NTA4MjBkYi00ZDg1LTRiNzgtYWNmYS1hY2MyZjM4Yzg4YjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEb2Jvay9jOTBiZDExMmEwYWQxYWExMWNmZGQyOWIyMGY4Yzk2My5qcGciLCJpYXQiOjE3NjgyNDU4NzcsImV4cCI6MTc5OTc4MTg3N30.YBgnCOsgERS9qhp6eyZRg1Xd0gJ4bw2lzn1lsHzC_48",
  },
  {
    id: "p-004",
    name: "도복 2",
    mainSlug: "ttibok",
    subSlug: "taekwondo",
    price: 42000,
    stock: 15,
    thumbnail:
      "https://ybzfvjcmeedwjrpbdmgd.supabase.co/storage/v1/object/sign/Dobok/c90bd112a0ad1aa11cfdd29b20f8c963.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NTA4MjBkYi00ZDg1LTRiNzgtYWNmYS1hY2MyZjM4Yzg4YjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEb2Jvay9jOTBiZDExMmEwYWQxYWExMWNmZGQyOWIyMGY4Yzk2My5qcGciLCJpYXQiOjE3NjgyNDU4NzcsImV4cCI6MTc5OTc4MTg3N30.YBgnCOsgERS9qhp6eyZRg1Xd0gJ4bw2lzn1lsHzC_48",
  },
];
