export interface IProduct {
  _id: string;
  title: string;
  brand: string;
  description: string;
  price: number;
  sellingPrice: number;
  category: string;
  productImages: string[];
  createdAt: Date;
  updatedAt: Date;
  discount?: number;
  rating?: number;
  reviews?: number;
  isBestseller?: boolean;
}
