import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedDatabase } from '../../database';
import { Product } from '../../models';
import { IProduct } from '../../interfaces';

type Data =
  | { message: string }
  | IProduct[];

 const handler = (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  switch (request.method) {
    case 'GET':
      return getProducts(request, response);
    default:
      return response.status(400).json({ message: 'Bad Request' });
  }
};

const getProducts = async (_request: NextApiRequest, response: NextApiResponse) => {
  await db.connect();
  const products = await Product.find()
    .select('title images price inStock slug -_id')
    .lean();
  await db.disconnect();
  
  response.status(200).json(products);
}


export default handler;