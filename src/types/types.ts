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

export interface Product {
  id: number;
  name: string;
  price?: number;
  categoryId: number;
  isBest: boolean;
  isNew: boolean;
  thumbnail: string;
  discount?: number;
  tag?: string;
  sale?: number;
  options: ProductOption[];
}

export interface Title {
  name: string;
  contents: string;
  button: string;
}
