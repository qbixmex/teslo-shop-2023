import { ISize, ValidGenders } from "./";

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  size?: ISize;
  slug: string;
  title: string;
  gender: ValidGenders;
  quantity: number;
}

export interface ICartSummary {
  numberOfItems: number;
  subtotal: number;
  tax: number;
  total: number;
}