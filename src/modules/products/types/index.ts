export interface IProduct {
  _id: string;
  title: string;
  brand: string;
  description: string;
  price: number;
  sellingPrice: number;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
