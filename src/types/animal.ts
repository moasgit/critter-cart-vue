export interface Animal {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  images: string[];
  prices: {
    small: number;
    medium: number;
    large: number;
  };
  stock: {
    small: number;
    medium: number;
    large: number;
  };
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}

export type AnimalSize = 'small' | 'medium' | 'large';

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  size: AnimalSize;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}