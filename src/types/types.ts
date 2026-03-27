import { Prisma } from "@prisma/client";

export type Category = Prisma.CategoryGetPayload<{
  include: {
    parent: true;
    children: true;
  };
}>;

export type ProductOption = Prisma.ProductOptionGetPayload<{}>;

export interface Announcement {
  washing?: string;
  quality?: string;
  asPhone?: string;
  manufacturer?: string;
  precautions?: string;
}

type PrismaProduct = Prisma.ProductGetPayload<{
  include: {
    category: { include: { parent: true } };
    options: true;
  };
}>;

type PrismaProductWithAll = Prisma.ProductGetPayload<{
  include: {
    options: true;
    category: {
      include: {
        parent: true;
      };
    };
  };
}>;

export type ProductWithCategory = Omit<PrismaProductWithAll, "announcement"> & {
  isCustomizable: boolean;
  announcement?:
    | {
        washing?: string;
        notice?: string;
      }
    | null
    | any;
};
export interface Title {
  name: string;
  contents: string;
  button: string;
  href: string;
}
