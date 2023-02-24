import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces';

type Data =
  | { message: string }
  | IProduct;

const handler = async (request: NextApiRequest, response: NextApiResponse<Data>) => {
  switch (request.method) {
    case 'GET':
      return getProductBySlug(request, response);
    default:
      return response.status(400).json({ message: 'Endpoint does not exist!' });
  }
};

const getProductBySlug = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>,
) => {
  const slug = request.query.slug as string;
  await db.connect();
  const product = await Product
    .findOne({ slug })
    .select('-__v')
    .lean();
  await db.disconnect();
 
  if (!product) {
    return response.status(400).json({ message: `Product does not exist with Slug: "${slug}"` });
  }

  return response.status(200).json(product);
};

export default handler;
