import { ISize, ValidGenders } from "./";

export interface ICartProduct {
  _id: string;
  images: string;
  price: number;
  size: ISize;
  slug: string;
  title: string;
  gender: ValidGenders;
  quantity: number;
}