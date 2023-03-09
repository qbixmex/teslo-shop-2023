import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { IProduct } from '../../../../interfaces';
import { Product } from '../../../../models';

type Data = { message: string } | IProduct | IProduct[];

const handler = (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  switch (request.method) {
    case 'GET':
      return getProducts(request, response);
    case 'POST':
    default:
      return response.status(400).json({ message: 'Unknown Request!' });
  }  
};

const getProducts = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  await db.connect();
  const products = await Product
    .find()
    .sort({ title: 'asc' })
    .select([
      '_id',
      'slug',
      'images',
      'title',
      'gender',
      'type',
      'inStock',
      'price',
      'sizes'
    ])
    .lean();
  await db.disconnect();

  // TODO: Get product images

  return response.status(200).json(products);
};

export default handler;
