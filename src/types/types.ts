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

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  isBest: boolean;
  isNew: boolean;
  thumbnail: string;
  images: string[];
  description: string | null;
  material: string | null;
  origin: string | null;
  announcement: Announcement;
  discount?: number;
  tag?: string;
  sale?: number;
  options: ProductOption[];
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Title {
  name: string;
  contents: string;
  button: string;
}
