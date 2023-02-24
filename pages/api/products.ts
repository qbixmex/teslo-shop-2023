import type { NextApiRequest, NextApiResponse } from 'next';
import { db, SHOP_CONSTANTS } from '../../database';
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

const getProducts = async (request: NextApiRequest, response: NextApiResponse) => {
  const { gender = 'all' } = request.query;

  let condition = {};

  if ( gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`) ) {
    condition = { gender };
  }

  await db.connect();
  const products = await Product.find(condition)
    .select('title images price inStock slug -_id')
    .lean();
  await db.disconnect();
  
  response.status(200).json(products);
}


export default handler;