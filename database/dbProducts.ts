import { db } from '.';
import Product from '../models/Product';
import { IProduct } from '../interfaces';

export const getProductBySlug = async (slug: string): Promise<IProduct|null> => {
  await db.connect();
  const product = await Product.findOne({ slug }).select('-__v').lean();
  await db.disconnect();

  if (!product) return null;

  return JSON.parse(JSON.stringify(product));
};

type productSlug = { slug: string };

export const getAllProductsSlugs = async (): Promise<productSlug[]> => {
  await db.connect();
  const slugs = await Product.find().select('slug -_id').lean();
  await db.disconnect();

  return slugs;
}
