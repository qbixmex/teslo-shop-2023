import type { NextApiRequest, NextApiResponse } from 'next';
import { db, SHOP_CONSTANTS } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces';

type Data = { message: string } | IProduct | IProduct[];

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

const getProducts = async (request: NextApiRequest, response: NextApiResponse<Data>) => {
  const { gender = 'all' } = request.query;

  let condition = {};

  if ( gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`) ) {
    condition = { gender };
  }

  await db.connect();
  const products = await Product.find(condition)
    .select('_id title images price inStock slug')
    .lean();
  await db.disconnect();

  const updatedProducts = products.map(product => {
    product.images = product.images.map(image => {
      return image.includes('http')
        ? image
        : `${process.env.HOST_NAME}/products/${image}`;
    });
    return product;
  });
  
  response.status(200).json(updatedProducts);
}

export default handler;
