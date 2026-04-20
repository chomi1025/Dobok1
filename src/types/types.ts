import { Prisma } from "@prisma/client";
import { Inquiry } from "@prisma/client";
export type Category = Prisma.CategoryGetPayload<{
  include: {
    parent: true;
    children: true;
  };
}>;

export type ProductWithDetails = Prisma.ProductGetPayload<{
  include: {
    category: {
      include: { parent: true };
    };
    options: true;
  };
}>;

export type CategoryWithChildren = Prisma.CategoryGetPayload<{
  include: { children: true };
}>;

export interface CategoryApiResponse {
  products: ProductWithDetails[];
  total: number;
}

export interface InquiryWithUser extends Inquiry {
  user: {
    name: string;
  };
}

export interface InquiryResponse {
  inquiries: InquiryWithUser[];
  totalCount: number;
}

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
