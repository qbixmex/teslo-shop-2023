import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces';

type Data =
  | { message: string }
  | IProduct[];

const handler = async (request: NextApiRequest, response: NextApiResponse<Data>) => {
  switch (request.method) {
    case 'GET':
      return searchProducts(request, response);
    default:
      return response.status(400).json({ message: 'Endpoint does not exist!' });
  }
};

const searchProducts = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>,
) => {
  const query = (request.query.query as string) ?? '';  

  if (query.length === 0) {
    return response.status(400).json({
      message: 'You should specify search query'
    });
  }  

  query.trim().toLowerCase();

  await db.connect();
  const products = await Product.find({
      $text: { $search: query }
    })
    .select('title images price inStock slug -_id')
    .lean();
  await db.disconnect();
 
  return response.status(200).json(products);
};

export default handler;
