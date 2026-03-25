import { Prisma } from "@prisma/client";

export interface Category {
  id: number;
  name: string;
  slug: string | null;
  parentId: number | null;
  children?: Category[];
}

export interface ProductOption {
  id: number;
  size?: string;
  color?: string;
  price: number;
  stock: number;
}

export interface Announcement {
  washing?: string;
  quality?: string;
  asPhone?: string;
  manufacturer?: string;
  precautions?: string;
}

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: {
    category: {
      include: {
        parent: true;
      };
    };
    options: true;
  };
}>;

export interface Title {
  name: string;
  contents: string;
  button: string;
  href: string;
}
