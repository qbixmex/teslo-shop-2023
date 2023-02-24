export interface IProduct {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  gender: ValidGenders;
  // TODO: CREATED_AT, UPDATED_AT
}

export type ISize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type IType = 'shirts' | 'pants' | 'hoodies' | 'hats';
export type ValidGenders = 'men' | 'women' | 'kid' | 'unisex';
