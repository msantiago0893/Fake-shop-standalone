export interface Product {
  category: Category;
  creationAt: Date;
  description: string;
  id: number;
  images: string[];
  price: number;
  title: string;
  updatedAt: Date;
  quantity?: number;
}

export interface Category {
  creationAt: Date;
  id: number;
  image: string;
  name: string;
  updatedAt: Date;
}